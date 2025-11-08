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
2. Terraform CI jobs (security, validate) - parallel
3. Terraform deploy (combined: Python build + Terraform deploy) - after all CI jobs

**Pattern Selected**: Option 1 - MOST PREFERRED - Combined Build and Deploy Job
- No separate `python-build` job needed
- Python build steps included in `terraform-deploy` job
- Build happens in same runner as Terraform deploy
- Benefits: No artifact passing needed, simplest workflow, fewer jobs

### Step 5: Generate Single Production Workflow ✅

**Workflow File**: `.github/workflows/ci-cd.yml`

**Structure:**
- Trigger: `push` to `main` branch + `workflow_dispatch`
- Environment: `production`
- Jobs:
  - Python: lint, security, test (parallel)
  - Terraform: security, validate (parallel)
  - Terraform deploy: Combined Python build + Terraform deploy (needs: all CI jobs)

**Dependency Handling:**
- MOST PREFERRED: Combined Job Pattern
- Python build steps in same job as Terraform deploy
- No artifact upload/download needed (same runner)
- Simplest workflow with fewer jobs

### Step 6: Workflow Structure Requirements ✅

- All expressions use `${{ }}` syntax ✅
- AWS OIDC configuration for Terraform jobs ✅
- Concurrency control ✅
- Proper permissions ✅

### Step 7: Apply Language-Specific Standards ✅

- Apply Python standards for Python jobs ✅
- Apply Terraform standards for Terraform jobs ✅
- Use combined job pattern for dependency handling ✅

### Step 8: Document Dependency Handling ✅

- Document combined job pattern
- Document job dependencies

### Step 9: Validate Workflow Linting and Dependency Handling ✅

- Validate YAML syntax ✅
- Validate GitHub Actions expressions ✅
- Check for job-level hashFiles() usage (BLOCKING ERROR) ✅ - No job-level usage found
- Verify dependency handling steps are present ✅
- All hashFiles() usage is at step level only (lines 88, 92) ✅

### Step 10: Present Workflow YAML Preview ⏳

**To be completed after workflow generation**

### Step 11: Checkpoint ⏳

**To be completed after user confirmation**

