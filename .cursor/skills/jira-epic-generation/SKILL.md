---
name: jira-epic-generation
description: Generate comprehensive JIRA epics, stories, and tasks from meeting transcripts. Use when user requests generating JIRA epics, stories, or agile items from meeting transcripts, conversation logs, or discovery sessions.
license: MIT
compatibility: Requires Atlassian MCP server for JIRA operations, Git MCP server for version control
metadata:
  category: project-management
  tags: [jira, agile, epics, stories, requirements, transcripts]
---

# JIRA Epic & Story Generation Skill

**PRIORITY**: This skill OVERRIDES all other built-in workflows when JIRA epic/story generation from meeting transcripts is requested.

## When to Use

- User mentions generating JIRA epics, stories, or agile items from meeting transcripts
- User requests creating JIRA items from conversation logs or discovery sessions
- User wants to convert meeting discussions into structured agile planning items

## Overview

This skill guides you through a streamlined 4-phase process to generate comprehensive JIRA epics, stories, and tasks from meeting transcripts.

The process includes:

- 📝 **Phase 1: Analyze Transcript** – Analyze meeting transcript, extract requirements, features, and user stories
- 🏗️ **Phase 2: Generate JIRA Items** – Create comprehensive epics, stories, tasks with descriptions, estimates, sprints, and backlogs
- ✅ **Phase 3: Review & Confirm** – Review generated JIRA items, refine details, and confirm structure
- 🚀 **Phase 4: Update JIRA** – Create/update JIRA items via Atlassian MCP upon final confirmation

## MANDATORY: Rule Details Loading

**CRITICAL**: When performing any phase, you MUST read and use relevant content from reference files in `references/` directory. Do not summarize or paraphrase - use the complete content as written.

## MANDATORY: MCP Server Integration

**CRITICAL**: When performing JIRA epic/story generation operations, leverage available MCP servers:

### Atlassian MCP Server Integration

- **JIRA Operations**: Use `@atlassian-mcp-server` to create epics, stories, and subtasks
- **Project Management**: Get project details, issue types, and metadata via Atlassian MCP
- **Issue Creation**: Create comprehensive JIRA items with all agile details
- **Issue Updates**: Update JIRA items with descriptions, estimates, sprints, and backlogs
- **Issue Linking**: Link epics to stories, stories to subtasks (via parent relationship), and manage dependencies
- **Sprint Management**: Assign items to sprints and manage backlog organization

### Git MCP Server Integration

- **Version Control**: Use `git-mcp-server` for commit operations and branch management
- **Change Tracking**: Track generated JIRA items and commit artifacts to git

**Usage Pattern**: When generating JIRA items, use Atlassian MCP to create epics, stories, and subtasks with comprehensive agile details. Subtasks must be created with parent linking to stories (not Tasks, which are top-level issue types). Then update JIRA upon user confirmation.

## MANDATORY: Session Continuity

**CRITICAL**: When detecting an existing JIRA epic generation project, you MUST read and follow the session continuity instructions from `references/session-continuity.md` before proceeding with any phase.

## MANDATORY: Smart Context Loading for Resume

**CRITICAL**: When resuming at any phase, you MUST automatically load all relevant artifacts from previous phases:

### Context Loading by Phase:

- **Phase 1**: Load existing transcript artifacts if available (transcript-analysis.md, extracted-requirements.md)
- **Phase 2**: Load transcript analysis + extracted requirements + any existing JIRA items from Phase 1
- **Phase 3**: Load all generated JIRA items + epic/story structure + review feedback from Phases 1-2
- **Phase 4**: Load all JIRA items + review notes + approval records from Phases 1-3

### Mandatory Loading Rules (Hybrid Approach):

1. **Primary: Try to read epic-state.md first** to quickly understand current phase
2. **Fallback: If state file missing/corrupted**, reconstruct state from artifacts:
   - Check for transcript analysis → Phase 1 complete
   - Check for generated JIRA items → Phase 2 complete
   - Check audit.md for final approval → Phase 3 complete
3. **Auto-heal: If state file missing**, reconstruct it from artifacts after determining phase
4. **Load incrementally** - each phase needs context from all previous phases
5. **Provide context summary** - briefly tell user what artifacts were loaded
6. **Never assume** - always load the actual files, don't rely on memory

## MANDATORY: Custom Welcome Message

