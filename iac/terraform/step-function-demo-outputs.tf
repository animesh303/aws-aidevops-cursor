# Changelog:
# AWS-10 - Initial outputs definition for Step Functions demo - 2025-01-28

output "step_function_demo_state_machine_arn" {
  description = "ARN of the Step Functions state machine"
  value       = aws_sfn_state_machine.step_function_demo_state_machine.arn
}

output "step_function_demo_state_machine_name" {
  description = "Name of the Step Functions state machine"
  value       = aws_sfn_state_machine.step_function_demo_state_machine.name
}

output "step_function_demo_lambda_function_arn" {
  description = "ARN of the Lambda function"
  value       = aws_lambda_function.step_function_demo_hello_world.arn
}

output "step_function_demo_lambda_function_name" {
  description = "Name of the Lambda function"
  value       = aws_lambda_function.step_function_demo_hello_world.function_name
}

output "step_function_demo_dynamodb_table_name" {
  description = "Name of the DynamoDB table"
  value       = aws_dynamodb_table.step_function_demo_table.name
}

output "step_function_demo_dynamodb_table_arn" {
  description = "ARN of the DynamoDB table"
  value       = aws_dynamodb_table.step_function_demo_table.arn
}

