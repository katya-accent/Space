/* eslint-disable spaced-comment */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */

const cdk = require('aws-cdk-lib');
const iam = require('aws-cdk-lib/aws-iam');
const s3 = require('aws-cdk-lib/aws-s3');
const s3Deployment = require('aws-cdk-lib/aws-s3-deployment');
const cloudfront = require('aws-cdk-lib/aws-cloudfront');
const origins = require('aws-cdk-lib/aws-cloudfront-origins');
const acm = require('aws-cdk-lib/aws-certificatemanager');
const ec2 = require('aws-cdk-lib/aws-ec2');
const rds = require('aws-cdk-lib/aws-rds');
const lambda = require('aws-cdk-lib/aws-lambda');
const apigw = require('aws-cdk-lib/aws-apigateway');
const route53 = require('aws-cdk-lib/aws-route53');

class CdkStack extends cdk.Stack {

  stackName = 'infiniSpace'
  awsAccount = process.env.CDK_DEFAULT_ACCOUNT
  awsRegion = process.env.CDK_DEFAULT_REGION
  certArn = cdk.Fn.importValue('NJASharedCertArn')
  certId = cdk.Fn.importValue('NJASharedCertId')
  scopePermissionsArn = cdk.Fn.importValue('NJASharedScopePermissionsArn')
  domainName = 'infinityworks.academy'
  subDomain = this.stackName.toLowerCase()
  dbName = 'dev'
  vpcName = 'NjaSharedVpc' // can't use importValue for vpcs
  teamSecurityGroupName = "Nja-Shared-Security-Group"
  lambdaExecutionRoleName = "nja-lambda-execution-role"

