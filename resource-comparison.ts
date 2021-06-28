/*
 * This utility compares the resources created in the CloudFormation stack by the Serverless
 * Framework and the AWS Cloud Development Kit. It outputs a list of resources types for each
 * stack that are not present in the other stack. 
 */
const _ = require('lodash');
const sf = require('./sf/.serverless/cloudformation-template-update-stack.json');
const cdk = require('./cdk/cdk.out/CdkStack.template.json');

type Data = {
  Type: string,
  Names: string[],
};
const getType = (data: Data) => data.Type;

function getResourcesByType(cloudformation: any): Data[] {
  const names: string[] = Object.keys(cloudformation.Resources);
  const resourcesByType = {};
  for (const name of names) {
    const type = cloudformation.Resources[name].Type;
    if (resourcesByType[type] !== undefined) {
      resourcesByType[type].push(name);
    } else {
      resourcesByType[type] = [name];
    }
  }
  return Object.keys(resourcesByType).map(key => ({ Type: key, Names: resourcesByType[key] }));
}
const sfData = getResourcesByType(sf);
const cdkData = getResourcesByType(cdk);

console.info('sf unique:', _.differenceBy(sfData, cdkData, getType));
console.info('cdk unique:', _.differenceBy(cdkData, sfData, getType));