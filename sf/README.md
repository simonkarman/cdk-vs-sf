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

> Note that the Serverless Framework generates two CloudFormation files. One `.serverless/cloudformation-template-create-stack.json` file and one `.serverless/cloudformation-template-update-stack.json`. The create stack is deployed first to ensure that an S3 bucket exists where the code of your lambda functions can be stored. The update stack then references to the code stored in the S3 bucket.

## Invoking
Invoke the ` PUT /calculator` endpoint using curl. Please replace the `abcdefghij` value with the identifier of your own AWS API Gateway.
```bash
$ curl -X PUT --data '{"operator":"add","amount":11}' https://abcdefghij.execute-api.eu-west-1.amazonaws.com/dev/calculator
```

## Playground
You can make changes to play around with the setup of the Serverless Framework. To make changes the infrastructure of the project edit the `serverless.yml` file. To make changes regarding the application code edit the source code in the `src/` directory. To apply the changes, simply redeploy the application.