const pptxgen = require('pptxgenjs');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

// Import html2pptx function
const html2pptxPath = path.resolve(__dirname, '../../../.cursor/skills/presentation-generation/scripts/html2pptx.js');
const html2pptx = require(html2pptxPath);

// Color palette - AWS-inspired professional design
const colors = {
  primary: '#232F3E',      // AWS Dark Blue
  secondary: '#FF9900',    // AWS Orange
  accent: '#146EB4',       // AWS Light Blue
  background: '#F5F5F5',
  text: '#232F3E',
  textLight: '#666666',
  white: '#FFFFFF',
  success: '#2D8659',
  warning: '#FF9900'
};

// Helper function to create HTML slide
function createSlideHTML(title, content, subtitle = '') {
  return `<!DOCTYPE html>
<html>
<head>
<style>
html { background: ${colors.white}; }
body {
  width: 720pt; height: 405pt; margin: 0; padding: 0;
  background: ${colors.white}; font-family: Arial, sans-serif;
  display: flex; flex-direction: column;
}
.header {
  background: ${colors.primary}; color: ${colors.white};
  padding: 20pt 40pt; margin: 0;
}
.header h1 {
  margin: 0; font-size: 36pt; font-weight: bold;
  color: ${colors.white};
}
.header .subtitle {
  margin: 8pt 0 0 0; font-size: 18pt; color: ${colors.white};
  opacity: 0.9;
}
.content {
  flex: 1; padding: 40pt; overflow: hidden;
}
.content h2 {
  color: ${colors.primary}; font-size: 28pt; margin: 0 0 20pt 0;
  font-weight: bold;
}
.content p {
  color: ${colors.text}; font-size: 16pt; line-height: 1.6;
  margin: 12pt 0;
}
.content ul {
  color: ${colors.text}; font-size: 16pt; line-height: 1.8;
  margin: 12pt 0; padding-left: 30pt;
}
.content li {
  margin: 8pt 0;
}
.highlight {
  color: ${colors.secondary}; font-weight: bold;
}
</style>
</head>
<body>
${subtitle ? `<div class="header"><h1>${title}</h1><p class="subtitle">${subtitle}</p></div>` : `<div class="header"><h1>${title}</h1></div>`}
<div class="content">${content}</div>
</body>
</html>`;
}

// Helper function to create content slide
function createContentSlideHTML(title, content) {
  return `<!DOCTYPE html>
<html>
<head>
<style>
html { background: ${colors.white}; }
body {
  width: 720pt; height: 405pt; margin: 0; padding: 0;
  background: ${colors.white}; font-family: Arial, sans-serif;
  display: flex; flex-direction: column;
}
.content {
  flex: 1; padding: 40pt 60pt 90pt 60pt; overflow: hidden;
}
.title-wrapper {
  margin-bottom: 30pt;
}
.title-wrapper h1 {
  color: ${colors.primary}; font-size: 42pt; margin: 0 0 15pt 0;
  font-weight: bold;
}
.title-border {
  width: 100pt; height: 4pt; background: ${colors.secondary};
  margin: 0;
}
.content h2 {
  color: ${colors.primary}; font-size: 20pt; margin: 15pt 0 8pt 0;
  font-weight: bold;
}
.content p {
  color: ${colors.text}; font-size: 18pt; line-height: 1.7;
  margin: 15pt 0;
}
.content ul {
  color: ${colors.text}; font-size: 16pt; line-height: 1.3;
  margin: 10pt 0; padding-left: 40pt;
}
.content li {
  margin: 2pt 0;
}
.highlight-box {
  background: ${colors.background}; border-left: 6pt solid ${colors.secondary};
  padding: 15pt; margin: 15pt 0 10pt 0;
}
.highlight-box p {
  margin: 0 0 8pt 0; color: ${colors.text};
}
.highlight-box ul {
  margin: 8pt 0 0 0; font-size: 14pt; line-height: 1.25;
}
.highlight-box li {
  margin: 2pt 0;
}
</style>
</head>
<body>
<div class="content">
<div class="title-wrapper">
<h1>${title}</h1>
<div class="title-border"></div>
</div>
${content}
</div>
</body>
</html>`;
}

