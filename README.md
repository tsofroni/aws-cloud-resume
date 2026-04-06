# AWS Cloud Resumé Project

## Overview

This project is a personal cloud resumé website built on AWS to demonstrate practical hands-on skills in cloud engineering.

It combines a static frontend hosted in AWS with a serverless backend for a visitor counter. The project was built manually through the AWS Management Console first in order to understand how the services interact before automating parts of the solution.

The goal was not only to get the webiste working, but also to learn how to troubleshoot real issues involving permissions, caching, deployment and service  integration.

---

## Project Goals

The main goals of this project were:

- build a personal resumé website on AWS
- understand how AWS services interact in a real project
- implement a serverless visitor counter
- automate frontend deployment using GitHub Actions
- document not only the final solution, but also the problems encountered during implementation

### In Progress
- project documentation and architecture notes

### Planned Next Steps
- custom domain with Route53
- SSL/TLS certificate with AWS Certificate Manager
- further cleanup and refinement
- later: Infrastructure as Code version

---

## Architecture Overview

### Static Content Flow

Browser -> CloudFront -> S3

### Dynamic Visitor Counter Flow

Browser -> app.js -> API Gateway -> Lambda -> DynamoDB

The frontend is delivered through CloudFront, while the visitor counter is implemented as a serverless backend component.


## AWS Services Used

### Amazon S3
Used to store the static frontend files:
    - index.html
    - styles.css
    - app.js

### Amazon CloudFront
Used to deliver the website content and cache frontend assets.

### Amazon API Gateway
Used to expose the visitor counter endpoint to the frontend.

### AWS Lambda
Used to increment and return the visitor count.

### Amazon DynamoDB
Used to store the visitor counter in a persistent NoSQL table.

### IAM
Used for access control, Lambda execution roles and GitHub OIDC federation.

### GitHub Actions
Used to automatically deploy frontend changes to AWS.


## Features implemented
- personal resumé / portfolio frontend
- static website hosting on AWS
- serverless visitor counter 
- API integration between frontend and backend
- automated frontend deployment through GitHub Actions
- automatic CloudFront invalidation after deployment


## What I learned
This project helped me better understand:
- how S3, CloudFront, Lambda, API Gateway and DynamoDB work together
- why private storage and controlled public delivery matter
- how CloudFront caching can affect deployments
- how to debug Lambda issues using CloudWatch logs
- how to set up GitHub Actions with AWS OIDC instead of long-lived credentials
- how small configuration mistakes can break an otherwise correct architecture


## Repository Structure
aws-cloud-resume/
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── docs/
│   ├── architecture-notes.md
│   ├── project-journal.md
│   └── troubleshooting-log.md
├── .github/
│   └── workflows/
│       └── deploy-frontend.yml
└── README.md


## Detailed Doumentation
More detailed notes are available here:
- [Architecture Notes](docs/architecture-notes.md)
- [Project Journal](docs/project-journal.md)
- [Troubleshooting Log](docs/troubleshooting-log.md)


## Next Steps
The next planned steps for this project are:
    - configure a custom domain with Route53
    - add an SSL/TLS certificate with AWS Certificate Manager
    - further refine the architecture
    - later recreate the infrastructure using Terraform