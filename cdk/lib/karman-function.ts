/**
 * This is an example for a 'compliancy'-library resource.
 */
import * as core from '@aws-cdk/core';
import * as logs from '@aws-cdk/aws-logs';
import * as lambda from '@aws-cdk/aws-lambda';
import * as lambdanodejs from '@aws-cdk/aws-lambda-nodejs';

/**
 * The KarmanFunctionProps contains all the properties from the normal
 *   lambdanodejs.NodejsFunctionProps, except the logRetention.
 * 
 * The logRetention property is ommitted because we enforce a default
 *   value of 'logs.RetentionDays.FOUR_MONTHS'.
 */
export type KarmanFunctionProps = Omit<lambdanodejs.NodejsFunctionProps, 'logRetention'>;

/**
 * The KarmanFunction provides sane defaults for runtime and memory and
 *   enforces a logRetention of 'logs.RetentionDays.FOUR_MONTHS'.
 * 
 * It achieves this by wrapping the lambdanodejs.NodejsFunction constructor
 *   and enforcing/overriding some of the props that are passed along.
 * 
 * Usage: new KarmanFunction(scope, 'ExampleFunction', { memorySize: 2048 });
 */
export class KarmanFunction extends lambdanodejs.NodejsFunction {
  constructor(scope: core.Construct, id: string, props?: KarmanFunctionProps) {
    super(scope, id, {
      // Sane defaults that can still be overridden from the props.
      runtime: lambda.Runtime.NODEJS_14_X,
      memorySize: 1024,

      // The props passed to this function.
      ...props,

      // Properties that are fixed and cannot be overwritten or changed
      logRetention: logs.RetentionDays.FOUR_MONTHS,
    });
  }
}
