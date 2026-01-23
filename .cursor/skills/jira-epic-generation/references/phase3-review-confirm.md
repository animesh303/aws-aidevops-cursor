# Phase 3: Review & Confirm JIRA Items

**Assume the role** of a JIRA administrator and agile coach

**Universal Phase**: Works with generated JIRA items to review and confirm before updating JIRA

1. **Load Generated JIRA Items**: Read all generated JIRA items from Phase 2:

   - Read epics document
   - Read stories document
   - Read tasks document
   - Read subtasks document
   - Read sprint plan
   - Read backlog organization
   - Read dependencies map
   - Read JIRA items summary

2. **Present Summary and File Locations**: Display concise summary and direct user to review files:

   - Show summary statistics:
     - Total epics, stories, tasks, subtasks
     - Total story points
     - Number of sprints planned
     - Backlog items count
   - List all generated file locations:
     - `.jira-epic-docs/jira-items/epics.md` - All epics
     - `.jira-epic-docs/jira-items/stories.md` - All stories
     - `.jira-epic-docs/jira-items/tasks.md` - All tasks
     - `.jira-epic-docs/jira-items/subtasks.md` - All subtasks
     - `.jira-epic-docs/jira-items/sprint-plan.md` - Sprint organization
     - `.jira-epic-docs/jira-items/backlog-organization.md` - Backlog organization
     - `.jira-epic-docs/jira-items/dependencies.md` - Dependencies map
     - `.jira-epic-docs/jira-items/jira-items-summary.md` - Complete summary
   - Prompt user: "**Please review the generated JIRA items in the files listed above. You can open and review them directly. Once you've reviewed, let me know if you'd like to make any changes or if you're ready to proceed to JIRA update.**"

3. **Handle User Feedback**: Process user feedback or requested changes:

   - If user requests changes:
     - Ask user to specify what needs to be changed (items, estimates, dependencies, sprint plan, etc.)
     - Make requested changes to the appropriate files
     - Update related files if dependencies are affected
     - Re-generate summary if significant changes made
     - Confirm changes with user
   - If user confirms items are ready:
     - Proceed to validation step
   - If user wants to review more:
     - Wait for user to complete review

4. **Validate JIRA Item Structure**: Validate all JIRA items meet standards:

   - Validate epic structure (all required fields present)
   - Validate story structure (all required fields present)
   - Validate task structure (all required fields present)
   - Validate subtask structure (all required fields present)
   - Validate dependencies (no circular dependencies)
   - Validate estimates (reasonable estimates)
   - Validate sprint plan (balanced sprints)
   - Store validation results in `.jira-epic-docs/jira-items/validation-results.md`
   - If validation issues found, present them to user and ask for resolution

5. **Request Final Confirmation**: Ask for final confirmation to proceed:

   - Present final summary:
     - Final item counts
     - Validation status
     - Ready for JIRA update
   - Ask user: "**All JIRA items have been generated and validated. Are you ready to proceed with updating JIRA?**"
   - Log confirmation prompt in `.jira-epic-docs/audit.md` with timestamp

6. **Handle Final Confirmation**: Process final confirmation:

   - If user confirms, proceed to Phase 4 (Update JIRA)
   - If user wants more changes, return to step 3
   - If user wants to cancel, end workflow gracefully
   - Log user response in `.jira-epic-docs/audit.md` with timestamp

7. **Finalize Review**: Mark review as complete:

   - Update `.jira-epic-docs/epic-state.md` with Phase 3 completion
   - Log review completion in `.jira-epic-docs/audit.md`
   - Prepare for Phase 4 (Update JIRA)

## Review Principles

- **User-Driven Review**: User reviews generated files directly rather than going through each item type
- **Streamlined Process**: Minimal steps focused on user confirmation and change requests
- **Quality Assurance**: Validate items meet JIRA standards and agile best practices
- **Flexibility**: Allow user to request changes at any point during review
- **Documentation**: Document validation results and any changes made

## Validation Checklist

The validation step automatically checks:

- [ ] All epics have complete descriptions and acceptance criteria
- [ ] All stories follow user story format (As a... I want... So that...)
- [ ] All stories have story points assigned
- [ ] All tasks have estimated duration
- [ ] All dependencies are identified and documented
- [ ] Sprint plan is balanced and realistic
- [ ] Backlog is organized by priority
- [ ] No circular dependencies exist
- [ ] Estimates are reasonable
- [ ] All items are linked correctly (epics → stories → tasks → subtasks)
