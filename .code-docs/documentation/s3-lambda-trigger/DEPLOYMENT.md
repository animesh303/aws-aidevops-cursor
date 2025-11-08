# Deployment Guide

## Pre-Deployment Checklist

- [ ] AWS CLI configured and authenticated
- [ ] Terraform >= 1.0 installed
- [ ] Backend configuration updated in `backend.tf`
- [ ] Variables configured in `terraform.tfvars`
- [ ] Lambda function packaged as `lambda_function.zip`
- [ ] AWS account has required permissions

## Deployment Steps

### Step 1: Prepare Lambda Package

```bash
# Navigate to Lambda source directory
cd src/lambda-python-s3-lambda-trigger

# Create deployment package
zip -r ../../iac/terraform/lambda_function.zip .

# Verify package created
ls -lh ../../iac/terraform/lambda_function.zip
```

### Step 2: Configure Terraform

```bash
cd ../../iac/terraform

# Copy and edit variables
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars with your values

# Update backend.tf with your Terraform Cloud or S3 backend
# (if using remote state)
```

### Step 3: Initialize Terraform

```bash
terraform init
```

### Step 4: Review Plan

```bash
terraform plan
```

Review the plan to ensure:

- S3 bucket will be created with correct name
- Lambda function configuration is correct
- IAM roles and policies are properly configured
- All resources have correct tags

### Step 5: Deploy

```bash
terraform apply
```

Type `yes` when prompted to confirm deployment.

### Step 6: Verify Deployment

```bash
# Check S3 bucket
aws s3 ls | grep demobucketforawsaidevops

# Check Lambda function
aws lambda get-function --function-name s3-lambda-trigger-hello-world

# Check CloudWatch log group
aws logs describe-log-groups --log-group-name-prefix /aws/lambda/s3-lambda-trigger-hello-world
```

### Step 7: Test

```bash
# Upload test file
echo "Hello World" > test-file.txt
aws s3 cp test-file.txt s3://demobucketforawsaidevops/

# Check Lambda logs
aws logs tail /aws/lambda/s3-lambda-trigger-hello-world --follow
```

You should see "Hello World" in the logs.

## Post-Deployment

### Verify Resources

1. **S3 Bucket**:

   - Bucket exists: `demobucketforawsaidevops`
   - Encryption enabled (AES256)
   - Public access blocked
   - Versioning disabled

2. **Lambda Function**:

   - Function exists: `s3-lambda-trigger-hello-world`
   - Runtime: Python 3.12
   - Memory: 128 MB
   - Handler: `lambda_handler.lambda_handler`

3. **IAM**:

   - Execution role created
   - CloudWatch Logs permissions configured
   - S3 invoke permission configured

4. **CloudWatch**:
   - Log group created: `/aws/lambda/s3-lambda-trigger-hello-world`
   - Retention: 7 days

## Updating Lambda Function

When updating the Lambda function code:

1. Update code in `src/lambda-python-s3-lambda-trigger/`
2. Re-package:
   ```bash
   cd src/lambda-python-s3-lambda-trigger
   zip -r ../../iac/terraform/lambda_function.zip .
   ```
3. Apply Terraform:
   ```bash
   cd ../../iac/terraform
   terraform apply
   ```

## Rollback

If deployment fails or issues occur:

1. Review Terraform state:

   ```bash
   terraform show
   ```

2. Destroy specific resources if needed:

   ```bash
   terraform destroy -target=aws_lambda_function.hello_world
   ```

3. Full rollback:
   ```bash
   terraform destroy
   ```

## Environment-Specific Deployment

For different environments (dev, test, prod):

1. Create environment-specific variable files:

   - `terraform.tfvars.dev`
   - `terraform.tfvars.test`
   - `terraform.tfvars.prod`

2. Deploy with specific file:
   ```bash
   terraform apply -var-file=terraform.tfvars.dev
   ```
