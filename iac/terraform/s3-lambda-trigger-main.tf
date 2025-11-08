# Changelog:
# AWS-5 - Initial S3 bucket and Lambda function creation - 2025-01-28

# S3 Bucket
resource "aws_s3_bucket" "demo_bucket" {
  bucket = var.s3_bucket_name

  tags = {
    Name        = var.s3_bucket_name
    JiraId      = var.jira_ticket_number
    ManagedBy   = "terraform"
    Environment = var.environment
  }
}

# S3 Bucket Server-Side Encryption
resource "aws_s3_bucket_server_side_encryption_configuration" "demo_bucket_encryption" {
  bucket = aws_s3_bucket.demo_bucket.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# S3 Bucket Public Access Block (Private Bucket)
resource "aws_s3_bucket_public_access_block" "demo_bucket_pab" {
  bucket = aws_s3_bucket.demo_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# CloudWatch Log Group for Lambda
resource "aws_cloudwatch_log_group" "lambda_log_group" {
  name              = "/aws/lambda/${var.lambda_function_name}"
  retention_in_days = 7

  tags = {
    Name        = "${var.lambda_function_name}-log-group"
    JiraId      = var.jira_ticket_number
    ManagedBy   = "terraform"
    Environment = var.environment
  }
}

# IAM Role for Lambda Execution
resource "aws_iam_role" "lambda_execution_role" {
  name = "${var.lambda_function_name}-execution-role"

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
    Name        = "${var.lambda_function_name}-execution-role"
    JiraId      = var.jira_ticket_number
    ManagedBy   = "terraform"
    Environment = var.environment
  }
}

# IAM Policy for Lambda to write to CloudWatch Logs
resource "aws_iam_role_policy" "lambda_logging_policy" {
  name = "${var.lambda_function_name}-logging-policy"
  role = aws_iam_role.lambda_execution_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "${aws_cloudwatch_log_group.lambda_log_group.arn}:*"
      }
    ]
  })
}

# Lambda Function
resource "aws_lambda_function" "hello_world" {
  filename         = var.lambda_zip_file
  function_name    = var.lambda_function_name
  role             = aws_iam_role.lambda_execution_role.arn
  handler          = "lambda_handler.lambda_handler"
  source_code_hash = filebase64sha256(var.lambda_zip_file)
  runtime          = "python3.12"
  memory_size      = 128

  tags = {
    Name        = var.lambda_function_name
    JiraId      = var.jira_ticket_number
    ManagedBy   = "terraform"
    Environment = var.environment
  }

  depends_on = [
    aws_iam_role_policy.lambda_logging_policy,
    aws_cloudwatch_log_group.lambda_log_group
  ]
}

# S3 Bucket Notification - Lambda Trigger
resource "aws_s3_bucket_notification" "lambda_trigger" {
  bucket = aws_s3_bucket.demo_bucket.id

  lambda_function {
    lambda_function_arn = aws_lambda_function.hello_world.arn
    events              = ["s3:ObjectCreated:*"]
  }

  depends_on = [aws_lambda_permission.s3_invoke_lambda]
}

# Lambda Permission for S3 to Invoke
resource "aws_lambda_permission" "s3_invoke_lambda" {
  statement_id  = "AllowExecutionFromS3Bucket"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.hello_world.function_name
  principal     = "s3.amazonaws.com"
  source_arn    = aws_s3_bucket.demo_bucket.arn
}

