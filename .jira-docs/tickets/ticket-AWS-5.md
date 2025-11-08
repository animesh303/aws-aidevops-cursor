# JIRA Ticket: AWS-5

**Fetched**: 2025-01-28T14:32:15Z

## Ticket Information

- **Key**: AWS-5
- **ID**: 10165
- **Summary**: AWS S3 Bucket trigger Lambda function.
- **Status**: In Progress
- **Priority**: Medium
- **Type**: Task
- **Project**: AWS (aws-project-sample)
- **Assignee**: Unassigned
- **Reporter**: Animesh Naskar (animesh303@gmail.com)
- **Creator**: Animesh Naskar (animesh303@gmail.com)
- **Created**: 2025-11-03T19:53:46.899+0530
- **Updated**: 2025-11-05T03:20:10.785+0530
- **Last Viewed**: 2025-11-05T03:20:48.397+0530

## Description

I want to new S3 bucket. If I upload any file to the S3 bucket a demo 'hello world' lambda function should get triggered.

---

h2. Technical Requirements Specification

h3. Project Overview
_Business Objective_: Create an event-driven serverless architecture that automatically processes files uploaded to an S3 bucket.

_Solution Summary_: Implement an S3 bucket with Lambda function integration that triggers a "Hello World" demo function whenever a file is uploaded to the bucket.

h3. Technical Specifications

* _S3 Bucket Name_: demobucketforawsaidevops
* _AWS Region_: us-east-1
* _Lambda Runtime_: Python 3.12
* _Trigger_: All file types uploaded to S3 bucket
* _Security_: Private bucket with IAM least privilege
* _Logging_: INFO level CloudWatch logs

h3. Functional Requirements

* Create S3 bucket for file uploads
* Deploy Lambda function with "Hello World" message output
* Configure S3-to-Lambda event trigger
* Ensure successful Lambda execution on file upload

h3. Acceptance Criteria

* S3 bucket created and accessible
* Lambda function deployed and functional
* File upload triggers Lambda execution
* "Hello World" message logged in CloudWatch
* Infrastructure deployed using IaC
* IAM permissions follow least privilege

h3. Architecture

* Serverless event-driven architecture
* S3 → Lambda trigger integration
* CloudWatch monitoring and logging

_Full requirements available in repository at_ `.jira-docs/requirements/AWS-5_requirements.md`

## Additional Fields

- **Components**: None
- **Labels**: None
- **Fix Versions**: None
- **Security**: None
- **Environment**: None
- **Time Tracking**: Not configured
- **Votes**: 0
- **Watches**: 1 (User is watching)
- **Issue Links**: None
- **Sub-tasks**: None
- **Attachments**: None

## Comments

### Comment 1 (2025-11-05T03:20:10.785+0530)
**Author**: Animesh Naskar

Requirements specification complete. Moving ticket to In Progress.

Technical requirements have been documented and include:
- S3 bucket: demobucketforawsaidevops (private, us-east-1)
- Lambda function: Python 3.12 runtime with "Hello World" output
- Event trigger: All file types uploaded to S3 bucket
- Infrastructure as Code deployment

Full requirements document available at: `.jira-docs/requirements/AWS-5_requirements.md`

## Work Logs

No work logs recorded.

## Raw JSON Reference

- **Self**: https://api.atlassian.com/ex/jira/ff324ad5-ef7e-40b4-ba0f-14b1781d570a/rest/api/3/issue/10165
- **JIRA URL**: https://animesh303.atlassian.net/browse/AWS-5

