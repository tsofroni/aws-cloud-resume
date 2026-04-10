# Architecture Notes

## 1. Project Architecture

This project consists of two main parts:

1. a static frontend for the personal resumé website
2. a serverless backend for the visitor counter

The static frontend and the dynamic backend are intentionally separated.

## Serverless Characteristics

This architecture follows common serverless characteristics:
- no server provisioning or lifecycle management
- event-driven execution through HTTP requests
- -automatic scaling based on demand
- pay-per-use billing model
- managed infrastructure operated by AWS

These characteristics make the architecture suitable for low-traffic, sporadic workloads such as a personal website.

### High-level architecture

                ┌────────────────────┐
                │      Browser       │
                └─────────┬──────────┘
                          │
             Static site  │   Dynamic API request
                          │
            ┌─────────────▼─────────────┐
            │        CloudFront         │
            └─────────────┬─────────────┘
                          │
                          ▼
                         S3

Browser JavaScript
        │
        ▼
   API Gateway
        │
        ▼
      Lambda
        │
        ▼
    DynamoDB


## 2. Component Responsibilities

### Amazon S3
S3 stores the static frontend assets:
- index.html
- styles.css
- app.js
S3 acts as the storage layer for the website files

### Amazon CloudFront
CloudFront delivers the frontend to the browser and caches static assets.
It also acts as the public-facing content delivery layer in front of the static assets.

### Amazon API Gateway
API Gateway exposes the visitor counter through an HTTP endpoint.
The frontend JavaScript sends a request to this endpoint.

### AWS Lambda
Lambda contains the backend logic for the visitor counter.
Its job is to:
- read the current visitor count
- increment the count
- return the updated value to the frontend

### Amazon DynamoDB
DynamoDB stores the visitor count persistently.
The table uses a simple key structure and only stores the counter item for this use case.

### IAM
IAM is used to control:
- Lambda execution permissions
- access to DynamoDB
- GitHub Actions authentication into AWS

### GitHub Actions
GitHub Actions automates deployment of the frontend files.
On push to the main branch, the workflow:
- authenticates to AWS using OIDC (OpenID Connect)
- syncs frontend files to S3
- invalidates the CloudFront cache


## 3. Request Flows

### Static website request flow
1. A user opens the website
2. The browser requests the site through CloudFront
3. CloudFront retrieves or serves cached frontend files
4. The frontend is loaded in the browser

### Visitor counter request flow
1. The frontend loads in the browser
2. app.js sends a request to the API Gateway endpoint
3. API Gateway invokes Lambda
4. Lambda updates the visitor count in DynamoDB
5. Lambda returns the updated count
6. The frontend displays the new value


## 4. Design Decisions

### Why a static frontend?
A resumé website is mostly static content, so a static frontend is simpler, cheaper and easier to maintain than a traditional server-rendered application.

### Why S3?
S3 is well suited for storing static website assets.

### Why Lambda?
The visitor counter is lightweight and event-driven. A serverless function is sufficient and avoids managing servers.

### Why DynamoDB?
The project only needs a simple persistent counter. A relational database would be unnecessary overhead.

### Why API Gateway?
The browser needs a public HTTP endpoint to interact with Lambda.

### Why CloudFront?
CloudFront improves delivery performance and sits in front of the frontend content.
It also introduced important lessons around caching and deployment visibility.

### Why GitHub Actions with OIDC?
Using OIDC avoids storing long-lived AWS access keys in GitHub and more closely reflects a modern cloud deployment pattern.


## 5. Security Considerations

The project includes several security-related decisions:
- frontend deployment is authenticated through GitHub OIDC
- no long-lived AWS access keys are required in the GitHub repository
- IAM roles are used instead of embedding credentials
- service permissions were configured explicitly during implementation

As the project grows, security hardening can be improved further.


## 6. Deployment Approach

The project was intentionally built manually in the AWS Management Console first.
This approach made it easier to understand:
- how each service is configured
- how the resources connect to each other
- how to troubleshoot issues step by step
After the manual setup worked, frontend deployment was automated through GitHub Actions.


## 7. Future Architecture Changes

Planned next changes include:
- adding a custom domain with Route53
- adding TLS with AWS Certificate Manager
- refining the CloudFront and DNS setup
- later reproducing the infrastructure with Terraform