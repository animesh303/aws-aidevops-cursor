---
title: AWS Bedrock Training
subtitle: Building Generative AI Applications with Amazon Bedrock
author: AWS Business Group
date: 2025
theme: default
---

# AWS Bedrock Training
## Building Generative AI Applications

**Training Session Overview**

---

# Agenda

1. **Introduction to AWS Bedrock**
2. **What is Amazon Bedrock?**
3. **Key Features & Capabilities**
4. **Foundation Models**
5. **Use Cases & Applications**
6. **Architecture & Integration**
7. **Getting Started**
8. **Best Practices**
9. **Pricing & Cost Optimization**
10. **Q&A**

---

# Learning Objectives

By the end of this training, you will:

- Understand what AWS Bedrock is and its core value proposition
- Know the key features and capabilities available
- Be familiar with the foundation models offered
- Understand common use cases and applications
- Know how to get started with Bedrock
- Understand best practices for implementation
- Be aware of pricing considerations

---

# Section 1: Introduction

## What is Generative AI?

---

# The AI Revolution

**Traditional AI:**
- Task-specific models
- Requires extensive training data
- Limited to specific domains
- High development cost

**Generative AI:**
- General-purpose foundation models
- Pre-trained on vast datasets
- Adaptable to multiple use cases
- Accessible via APIs

---

# Challenges with Foundation Models

**Before AWS Bedrock:**

- ❌ Complex model selection
- ❌ Infrastructure management
- ❌ Security & compliance concerns
- ❌ High costs for experimentation
- ❌ Vendor lock-in
- ❌ Integration complexity

---

# Section 2: What is Amazon Bedrock?

---

# Amazon Bedrock Overview

**Fully managed service** that provides easy-to-use APIs for accessing foundation models from leading AI companies

**Key Value Propositions:**
- 🚀 **Serverless** - No infrastructure to manage
- 🔒 **Secure** - Enterprise-grade security
- 💰 **Cost-effective** - Pay only for what you use
- 🔄 **Flexible** - Multiple models, easy switching
- ⚡ **Fast** - Low latency, high performance

---

# Bedrock Service Model

```
┌─────────────────────────────────────┐
│     Your Applications               │
│  (Web, Mobile, Backend Services)   │
└──────────────┬──────────────────────┘
               │
               │ API Calls
               │
┌──────────────▼──────────────────────┐
│      Amazon Bedrock                    │
│  ┌────────────────────────────────┐   │
│  │  Foundation Model APIs          │   │
│  │  - Text Generation              │   │
│  │  - Embeddings                   │   │
│  │  - Image Generation             │   │
│  └────────────────────────────────┘   │
│  ┌────────────────────────────────┐   │
│  │  Model Providers                │   │
│  │  - Anthropic (Claude)          │   │
│  │  - Meta (Llama)                 │   │
│  │  - Amazon (Titan)                │   │
│  │  - Cohere                       │   │
│  │  - AI21 Labs                    │   │
│  └────────────────────────────────┘   │
└───────────────────────────────────────┘
```

---

# Section 3: Key Features & Capabilities

---

# Core Features

## 1. **Foundation Model Access**
- Single API for multiple models
- Easy model comparison and switching
- No vendor lock-in

## 2. **Serverless Architecture**
- No infrastructure management
- Automatic scaling
- High availability

## 3. **Enterprise Security**
- Data encryption at rest and in transit
- VPC endpoints
- IAM integration
- PrivateLink support

---

# Advanced Features (2024)

## Performance Optimization
- ⚡ **Latency-optimized inference** (Preview)
- 🚀 **Prompt caching** for faster responses
- 📊 **Model distillation** capabilities

## Multimodal Support
- 📝 Text generation
- 🖼️ Image generation and analysis
- 🎥 Video capabilities
- 🎵 Audio processing

## Enhanced RAG
- 🔍 **Rerank models** for better search
- 📚 **Knowledge bases** integration
- 🔗 **Custom connectors**
- 📊 **GraphRAG** support

---

# Enterprise Features

