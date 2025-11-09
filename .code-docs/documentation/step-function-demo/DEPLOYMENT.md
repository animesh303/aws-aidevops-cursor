# Deployment Guide - Step Functions Demo

## Prerequisites

Before deploying, ensure you have:

1. **AWS Account Access**: Valid AWS credentials with permissions to create:
   - Step Functions state machines
   - Lambda functions
   - DynamoDB tables
   - IAM roles and policies
   - CloudWatch log groups

2. **Terraform Installed**: Version >= 1.0
   ```bash
   terraform version
   ```

3. **AWS CLI Configured**: 
   ```bash
   aws configure
   ```

4. **Python 3.12**: For packaging Lambda function (if not using CI/CD)

## Deployment Steps

### Step 1: Prepare Lambda Function Package

1. Navigate to the Lambda function directory:
   ```bash
   cd src/lambda-python-step-function-demo
   ```

2. Create the deployment package:
   ```bash
   zip lambda_function.zip lambda_function.py
   ```

3. Copy the package to Terraform directory:
   ```bash
   cp lambda_function.zip ../../iac/terraform/
   ```

### Step 2: Configure Terraform Variables

1. Navigate to Terraform directory:
   ```bash
   cd ../../iac/terraform
   ```

2. Review variables in `step-function-demo-variables.tf`:
   - `step_function_demo_aws_region`: AWS region (default: us-east-1)
   - `step_function_state_machine_name`: State machine name (default: awsdemostatemachine)
   - `step_function_demo_lambda_function_name`: Lambda function name (default: step-function-demo-hello-world)
   - `dynamodb_table_name`: DynamoDB table name (default: awsdemoddb)
   - `step_function_demo_jira_ticket_number`: JIRA ticket number (default: AWS-10)
   - `step_function_demo_environment`: Environment name (default: dev)

3. (Optional) Create `terraform.tfvars` to override defaults:
   ```hcl
   step_function_demo_aws_region = "us-east-1"
   step_function_state_machine_name = "awsdemostatemachine"
   step_function_demo_lambda_function_name = "step-function-demo-hello-world"
   dynamodb_table_name = "awsdemoddb"
   step_function_demo_jira_ticket_number = "AWS-10"
   step_function_demo_environment = "dev"
   ```

### Step 3: Initialize Terraform

```bash
terraform init
```

This will:
- Download the AWS provider
- Initialize the backend (if configured)

### Step 4: Review Deployment Plan

```bash
terraform plan
```

Review the planned changes:
- Step Functions state machine creation
- Lambda function creation
- DynamoDB table creation
- IAM roles and policies
- CloudWatch log groups

### Step 5: Deploy Infrastructure

```bash
terraform apply
```

Type `yes` when prompted to confirm the deployment.

### Step 6: Verify Deployment

1. **Check Step Functions State Machine**:
   ```bash
   aws stepfunctions describe-state-machine \
     --state-machine-arn $(terraform output -raw step_function_demo_state_machine_arn)
   ```

2. **Check Lambda Function**:
   ```bash
   aws lambda get-function \
     --function-name $(terraform output -raw step_function_demo_lambda_function_name)
   ```

3. **Check DynamoDB Table**:
   ```bash
   aws dynamodb describe-table \
     --table-name $(terraform output -raw step_function_demo_dynamodb_table_name)
   ```

### Step 7: Test the Workflow

1. **Execute Step Functions State Machine**:
   ```bash
   aws stepfunctions start-execution \
     --state-machine-arn $(terraform output -raw step_function_demo_state_machine_arn) \
     --input '{"message": "Hello step function"}'
   ```

2. **Check Execution Status**:
   ```bash
   aws stepfunctions describe-execution \
     --execution-arn <EXECUTION_ARN_FROM_PREVIOUS_COMMAND>
   ```

3. **Verify DynamoDB Record**:
   ```bash
   aws dynamodb scan \
     --table-name $(terraform output -raw step_function_demo_dynamodb_table_name)
   ```

## Post-Deployment

### View CloudWatch Logs

1. **Step Functions Logs**:
   ```bash
   aws logs tail /aws/vendedlogs/states/awsdemostatemachine --follow
   ```

2. **Lambda Logs**:
   ```bash
   aws logs tail /aws/lambda/step-function-demo-hello-world --follow
   ```

### Update Lambda Function Code

If you need to update the Lambda function:

1. Update `src/lambda-python-step-function-demo/lambda_function.py`
2. Recreate the package:
   ```bash
   cd src/lambda-python-step-function-demo
   zip lambda_function.zip lambda_function.py
   cp lambda_function.zip ../../iac/terraform/
   ```
3. Apply Terraform changes:
   ```bash
   cd ../../iac/terraform
   terraform apply
   ```

## Cleanup

To remove all resources:

```bash
cd iac/terraform
terraform destroy
```

Type `yes` when prompted to confirm the destruction.

**Note**: This will delete:
- Step Functions state machine
- Lambda function
- DynamoDB table (and all data)
- IAM roles and policies
- CloudWatch log groups

## Troubleshooting

See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for common issues and solutions.

## Security Considerations

- All resources are tagged with `JiraId = AWS-10` for tracking
- IAM roles follow least privilege principle
- DynamoDB table has encryption at rest enabled
- CloudWatch logs are retained for 7 days

## Next Steps

- Monitor CloudWatch logs for execution patterns
- Review DynamoDB table metrics
- Set up CloudWatch alarms if needed
- Consider adding error handling and retry logic for production use

