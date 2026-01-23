# JIRA Item Consolidation and Limits Guide

**CRITICAL**: This guide MUST be followed during Phase 2 (Generate JIRA Items) to ensure manageable item counts while maintaining comprehensive coverage.

## Core Principle

**Generate the minimum number of JIRA items necessary to cover all requirements comprehensively, while maintaining clarity and manageability.**

## Item Count Guidelines

### Epic Limits
- **Target Range**: 3-8 epics per transcript
- **Maximum**: 10 epics (requires user justification if exceeded)
- **Minimum**: 2 epics (if transcript is very small)
- **Ideal**: 5-6 epics for most transcripts

### Story Limits
- **Target Range**: 5-10 stories per epic
- **Maximum**: 10 stories per epic (requires user justification if exceeded)
- **Total Stories**: 15-50 stories per transcript
- **Ideal**: 7-8 stories per epic

### Task Limits
- **Maximum**: 3 tasks per story (strict limit)
- **Target**: 2-3 tasks per story
- **Ideal**: 3 tasks per story

### Subtask Limits
- **Create Only When**: Task is > 8 hours and needs breakdown
- **Maximum**: 5 subtasks per task
- **Avoid**: Creating subtasks for tasks < 4 hours
- **Ideal**: 2-3 subtasks for complex tasks

## Consolidation Strategies

### 1. Epic Consolidation Rules

**Consolidate epics when they:**
- Share the same business domain (e.g., "User Management" instead of separate "Authentication", "Registration", "Profile")
- Serve the same user personas
- Use the same technical stack or infrastructure
- Are part of the same user journey or workflow
- Have overlapping timelines and dependencies

**Example Consolidation:**
```
❌ Before:
- Epic: User Authentication
- Epic: User Registration  
- Epic: Password Reset
- Epic: Profile Management

✅ After:
- Epic: User Management (includes authentication, registration, password reset, profile)
```

**Do NOT consolidate when:**
- Epics serve different business goals
- Epics have different user personas
- Epics are independent and can be delivered separately
- Epics have significantly different timelines

### 2. Story Consolidation Rules

**Consolidate stories when they:**
- Share the same user persona and primary goal
- Are sequential steps in the same workflow that must be completed together
- Share similar acceptance criteria
- Have the same priority and timeline
- Can be delivered as a single unit of work

**Example Consolidation:**
```
❌ Before:
- Story: As a user, I want to enter my email address
- Story: As a user, I want to enter my password
- Story: As a user, I want to click the login button
- Story: As a user, I want to see my dashboard after login

✅ After:
- Story: As a user, I want to log in with my credentials so that I can access my dashboard
  (includes email entry, password entry, login action, dashboard display)
```

**Do NOT consolidate when:**
- Stories serve different user personas
- Stories are independent features
- Stories have different priorities
- Stories are part of different workflows

### 3. Task Consolidation Rules

**Consolidate tasks when they:**
- Are sequential implementation steps for the same feature
- Modify or work with the same component or module
- Can be completed in the same development session
- Have minimal dependencies between them
- Share the same technical approach

**Example Consolidation:**
```
❌ Before:
- Task: Create login API endpoint
- Task: Create password validation logic
- Task: Create session management
- Task: Create authentication middleware

✅ After:
- Task: Implement authentication API with password validation, session management, and middleware
```

**Do NOT consolidate when:**
- Tasks require different technical skills
- Tasks are for different components
- Tasks have significant dependencies
- Tasks are for different team members

### 4. Subtask Creation Rules

**Create subtasks ONLY when:**
- Task is > 8 hours and needs breakdown for tracking
- Task has distinct, separable components
- Different team members will work on different parts
- Subtasks help with progress tracking

**Do NOT create subtasks when:**
- Task is < 4 hours (too granular)
- Task is a single cohesive unit of work
- Subtasks would be < 1 hour each (too small)
- Task is straightforward and doesn't need breakdown

## Pre-Generation Validation

### Step 1: Estimate Item Counts

Before generating items, estimate:
1. **Epic Count**: Count major feature areas (should be 3-8)
2. **Story Count**: Count user stories (should be 15-50 total)
3. **Task Count**: Estimate tasks per story (should be maximum 3 per story)

### Step 2: Apply Consolidation

If estimated counts exceed targets:
1. **Epic Consolidation**: Group related features into single epics
2. **Story Consolidation**: Combine related user stories
3. **Task Consolidation**: Merge sequential or related tasks

### Step 3: Verify Coverage

After consolidation, verify:
- ✅ All business requirements covered by at least one epic
- ✅ All functional requirements covered by at least one story
- ✅ All technical requirements covered by at least one task
- ✅ No requirement is orphaned or lost

## Post-Generation Validation

### Validation Checklist

After generating items, check:

- [ ] Epic count is 3-10 (flag if > 10)
- [ ] Total story count is 15-50 (flag if > 50)
- [ ] Stories per epic is 5-10 (flag if any epic has > 10)
- [ ] Tasks per story is maximum 3 (flag if any story has > 3)
- [ ] Total items (epics + stories + tasks + subtasks) is < 150 (flag if > 150)
- [ ] All requirements are covered (coverage check)

### User Notification Rules

**When to Show Warning:**
- Epic count > 10: "⚠️ Warning: {N} epics generated. Consider consolidating related epics."
- Total stories > 50: "⚠️ Warning: {N} stories generated. Consider consolidating related stories."
- Any epic with > 10 stories: "⚠️ Warning: Epic '{Epic Name}' has {N} stories. Consider splitting into multiple epics."
- Any story with > 3 tasks: "⚠️ Warning: Story '{Story Name}' has {N} tasks. Maximum is 3 tasks per story. Consider consolidating tasks or splitting the story."
- Total items > 150: "⚠️ Warning: {N} total items generated. Consider further consolidation."