## Bedrock Marketplace
- Third-party model integration
- Model discovery and evaluation
- Easy model onboarding

## Guardrails
- Content filtering
- Automatic inference checks
- Custom policies
- Toxicity detection

## Model Evaluation
- LLM-as-a-judge evaluation
- Automated testing
- Performance benchmarking

## Multi-Agent Collaboration
- Agent orchestration
- Workflow management
- Task coordination

---

# Section 4: Foundation Models

---

# Model Providers

**Leading AI Companies:**
- **Anthropic** - Claude 3.5 series
- **Meta** - Llama 3.1 (405B, 70B)
- **Amazon** - Titan, Nova series
- **Cohere** - Command, Embed models
- **AI21 Labs** - Jurassic models
- **Stability AI** - Image generation
- **Mistral AI** - Mistral models

---

# Model Catalog (2024)

**Available Models:**
- **52 serverless models** (major regions)
- **122 models** via Bedrock Marketplace
- **174 total models** available

**Model Types:**
- Text generation
- Embeddings
- Image generation
- Multimodal (text + image)

---

# Popular Models

## Claude 3.5 (Anthropic)
- **Best for:** Complex reasoning, code generation
- **Strengths:** High accuracy, safety, long context
- **Use cases:** Q&A, analysis, content creation

## Llama 3.1 (Meta)
- **Best for:** General-purpose tasks
- **Strengths:** Open-source, customizable
- **Use cases:** Chatbots, content generation

## Amazon Titan
- **Best for:** AWS-native applications
- **Strengths:** Optimized for AWS services
- **Use cases:** Enterprise applications

---

# Section 5: Use Cases & Applications

---

# Common Use Cases

## 1. **Content Generation**
- Blog posts, articles
- Marketing copy
- Product descriptions
- Social media content

## 2. **Question Answering**
- Customer support chatbots
- Knowledge base Q&A
- Document analysis
- Research assistance

## 3. **Code Generation**
- Code completion
- Code explanation
- Bug fixing
- Documentation generation

---

# More Use Cases

## 4. **Text Analysis**
- Sentiment analysis
- Text summarization
- Entity extraction
- Classification

## 5. **Conversational AI**
- Virtual assistants
- Chatbots
- Interactive applications
- Customer service

## 6. **RAG Applications**
- Document search
- Knowledge retrieval
- Context-aware responses
- Enterprise search

---

# Real-World Examples

## E-commerce
- Product description generation
- Customer review analysis
- Personalized recommendations
- Chat support

## Healthcare
- Medical documentation
- Research assistance
- Patient communication
- Clinical decision support

## Finance
- Report generation
- Risk analysis
- Compliance checking
- Customer service

---

# Section 6: Architecture & Integration

---

# Bedrock Architecture

```
┌─────────────┐
│   Client    │
│ Application │
└──────┬──────┘
       │
       │ HTTPS/REST API
       │
┌──────▼──────────────────────────┐
│   Amazon Bedrock                │
│                                 │
│  ┌──────────────────────────┐   │
│  │  API Gateway             │   │
│  └──────────┬───────────────┘   │
│             │                    │
│  ┌──────────▼───────────────┐   │
│  │  Model Router            │   │
│  └──────────┬───────────────┘   │
│             │                    │
│  ┌──────────▼───────────────┐   │
│  │  Foundation Models       │   │
│  │  - Claude                │   │
│  │  - Llama                 │   │
│  │  - Titan                 │   │
│  └──────────────────────────┘   │
└─────────────────────────────────┘
```

---

# Integration Patterns

## 1. **Direct API Integration**
```python
import boto3

bedrock = boto3.client('bedrock-runtime')

response = bedrock.invoke_model(
    modelId='anthropic.claude-3-5-sonnet-20241022-v2:0',
    body=json.dumps({
        "anthropic_version": "bedrock-2023-05-31",
        "max_tokens": 1024,
        "messages": [{"role": "user", "content": "Hello!"}]
    })
)
```

