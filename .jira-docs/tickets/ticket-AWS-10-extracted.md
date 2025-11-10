# Extracted Information: AWS-10

**Ticket Key**: AWS-10
**Extracted**: 2025-01-28

## Ticket Summary

**Title**: Demo step function application
**Type**: Task
**Status**: To Do
**Priority**: Medium

## Description

Create a sample step function state machine that:
1. Triggers a hello world lambda function
2. Inserts a record into a demo DynamoDB table received from step function input JSON

## Input JSON Format

```json
{
  "message": "Hello step function"
}
```

## DynamoDB Record Structure

- **Timestamp**: Current timestamp (to be generated)
- **Message**: As per payload (from input JSON)

## Key Requirements

1. **Step Function State Machine**: Create a state machine that orchestrates the workflow
2. **Lambda Function**: Hello world lambda function that gets triggered by the step function
3. **DynamoDB Table**: Demo table to store records with:
   - Timestamp field (current timestamp)
   - Message field (from input payload)
4. **Integration**: Step function receives JSON input, triggers lambda, and inserts record into DynamoDB

## Acceptance Criteria (Inferred)

- Step function state machine is created and functional
- Lambda function is triggered successfully by the step function
- DynamoDB record is inserted with correct timestamp and message from input
- All components are properly integrated

## Dependencies

- AWS Step Functions
- AWS Lambda
- AWS DynamoDB
- IAM roles and permissions for service integration

## Linked Tickets

None identified

## Notes

- This is a demonstration/tutorial task
- Focus on basic step function workflow with lambda and DynamoDB integration
- Input JSON format is specified
- DynamoDB record structure is defined (timestamp + message)

