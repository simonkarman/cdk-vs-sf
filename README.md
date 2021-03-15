CDK vs Serverless Framework
===

A comparison of the setup of a micro-service in AWS using the AWS Cloud Development Kit (AWS CDK) and the Serverless Framework as part of the 'Using AWS CDK to manage your infrastructure'-article by Simon Karman written for the Dutch Java Magazine.

This project contains the source code and code samples for that article.

## Abstract
Creating and maintaining application infrastructure in a cloud environment can be time consuming and a difficult process. A tool that allows us to deploy and update these resources from a parameterized template is a very powerful utility. Utilizing such a tool is commonly referred to Infrastructure as Code (IaC). A variety of awesome IaC tools exist for the Amazon Web Service (AWS) cloud. Most of these are focussed on writing configuration files, and are less focussed on writing actual source code in a programming language. In this article I would like to explain why I think writing your infrastructure as source code (IaSC) is a good idea and show that the AWS Cloud Development Kit (AWS CDK) is a great example of this.

## Author
My name is [Simon Karman](https://www.simonkarman.nl). I am a professional Software Engineer and hobbyist Game Developer. I work at Tikkie (part of ABN AMRO) via Quintor, where I am an AWS Cloud Engineer. My responsibilities include developing microservices in AWS, working on both serverless and containerized solutions. At Tikkie I have been using the Serverless Framework and AWS Cloud Development Kit (CDK) to successfully build and maintain 20+ microservices.

## Project Outline
The `cdk/` directory contains the example project written using the AWS CDK and the `serverless-framework/` directory contains the example project written using the Serverless Framework.

The example application provides an HTTP endpoint (`PUT /calculator`) that allows you to execute an add or subtract operation on a counter in a database. The solution will be built using an AWS API Gateway for the REST endpoint, a AWS Lambda function to handle the invocation, and a DynamoDB table to store the counter details.

The source code for the lambdas of both projects have been written in TypeScript. Visit the README files in those directories to get more information on how to run each solution.

> This example application is focussed on using Serverless resources, but both frameworks can also be used to set up the infrastructure of containerized applications using tools such as AWS EC2 or ECS.

> This project will NOT focus on the functionality of its components (such as AWS API Gateway and DynamoDB). You can read more about those in the documentation of AWS at https://aws.amazon.com/.
