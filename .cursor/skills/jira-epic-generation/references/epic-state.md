# JIRA Epic Generation State Tracking

## State File Structure

**Location**: `.jira-epic-docs/epic-state.md`

**Purpose**: Track overall workflow progress across phases for fast session continuity

## State File Template

```markdown
# JIRA Epic Generation State

## Project Information

- **Transcript Path**: [Path to meeting transcript file]
- **Transcript ID**: [Generated or extracted transcript identifier]
- **Project Start Date**: [ISO 8601 timestamp]
- **Last Updated**: [ISO 8601 timestamp]

## Phase Status

- [ ] Phase 1: Analyze Transcript
- [ ] Phase 2: Generate JIRA Items
- [ ] Phase 3: Review & Confirm
- [ ] Phase 4: Update JIRA

## Current Status

**Current Phase**: [Phase X: Phase Name]

**Status**: [In Progress / Complete / Pending]

**Last Completed Step**: [Description of last completed step]

**Next Step**: [Description of next step to work on]

## Transcript Information

- **Transcript File**: [Transcript filename]
- **Participants**: [List of participants if extracted]
- **Meeting Topic**: [Meeting topic if extracted]
- **Analysis Complete**: [Yes/No]

## Analysis Results

- **Requirements Extracted**: [Count]
- **User Stories Identified**: [Count]
- **Epics Identified**: [Count]
- **Technical Requirements**: [Count]

## Generated JIRA Items

- **Epics Generated**: [Count]
- **Stories Generated**: [Count]
- **Tasks Generated**: [Count]
- **Subtasks Generated**: [Count]
- **Total Story Points**: [Total]
- **Sprints Planned**: [Count]

## JIRA Project Information

- **Cloud ID**: [Atlassian Cloud ID]
- **Project Key**: [JIRA Project Key]
- **Project Name**: [JIRA Project Name]

## Created JIRA Items

- **Epics Created**: [List of epic keys]
- **Stories Created**: [List of story keys]
- **Tasks Created**: [List of task keys]
- **Subtasks Created**: [List of subtask keys]

## Notes

[Any additional notes or context]
```

## State Update Rules

1. **Update on Phase Start**: Update "Current Phase" and "Status" when starting a phase
2. **Update on Phase Completion**: Mark phase checkbox [x] and update "Last Completed Step" when phase completes
3. **Update on Progress**: Update "Last Completed Step" and "Next Step" after each significant step
4. **Update on Item Generation**: Update item counts when items are generated
5. **Update on JIRA Creation**: Update created items lists when items are created in JIRA
6. **Update Timestamp**: Update "Last Updated" timestamp on every state change

## State File Maintenance

- **Minimal Structure**: Keep state file minimal - only essential info for fast continuity
- **Artifacts are Source of Truth**: Detailed information is stored in artifact files
- **Auto-heal**: If state file missing, reconstruct from artifacts
- **Graceful Degradation**: Workflow continues even if state file updates fail

## State File Examples

### Example 1: Phase 1 Complete

```markdown
# JIRA Epic Generation State

## Project Information

- **Transcript Path**: docs/meetings/transcripts/01.txt
- **Transcript ID**: 01
- **Project Start Date**: 2025-01-28T10:00:00Z
- **Last Updated**: 2025-01-28T10:30:00Z

## Phase Status

- [x] Phase 1: Analyze Transcript
- [ ] Phase 2: Generate JIRA Items
- [ ] Phase 3: Review & Confirm
- [ ] Phase 4: Update JIRA

## Current Status

**Current Phase**: Phase 2: Generate JIRA Items

**Status**: Pending

**Last Completed Step**: Transcript analysis complete, requirements extracted

**Next Step**: Generate epic structure from analysis

## Transcript Information

- **Transcript File**: 01.txt
- **Participants**: Rajiv Mehta (RM), Anita Sharma (AS)
- **Meeting Topic**: Web-based Customer Experience Management Application for Energy Utility
- **Analysis Complete**: Yes

## Analysis Results

- **Requirements Extracted**: 25
- **User Stories Identified**: 15
- **Epics Identified**: 5
- **Technical Requirements**: 12
```

### Example 2: Phase 2 Complete

```markdown
## Phase Status

- [x] Phase 1: Analyze Transcript
- [x] Phase 2: Generate JIRA Items
- [ ] Phase 3: Review & Confirm
- [ ] Phase 4: Update JIRA

## Current Status

**Current Phase**: Phase 3: Review & Confirm

**Status**: Pending

**Last Completed Step**: JIRA items generated (epics, stories, tasks, subtasks)

**Next Step**: Review generated JIRA items

## Generated JIRA Items

- **Epics Generated**: 5
- **Stories Generated**: 15
- **Tasks Generated**: 45
- **Subtasks Generated**: 20
- **Total Story Points**: 89
- **Sprints Planned**: 4
```

### Example 3: Phase 4 Complete

```markdown
## Phase Status

- [x] Phase 1: Analyze Transcript
- [x] Phase 2: Generate JIRA Items
- [x] Phase 3: Review & Confirm
- [x] Phase 4: Update JIRA

## Current Status

**Current Phase**: Complete

**Status**: Complete

**Last Completed Step**: All JIRA items created and verified

**Next Step**: Workflow complete

## JIRA Project Information

- **Cloud ID**: abc123def456
- **Project Key**: PROJ
- **Project Name**: Customer Experience Platform

## Created JIRA Items

- **Epics Created**: PROJ-1, PROJ-2, PROJ-3, PROJ-4, PROJ-5
- **Stories Created**: PROJ-6 through PROJ-20
- **Tasks Created**: PROJ-21 through PROJ-65
- **Subtasks Created**: PROJ-66 through PROJ-85
```
