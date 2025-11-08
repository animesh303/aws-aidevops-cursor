# Troubleshooting Guide

## Common Issues and Solutions

### Issue: Lambda Function Not Triggering

**Symptoms**:
- File uploaded to S3 but Lambda doesn't execute
- No logs in CloudWatch

**Diagnosis**:
```bash
# Check S3 bucket notification configuration
aws s3api get-bucket-notification-configuration --bucket demobucketforawsaidevops

# Check Lambda permissions
aws lambda get-policy --function-name s3-lambda-trigger-hello-world

# Verify Lambda function exists
aws lambda get-function --function-name s3-lambda-trigger-hello-world
```

**Solutions**:
1. Verify S3 bucket notification is configured correctly
2. Check Lambda permission allows S3 to invoke
3. Ensure Lambda function is active (not in error state)
4. Verify IAM roles have correct permissions

### Issue: No Logs in CloudWatch

**Symptoms**:
- Lambda executes but no logs appear
- CloudWatch log group empty

**Diagnosis**:
```bash
# Check if log group exists
aws logs describe-log-groups --log-group-name-prefix /aws/lambda/s3-lambda-trigger-hello-world

# Check Lambda execution role permissions
aws iam get-role-policy --role-name s3-lambda-trigger-hello-world-execution-role --policy-name s3-lambda-trigger-hello-world-logging-policy
```

**Solutions**:
1. Verify CloudWatch log group exists
2. Check Lambda execution role has `logs:CreateLogStream` and `logs:PutLogEvents` permissions
3. Verify log group ARN in IAM policy matches actual log group

### Issue: S3 Bucket Access Denied

**Symptoms**:
- Cannot upload files to bucket
- Access denied errors

**Diagnosis**:
```bash
# Check bucket public access block
aws s3api get-public-access-block --bucket demobucketforawsaidevops

# Check bucket policy
aws s3api get-bucket-policy --bucket demobucketforawsaidevops

# Verify IAM permissions
aws iam get-user-policy --user-name YOUR_USERNAME --policy-name YOUR_POLICY
```

**Solutions**:
1. Verify bucket is private (public access blocked) - this is expected
2. Ensure your AWS credentials have S3 write permissions
3. Check bucket policy allows your IAM user/role

### Issue: Lambda Function Timeout

**Symptoms**:
- Lambda function times out
- Error in CloudWatch logs

**Diagnosis**:
```bash
# Check Lambda configuration
aws lambda get-function-configuration --function-name s3-lambda-trigger-hello-world

# Check recent invocations
aws logs tail /aws/lambda/s3-lambda-trigger-hello-world --since 1h
```

**Solutions**:
1. This function should not timeout (simple logging only)
2. If timeout occurs, check for infinite loops or blocking operations
3. Verify Lambda handler code is correct

### Issue: Terraform Apply Fails

**Symptoms**:
- `terraform apply` fails with errors
- Resources partially created

**Diagnosis**:
```bash
# Check Terraform state
terraform show

# Check for specific errors in output
terraform apply 2>&1 | tee apply.log
```

**Common Errors**:

1. **Bucket name already exists**:
   - Solution: Choose a different bucket name or delete existing bucket

2. **IAM role name conflict**:
   - Solution: Delete existing role or use different name

3. **Lambda zip file not found**:
   - Solution: Ensure `lambda_function.zip` exists in `iac/terraform/` directory

4. **Insufficient permissions**:
   - Solution: Verify AWS credentials have required permissions

**Solutions**:
1. Review error messages carefully
2. Check AWS console for partially created resources
3. Clean up partial resources if needed
4. Fix configuration and retry

### Issue: Lambda Package Too Large

**Symptoms**:
- Lambda deployment fails
- Package size error

**Diagnosis**:
```bash
# Check package size
ls -lh iac/terraform/lambda_function.zip
```

**Solutions**:
1. Ensure only necessary files are included
2. Exclude `__pycache__`, `.pyc` files
3. Use Lambda layers for large dependencies
4. This function has no dependencies, so package should be small

## Debugging Commands

### Check Lambda Function Status
```bash
aws lambda get-function --function-name s3-lambda-trigger-hello-world
```

### View Recent Logs
```bash
aws logs tail /aws/lambda/s3-lambda-trigger-hello-world --since 1h --follow
```

### Test Lambda Function Manually
```bash
aws lambda invoke \
  --function-name s3-lambda-trigger-hello-world \
  --payload '{"Records":[{"s3":{"bucket":{"name":"demobucketforawsaidevops"},"object":{"key":"test.txt"}}}]}' \
  response.json
cat response.json
```

### Check S3 Bucket Configuration
```bash
aws s3api get-bucket-encryption --bucket demobucketforawsaidevops
aws s3api get-public-access-block --bucket demobucketforawsaidevops
aws s3api get-bucket-notification-configuration --bucket demobucketforawsaidevops
```

### Verify IAM Permissions
```bash
# Lambda execution role
aws iam get-role --role-name s3-lambda-trigger-hello-world-execution-role

# Lambda logging policy
aws iam get-role-policy --role-name s3-lambda-trigger-hello-world-execution-role --policy-name s3-lambda-trigger-hello-world-logging-policy
```

## Getting Help

If issues persist:
1. Check CloudWatch Logs for detailed error messages
2. Review Terraform state: `terraform show`
3. Verify all prerequisites are met
4. Check AWS service health dashboard
5. Refer to JIRA ticket AWS-5 for requirements

