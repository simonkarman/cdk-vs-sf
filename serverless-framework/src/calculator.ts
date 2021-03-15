import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { DateTime } from 'luxon';

type Operation = {
  id: string,
  operator: 'add' | 'subtract',
  amount: number
};

const parse = (event: APIGatewayProxyEvent): Operation => {
  const parsedEvent: object = JSON.parse(event.body!) || {};
  return {
    id: (typeof parsedEvent['id'] === 'string') ? parsedEvent['id'] : 'default',
    operator: (parsedEvent['operator'] === 'subtract') ? 'subtract' : 'add',
    amount: (typeof parsedEvent['amount'] === 'number') ? parsedEvent['amount'] : 1,
  }
};

const update = (operation: Operation): Promise<DynamoDB.UpdateItemOutput> => {
  const TableName = process.env.COUNTER_TABLE!;
  console.log(`Applying the following operation to the ${TableName} table:`, operation);
  const ddb = new DynamoDB.DocumentClient({ region: 'eu-west-1'});
  return ddb.update({
    TableName,
    Key: { id: operation.id },
    UpdateExpression: 'ADD amount :amount SET createdAt = if_not_exists(createdAt, :now)',
    ExpressionAttributeValues: {
      ':amount': operation.operator === 'subtract' ? -operation.amount : operation.amount,
      ':now': DateTime.now().toISO(),
    },
    ReturnValues: 'ALL_NEW',
  }).promise();
}

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    console.log('Calculator has received an event:', event);
    const operation = parse(event);
    const counter = await update(operation);
    const response = {
      counter,
      operation,
      message: 'Successfully updated counter in the database based on the given operation.'
    };
    console.info('Successfully handled operation. Responding with:', response);
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error) {
    console.error('Something went wrong while trying to apply an operation to a counter.', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Something went wrong while trying to apply an operation to a counter. Look at the logs for more information.',
        error
      })
    }
  }
};