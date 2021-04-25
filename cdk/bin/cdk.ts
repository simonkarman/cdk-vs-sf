#!/usr/bin/env node
import 'source-map-support/register';
import * as core from '@aws-cdk/core';
import { CdkStack } from '../lib/cdk-stack';

const app = new core.App();
new CdkStack(app, 'CdkStack', { stackName: 'calculator-cdk' });
