# Changelog:
# AWS-10 - Initial Step Functions, Lambda, and DynamoDB creation - 2025-01-28

# CloudWatch Log Group for Lambda
resource "aws_cloudwatch_log_group" "step_function_demo_lambda_log_group" {
  name              = "/aws/lambda/${var.step_function_demo_lambda_function_name}"
  retention_in_days = 7

  tags = {
    Name        = "${var.step_function_demo_lambda_function_name}-log-group"
    JiraId      = var.step_function_demo_jira_ticket_number
    ManagedBy   = "terraform"
    Environment = var.step_function_demo_environment
  }
}

# CloudWatch Log Group for Step Functions
resource "aws_cloudwatch_log_group" "step_function_demo_sf_log_group" {
  name              = "/aws/vendedlogs/states/${var.step_function_state_machine_name}"
  retention_in_days = 7

  tags = {
    Name        = "${var.step_function_state_machine_name}-log-group"
    JiraId      = var.step_function_demo_jira_ticket_number
    ManagedBy   = "terraform"
    Environment = var.step_function_demo_environment
  }
}

# DynamoDB Table
resource "aws_dynamodb_table" "step_function_demo_table" {
  name         = var.dynamodb_table_name
  billing_mode = "PAY_PER_REQUEST" # On-Demand
  hash_key     = "id"

  attribute {
    name = "id"
    type = "S" # String
  }

  server_side_encryption {
    enabled = true
  }

  tags = {
    Name        = var.dynamodb_table_name
    JiraId      = var.step_function_demo_jira_ticket_number
    ManagedBy   = "terraform"
    Environment = var.step_function_demo_environment
  }
}

# IAM Role for Lambda Execution
resource "aws_iam_role" "step_function_demo_lambda_execution_role" {
  name = "${var.step_function_demo_lambda_function_name}-execution-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })

  tags = {
    Name        = "${var.step_function_demo_lambda_function_name}-execution-role"
    JiraId      = var.step_function_demo_jira_ticket_number
    ManagedBy   = "terraform"
    Environment = var.step_function_demo_environment
  }
}

# IAM Policy for Lambda to write to CloudWatch Logs
resource "aws_iam_role_policy" "step_function_demo_lambda_logging_policy" {
  name = "${var.step_function_demo_lambda_function_name}-logging-policy"
  role = aws_iam_role.step_function_demo_lambda_execution_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "${aws_cloudwatch_log_group.step_function_demo_lambda_log_group.arn}:*"
      }
    ]
  })
}

# Lambda Function
resource "aws_lambda_function" "step_function_demo_hello_world" {
  filename         = var.step_function_demo_lambda_zip_file
  function_name    = var.step_function_demo_lambda_function_name
  role             = aws_iam_role.step_function_demo_lambda_execution_role.arn
  handler          = "lambda_function.lambda_handler"
  source_code_hash = filebase64sha256(var.step_function_demo_lambda_zip_file)
  runtime          = "python3.12"
  memory_size      = 128
  timeout          = 30

  tags = {
    Name        = var.step_function_demo_lambda_function_name
    JiraId      = var.step_function_demo_jira_ticket_number
    ManagedBy   = "terraform"
    Environment = var.step_function_demo_environment
  }

  depends_on = [
    aws_iam_role_policy.step_function_demo_lambda_logging_policy,
    aws_cloudwatch_log_group.step_function_demo_lambda_log_group
  ]
}

# IAM Role for Step Functions Execution
resource "aws_iam_role" "step_function_demo_sf_execution_role" {
  name = "${var.step_function_state_machine_name}-execution-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "states.amazonaws.com"
        }
      }
    ]
  })

  tags = {
    Name        = "${var.step_function_state_machine_name}-execution-role"
    JiraId      = var.step_function_demo_jira_ticket_number
    ManagedBy   = "terraform"
    Environment = var.step_function_demo_environment
  }
}

# IAM Policy for Step Functions to invoke Lambda and write to DynamoDB
resource "aws_iam_role_policy" "step_function_demo_sf_execution_policy" {
  name = "${var.step_function_state_machine_name}-execution-policy"
  role = aws_iam_role.step_function_demo_sf_execution_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "lambda:InvokeFunction"
        ]
        Resource = aws_lambda_function.step_function_demo_hello_world.arn
      },
      {
        Effect = "Allow"
        Action = [
          "dynamodb:PutItem"
        ]
        Resource = aws_dynamodb_table.step_function_demo_table.arn
      },
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogDelivery",
          "logs:GetLogDelivery",
          "logs:UpdateLogDelivery",
          "logs:DeleteLogDelivery",
          "logs:ListLogDeliveries",
          "logs:PutResourcePolicy",
          "logs:DescribeResourcePolicies",
          "logs:DescribeLogGroups"
        ]
        Resource = "*"
      }
    ]
  })
}

# Step Functions State Machine Definition
locals {
  state_machine_definition = jsonencode({
    Comment = "Demo Step Functions workflow that invokes Lambda and writes to DynamoDB"
    StartAt = "InvokeLambda"
    States = {
      InvokeLambda = {
        Type     = "Task"
        Resource = "arn:aws:states:::lambda:invoke"
        Parameters = {
          "FunctionName" = aws_lambda_function.step_function_demo_hello_world.function_name
          "Payload" = {
            "Input.$" = "$"
          }
        }
        ResultPath = "$.LambdaResult"
        Next       = "FormatDynamoDBRecord"
      }
      FormatDynamoDBRecord = {
        Type = "Pass"
        Parameters = {
          "id.$"        = "States.UUID()"
          "Timestamp.$" = "States.Format('{}', $$.Execution.StartTime)"
          "Message.$"   = "$.message"
        }
        Next = "InsertDynamoDBRecord"
      }
      InsertDynamoDBRecord = {
        Type     = "Task"
        Resource = "arn:aws:states:::dynamodb:putItem"
        Parameters = {
          "TableName" = aws_dynamodb_table.step_function_demo_table.name
          "Item" = {
            "id" = {
              "S.$" = "$.id"
            }
            "Timestamp" = {
              "S.$" = "$.Timestamp"
            }
            "Message" = {
              "S.$" = "$.Message"
            }
          }
        }
        End = true
      }
    }
  })
}

# Step Functions State Machine
resource "aws_sfn_state_machine" "step_function_demo_state_machine" {
  name     = var.step_function_state_machine_name
  role_arn = aws_iam_role.step_function_demo_sf_execution_role.arn
  type     = "STANDARD"

  definition = local.state_machine_definition

  logging_configuration {
    log_destination        = "${aws_cloudwatch_log_group.step_function_demo_sf_log_group.arn}:*"
    include_execution_data = true
    level                  = "ALL"
  }

  tags = {
    Name        = var.step_function_state_machine_name
    JiraId      = var.step_function_demo_jira_ticket_number
    ManagedBy   = "terraform"
    Environment = var.step_function_demo_environment
  }

  depends_on = [
    aws_lambda_function.step_function_demo_hello_world,
    aws_dynamodb_table.step_function_demo_table,
    aws_iam_role.step_function_demo_sf_execution_role,
    aws_cloudwatch_log_group.step_function_demo_sf_log_group
  ]
}
