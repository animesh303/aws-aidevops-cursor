# Changelog:
# AWS-5 - Initial Lambda function creation - 2025-01-28

import json
import logging
from typing import Dict, Any

# Configure logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)


def lambda_handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    Main Lambda function handler.
    
    This function is triggered by S3 bucket events and logs "Hello World"
    to CloudWatch. It is a demo function and does not process file content.
    
    Args:
        event: S3 event notification containing bucket and object information
        context: Lambda context object
        
    Returns:
        Dict containing status code and message
    """
    try:
        # Log "Hello World" message at INFO level
        logger.info("Hello World")
        
        # Log event details for debugging (optional)
        logger.info(f"Received S3 event: {json.dumps(event)}")
        
        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': 'Hello World',
                'status': 'success'
            })
        }
    except Exception as e:
        logger.error(f"Error processing S3 event: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps({
                'error': 'Internal server error',
                'message': str(e)
            })
        }

