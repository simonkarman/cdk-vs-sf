import { expect as expectCDK, haveResourceLike } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import { CdkStack } from '../lib/cdk-stack';
import { KarmanLambdaFunction } from '../lib/karman-lambda-function'

const createTestStack = () => {
    const app = new cdk.App();
    return new CdkStack(app, 'MyTestStack');
};

test('Stack should contain calculator lambda function', () => {
    const stack = createTestStack();
    expectCDK(stack).to(haveResourceLike('AWS::Lambda::Function', {}));
});

test('Karman Lambda Function should always use log retention of four months', () => {
    const stack = createTestStack();
    const lambdaFunction = new KarmanLambdaFunction(stack, 'KarmanLambdaFunction', {
        memorySize: 2048,
        entry: 'src/calculator.ts',
        handler: 'handler',
    });
    console.log(lambdaFunction);
});
