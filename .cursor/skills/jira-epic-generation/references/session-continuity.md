# JIRA Epic Generation Session Continuity

## Welcome Back Prompt Template

When a user returns to continue work on an existing JIRA epic generation project, present this prompt DIRECTLY IN CHAT:

**Welcome back! I can see you have an existing JIRA epic generation project in progress.**

Here's your current status:

- **Transcript**: [TRANSCRIPT-PATH]
- **Current Phase**: [Phase X: Phase Name]
- **Epics Generated**: [Count]
- **Stories Generated**: [Count]
- **Tasks Generated**: [Count]
- **Last Completed**: [Last completed step]
- **Next Step**: [Next step to work on]

> _Status detected from [state file | artifacts]_ (show which method was used)

**What would you like to work on today?**

A) Continue where you left off ([Next step description])
B) Review the transcript analysis
C) Review the generated JIRA items
D) Start over with a new transcript

Please select an option (A, B, C, or D):

## MANDATORY: Session Continuity Instructions (Hybrid Approach)

### Primary Path: State File Detection

1. **Try to read .jira-epic-docs/epic-state.md first** when detecting existing JIRA epic generation project
2. **If state file exists and is valid**, use it for fast status detection
3. **Parse current status** from state file to populate the welcome back prompt

### Fallback Path: Artifact-Based Detection

4. **If state file missing or corrupted**, detect phase from artifacts:
   - Check `.jira-epic-docs/analysis/transcript-{TRANSCRIPT-ID}-analysis.md` exists → Phase 1 complete
   - Check `.jira-epic-docs/jira-items/epics.md` exists → Phase 2 complete
   - Check `.jira-epic-docs/jira-items/review-summary.md` exists → Phase 3 complete
   - Check `.jira-epic-docs/jira-items/update-summary.md` exists → Phase 4 complete
   - Check `.jira-epic-docs/audit.md` for final approval → Phase 4 complete
     - **Format to look for**: Search for entries with pattern:
       - `## Phase 4:` or `## Phase 4: Update JIRA`
       - `**Status**: Approved` or `**Status**: Complete`
       - `**Context**: JIRA items updated` or `JIRA update complete`
       - Look for most recent entry with Phase 4 context
5. **Auto-heal**: If state file missing, reconstruct it from detected artifacts
6. **Log reconstruction**: If state file was reconstructed, log it in audit.md

### Mandatory Artifact Loading

7. **MANDATORY: Load Previous Phase Artifacts** - Before resuming any phase, automatically read all relevant artifacts from previous phases:
   - **Phase 1 Artifacts**: Read transcript analysis, requirements, user stories, epics, technical details, timeline
   - **Phase 2 Artifacts**: Read generated JIRA items (epics, stories, tasks, subtasks), sprint plan, backlog organization
   - **Phase 3 Artifacts**: Read review summary, validation results, confirmed JIRA items
   - **Phase 4 Artifacts**: Read update summary, created items, verification results
8. **Smart Context Loading by Phase**:
   - **Phase 1**: Load transcript file and any existing analysis
   - **Phase 2**: Load transcript analysis + extracted requirements + any existing JIRA items
   - **Phase 3**: Load all generated JIRA items + epic/story structure + review feedback
   - **Phase 4**: Load all JIRA items + review notes + approval records
9. **Adapt options** based on current phase and project status
10. **Show specific next steps** rather than generic descriptions
11. **Log the continuity prompt** in .jira-epic-docs/audit.md with timestamp
12. **Context Summary**: After loading artifacts, provide brief summary of what was loaded for user awareness
13. **Session Continuity Options**: ALWAYS present session continuity options directly in the chat session. DO NOT create separate files for user choices. Present the welcome back prompt with options A, B, C, D directly in chat and wait for user response.

### State Reconstruction Logic

When reconstructing state file from artifacts:

1. **Determine current phase** from artifact existence:
   - No analysis files → Phase 1 (not started)
   - Analysis files exist, no JIRA items → Phase 1 complete, Phase 2 (not started)
   - JIRA items exist, no review summary → Phase 2 complete, Phase 3 (in progress)
   - Review summary exists, no update summary → Phase 3 complete, Phase 4 (in progress)
   - Update summary exists or final approval in audit.md → All phases complete
