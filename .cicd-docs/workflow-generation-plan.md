# Phase 2: Workflow Generation Plan

## Steps

- [x] Load Dependency Information from Phase 1
- [x] Verify Clean State
- [x] Read Language-Specific Standards
- [x] Calculate Execution Order Based on Dependencies
- [x] Generate Single Production Workflow
- [x] Apply Language-Specific Standards
- [x] Document Dependency Handling
- [x] Validate Workflow Linting and Dependency Handling
- [ ] Present Workflow YAML Preview
- [ ] Checkpoint

## Execution Order

Based on dependency analysis:

1. **Python CI Jobs** (parallel):
   - `python-lint`
   - `python-security`
   - `python-test`

2. **Python Build Job**:
   - `python-build` - Builds Lambda package directly in `iac/terraform/lambda_function.zip` (PREFERRED approach)

3. **Terraform CI Jobs** (parallel):
   - `terraform-security`
   - `terraform-validate`

4. **Terraform Deploy Job**:
   - `terraform-deploy` - Depends on Python build (needs Lambda package) and Terraform CI jobs
   - Uses Lambda package from `iac/terraform/lambda_function.zip`
   - Terraform manages Lambda function deployment (no separate python-deploy needed)

## Dependency Handling Strategy

**PREFERRED - Local Build Placement**:
- Python build job builds Lambda package directly in `iac/terraform/lambda_function.zip`
- Terraform deploy job uses the package directly from that location
- No artifact upload/download needed
- Terraform's `source_code_hash` automatically detects changes and updates Lambda function code
- No separate `python-deploy` job needed (Terraform handles Lambda deployment)

