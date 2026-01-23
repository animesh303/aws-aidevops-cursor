# Phase 2: Generate JIRA Items (Epics, Stories, Tasks)

**Assume the role** of a JIRA administrator and agile coach

**Universal Phase**: Works with analyzed transcript to generate comprehensive JIRA items

1. **Load Analysis Artifacts**: Read all analysis documents from Phase 1:

   - Read transcript analysis summary
   - Read requirements document
   - Read user stories document
   - Read epics document
   - Read technical document
   - Read timeline document

2. **Load Consolidation Guide**: Read consolidation and limits guide:

   - **CRITICAL**: Read `references/item-consolidation-guide.md` completely
   - Understand item count guidelines (epics: 3-8, stories: 15-50, etc.)
   - Understand consolidation strategies for each item type
   - Understand validation rules and coverage requirements
   - **MANDATORY**: Apply consolidation guidelines throughout item generation

3. **Pre-Generation Analysis and Consolidation Planning**: Analyze requirements and plan consolidation:

   - Count total requirements extracted
   - Identify major feature areas (potential epics)
   - Estimate epic count (target: 3-8 epics)
   - Identify consolidation opportunities:
     - Group related features by business domain
     - Group related features by user persona
     - Group related features by workflow
   - Create consolidation plan:
     - List epics to consolidate
     - List stories to consolidate
     - List tasks to consolidate
   - Store consolidation plan in `.jira-epic-docs/jira-items/consolidation-plan.md`
   - **If estimated epic count > 8**: Apply epic consolidation before generating items

4. **Connect to JIRA and Get Project Details**: Use Atlassian MCP to get project information:

   - Use `@atlassian-mcp-server/getAccessibleAtlassianResources` to get cloud ID
   - Use `@atlassian-mcp-server/getVisibleJiraProjects` to get available projects
   - Ask user to select JIRA project if multiple projects available
   - Use `@atlassian-mcp-server/getJiraProjectIssueTypesMetadata` to get available issue types (Epic, Story, Task, Subtask)
   - Store project details in `.jira-epic-docs/jira-items/project-details.md`

5. **Generate Epic Structure with Consolidation**: Create comprehensive epics from analysis with consolidation:

   - **Apply Epic Consolidation**: Before creating epics, consolidate related features:
     - Group features that share business domain
     - Group features that serve same user personas
     - Group features that are part of same workflow
     - Group features that share technical infrastructure
   - **Target Epic Count**: 3-8 epics (consolidate if > 8)
   - For each consolidated epic:
     - **Epic Name**: Clear, business-focused name (reflects consolidated scope)
     - **Epic Description**: Comprehensive description with:
       - Business context and background
       - Business value and impact
       - Scope and boundaries (includes all consolidated features)
       - Success criteria
       - **Consolidated Features**: List of features included in this epic
     - **Acceptance Criteria**: High-level epic acceptance criteria
     - **Business Value**: Business value statement
     - **Dependencies**: Dependencies on other epics or external factors
     - **Estimated Duration**: Epic-level time estimate (weeks/months)
     - **Priority**: Epic priority (High, Medium, Low)
     - **Labels**: Relevant labels (epic, feature, etc.)
   - **Validate Epic Count**: Count generated epics
     - If count > 10: Show warning and suggest further consolidation
     - If count < 3: Verify all requirements are covered
   - Store epics in `.jira-epic-docs/jira-items/epics.md`

6. **Generate Story Structure with Consolidation**: Create comprehensive stories from analysis with consolidation:

   - **Apply Story Consolidation**: Before creating stories, consolidate related user stories:
     - Combine stories that share same user persona and goal
     - Combine sequential steps in same workflow
     - Combine stories with similar acceptance criteria
     - Combine stories with same priority and timeline
   - **Target Story Count**: 5-10 stories per epic, 15-50 stories total
   - For each consolidated story:
     - **Story Title**: User story format (As a [persona] I want [feature] So that [benefit])
       - If consolidated, ensure title reflects combined scope
     - **Story Description**: Detailed story description with:
       - User persona and context
       - Feature description (includes all consolidated features)
       - Business value
       - Technical considerations
       - **Consolidated Stories**: Note if story combines multiple original stories
     - **Acceptance Criteria**: Specific, testable acceptance criteria (numbered list)
       - Include all acceptance criteria from consolidated stories
     - **Story Points**: Story point estimation using Fibonacci scale (1, 2, 3, 5, 8, 13)
       - Adjust points if story was consolidated (may increase)
     - **Priority**: Story priority (High, Medium, Low)
     - **Epic Link**: Link to parent epic
     - **Dependencies**: Dependencies on other stories or tasks
     - **Labels**: Relevant labels (story, feature, enhancement, etc.)
     - **Sprint Assignment**: Target sprint or backlog placement
   - **Validate Story Count**: Count stories per epic and total
     - If any epic has > 10 stories: Show warning and suggest splitting epic
     - If total stories > 50: Show warning and suggest further consolidation
   - Store stories in `.jira-epic-docs/jira-items/stories.md`

