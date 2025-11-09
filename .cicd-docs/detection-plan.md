# CI/CD Workflow Detection & Planning

## Phase 1: Detect & Plan

### Step 1: Load Requirements Files for Dependency Analysis ✅

**Requirements Files Loaded:**
- `.code-docs/requirements/AWS-5_requirements.md`
- `.code-docs/requirements/AWS-5-analysis.md`
- `.code-docs/requirements/AWS-10_requirements.md`
- `.code-docs/requirements/AWS-10-analysis.md`

**Artifact Mapping File Loaded (PREFERRED METHOD):**
- `.code-docs/artifact-mappings.json` ✅

**Dependency Information Extracted:**

**Feature 1: s3-lambda-trigger (AWS-5)**
- Lambda function: `s3-lambda-trigger-hello-world`
- Terraform resource: `aws_lambda_function.hello_world`
- Artifact: `lambda_function.zip`
- Source path: `src/lambda-python-s3-lambda-trigger`
- Destination path: `iac/terraform/lambda_function.zip`

**Feature 2: step-function-demo (AWS-10)**
- Lambda function: `step-function-demo-hello-world`
- Terraform resource: `aws_lambda_function.step_function_demo_hello_world`
- Artifact: `lambda_function.zip`
- Source path: `src/lambda-python-step-function-demo`
- Destination path: `iac/terraform/lambda_function.zip`
- Additional Terraform resources:
  - `aws_sfn_state_machine.step_function_demo_state_machine` (depends on Lambda)
  - `aws_dynamodb_table.step_function_demo_table`

### Step 2: Scan Project Root and Subdirectories for Code Types ✅

**Detected Code Types:**

1. **Python** ✅
   - Location: `src/lambda-python-s3-lambda-trigger/`
   - Files: `lambda_handler.py`, `requirements.txt`
   - Tests: `tests/s3-lambda-trigger/`
   - Runtime: Python 3.12 (Lambda)
   - Feature: s3-lambda-trigger (AWS-5)
   
   - Location: `src/lambda-python-step-function-demo/`
   - Files: `lambda_function.py`, `requirements.txt`
   - Tests: `tests/step-function-demo/`
   - Runtime: Python 3.12 (Lambda)
   - Feature: step-function-demo (AWS-10)

2. **Terraform** ✅
   - Location: `iac/terraform/`
   - Files: 
     - `s3-lambda-trigger-main.tf`, `s3-lambda-trigger-variables.tf`, `s3-lambda-trigger-output.tf`
     - `step-function-demo-main.tf`, `step-function-demo-variables.tf`, `step-function-demo-outputs.tf`
     - `backend.tf`, `versions.tf`
   - Features: s3-lambda-trigger (AWS-5), step-function-demo (AWS-10)

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
- **Python**: Detected in two locations:
  - `src/lambda-python-s3-lambda-trigger/` with tests in `tests/s3-lambda-trigger/` (AWS-5)
  - `src/lambda-python-step-function-demo/` with tests in `tests/step-function-demo/` (AWS-10)
- **Terraform**: Detected in `iac/terraform/` with resources for both features

**Cross-Reference with Requirements:**
- ✅ Python Lambda functions match requirements (AWS-5, AWS-10)
- ✅ Terraform infrastructure matches requirements (AWS-5, AWS-10)

### Step 5: Analyze Code Dependencies ✅

**Dependency Map (from artifact-mappings.json):**

```json
[
  {
    "code_type": "terraform",
    "depends_on": "python",
    "dependency_type": "artifact",
    "artifacts": ["lambda_function.zip"],
    "description": "Terraform needs Lambda zip files for both features"
  }
]
```

**Dependency Chains**: 
- `terraform → depends on → python` (artifact dependency)
  - Both features: Terraform needs Python Lambda packages before deployment

**Artifact Dependencies Detected:**
1. **s3-lambda-trigger feature**:
   - Terraform resource `aws_lambda_function.hello_world` needs artifact from `src/lambda-python-s3-lambda-trigger`
   - Terraform variable: `lambda_zip_file` (default: `lambda_function.zip`)
   - Artifact path: `iac/terraform/lambda_function.zip`
   
2. **step-function-demo feature**:
   - Terraform resource `aws_lambda_function.step_function_demo_hello_world` needs artifact from `src/lambda-python-step-function-demo`
   - Terraform variable: `step_function_demo_lambda_zip_file` (default: `lambda_function.zip`)
   - Artifact path: `iac/terraform/lambda_function.zip`
   - **Note**: Both features use the same default artifact filename. Need to build sequentially or use unique names.

**Infrastructure Dependencies:**
- None detected: Terraform manages Lambda functions, no separate Python deploy jobs needed

**Execution Order:**
1. Python CI jobs (lint, security, tests) - parallel for both features
2. Python build - after CI jobs (builds both Lambda packages)
3. Terraform CI jobs (security, validate) - parallel
4. Terraform deploy - after Terraform CI jobs AND Python build (deploys both features)

### Step 6: Draft Single Production Workflow Plan ✅

**Unified Production Workflow** (`ci-cd.yml`):
- **Trigger**: Pushes to `main` branch (and `workflow_dispatch` for manual trigger)
- **Environment**: Single production environment only
- Contains jobs for Python and Terraform sequenced by dependencies
- Each code type has: CI jobs (lint, security, test), build job, and deploy job
- Uses GitHub `environment` for production secrets and protection rules

**Workflow Structure:**

**Python Jobs:**
- `python-lint` - Lint both Lambda functions (matrix: Python 3.10, 3.11, 3.12)
- `python-security` - Security scan for both Lambda functions
- `python-test` - Run tests for both Lambda functions (if tests exist)
- `python-build` - Build both Lambda packages:
  - Build `s3-lambda-trigger` package → `iac/terraform/lambda_function.zip` (for s3-lambda-trigger feature)
  - Build `step-function-demo` package → `iac/terraform/lambda_function.zip` (for step-function-demo feature)
  - **Note**: Since both use same filename, build sequentially or use feature-specific naming

**Terraform Jobs:**
- `terraform-security` - Security scan (Checkov)
- `terraform-validate` - Validate Terraform code
- `terraform-deploy` - Deploy infrastructure (needs Python build artifacts)

**Dependency Handling:**
- **Artifact Dependencies**: 
  - Terraform deploy job must wait for Python build job to complete
  - Python build creates Lambda packages where Terraform expects them
  - **PREFERRED APPROACH**: Combined build and deploy job (Option 1 from standards)
    - Python build steps + Terraform deploy steps in same job
    - No artifact upload/download needed
    - Simplest workflow

**Job Dependencies:**
- `python-build` needs: `[python-lint, python-security, python-test]`
- `terraform-deploy` needs: `[python-lint, python-security, python-test, terraform-security, terraform-validate]`
  - OR use combined job: `terraform-deploy` includes Python build steps and needs: `[python-lint, python-security, python-test, terraform-security, terraform-validate]`

**Execution Order:**
1. Python CI jobs (lint, security, tests) - parallel
2. Terraform CI jobs (security, validate) - parallel
3. Combined: Python build + Terraform deploy (after all CI jobs)

### Step 7: User Plan Review Checkpoint

**Summary:**
- **Detected Code Types**: Python (2 Lambda functions), Terraform (infrastructure for both features)
- **Dependencies**: Terraform depends on Python Lambda packages (artifact dependency)
- **Execution Order**: Python CI → Terraform CI (parallel) → Python Build + Terraform Deploy (combined)
- **Workflow File**: Single production workflow (`ci-cd.yml`) triggered by `main` branch push
- **Environment**: Production environment only

