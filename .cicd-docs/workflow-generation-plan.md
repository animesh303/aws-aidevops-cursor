# CI/CD Workflow Generation Plan

## Phase 2: Generate Workflows

### Step 1: Load Dependency Information from Phase 1 ✅

**Dependency Map:**
- Terraform depends on Python (artifact dependency)
- Both features: s3-lambda-trigger and step-function-demo need Lambda packages

**Artifact Requirements:**
- s3-lambda-trigger: `src/lambda-python-s3-lambda-trigger` → `iac/terraform/lambda_function.zip`
- step-function-demo: `src/lambda-python-step-function-demo` → `iac/terraform/lambda_function.zip`
- **Note**: Both use same filename - need to build sequentially or use unique names

### Step 2: Verify Clean State ✅

- `.github/workflows/` directory: Does not exist (regenerated - removed)
- **Action**: Create new single unified workflow file

### Step 3: Read Language-Specific Standards ✅

- Python standards: `.cursor/rules/cicd-phases/python-standards.mdc` ✅
- Terraform standards: `.cursor/rules/cicd-phases/terraform-standards.mdc` ✅

### Step 4: Calculate Execution Order Based on Dependencies ✅

**Execution Order:**
1. Python CI jobs (lint, security, tests) - parallel
2. Terraform CI jobs (security, validate) - parallel
3. Combined: Python build + Terraform deploy (after all CI jobs)

**Dependency Graph:**
```
python (CI) → parallel
terraform (CI) → parallel
↓
python-build + terraform-deploy (combined job)
```

### Step 5: Generate Single Production Workflow ✅

**Workflow File**: `.github/workflows/ci-cd.yml`

**Structure:**
- Trigger: `push` to `main` branch + `workflow_dispatch`
- Environment: `production` (single environment)
- Jobs:
  - Python CI: `python-lint`, `python-security`, `python-test` (parallel)
  - Terraform CI: `terraform-security`, `terraform-validate` (parallel)
  - Combined: `terraform-deploy` (includes Python build for both features + Terraform deploy)

**Dependency Handling:**
- Using **MOST PREFERRED - Combined Build and Deploy Job** pattern
- Python build steps build both Lambda packages sequentially in same job
- Terraform deploy steps use artifacts from same runner
- No artifact upload/download needed

### Step 6: Workflow Structure Requirements ✅

- Valid YAML syntax
- All GitHub Actions expressions use `${{ }}` syntax
- No job-level `hashFiles()` usage (step-level only)
- Proper job dependencies using `needs:`
- AWS OIDC configuration for Terraform jobs
- Concurrency control

### Step 7: Apply Language-Specific Standards ✅

- Python standards applied: lint (Flake8), security (Bandit), tests (pytest)
- Terraform standards applied: security (Checkov), validate (terraform validate)
- Combined job pattern: Python build + Terraform deploy in same job

### Step 8: Document Dependency Handling ✅

- Artifact dependency: Terraform needs Python Lambda packages
- Combined job pattern eliminates artifact passing
- Both features built sequentially in same job

### Step 9: Validate Workflow Linting and Dependency Handling ✅

- YAML syntax validation
- GitHub Actions expression syntax validation
- Job dependency validation
- No job-level `hashFiles()` usage
- Dependency handling steps included

### Step 10: Present Workflow YAML Preview ✅

**Workflow Generated**: `.github/workflows/ci-cd.yml`

**Key Features:**
- Single unified production workflow
- Trigger: `push` to `main` branch + `workflow_dispatch`
- Environment: `production`
- Python CI jobs: lint, security, tests (for both features)
- Terraform CI jobs: security, validate
- Combined job: Python build (both features) + Terraform deploy
- Dependency handling: Both Lambda packages built and passed to Terraform via variables

**Validation:**
- ✅ YAML syntax valid
- ✅ No linting errors
- ✅ All GitHub Actions expressions use `${{ }}` syntax
- ✅ No job-level `hashFiles()` usage (step-level only)
- ✅ Proper job dependencies
- ✅ Dependency handling steps included

### Step 11: Checkpoint

(To be completed after user confirmation)