7. **Generate Subtask Structure with Consolidation**: Create comprehensive subtasks for each story with consolidation:

   - **CRITICAL**: Use "Subtask" issue type (not "Task") for items that belong to Stories. Tasks are top-level issue types in JIRA and cannot be children of Stories. Subtasks can be linked to Stories via the parent field.
   - **Apply Subtask Consolidation**: Before creating subtasks, consolidate related subtasks:
     - Combine sequential implementation steps
     - Combine subtasks that modify same component
     - Combine subtasks that can be done in same dev session
     - Combine subtasks with minimal dependencies
   - **Target Subtask Count**: Maximum 3 subtasks per story
   - For each story, break down into consolidated subtasks:
     - **Subtask Title**: Clear subtask description (reflects consolidated scope if applicable)
     - **Subtask Description**: Detailed subtask description with:
       - Subtask scope and objectives (includes all consolidated work)
       - Technical approach
       - Deliverables
       - **Consolidated Subtasks**: Note if subtask combines multiple original subtasks
     - **Acceptance Criteria**: Subtask completion criteria (includes all consolidated criteria)
     - **Story Link**: Link to parent story (will be set via parent field in JIRA)
     - **Estimated Duration**: Time estimate in hours (adjust if consolidated)
     - **Priority**: Subtask priority (High, Medium, Low)
     - **Dependencies**: Dependencies on other subtasks
     - **Assignee**: Suggested assignee (if identifiable from transcript or requirements)
     - **Labels**: Relevant labels (subtask, development, testing, etc.)
   - **Validate Subtask Count**: Count subtasks per story
     - If any story has > 3 subtasks: Show warning and suggest consolidating subtasks or splitting story
   - Store subtasks in `.jira-epic-docs/jira-items/tasks.md` (note: file is named tasks.md but contains subtasks)

9. **Organize Sprint and Backlog Structure**: Plan sprint and backlog organization:

   - Analyze timeline and priorities from analysis
   - Organize stories into sprints based on:
     - Priority (High priority stories first)
     - Dependencies (dependent stories after dependencies)
     - Timeline (MVP stories in early sprints)
     - Story points (balance sprint capacity)
   - Create sprint plan with:
     - Sprint name and duration
     - Sprint goal
     - Stories assigned to sprint
     - Total story points per sprint
   - Organize backlog with:
     - Backlog priority order
     - Stories not yet assigned to sprints
     - Future sprint planning
   - Store sprint plan in `.jira-epic-docs/jira-items/sprint-plan.md`
   - Store backlog organization in `.jira-epic-docs/jira-items/backlog-organization.md`

10. **Generate Dependencies Map**: Create dependency relationships:

   - Map epic dependencies
   - Map story dependencies
   - Map task dependencies
   - Create dependency graph or matrix
   - Store dependencies in `.jira-epic-docs/jira-items/dependencies.md`

11. **Validate Item Counts and Coverage**: Validate generated items against limits:

   - **Count All Items**:
     - Total epics (should be 3-10, target 3-8)
     - Total stories (should be 15-50)
     - Total subtasks (items under stories)
     - Total items (epics + stories + subtasks, should be < 150)
   - **Check Per-Item Limits**:
     - Stories per epic (should be 5-10, target 5-10)
     - Subtasks per story (should be maximum 3, target 2-3)
   - **Verify Requirements Coverage**:
     - Map each requirement to epic/story/task
     - Verify 100% requirements coverage
     - Document any requirements that span multiple items
     - Store coverage mapping in `.jira-epic-docs/jira-items/coverage-mapping.md`
   - **Generate Validation Report**:
     - Item counts vs. targets
     - Warnings for exceeded limits
     - Coverage percentage
     - Consolidation suggestions (if needed)
     - Store in `.jira-epic-docs/jira-items/validation-report.md`

12. **Generate Comprehensive Summary**: Create JIRA items summary:

     - Create `.jira-epic-docs/jira-items/jira-items-summary.md`
     - Include:
       - Total number of epics
       - Total number of stories
       - Total number of subtasks (items under stories)
       - Total story points
       - Sprint breakdown
       - Backlog summary
       - Dependency summary
       - Timeline overview

