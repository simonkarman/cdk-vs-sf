import * as core from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as lambdanodejs from '@aws-cdk/aws-lambda-nodejs';
import * as apigateway from '@aws-cdk/aws-apigateway';
import * as dynamodb from '@aws-cdk/aws-dynamodb';

export class CdkStack extends core.Stack {
  constructor(scope: core.Construct, id: string, props?: core.StackProps) {
    super(scope, id, props);
    
    // DynamoDB Table
    const counterTable = new dynamodb.Table(this, 'CounterTable', {
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING,
      },
    });

    // Lambda Function
    const calculator = new lambdanodejs.NodejsFunction(this, 'Calculator', {
      environment: {
        COUNTER_TABLE: counterTable.tableName,
      },
      runtime: lambda.Runtime.NODEJS_14_X,
      entry: 'src/calculator.ts',
      handler: 'handler',
    });
    counterTable.grantWriteData(calculator);

    // API Gateway Rest Api
    const api = new apigateway.RestApi(this, 'RestApi');
    api.root
      .addResource('calculator')
      .addMethod('PUT', new apigateway.LambdaIntegration(calculator));
  }
}