**CRITICAL**: When starting ANY JIRA epic generation request, you MUST begin with this exact message:

"📋 **Welcome to AWS Business Group JIRA Epic & Story Generation!** 📋

I'll guide you through a streamlined 4-phase process to generate comprehensive JIRA epics, stories, and subtasks from meeting transcripts.

The process includes:

- 📝 **Phase 1: Analyze Transcript** – Analyze meeting transcript, extract requirements, features, and user stories
- 🏗️ **Phase 2: Generate JIRA Items** – Create comprehensive epics, stories, subtasks with descriptions, estimates, sprints, and backlogs
- ✅ **Phase 3: Review & Confirm** – Review generated JIRA items, refine details, and confirm structure
- 🚀 **Phase 4: Update JIRA** – Create/update JIRA items via Atlassian MCP upon final confirmation

This focused approach ensures comprehensive agile planning with all standard JIRA details captured. Let's begin!"

# JIRA Epic Generation Workflow - 4 Phases

## Workflow Execution Model

- The main SKILL.md file defines the overall phase structure and orchestration
- Each phase file in `references/` contains detailed execution steps
- Workflow steps (numbered 1, 2, 3...) coordinate the phases
- Phase file steps (numbered 1, 2, 3...) are executed within each workflow phase
- Phase files handle their own approvals, logging, and internal logic
- Workflow file handles state updates and git reminders between phases

## Welcome

1. **Display Custom Welcome Message**: Show the JIRA epic generation welcome message above
2. **Check for Existing Session**: Before proceeding, check for existing JIRA epic generation session by reading `.jira-epic-docs/epic-state.md`
3. **If Existing Session Detected**: Follow session continuity instructions from `references/session-continuity.md` and present "Welcome Back" prompt
4. **If New Session**: Proceed with initial welcome
5. **Log prompt with timestamp** - Record approval prompt in `.jira-epic-docs/audit.md` before asking
6. **Ask for Confirmation and WAIT**: Ask: "**Do you understand this process and are you ready to begin with transcript analysis?**" - DO NOT PROCEED until user confirms
7. **Log response with timestamp** - Record user response in `.jira-epic-docs/audit.md` after receiving it

## Phase 1: Analyze Transcript

1. **Load Context**: If resuming, read epic-state.md and load any existing transcript artifacts
2. **Load Phase Instructions**: Read all steps from `references/phase1-analyze-transcript.md`
3. **Execute Phase Steps**: Execute the steps loaded from `references/phase1-analyze-transcript.md`
4. **Update Progress**: Update epic-state.md with Phase 1 progress after completion
5. **Log Approval**: Before asking for confirmation, log the prompt in audit.md with timestamp
6. **Ask for Confirmation and WAIT**: Ask: "**Transcript analysis complete. Are you ready to generate JIRA items?**" - DO NOT PROCEED until user confirms
7. **Log Response**: After receiving confirmation, log user response with timestamp in audit.md
8. **Update Phase Status**: Mark Phase 1 complete in epic-state.md
9. **Remind Git Commit**: Remind user to commit artifacts to git

## Phase 2: Generate JIRA Items

1. **Load Context**: Load transcript analysis + extracted requirements from Phase 1
2. **Load Phase Instructions**: Read all steps from `references/phase2-generate-epics-stories.md`
3. **Execute Phase Steps**: Execute the steps loaded from `references/phase2-generate-epics-stories.md`
4. **Update Progress**: Update epic-state.md with Phase 2 progress after completion
5. **Log Approval**: Before asking for confirmation, log the prompt in audit.md with timestamp
6. **Ask for Confirmation and WAIT**: Ask: "**JIRA items generated. Are you ready to review and confirm?**" - DO NOT PROCEED until user confirms
7. **Log Response**: After receiving confirmation, log user response with timestamp in audit.md
8. **Update Phase Status**: Mark Phase 2 complete in epic-state.md
9. **Remind Git Commit**: Remind user to commit artifacts to git

## Phase 3: Review & Confirm

