# Requirements Analysis for Code Generation: AWS-10

**Ticket Number**: AWS-10
**Ticket Title**: Demo step function application
**Analysis Date**: 2025-01-28T15:50:00Z

## Technical Specifications Extracted

### Infrastructure as Code Tool
**Selected**: Terraform
**Source**: Requirements document Section 9 (Resolved Questions) - explicitly specified

### Application Runtime
**Selected**: lambda-python
**Language**: Python
**Runtime Version**: Python 3.12
**Source**: Requirements document Section 9 (Resolved Questions) - Lambda Runtime: Python 3.12

### Feature Name
**Generated**: step-function-demo
**Rationale**: Based on ticket title "Demo step function application" - converted to kebab-case

## AWS Services to Implement

1. **AWS Step Functions** - State machine (name: awsdemostatemachine, Standard execution type)
2. **AWS Lambda** - Hello World function (Python 3.12, 128 MB, 30 seconds timeout)
3. **Amazon DynamoDB** - Table (name: awsdemoddb, partition key: id as String, On-Demand billing)
4. **IAM** - Roles and policies for Step Functions, Lambda, and DynamoDB permissions
5. **CloudWatch** - Log groups for Step Functions and Lambda

## Code Structure Plan

### Infrastructure (Terraform)
- `iac/terraform/step-function-demo-main.tf` - Main Step Functions state machine, Lambda function, DynamoDB table
- `iac/terraform/step-function-demo-variables.tf` - Variables for configuration
- `iac/terraform/step-function-demo-outputs.tf` - Outputs (state machine ARN, Lambda ARN, DynamoDB table name)
- `iac/terraform/step-function-demo-iam.tf` - IAM roles and policies

### Application Code (Python Lambda)
- `src/lambda-python-step-function-demo/lambda_function.py` - Lambda handler with Hello World functionality and CloudWatch logging
- `src/lambda-python-step-function-demo/requirements.txt` - Python dependencies (if any)

### Tests
- `tests/step-function-demo/test_lambda_handler.py` - Unit tests for Lambda handler

## Key Implementation Details

### Step Functions State Machine
- Name: awsdemostatemachine
- Execution Type: Standard
- Workflow:
  1. Invoke Lambda function (Hello World)
  2. Insert record into DynamoDB table

### Lambda Function
- Runtime: Python 3.12
- Memory: 128 MB
- Timeout: 30 seconds
- Logging: Must log message, input parameters, and execution status to CloudWatch

### DynamoDB Table
- Name: awsdemoddb
- Partition Key: id (String)
- Sort Key: None
- Billing Mode: On-Demand
- Attributes: id, Timestamp (ISO 8601 string), Message

### IAM Permissions
- Step Functions execution role: Invoke Lambda, PutItem to DynamoDB
- Lambda execution role: Write to CloudWatch Logs
- Least privilege principle applied

## Testing Requirements

- Unit tests for Lambda handler
- Test Lambda function logging functionality
- Test Step Functions state machine definition (syntax validation)

## Dependencies

- Terraform AWS provider
- Python 3.12 runtime
- AWS SDK for Python (boto3) - for Lambda function if needed