13. **Present Generated Items with Validation**: Display generated JIRA items to user with validation results:

    - **Show Item Counts**:
      - Epic count (with target: 3-8, show ✅ if within range, ⚠️ if exceeded)
      - Total story count (with target: 15-50, show ✅ if within range, ⚠️ if exceeded)
      - Total subtask count (items under stories)
      - Total items (with target: < 150, show ✅ if within range, ⚠️ if exceeded)
    - **Show Validation Results**:
      - Item counts vs. targets
      - Warnings for exceeded limits (if any)
      - Coverage percentage (should be 100%)
      - Consolidation suggestions (if counts are high)
    - **Show Epic Summary**: Count, names, priorities
    - **Show Story Summary**: Count, story points, priorities, stories per epic
    - **Show Subtask Summary**: Count, estimated hours, subtasks per story
    - **Show Sprint Plan Overview**
    - **Show Backlog Organization**
    - **Show Dependency Map**
    - **Show Coverage Report**: Requirements coverage status
    - **If Limits Exceeded**: 
      - Show specific warnings (e.g., "⚠️ Warning: 12 epics generated. Consider consolidating related epics.")
      - Suggest consolidation opportunities
      - Ask user if they want to consolidate further
    - Ask user if they want to refine or adjust any items

14. **Handle User Feedback**: Process any user feedback or adjustments:

    - If user wants to consolidate further, apply consolidation strategies
    - If user wants to add items, generate additional items (but warn if counts increase)
    - If user wants to modify items, update item details
    - If user wants to remove items, remove from structure
    - If user wants to adjust estimates, update estimates
    - If user wants to reorganize sprints, update sprint plan
    - **After Changes**: Re-validate item counts and coverage
    - Re-generate summary and validation report if changes made

15. **Finalize JIRA Items**: Mark generation as complete:

    - Update `.jira-epic-docs/epic-state.md` with Phase 2 completion
    - Log generation completion in `.jira-epic-docs/audit.md`
    - Prepare for Phase 3 (Review & Confirm)

## JIRA Item Generation Principles

- **Balanced Coverage**: Generate minimum number of items needed to cover all requirements comprehensively
- **Item Count Limits**: 
  - Epics: 3-8 (target), max 10
  - Stories: 15-50 total, 5-10 per epic (target), max 10 per epic
  - Subtasks: Maximum 3 per story (strict limit) - **CRITICAL**: Use Subtask issue type (not Task) for items under Stories
  - Total items: < 150
- **Consolidation First**: Default to consolidation unless clear reason to separate
- **100% Requirements Coverage**: All requirements must be covered by at least one item
- **Agile Best Practices**: Follow agile methodologies (Scrum/Kanban) and JIRA standards
- **Complete Details**: Include all standard JIRA fields (descriptions, estimates, sprints, backlogs, dependencies)
- **User Story Format**: Use standard user story format (As a... I want... So that...)
- **Story Point Estimation**: Use Fibonacci scale for story points (1, 2, 3, 5, 8, 13)
- **Sprint Planning**: Balance sprint capacity and prioritize based on business value
- **Dependency Management**: Clearly identify and document dependencies
- **Backlog Organization**: Organize backlog by priority and dependencies
- **Validation**: Always validate item counts and coverage before finalizing

## JIRA Item Structure Details

### Epic Structure
```markdown
## Epic: [Epic Name]

**Description**: [Comprehensive epic description]
**Business Value**: [Business value statement]
**Acceptance Criteria**:
- [Criterion 1]
- [Criterion 2]
**Dependencies**: [Dependencies on other epics]
**Estimated Duration**: [Weeks/Months]
**Priority**: [High/Medium/Low]
**Labels**: [epic, feature, etc.]
```

### Story Structure
```markdown
## Story: [Story Title]

**As a** [persona] **I want** [feature] **So that** [benefit]

**Description**: [Detailed story description]
**Acceptance Criteria**:
1. [Criterion 1]
2. [Criterion 2]
**Story Points**: [1, 2, 3, 5, 8, 13]
**Priority**: [High/Medium/Low]
**Epic Link**: [Parent Epic]
**Dependencies**: [Dependencies on other stories]
**Sprint**: [Sprint Name or Backlog]
**Labels**: [story, feature, enhancement, etc.]
```

### Subtask Structure (for items under Stories)
```markdown
## Subtask: [Subtask Title]

**Description**: [Detailed subtask description]
**Acceptance Criteria**:
- [Criterion 1]
- [Criterion 2]
**Story Link**: [Parent Story] (will be set via parent field in JIRA)
**Estimated Duration**: [Hours]
**Priority**: [High/Medium/Low]
**Dependencies**: [Dependencies on other subtasks]
**Assignee**: [Suggested assignee]
**Labels**: [subtask, development, testing, etc.]
```

**CRITICAL**: In JIRA, use the "Subtask" issue type (not "Task") for items that belong to Stories. Tasks are top-level issue types and cannot be children of Stories. Subtasks can be linked to Stories via the parent field.