## 2. **AWS SDK Integration**
- Python (boto3)
- JavaScript/TypeScript
- Java
- .NET
- Go

---

# Integration with AWS Services

## Lambda Integration
- Serverless functions
- Event-driven processing
- Automatic scaling

## API Gateway
- RESTful APIs
- Authentication
- Rate limiting

## S3 Integration
- Document storage
- Knowledge bases
- Data lakes

## Kendra Integration
- Enterprise search
- RAG applications
- Knowledge retrieval

---

# Section 7: Getting Started

---

# Prerequisites

## AWS Account Setup
1. ✅ AWS Account
2. ✅ Appropriate IAM permissions
3. ✅ Bedrock access enabled
4. ✅ Region selection (us-east-1, us-west-2, etc.)

## Development Environment
- AWS CLI configured
- AWS SDK installed
- Python/Node.js/Java (your choice)

---

# Step 1: Enable Bedrock Access

## Console Method:
1. Navigate to **Amazon Bedrock** in AWS Console
2. Go to **Model access** in left navigation
3. Click **Manage model access**
4. Select models you want to use
5. Click **Save changes**

## CLI Method:
```bash
aws bedrock put-model-invocation-logging-configuration \
  --logging-config ...
```

---

# Step 2: Set Up IAM Permissions

## Required Permissions:
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

---

# Step 3: First API Call

## Python Example:
```python
import boto3
import json

# Initialize Bedrock client
bedrock_runtime = boto3.client(
    service_name='bedrock-runtime',
    region_name='us-east-1'
)

# Prepare the request
model_id = 'anthropic.claude-3-5-sonnet-20241022-v2:0'
body = json.dumps({
    "anthropic_version": "bedrock-2023-05-31",
    "max_tokens": 1024,
    "messages": [
        {
            "role": "user",
            "content": "Explain AWS Bedrock in one sentence."
        }
    ]
})

# Invoke the model
response = bedrock_runtime.invoke_model(
    modelId=model_id,
    body=body
)

# Parse response
response_body = json.loads(response['body'].read())
print(response_body['content'][0]['text'])
```

---

# Step 4: Test Your Integration

## Quick Test Checklist:
- ✅ Model access enabled
- ✅ IAM permissions configured
- ✅ API call successful
- ✅ Response received
- ✅ Error handling implemented

---

# Section 8: Best Practices

---

# Security Best Practices

## 1. **IAM & Access Control**
- Use least privilege principle
- Separate IAM roles for different environments
- Enable MFA for production accounts
- Regular access reviews

## 2. **Data Protection**
- Encrypt data in transit (TLS)
- Use VPC endpoints for private access
- Implement data loss prevention
- Audit data access

## 3. **Content Safety**
- Enable Bedrock Guardrails
- Implement content filtering
- Monitor for toxic content
- Set up alerts

---

# Performance Best Practices

## 1. **Model Selection**
- Choose appropriate model for task
- Consider latency vs. cost trade-offs
- Test multiple models
- Use latency-optimized inference when available

## 2. **Prompt Optimization**
- Use prompt caching for repeated prompts
- Structure prompts clearly
- Provide context efficiently
- Iterate and refine prompts

## 3. **Caching & Optimization**
- Cache common responses
- Batch requests when possible
- Use streaming for long responses
- Monitor and optimize costs

---

# Cost Optimization

## 1. **Model Selection**
- Use smaller models for simple tasks
- Reserve larger models for complex tasks
- Compare pricing across models
- Monitor usage patterns

## 2. **Usage Optimization**
- Implement request caching
- Batch similar requests
- Use appropriate token limits
- Set up cost alerts

## 3. **Monitoring**
- Track API calls and costs
- Set up billing alerts
- Analyze usage patterns
- Optimize based on data

---

# Development Best Practices

## 1. **Error Handling**
```python
try:
    response = bedrock_runtime.invoke_model(...)
except ClientError as e:
    error_code = e.response['Error']['Code']
    if error_code == 'ThrottlingException':
        # Implement retry logic
    elif error_code == 'ValidationException':
        # Handle validation errors
```

