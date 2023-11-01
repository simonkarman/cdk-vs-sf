/**
 * This is an example for a 'reusablity'-library resource.
 */
import * as core from '@aws-cdk/core';
import * as sqs from '@aws-cdk/aws-sqs';
import * as lambdasources from '@aws-cdk/aws-lambda-event-sources';
import { KarmanFunction } from './karman-function';

/**
  * The KarmanListenerProps contains all the properties needed to create
  *   the structure.
  */
export type KarmanListenerProps = {
  function: KarmanFunction;
  maxReceiveCount?: number;
};

/**
 * The KarmanListener construct provides the ability to create a queue and a
 *   dead letter queue for a given karman function. It ensures the messages
 *   are retried 3 times (unless overwritten) and that the function is subscribed
 *   to the newly created queue.
 *
 * Usage: new KarmanListener(scope, 'ExampleListener', { function: myFunction });
 */
export class KarmanListener extends core.Construct {
  public readonly queue: sqs.Queue;
  public readonly dlq: sqs.Queue;

  constructor(scope: core.Construct, id: string, props: KarmanListenerProps) {
    super(scope, id);

    // Create the DLQ
    this.dlq = new sqs.Queue(this, `${id}Dlq`);
    KarmanListener.addMonitoringAlarms(this.dlq);

    // Create the Queue
    this.queue = new sqs.Queue(this, `${id}Queue`, {
      queueName: `${props.function.functionName}-queue`,
      deadLetterQueue: {
        maxReceiveCount: props.maxReceiveCount ?? 3,
        queue: this.dlq,
      },
    });

    // Connect with the function
    this.queue.grantConsumeMessages(props.function);
    props.function.addEventSource(new lambdasources.SqsEventSource(this.queue, {
      batchSize: 1,
    }));
  }

  public static addMonitoringAlarms(dlq: sqs.Queue) {
    /**
     * In a real world scenario this is where you could add alarms to
     *   your queue, so you'll get notified once messages are ending up
     *   on your dlq.
     */
  }
}