2. **Extract transcript path** from analysis files or state file
3. **Extract transcript ID** from file names
4. **Extract item counts** from JIRA items files
5. **Create minimal state file** with essential info only
6. **Log reconstruction** in audit.md: "State file reconstructed from artifacts on [timestamp]"

## Session Continuity File Structure

### Required Files to Check

- `.jira-epic-docs/epic-state.md` - Master state tracking
- `.jira-epic-docs/audit.md` - Approval and decision logs
- `.jira-epic-docs/transcripts/` - Transcript files directory
- `.jira-epic-docs/analysis/` - Analysis documents directory
- `.jira-epic-docs/jira-items/` - Generated JIRA items directory

### Phase-Specific Artifact Loading

#### Phase 1 Continuity

- `.jira-epic-docs/transcripts/transcript-{TRANSCRIPT-ID}.txt`
- `.jira-epic-docs/analysis/transcript-{TRANSCRIPT-ID}-analysis.md`
- `.jira-epic-docs/analysis/transcript-{TRANSCRIPT-ID}-requirements.md`
- `.jira-epic-docs/analysis/transcript-{TRANSCRIPT-ID}-user-stories.md`
- `.jira-epic-docs/analysis/transcript-{TRANSCRIPT-ID}-epics.md`
- `.jira-epic-docs/analysis/transcript-{TRANSCRIPT-ID}-technical.md`
- `.jira-epic-docs/analysis/transcript-{TRANSCRIPT-ID}-timeline.md`

#### Phase 2 Continuity

- All Phase 1 artifacts PLUS:
- `.jira-epic-docs/jira-items/epics.md`
- `.jira-epic-docs/jira-items/stories.md`
- `.jira-epic-docs/jira-items/tasks.md`
- `.jira-epic-docs/jira-items/subtasks.md`
- `.jira-epic-docs/jira-items/sprint-plan.md`
- `.jira-epic-docs/jira-items/backlog-organization.md`
- `.jira-epic-docs/jira-items/dependencies.md`
- `.jira-epic-docs/jira-items/jira-items-summary.md`

#### Phase 3 Continuity

- All Phase 1 & 2 artifacts PLUS:
- `.jira-epic-docs/jira-items/review-summary.md`
- `.jira-epic-docs/jira-items/validation-results.md`

#### Phase 4 Continuity

- All Phase 1, 2 & 3 artifacts PLUS:
- `.jira-epic-docs/jira-items/update-summary.md`
- `.jira-epic-docs/jira-items/created-epics.md`
- `.jira-epic-docs/jira-items/created-stories.md`
- `.jira-epic-docs/jira-items/created-tasks.md`
- `.jira-epic-docs/jira-items/created-subtasks.md`
- `.jira-epic-docs/jira-items/verification-results.md`

## Context Loading Examples

### Example 1: Phase 1 Continuity

```markdown
**Context Loaded:**

- Transcript: docs/meetings/transcripts/01.txt
- Transcript analysis (requirements, user stories, epics identified)
- Technical requirements extracted
- Timeline and priorities identified
```

### Example 2: Phase 2 Continuity

```markdown
**Context Loaded:**

- Transcript analysis and extracted requirements
- Generated epics (X epics)
- Generated stories (X stories, Y story points)
- Generated tasks (X tasks)
- Sprint plan (X sprints planned)
- Backlog organization
```

### Example 3: Phase 3 Continuity

```markdown
**Context Loaded:**

- Generated JIRA items (epics, stories, tasks, subtasks)
- Review summary and validation results
- Confirmed JIRA items ready for update
```

### Example 4: Phase 4 Continuity

```markdown
**Context Loaded:**

- Confirmed JIRA items
- Update summary
- Created items in JIRA (epic keys, story keys, etc.)
- Verification results
```

## Continuity Decision Logic

### If Phase 1 Complete

- Show transcript analysis results
- Offer to proceed to Phase 2 or re-analyze transcript

### If Phase 2 Complete

- Show generated JIRA items
- Offer to proceed to Phase 3 or regenerate items

### If Phase 3 In Progress (Review & Confirm)

- Show current JIRA items
- Show any pending review feedback
- Offer to continue review or finalize

### If Phase 4 In Progress (Update JIRA)

- Show update progress
- Show created items
- Offer to continue update or verify results

### If All Phases Complete

- Show final update summary
- Show created JIRA items
- Offer to start new transcript or review completed work
