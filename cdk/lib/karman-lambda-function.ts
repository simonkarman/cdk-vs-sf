import * as cdk from '@aws-cdk/core';
import * as logs from '@aws-cdk/aws-logs';
import * as lambda from '@aws-cdk/aws-lambda';
import * as lambdanodejs from '@aws-cdk/aws-lambda-nodejs';

// Ensure the logRetention cannot be passed to the lambda function, since it is overwritten
export type KarmanLambdaFunctionProps = Omit<lambdanodejs.NodejsFunctionProps, 'logRetention'>;

export class KarmanLambdaFunction extends lambdanodejs.NodejsFunction {
  constructor(scope: cdk.Construct, id: string, props?: KarmanLambdaFunctionProps) {
    super(scope, id, {
      // Sane defaults than can be overridden from the props.
      runtime: lambda.Runtime.NODEJS_14_X,
      memorySize: 1024,

      // The props passed to this function.
      ...props,

      // Forced values that are enforced and cannot be overwritten
      logRetention: logs.RetentionDays.FOUR_MONTHS,
    });
  }
}