async function createPresentation() {
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'AWS Business Group';
  pptx.title = 'AWS Bedrock Training';
  pptx.company = 'Amazon Web Services';

  const slidesDir = path.join(__dirname, 'slides');
  if (!fs.existsSync(slidesDir)) {
    fs.mkdirSync(slidesDir, { recursive: true });
  }

  // Slide 1: Title Slide
  const titleHTML = createSlideHTML(
    'AWS Bedrock Training',
    '<h2>Building Generative AI Applications</h2><p style="font-size: 20pt; margin-top: 30pt;">Training Session Overview</p>',
    'Building Generative AI Applications with Amazon Bedrock'
  );
  fs.writeFileSync(path.join(slidesDir, 'slide-01-title.html'), titleHTML);
  await html2pptx(path.join(slidesDir, 'slide-01-title.html'), pptx);

  // Slide 2: Agenda
  const agendaHTML = `<!DOCTYPE html>
<html>
<head>
<style>
html { background: ${colors.white}; }
body {
  width: 720pt; height: 405pt; margin: 0; padding: 0;
  background: ${colors.white}; font-family: Arial, sans-serif;
  display: flex; flex-direction: column;
}
.content {
  flex: 1; padding: 40pt 50pt 80pt 50pt; overflow: hidden;
}
.title-wrapper {
  margin-bottom: 25pt;
}
.title-wrapper h1 {
  color: ${colors.primary}; font-size: 42pt; margin: 0 0 15pt 0;
  font-weight: bold;
}
.title-border {
  width: 100pt; height: 4pt; background: ${colors.secondary};
  margin: 0;
}
.agenda-container {
  display: flex; gap: 40pt;
}
.agenda-column {
  flex: 1;
}
.agenda-column ul {
  color: ${colors.text}; font-size: 16pt; line-height: 1.6;
  margin: 0; padding-left: 30pt;
}
.agenda-column li {
  margin: 8pt 0;
}
</style>
</head>
<body>
<div class="content">
<div class="title-wrapper">
<h1>Agenda</h1>
<div class="title-border"></div>
</div>
<div class="agenda-container">
<div class="agenda-column">
<ul>
<li><strong>Introduction to AWS Bedrock</strong></li>
<li><strong>What is Amazon Bedrock?</strong></li>
<li><strong>Key Features & Capabilities</strong></li>
<li><strong>Foundation Models</strong></li>
<li><strong>Use Cases & Applications</strong></li>
</ul>
</div>
<div class="agenda-column">
<ul>
<li><strong>Architecture & Integration</strong></li>
<li><strong>Getting Started</strong></li>
<li><strong>Best Practices</strong></li>
<li><strong>Pricing & Cost Optimization</strong></li>
<li><strong>Q&A</strong></li>
</ul>
</div>
</div>
</div>
</body>
</html>`;
  fs.writeFileSync(path.join(slidesDir, 'slide-02-agenda.html'), agendaHTML);
  await html2pptx(path.join(slidesDir, 'slide-02-agenda.html'), pptx);

  // Slide 3: Learning Objectives
  const objectivesHTML = `<!DOCTYPE html>
<html>
<head>
<style>
html { background: ${colors.white}; }
body {
  width: 720pt; height: 405pt; margin: 0; padding: 0;
  background: ${colors.white}; font-family: Arial, sans-serif;
  display: flex; flex-direction: column;
}
.content {
  flex: 1; padding: 40pt 60pt 90pt 60pt; overflow: hidden;
}
.title-wrapper {
  margin-bottom: 20pt;
}
.title-wrapper h1 {
  color: ${colors.primary}; font-size: 42pt; margin: 0 0 15pt 0;
  font-weight: bold;
}
.title-border {
  width: 100pt; height: 4pt; background: ${colors.secondary};
  margin: 0;
}
.content p {
  color: ${colors.text}; font-size: 18pt; line-height: 1.7;
  margin: 15pt 0 10pt 0;
}
.content ul {
  color: ${colors.text}; font-size: 16pt; line-height: 1.4;
  margin: 10pt 0; padding-left: 40pt;
}
.content li {
  margin: 3pt 0;
}
</style>
</head>
<body>
<div class="content">
<div class="title-wrapper">
<h1>Learning Objectives</h1>
<div class="title-border"></div>
</div>
<p>By the end of this training, you will:</p>
<ul>
<li>Understand what AWS Bedrock is and its core value proposition</li>
<li>Know the key features and capabilities available</li>
<li>Be familiar with the foundation models offered</li>
<li>Understand common use cases and applications</li>
<li>Know how to get started with Bedrock</li>
<li>Understand best practices for implementation</li>
<li>Be aware of pricing considerations</li>
</ul>
</div>
</body>
</html>`;
  fs.writeFileSync(path.join(slidesDir, 'slide-03-objectives.html'), objectivesHTML);
  await html2pptx(path.join(slidesDir, 'slide-03-objectives.html'), pptx);

  // Slide 4: The AI Revolution
  const aiRevolutionHTML = `<!DOCTYPE html>
<html>
<head>
<style>
html { background: ${colors.white}; }
body {
  width: 720pt; height: 405pt; margin: 0; padding: 0;
  background: ${colors.white}; font-family: Arial, sans-serif;
  display: flex; flex-direction: column;
}
.content {
  flex: 1; padding: 40pt 50pt 100pt 50pt; overflow: hidden;
}
.title-wrapper {
  margin-bottom: 20pt;
}
.title-wrapper h1 {
  color: ${colors.primary}; font-size: 42pt; margin: 0 0 15pt 0;
  font-weight: bold;
}
.title-border {
  width: 100pt; height: 4pt; background: ${colors.secondary};
  margin: 0;
}
.columns {
  display: flex; gap: 30pt; margin-top: 15pt;
}
.column {
  flex: 1;
}
.column h2 {
  color: ${colors.primary}; font-size: 22pt; margin: 0 0 12pt 0;
  font-weight: bold;
}
.column ul {
  color: ${colors.text}; font-size: 16pt; line-height: 1.5;
  margin: 0; padding-left: 30pt;
}
.column li {
  margin: 5pt 0;
}
</style>
</head>
<body>
<div class="content">
<div class="title-wrapper">
<h1>The AI Revolution</h1>
<div class="title-border"></div>
</div>
<div class="columns">
<div class="column">
<h2>Traditional AI</h2>
<ul>
<li>Task-specific models</li>
<li>Requires extensive training data</li>
<li>Limited to specific domains</li>
<li>High development cost</li>
</ul>
</div>
<div class="column">
<h2>Generative AI</h2>
<ul>
<li>General-purpose foundation models</li>
<li>Pre-trained on vast datasets</li>
<li>Adaptable to multiple use cases</li>
<li>Accessible via APIs</li>
</ul>
</div>
</div>
</div>
</body>
</html>`;
  fs.writeFileSync(path.join(slidesDir, 'slide-04-ai-revolution.html'), aiRevolutionHTML);
  await html2pptx(path.join(slidesDir, 'slide-04-ai-revolution.html'), pptx);

  // Slide 5: Challenges with Foundation Models
  const challengesHTML = `<!DOCTYPE html>
<html>
<head>
<style>
html { background: ${colors.white}; }
body {
  width: 720pt; height: 405pt; margin: 0; padding: 0;
  background: ${colors.white}; font-family: Arial, sans-serif;
  display: flex; flex-direction: column;
}
.content {
  flex: 1; padding: 40pt 50pt 100pt 50pt; overflow: hidden;
}
.title-wrapper {
  margin-bottom: 20pt;
}
.title-wrapper h1 {
  color: ${colors.primary}; font-size: 42pt; margin: 0 0 15pt 0;
  font-weight: bold;
}
.title-border {
  width: 100pt; height: 4pt; background: ${colors.secondary};
  margin: 0;
}
.content p {
  color: ${colors.text}; font-size: 18pt; line-height: 1.7;
  margin: 15pt 0 12pt 0;
}
.challenges-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 20pt;
  margin-top: 10pt;
}
.challenges-grid ul {
  color: ${colors.text}; font-size: 16pt; line-height: 1.3;
  margin: 0; padding-left: 30pt;
}
.challenges-grid li {
  margin: 4pt 0;
}
</style>
</head>
<body>
<div class="content">
<div class="title-wrapper">
<h1>Challenges with Foundation Models</h1>
<div class="title-border"></div>
</div>
<p><strong>Before AWS Bedrock:</strong></p>
<div class="challenges-grid">
<ul>
<li>❌ Complex model selection</li>
<li>❌ Infrastructure management</li>
<li>❌ Security & compliance concerns</li>
</ul>
<ul>
<li>❌ High costs for experimentation</li>
<li>❌ Vendor lock-in</li>
<li>❌ Integration complexity</li>
</ul>
</div>
</div>
</body>
</html>`;
  fs.writeFileSync(path.join(slidesDir, 'slide-05-challenges.html'), challengesHTML);
  await html2pptx(path.join(slidesDir, 'slide-05-challenges.html'), pptx);

  // Slide 6: Amazon Bedrock Overview
  const overviewHTML = `<!DOCTYPE html>
<html>
<head>
<style>
html { background: ${colors.white}; }
body {
  width: 720pt; height: 405pt; margin: 0; padding: 0;
  background: ${colors.white}; font-family: Arial, sans-serif;
  display: flex; flex-direction: column;
}
.content {
  flex: 1; padding: 40pt 60pt 100pt 60pt; overflow: hidden;
}
.title-wrapper {
  margin-bottom: 20pt;
}
.title-wrapper h1 {
  color: ${colors.primary}; font-size: 42pt; margin: 0 0 15pt 0;
  font-weight: bold;
}
.title-border {
  width: 100pt; height: 4pt; background: ${colors.secondary};
  margin: 0;
}
.content p {
  color: ${colors.text}; font-size: 18pt; line-height: 1.7;
  margin: 15pt 0 12pt 0;
}
.highlight-box {
  background: ${colors.background}; border-left: 6pt solid ${colors.secondary};
  padding: 15pt; margin: 12pt 0 5pt 0;
}
.highlight-box p {
  margin: 0 0 8pt 0; color: ${colors.text}; font-size: 16pt;
}
.highlight-box ul {
  margin: 8pt 0 0 0; font-size: 14pt; line-height: 1.25;
  padding-left: 30pt;
}
.highlight-box li {
  margin: 2pt 0;
}
</style>
</head>
<body>
<div class="content">
<div class="title-wrapper">
<h1>Amazon Bedrock Overview</h1>
<div class="title-border"></div>
</div>
<p><strong>Fully managed service</strong> that provides easy-to-use APIs for accessing foundation models from leading AI companies</p>
<div class="highlight-box">
<p><strong>Key Value Propositions:</strong></p>
<ul>
<li>🚀 <strong>Serverless</strong> - No infrastructure to manage</li>
<li>🔒 <strong>Secure</strong> - Enterprise-grade security</li>
<li>💰 <strong>Cost-effective</strong> - Pay only for what you use</li>
<li>🔄 <strong>Flexible</strong> - Multiple models, easy switching</li>
<li>⚡ <strong>Fast</strong> - Low latency, high performance</li>
</ul>
</div>
</div>
</body>
</html>`;
  fs.writeFileSync(path.join(slidesDir, 'slide-06-overview.html'), overviewHTML);
  await html2pptx(path.join(slidesDir, 'slide-06-overview.html'), pptx);

  // Slide 7: Core Features - Custom layout
  const coreFeaturesHTML = `<!DOCTYPE html>
<html>
<head>
<style>
html { background: ${colors.white}; }
body {
  width: 720pt; height: 405pt; margin: 0; padding: 0;
  background: ${colors.white}; font-family: Arial, sans-serif;
  display: flex; flex-direction: column;
}
.content {
  flex: 1; padding: 40pt 60pt 110pt 60pt; overflow: hidden;
}
.title-wrapper {
  margin-bottom: 18pt;
}
.title-wrapper h1 {
  color: ${colors.primary}; font-size: 42pt; margin: 0 0 12pt 0;
  font-weight: bold;
}
.title-border {
  width: 100pt; height: 4pt; background: ${colors.secondary};
  margin: 0;
}
.features-container {
  display: flex; flex-direction: column; gap: 8pt;
  margin-top: 8pt;
}
.feature-section h2 {
  color: ${colors.primary}; font-size: 20pt; margin: 0 0 6pt 0;
  font-weight: bold;
}
.feature-section ul {
  color: ${colors.text}; font-size: 14pt; line-height: 1.25;
  margin: 0; padding-left: 30pt;
}
.feature-section li {
  margin: 2pt 0;
}
</style>
</head>
<body>
<div class="content">
<div class="title-wrapper">
<h1>Core Features</h1>
<div class="title-border"></div>
</div>
<div class="features-container">
<div class="feature-section">
<h2>1. Foundation Model Access</h2>
<ul>
<li>Single API for multiple models</li>
<li>Easy model comparison and switching</li>
<li>No vendor lock-in</li>
</ul>
</div>
<div class="feature-section">
<h2>2. Serverless Architecture</h2>
<ul>
<li>No infrastructure management</li>
<li>Automatic scaling & high availability</li>
</ul>
</div>
<div class="feature-section">
<h2>3. Enterprise Security</h2>
<ul>
<li>Data encryption at rest and in transit</li>
<li>VPC endpoints, IAM, PrivateLink</li>
</ul>
</div>
</div>
</div>
</body>
</html>`;
  fs.writeFileSync(path.join(slidesDir, 'slide-07-core-features.html'), coreFeaturesHTML);
  await html2pptx(path.join(slidesDir, 'slide-07-core-features.html'), pptx);

  // Slide 8: Advanced Features (2024) - Custom layout
  const advancedFeaturesHTML = `<!DOCTYPE html>
<html>
<head>
<style>
html { background: ${colors.white}; }
body {
  width: 720pt; height: 405pt; margin: 0; padding: 0;
  background: ${colors.white}; font-family: Arial, sans-serif;
  display: flex; flex-direction: column;
}
.content {
  flex: 1; padding: 40pt 60pt 110pt 60pt; overflow: hidden;
}
.title-wrapper {
  margin-bottom: 18pt;
}
.title-wrapper h1 {
  color: ${colors.primary}; font-size: 42pt; margin: 0 0 12pt 0;
  font-weight: bold;
}
.title-border {
  width: 100pt; height: 4pt; background: ${colors.secondary};
  margin: 0;
}
.features-container {
  display: flex; flex-direction: column; gap: 8pt;
  margin-top: 8pt;
}
.feature-section h2 {
  color: ${colors.primary}; font-size: 20pt; margin: 0 0 6pt 0;
  font-weight: bold;
}
.feature-section ul {
  color: ${colors.text}; font-size: 14pt; line-height: 1.25;
  margin: 0; padding-left: 30pt;
}
.feature-section li {
  margin: 2pt 0;
}
</style>
</head>
<body>
<div class="content">
<div class="title-wrapper">
<h1>Advanced Features (2024)</h1>
<div class="title-border"></div>
</div>
<div class="features-container">
<div class="feature-section">
<h2>Performance Optimization</h2>
<ul>
<li>⚡ Latency-optimized inference (Preview)</li>
<li>🚀 Prompt caching for faster responses</li>
<li>📊 Model distillation capabilities</li>
</ul>
</div>
<div class="feature-section">
<h2>Multimodal Support</h2>
<ul>
<li>📝 Text, 🖼️ Image, 🎥 Video, 🎵 Audio</li>
</ul>
</div>
<div class="feature-section">
<h2>Enhanced RAG</h2>
<ul>
<li>🔍 Rerank models, 📚 Knowledge bases</li>
<li>🔗 Custom connectors, 📊 GraphRAG</li>
</ul>
</div>
</div>
</div>
</body>
</html>`;
  fs.writeFileSync(path.join(slidesDir, 'slide-08-advanced-features.html'), advancedFeaturesHTML);
  await html2pptx(path.join(slidesDir, 'slide-08-advanced-features.html'), pptx);

  // Slide 9: Model Providers - Custom layout
  const modelProvidersHTML = `<!DOCTYPE html>
<html>
<head>
<style>
html { background: ${colors.white}; }
body {
  width: 720pt; height: 405pt; margin: 0; padding: 0;
  background: ${colors.white}; font-family: Arial, sans-serif;
  display: flex; flex-direction: column;
}
.content {
  flex: 1; padding: 40pt 60pt 110pt 60pt; overflow: hidden;
}
.title-wrapper {
  margin-bottom: 18pt;
}
.title-wrapper h1 {
  color: ${colors.primary}; font-size: 42pt; margin: 0 0 12pt 0;
  font-weight: bold;
}
.title-border {
  width: 100pt; height: 4pt; background: ${colors.secondary};
  margin: 0;
}
.content p {
  color: ${colors.text}; font-size: 18pt; line-height: 1.7;
  margin: 12pt 0 8pt 0;
}
.content ul {
  color: ${colors.text}; font-size: 14pt; line-height: 1.3;
  margin: 8pt 0; padding-left: 40pt;
}
.content li {
  margin: 2pt 0;
}
.highlight-box {
  background: ${colors.background}; border-left: 6pt solid ${colors.secondary};
  padding: 12pt; margin: 12pt 0 0 0;
}
.highlight-box p {
  margin: 0; color: ${colors.text}; font-size: 15pt;
}
</style>
</head>
<body>
<div class="content">
<div class="title-wrapper">
<h1>Model Providers</h1>
<div class="title-border"></div>
</div>
<p><strong>Leading AI Companies:</strong></p>
<ul>
<li><strong>Anthropic</strong> - Claude 3.5 series</li>
<li><strong>Meta</strong> - Llama 3.1 (405B, 70B)</li>
<li><strong>Amazon</strong> - Titan, Nova series</li>
<li><strong>Cohere</strong> - Command, Embed models</li>
<li><strong>AI21 Labs</strong> - Jurassic models</li>
<li><strong>Stability AI</strong> & <strong>Mistral AI</strong> - Image & Mistral models</li>
</ul>
<div class="highlight-box">
<p><strong>Model Catalog (2024):</strong> 52 serverless models, 122 marketplace models, 174 total models available</p>
</div>
</div>
</body>
</html>`;
  fs.writeFileSync(path.join(slidesDir, 'slide-09-model-providers.html'), modelProvidersHTML);
  await html2pptx(path.join(slidesDir, 'slide-09-model-providers.html'), pptx);

  // Slide 10: Popular Models - Custom compact layout
  const popularModelsHTML = `<!DOCTYPE html>
<html>
<head>
<style>
html { background: ${colors.white}; }
body {
  width: 720pt; height: 405pt; margin: 0; padding: 0;
  background: ${colors.white}; font-family: Arial, sans-serif;
  display: flex; flex-direction: column;
}
.content {
  flex: 1; padding: 40pt 60pt 110pt 60pt; overflow: hidden;
}
.title-wrapper {
  margin-bottom: 18pt;
}
.title-wrapper h1 {
  color: ${colors.primary}; font-size: 42pt; margin: 0 0 12pt 0;
  font-weight: bold;
}
.title-border {
  width: 100pt; height: 4pt; background: ${colors.secondary};
  margin: 0;
}
.models-container {
  display: grid; grid-template-columns: 1fr 1fr; gap: 20pt;
  margin-top: 10pt;
}
.model-section h2 {
  color: ${colors.primary}; font-size: 18pt; margin: 0 0 6pt 0;
  font-weight: bold;
}
.model-section ul {
  color: ${colors.text}; font-size: 13pt; line-height: 1.3;
  margin: 0; padding-left: 25pt;
}
.model-section li {
  margin: 2pt 0;
}
.model-section-full {
  grid-column: 1 / -1;
}
</style>
</head>
<body>
<div class="content">
<div class="title-wrapper">
<h1>Popular Models</h1>
<div class="title-border"></div>
</div>
<div class="models-container">
<div class="model-section">
<h2>Claude 3.5 Sonnet</h2>
<ul>
<li><strong>Best for:</strong> Complex reasoning, code</li>
<li><strong>Strengths:</strong> High accuracy, safety</li>
<li><strong>Use cases:</strong> Q&A, analysis</li>
</ul>
</div>
<div class="model-section">
<h2>Llama 3.1 (Meta)</h2>
<ul>
<li><strong>Best for:</strong> General-purpose tasks</li>
<li><strong>Strengths:</strong> Open-source</li>
<li><strong>Use cases:</strong> Chatbots, content</li>
</ul>
</div>
<div class="model-section-full">
<h2>Amazon Titan</h2>
<ul>
<li><strong>Best for:</strong> AWS-native applications</li>
<li><strong>Strengths:</strong> Optimized for AWS services</li>
</ul>
</div>
</div>
</div>
</body>
</html>`;
  fs.writeFileSync(path.join(slidesDir, 'slide-10-popular-models.html'), popularModelsHTML);
  await html2pptx(path.join(slidesDir, 'slide-10-popular-models.html'), pptx);

  // Slide 11: Common Use Cases - Compact grid
  const useCasesHTML = `<!DOCTYPE html>
<html>
<head>
<style>
html { background: ${colors.white}; }
body {
  width: 720pt; height: 405pt; margin: 0; padding: 0;
  background: ${colors.white}; font-family: Arial, sans-serif;
  display: flex; flex-direction: column;
}
.content {
  flex: 1; padding: 40pt 50pt 110pt 50pt; overflow: hidden;
}
.title-wrapper {
  margin-bottom: 18pt;
}
.title-wrapper h1 {
  color: ${colors.primary}; font-size: 42pt; margin: 0 0 12pt 0;
  font-weight: bold;
}
.title-border {
  width: 100pt; height: 4pt; background: ${colors.secondary};
  margin: 0;
}
.use-cases-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 15pt;
  margin-top: 10pt;
}
.use-case-section h2 {
  color: ${colors.primary}; font-size: 18pt; margin: 0 0 6pt 0;
  font-weight: bold;
}
.use-case-section ul {
  color: ${colors.text}; font-size: 13pt; line-height: 1.3;
  margin: 0; padding-left: 25pt;
}
.use-case-section li {
  margin: 2pt 0;
}
</style>
</head>
<body>
<div class="content">
<div class="title-wrapper">
<h1>Common Use Cases</h1>
<div class="title-border"></div>
</div>
<div class="use-cases-grid">
<div class="use-case-section">
<h2>1. Content Generation</h2>
<ul>
<li>Blog posts, articles</li>
<li>Marketing copy</li>
<li>Product descriptions</li>
</ul>
</div>
<div class="use-case-section">
<h2>2. Question Answering</h2>
<ul>
<li>Customer support chatbots</li>
<li>Knowledge base Q&A</li>
<li>Document analysis</li>
</ul>
</div>
<div class="use-case-section">
<h2>3. Code Generation</h2>
<ul>
<li>Code completion</li>
<li>Code explanation</li>
<li>Bug fixing</li>
</ul>
</div>
<div class="use-case-section">
<h2>4. Text Analysis</h2>
<ul>
<li>Sentiment analysis</li>
<li>Text summarization</li>
<li>Entity extraction</li>
</ul>
</div>
</div>
</div>
</body>
</html>`;
  fs.writeFileSync(path.join(slidesDir, 'slide-11-use-cases.html'), useCasesHTML);
  await html2pptx(path.join(slidesDir, 'slide-11-use-cases.html'), pptx);

  // Slide 12: Getting Started - Prerequisites - Compact
  const prerequisitesHTML = `<!DOCTYPE html>
<html>
<head>
<style>
html { background: ${colors.white}; }
body {
  width: 720pt; height: 405pt; margin: 0; padding: 0;
  background: ${colors.white}; font-family: Arial, sans-serif;
  display: flex; flex-direction: column;
}
.content {
  flex: 1; padding: 40pt 60pt 110pt 60pt; overflow: hidden;
}
.title-wrapper {
  margin-bottom: 18pt;
}
.title-wrapper h1 {
  color: ${colors.primary}; font-size: 38pt; margin: 0 0 12pt 0;
  font-weight: bold;
}
.title-border {
  width: 100pt; height: 4pt; background: ${colors.secondary};
  margin: 0;
}
.prereq-container {
  display: flex; flex-direction: column; gap: 12pt;
  margin-top: 10pt;
}
.prereq-section h2 {
  color: ${colors.primary}; font-size: 20pt; margin: 0 0 6pt 0;
  font-weight: bold;
}
.prereq-section ul {
  color: ${colors.text}; font-size: 14pt; line-height: 1.3;
  margin: 0; padding-left: 30pt;
}
.prereq-section li {
  margin: 2pt 0;
}
</style>
</head>
<body>
<div class="content">
<div class="title-wrapper">
<h1>Getting Started - Prerequisites</h1>
<div class="title-border"></div>
</div>
<div class="prereq-container">
<div class="prereq-section">
<h2>AWS Account Setup</h2>
<ul>
<li>✅ AWS Account</li>
<li>✅ Appropriate IAM permissions</li>
<li>✅ Bedrock access enabled</li>
<li>✅ Region selection (us-east-1, us-west-2, etc.)</li>
</ul>
</div>
<div class="prereq-section">
<h2>Development Environment</h2>
<ul>
<li>AWS CLI configured</li>
<li>AWS SDK installed</li>
<li>Python/Node.js/Java (your choice)</li>
</ul>
</div>
</div>
</div>
</body>
</html>`;
  fs.writeFileSync(path.join(slidesDir, 'slide-12-prerequisites.html'), prerequisitesHTML);
  await html2pptx(path.join(slidesDir, 'slide-12-prerequisites.html'), pptx);

  // Slide 13: Basic API Call Example
  const apiExampleHTML = createContentSlideHTML('Basic API Call Example', `
    <div style="background: #F8F8F8; padding: 20pt; border-radius: 8pt; font-family: 'Courier New', monospace; font-size: 14pt; overflow: auto;">
      <p style="margin: 0; color: #333;"><strong>Python Example:</strong></p>
      <pre style="margin: 10pt 0 0 0; white-space: pre-wrap; color: #232F3E;">import boto3
import json

bedrock = boto3.client(
    'bedrock-runtime',
    region_name='us-east-1'
)

response = bedrock.invoke_model(
    modelId='anthropic.claude-3-5-sonnet-20241022-v2:0',
    body=json.dumps({
        "anthropic_version": "bedrock-2023-05-31",
        "max_tokens": 1024,
        "messages": [{
            "role": "user",
            "content": "Explain AWS Bedrock."
        }]
    })
)

result = json.loads(response['body'].read())
print(result['content'][0]['text'])</pre>
    </div>
  `);
  fs.writeFileSync(path.join(slidesDir, 'slide-13-api-example.html'), apiExampleHTML);
  await html2pptx(path.join(slidesDir, 'slide-13-api-example.html'), pptx);

  // Slide 14: Security Best Practices - Compact
  const securityHTML = `<!DOCTYPE html>
<html>
<head>
<style>
html { background: ${colors.white}; }
body {
  width: 720pt; height: 405pt; margin: 0; padding: 0;
  background: ${colors.white}; font-family: Arial, sans-serif;
  display: flex; flex-direction: column;
}
.content {
  flex: 1; padding: 40pt 60pt 110pt 60pt; overflow: hidden;
}
.title-wrapper {
  margin-bottom: 18pt;
}
.title-wrapper h1 {
  color: ${colors.primary}; font-size: 42pt; margin: 0 0 12pt 0;
  font-weight: bold;
}
.title-border {
  width: 100pt; height: 4pt; background: ${colors.secondary};
  margin: 0;
}
.security-container {
  display: flex; flex-direction: column; gap: 6pt;
  margin-top: 8pt;
}
.security-section h2 {
  color: ${colors.primary}; font-size: 20pt; margin: 0 0 6pt 0;
  font-weight: bold;
}
.security-section ul {
  color: ${colors.text}; font-size: 14pt; line-height: 1.3;
  margin: 0; padding-left: 30pt;
}
.security-section li {
  margin: 2pt 0;
}
</style>
</head>
<body>
<div class="content">
<div class="title-wrapper">
<h1>Security Best Practices</h1>
<div class="title-border"></div>
</div>
<div class="security-container">
<div class="security-section">
<h2>1. IAM & Access Control</h2>
<ul>
<li>Use least privilege principle</li>
<li>Separate IAM roles for different environments</li>
</ul>
</div>
<div class="security-section">
<h2>2. Data Protection</h2>
<ul>
<li>Encrypt data in transit (TLS)</li>
<li>Use VPC endpoints for private access</li>
</ul>
</div>
<div class="security-section">
<h2>3. Content Safety</h2>
<ul>
<li>Enable Bedrock Guardrails</li>
<li>Implement content filtering & monitoring</li>
</ul>
</div>
</div>
</div>
</body>
</html>`;
  fs.writeFileSync(path.join(slidesDir, 'slide-14-security.html'), securityHTML);
  await html2pptx(path.join(slidesDir, 'slide-14-security.html'), pptx);

  // Slide 15: Performance Best Practices - Compact
  const performanceHTML = `<!DOCTYPE html>
<html>
<head>
<style>
html { background: ${colors.white}; }
body {
  width: 720pt; height: 405pt; margin: 0; padding: 0;
  background: ${colors.white}; font-family: Arial, sans-serif;
  display: flex; flex-direction: column;
}
.content {
  flex: 1; padding: 40pt 60pt 110pt 60pt; overflow: hidden;
}
.title-wrapper {
  margin-bottom: 18pt;
}
.title-wrapper h1 {
  color: ${colors.primary}; font-size: 42pt; margin: 0 0 12pt 0;
  font-weight: bold;
}
.title-border {
  width: 100pt; height: 4pt; background: ${colors.secondary};
  margin: 0;
}
.performance-container {
  display: flex; flex-direction: column; gap: 8pt;
  margin-top: 10pt;
}
.performance-section h2 {
  color: ${colors.primary}; font-size: 20pt; margin: 0 0 6pt 0;
  font-weight: bold;
}
.performance-section ul {
  color: ${colors.text}; font-size: 14pt; line-height: 1.3;
  margin: 0; padding-left: 30pt;
}
.performance-section li {
  margin: 2pt 0;
}
</style>
</head>
<body>
<div class="content">
<div class="title-wrapper">
<h1>Performance Best Practices</h1>
<div class="title-border"></div>
</div>
<div class="performance-container">
<div class="performance-section">
<h2>1. Model Selection</h2>
<ul>
<li>Choose appropriate model for task</li>
<li>Consider latency vs. cost trade-offs</li>
</ul>
</div>
<div class="performance-section">
<h2>2. Prompt Optimization</h2>
<ul>
<li>Use prompt caching for repeated prompts</li>
<li>Structure prompts clearly</li>
</ul>
</div>
<div class="performance-section">
<h2>3. Caching & Optimization</h2>
<ul>
<li>Cache common responses</li>
<li>Batch requests & use streaming</li>
</ul>
</div>
</div>
</div>
</body>
</html>`;
  fs.writeFileSync(path.join(slidesDir, 'slide-15-performance.html'), performanceHTML);
  await html2pptx(path.join(slidesDir, 'slide-15-performance.html'), pptx);

  // Slide 16: Pricing Model - Compact
  const pricingHTML = `<!DOCTYPE html>
<html>
<head>
<style>
html { background: ${colors.white}; }
body {
  width: 720pt; height: 405pt; margin: 0; padding: 0;
  background: ${colors.white}; font-family: Arial, sans-serif;
  display: flex; flex-direction: column;
}
.content {
  flex: 1; padding: 40pt 60pt 110pt 60pt; overflow: hidden;
}
.title-wrapper {
  margin-bottom: 18pt;
}
.title-wrapper h1 {
  color: ${colors.primary}; font-size: 42pt; margin: 0 0 12pt 0;
  font-weight: bold;
}
.title-border {
  width: 100pt; height: 4pt; background: ${colors.secondary};
  margin: 0;
}
.highlight-box {
  background: ${colors.background}; border-left: 6pt solid ${colors.secondary};
  padding: 15pt; margin: 10pt 0 8pt 0;
}
.highlight-box h2 {
  color: ${colors.primary}; font-size: 22pt; margin: 0 0 8pt 0;
  font-weight: bold;
}
.highlight-box ul {
  color: ${colors.text}; font-size: 15pt; line-height: 1.4;
  margin: 0; padding-left: 30pt;
}
.highlight-box li {
  margin: 3pt 0;
}
.content h2 {
  color: ${colors.primary}; font-size: 22pt; margin: 12pt 0 6pt 0;
  font-weight: bold;
}
.content ul {
  color: ${colors.text}; font-size: 14pt; line-height: 1.3;
  margin: 0; padding-left: 30pt;
}
.content li {
  margin: 2pt 0;
}
</style>
</head>
<body>
<div class="content">
<div class="title-wrapper">
<h1>Pricing Model</h1>
<div class="title-border"></div>
</div>
<div class="highlight-box">
<h2>Pay-as-You-Go</h2>
<ul>
<li><strong>No upfront costs</strong></li>
<li><strong>No minimum commitments</strong></li>
<li><strong>Pay only for what you use</strong></li>
</ul>
</div>
<h2>Pricing Factors:</h2>
<ul>
<li><strong>Model type</strong> (text, image, embedding)</li>
<li><strong>Input/Output tokens</strong> (prompt & response length)</li>
<li><strong>Model provider</strong> (varies by provider)</li>
</ul>
</div>
</body>
</html>`;
  fs.writeFileSync(path.join(slidesDir, 'slide-16-pricing.html'), pricingHTML);
  await html2pptx(path.join(slidesDir, 'slide-16-pricing.html'), pptx);

  // Slide 17: Example Pricing - Compact
  const examplePricingHTML = `<!DOCTYPE html>
<html>
<head>
<style>
html { background: ${colors.white}; }
body {
  width: 720pt; height: 405pt; margin: 0; padding: 0;
  background: ${colors.white}; font-family: Arial, sans-serif;
  display: flex; flex-direction: column;
}
.content {
  flex: 1; padding: 40pt 60pt 110pt 60pt; overflow: hidden;
}
.title-wrapper {
  margin-bottom: 18pt;
}
.title-wrapper h1 {
  color: ${colors.primary}; font-size: 38pt; margin: 0 0 12pt 0;
  font-weight: bold;
}
.title-border {
  width: 100pt; height: 4pt; background: ${colors.secondary};
  margin: 0;
}
.pricing-container {
  display: flex; flex-direction: column; gap: 10pt;
  margin-top: 10pt;
}
.pricing-section h2 {
  color: ${colors.primary}; font-size: 20pt; margin: 0 0 6pt 0;
  font-weight: bold;
}
.pricing-section ul {
  color: ${colors.text}; font-size: 15pt; line-height: 1.4;
  margin: 0; padding-left: 30pt;
}
.pricing-section li {
  margin: 2pt 0;
}
.note {
  font-size: 12pt; color: #666; margin-top: 8pt; font-style: italic;
}
</style>
</head>
<body>
<div class="content">
<div class="title-wrapper">
<h1>Example Pricing (2024)</h1>
<div class="title-border"></div>
</div>
<div class="pricing-container">
<div class="pricing-section">
<h2>Claude 3.5 Sonnet</h2>
<ul>
<li><strong>Input:</strong> $3.00 per 1M tokens</li>
<li><strong>Output:</strong> $15.00 per 1M tokens</li>
</ul>
</div>
<div class="pricing-section">
<h2>Llama 3.1 70B</h2>
<ul>
<li><strong>Input:</strong> $0.65 per 1M tokens</li>
<li><strong>Output:</strong> $0.65 per 1M tokens</li>
</ul>
</div>
<div class="pricing-section">
<h2>Amazon Titan Text</h2>
<ul>
<li><strong>Input:</strong> $0.80 per 1M tokens</li>
<li><strong>Output:</strong> $0.80 per 1M tokens</li>
</ul>
</div>
<p class="note">Prices vary by region and model</p>
</div>
</div>
</body>
</html>`;
  fs.writeFileSync(path.join(slidesDir, 'slide-17-example-pricing.html'), examplePricingHTML);
  await html2pptx(path.join(slidesDir, 'slide-17-example-pricing.html'), pptx);

  // Slide 18: Key Takeaways - Compact
  const takeawaysHTML = `<!DOCTYPE html>
<html>
<head>
<style>
html { background: ${colors.white}; }
body {
  width: 720pt; height: 405pt; margin: 0; padding: 0;
  background: ${colors.white}; font-family: Arial, sans-serif;
  display: flex; flex-direction: column;
}
.content {
  flex: 1; padding: 40pt 60pt 110pt 60pt; overflow: hidden;
}
.title-wrapper {
  margin-bottom: 18pt;
}
.title-wrapper h1 {
  color: ${colors.primary}; font-size: 42pt; margin: 0 0 12pt 0;
  font-weight: bold;
}
.title-border {
  width: 100pt; height: 4pt; background: ${colors.secondary};
  margin: 0;
}
.highlight-box {
  background: ${colors.background}; border-left: 6pt solid ${colors.secondary};
  padding: 20pt; margin: 10pt 0 0 0;
}
.highlight-box h2 {
  color: ${colors.primary}; font-size: 22pt; margin: 0 0 12pt 0;
  font-weight: bold;
}
.highlight-box ul {
  color: ${colors.text}; font-size: 16pt; line-height: 1.5;
  margin: 0; padding-left: 30pt;
}
.highlight-box li {
  margin: 4pt 0;
}
</style>
</head>
<body>
<div class="content">
<div class="title-wrapper">
<h1>Key Takeaways</h1>
<div class="title-border"></div>
</div>
<div class="highlight-box">
<h2>What We Learned:</h2>
<ul>
<li>✅ AWS Bedrock provides easy access to foundation models</li>
<li>✅ Serverless, secure, and cost-effective</li>
<li>✅ Multiple models and providers available</li>
<li>✅ Wide range of use cases</li>
<li>✅ Simple integration with AWS services</li>
<li>✅ Enterprise-grade security and compliance</li>
</ul>
</div>
</div>
</body>
</html>`;
  fs.writeFileSync(path.join(slidesDir, 'slide-18-takeaways.html'), takeawaysHTML);
  await html2pptx(path.join(slidesDir, 'slide-18-takeaways.html'), pptx);

  // Slide 19: Resources - Compact
  const resourcesHTML = `<!DOCTYPE html>
<html>
<head>
<style>
html { background: ${colors.white}; }
body {
  width: 720pt; height: 405pt; margin: 0; padding: 0;
  background: ${colors.white}; font-family: Arial, sans-serif;
  display: flex; flex-direction: column;
}
.content {
  flex: 1; padding: 40pt 60pt 110pt 60pt; overflow: hidden;
}
.title-wrapper {
  margin-bottom: 18pt;
}
.title-wrapper h1 {
  color: ${colors.primary}; font-size: 42pt; margin: 0 0 12pt 0;
  font-weight: bold;
}
.title-border {
  width: 100pt; height: 4pt; background: ${colors.secondary};
  margin: 0;
}
.resources-container {
  display: grid; grid-template-columns: 1fr 1fr; gap: 20pt;
  margin-top: 10pt;
}
.resource-section h2 {
  color: ${colors.primary}; font-size: 20pt; margin: 0 0 8pt 0;
  font-weight: bold;
}
.resource-section ul {
  color: ${colors.text}; font-size: 15pt; line-height: 1.5;
  margin: 0; padding-left: 30pt;
}
.resource-section li {
  margin: 4pt 0;
}
.resource-section-full {
  grid-column: 1 / -1;
}
</style>
</head>
<body>
<div class="content">
<div class="title-wrapper">
<h1>Resources</h1>
<div class="title-border"></div>
</div>
<div class="resources-container">
<div class="resource-section">
<h2>Documentation:</h2>
<ul>
<li>📚 AWS Bedrock Documentation</li>
<li>📖 AWS Bedrock User Guide</li>
<li>🔧 AWS Bedrock API Reference</li>
</ul>
</div>
<div class="resource-section">
<h2>Learning:</h2>
<ul>
<li>🎓 AWS Bedrock Training</li>
<li>📹 AWS Bedrock Videos</li>
<li>💻 AWS Bedrock Samples</li>
</ul>
</div>
<div class="resource-section-full">
<h2>Support:</h2>
<ul>
<li>💬 AWS Bedrock Forum</li>
<li>🐛 AWS Support</li>
</ul>
</div>
</div>
</div>
</body>
</html>`;
  fs.writeFileSync(path.join(slidesDir, 'slide-19-resources.html'), resourcesHTML);
  await html2pptx(path.join(slidesDir, 'slide-19-resources.html'), pptx);

  // Slide 20: Q&A - Custom centered layout
  const qaHTML = `<!DOCTYPE html>
<html>
<head>
<style>
html { background: ${colors.white}; }
body {
  width: 720pt; height: 405pt; margin: 0; padding: 0;
  background: ${colors.white}; font-family: Arial, sans-serif;
  display: flex; flex-direction: column;
  justify-content: center; align-items: center;
}
.qa-content {
  text-align: center;
}
.qa-content h1 {
  color: ${colors.primary}; font-size: 64pt; margin: 0 0 50pt 0;
  font-weight: bold;
}
.qa-content p {
  color: #666; font-size: 24pt; margin: 0;
}
</style>
</head>
<body>
<div class="qa-content">
<h1>Questions?</h1>
<p>Thank you for attending!</p>
</div>
</body>
</html>`;
  fs.writeFileSync(path.join(slidesDir, 'slide-20-qa.html'), qaHTML);
  await html2pptx(path.join(slidesDir, 'slide-20-qa.html'), pptx);

  // Save the presentation
  const outputPath = path.join(__dirname, 'aws-bedrock-training.pptx');
  await pptx.writeFile({ fileName: outputPath });
  console.log(`✅ Presentation created successfully: ${outputPath}`);
}

// Run the script
createPresentation().catch(console.error);
