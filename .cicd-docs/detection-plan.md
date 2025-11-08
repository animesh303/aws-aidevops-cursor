# CI/CD Detection and Planning Document

## Phase 1: Detect & Plan

### Step 1: Load Requirements Files for Dependency Analysis

- [x] Scan for requirements files in `.code-docs/requirements/`
- [x] Load `AWS-5_requirements.md`
- [x] Load `artifact-mappings.json`
- [x] Extract dependency information from artifact-mappings.json

**Dependencies Identified**:
- Terraform depends on Python (Lambda package)
- Artifact: `lambda_function.zip`
- Source: `src/lambda-python-s3-lambda-trigger`
- Destination: `iac/terraform/lambda_function.zip`
- Artifact names by environment:
  - Dev: `s3-lambda-trigger-package-dev`
  - Test: `s3-lambda-trigger-package-test`
  - Prod: `s3-lambda-trigger-package-prd`

### Step 2: Scan Project Root and Subdirectories for Code Types

- [x] **Python Detected**:
  - Location: `src/lambda-python-s3-lambda-trigger/`
  - Files: `lambda_handler.py`, `requirements.txt`
  - Tests: `tests/s3-lambda-trigger/`
  - Indicators: `.py` files, `requirements.txt`

- [x] **Terraform Detected**:
  - Location: `iac/terraform/`
  - Files: `s3-lambda-trigger-main.tf`, `s3-lambda-trigger-variables.tf`, `s3-lambda-trigger-output.tf`, `backend.tf`, `versions.tf`
  - Indicators: `.tf` files, `terraform/` directory

### Step 3: Analyze Existing Workflows

- [x] Check `.github/workflows/` directory
- [x] Directory does not exist (regenerated - clean start)
- [x] No existing workflows to analyze
- [x] Action: Create new workflows

### Step 4: Identify Detected Code Types

**Summary**:
- **Python**: Lambda function code in `src/lambda-python-s3-lambda-trigger/`
- **Terraform**: Infrastructure code in `iac/terraform/`

**Cross-Reference with Requirements**:
- ✅ Python Lambda function matches requirements (Python 3.12 runtime)
- ✅ Terraform infrastructure matches requirements (S3 bucket, Lambda function, IAM roles)
- ✅ Dependencies match artifact-mappings.json

### Step 5: Analyze Code Dependencies

- [x] Load artifact-mappings.json
- [x] Extract dependency information:
  - Terraform resource `aws_lambda_function.hello_world` depends on Lambda function `s3-lambda-trigger-hello-world`
  - Terraform code references `var.lambda_zip_file` (default: `lambda_function.zip`)
  - Terraform code uses `filename = var.lambda_zip_file` in `aws_lambda_function` resource

**Dependency Map**:
```json
{
  "code_type": "terraform",
  "depends_on": "python",
  "artifacts": ["lambda_function.zip"],
  "artifact_name": "s3-lambda-trigger-package-{env}",
  "artifact_source_path": "src/lambda-python-s3-lambda-trigger",
  "artifact_destination_path": "iac/terraform/lambda_function.zip",
  "environment_artifacts": {
    "dev": "s3-lambda-trigger-package-dev",
    "test": "s3-lambda-trigger-package-test",
    "prd": "s3-lambda-trigger-package-prd"
  }
}
```

**Workflow Dependency Requirements**:
- Python workflow must complete before Terraform workflow
- Python workflow must upload Lambda package artifact
- Terraform workflow must download Lambda package artifact
- Artifact must be placed at `iac/terraform/lambda_function.zip`

### Step 6: Draft Single-Environment Workflow Plan

**Planned Workflows** (9 total):

#### Orchestrator Workflows (3):
- `orchestrator-dev.yml` - Orchestrates Python and Terraform for dev environment
- `orchestrator-test.yml` - Orchestrates Python and Terraform for test environment
- `orchestrator-prd.yml` - Orchestrates Python and Terraform for prod environment

#### Python Workflows (3):
- `python-dev.yml` - CI + Deploy to Dev (triggers on `develop` branch push)
- `python-test.yml` - CI + Deploy to Test (triggers on `main` branch push)
- `python-prd.yml` - CI + Deploy to Prod (triggers via workflow_run after test completion)

#### Terraform Workflows (3):
- `terraform-dev.yml` - CI + Deploy to Dev (triggers on `develop` branch push OR via orchestrator)
- `terraform-test.yml` - CI + Deploy to Test (triggers on `main` branch push OR via orchestrator)
- `terraform-prd.yml` - CI + Deploy to Prod (triggers via workflow_run after test completion OR via orchestrator)

**Dependency Handling**:
- Terraform workflows download Lambda package from Python workflows
- Artifact name: `s3-lambda-trigger-package-{environment}`
- Artifact destination: `iac/terraform/lambda_function.zip`
- Supports both `workflow_call` (orchestrator) and `workflow_run` triggers

**Workflow Modifications**:
- No existing workflows to modify (regenerated)
- All workflows will be newly created

### Step 7: User Plan Review Checkpoint

- [x] Present summary to user
- [x] Get user approval to proceed

### Step 8: Persist Phase Results

- [ ] Update cicd-state.md with Phase 1 completion
- [ ] Record user confirmation in audit.md
- [ ] Mark Phase 1 complete

