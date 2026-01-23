# Phase 1: Analyze Meeting Transcript

**Assume the role** of a business analyst and requirements specialist

**Universal Phase**: Works with any meeting transcript to extract requirements and features

1. **Validate Transcript Input**: Check for transcript file:

   - Verify transcript file path provided by user exists
   - If file doesn't exist, ask user to provide correct path
   - Read transcript file content
   - Store transcript path in `.jira-epic-docs/epic-state.md`

2. **Read and Parse Transcript**: Analyze the meeting transcript:

   - Read transcript file content completely
   - Identify participants and their roles
   - Extract meeting topic and context
   - Identify key discussion points and decisions
   - Store raw transcript copy in `.jira-epic-docs/transcripts/transcript-{TRANSCRIPT-ID}.txt` (use filename or generate ID)

3. **Extract Business Requirements**: Analyze transcript for business requirements:

   - Identify business problems and pain points mentioned
   - Extract business goals and objectives
   - Identify key features and capabilities discussed
   - Extract user needs and expectations
   - Identify success criteria and KPIs mentioned
   - Store in `.jira-epic-docs/analysis/transcript-{TRANSCRIPT-ID}-requirements.md`

4. **Extract Functional Requirements**: Analyze transcript for functional requirements:

   - Identify specific features and functionalities
   - Extract user workflows and processes
   - Identify system interactions and integrations
   - Extract data requirements and data flows
   - Identify UI/UX requirements mentioned
   - Store in `.jira-epic-docs/analysis/transcript-{TRANSCRIPT-ID}-requirements.md` (append to same file)

5. **Extract Non-Functional Requirements**: Analyze transcript for non-functional requirements:

   - Identify performance requirements (scalability, availability, response time)
   - Extract security requirements
   - Identify compliance and regulatory requirements
   - Extract integration requirements
   - Identify deployment and infrastructure requirements
   - Store in `.jira-epic-docs/analysis/transcript-{TRANSCRIPT-ID}-requirements.md` (append to same file)

6. **Identify User Stories**: Extract user stories from transcript:

   - Identify "As a... I want... So that..." patterns
   - Extract user personas mentioned
   - Identify user journeys and workflows
   - Extract user pain points and needs
   - Store user stories in `.jira-epic-docs/analysis/transcript-{TRANSCRIPT-ID}-user-stories.md`

7. **Identify Epics and Features**: Group requirements into epics and features:

   - Analyze requirements to identify major feature areas
   - Group related requirements into epics
   - Identify feature boundaries and scope
   - Extract epic-level business value
   - Store epic structure in `.jira-epic-docs/analysis/transcript-{TRANSCRIPT-ID}-epics.md`

8. **Extract Technical Details**: Analyze transcript for technical information:

   - Identify technology stack preferences mentioned
   - Extract architecture requirements
   - Identify AWS services or cloud services mentioned
   - Extract integration points and APIs
   - Identify data storage and processing requirements
   - Store in `.jira-epic-docs/analysis/transcript-{TRANSCRIPT-ID}-technical.md`

9. **Extract Timeline and Priorities**: Analyze transcript for timeline information:

   - Identify MVP scope and timeline mentioned
   - Extract phase/iteration information
   - Identify priority features and requirements
   - Extract deadline or target dates mentioned
   - Store in `.jira-epic-docs/analysis/transcript-{TRANSCRIPT-ID}-timeline.md`

10. **Generate Comprehensive Analysis Report**: Create summary analysis document:

    - Create `.jira-epic-docs/analysis/transcript-{TRANSCRIPT-ID}-analysis.md`
    - Include executive summary
    - Include extracted requirements summary
    - Include identified epics and features
    - Include user stories summary
    - Include technical requirements summary
    - Include timeline and priorities summary
    - Include open questions or ambiguities

11. **Present Analysis Summary**: Display analysis results to user:

    - Show number of requirements extracted
    - Show number of epics identified
    - Show number of user stories identified
    - Show key features and capabilities
    - Show timeline and priorities
    - Ask user if they want to refine or add any requirements

12. **Handle User Feedback**: Process any user feedback or additions:

    - If user provides additional requirements, add them to analysis
    - If user wants to refine requirements, update analysis documents
    - If user wants to remove requirements, update analysis documents
    - Re-generate analysis summary if changes made

13. **Finalize Analysis**: Mark analysis as complete:

    - Update `.jira-epic-docs/epic-state.md` with Phase 1 completion
    - Log analysis completion in `.jira-epic-docs/audit.md`
    - Prepare for Phase 2 (JIRA item generation)

## Analysis Output Structure

The analysis phase generates the following documents:

- **Transcript Copy**: `.jira-epic-docs/transcripts/transcript-{TRANSCRIPT-ID}.txt`
- **Requirements Document**: `.jira-epic-docs/analysis/transcript-{TRANSCRIPT-ID}-requirements.md`
- **User Stories Document**: `.jira-epic-docs/analysis/transcript-{TRANSCRIPT-ID}-user-stories.md`
- **Epics Document**: `.jira-epic-docs/analysis/transcript-{TRANSCRIPT-ID}-epics.md`
- **Technical Document**: `.jira-epic-docs/analysis/transcript-{TRANSCRIPT-ID}-technical.md`
- **Timeline Document**: `.jira-epic-docs/analysis/transcript-{TRANSCRIPT-ID}-timeline.md`
- **Analysis Summary**: `.jira-epic-docs/analysis/transcript-{TRANSCRIPT-ID}-analysis.md`

## Key Analysis Principles

- **Comprehensive Extraction**: Extract all requirements, features, and user stories mentioned
- **No Assumptions**: Only extract information explicitly stated or clearly inferable from transcript
- **Structured Organization**: Organize extracted information into logical categories
- **User-Centric**: Focus on user needs, pain points, and workflows
- **Business Value**: Identify business value and impact for each requirement
- **Technical Feasibility**: Note technical requirements and constraints mentioned
