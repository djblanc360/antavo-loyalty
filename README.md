# Antavo Loyalty

Interfaces functionality between Shopify, Bloomreach and Antavo across Olukai and Roark for their loyalty programs. Allows for easy Antavo integration for all brands and all stores. This currently services the client-facing rewards pages and global customer object, as well as Exponea webhooks.

Documentation of endpoints can be found [here](https://documenter.getpostman.com/view/20530129/2s93zB6h9y#87ec0d33-ac86-441c-823c-9bd4c8cdd332)
## Description

 A serverless function made with Node and Express serving multiple endpoints to fulfill the role of a backend server application. This primarily handles Antavo endpoints, as well as relevant Exponea and Shopify endpoints.

 https://documenter.getpostman.com/view/20530129/2s93zB6h9y

 List of available actons:
* Opt a user in or out of the loyalty program
* Idenitfy is a user is part of the loyalty program and retrieves their relevant loyalty data
* Sends a user's completed account profile to Antavo
* Retrieve a list of a user's available activities to be awarded points and their progress for each activity
* Retrieve list of a user's available rewards
* Special endpoint to opt a user into the loyalty program. Then either add relevant customer tags to their Shopify account or create a new Shopify account if they dont have one, with the relevant customer tags included
* Special endpoint to opt a user out of the loyalty program. Then remove relevant customer tags from their loyalty account
* Mark a user as being an employee
* Update a user's Shopify account with whatever properties needed
* Retrieve a user's Exponea attributes
* Send refund order and refund item events to Antavo
* Notify Antavo that a user redeemed their annual member gift
* Notify Antavo that a user redeemed their birthday gift
* Update a user's tags on Shopify
* Notify Antavo that the user connected one of their social media accounts
* Confirm that the user is following the loyalty program provider's Instagram page


## Getting Started

### Dependencies

* aws-serverless-express: library for running Express.js application serverless, using Amazon Web Services (AWS) Lambda and API Gateway for rapid deployments

* body-parser: middleware for handling HTTP POST requests in Express.js

* cors: enable Cross-Origin Resource Sharing

* crypto: provides cryptographic functionality that includes a set of wrappers for OpenSSL's hash, HMAC, cipher, decipher, sign, and verify functions.

* dotenv:  loads environment variables for switching between different environments

* express: a web application framework for Node.js. Provides a set of middleware functions for handling HTTP requests and responses

* node-fetch: to use the Fetch API in Node.js

* query-string: a library that provides utility functions to work with query string of a URL in Node.js

### Installing

1. Install dependencies on local environment
```
npm install
```

2. Ensure the region is set to us-west-2 in serverless.yml
```
provider:
  name: aws
  runtime: nodejs14.x
  region: us-west-2
```

### Executing program

1. use the endpoints provded in client-facing feature and webhooks
2. endpoints are structured as /{folder_name}/{route_name}
EXAMPLE:
confirm a user is following on Instagram
folder = social
route = instagram_confirm
resulting endpoint = social/instagram_follow

### Deploying

run the following command in terminal
```
sls deploy
```
## Debugging
1. Go to AWS Cloudwatch
2. Find log group: antavo-aws-loyalty-triage-dev-api
3. run query to filter the events of a particular user:
```
fields @timestamp, @message
| filter @message like /{{user.email}} - /
| sort @timestamp desc
| limit 40
```

## Potential Future Updates
* Github Actions
* Update all Antavo endpoints to signed get/post

## Authors

* [@Daryl Blancaflor](dblancaflor@arch-cos.com), formally dblancaflor@olukai.com
* Mike Salvati

## Version History

* 0.1
    * Initial Release

## Acknowledgments
