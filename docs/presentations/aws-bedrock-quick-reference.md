# AWS Bedrock Quick Reference Guide

## Quick Start

### Enable Bedrock Access
```bash
# Via AWS Console
1. Navigate to Amazon Bedrock
2. Go to Model access
3. Click Manage model access
4. Select models
5. Save changes
```

### Basic API Call (Python)
```python
import boto3
import json

bedrock = boto3.client('bedrock-runtime', region_name='us-east-1')

response = bedrock.invoke_model(
    modelId='anthropic.claude-3-5-sonnet-20241022-v2:0',
    body=json.dumps({
        "anthropic_version": "bedrock-2023-05-31",
        "max_tokens": 1024,
        "messages": [{"role": "user", "content": "Your prompt"}]
    })
)

result = json.loads(response['body'].read())
print(result['content'][0]['text'])
```

## Popular Models

| Model | Provider | Best For | Input Cost | Output Cost |
|-------|----------|----------|------------|-------------|
| Claude 3.5 Sonnet | Anthropic | Complex reasoning, code | $3.00/1M | $15.00/1M |
| Llama 3.1 70B | Meta | General purpose | $0.65/1M | $0.65/1M |
| Amazon Titan Text | Amazon | AWS-native apps | $0.80/1M | $0.80/1M |

## IAM Permissions

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "bedrock:InvokeModel",
        "bedrock:InvokeModelWithResponseStream"
      ],
      "Resource": "arn:aws:bedrock:*::foundation-model/*"
    }
  ]
}
```

## Common Use Cases

- **Content Generation**: Blog posts, marketing copy, product descriptions
- **Q&A Systems**: Chatbots, knowledge bases, customer support
- **Code Generation**: Code completion, documentation, bug fixes
- **Text Analysis**: Sentiment, summarization, classification
- **RAG Applications**: Document search, knowledge retrieval

## Best Practices

### Security
- ✅ Use least privilege IAM policies
- ✅ Enable VPC endpoints for private access
- ✅ Enable Bedrock Guardrails
- ✅ Encrypt data in transit and at rest

### Performance
- ✅ Use prompt caching for repeated prompts
- ✅ Choose appropriate model size
- ✅ Implement request batching
- ✅ Use streaming for long responses

### Cost Optimization
- ✅ Right-size your model selection
- ✅ Optimize prompt length
- ✅ Implement response caching
- ✅ Monitor usage and set alerts

## Error Handling

```python
from botocore.exceptions import ClientError

try:
    response = bedrock.invoke_model(...)
except ClientError as e:
    error_code = e.response['Error']['Code']
    if error_code == 'ThrottlingException':
        # Implement exponential backoff retry
        pass
    elif error_code == 'ValidationException':
        # Handle validation errors
        pass
    elif error_code == 'AccessDeniedException':
        # Check IAM permissions
        pass
```

## Regions

Bedrock is available in:
- us-east-1 (N. Virginia)
- us-west-2 (Oregon)
- eu-west-1 (Ireland)
- ap-southeast-1 (Singapore)
- And more...

## Useful Links

- **Documentation**: https://docs.aws.amazon.com/bedrock/
- **Pricing**: https://aws.amazon.com/bedrock/pricing/
- **What's New**: https://aws.amazon.com/about-aws/whats-new/bedrock/
- **Samples**: https://github.com/aws-samples/amazon-bedrock-samples

## Key Features (2024)

- ⚡ Latency-optimized inference (Preview)
- 🚀 Prompt caching
- 📊 Model evaluation
- 🔒 Enhanced guardrails
- 🔍 Rerank models
- 📚 Knowledge bases
- 🎯 Multi-agent collaboration
- 🏪 Bedrock Marketplace

## Model Count (2024)

- **52** serverless models
- **122** marketplace models
- **174** total models available

## Support

- **AWS Support**: https://aws.amazon.com/support/
- **Forums**: https://repost.aws/tags/TAz5yf8dtsN2iutHmN8z0YTA/amazon-bedrock
- **Documentation**: https://docs.aws.amazon.com/bedrock/

---

*Last updated: January 2025*
