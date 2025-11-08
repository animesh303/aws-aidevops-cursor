# Phase 1: Detection & Planning

## Steps

- [x] Load Requirements Files for Dependency Analysis
- [x] Scan Project Root and Subdirectories for Code Types
- [x] Analyze Existing Workflows
- [x] Identify Detected Code Types
- [x] Analyze Code Dependencies
- [x] Draft Single Production Workflow Plan
- [x] User Plan Review Checkpoint
- [x] Persist Phase Results (State & Audit)

## Detection Results

### Requirements Files Loaded

- `.code-docs/requirements/AWS-5_requirements.md` - Technical requirements specification
- `.code-docs/requirements/AWS-5-analysis.md` - Requirements analysis
- `.code-docs/requirements/AWS-5-code-analysis.md` - Code analysis
- `.code-docs/artifact-mappings.json` - Artifact dependency mappings

### Detected Code Types

1. **Python**
   - Location: `src/lambda-python-s3-lambda-trigger/`
   - Test Location: `tests/s3-lambda-trigger/`
   - Files: `lambda_handler.py`, `requirements.txt`
   - Runtime: Python 3.12
   - Lambda Function: `s3-lambda-trigger-hello-world`

2. **Terraform**
   - Location: `iac/terraform/`
   - Files: `s3-lambda-trigger-main.tf`, `s3-lambda-trigger-variables.tf`, `s3-lambda-trigger-output.tf`, `backend.tf`, `versions.tf`
   - Resources: S3 bucket, Lambda function, IAM roles, CloudWatch log group

### Existing Workflows

- **`.github/workflows/` directory**: Does not exist (regenerated)
- **Existing workflows**: None
- **Action**: Create new single production workflow

### Dependency Analysis

#### Artifact Dependency (from artifact-mappings.json)

- **Terraform → depends on → Python** (artifact dependency)
  - Terraform resource `aws_lambda_function.hello_world` needs artifact `lambda_function.zip`
  - Artifact source: `src/lambda-python-s3-lambda-trigger`
  - Artifact destination: `iac/terraform/lambda_function.zip`
  - Artifact name: `s3-lambda-trigger-package-dev`
  - Job dependency: `terraform-deploy` needs `python-build`

#### Infrastructure Dependency (from code analysis)

- **Python deploy → depends on → Terraform deploy** (infrastructure dependency)
  - Python deploy needs Lambda function to exist (created by Terraform deploy)
  - Terraform creates `aws_lambda_function.hello_world` resource
  - Job dependency: `python-deploy` needs `terraform-deploy`

#### Dependency Map

```json
[
  {
    "code_type": "terraform",
    "depends_on": "python",
    "dependency_type": "artifact",
    "artifacts": ["lambda_function.zip"],
    "artifact_name": "s3-lambda-trigger-package-dev",
    "artifact_source_path": "src/lambda-python-s3-lambda-trigger",
    "artifact_destination_path": "iac/terraform/lambda_function.zip"
  },
  {
    "code_type": "python",
    "depends_on": "terraform",
    "dependency_type": "infrastructure",
    "description": "Python deploy needs Terraform to create Lambda function first"
  }
]
```

**Dependency Chains**: 
- `terraform → depends on → python` (artifact dependency)
- `python-deploy → depends on → terraform-deploy` (infrastructure dependency)

**Execution Order**:

1. Python CI jobs (lint, security, tests) - parallel
2. Python build - after CI jobs
3. Terraform CI jobs (security, validate) - parallel
4. Terraform deploy - after Terraform CI jobs AND Python build
5. Python deploy - after Python build AND Terraform deploy

### Single Production Workflow Plan

**Workflow File**: `.github/workflows/ci-cd.yml`

**Trigger**: 
- Pushes to `main` branch
- `workflow_dispatch` for manual execution

**Environment**: Single production environment (all deploy jobs use `environment: production`)

**Job Structure**:

1. **Python CI Jobs** (run in parallel):
   - `python-lint`: Lint Python code
   - `python-security`: Security scanning
   - `python-test`: Run unit tests

2. **Python Build Job**:
   - `python-build`: Build Lambda package (creates `lambda_function.zip`)
   - Uploads artifact: `s3-lambda-trigger-package-dev`

3. **Terraform CI Jobs** (run in parallel):
   - `terraform-security`: Security scanning
   - `terraform-validate`: Validate Terraform code

4. **Terraform Deploy Job**:
   - `terraform-deploy`: Deploy infrastructure
   - Depends on: `python-build` (needs Lambda zip artifact)
   - Downloads artifact: `s3-lambda-trigger-package-dev`
   - Places artifact at: `iac/terraform/lambda_function.zip`

5. **Python Deploy Job**:
   - `python-deploy`: Update Lambda function code
   - Depends on: `python-build` AND `terraform-deploy` (needs Lambda function to exist)
   - Downloads artifact: `s3-lambda-trigger-package-dev`

**Artifact Passing Strategy**:
- Python build creates `lambda_function.zip` and uploads as GitHub Actions artifact
- Terraform deploy downloads artifact and places it in `iac/terraform/` directory
- Python deploy downloads artifact for function code updates

**Infrastructure Creation Order**:
- Terraform deploy creates Lambda function infrastructure first
- Python deploy updates function code after infrastructure exists
