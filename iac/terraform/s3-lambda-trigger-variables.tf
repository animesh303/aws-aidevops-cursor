# Changelog:
# AWS-5 - Initial variables definition - 2025-01-28

variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "us-east-1"
}

variable "s3_bucket_name" {
  description = "Name of the S3 bucket"
  type        = string
  default     = "demobucketforawsaidevops"
}

variable "lambda_function_name" {
  description = "Name of the Lambda function"
  type        = string
  default     = "s3-lambda-trigger-hello-world"
}

variable "lambda_zip_file" {
  description = "Path to the Lambda function zip file"
  type        = string
  default     = "lambda_function.zip"
}

variable "jira_ticket_number" {
  description = "JIRA ticket number for tagging resources"
  type        = string
  default     = "AWS-5"
}

variable "environment" {
  description = "Environment name (dev, test, prod)"
  type        = string
  default     = "dev"
}

