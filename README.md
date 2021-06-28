CDK vs Serverless Framework
===

A comparison of the setup of a micro-service in AWS using the AWS Cloud Development Kit (AWS CDK) and the Serverless Framework as part of the 'Using AWS CDK to manage your infrastructure'-article by Simon Karman written for the Dutch Java Magazine.

This project contains the source code and code samples for that article.

## Abstract
Creating and maintaining application infrastructure in a cloud environment can be time consuming and a difficult process. A tool that allows us to deploy and update these resources from a parameterized template is a very powerful utility. Utilizing such a tool is commonly referred to Infrastructure as Code (IaC). A variety of awesome IaC tools exist for the Amazon Web Service (AWS) cloud. Most of these are focussed on writing configuration files, and are less focussed on writing actual source code in a programming language. In the article I explain why I think writing your infrastructure as source code (IaSC) is a good idea and show that the AWS Cloud Development Kit (AWS CDK) is a great example of this.

## Project Outline
The `cdk/` directory contains the example project written using the AWS Cloud Development Kit (AWS CDK) and the `sf/` directory contains the example project written using the Serverless Framework. Visit the README files in those directories to get more information on how to install, deploy, and edit both solutions.

The example application is a simple calculator. The calculator provides an HTTP endpoint (`PUT /calculator`) that allows you to execute an add or subtract operation on a counter in a database. The solution is built using AWS API Gateway for the REST endpoint, an AWS Lambda function to handle the invocation, and a DynamoDB table to store the counter details. The article focuses on the differences in how to set up the infrastructure and I will therefore NOT explain the functionality of the components used. You can read more about those in the documentation of AWS at [https://aws.amazon.com/](https://aws.amazon.com/). The important thing to understand is that we need an API Gateway, a lambda function, and a DynamoDB table and that we’ll see how to create those resources in both frameworks.

> Please note that although this example application focuses on Serverless resources, both frameworks can be used to develop containerized applications including resources such as EC2 instances, load balancers, and more.

## Author
My name is [Simon Karman](https://www.simonkarman.nl). I am a professional Software Engineer and hobbyist Game Developer. I work at Tikkie (part of ABN AMRO) via Quintor, where I am an AWS Cloud Engineer. My responsibilities include developing microservices in AWS, working on both serverless and containerized solutions. At Tikkie I have been using the Serverless Framework and AWS Cloud Development Kit (CDK) to successfully build and maintain 20+ microservices.
