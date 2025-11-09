# Step Functions Demo - AWS-10

## Overview

This project implements a demonstration of AWS Step Functions workflow orchestration capabilities. The solution includes a Step Functions state machine that orchestrates a Lambda function execution and DynamoDB record insertion, demonstrating serverless workflow automation.

## Architecture

The solution consists of:

- **AWS Step Functions State Machine** (`awsdemostatemachine`): Orchestrates the workflow
- **AWS Lambda Function** (`step-function-demo-hello-world`): Hello World function executed by Step Functions
- **Amazon DynamoDB Table** (`awsdemoddb`): Stores records with timestamp and message
- **IAM Roles and Policies**: Least privilege permissions for Step Functions and Lambda
- **CloudWatch Log Groups**: Logging for Step Functions and Lambda execution

## Workflow

The Step Functions state machine follows this workflow:

1. **InvokeLambda**: Invokes the Lambda function with the input message
2. **FormatDynamoDBRecord**: Formats the DynamoDB record with:
   - `id`: Unique identifier (UUID)
   - `Timestamp`: Current timestamp in ISO 8601 format
   - `Message`: Value from the input JSON "message" field
3. **InsertDynamoDBRecord**: Inserts the formatted record into DynamoDB

## Input Format

The Step Functions state machine accepts JSON input in the following format:

```json
{
  "message": "Hello step function"
}
```

## Output Format

The DynamoDB record will contain:

- `id`: String (UUID, partition key)
- `Timestamp`: String (ISO 8601 format)
- `Message`: String (from input JSON)

## Components

### Lambda Function

- **Runtime**: Python 3.12
- **Memory**: 128 MB
- **Timeout**: 30 seconds
- **Handler**: `lambda_function.lambda_handler`
- **Logging**: Logs message, input parameters, and execution status to CloudWatch

### DynamoDB Table

- **Name**: `awsdemoddb`
- **Partition Key**: `id` (String)
- **Billing Mode**: On-Demand
- **Encryption**: Server-side encryption enabled (AWS managed)

### Step Functions State Machine

- **Name**: `awsdemostatemachine`
- **Execution Type**: Standard
- **Logging**: CloudWatch logs with execution data

## Files Structure

```
iac/terraform/
├── step-function-demo-main.tf      # Main infrastructure resources
├── step-function-demo-variables.tf # Variable definitions
└── step-function-demo-outputs.tf   # Output values

src/lambda-python-step-function-demo/
├── lambda_function.py              # Lambda handler
└── requirements.txt                # Python dependencies

tests/step-function-demo/
└── test_lambda_handler.py         # Unit tests
```

## Prerequisites

- AWS account with appropriate permissions
- Terraform >= 1.0 installed
- AWS CLI configured
- Python 3.12 (for local testing)

## Quick Start

1. **Deploy Infrastructure**:

   ```bash
   cd iac/terraform
   terraform init
   terraform plan
   terraform apply
   ```

2. **Package Lambda Function**:

   ```bash
   cd src/lambda-python-step-function-demo
   zip lambda_function.zip lambda_function.py
   cp lambda_function.zip ../../iac/terraform/
   ```

3. **Execute Step Functions**:
   ```bash
   aws stepfunctions start-execution \
     --state-machine-arn <STATE_MACHINE_ARN> \
     --input '{"message": "Hello step function"}'
   ```

## Testing

Run unit tests:

```bash
cd tests/step-function-demo
pytest test_lambda_handler.py -v
```

## Monitoring

- **Step Functions Logs**: `/aws/vendedlogs/states/awsdemostatemachine`
- **Lambda Logs**: `/aws/lambda/step-function-demo-hello-world`

## Security

- IAM roles follow least privilege principle
- DynamoDB table encryption at rest enabled
- CloudWatch logs for audit trail
- All resources tagged with JiraId (AWS-10)

## Support

For issues or questions, refer to:

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Detailed deployment instructions
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Common issues and solutions

## License

This is a demonstration project for AWS Step Functions workflow orchestration.
