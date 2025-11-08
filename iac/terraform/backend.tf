# Changelog:
# AWS-5 - Initial backend configuration - 2025-01-28
# 
# NOTE: This is a DUMMY configuration. Please update with your actual Terraform Cloud
# or S3 backend configuration before use.

terraform {
  cloud {
    organization = "aws-devops-ai"
    workspaces {
      name = "ws-terraform"
    }
  }
}

