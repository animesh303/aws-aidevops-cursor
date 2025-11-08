# CI/CD Detection & Planning Document

**Created**: 2025-11-08T22:40:00Z
**Phase**: Phase 1 - Detect & Plan

## Step 1: Load Requirements Files for Dependency Analysis

- [x] Scan for requirements files
- [x] Extract dependency information
- [x] Document dependencies

### Requirements Files Loaded

- `.code-docs/requirements/AWS-5_requirements.md` - Technical requirements specification
- `.code-docs/requirements/AWS-5-analysis.md` - Requirements analysis
- `.code-docs/requirements/AWS-5-code-analysis.md` - Code analysis

### Artifact Mapping File Loaded

- `.code-docs/artifact-mappings.json` - Artifact dependency mappings

### Dependency Information Extracted

From artifact-mappings.json:
- **Terraform Resource**: `aws_lambda_function.hello_world`
- **Lambda Function**: `s3-lambda-trigger-hello-world`
- **Artifact Name**: `s3-lambda-trigger-package-dev`
- **Artifact Source Path**: `src/lambda-python-s3-lambda-trigger`
- **Artifact Destination Path**: `iac/terraform/lambda_function.zip`
- **Dependency**: Terraform depends on Python Lambda package

## Step 2: Scan Project for Code Types

- [x] Scan for Python code
- [x] Scan for Terraform code
- [x] Scan for JavaScript/TypeScript code
- [x] Scan for Java code
- [x] Scan for Go code
- [x] Scan for Docker files
- [x] Scan for Kubernetes manifests
- [x] Scan for CloudFormation templates
- [x] Scan for CDK code

### Detected Code Types

#### Python
- **Location**: `src/lambda-python-s3-lambda-trigger/`
- **Files**: 
  - `lambda_handler.py`
  - `requirements.txt`
- **Tests**: `tests/s3-lambda-trigger/`
  - `test_lambda_handler.py`
  - `__init__.py`

#### Terraform
- **Location**: `iac/terraform/`
- **Files**:
  - `backend.tf`
  - `s3-lambda-trigger-main.tf`
  - `s3-lambda-trigger-output.tf`
  - `s3-lambda-trigger-variables.tf`
  - `terraform.tfvars.example`
  - `versions.tf`

#### Other Code Types
- **JavaScript/TypeScript**: Not detected
- **Java**: Not detected
- **Go**: Not detected
- **Docker**: Not detected
- **Kubernetes**: Not detected
- **CloudFormation**: Not detected
- **CDK**: Not detected

## Step 3: Analyze Existing Workflows

- [x] Check for existing workflows directory
- [x] Document existing workflow patterns

### Existing Workflows Analysis

- **`.github/workflows/` directory**: Does not exist (deleted during regeneration)
- **Existing workflows**: None
- **Action**: Create new single production workflow

## Step 4: Identify Detected Code Types

- [x] Create summary of detected code types
- [x] Cross-reference with requirements
- [x] Validate dependencies

### Summary

**Detected Code Types**:
1. **Python** - Lambda function code in `src/lambda-python-s3-lambda-trigger/`
2. **Terraform** - Infrastructure code in `iac/terraform/`

**Requirements Cross-Reference**:
- ✅ Python Lambda function matches requirements (Python 3.12 runtime, 128 MB memory)
- ✅ Terraform infrastructure matches requirements (IaC tool specified)
- ✅ Dependencies validated: Terraform depends on Python Lambda package

## Step 5: Analyze Code Dependencies

- [x] Load artifact mapping file
- [x] Build dependency map
- [x] Document workflow dependency requirements

### Dependency Map

```json
[
  {
    "code_type": "terraform",
    "depends_on": "python",
    "artifacts": ["lambda_function.zip"],
    "artifact_name": "lambda-package",
    "artifact_source_path": "src/lambda-python-s3-lambda-trigger",
    "artifact_destination_path": "iac/terraform/lambda_function.zip"
  }
]
```

**Dependency Chain**: `terraform → depends on → python`

**Execution Order**:
1. Python (no dependencies)
2. Terraform (depends on Python)

### Workflow Dependency Requirements

- **Python Build Job**: Must produce `lambda-package` artifact (zip file)
- **Terraform Deploy Job**: Must wait for Python deploy job to complete
- **Artifact Passing**: Terraform deploy job downloads `lambda-package` artifact and moves it to `iac/terraform/lambda_function.zip`

## Step 6: Draft Single Production Workflow Plan

- [x] Plan unified production workflow
- [x] Document dependency handling
- [x] Document workflow modifications

### Unified Production Workflow Plan

**Workflow File**: `.github/workflows/ci-cd.yml`

**Trigger**:
- Pushes to `main` branch
- `workflow_dispatch` for manual trigger

**Environment**: Single production environment only

**Workflow Structure**:

#### Python Jobs
1. **python-lint** - Lint Python code (runs in parallel)
2. **python-security** - Security scan with Bandit (runs in parallel)
3. **python-tests** - Run unit tests (runs in parallel)
4. **python-build** - Build Lambda package zip file (depends on: lint, security, tests)
5. **python-deploy** - Deploy Lambda function to AWS (depends on: build, uses `environment: production`)

#### Terraform Jobs
1. **terraform-security** - Security scan with Checkov (runs in parallel)
2. **terraform-validate** - Validate Terraform configuration (runs in parallel)
3. **terraform-deploy** - Deploy infrastructure (depends on: terraform-security, terraform-validate, python-deploy, uses `environment: production`)

**Dependency Handling**:
- Terraform deploy job waits for Python deploy job to complete
- Terraform deploy job downloads `lambda-package` artifact from Python build job
- Artifact is moved to `iac/terraform/lambda_function.zip` for Terraform to use

**Execution Order**:
1. Python CI jobs (lint, security, tests) - run in parallel
2. Python build job - runs after CI jobs
3. Python deploy job - runs after build
4. Terraform CI jobs (security, validate) - run in parallel (can start early)
5. Terraform deploy job - runs after Terraform CI jobs AND Python deploy job

### Workflow Modifications

- **New Workflow**: Create `.github/workflows/ci-cd.yml` (single unified production workflow)
- **Existing Workflows**: None (directory was deleted during regeneration)

## Step 7: User Plan Review Checkpoint

- [ ] Present summary to user
- [ ] Wait for user confirmation

## Step 8: Persist Phase Results

- [ ] Update cicd-state.md
- [ ] Record user confirmation in audit.md
- [ ] Mark plan checkboxes complete

