# CI/CD Workflow Detection & Planning

## Phase 1: Detect & Plan

### Step 1: Load Requirements Files for Dependency Analysis ✅

**Requirements Files Loaded:**
- `.code-docs/requirements/AWS-5_requirements.md`
- `.code-docs/requirements/AWS-5-analysis.md`
- `.code-docs/requirements/AWS-5-code-analysis.md`

**Artifact Mapping File Loaded (PREFERRED METHOD):**
- `.code-docs/artifact-mappings.json` ✅

**Dependency Information Extracted:**
- Lambda function: `s3-lambda-trigger-hello-world`
- Terraform resource: `aws_lambda_function.hello_world`
- Artifact: `lambda_function.zip`
- Source path: `src/lambda-python-s3-lambda-trigger`
- Destination path: `iac/terraform/lambda_function.zip`

### Step 2: Scan Project Root and Subdirectories for Code Types ✅

**Detected Code Types:**

1. **Python** ✅
   - Location: `src/lambda-python-s3-lambda-trigger/`
   - Files: `lambda_handler.py`, `requirements.txt`
   - Tests: `tests/s3-lambda-trigger/`
   - Runtime: Python 3.12 (Lambda)

2. **Terraform** ✅
   - Location: `iac/terraform/`
   - Files: `s3-lambda-trigger-main.tf`, `s3-lambda-trigger-variables.tf`, `s3-lambda-trigger-output.tf`, `backend.tf`, `versions.tf`

**Other Code Types:**
- JavaScript/TypeScript: Not detected
- Java: Not detected
- Go: Not detected
- Docker: Not detected
- Kubernetes: Not detected
- CloudFormation: Not detected
- CDK: Not detected

### Step 3: Analyze Existing Workflows ✅

**Existing Workflows Analysis:**
- `.github/workflows/` directory: Does not exist (regenerated - removed during regeneration)
- No existing workflows to analyze
- **Action**: Create new single production workflow

### Step 4: Identify Detected Code Types ✅

**Summary:**
- **Python**: Detected in `src/lambda-python-s3-lambda-trigger/` with tests in `tests/s3-lambda-trigger/`
- **Terraform**: Detected in `iac/terraform/`

**Cross-Reference with Requirements:**
- ✅ Python Lambda function matches requirements (AWS-5)
- ✅ Terraform infrastructure matches requirements (AWS-5)
- ✅ Feature name: `s3-lambda-trigger` matches requirements

### Step 5: Analyze Code Dependencies ✅

**Artifact Mapping File Analysis (PREFERRED METHOD):**

From `.code-docs/artifact-mappings.json`:

**Lambda Functions:**
- Function: `s3-lambda-trigger-hello-world`
- Source: `src/lambda-python-s3-lambda-trigger`
- Artifact: `lambda_function.zip`
- Artifact name: `s3-lambda-trigger-package-dev`

**Terraform Resources:**
- Resource: `aws_lambda_function.hello_world`
- File: `iac/terraform/s3-lambda-trigger-main.tf`
- Artifact reference: `lambda_function.zip`
- Artifact path: `iac/terraform/lambda_function.zip`
- Depends on Lambda: `s3-lambda-trigger-hello-world`

**Dependency Map:**

1. **Artifact Dependency** (Terraform → Python):
   - **Type**: Artifact dependency
   - **Upstream**: Python build job produces `lambda_function.zip`
   - **Downstream**: Terraform deploy job consumes `lambda_function.zip`
   - **Artifact**: `lambda_function.zip`
   - **Source path**: `src/lambda-python-s3-lambda-trigger`
   - **Destination path**: `iac/terraform/lambda_function.zip`
   - **Job dependency**: `terraform-deploy` needs `python-build`

2. **Infrastructure Dependency** (Python deploy → Terraform deploy):
   - **Type**: Infrastructure dependency
   - **Upstream**: Terraform deploy creates Lambda function `s3-lambda-trigger-hello-world`
   - **Downstream**: Python deploy may update Lambda function code
   - **Infrastructure**: Lambda function must exist before Python can update it
   - **Job dependency**: `python-deploy` needs `terraform-deploy` (if Python deploy job exists)

**Execution Order:**
1. Python CI jobs (lint, security, test) - run in parallel
2. Python build - after CI jobs complete
3. Terraform CI jobs (security, validate) - run in parallel (can run alongside Python CI)
4. Terraform deploy - after Terraform CI jobs AND Python build complete
5. Python deploy - after Python build AND Terraform deploy complete (if needed)

### Step 6: Draft Single Production Workflow Plan ✅

**Unified Production Workflow Plan:**

**File**: `.github/workflows/ci-cd.yml`

**Trigger:**
- Pushes to `main` branch
- `workflow_dispatch` for manual trigger

**Environment:**
- Single production environment
- All deploy jobs use `environment: production`

**Workflow Structure:**

**Python Jobs:**
1. `python-lint` - Lint Python code (runs in parallel with other CI jobs)
2. `python-security` - Security scan with Bandit (runs in parallel)
3. `python-test` - Run unit tests (runs in parallel)
4. `python-build` - Build Lambda package (needs: python-lint, python-security, python-test)
5. `python-deploy` - Deploy Lambda function code (needs: python-build, terraform-deploy) - if needed

**Terraform Jobs:**
1. `terraform-security` - Security scan with Checkov (runs in parallel)
2. `terraform-validate` - Validate Terraform code (runs in parallel)
3. `terraform-deploy` - Deploy infrastructure (needs: terraform-security, terraform-validate, python-build)

**Job Dependencies:**
- `python-build` needs: `[python-lint, python-security, python-test]`
- `terraform-deploy` needs: `[terraform-security, terraform-validate, python-build]`
- `python-deploy` needs: `[python-build, terraform-deploy]` (if Python deploy job is needed)

**Artifact Passing:**
- Python build creates `lambda_function.zip` at `iac/terraform/lambda_function.zip`
- Terraform deploy uses the artifact from the same workflow (no upload/download needed - same filesystem)

**Workflow Modifications:**
- No existing workflows to modify (regenerated)
- Create new unified workflow: `.github/workflows/ci-cd.yml`

### Step 7: User Plan Review Checkpoint ✅

**User confirmed proceeding to Phase 2**

### Step 8: Persist Phase Results ✅

**Phase 1 results persisted to cicd-state.md**

