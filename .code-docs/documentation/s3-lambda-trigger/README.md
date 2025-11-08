# S3 Lambda Trigger - Hello World

## Overview

This project implements an event-driven serverless architecture that automatically triggers a Lambda function when files are uploaded to an S3 bucket. The Lambda function logs "Hello World" to CloudWatch Logs.

**JIRA Ticket**: AWS-5  
**Feature Name**: s3-lambda-trigger  
**Status**: Complete

## Architecture

- **S3 Bucket**: `demobucketforawsaidevops` (us-east-1)
- **Lambda Function**: Python 3.12 runtime, 128 MB memory
- **Event Trigger**: S3 ObjectCreated events
- **Infrastructure**: Terraform
- **Monitoring**: CloudWatch Logs

## Prerequisites

- AWS CLI configured with appropriate credentials
- Terraform >= 1.0 installed
- Python 3.12 (for local testing)
- AWS account with permissions to create:
  - S3 buckets
  - Lambda functions
  - IAM roles and policies
  - CloudWatch log groups

## Project Structure

```
.
├── iac/terraform/              # Terraform infrastructure code
│   ├── versions.tf
│   ├── s3-lambda-trigger-main.tf
│   ├── s3-lambda-trigger-variables.tf
│   ├── s3-lambda-trigger-output.tf
│   ├── backend.tf
│   └── terraform.tfvars.example
├── src/lambda-python-s3-lambda-trigger/  # Lambda function code
│   ├── lambda_handler.py
│   └── requirements.txt
└── tests/s3-lambda-trigger/    # Unit tests
    ├── test_lambda_handler.py
    └── __init__.py
```

## Setup Instructions

### 1. Configure Terraform Backend

Update `iac/terraform/backend.tf` with your Terraform Cloud or S3 backend configuration:

```hcl
terraform {
  cloud {
    organization = "your-org"
    workspaces {
      name = "your-workspace"
    }
  }
}
```

### 2. Configure Variables

Copy the example variables file and update with your values:

```bash
cd iac/terraform
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars with your values
```

### 3. Package Lambda Function

Create the Lambda deployment package:

```bash
cd src/lambda-python-s3-lambda-trigger
zip -r ../../iac/terraform/lambda_function.zip .
cd ../../iac/terraform
```

### 4. Deploy Infrastructure

Initialize and deploy:

```bash
cd iac/terraform
terraform init
terraform plan
terraform apply
```

## Configuration

### Variables

- `aws_region`: AWS region (default: us-east-1)
- `s3_bucket_name`: S3 bucket name (default: demobucketforawsaidevops)
- `lambda_function_name`: Lambda function name (default: s3-lambda-trigger-hello-world)
- `lambda_zip_file`: Path to Lambda zip file (default: lambda_function.zip)
- `jira_ticket_number`: JIRA ticket number for tagging (default: AWS-5)
- `environment`: Environment name (default: dev)

### Outputs

After deployment, Terraform outputs:
- `s3_bucket_id`: S3 bucket ID
- `s3_bucket_arn`: S3 bucket ARN
- `lambda_function_name`: Lambda function name
- `lambda_function_arn`: Lambda function ARN
- `lambda_function_invoke_arn`: Lambda invoke ARN
- `cloudwatch_log_group_name`: CloudWatch log group name

## Testing

### Unit Tests

Run unit tests locally:

```bash
cd tests/s3-lambda-trigger
pytest test_lambda_handler.py -v
```

### Integration Testing

1. Upload a file to the S3 bucket:
   ```bash
   aws s3 cp test-file.txt s3://demobucketforawsaidevops/
   ```

2. Check CloudWatch Logs:
   ```bash
   aws logs tail /aws/lambda/s3-lambda-trigger-hello-world --follow
   ```

3. Verify "Hello World" message appears in logs

## Monitoring

### CloudWatch Logs

Lambda function logs are available in CloudWatch Logs:
- Log Group: `/aws/lambda/s3-lambda-trigger-hello-world`
- Retention: 7 days
- Log Level: INFO

### Viewing Logs

```bash
aws logs tail /aws/lambda/s3-lambda-trigger-hello-world --follow
```

## Security

- **S3 Bucket**: Private (public access blocked)
- **Encryption**: Server-side encryption with S3-managed keys (AES256)
- **IAM**: Least privilege permissions
  - Lambda execution role has CloudWatch Logs write permissions only
  - S3 bucket notification permissions configured

## Troubleshooting

### Lambda Not Triggering

1. Verify S3 bucket notification is configured:
   ```bash
   aws s3api get-bucket-notification-configuration --bucket demobucketforawsaidevops
   ```

2. Check Lambda permissions:
   ```bash
   aws lambda get-policy --function-name s3-lambda-trigger-hello-world
   ```

3. Verify Lambda function exists and is active:
   ```bash
   aws lambda get-function --function-name s3-lambda-trigger-hello-world
   ```

### No Logs in CloudWatch

1. Check Lambda execution role has CloudWatch Logs permissions
2. Verify log group exists:
   ```bash
   aws logs describe-log-groups --log-group-name-prefix /aws/lambda/s3-lambda-trigger-hello-world
   ```

### S3 Bucket Access Issues

1. Verify bucket is private (public access blocked)
2. Check IAM permissions for your AWS account
3. Verify bucket encryption is enabled

## Cleanup

To destroy all resources:

```bash
cd iac/terraform
terraform destroy
```

**Warning**: This will delete the S3 bucket and all its contents, the Lambda function, and associated resources.

## Support

For issues or questions, refer to:
- JIRA Ticket: AWS-5
- Requirements: `.code-docs/requirements/AWS-5_requirements.md`
- Analysis: `.code-docs/requirements/AWS-5-analysis.md`

