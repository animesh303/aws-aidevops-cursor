# Changelog:
# AWS-5 - Initial unit tests for Lambda function - 2025-01-28

import json
import sys
import os
import pytest
from unittest.mock import MagicMock

# Add src directory to path for imports
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '../../src/lambda-python-s3-lambda-trigger'))
from lambda_handler import lambda_handler


@pytest.fixture
def s3_event():
    """Sample S3 event for testing."""
    return {
        "Records": [
            {
                "eventVersion": "2.1",
                "eventSource": "aws:s3",
                "awsRegion": "us-east-1",
                "eventTime": "2025-01-28T15:00:00.000Z",
                "eventName": "ObjectCreated:Put",
                "s3": {
                    "bucket": {
                        "name": "demobucketforawsaidevops",
                        "arn": "arn:aws:s3:::demobucketforawsaidevops"
                    },
                    "object": {
                        "key": "test-file.txt",
                        "size": 1024
                    }
                }
            }
        ]
    }


@pytest.fixture
def lambda_context():
    """Mock Lambda context."""
    context = MagicMock()
    context.function_name = "s3-lambda-trigger-hello-world"
    context.function_version = "$LATEST"
    context.invoked_function_arn = "arn:aws:lambda:us-east-1:123456789012:function:s3-lambda-trigger-hello-world"
    context.memory_limit_in_mb = 128
    return context


def test_lambda_handler_success(s3_event, lambda_context, caplog):
    """Test Lambda handler successfully logs Hello World."""
    with caplog.at_level("INFO"):
        response = lambda_handler(s3_event, lambda_context)
    
    assert response['statusCode'] == 200
    assert 'Hello World' in caplog.text
    assert 'message' in json.loads(response['body'])
    assert json.loads(response['body'])['message'] == 'Hello World'


def test_lambda_handler_logs_event(s3_event, lambda_context, caplog):
    """Test Lambda handler logs the S3 event."""
    with caplog.at_level("INFO"):
        lambda_handler(s3_event, lambda_context)
    
    assert 'Received S3 event' in caplog.text


def test_lambda_handler_returns_success_response(s3_event, lambda_context):
    """Test Lambda handler returns correct success response."""
    response = lambda_handler(s3_event, lambda_context)
    
    assert response['statusCode'] == 200
    body = json.loads(response['body'])
    assert body['status'] == 'success'
    assert body['message'] == 'Hello World'

