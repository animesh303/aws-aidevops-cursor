# Technical Requirements Specification

## Document Information

- **Ticket Number**: AWS-10
- **Ticket Title**: Demo step function application
- **Created Date**: 2025-11-09T21:43:30.999+0530
- **Last Updated**: 2025-11-10T15:57:51Z
- **Status**: In Progress

## 1. Project Overview

**Business Objective**: Create a demonstration Step Functions state machine to showcase AWS serverless orchestration capabilities, integrating Lambda functions and DynamoDB for data persistence.

**Solution Summary**: Implement a serverless Step Functions state machine that orchestrates a Lambda function execution and DynamoDB record insertion. The state machine receives JSON input, triggers a "hello world" Lambda function, and stores the processed data in a DynamoDB table with timestamp and message attributes.

**Scope**: 
- **Included**: Step Functions state machine, Lambda function (Python 3.12), DynamoDB table, IAM roles and permissions, Terraform infrastructure code
- **Out of Scope**: Error handling beyond basic demo, retry logic, advanced monitoring/alerting, multi-region deployment, authentication/authorization

## 2. Functional Requirements

### 2.1 Core Functionality

- **FR-1**: Step Functions state machine must receive JSON input with a "message" field and trigger a Lambda function
- **FR-2**: Lambda function must execute successfully and process the input message, logging execution status to CloudWatch
- **FR-3**: Step Functions state machine must insert a record into DynamoDB table with:
  - Unique identifier (id)
  - Current timestamp (ISO 8601 format)
  - Message from input payload
- **FR-4**: All AWS service integrations must function correctly (Step Functions → Lambda → DynamoDB)

### 2.2 User Interactions

- **API-1**: Step Functions state machine accepts JSON input via direct execution (manual trigger or API call)
- **Data-1**: Input JSON format: `{"message": "Hello step function"}`
- **Data-2**: DynamoDB record structure: `{id: <unique-id>, Timestamp: <ISO-8601-timestamp>, Message: <from-input>}`

### 2.3 Data Requirements

**Data Input**: JSON payload with "message" field provided to Step Functions state machine execution

**Data Processing**: 
- Step Functions passes input to Lambda function
- Lambda function processes message and logs execution
- Step Functions receives Lambda output and constructs DynamoDB record
- DynamoDB record includes generated unique id and current timestamp

**Data Output**: DynamoDB record persisted in table with id, Timestamp, and Message attributes

**Data Volume**: Demo-level data volumes (low frequency, minimal data size)

## 3. Non-Functional Requirements

### 3.1 Performance

- **Response Time**: Step Functions execution should complete within Lambda timeout (30 seconds)
- **Throughput**: Not specified (demo use case)
- **Scalability**: Basic demo scalability (no specific scaling requirements)

### 3.2 Security

- **Authentication**: No authentication required (demo environment)
- **Authorization**: IAM roles with least privilege:
  - Step Functions execution role with permission to invoke Lambda
  - Lambda execution role with permission to write to DynamoDB table
  - Step Functions execution role with permission to write to DynamoDB table
- **Data Protection**: Standard AWS encryption at rest and in transit
- **Audit**: CloudWatch logs for Lambda execution and Step Functions execution history

### 3.3 Reliability

- **Availability**: Standard AWS service availability (no specific SLA requirement for demo)
- **Disaster Recovery**: Not applicable (demo environment)
- **Backup**: Not required (demo data)

### 3.4 Operational

- **Monitoring**: CloudWatch logs for Lambda function execution and Step Functions execution history
- **Logging**: 
  - Lambda function logs input message and execution status
  - Step Functions execution logs available in AWS Console
- **Alerting**: Not required (demo environment)

## 4. Technical Specifications

### 4.1 Architecture

**Architecture Approach**: Serverless architecture using AWS managed services (Step Functions, Lambda, DynamoDB)

**Architecture Diagram**: Visual representation of the AWS architecture:

![Architecture Diagram](./AWS-10-architecture-diagram.png)

**Figure 1: AWS Architecture Diagram**

> **Note**: The architecture diagram is automatically generated based on the requirements. If the diagram is missing or incomplete, ensure that Section 4.2 (AWS Services) contains sufficient detail about the services and components to be used.

**Technology Stack**:

- **Programming Language**: Python 3.12
- **Framework**: AWS SDK for Python (boto3)
- **Infrastructure as Code**: Terraform
- **Database**: DynamoDB (NoSQL)

### 4.2 AWS Services

