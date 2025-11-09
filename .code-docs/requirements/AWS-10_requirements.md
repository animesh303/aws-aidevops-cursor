# Technical Requirements Specification

## Document Information

- **Ticket Number**: AWS-10
- **Ticket Title**: Demo step function application
- **Created Date**: 2025-11-09T21:43:30.999+0530
- **Last Updated**: 2025-01-28T15:35:00Z
- **Status**: To Do

## 1. Project Overview

**Business Objective**: Create a demonstration of AWS Step Functions workflow orchestration capabilities.

**Solution Summary**: Implement a Step Functions state machine that orchestrates a Lambda function execution and DynamoDB record insertion, demonstrating serverless workflow automation.

**Scope**:

- **In Scope**:
  - Create AWS Step Functions state machine
  - Deploy a "Hello World" Lambda function
  - Create a demo DynamoDB table
  - Configure Step Functions to trigger Lambda function
  - Configure Step Functions to insert record into DynamoDB table
  - Process JSON input with "message" field
  - DynamoDB record includes timestamp and message from input
- **Out of Scope**:
  - Production-grade error handling and retry logic (unless specified)
  - Advanced monitoring and alerting beyond basic CloudWatch logs
  - Multi-region deployment
  - Authentication or authorization (demo purpose)
  - Data validation beyond basic JSON structure

## 2. Functional Requirements

### 2.1 Core Functionality

- **FR-1**: Create an AWS Step Functions state machine (name: awsdemostatemachine, execution type: Standard) that orchestrates a workflow
- **FR-2**: Deploy a "Hello World" Lambda function (Python 3.12 runtime, 128 MB memory, 30 seconds timeout) that can be invoked by Step Functions
- **FR-3**: Create a demo DynamoDB table (name: awsdemoddb, partition key: id as String, no sort key, On-Demand billing mode) to store records
- **FR-4**: Configure Step Functions state machine to trigger the Lambda function as the first step
- **FR-5**: Configure Step Functions state machine to insert a record into DynamoDB table as the second step
- **FR-6**: Step Functions must accept JSON input in the format: `{"message": "Hello step function"}`
- **FR-7**: DynamoDB record must include:
  - id: unique identifier (partition key, String type)
  - Timestamp: current timestamp in ISO 8601 string format (generated at execution time)
  - Message: value from the "message" field in the Step Functions input JSON

### 2.2 User Interactions

- **API-1**: Step Functions state machine can be executed via AWS Console, CLI, or SDK
- **Data-1**: Step Functions receives JSON input with "message" field
- **Data-2**: Lambda function receives invocation from Step Functions
- **Data-3**: DynamoDB table receives record insertion from Step Functions

### 2.3 Data Requirements

**Data Input**:

- Step Functions input JSON format:
  ```json
  {
    "message": "Hello step function"
  }
  ```

**Data Processing**:

- Step Functions orchestrates workflow execution
- Lambda function executes (Hello World functionality)
- Step Functions extracts "message" from input JSON
- Step Functions generates current timestamp
- Step Functions constructs DynamoDB record with timestamp and message

**Data Output**:

- DynamoDB record with structure:
  - id: unique identifier (partition key, String type)
  - Timestamp: current timestamp (ISO 8601 string format)
  - Message: value from input JSON "message" field

**Data Volume**:

- Demo-level data volumes (not specified for production scale)

## 3. Non-Functional Requirements

### 3.1 Performance

- **Response Time**: Not specified - Step Functions should complete within standard timeout limits
- **Throughput**: Not specified - Demo-level performance expected
- **Scalability**: Not specified - Standard AWS service auto-scaling applies

### 3.2 Security

- **Authentication**: Not required for demo (Step Functions execution via AWS Console/CLI/SDK)
- **Authorization**: IAM roles with least privilege permissions for Step Functions, Lambda, and DynamoDB
- **Data Protection**:
  - DynamoDB table encryption at rest (default AWS managed encryption)
  - IAM least privilege principle for all service roles
- **Audit**: CloudWatch logs for Step Functions execution and Lambda function execution

### 3.3 Reliability

- **Availability**: Standard AWS service availability (not explicitly specified)
- **Disaster Recovery**: Not specified
- **Backup**: Not specified

### 3.4 Operational

- **Monitoring**: CloudWatch logs for Step Functions and Lambda execution
- **Logging**: INFO level CloudWatch logs for Step Functions and Lambda function. Lambda function must log: message, input parameters, and execution status.
- **Alerting**: Not specified

## 4. Technical Specifications

### 4.1 Architecture

**Architecture Approach**: Serverless workflow orchestration using Step Functions, Lambda, and DynamoDB.