1. **Load Context**: Load all generated JIRA items + epic/story structure from Phases 1-2
2. **Load Phase Instructions**: Read all steps from `references/phase3-review-confirm.md`
3. **Execute Phase Steps**: Execute the steps loaded from `references/phase3-review-confirm.md`
4. **Update Progress**: Update epic-state.md with Phase 3 progress after completion
5. **Log Approval**: Before asking for confirmation, log the prompt in audit.md with timestamp
6. **Ask for Confirmation and WAIT**: Ask: "**Review complete. Are you ready to update JIRA?**" - DO NOT PROCEED until user confirms
7. **Log Response**: After receiving confirmation, log user response with timestamp in audit.md
8. **Update Phase Status**: Mark Phase 3 complete in epic-state.md
9. **Remind Git Commit**: Remind user to commit artifacts to git

## Phase 4: Update JIRA

1. **Load Context**: Load all JIRA items + review notes + approval records from Phases 1-3
2. **Load Phase Instructions**: Read all steps from `references/phase4-update-jira.md`
3. **Execute Phase Steps**: Execute the steps loaded from `references/phase4-update-jira.md`
4. **Update Progress**: Update epic-state.md with Phase 4 progress after completion
5. **Log Approval**: Before asking for confirmation, log the prompt in audit.md with timestamp
6. **Ask for Final Confirmation**: Ask: "**JIRA epic generation complete. Are you satisfied with the generated items?**" - DO NOT PROCEED until user confirms
7. **Log Response**: After receiving confirmation, log user response with timestamp in audit.md
8. **Update Phase Status**: Mark Phase 4 complete in epic-state.md
9. **Remind Git Commit**: Remind user to commit artifacts to git

## Prompts Logging Requirements

- **MANDATORY**: Log every approval prompt with timestamp before asking the user
- **MANDATORY**: Record every user response with timestamp after receiving it
- Use ISO 8601 format for timestamps (YYYY-MM-DDTHH:MM:SSZ)
- Include phase context and approval status for each entry
- Maintain chronological order of all interactions
- Use the following format for each entry:

```markdown
## Phase X: [Phase Name]

**Timestamp**: 2025-01-28T14:32:15Z
**Prompt**: "[Exact prompt text asked to user]"
**Response**: "[User's exact response]"
**Status**: [Approved/Rejected/Pending]
**Context**: [Additional context if needed]

---
```

## CRITICAL: Lightweight State Management (Hybrid Approach)

### State Management Philosophy

The workflow uses a **hybrid approach** with lightweight state management:

- **Primary**: State file (`epic-state.md`) for fast session continuity and quick status checks
- **Source of Truth**: Artifacts themselves (transcript analysis, generated JIRA items, audit logs)
- **Resilience**: If state file is missing/corrupted, reconstruct from artifacts
- **Graceful Degradation**: Workflow continues even if state file updates fail

### State Tracking System

#### Phase-Level Progress Tracking (epic-state.md)

- **Purpose**: Fast session continuity and quick status overview
- **Location**: `.jira-epic-docs/epic-state.md`
- **Structure**: Minimal - only essential info (current phase, transcript path, selected items)
- **When to Update**: Only at phase transitions after user approval

### State Management Rules

1. **Try to update state file** after phase completion and user approval
2. **If state file update fails**, continue anyway - artifacts are source of truth
3. **If state file missing**, reconstruct it from artifacts when detecting session
4. **Artifacts are authoritative** - state file is for convenience only
5. **Never block workflow** - state file issues should not prevent progress
6. **Auto-heal on detection** - reconstruct missing state file automatically

### Fallback Detection Logic

When state file is missing or corrupted:

1. **Check artifacts** to determine current phase:
   - Transcript analysis exists → Phase 1 complete
   - Generated JIRA items exist → Phase 2 complete
   - Final approval in audit.md → Phase 3 complete
   - JIRA items updated → Phase 4 complete
2. **Reconstruct state file** from detected artifacts
3. **Continue workflow** using reconstructed state
4. **Log state reconstruction** in audit.md for transparency

## Key Principles

