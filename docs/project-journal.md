# Project Journal

## Initial Goal

The goal of this project was to build a personal resumé website on AWS anf use it as a practical cloud learning project.

Instead of starting with Infrastructure as Code immediately, the project was first built manually through the AWS Management Console in order to better understand how the individual services work and how they connect to each other.

The long-term plan is to use this project not only as a portfolio piece, but also as a foundation for deeper AWS and DevOps learning.

---

## Phase 1 - Frontend Creation

The project started with the creation of a simple resumé-style frontend using HTML, CSS and JavaScript.

The focus in this phase was on:
    - keeping the structure simple and readable
    - using English content throughout the page
    - presenting the site as a personal resumé / portfolio page
    - preparing the frontend for later API integration

At this point, the project was purely static.

---

## Phase 2 - Static Hosting

After the frontend files were created, they were uploaded to AWS and connected to the website delivery layer.

This phase introduced several important concepts:
    - static asset storage
    - content delivery
    - frontend deployment flow
    - caching and file update behavior

The static website began to work as a real hosted page.

---

## Phase 3 - Visitor Counter

The next major step was adding a dynamic component to the otherwise static site.

This was implemented with:
    - DynamoDB for persistence
    - Lambda for business logic
    - API Gateway for the HTTP endpoint
    - frontend JavaScript for displaying the value

This phase changed the project from a static website into a small serverless application.

---

## Phase 4 - Debugging and Stabilization

A major part of the learning process happened during debugging.

Several issues occurred in this phase, including:
    - access and delivery issues
    - frontend deployment visibility issues caused by caching
    - API integration issues
    - Lambda syntax and runtime problems

This phase was especially valuable because it forced a much deeper understanding of how the services interact.

---

## Phase 5 - CI/CD Automation

Once the site and visitor counter were working, frontend deployment was automated using GitHub Actions.

The workflow now:
    - runs on pushes to the main branch
    - authenticates to AWS using GitHub OIDC
    - syncs frontend files to S3
    - invalidates CloudFront so changes become visible

This removed the need for repeated manual frontend uploads.

---

## Reflections So Far

This project has already taught me much more than simply reading AWS documentation or preparing for certification exams.

The most valuable lessons so far have been:
    - understanding service interactions
    - learning to debug cloud issues step by step
    - becoming more comfortable with IAM, deployment and caching behavior
    - seeing how small configuration mistakes can break a working system

The project also became much more authentic because multiple problems had to be diagnosed and fixed under realistic conditions.

One important realization so far is that serverless architectures simplify infrastructure management, but shift complexity towards configuration, permissions and observability.
Understanding these trade-offs early was one of the main takeaways of this project.

---

## Next Planned Phase

The next planned step is to add a custom domain and certificate management.

After that, the project can be refined further and later recreated using Infastructure as Code.