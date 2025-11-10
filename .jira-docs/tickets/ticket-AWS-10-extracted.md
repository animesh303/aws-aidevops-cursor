# Extracted Information for Requirements Generation: AWS-10

**Ticket Key**: AWS-10
**Ticket Title**: Demo step function application
**Ticket Type**: Task
**Status**: In Progress
**Priority**: Medium

## Core Requirements

### Objective
Create a sample step function state machine that:
1. Triggers a hello world lambda function
2. Inserts a record into a demo DynamoDB table received from step function input JSON

### Input Format
```json
{
  "message": "Hello step function"
}
```

### DynamoDB Record Structure
- **Timestamp**: Current timestamp
- **Message**: As per payload (from input JSON)

## Technical Specifications (from Comments)

### Technology Stack
- **Programming Language**: Python 3.12
- **Framework**: AWS SDK for Python (boto3)
- **Infrastructure as Code**: Terraform
- **AWS Region**: us-east-1

### Lambda Function Configuration
- **Runtime**: Python 3.12
- **Memory**: 128 MB
- **Timeout**: 30 seconds
- **Logging**: Input message and execution status to CloudWatch

### Step Functions State Machine Configuration
- **Name**: demoawsaistatemachine
- **Execution Type**: Standard
- **Error Handling**: None (basic demo)

### DynamoDB Table Configuration
- **Table Name**: demoawsaidynamodb
- **Partition Key**: id (String)
- **Sort Key**: None
- **Billing Mode**: On-Demand
- **Attributes**: 
  - id (String)
  - Timestamp (ISO 8601 string)
  - Message (string)

## Acceptance Criteria (Inferred)

1. Step function state machine successfully triggers Lambda function
2. Lambda function executes and processes input message
3. DynamoDB record is created with:
   - Unique id
   - Current timestamp
   - Message from input payload
4. All components are properly configured and integrated
5. Basic AWS service functionality is operational

## Dependencies

- AWS Lambda service
- AWS Step Functions service
- AWS DynamoDB service
- IAM roles and permissions for service interactions

## Notes

- This is a demo/learning project
- Requirements document already exists at `.jira-docs/requirements/AWS-10_requirements.md`
- Architecture diagram is available in repository
- All 15 open questions have been answered and incorporated

