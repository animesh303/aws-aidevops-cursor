# CI/CD Workflow Generation Plan

## Phase 2: Generate Workflow Files

### Step 1: Load Dependency Information from Phase 1

- [x] Read dependency map from cicd-state.md
- [x] Identify artifact requirements
- [x] Understand Terraform → Python dependency

### Step 2: Verify Clean State

- [x] Confirm .github/workflows/ directory is clean (regenerated)
- [x] Document single unified workflow generation

### Step 3: Read Language-Specific Standards

- [x] Read python-standards.mdc
- [x] Read terraform-standards.mdc

### Step 4: Calculate Execution Order Based on Dependencies

- [x] Build dependency graph
- [x] Document execution order: Python → Terraform

### Step 5: Generate Single Production Workflow

- [x] Create ci-cd.yml workflow file
- [x] Add workflow trigger (main branch push)
- [x] Add Python CI jobs (lint, security, tests)
- [x] Add Python build job
- [x] Add Python deploy job
- [x] Add Terraform CI jobs (security, validate)
- [x] Add Terraform deploy job with dependency handling
- [x] Configure job dependencies (needs:)
- [x] Configure artifact passing
- [x] Add AWS credentials configuration
- [x] Add environment configuration

### Step 6: Apply Language-Specific Standards

- [x] Apply Python standards to Python jobs
- [x] Apply Terraform standards to Terraform jobs
- [x] Ensure dependency handling steps are included

### Step 7: Validate Workflow Linting and Dependency Handling

- [x] Validate YAML syntax
- [x] Verify GitHub Actions expression syntax (${{ }})
- [x] Check for missing required fields
- [x] Verify job dependencies (no circular dependencies)
- [x] Verify workflow trigger syntax
- [x] Check environment names
- [x] Verify artifact paths and names
- [x] Verify Terraform dependency handling steps are present

### Step 8: Present Workflow YAML Preview

- [x] Show summarized YAML contents
- [x] Highlight dependency handling
- [x] Show dependency graph
- [x] Show execution order
- [x] Confirm linting validation

### Step 9: Checkpoint

- [x] Prompt user for confirmation
- [x] Update plan checkboxes
- [x] Update cicd-state.md

