AWS Cloud Development Kit
===

The example project as explained in [REAMDE.md](../README.md) build using the AWS Cloud Development Kit (AWS CDK).

## Installing
Install all dependencies of the project.
```bash
$ cd cdk
$ npm install
```

## Bootstrapping
To use the AWS CDK in your AWS account you need to bootstrap CDK, this ensures that the CDK toolkit is available in your AWS account. This includes things like a deployment role and an S3 bucket for resources. More information on bootstrapping can be found here: [https://docs.aws.amazon.com/cdk/latest/guide/bootstrapping.html](https://docs.aws.amazon.com/cdk/latest/guide/bootstrapping.html) 
```bash
$ npm run bootstrap
```

## Deploying
Deploy the application to your aws account.
```bash
$ npm run deploy
```

## Invoking
Invoke the ` PUT /calculator` endpoint using curl. Please replace the `abcdefghij` value with the identifier of your own AWS API Gateway.
```bash
$ curl -X PUT --data '{"operator":"add","amount":11}' https://abcdefghij.execute-api.eu-west-1.amazonaws.com/dev/calculator
```

## Playground
You can make changes to play around with the setup of the AWS Cloud Development Kit. To make changes to the infrastructure of the project edit the `lib/cdk-stack.ts` file. To make changes regarding the application code edit the source code in the `src/` directory. To apply the changes, simply redeploy the application.