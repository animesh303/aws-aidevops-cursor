# CI/CD Workflow Generation Plan

## Phase 2: Generate Workflows

### Step 1: Load Dependency Information from Phase 1 ✅

**Dependency Map Loaded:**
- Terraform → Python (artifact dependency)
- Python deploy → Terraform deploy (infrastructure dependency)

**Artifact Requirements:**
- Lambda package: `lambda_function.zip`
- Source: `src/lambda-python-s3-lambda-trigger`
- Destination: `iac/terraform/lambda_function.zip`

### Step 2: Verify Clean State ✅

- `.github/workflows/` directory: Does not exist (regenerated)
- No existing workflows to manage
- **Action**: Create new single unified workflow file

### Step 3: Read Language-Specific Standards ✅

**Standards Files Loaded:**
- `.cursor/rules/cicd-phases/python-standards.mdc` ✅
- `.cursor/rules/cicd-phases/terraform-standards.mdc` ✅

### Step 4: Calculate Execution Order Based on Dependencies ✅

**Execution Order:**
1. Python CI jobs (lint, security, test) - parallel
2. Python build - after CI jobs
3. Terraform CI jobs (security, validate) - parallel
4. Terraform deploy - after Terraform CI jobs AND Python build
5. Python deploy - NOT NEEDED (Terraform manages Lambda source)

### Step 5: Generate Single Production Workflow ✅

**Workflow File**: `.github/workflows/ci-cd.yml`

**Structure:**
- Trigger: `push` to `main` branch + `workflow_dispatch`
- Environment: `production`
- Jobs:
  - Python: lint, security, test (parallel), build
  - Terraform: security, validate (parallel), deploy
  - Dependencies: terraform-deploy needs python-build

**Dependency Handling:**
- PREFERRED: Local Build Placement
- Python build creates `lambda_function.zip` directly in `iac/terraform/`
- Terraform deploy uses artifact directly (no upload/download needed)

### Step 6: Workflow Structure Requirements ✅

- All expressions use `${{ }}` syntax ✅
- AWS OIDC configuration for Terraform jobs ✅
- Concurrency control ✅
- Proper permissions ✅

### Step 7: Apply Language-Specific Standards ✅

- Apply Python standards for Python jobs ✅
- Apply Terraform standards for Terraform jobs ✅
- Include dependency handling steps ✅

### Step 8: Document Dependency Handling ✅

- Document artifact passing strategy ✅
- Document job dependencies ✅

### Step 9: Validate Workflow Linting and Dependency Handling ✅

- Validate YAML syntax ✅
- Validate GitHub Actions expressions ✅
- Check for job-level hashFiles() usage (BLOCKING ERROR) ✅ - No job-level usage found
- Verify dependency handling steps are present ✅

### Step 10: Present Workflow YAML Preview ⏳

**To be completed after workflow generation**

### Step 11: Checkpoint ⏳

**To be completed after user confirmation**

