#!/usr/bin/env node

const cdk = require('aws-cdk-lib');
const { CdkStack } = require('../lib/cdk-stack');

const app = new cdk.App();
new CdkStack(app, 'InfiniSpace-cdkstack', {
env: { 
  account: process.env.CDK_DEFAULT_ACCOUNT,
   region: process.env.CDK_DEFAULT_REGION
   },
  });
