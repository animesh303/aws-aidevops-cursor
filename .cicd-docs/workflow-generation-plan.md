# CI/CD Workflow Generation Plan

## Phase 2: Generate Workflow Files

### Step 1: Load Dependency Information

- [x] Read dependency map from cicd-state.md
- [x] Identify artifact requirements:
  - Terraform depends on Python
  - Artifact: `lambda_function.zip`
  - Artifact names: `s3-lambda-trigger-package-{env}` (dev/test/prd)

### Step 2: Verify Clean State

- [x] `.github/workflows/` directory does not exist (regenerated)
- [x] No existing workflows to manage
- [x] Will create 9 new workflow files

### Step 3: Read Language-Specific Standards

- [x] Read `python-standards.mdc`
- [x] Read `terraform-standards.mdc`

### Step 4: Generate Orchestrator Workflows

- [x] Generate `orchestrator-dev.yml`
- [x] Generate `orchestrator-test.yml`
- [x] Generate `orchestrator-prd.yml`

### Step 5: Generate Python Workflows

- [x] Generate `python-dev.yml` (CI + Deploy to Dev)
- [x] Generate `python-test.yml` (CI + Deploy to Test)
- [x] Generate `python-prd.yml` (CI + Deploy to Prod)

### Step 6: Generate Terraform Workflows

- [x] Generate `terraform-dev.yml` (CI + Deploy to Dev with dependency handling)
- [x] Generate `terraform-test.yml` (CI + Deploy to Test with dependency handling)
- [x] Generate `terraform-prd.yml` (CI + Deploy to Prod with dependency handling)

### Step 7: Validate Workflow Linting

- [x] Validate YAML syntax for all workflows
- [x] Verify GitHub Actions expression syntax
- [x] Check for missing required fields
- [x] Verify job dependencies
- [x] Validate workflow triggers
- [x] Check environment names
- [x] Verify artifact paths and names
- [x] Validate dependency handling steps in Terraform workflows

### Step 8: Present Workflow Preview

- [x] Show summarized YAML for all workflows
- [x] Highlight dependency handling
- [x] Show dependency graph
- [x] Confirm linting validation

### Step 9: User Checkpoint

- [x] Get user approval to proceed

