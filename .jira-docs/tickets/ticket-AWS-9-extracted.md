# Extracted Information for Requirements Generation: AWS-9

**Ticket Key**: AWS-9
**Ticket Title**: Demo web page with EC2 Auto scaling group in a VPC
**Ticket Type**: Task
**Status**: To Do
**Priority**: Medium

## Key Information for Requirements Generation

### Ticket Summary
Demo web page with EC2 Auto scaling group in a VPC

### Description
I want to setup a simple static web page  hosted on EC2 instance with Auto Scaling group in a new VPC. The web page should be publicly accessible.

### Acceptance Criteria
Not explicitly provided in ticket description. Will need to be derived from the description during requirements generation.

### Ticket Type Analysis
- **Type**: Task
- **Scope**: Infrastructure setup and web hosting
- **Complexity**: Medium (involves VPC, EC2, Auto Scaling, and web hosting)

### Key Requirements Identified
1. Create a new VPC
2. Deploy EC2 instance(s) within the VPC
3. Configure Auto Scaling Group for EC2 instances
4. Host a simple static web page on EC2
5. Make the web page publicly accessible

### Dependencies
- **Linked Tickets**: None identified
- **Subtasks**: None
- **Related Issues**: None

### Technical Context
- **AWS Services Involved**: 
  - VPC (Virtual Private Cloud)
  - EC2 (Elastic Compute Cloud)
  - Auto Scaling Group
  - Likely: Internet Gateway, Route Tables, Security Groups, Load Balancer (for public access)
- **Infrastructure Type**: Compute and Networking
- **Accessibility Requirement**: Public access to web page

### Questions to Clarify (for Phase 2)
1. What Infrastructure as Code (IaC) tool should be used? (Terraform, CDK, CloudFormation)
2. What region should the VPC and resources be deployed in?
3. What instance type should be used for EC2?
4. What should be the minimum and maximum capacity for the Auto Scaling Group?
5. What should be the Auto Scaling Group scaling policies?
6. What should be the static web page content? (Simple "Hello World" or specific content?)
7. Should there be a Load Balancer for public access?
8. What security group rules are needed for public web access?
9. Should the VPC have public and private subnets, or just public subnets?
10. Any specific requirements for the EC2 instance configuration (AMI, user data, etc.)?

