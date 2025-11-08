# CI/CD Detection & Planning

**Generated**: 2025-01-28T15:35:00Z

## Phase 1: Detect & Plan

### 1. Requirements Files Loaded

- ✅ `.code-docs/requirements/AWS-5_requirements.md`
- ✅ `.code-docs/requirements/AWS-5-analysis.md`
- ✅ `.code-docs/requirements/AWS-5-code-analysis.md`
- ✅ `.code-docs/artifact-mappings.json`

### 2. Detected Code Types

#### Python
- **Location**: `src/lambda-python-s3-lambda-trigger/`
- **Files**: 
  - `lambda_handler.py`
  - `requirements.txt`
- **Tests**: `tests/s3-lambda-trigger/`
- **Type**: Lambda function (Python 3.12)

#### Terraform
- **Location**: `iac/terraform/`
- **Files**:
  - `versions.tf`
  - `s3-lambda-trigger-main.tf`
  - `s3-lambda-trigger-variables.tf`
  - `s3-lambda-trigger-output.tf`
  - `backend.tf`
  - `terraform.tfvars.example`
- **Type**: Infrastructure as Code

### 3. Existing Workflows Analysis

- **`.github/workflows/` directory**: Does not exist
- **Existing workflows**: None found
- **Action**: Create new workflows from scratch

### 4. Dependency Analysis

#### Artifact Mapping File Analysis

**Source**: `.code-docs/artifact-mappings.json`

**Dependencies Detected**:
- **Terraform depends on Python**: ✅ YES
  - Terraform resource: `aws_lambda_function.hello_world`
  - Terraform file: `iac/terraform/s3-lambda-trigger-main.tf`
  - Artifact reference: `lambda_function.zip`
  - Artifact path in Terraform: `iac/terraform/lambda_function.zip`
  - Lambda function: `s3-lambda-trigger-hello-world`
  - Source directory: `src/lambda-python-s3-lambda-trigger`

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

**Dependency Chain**:
- `terraform → depends on → python`
- Build order: Python first, then Terraform

**Artifact Requirements**:
- Python workflow must build and upload: `lambda_function.zip`
- Artifact name pattern: `s3-lambda-trigger-package-{environment}`
- Terraform workflow must download and place at: `iac/terraform/lambda_function.zip`

### 5. Workflow Dependency Order

**Execution Order** (topological sort):
1. **Python** (no dependencies)
2. **Terraform** (depends on Python)

**Workflow Dependencies**:
- `terraform-dev.yml` must wait for `python-dev.yml` to complete
- `terraform-test.yml` must wait for `python-test.yml` to complete
- `terraform-prd.yml` must wait for `python-prd.yml` to complete

### 6. Planned Workflows

#### Orchestrator Workflows (3 files)
- `orchestrator-dev.yml` - Triggers on `develop` branch push
- `orchestrator-test.yml` - Triggers on `main` branch push
- `orchestrator-prd.yml` - Triggers via `workflow_run` after successful `orchestrator-test.yml`

#### Python Workflows (3 files)
- `python-dev.yml` - CI + Deploy to Dev (triggers on `develop` branch push OR via orchestrator)
- `python-test.yml` - CI + Deploy to Test (triggers on `main` branch push OR via orchestrator)
- `python-prd.yml` - CI + Deploy to Prod (triggers via `workflow_run` after `python-test.yml` OR via orchestrator)

#### Terraform Workflows (3 files)
- `terraform-dev.yml` - CI + Deploy to Dev (triggers on `develop` branch push OR via orchestrator, waits for Python)
- `terraform-test.yml` - CI + Deploy to Test (triggers on `main` branch push OR via orchestrator, waits for Python)
- `terraform-prd.yml` - CI + Deploy to Prod (triggers via `workflow_run` after `terraform-test.yml` OR via orchestrator, waits for Python)

### 7. Artifact Passing Strategy

**Python Workflows**:
- Build Lambda package: `zip -r lambda_function.zip .`
- Upload artifact with name: `s3-lambda-trigger-package-{environment}`
- Artifact retention: 1 day

**Terraform Workflows**:
- Download artifact from Python workflow using `actions/download-artifact@v4`
- Artifact name: `s3-lambda-trigger-package-{environment}`
- Place artifact at: `iac/terraform/lambda_function.zip`
- Verify artifact exists before Terraform operations

### 8. Workflow Triggers

**Dev Environment**:
- Orchestrator: Push to `develop` branch
- Python: Push to `develop` branch OR `workflow_call` (orchestrator)
- Terraform: Push to `develop` branch OR `workflow_call` (orchestrator) OR `workflow_run` (wait for Python)

**Test Environment**:
- Orchestrator: Push to `main` branch
- Python: Push to `main` branch OR `workflow_call` (orchestrator)
- Terraform: Push to `main` branch OR `workflow_call` (orchestrator) OR `workflow_run` (wait for Python)

**Prod Environment**:
- Orchestrator: `workflow_run` after successful `orchestrator-test.yml` on `main` branch
- Python: `workflow_run` after successful `python-test.yml` on `main` branch OR `workflow_call` (orchestrator)
- Terraform: `workflow_run` after successful `terraform-test.yml` on `main` branch OR `workflow_call` (orchestrator) OR `workflow_run` (wait for Python Prod)

### 9. Summary

**Total Workflows to Generate**: 9 files
- 3 Orchestrator workflows (dev, test, prd)
- 3 Python workflows (dev, test, prd)
- 3 Terraform workflows (dev, test, prd)

**Dependencies**: 
- Terraform → Python (Lambda package required)

**Artifact Handling**: 
- Python builds and uploads Lambda zip
- Terraform downloads and places Lambda zip before deployment