**Technology Stack**:

- **Orchestration**: AWS Step Functions
- **Compute**: AWS Lambda
- **Database**: Amazon DynamoDB
- **Infrastructure**: Terraform (Infrastructure as Code)

### 4.2 AWS Services

- **Orchestration**: AWS Step Functions (State Machine)
- **Compute**: AWS Lambda (Hello World function)
- **Storage**: Amazon DynamoDB (Demo table)
- **Security**: IAM (for Step Functions, Lambda, and DynamoDB permissions)
- **Monitoring**: CloudWatch (for logging)

### 4.3 Integration Points

**External Systems**: None - standalone AWS services demonstration

**API Contracts**:

- Step Functions input: JSON format with "message" field
- Lambda function invocation: Standard Step Functions → Lambda integration
- DynamoDB record insertion: Standard Step Functions → DynamoDB integration

**Data Formats**:

- Input: JSON format
- DynamoDB record: JSON format with Timestamp and Message fields

### 4.4 Environment Requirements

- **Environments**: Single environment (development/demo) in us-east-1 region
- **Deployment**: Terraform (Infrastructure as Code)

## 5. Acceptance Criteria

### 5.1 Functional Acceptance

- [ ] Step Functions state machine is created and functional
- [ ] Lambda function is deployed and can be invoked by Step Functions
- [ ] DynamoDB table is created and accessible
- [ ] Step Functions state machine successfully triggers Lambda function
- [ ] Step Functions state machine successfully inserts record into DynamoDB
- [ ] Step Functions accepts JSON input with "message" field
- [ ] DynamoDB record contains Timestamp (current timestamp) and Message (from input)
- [ ] Infrastructure is deployed using Infrastructure as Code

### 5.2 Non-Functional Acceptance

- [ ] IAM permissions follow least privilege principle
- [ ] CloudWatch logs are configured and accessible for Step Functions and Lambda
- [ ] DynamoDB table has encryption at rest enabled (default)
- [ ] Step Functions execution completes successfully with provided JSON input

## 6. Dependencies

### 6.1 Technical Dependencies

- **Other JIRA Tickets**: None specified
- **External Services**: AWS account with appropriate permissions
- **Infrastructure**:
  - AWS account access
  - Permissions to create Step Functions, Lambda functions, DynamoDB tables, IAM roles
  - Infrastructure as Code tool installed and configured (tool to be determined)

### 6.2 Team Dependencies

- **Other Teams**: Not specified
- **Coordination**: Not specified

## 7. Assumptions

> **IMPORTANT**: This section should be **EMPTY** during initial requirements generation. No assumptions should be made. If information is missing or ambiguous, add it as a question in the "Open Questions" section using `[Answer]:` tags.

- _No assumptions - all information should be clarified through Open Questions section_

## 8. Risks

- **RISK-1**: Step Functions execution timeout if Lambda function takes too long

  - **Impact**: Low (for demo purposes)
  - **Mitigation**: Configure appropriate Lambda timeout. Standard Step Functions timeout applies.

- **RISK-2**: DynamoDB table naming conflicts if table name already exists

  - **Impact**: Low
  - **Mitigation**: Verify table name availability before creation or use unique naming convention

- **RISK-3**: IAM permission misconfiguration could prevent Step Functions from invoking Lambda or writing to DynamoDB
  - **Impact**: High
  - **Mitigation**: Follow least privilege principle and test IAM roles thoroughly

## 9. Resolved Questions

All questions have been answered and incorporated into the requirements above:

1. ✅ **IaC Tool**: Terraform
2. ✅ **AWS Region**: us-east-1
3. ✅ **Lambda Runtime**: Python 3.12
4. ✅ **Lambda Memory**: 128 MB
5. ✅ **Lambda Timeout**: 30 seconds
6. ✅ **DynamoDB Table Name**: awsdemoddb
7. ✅ **DynamoDB Partition Key**: id as String
8. ✅ **DynamoDB Sort Key**: No sort key
9. ✅ **Step Functions State Machine Name**: awsdemostatemachine
10. ✅ **Step Functions Execution Type**: Standard
11. ✅ **Error Handling**: No error handling required for demo
12. ✅ **Lambda CloudWatch Logging**: Yes - log message, input parameters, execution status
13. ✅ **DynamoDB Billing Mode**: On-Demand
14. ✅ **Additional DynamoDB Attributes**: No additional attributes beyond Timestamp and Message
15. ✅ **Timestamp Format**: ISO 8601 string

## 10. Open Questions

> **Note**: All blocking questions have been resolved. This section is kept for any future clarifications.

_No open questions at this time._

