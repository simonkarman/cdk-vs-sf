Serverless Framework
===

The example project as explained in [REAMDE.md](../README.md) build using the Serverless Framework.

## Installing
Install all dependencies of the project.
```bash
$ cd sf
$ npm install
```

## Deploying
Deploy the application to your aws account. The Serverless Framework needs access to your cloud provider account so that it can create and manage resources on your behalf. Take a look at [https://www.serverless.com/framework/docs/providers/aws/guide/credentials/](https://www.serverless.com/framework/docs/providers/aws/guide/credentials/) to setup the AWS CLI with your AWS credentials.
```bash
$ npm run deploy
```

## Invoking
Invoke the ` PUT /calculator` endpoint using curl. Please replace the `abcdefghij` value with the identifier of your own AWS API Gateway.
```bash
$ curl -X PUT --data '{"operator":"add","amount":11}' https://abcdefghij.execute-api.eu-west-1.amazonaws.com/dev/calculator
```

## Playground
You can make changes to play around with the setup of the Serverless Framework. To make changes the infrastruture of the project edit the `serverless.yml` file. To make changes regarding the application code edit the source code in the `src/` directory.