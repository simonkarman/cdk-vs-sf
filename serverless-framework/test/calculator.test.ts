import { handler } from '../src/calculator';
import * as AWSMock from 'aws-sdk-mock';
import * as AWS from 'aws-sdk';
 
describe('Calculator', () => {
  process.env.COUNTER_TABLE = 'counter-table';
  AWSMock.setSDKInstance(AWS);
  AWSMock.mock('DynamoDB.DocumentClient', 'update', function (params, callback){
    callback(null, { response: 'from db' });
  });

  test('should add to the default counter when only given an amount', async () => {
    const result = await handler({ body: JSON.stringify({ amount: 3 })} as any);
    console.log(result);
    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body)).toStrictEqual({
      counter: { response: 'from db' },
      message: 'Successfully updated counter in the database based on the given operation.',
      operation: {
        id: 'default',
        operator: 'add',
        amount: 3,
      },
    }
  );
  });
});