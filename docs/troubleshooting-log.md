Back to [README](../README.md)

# Troubleshooting Log

This file documents the major technical issues encountered during the build process, along with how they were investigated and resolved.

The purpose of this log is to make the project more transparent, credible and useful as a learning resource.

---

## Incident 1 - CloudFront returned AccessDenied

### Symptop
When opening the website, CloudFront returned an XML-style 'AccessDenied' response instead of the frontend.

### Context
At this point, the frontend files had already been uploaded and the public website layer had already been configured.

### Initial Suspicions
The first suspected causes included:
- incorrect S3 permissions
- incorrect CloudFront origin access configuration
- missing or incorrect bucket policy
- a problem with how CloudFront was requesting the origin content

### Investigation
The following areas were checked:
- S3 bucket policy
- origin settings in CloudFront
- whether the bucket content existed in the expected path
- whether the correct origin was being used

### Root Cause
The setup was not fully aligned for proper delivery and later troubleshooting also revealed that the default root object configuration was missing.

### Resolution
The relevant access settings were corrected and the CloudFront configuration was updated so that the root request could correctly resolve to 'index.html'.

### Lessons Learned
Access-related errors in distributed AWS services can be misleading at first. The visible error may appear at CloudFront, while the actual underlying issue may involve S3 configuration or a missing delivery setting.

---

## Incident 2 - CloudFront root request did not resolve correctly

### Symptom
Even after the setup looked mostly correct, the website still did not load properly when opening the root URL.

### Context
CloudFront and the frontend storage were already connected.

### Root Cause
The 'Default root object' setting in CloudFront was empty.

### Resolution
Set index.html as the default root object.

### Lessons Learned

CloudFront does not automatically know which file should be served when the root path / is requested. A missing root object can break an otherwise correct setup.

---

## Incident 3 - Frontend changes did not appear after updating files

### Symptom
After changing app.js, the website still behaved as if the old version were active.

### Context
The file had already been updated locally and uploaded.

### Initial Suspicion
It initially looked as if the upload had failed or the wrong file had been deployed.

### Investigation
The deployed app.js was checked directly through the website path to confirm which version was actually being served.

### Root Cause
CloudFront was still serving a cached version of the frontend asset.

### Resolution
A CloudFront invalidation was created so the updated file would be served.

### Lessons learned
In CDN-backed deployments, uploading the new file is only part of the deployment. Cache invalidation must also be considered.

---

## Incident 4 - Visitor counter showed "not available"

### Symptom
The frontend loaded correctly, but the visitor counter displayed "not available".

### Context
The visitor counter had already been connected in the frontend through JavaScript.

### Initial Suspicions
Possible causes included:
- incorrect API URL in the deployed app.js
- stale frontend cache
- API or Lambda errors
- browser-side request restrictions

### Investigation
The live app.js file served through CloudFront was checked directly. This helped confirm whether the expected API URL had really been deployed.

### Root Cause
At one point, the deployed frontend was still serving the placeholder API URL and later additional backend issues also contributed to the failure.

### Resolution
- verified the live app.js
- uploaded the corrected version
- invalidated the CloudFront cache
- continued backend troubleshooting until the API worked correctly

### Lessons Learned
When frontend and backend are connected, it is important to verify the deployed frontend atrifact itself, not only the local source file.

---

## Incident 5 - Lambda failed due to a syntax error

### Symptom
The Lambda test failed and the API stopped functioning.

### Investigation
CloudWatch logs were reviewed to identify the exact failure.

### CloudWatch Error
"Runtime.UserCodeSyntaxError"

### Root Cause
The syntax error was corrected and the function was redeployed.

### Lessons Learned
A very small syntax error can break the entire serverless backend. CloudWatch logs are essential when debugging Lambda funtions.

---

## Incident 6 - Distinguishing between API Gateway and Lambda failures

### Symptom
At different points, it was unclear whether the failure came from the frontend, API Gateway or Lambda.

### Investigation Strategy
The system was broken down into layers:
1. verify whether the static frontend was loading
2. inspect the live deployed app.js
3. test the API URL directly
4. test Lambda directly
5. inspect CloudWatch logs

### Resolution
The issue was narrowed down step by step until the failing layer cloud be identified.

### Lesson Learned
When multiple AWS services are chained together, troubleshooting should be done layer by layer rather than by guessing.

---

## Incident 7 - GitHub Actions failed because workflow values were referenced incorrectly

### Symptom
The GitHub Actions workflow failed during AWS credential configuration.

### Root Cause
The workflow referenced values via 'secrets.*', while the actual values had been stored as repository variables.

### Resolution
The workflow was updated to use 'vars.*' for repository variables.

### Lesson Learned
CI/CD pipelines can fail because of configuration mismatches even when the logic of the workflow itself is correct.


## Overall learning

Serverless architectures remove servers, not complexity.
Effective troubleshooting requires understanding of service boundaries, execution flow and managed service behavior.
