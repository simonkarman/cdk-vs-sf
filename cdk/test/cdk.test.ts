import { expect as expectCDK, haveResourceLike } from '@aws-cdk/assert';
import * as core from '@aws-cdk/core';
import { CdkStack } from '../lib/cdk-stack';
import { KarmanFunction } from '../lib/karman-function'
import { KarmanListener } from '../lib/karman-listener';

const createTestStack = () => {
  const app = new core.App();
  return new CdkStack(app, 'MyTestStack');
};

const addExampleFunctionTo = (stack: core.Stack) => {
  return new KarmanFunction(stack, 'ExampleFunction', {
    memorySize: 2048,
    entry: 'src/calculator.ts',
    handler: 'handler',
  });
}

describe('CDK', () => {
  test('Stack should contain calculator lambda function', () => {
    const stack = createTestStack();
    expectCDK(stack).to(haveResourceLike('AWS::Lambda::Function', {}));
  });

  test('Karman Function should always use log retention of four months', () => {
    const stack = createTestStack();
    addExampleFunctionTo(stack);
    expectCDK(stack).to(haveResourceLike('Custom::LogRetention', {
      RetentionInDays: 120,
    }))
  });

  test('Karman Listener should create a queue and a dead letter queue', () => {
    const stack = createTestStack();
    const exampleFunction = addExampleFunctionTo(stack);
    const listener = new KarmanListener(stack, 'ExampleListener', { function: exampleFunction });
    expect(listener.queue).toBeDefined();
    expect(listener.dlq).toBeDefined();
  });
});