- **Compute**: AWS Lambda (Python 3.12 runtime)
- **Orchestration**: AWS Step Functions (Standard execution type)
- **Storage**: Amazon DynamoDB (On-Demand billing mode)
- **Security**: AWS IAM (roles and policies)
- **Monitoring**: Amazon CloudWatch (logs and execution history)

### 4.3 Integration Points

**External Systems**: None (standalone demo application)

**API Contracts**: 
- Step Functions state machine accepts JSON input: `{"message": "<string>"}`
- Lambda function receives event from Step Functions
- DynamoDB PutItem operation with record structure: `{id: <string>, Timestamp: <ISO-8601-string>, Message: <string>}`

**Data Formats**: JSON for input/output, ISO 8601 for timestamps

### 4.4 Environment Requirements

- **Environments**: Single development/demo environment
- **Deployment**: Terraform-based infrastructure deployment
- **AWS Region**: us-east-1

### 4.5 Component Specifications

#### Lambda Function Configuration
- **Runtime**: Python 3.12
- **Memory**: 128 MB
- **Timeout**: 30 seconds
- **Handler**: Lambda handler function that processes input and logs execution
- **Logging**: Input message and execution status to CloudWatch

#### Step Functions State Machine Configuration
- **Name**: demoawsaistatemachine
- **Execution Type**: Standard
- **State Machine Definition**: 
  - State 1: Invoke Lambda function (Task state)
  - State 2: Insert record to DynamoDB (Task state)
- **Error Handling**: None (basic demo)

#### DynamoDB Table Configuration
- **Table Name**: demoawsaidynamodb
- **Partition Key**: id (String)
- **Sort Key**: None
- **Billing Mode**: On-Demand
- **Attributes**: 
  - id (String) - Partition key
  - Timestamp (String) - ISO 8601 format timestamp
  - Message (String) - Message from input payload

## 5. Acceptance Criteria

### 5.1 Functional Acceptance

- [ ] Step Functions state machine is created and deployable
- [ ] Lambda function is created, deployable, and executable
- [ ] DynamoDB table is created with correct schema (id, Timestamp, Message)
- [ ] Step Functions state machine successfully triggers Lambda function when executed
- [ ] Lambda function processes input message and logs execution status
- [ ] Step Functions state machine successfully inserts record into DynamoDB
- [ ] DynamoDB record contains correct id, Timestamp, and Message values
- [ ] End-to-end execution flow works: Input → Step Functions → Lambda → DynamoDB

### 5.2 Non-Functional Acceptance

- [ ] IAM roles are configured with least privilege permissions
- [ ] CloudWatch logs are generated for Lambda execution
- [ ] Step Functions execution history is available in AWS Console
- [ ] Terraform code successfully deploys all infrastructure components
- [ ] All components are properly integrated and functional

## 6. Dependencies

### 6.1 Technical Dependencies

- **Other JIRA Tickets**: None
- **External Services**: AWS Step Functions, AWS Lambda, Amazon DynamoDB, AWS IAM, Amazon CloudWatch
- **Infrastructure**: AWS account with appropriate permissions, Terraform installed and configured

### 6.2 Team Dependencies

- **Other Teams**: None
- **Coordination**: None

## 7. Assumptions

> **IMPORTANT**: This section should be **EMPTY** during initial requirements generation. No assumptions should be made. If information is missing or ambiguous, add it as a question in the "Open Questions" section using `[Answer]:` tags.

- _No assumptions - all information has been clarified from ticket comments and technical specifications_

## 8. Risks

- **RISK-1**: Lambda function timeout if processing takes longer than 30 seconds
  - **Impact**: Low
  - **Mitigation**: 30-second timeout is sufficient for demo "hello world" function

- **RISK-2**: DynamoDB write throttling if multiple concurrent executions
  - **Impact**: Low
  - **Mitigation**: On-Demand billing mode automatically handles scaling

- **RISK-3**: IAM permission misconfiguration preventing service interactions
  - **Impact**: Medium
  - **Mitigation**: Follow least privilege principle and test IAM roles during deployment

## 9. Open Questions

> **CRITICAL**: This section is **MANDATORY** for identifying ambiguities. All missing or unclear information must be documented here using the format shown below. Requirements approval should not proceed until all blocking questions have `[Answer]:` filled in.

All questions have been answered based on ticket comments and technical specifications. No open questions remain.

---

**Document Status**: Complete - All technical specifications provided, no blocking questions

