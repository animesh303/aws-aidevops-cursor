# AWS Bedrock Training Presentation

## Overview

This directory contains training materials for AWS Bedrock, including a comprehensive presentation suitable for training sessions.

## Files

- `aws-bedrock-training.md` - Main training presentation in Markdown format

## Presentation Format

The presentation is written in Markdown with slide separators (`---`) that can be used with various presentation tools:

### Supported Tools:

1. **Marp** (Recommended)
   - Install: `npm install -g @marp-team/marp-cli`
   - Convert to PDF: `marp aws-bedrock-training.md --pdf`
   - Convert to HTML: `marp aws-bedrock-training.md --html`
   - Convert to PPTX: `marp aws-bedrock-training.md --pptx`

2. **reveal.js**
   - Install: `npm install -g reveal-md`
   - Present: `reveal-md aws-bedrock-training.md`
   - Export: `reveal-md aws-bedrock-training.md --static docs`

3. **Pandoc**
   - Convert to PPTX: `pandoc aws-bedrock-training.md -o aws-bedrock-training.pptx`
   - Convert to PDF: `pandoc aws-bedrock-training.md -o aws-bedrock-training.pdf`

4. **Online Tools**
   - [Marp Web](https://marp.app/) - Upload the markdown file
   - [Slideas](https://www.slideas.app/) - Import markdown
   - [Deckset](https://www.deckset.com/) - Mac app for markdown presentations

## Presentation Structure

The presentation includes 10 main sections:

1. **Introduction to AWS Bedrock** - Overview and value proposition
2. **What is Amazon Bedrock?** - Core concepts and service model
3. **Key Features & Capabilities** - Features, including 2024 updates
4. **Foundation Models** - Available models and providers
5. **Use Cases & Applications** - Real-world examples
6. **Architecture & Integration** - Technical architecture and patterns
7. **Getting Started** - Step-by-step setup guide
8. **Best Practices** - Security, performance, and development tips
9. **Pricing & Cost Optimization** - Pricing model and optimization strategies
10. **Summary & Next Steps** - Key takeaways and resources

## Customization

### For Your Organization:

1. **Update Branding**
   - Replace "AWS Business Group" with your organization name
   - Add your logo to the title slide
   - Update contact information in the final slide

2. **Adjust Content**
   - Add organization-specific use cases
   - Include internal examples
   - Modify pricing examples based on your region/usage

3. **Add Sections**
   - Company-specific policies
   - Internal tools and integrations
   - Team-specific workflows

## Presentation Tips

### Before Presenting:

1. **Review Content** - Familiarize yourself with all sections
2. **Test Examples** - Run code examples beforehand
3. **Prepare Demo** - Have a live demo ready if possible
4. **Check Timing** - Presentation is ~60-90 minutes with Q&A

### During Presentation:

1. **Interactive Elements** - Encourage questions throughout
2. **Live Demo** - Show actual Bedrock console/API calls
3. **Real Examples** - Share relevant use cases from your organization
4. **Q&A Breaks** - Pause for questions after major sections

### After Presentation:

1. **Share Resources** - Provide links to documentation
2. **Follow-up** - Schedule office hours or additional training
3. **Feedback** - Collect feedback for improvements

## Additional Resources

### AWS Documentation:
- [AWS Bedrock User Guide](https://docs.aws.amazon.com/bedrock/latest/userguide/)
- [AWS Bedrock API Reference](https://docs.aws.amazon.com/bedrock/latest/APIReference/)
- [AWS Bedrock Pricing](https://aws.amazon.com/bedrock/pricing/)

### Code Examples:
- [AWS Bedrock Python Examples](https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/python/example_code/bedrock)
- [AWS Bedrock JavaScript Examples](https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/javascriptv3/example_code/bedrock)

### Learning Paths:
- [AWS Bedrock Training](https://aws.amazon.com/training/learning-paths/machine-learning/)
- [AWS Machine Learning Specialty](https://aws.amazon.com/certification/certified-machine-learning-specialty/)

## Updates

This presentation was created in January 2025 and includes features as of December 2024. For the latest information:

- Check [AWS Bedrock What's New](https://aws.amazon.com/about-aws/whats-new/bedrock/)
- Review [AWS Bedrock Release Notes](https://docs.aws.amazon.com/bedrock/latest/userguide/release-notes.html)
- Monitor [AWS Bedrock Blog](https://aws.amazon.com/blogs/machine-learning/category/artificial-intelligence/amazon-bedrock/)

## License

This presentation is for internal training purposes. Update as needed for your organization.