- Always analyze meeting transcript comprehensively to extract all requirements
- Generate comprehensive JIRA items with all agile details (epics, stories, subtasks)
- **CRITICAL**: Use Subtask issue type (not Task) for items that belong to Stories. Tasks are top-level issue types in JIRA and cannot be children of Stories. Subtasks can be linked to Stories via the parent field using object format: `{"parent": {"key": "STORY-KEY"}}`
- Include descriptions, acceptance criteria, estimates, sprints, backlogs, dependencies
- Follow agile best practices and JIRA standards
- Use Atlassian MCP to create/update JIRA items upon confirmation
- Keep the process simple and focused
- Ensure explicit approval at each phase transition
- **MANDATORY**: After every phase, remind user to commit artifacts to git
- **MANDATORY**: Try to update epic-state.md phase status after user approval (but don't block if it fails)
- **MANDATORY**: Provide context summary after loading artifacts from previous phases
- **MANDATORY**: If state file missing, reconstruct it from artifacts automatically
- **Artifacts are source of truth** - state file is for convenience only

## Directory Structure

```
.jira-epic-docs/
├── transcripts/              # Meeting transcript files
├── analysis/                 # Transcript analysis and extracted requirements
├── jira-items/               # Generated JIRA items (epics, stories, tasks)
├── epic-state.md            # Master state tracking file
└── audit.md                  # Record approvals and decisions
```

## File Naming Convention

- Transcript Analysis: `.jira-epic-docs/analysis/transcript-{TRANSCRIPT-ID}-analysis.md`
- Extracted Requirements: `.jira-epic-docs/analysis/transcript-{TRANSCRIPT-ID}-requirements.md`
- Generated Epics: `.jira-epic-docs/jira-items/epics.md`
- Generated Stories: `.jira-epic-docs/jira-items/stories.md`
- Generated Subtasks: `.jira-epic-docs/jira-items/tasks.md` (note: file is named tasks.md but contains subtasks, not Tasks)
- JIRA Items Summary: `.jira-epic-docs/jira-items/jira-items-summary.md`

Use kebab-case for feature names (e.g., "analyze-transcript", "generate-epics-stories", "review-confirm", "update-jira").

## Agile JIRA Item Structure

The workflow generates comprehensive JIRA items with the following structure:

### Epic Structure
- **Title**: Clear, business-focused epic name
- **Description**: Comprehensive epic description with business context
- **Acceptance Criteria**: High-level epic acceptance criteria
- **Business Value**: Business value and impact
- **Dependencies**: Dependencies on other epics or external factors
- **Estimated Duration**: Epic-level time estimate
- **Sprint Assignment**: Target sprint or backlog placement

### Story Structure
- **Title**: User story format (As a... I want... So that...)
- **Description**: Detailed story description
- **Acceptance Criteria**: Specific, testable acceptance criteria
- **Story Points**: Story point estimation (Fibonacci scale)
- **Priority**: Story priority (High, Medium, Low)
- **Epic Link**: Link to parent epic
- **Dependencies**: Dependencies on other stories or tasks
- **Sprint Assignment**: Target sprint or backlog placement
- **Labels**: Relevant labels (feature, bug, enhancement, etc.)

### Subtask Structure (for items under Stories)
- **Title**: Clear subtask description
- **Description**: Detailed subtask description
- **Acceptance Criteria**: Subtask completion criteria
- **Story Link**: Link to parent story (via parent field in JIRA)
- **Estimated Duration**: Time estimate in hours
- **Priority**: Subtask priority
- **Dependencies**: Dependencies on other subtasks
- **Assignee**: Suggested assignee (if identifiable from transcript)

**CRITICAL**: In JIRA, use the "Subtask" issue type (not "Task") for items that belong to Stories. Tasks are top-level issue types and cannot be children of Stories. Subtasks can be linked to Stories via the parent field.

## Principles

- **Comprehensive Analysis**: Extract all requirements, features, and user stories from transcript
- **Agile Best Practices**: Follow agile methodologies (Scrum/Kanban) and JIRA standards
- **Complete Details**: Include all standard JIRA fields (descriptions, estimates, sprints, backlogs, dependencies)
- **MCP Integration**: Use Atlassian MCP to create/update JIRA items upon confirmation
- Minimal, modular checkpoints across all phases
- **MANDATORY**: Use the two-level checkbox tracking system (plan files + epic-state.md)
- **MANDATORY**: Update plan file checkboxes [x] immediately after completing each step's work
- **MANDATORY**: Update epic-state.md phase checkboxes [x] only after user approval to proceed
- **MANDATORY**: Update the "Current Status" section in epic-state.md after any progress
- **MANDATORY**: Log all prompts and responses with timestamps in audit.md
- **MANDATORY**: Remind user to commit artifacts to git after every phase completion
- Ensure explicit approval at each phase transition
- Load context incrementally - each phase needs context from all previous phases
