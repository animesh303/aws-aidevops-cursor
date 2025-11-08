# CI/CD Workflow Generation Plan

**Created**: 2025-11-08T22:51:58Z
**Phase**: Phase 2 - Generate Workflows

## Step 1: Load Dependency Information from Phase 1

- [x] Read dependency map from Phase 1
- [x] Identify artifact requirements

**Dependency Map**:
- Terraform depends on Python (artifact dependency)
- Python deploy depends on Terraform deploy (infrastructure dependency)
- Artifact: `lambda_function.zip`
- Source: `src/lambda-python-s3-lambda-trigger`
- Destination: `iac/terraform/lambda_function.zip`

## Step 2: Verify Clean State

- [x] Check for existing workflows
- [x] Document workflow generation approach

**State**: No existing workflows (deleted during regeneration)
**Action**: Create new single unified workflow file

## Step 3: Read Language-Specific Standards

- [x] Read Python standards (`python-standards.mdc`)
- [x] Read Terraform standards (`terraform-standards.mdc`)
- [x] Read dependency handling patterns (`workflow-dependency-handling.mdc`)

## Step 4: Calculate Execution Order Based on Dependencies

- [x] Build dependency graph
- [x] Document execution order

**Execution Order**:
1. Python CI jobs (lint, security, tests) - parallel
2. Python build - after CI jobs
3. Terraform CI jobs (security, validate) - parallel
4. Terraform deploy - after Terraform CI jobs AND Python build (for artifact)
5. Python deploy - after Python build AND Terraform deploy (for infrastructure)

## Step 5: Generate Single Production Workflow

- [x] Generate workflow YAML file
- [x] Apply Python standards
- [x] Apply Terraform standards
- [x] Implement dependency handling

**Workflow File**: `.github/workflows/ci-cd.yml` ✅ Generated

## Step 6: Workflow Structure Requirements

- [x] Add workflow trigger (main branch)
- [x] Add permissions (contents: read, id-token: write)
- [x] Add concurrency control
- [x] Add Python jobs (lint, security, tests, build, deploy)
- [x] Add Terraform jobs (security, validate, deploy)
- [x] Add dependency handling for Terraform deploy job (artifact dependency)
- [x] Add dependency handling for Python deploy job (infrastructure dependency)

## Step 7: Apply Language-Specific Standards

- [x] Apply Python CI/CD patterns
- [x] Apply Terraform CI/CD patterns
- [x] Apply dependency handling patterns

## Step 8: Document Dependency Handling

- [x] Document artifact passing between Python build and Terraform deploy
- [x] Document infrastructure dependency: Python deploy needs Terraform deploy
- [x] Document job dependencies using `needs:`

**Dependency Pattern**:
- **Artifact Dependency**: `terraform-deploy` needs `python-build` (for Lambda package artifact)
- **Infrastructure Dependency**: `python-deploy` needs `terraform-deploy` (Lambda function must exist before updating code)

## Step 9: Validate Workflow Linting and Dependency Handling

- [x] Validate YAML syntax
- [x] Validate GitHub Actions expression syntax
- [x] Check for missing required fields
- [x] Verify job dependencies are correct
- [x] Verify dependency handling steps are present
- [x] Fix any linting errors

**Validation Result**: ✅ Workflow is valid. Linter warnings about secrets/vars are expected and not errors.

## Step 10: Present Workflow YAML Preview

- [x] Show workflow summary
- [x] Highlight dependency handling
- [x] Show execution order

## Step 11: Checkpoint

- [ ] Wait for user confirmation
- [ ] Update plan checkboxes
- [ ] Update cicd-state.md

