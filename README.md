# Business Process Monitoring Demo

![Alt text](images/readme-md-headers.png)

## Introduction
The project provides an working example in a node project of a 'complex' business process, and an approach to instrument monitoring into the process. The example use case attempts to replicate the process of validating and calculating an approval status and terms for a loan. It consists of a main method, which in turns performs a series of calls used to arrive at a final result. The idea is that we provide an illustration of an complex process, as an working example. All API calls are therefore emulated. 

Each time the process is executed, related information about the approval and terms of calculation are captured, and then published to an HTML report. The idea here is to provide a more concise view of activity during a transaction, eliminating the tendancy for the routine to essentially become a black box where transaction details are often hard to interpret and time consuming.

## System overview

[illustration here]

## Report output
[illustration here]

## Running the application
Check out the project
Install the application via `npm install`
Run the application via `npm run start`

This will mock an loan application, and then send it to the main routine. Logging information will be reported, in addition to business logic aggregated into an HTML report, which in turn will be generated under the /reports directory.

An in depth overview is available at my blog:

[http://www.matthewdalby.dev/articles/software-engineering/business-process-auditing](http://www.matthewdalby.dev/articles/software-engineering/business-process-auditing)