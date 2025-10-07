![Front image](/assets/imgs/front-image.jpg?raw=true)

# My AWS Environment

This repository contains scripts I use in **my AWS environment.**\
The scripts are categorized into directories _by service:_

- *Athena* SQL queries `/athena/`,
- *EC2 instance* user data scripts `/ec2/`,
- *Lambda functions* in JS and Python `/lambda/`,
- *HTML and CSS files of websites and web apps* stored in S3 buckets `/s3/`,
- and more.

Note that the repo _doesn't work as a standalone executable,_ the scripts are merely copied here from their original setting in AWS Cloud.\
But don't worry, I've prepared an extensive slideshow demonstration of the environment for you to be able to understand the context fully.
Download it through this [link (AWS S3)](https://my-aws-environment.s3.eu-north-1.amazonaws.com/my-aws-environment.pptx)

## Table of Contents:

- [My AWS Environment](#my-aws-environment)
- [About the Environment](#about-the-environment)
- [Screenshots](#screenshots)
- [AWS Services & Technologies](#aws-services-&-technologies)
- [Setup](#setup)
- [Status](#status)
- [Credits](#credits)
- [License](#license)

## About the Environment

I built my own AWS environment utilizing many different AWS services

  - I migrated applicable parts of my already existing digital resources (e.g. web apps on Netlify, projects on GitHub) into AWS Cloud
  - There are three main components I focused on migrating:

    - My website: [jonimakinen.com](https://www.jonimakinen.com/)
    - A simple full stack app: [Translation Game](http://13.61.165.26:3000)
    - An SPA study tracker on the web: [Curriculus](https://curriculus.s3.eu-north-1.amazonaws.com/index.html)

  - I built microservice applications around these main components

    - Different AWS services play together to form fully functioning applications in the cloud

## Diagrams

![IAM diagram](/assets/diagrams/iam-diagram.png?raw=true)
![Static hosting diagram](/assets/diagrams/static-hosting.png?raw=true)
![Request counting diagram](/assets/diagrams/request-counting.png?raw=true)
![Email notification diagram](/assets/diagrams/email-notification.png?raw=true)
![VPC diagram](/assets/diagrams/vpc.png?raw=true)
![API Gateway with Lambda integration and DynamoDB connection diagram](/assets/diagrams/api-gateway-with-lambda-integration-and-dynamodb-connection.png?raw=true)

## AWS Services & Technologies

Here's an exhaustive list of AWS services I've used:

- Compute: `EC2`, `Lambda`
- Storage: `S3`, `EFS`
- Databases: `RDS`, `Dynamo`
- Networking and Content Delivery: `VPC`, `CloudFront`, `API Gateway`, `Route 53`
- Application Integration: `EventBridge`, `SNS`
- Management and Governance: `CloudWatch`, `CloudTrail`, `CloudFormation`, `Systems Manager`
- Analytics: `Athena`
- Security, Identity, and Compliance: `IAM`, `Certificate Manager`
- Cloud Financial Management: `Budgets`
- SDKs: `AWS SDK for JavaScript v2 & v3`, `Boto3`

The environment contains code written in:

- `JS` (Lambda functions, client-side scripts)
- `Python` (Lambda functions)
- `HTML` (static webpages)
- `CSS` (webpage styling)

## Status

The environment and its applications are now operational and under further development – new features are published continuously

## License

MIT license

## Credits

Date: Spring–Summer–Fall 2025\
Author: Joni Mäkinen [@jonidaniel](https://github.com/jonidaniel)