## 2. **Retry Logic**
- Implement exponential backoff
- Handle rate limiting
- Set maximum retry attempts
- Log retry attempts

## 3. **Monitoring & Logging**
- Enable CloudWatch logging
- Track API metrics
- Set up alarms
- Monitor response times

---

# Section 9: Pricing & Cost Optimization

---

# Pricing Model

## Pay-as-You-Go
- **No upfront costs**
- **No minimum commitments**
- **Pay only for what you use**

## Pricing Factors:
1. **Model type** (text, image, embedding)
2. **Input tokens** (prompt length)
3. **Output tokens** (response length)
4. **Model provider** (varies by provider)

---

# Example Pricing (2024)

## Claude 3.5 Sonnet
- **Input:** $3.00 per 1M tokens
- **Output:** $15.00 per 1M tokens

## Llama 3.1 70B
- **Input:** $0.65 per 1M tokens
- **Output:** $0.65 per 1M tokens

## Amazon Titan Text
- **Input:** $0.80 per 1M tokens
- **Output:** $0.80 per 1M tokens

*Prices vary by region and model*

---

# Cost Estimation

## Example Calculation:
**Scenario:** 10,000 requests/day
- Average input: 500 tokens
- Average output: 200 tokens
- Model: Claude 3.5 Sonnet

**Daily Cost:**
- Input: 10,000 × 500 = 5M tokens × $3.00 = $15.00
- Output: 10,000 × 200 = 2M tokens × $15.00 = $30.00
- **Total: $45.00/day**

**Monthly:** ~$1,350/month

---

# Cost Optimization Tips

## 1. **Right-Size Your Model**
- Use smaller models for simple tasks
- Reserve large models for complex reasoning

## 2. **Optimize Prompts**
- Shorter prompts = lower input costs
- Clear prompts = better outputs (fewer retries)

## 3. **Implement Caching**
- Cache common responses
- Reduce redundant API calls

## 4. **Monitor Usage**
- Set up billing alerts
- Track costs by application
- Identify optimization opportunities

---

# Section 10: Summary & Next Steps

---

# Key Takeaways

## What We Learned:
1. ✅ AWS Bedrock provides easy access to foundation models
2. ✅ Serverless, secure, and cost-effective
3. ✅ Multiple models and providers available
4. ✅ Wide range of use cases
5. ✅ Simple integration with AWS services
6. ✅ Enterprise-grade security and compliance

---

# Next Steps

## For Developers:
1. **Enable Bedrock access** in your AWS account
2. **Set up IAM permissions**
3. **Try the quick start** examples
4. **Build a simple application**
5. **Explore different models**

## For Architects:
1. **Design integration patterns**
2. **Plan security architecture**
3. **Estimate costs**
4. **Design monitoring strategy**

---

# Resources

## Documentation:
- 📚 [AWS Bedrock Documentation](https://docs.aws.amazon.com/bedrock/)
- 📖 [AWS Bedrock User Guide](https://docs.aws.amazon.com/bedrock/latest/userguide/)
- 🔧 [AWS Bedrock API Reference](https://docs.aws.amazon.com/bedrock/latest/APIReference/)

## Learning:
- 🎓 [AWS Bedrock Training](https://aws.amazon.com/training/)
- 📹 [AWS Bedrock Videos](https://www.youtube.com/results?search_query=aws+bedrock)
- 💻 [AWS Bedrock Samples](https://github.com/aws-samples)

## Support:
- 💬 [AWS Bedrock Forum](https://repost.aws/tags/TAz5yf8dtsN2iutHmN8z0YTA/amazon-bedrock)
- 🐛 [AWS Support](https://aws.amazon.com/support/)

---

# Q&A Session

## Questions?

**Thank you for attending!**

---

# Contact & Follow-up

## Training Materials:
- This presentation
- Code examples
- Additional resources

## Questions?
- Email: [your-email]
- Slack: [your-channel]
- Office Hours: [schedule]

**Happy Building with AWS Bedrock! 🚀**
