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

2. **Connect to JIRA and Get Project Details**: Use Atlassian MCP to get project information:

   - Use `@atlassian-mcp-server/getAccessibleAtlassianResources` to get cloud ID
   - Use `@atlassian-mcp-server/getVisibleJiraProjects` to get available projects
   - Ask user to select JIRA project if multiple projects available
   - Use `@atlassian-mcp-server/getJiraProjectIssueTypesMetadata` to get available issue types (Epic, Story, Task, Subtask)
   - Store project details in `.jira-epic-docs/jira-items/project-details.md`

3. **Generate Epic Structure**: Create comprehensive epics from analysis:

   - For each epic identified in analysis:
     - **Epic Name**: Clear, business-focused name
     - **Epic Description**: Comprehensive description with:
       - Business context and background
       - Business value and impact
       - Scope and boundaries
       - Success criteria
     - **Acceptance Criteria**: High-level epic acceptance criteria
     - **Business Value**: Business value statement
     - **Dependencies**: Dependencies on other epics or external factors
     - **Estimated Duration**: Epic-level time estimate (weeks/months)
     - **Priority**: Epic priority (High, Medium, Low)
     - **Labels**: Relevant labels (epic, feature, etc.)
   - Store epics in `.jira-epic-docs/jira-items/epics.md`

4. **Generate Story Structure**: Create comprehensive stories from analysis:

   - For each user story identified in analysis:
     - **Story Title**: User story format (As a [persona] I want [feature] So that [benefit])
     - **Story Description**: Detailed story description with:
       - User persona and context
       - Feature description
       - Business value
       - Technical considerations
     - **Acceptance Criteria**: Specific, testable acceptance criteria (numbered list)
     - **Story Points**: Story point estimation using Fibonacci scale (1, 2, 3, 5, 8, 13)
     - **Priority**: Story priority (High, Medium, Low)
     - **Epic Link**: Link to parent epic
     - **Dependencies**: Dependencies on other stories or tasks
     - **Labels**: Relevant labels (story, feature, enhancement, etc.)
     - **Sprint Assignment**: Target sprint or backlog placement
   - Store stories in `.jira-epic-docs/jira-items/stories.md`

5. **Generate Task Structure**: Create comprehensive tasks for each story:

   - For each story, break down into tasks:
     - **Task Title**: Clear task description
     - **Task Description**: Detailed task description with:
       - Task scope and objectives
       - Technical approach
       - Deliverables
     - **Acceptance Criteria**: Task completion criteria
     - **Story Link**: Link to parent story
     - **Estimated Duration**: Time estimate in hours
     - **Priority**: Task priority (High, Medium, Low)
     - **Dependencies**: Dependencies on other tasks
     - **Assignee**: Suggested assignee (if identifiable from transcript or requirements)
     - **Labels**: Relevant labels (task, development, testing, etc.)
   - Store tasks in `.jira-epic-docs/jira-items/tasks.md`

6. **Generate Subtask Structure**: Create subtasks for complex tasks:

   - For complex tasks, break down into subtasks:
     - **Subtask Title**: Subtask description
     - **Subtask Description**: Subtask details
     - **Task Link**: Link to parent task
     - **Estimated Duration**: Time estimate in hours
     - **Priority**: Subtask priority
     - **Labels**: Relevant labels (subtask, etc.)
   - Store subtasks in `.jira-epic-docs/jira-items/subtasks.md`

7. **Organize Sprint and Backlog Structure**: Plan sprint and backlog organization:

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

8. **Generate Dependencies Map**: Create dependency relationships:

   - Map epic dependencies
   - Map story dependencies
   - Map task dependencies
   - Create dependency graph or matrix
   - Store dependencies in `.jira-epic-docs/jira-items/dependencies.md`

9. **Generate Comprehensive Summary**: Create JIRA items summary:

   - Create `.jira-epic-docs/jira-items/jira-items-summary.md`
   - Include:
     - Total number of epics
     - Total number of stories
     - Total number of tasks
     - Total number of subtasks
     - Total story points
     - Sprint breakdown
     - Backlog summary
     - Dependency summary
     - Timeline overview

10. **Present Generated Items**: Display generated JIRA items to user:

    - Show epic summary (count, names, priorities)
    - Show story summary (count, story points, priorities)
    - Show task summary (count, estimated hours)
    - Show sprint plan overview
    - Show backlog organization
    - Show dependency map
    - Ask user if they want to refine or adjust any items

11. **Handle User Feedback**: Process any user feedback or adjustments:

    - If user wants to add items, generate additional items
    - If user wants to modify items, update item details
    - If user wants to remove items, remove from structure
    - If user wants to adjust estimates, update estimates
    - If user wants to reorganize sprints, update sprint plan
    - Re-generate summary if changes made

12. **Finalize JIRA Items**: Mark generation as complete:

    - Update `.jira-epic-docs/epic-state.md` with Phase 2 completion
    - Log generation completion in `.jira-epic-docs/audit.md`
    - Prepare for Phase 3 (Review & Confirm)

## JIRA Item Generation Principles

- **Comprehensive Coverage**: Generate all epics, stories, tasks, and subtasks needed
- **Agile Best Practices**: Follow agile methodologies (Scrum/Kanban) and JIRA standards
- **Complete Details**: Include all standard JIRA fields (descriptions, estimates, sprints, backlogs, dependencies)
- **User Story Format**: Use standard user story format (As a... I want... So that...)
- **Story Point Estimation**: Use Fibonacci scale for story points (1, 2, 3, 5, 8, 13)
- **Sprint Planning**: Balance sprint capacity and prioritize based on business value
- **Dependency Management**: Clearly identify and document dependencies
- **Backlog Organization**: Organize backlog by priority and dependencies

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

### Task Structure
```markdown
## Task: [Task Title]

**Description**: [Detailed task description]
**Acceptance Criteria**:
- [Criterion 1]
- [Criterion 2]
**Story Link**: [Parent Story]
**Estimated Duration**: [Hours]
**Priority**: [High/Medium/Low]
**Dependencies**: [Dependencies on other tasks]
**Assignee**: [Suggested assignee]
**Labels**: [task, development, testing, etc.]
```

### Subtask Structure
```markdown
## Subtask: [Subtask Title]

**Description**: [Subtask details]
**Task Link**: [Parent Task]
**Estimated Duration**: [Hours]
**Priority**: [High/Medium/Low]
**Labels**: [subtask, etc.]
```
