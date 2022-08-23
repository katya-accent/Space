# InfiniSpace

The project is written using Node.js and relies upon react-router-dom@5, Bootstrap and a Docker installation available locally. 

The deployment is done on AWS and requires an AWS cdk cli installation. 

## start all docker containers with docker compose 🐳

    docker compose up --build

## open interactive terminal from database

    docker exec -it infinispace-db bash

## open psql database tool in the interactive terminal

    psql -h localhost -p 5432 -U postgres

## logint to AWS

    aws-azure-login --profile iw-academy

## deploy the website
    
    ./aws-deploy.sh

## destroy the website

    npx cdk@2 destroy --profile iw-academy
