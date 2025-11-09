# Changelog:
# AWS-10 - Initial Lambda function creation for Step Functions demo - 2025-01-28

import json
import logging
from datetime import datetime
from typing import Dict, Any

# Configure logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)


def lambda_handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    Hello World Lambda function handler for Step Functions demo.
    
    This function logs the input message, input parameters, and execution status
    to CloudWatch as required by the requirements.
    
    Args:
        event: Lambda event data from Step Functions
        context: Lambda context object
        
    Returns:
        Dict containing response data with message and execution status
    """
    try:
        # Extract message from event
        # Step Functions passes data in 'Input' field when using lambda:invoke
        input_data = event.get('Input', event) if isinstance(event, dict) else event
        
        # Handle both direct input and Step Functions wrapped input
        if isinstance(input_data, str):
            input_data = json.loads(input_data)
        
        message = input_data.get('message', 'No message provided')
        
        # Log message, input parameters, and execution status as required
        logger.info(f"Message received: {message}")
        logger.info(f"Input parameters: {json.dumps(input_data, default=str)}")
        logger.info(f"Execution status: Processing")
        logger.info(f"Function name: {context.function_name}")
        logger.info(f"Request ID: {context.aws_request_id}")
        logger.info(f"Remaining time: {context.get_remaining_time_in_millis()} ms")
        
        # Hello World functionality - return success response
        response = {
            'statusCode': 200,
            'message': message,
            'executionStatus': 'Success',
            'timestamp': datetime.utcnow().isoformat() + 'Z',
            'functionName': context.function_name,
            'requestId': context.aws_request_id
        }
        
        logger.info(f"Execution status: Completed successfully")
        logger.info(f"Response: {json.dumps(response, default=str)}")
        
        return response
        
    except Exception as e:
        # Log error with full details
        error_message = f"Error processing event: {str(e)}"
        logger.error(error_message)
        logger.error(f"Input parameters: {json.dumps(event, default=str)}")
        logger.error(f"Execution status: Failed")
        logger.exception(e)
        
        # Return error response
        return {
            'statusCode': 500,
            'error': error_message,
            'executionStatus': 'Failed',
            'timestamp': datetime.utcnow().isoformat() + 'Z'
        }

