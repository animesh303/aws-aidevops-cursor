# Extracted Information for Requirements Generation: AWS-10

**Ticket Key**: AWS-10
**Ticket Title**: Demo step function application
**Ticket Type**: Task
**Status**: To Do
**Priority**: Medium

## Key Information for Requirements Generation

### Ticket Summary
Demo step function application

### Description
Create a sample step function state machine that:
1. Trigger hello world lambda
2. Insert a record into a demo dynamo db received from step function input json.

**JSON Input Format**:
```json
{
  "message": "Hello step function"
}
```

**DynamoDB Record Structure**:
- Timestamp: current timestamp
- Message: as per payload

### Acceptance Criteria
Not explicitly provided in ticket description. Will need to be derived from the description during requirements generation.

### Ticket Type Analysis
- **Type**: Task
- **Scope**: AWS Step Functions workflow with Lambda and DynamoDB integration
- **Complexity**: Medium (involves Step Functions, Lambda, and DynamoDB)

### Key Requirements Identified
1. Create AWS Step Functions state machine
2. Deploy a "Hello World" Lambda function
3. Create a demo DynamoDB table
4. Configure Step Functions to trigger Lambda function
5. Configure Step Functions to insert record into DynamoDB
6. Handle JSON input with "message" field
7. DynamoDB record should include:
   - Timestamp (current timestamp)
   - Message (from input payload)

### Dependencies
- **Linked Tickets**: None identified
- **Subtasks**: None
- **Related Issues**: None

### Technical Context
- **AWS Services Involved**: 
  - Step Functions (State Machine)
  - Lambda (Hello World function)
  - DynamoDB (Demo table)
  - IAM (for permissions)
- **Infrastructure Type**: Serverless workflow orchestration
- **Data Flow**: Step Functions → Lambda → DynamoDB

### Questions to Clarify (for Phase 2)
1. What Infrastructure as Code (IaC) tool should be used? (Terraform, CDK, CloudFormation)
2. What region should the resources be deployed in?
3. What should be the Lambda function runtime? (Python, Node.js, etc.)
4. What should be the Lambda function memory and timeout?
5. What should be the DynamoDB table name?
6. What should be the DynamoDB table partition key structure?
7. Should the DynamoDB table have a sort key?
8. What should be the Step Functions state machine name?
9. What should be the execution type for Step Functions? (Standard or Express)
10. Should there be error handling in the Step Functions workflow?
11. What IAM permissions are needed for Step Functions to invoke Lambda and write to DynamoDB?
12. Should the Lambda function log anything to CloudWatch?
13. What should be the DynamoDB table billing mode? (On-demand or Provisioned)
14. Should the DynamoDB table have any additional attributes beyond Timestamp and Message?

