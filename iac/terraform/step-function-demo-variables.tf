# Changelog:
# AWS-10 - Initial variables definition for Step Functions demo - 2025-01-28

variable "step_function_demo_aws_region" {
  description = "AWS region for Step Functions demo resources"
  type        = string
  default     = "us-east-1"
}

variable "step_function_state_machine_name" {
  description = "Name of the Step Functions state machine"
  type        = string
  default     = "awsdemostatemachine"
}

variable "step_function_demo_lambda_function_name" {
  description = "Name of the Lambda function for Step Functions demo"
  type        = string
  default     = "step-function-demo-hello-world"
}

variable "step_function_demo_lambda_zip_file" {
  description = "Path to the Lambda function zip file for Step Functions demo"
  type        = string
  default     = "lambda_function.zip"
}

variable "dynamodb_table_name" {
  description = "Name of the DynamoDB table"
  type        = string
  default     = "awsdemoddb"
}

variable "step_function_demo_jira_ticket_number" {
  description = "JIRA ticket number for Step Functions demo resource tagging"
  type        = string
  default     = "AWS-10"
}

variable "step_function_demo_environment" {
  description = "Environment name for Step Functions demo (dev, test, prod)"
  type        = string
  default     = "dev"
}

