# Troubleshooting Guide - Step Functions Demo

## Common Issues and Solutions

### Issue 1: Terraform Validation Errors

**Error**: `Error: Duplicate resource "aws_cloudwatch_log_group" configuration`

**Solution**: Ensure resource names are unique. The Step Functions demo uses prefixed resource names (e.g., `step_function_demo_lambda_log_group`) to avoid conflicts with other features.

**Error**: `Error: Missing required variable`

**Solution**: Check that all required variables are defined in `step-function-demo-variables.tf` or provided via `terraform.tfvars`.

### Issue 2: Lambda Function Not Found

**Error**: `Error: Error creating Lambda function: ResourceConflictException`

**Solution**: 
- Check if a Lambda function with the same name already exists
- Verify the Lambda zip file exists at the specified path
- Ensure the zip file is not empty

**Error**: `Error: Error creating Lambda function: InvalidParameterValueException`

**Solution**:
- Verify the handler path is correct: `lambda_function.lambda_handler`
- Ensure the runtime is supported: `python3.12`
- Check memory and timeout values are within limits

### Issue 3: Step Functions Execution Fails

**Error**: `ExecutionFailed: Lambda.Unknown`

**Solution**:
1. Check Lambda function logs:
   ```bash
   aws logs tail /aws/lambda/step-function-demo-hello-world --follow
   ```
2. Verify IAM permissions for Step Functions execution role
3. Check if Lambda function is in the same region as Step Functions

**Error**: `ExecutionFailed: DynamoDB.ThrottlingException`

**Solution**:
- Verify DynamoDB table exists and is accessible
- Check IAM permissions for DynamoDB PutItem operation
- Ensure table name matches the configuration

### Issue 4: DynamoDB Record Not Created

**Symptoms**: Step Functions execution succeeds but no record in DynamoDB

**Solution**:
1. Check Step Functions execution history:
   ```bash
   aws stepfunctions describe-execution --execution-arn <ARN>
   ```
2. Verify the `InsertDynamoDBRecord` state completed successfully
3. Check DynamoDB table permissions
4. Verify the table name in Step Functions definition matches actual table name

### Issue 5: CloudWatch Logs Not Appearing

**Symptoms**: No logs in CloudWatch for Step Functions or Lambda

**Solution**:
1. Verify CloudWatch log groups exist:
   ```bash
   aws logs describe-log-groups --log-group-name-prefix "/aws"
   ```
2. Check IAM permissions for CloudWatch Logs
3. Verify logging configuration in Step Functions state machine
4. Ensure Lambda execution role has CloudWatch Logs permissions

### Issue 6: Step Functions State Machine Definition Error

**Error**: `InvalidStateMachineDefinition: The state machine definition is invalid`

**Solution**:
1. Validate the state machine definition JSON:
   ```bash
   aws stepfunctions validate-state-machine-definition \
     --definition file://state-machine-definition.json
   ```
2. Check for syntax errors in the Terraform `local.state_machine_definition`
3. Verify all intrinsic functions are correctly formatted
4. Ensure resource ARNs are properly referenced

### Issue 7: IAM Permission Errors

**Error**: `AccessDenied: User is not authorized to perform: states:StartExecution`

**Solution**:
- Verify your AWS credentials have Step Functions permissions
- Check IAM user/role policies
- Ensure you're using the correct AWS region

**Error**: `AccessDenied: Lambda function execution role does not have permission`

**Solution**:
- Verify Lambda execution role has CloudWatch Logs permissions
- Check the IAM policy attached to the Lambda execution role
- Ensure the policy allows `logs:CreateLogStream` and `logs:PutLogEvents`

### Issue 8: Lambda Function Timeout

**Symptoms**: Lambda function times out before completing

**Solution**:
1. Check Lambda function logs for errors
2. Increase Lambda timeout in Terraform (current: 30 seconds)
3. Review Lambda function code for performance issues
4. Check CloudWatch metrics for Lambda duration

### Issue 9: DynamoDB Table Already Exists

**Error**: `ResourceInUseException: Table already exists`

**Solution**:
- Use a different table name in `step-function-demo-variables.tf`
- Or import the existing table into Terraform state:
  ```bash
  terraform import aws_dynamodb_table.step_function_demo_table <TABLE_NAME>
  ```

### Issue 10: Step Functions Execution Stuck

**Symptoms**: Execution remains in "Running" state for extended period

**Solution**:
1. Check Step Functions execution details:
   ```bash
   aws stepfunctions describe-execution --execution-arn <ARN>
   ```
2. Review execution history to identify the stuck state
3. Check CloudWatch logs for errors
4. Verify Lambda function is responding
5. Check DynamoDB table status

## Debugging Tips

### Enable Detailed Logging

1. **Step Functions**: Already configured with `level = "ALL"` and `include_execution_data = true`
2. **Lambda**: Logs are automatically sent to CloudWatch

### View Execution Graph

Use AWS Console to visualize Step Functions execution:
1. Navigate to Step Functions in AWS Console
2. Select the state machine
3. Click on an execution to view the execution graph

### Test Lambda Function Directly

Test Lambda function independently before testing Step Functions:

```bash
aws lambda invoke \
  --function-name step-function-demo-hello-world \
  --payload '{"message": "Hello step function"}' \
  response.json
cat response.json
```

### Verify IAM Permissions

Check IAM role policies:

```bash
# Step Functions execution role
aws iam get-role-policy \
  --role-name awsdemostatemachine-execution-role \
  --policy-name awsdemostatemachine-execution-policy

# Lambda execution role
aws iam get-role-policy \
  --role-name step-function-demo-hello-world-execution-role \
  --policy-name step-function-demo-hello-world-logging-policy
```

## Getting Help

If you encounter issues not covered here:

1. Check AWS CloudWatch Logs for detailed error messages
2. Review Terraform plan output for configuration issues
3. Verify all prerequisites are met
4. Check AWS service status pages
5. Review AWS Step Functions, Lambda, and DynamoDB documentation

## Useful Commands

### Check Step Functions State Machine Status

```bash
aws stepfunctions describe-state-machine \
  --state-machine-arn $(terraform output -raw step_function_demo_state_machine_arn)
```

### List Recent Executions

```bash
aws stepfunctions list-executions \
  --state-machine-arn $(terraform output -raw step_function_demo_state_machine_arn) \
  --max-results 10
```

### Check DynamoDB Table Items

```bash
aws dynamodb scan \
  --table-name $(terraform output -raw step_function_demo_dynamodb_table_name) \
  --limit 10
```

### View Lambda Function Configuration

```bash
aws lambda get-function-configuration \
  --function-name $(terraform output -raw step_function_demo_lambda_function_name)
```

### Test Lambda Function

```bash
aws lambda invoke \
  --function-name $(terraform output -raw step_function_demo_lambda_function_name) \
  --payload '{"message": "Test message"}' \
  /tmp/response.json && cat /tmp/response.json
```