  /**
 * @param {Construct} scope
 * @param {string} id
 * @param {StackProps=} props
 */
  constructor (scope, id, props) {
    super(scope, id, props);

    // Bucket to put static react code in later
    const bucket = new s3.Bucket(this, `${this.stackName}-hosting`, {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL, //security
      encryption: s3.BucketEncryption.S3_MANAGED //security
    });
    bucket.addToResourcePolicy( //security
      new iam.PolicyStatement({
        resources: [
          bucket.arnForObjects('*'),
          bucket.bucketArn
        ],
        actions: [ 's3:*' ],
        effect: iam.Effect.DENY,
        conditions: {
          Bool: { 'aws:SecureTransport': 'false' }
        },
        principals: [ new iam.AnyPrincipal() ],
      })
    )

    // Set a permissions boundary
    const boundary = iam.ManagedPolicy.fromManagedPolicyArn(
      this,
      `${this.stackName}-boundary`,
      this.scopePermissionsArn  //`arn:aws:iam::${props.env.account}:policy/ScopePermissions`
    );
    iam.PermissionsBoundary.of(this).apply(boundary);

    // Lookup cert for domain
    const cert = acm.Certificate.fromCertificateArn(
      this,
      `${this.stackName}-cert-lookup`,
      this.certArn //`arn:aws:acm:us-east-1:${props.env.account}:certificate/${props.certId}`
    );

    // Lookup shared vpc to put db in, so other things can find it
    // You can't use any tokens for Vpc.fromLookup() parameters :-(
    const sharedVpc = ec2.Vpc.fromLookup(this, `${this.stackName}-vpc-lookup`, {
      vpcName: this.vpcName,
      region: this.awsRegion,
    })

    const teamSecurityGroup = ec2.SecurityGroup.fromLookupByName(
      this,
      `${this.stackName}-security-group-lookup`,
      this.teamSecurityGroupName,
      sharedVpc
    )

    // database goes in the vpc so other stuff can find it
    const cluster = new rds.ServerlessCluster(
      this,
      `${this.stackName}-rds-cluster`,
      {
        engine: rds.DatabaseClusterEngine.auroraPostgres({
          version: rds.AuroraPostgresEngineVersion.VER_10_11
        }),
        enableDataApi: true,
        defaultDatabaseName: this.dbName, // Specify the name of the DB
        vpc: sharedVpc,
        scaling: { autoPause: cdk.Duration.minutes(30) }, // Zero Prevents DB from pausing
        removalPolicy: cdk.RemovalPolicy.DESTROY,
        securityGroups: [ teamSecurityGroup ]
      }
    );

    const lambdaEnvVars = {
      NODE_ENV: 'production',
      DB_NAME: this.dbName, // Same as in cluster above
      CLUSTER_ARN: cluster.clusterArn,
      SECRET_ARN: cluster.secret?.secretArn || 'NOT_SET', // Our cluster auto creates a secret, map the ARN to our lambda env for later
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1', // AWS specific var to reuse TCP connection https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/node-reusing-connections.html
    }

    		// Lambda to talk to the database
		const endpointLambda = new lambda.Function(
			this,
			`${this.stackName}-endpoint-lambda`,
			{
				runtime: lambda.Runtime.NODEJS_14_X,
				code: new lambda.AssetCode("functions"),
				handler: "index.handler",
				environment: lambdaEnvVars,
        timeout: cdk.Duration.minutes(1),
			}
		);

		// Grant lambda security access to database
		cluster.grantDataApiAccess(endpointLambda);
    
		// API gateway to be the public front of the lambda
		const api = new apigw.LambdaRestApi(this, `${this.stackName}-apigw`, {
			handler: endpointLambda,
			proxy: true,
		});

// Cloudfront sits in front of S3 bucket and the API GW
const distribution = new cloudfront.Distribution(
  this,
  `${this.stackName}-distribution`,
  {
    defaultBehavior: {
      origin: new origins.S3Origin(bucket),
      viewerProtocolPolicy:
        cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
    },
    additionalBehaviors: {
      "/api/*": {
        origin: new origins.HttpOrigin(
          `${api.restApiId}.execute-api.${this.awsRegion}.amazonaws.com`,
          {
            originPath: "/prod", // to match the api gw above
          }
        ),
        originRequestPolicy: new cloudfront.OriginRequestPolicy(this, 'request-policy', {
          queryStringBehavior: cloudfront.OriginRequestQueryStringBehavior.all()
        }),
        viewerProtocolPolicy:
          cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
        cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED, // ToDo: A TTL of 1min would suffice
      },
    },
    priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
    defaultRootObject: "index.html",
    domainNames: [`${this.subDomain}.${this.domainName}`],
    certificate: cert,
    webAclId: undefined // no firewall
  }
);

const zone = route53.HostedZone.fromLookup(this, "zone", {
  domainName: this.domainName,
});
new route53.CnameRecord(this, `${this.stackName}-record`, {
  zone,
  domainName: distribution.domainName,
  recordName: `${this.subDomain}.${this.domainName}`,
});
new cdk.CfnOutput(this, "RawApiUrl", {
  value: api.url ?? "NO_URL",
});
new cdk.CfnOutput(this, "PrettyApiUrl", {
  value: `https://${this.subDomain}.${this.domainName}/api/`,
});
new cdk.CfnOutput(this, "FrontendUrl", {
  value: `https://${this.subDomain}.${this.domainName}`,
});

		// Copy react output into bucket - depends on both Bucket and Cloudfront Distribution
		new s3Deployment.BucketDeployment(
			this,
			`${this.stackName}-deployment`,
			{
				destinationBucket: bucket,
				sources: [s3Deployment.Source.asset('../client/build')], // different per project, relative to CDK folder
				retainOnDelete: false,
				distribution,
				distributionPaths: ['/*'],
				prune: true,
        memoryLimit: 512 // See https://github.com/aws/aws-cdk/issues/4058 and https://github.com/aws/aws-cdk/pull/4204/files
			}
		);




    //----- outputs --------------------------

    new cdk.CfnOutput(this, 'certArn', {
      value: this.certArn || 'NOT_SET'
    })
    new cdk.CfnOutput(this, 'certId', {
      value: this.certId || 'NOT_SET'
    })
    new cdk.CfnOutput(this, 'scopePermissionsArn', {
      value: this.scopePermissionsArn || 'NOT_SET'
    })
    new cdk.CfnOutput(this, 'boundary', {
      value: boundary.managedPolicyArn || 'NOT_SET'
    })
    new cdk.CfnOutput(this, 'cert', {
      value: cert.certificateArn || 'NOT_SET'
    })
    new cdk.CfnOutput(this, 'sharedVpc', {
      value: sharedVpc.vpcId || 'NOT_SET'
    })
    new cdk.CfnOutput(this, 'teamSecurityGroup', {
      value: teamSecurityGroup.securityGroupId || 'NOT_SET'
    })

  }
}

module.exports = { CdkStack };
