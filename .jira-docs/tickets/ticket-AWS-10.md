# JIRA Ticket: AWS-10

**Ticket Key**: AWS-10
**Summary**: Demo step function application
**Status**: In Progress
**Priority**: Medium
**Assignee**: Unassigned
**Reporter**: Animesh Naskar
**Created**: 2025-11-09T21:43:30.999+0530
**Updated**: 2025-11-10T21:13:03.615+0530
**Issue Type**: Task
**Project**: AWS (aws-project-sample)

## Description

Create a sample step function state machine that

1. Trigger hello world lambda
2. Insert a record into a  demo dynamo db received from step function input json. 

Json input

```json
{
"message" : "Hello step function"
}
```

DynamoDb record

Timestamp: current timestamp

Message: as per payload

## Comments

### Comment 1 (2025-11-10T20:54:03.755+0530)
**Author**: Animesh Naskar

Technical requirements specification has been completed and approved. All 15 open questions have been answered and incorporated into the requirements document. The ticket has been updated with technical specifications including:

- Technology Stack: Python 3.12, Terraform, AWS SDK (boto3)
- AWS Region: us-east-1
- Lambda Configuration: Python 3.12, 128 MB memory, 30 seconds timeout
- DynamoDB: Table name demoawsaidynamodb, partition key id (String), On-Demand billing
- Step Functions: Name demoawsaistatemachine, Standard execution type

Full requirements document and architecture diagram are available in the repository at `.jira-docs/requirements/AWS-10_requirements.md`.

Requirements specification complete. Moving ticket to In Progress.

### Comment 2 (2025-11-10T21:03:05.090+0530)
**Author**: Animesh Naskar

**Technical Requirements Specification**

**Technology Stack**
- Programming Language: Python 3.12
- Framework: AWS SDK for Python (boto3)
- Infrastructure as Code: Terraform
- AWS Region: us-east-1

**Lambda Function Configuration**
- Runtime: Python 3.12
- Memory: 128 MB
- Timeout: 30 seconds
- Logging: Input message and execution status to CloudWatch

**Step Functions State Machine Configuration**
- Name: demoawsaistatemachine
- Execution Type: Standard
- Error Handling: None (basic demo)

**DynamoDB Table Configuration**
- Table Name: demoawsaidynamodb
- Partition Key: id (String)
- Sort Key: None
- Billing Mode: On-Demand
- Attributes: id, Timestamp (ISO 8601 string), Message (string)

Full requirements document and architecture diagram available in repository at: .jira-docs/requirements/AWS-10_requirements.md

### Comment 3 (2025-11-10T21:13:03.615+0530)
**Author**: Animesh Naskar

**Technical Requirements Specification**

Full technical requirements specification document has been updated in the repository at: `.jira-docs/requirements/AWS-10_requirements.md`

Key highlights:

- Technology Stack: Python 3.12, Terraform, AWS SDK (boto3)
- AWS Region: us-east-1
- Lambda Configuration: Python 3.12, 128 MB memory, 30 seconds timeout
- DynamoDB: Table name demoawsaidynamodb, partition key id (String), On-Demand billing
- Step Functions: Name demoawsaistatemachine, Standard execution type
- Architecture diagram available in repository

The requirements document includes complete functional requirements, non-functional requirements, technical specifications, acceptance criteria, dependencies, assumptions, and risks.

## Change History

1. **2025-11-10T20:54:01.460+0530** - Status changed from "To Do" to "In Progress"
2. **2025-11-09T21:48:50.815+0530** - Description updated
3. **2025-11-09T21:43:31.679+0530** - Added to Sprint "Foundation"

## Additional Information

- **Watchers**: 1 (User is watching)
- **Votes**: 0
- **Sprint**: Foundation (Future)
- **Labels**: None
- **Components**: None
- **Fix Versions**: None
- **Linked Issues**: None
- **Subtasks**: None