**When to Show Success:**
- Epic count is 3-8: "✅ Epic count ({N}) is within recommended range."
- Total stories is 15-50: "✅ Story count ({N}) is within recommended range."
- All counts within limits: "✅ All item counts are within recommended ranges."

## Coverage Verification

### Requirements-to-Items Mapping

Create a mapping document that shows:
- Each requirement → Epic/Story/Task reference
- Verify no requirement is orphaned
- Document requirements that span multiple items

### Coverage Report

Generate a coverage report showing:
- Total requirements extracted: {N}
- Requirements covered by epics: {N}
- Requirements covered by stories: {N}
- Requirements covered by tasks: {N}
- Coverage percentage: {X}%

**Target**: 100% coverage (all requirements must be covered)

## Consolidation Decision Tree

### Epic Consolidation Decision

```
For each potential epic:
1. Does it share business domain with another epic? → YES: Consider consolidation
2. Does it serve the same user persona? → YES: Consider consolidation
3. Is it part of the same workflow? → YES: Consider consolidation
4. Can they be delivered together? → YES: Consolidate
5. Are they independent features? → YES: Keep separate
```

### Story Consolidation Decision

```
For each potential story:
1. Does it share user persona with another story? → YES: Consider consolidation
2. Is it a sequential step in same workflow? → YES: Consider consolidation
3. Can they be delivered together? → YES: Consolidate
4. Are they independent features? → YES: Keep separate
5. Do they have different priorities? → YES: Keep separate
```

### Task Consolidation Decision

```
For each potential task:
1. Is it sequential with another task? → YES: Consider consolidation
2. Does it modify the same component? → YES: Consider consolidation
3. Can it be done in same dev session? → YES: Consolidate
4. Does it require different skills? → YES: Keep separate
5. Is it for different components? → YES: Keep separate
```

## Best Practices

### 1. Start with Consolidation Mindset

- **Default to consolidation** unless there's a clear reason to separate
- Group related items together
- Prefer fewer, broader items over many narrow items

### 2. Maintain Business Focus

- Group by business value, not technical implementation
- Keep user-facing features together
- Separate only when different user personas are involved

### 3. Balance Clarity and Manageability

- Don't over-consolidate to the point of confusion
- Each item should have clear scope and acceptance criteria
- If an item becomes too complex, consider splitting (but only if necessary)

### 4. Consider Sprint Capacity

- Target 20-40 story points per sprint
- Limit stories per sprint to 5-10
- Ensure sprint planning is manageable

### 5. Document Consolidation Decisions

- Note why items were consolidated
- Document any requirements that span multiple items
- Keep consolidation rationale for future reference

## Implementation Steps for Phase 2

### Step 1: Analyze Requirements

1. Count total requirements extracted
2. Identify major feature areas (potential epics)
3. Estimate epic count (should be 3-8)

### Step 2: Apply Epic Consolidation

1. Group related features into epics
2. Apply consolidation rules
3. Verify epic count is 3-8
4. If > 8, consolidate further

### Step 3: Generate Stories

1. For each epic, identify user stories
2. Apply story consolidation rules
3. Verify stories per epic is 5-10
4. If any epic has > 15 stories, consolidate further

### Step 4: Generate Tasks

1. For each story, break down into tasks
2. Apply task consolidation rules
3. Verify tasks per story is maximum 3
4. If any story has > 8 tasks, consolidate further

### Step 5: Create Subtasks (Only When Needed)

1. Identify tasks > 8 hours
2. Break down only complex tasks
3. Limit to 5 subtasks per task
4. Avoid subtasks for tasks < 4 hours

### Step 6: Validate and Report

1. Count all items (epics, stories, tasks, subtasks)
2. Check against limits
3. Verify coverage (100% requirements covered)
4. Generate validation report
5. Show warnings if limits exceeded
6. Suggest consolidation if needed

## Example: Consolidation Workflow

### Input: Transcript Analysis
- 25 requirements extracted
- 8 potential epics identified
- 30 user stories identified
- 90 potential tasks identified

### Step 1: Epic Consolidation
- 8 epics → Consolidate to 5 epics
- Group: Authentication + Registration + Profile → User Management
- Group: Dashboard + Reports → Analytics

### Step 2: Story Consolidation
- 30 stories → Consolidate to 22 stories
- Group related login stories into single story
- Group related dashboard stories

### Step 3: Task Consolidation
- 90 tasks → Consolidate to 66 tasks
- Group sequential API tasks
- Group related UI tasks

### Step 4: Validation
- ✅ 5 epics (within 3-8 range)
- ✅ 22 stories (within 15-50 range)
- ✅ 66 tasks (reasonable)
- ✅ 100% requirements covered

### Output: Manageable JIRA Structure
- 5 epics
- 22 stories
- 66 tasks
- 0 subtasks (no tasks > 8 hours)
- **Total: 93 items** (manageable)

## Critical Rules Summary

1. **MUST**: Target 3-8 epics per transcript
2. **MUST**: Target 5-10 stories per epic
3. **MUST**: Target maximum 3 tasks per story
4. **MUST**: Only create subtasks for tasks > 8 hours
5. **MUST**: Verify 100% requirements coverage after consolidation
6. **MUST**: Show warnings when limits are exceeded
7. **MUST**: Suggest consolidation when counts are high
8. **MUST**: Document consolidation decisions

## Questions to Ask During Consolidation

1. **For Epics**: "Can these features be delivered together as one epic?"
2. **For Stories**: "Are these stories part of the same user workflow?"
3. **For Tasks**: "Can these tasks be completed in the same development session?"
4. **For Subtasks**: "Is this task complex enough (> 8 hours) to need subtasks?"

If the answer is YES, consolidate. If NO, keep separate.
