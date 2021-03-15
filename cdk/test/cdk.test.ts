import { expect as expectCDK, haveResourceLike } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Cdk from '../lib/cdk-stack';

test('Stack should contain calculator lambda function', () => {
    const app = new cdk.App();
    const stack = new Cdk.CdkStack(app, 'MyTestStack');
    expectCDK(stack).to(haveResourceLike('AWS::Lambda::Function', {}));
});
