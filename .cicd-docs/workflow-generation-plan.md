# Workflow Generation Plan

**Generated**: 2025-01-28T15:40:00Z

## Execution Order

Based on dependency analysis:
1. **Python** (no dependencies)
2. **Terraform** (depends on Python)

## Workflows to Generate

### Orchestrator Workflows (3 files)
- [x] orchestrator-dev.yml
- [x] orchestrator-test.yml
- [x] orchestrator-prd.yml

### Python Workflows (3 files)
- [x] python-dev.yml
- [x] python-test.yml
- [x] python-prd.yml

### Terraform Workflows (3 files)
- [x] terraform-dev.yml
- [x] terraform-test.yml
- [x] terraform-prd.yml

## Dependency Handling

**Terraform → Python**:
- Python builds: `s3-lambda-trigger-package-{environment}`
- Terraform downloads: `s3-lambda-trigger-package-{environment}`
- Terraform places at: `iac/terraform/lambda_function.zip`

