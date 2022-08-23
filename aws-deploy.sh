#!/bin/bash
pushd cdk 
npm install
popd
pushd cdk/functions
npm install
popd
pushd client
npm install
export REACT_APP_API_ADDRESS=https://infinispace.infinityworks.academy/api
npm run build 
popd
pushd cdk
npx cdk@2 deploy --profile iw-academy
popd
./aws-create-schema.sh
