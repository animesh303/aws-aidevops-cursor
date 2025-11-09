# Changelog:
# AWS-10 - Initial unit tests for Step Functions demo Lambda handler - 2025-01-28

import json
import sys
import os
import pytest
from unittest.mock import Mock, patch
from datetime import datetime

# Add src directory to path for imports
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '../../src/lambda-python-step-function-demo'))

from lambda_function import lambda_handler


class MockContext:
    """Mock Lambda context object"""
    def __init__(self):
        self.function_name = "step-function-demo-hello-world"
        self.aws_request_id = "test-request-id-12345"
        self.memory_limit_in_mb = 128
        
    def get_remaining_time_in_millis(self):
        return 30000  # 30 seconds


@pytest.fixture
def mock_context():
    """Fixture for Lambda context"""
    return MockContext()


def test_lambda_handler_success_with_message(mock_context):
    """Test Lambda handler with valid message input"""
    event = {
        "message": "Hello step function"
    }
    
    response = lambda_handler(event, mock_context)
    
    assert response['statusCode'] == 200
    assert response['message'] == "Hello step function"
    assert response['executionStatus'] == 'Success'
    assert 'timestamp' in response
    assert response['functionName'] == mock_context.function_name
    assert response['requestId'] == mock_context.aws_request_id


def test_lambda_handler_success_with_step_functions_input(mock_context):
    """Test Lambda handler with Step Functions wrapped input"""
    event = {
        "Input": {
            "message": "Hello step function"
        }
    }
    
    response = lambda_handler(event, mock_context)
    
    assert response['statusCode'] == 200
    assert response['message'] == "Hello step function"
    assert response['executionStatus'] == 'Success'


def test_lambda_handler_no_message(mock_context):
    """Test Lambda handler with no message field"""
    event = {}
    
    response = lambda_handler(event, mock_context)
    
    assert response['statusCode'] == 200
    assert response['message'] == "No message provided"
    assert response['executionStatus'] == 'Success'


def test_lambda_handler_error_handling(mock_context):
    """Test Lambda handler error handling"""
    # Create an event that will cause an error
    event = None  # This should trigger an exception
    
    response = lambda_handler(event, mock_context)
    
    assert response['statusCode'] == 500
    assert response['executionStatus'] == 'Failed'
    assert 'error' in response


def test_lambda_handler_logging(mock_context, caplog):
    """Test that Lambda handler logs required information"""
    import logging
    caplog.set_level(logging.INFO)
    
    event = {
        "message": "Hello step function"
    }
    
    lambda_handler(event, mock_context)
    
    # Verify logging includes message, input parameters, and execution status
    log_messages = caplog.text
    assert "Message received: Hello step function" in log_messages
    assert "Input parameters:" in log_messages
    assert "Execution status:" in log_messages
    assert "Completed successfully" in log_messages

