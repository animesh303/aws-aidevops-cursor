# Phase 4: Update JIRA

**Assume the role** of a JIRA administrator

**Universal Phase**: Works with confirmed JIRA items to create/update JIRA via Atlassian MCP

1. **Load Confirmed JIRA Items**: Read all confirmed JIRA items from Phase 3:

   - Read epics document
   - Read stories document
   - Read tasks document
   - Read subtasks document
   - Read sprint plan
   - Read backlog organization
   - Read review summary

2. **Connect to JIRA**: Use Atlassian MCP to connect to JIRA:

   - Use `@atlassian-mcp-server/getAccessibleAtlassianResources` to get cloud ID
   - Verify project access using `@atlassian-mcp-server/getVisibleJiraProjects`
   - Get issue type metadata using `@atlassian-mcp-server/getJiraProjectIssueTypesMetadata`
   - Store connection details in `.jira-epic-docs/jira-items/jira-connection.md`

3. **Create Epics in JIRA**: Create all epics using Atlassian MCP:

   - For each epic in epics document:
     - Use `@atlassian-mcp-server/getJiraProjectIssueTypesMetadata` to get Epic issue type ID
     - Use `@atlassian-mcp-server/createJiraIssue` to create epic:
       - `cloudId`: Cloud ID from step 2
       - `projectKey`: Selected project key
       - `issueTypeName`: "Epic"
       - `summary`: Epic name
       - `description`: Epic description (markdown format)
       - `additional_fields`: Include epic-specific fields:
         - `customfield_10011` (Epic Name) or equivalent: Epic name
         - `priority`: Epic priority
         - `labels`: Epic labels
     - Store created epic key in `.jira-epic-docs/jira-items/created-epics.md`
     - Log epic creation in `.jira-epic-docs/audit.md`

4. **Create Stories in JIRA**: Create all stories using Atlassian MCP:

   - For each story in stories document:
     - Use `@atlassian-mcp-server/getJiraProjectIssueTypesMetadata` to get Story issue type ID
     - Use `@atlassian-mcp-server/createJiraIssue` to create story:
       - `cloudId`: Cloud ID from step 2
       - `projectKey`: Selected project key
       - `issueTypeName`: "Story"
       - `summary`: Story title
       - `description`: Story description (markdown format)
       - `additional_fields`: Include story-specific fields:
         - `customfield_10016` (Story Points) or equivalent: Story points
         - `priority`: Story priority
         - `labels`: Story labels
         - `parent`: Epic key (if epic link exists)
     - Store created story key in `.jira-epic-docs/jira-items/created-stories.md`
     - Link story to epic using `@atlassian-mcp-server/editJiraIssue` if needed
     - Log story creation in `.jira-epic-docs/audit.md`

5. **Create Tasks in JIRA**: Create all tasks using Atlassian MCP:

   - For each task in tasks document:
     - Use `@atlassian-mcp-server/getJiraProjectIssueTypesMetadata` to get Task issue type ID
     - Use `@atlassian-mcp-server/createJiraIssue` to create task:
       - `cloudId`: Cloud ID from step 2
       - `projectKey`: Selected project key
       - `issueTypeName`: "Task"
       - `summary`: Task title
       - `description`: Task description (markdown format)
       - `additional_fields`: Include task-specific fields:
         - `priority`: Task priority
         - `labels`: Task labels
         - `parent`: Story key (if story link exists)
         - `timeoriginalestimate`: Estimated duration in seconds
     - Store created task key in `.jira-epic-docs/jira-items/created-tasks.md`
     - Link task to story using `@atlassian-mcp-server/editJiraIssue` if needed
     - Log task creation in `.jira-epic-docs/audit.md`

6. **Create Subtasks in JIRA**: Create all subtasks using Atlassian MCP:

   - For each subtask in subtasks document:
     - Use `@atlassian-mcp-server/getJiraProjectIssueTypesMetadata` to get Subtask issue type ID
     - Use `@atlassian-mcp-server/createJiraIssue` to create subtask:
       - `cloudId`: Cloud ID from step 2
       - `projectKey`: Selected project key
       - `issueTypeName`: "Subtask"
       - `summary`: Subtask title
       - `description`: Subtask description (markdown format)
       - `additional_fields`: Include subtask-specific fields:
         - `priority`: Subtask priority
         - `labels`: Subtask labels
         - `parent`: Task key (if task link exists)
         - `timeoriginalestimate`: Estimated duration in seconds
     - Store created subtask key in `.jira-epic-docs/jira-items/created-subtasks.md`
     - Link subtask to task using `@atlassian-mcp-server/editJiraIssue` if needed
     - Log subtask creation in `.jira-epic-docs/audit.md`

7. **Create Dependencies**: Link items based on dependencies:

   - For each dependency identified:
     - Use `@atlassian-mcp-server/editJiraIssue` to add links:
       - Add "depends on" or "blocks" links between items
       - Use JIRA link types as appropriate
     - Log dependency creation in `.jira-epic-docs/audit.md`

8. **Assign to Sprints**: Assign stories to sprints (if sprint management available):

   - For each story assigned to a sprint:
     - Use `@atlassian-mcp-server/editJiraIssue` to update sprint field:
       - Update sprint field with sprint name or ID
     - Log sprint assignment in `.jira-epic-docs/audit.md`

9. **Organize Backlog**: Organize backlog priority:

   - For stories in backlog:
     - Use `@atlassian-mcp-server/editJiraIssue` to update priority:
       - Update priority field based on backlog order
     - Log backlog organization in `.jira-epic-docs/audit.md`

10. **Verify Created Items**: Verify all items were created successfully:

    - For each created item:
      - Use `@atlassian-mcp-server/getJiraIssue` to verify item exists
      - Verify item details match generated items
      - Store verification results in `.jira-epic-docs/jira-items/verification-results.md`

11. **Generate Update Summary**: Create comprehensive update summary:

    - Create `.jira-epic-docs/jira-items/update-summary.md`
    - Include:
      - Total epics created
      - Total stories created
      - Total tasks created
      - Total subtasks created
      - Dependencies created
      - Sprint assignments
      - Backlog organization
      - Any errors or warnings
      - JIRA project link

12. **Present Update Results**: Display update results to user:

    - Show total items created
    - Show created epic keys
    - Show created story keys
    - Show created task keys
    - Show created subtask keys
    - Show dependencies created
    - Show sprint assignments
    - Show backlog organization
    - Show any errors or warnings
    - Provide JIRA project link

13. **Handle Errors**: Process any errors during JIRA update:

    - If item creation fails, log error and continue with other items
    - If dependency linking fails, log error and continue
    - If sprint assignment fails, log error and continue
    - Store all errors in `.jira-epic-docs/jira-items/errors.md`
    - Present errors to user for manual resolution

14. **Finalize Update**: Mark update as complete:

    - Update `.jira-epic-docs/epic-state.md` with Phase 4 completion
    - Log update completion in `.jira-epic-docs/audit.md`
    - Mark workflow as complete

## JIRA Update Principles

- **Sequential Creation**: Create items in order (epics → stories → tasks → subtasks)
- **Error Handling**: Handle errors gracefully and continue with other items
- **Verification**: Verify all items were created successfully
- **Documentation**: Document all created items and any errors
- **User Feedback**: Provide clear feedback on update results

## JIRA Update Checklist

- [ ] All epics created successfully
- [ ] All stories created successfully
- [ ] All tasks created successfully
- [ ] All subtasks created successfully
- [ ] All dependencies linked correctly
- [ ] All sprint assignments completed
- [ ] Backlog organized correctly
- [ ] All items verified in JIRA
- [ ] Update summary generated
- [ ] Errors documented and reported

## Error Handling

If any item creation fails:

1. Log error with details (item name, error message)
2. Continue with other items
3. Store error in errors document
4. Present errors to user at end
5. Provide manual resolution steps if needed
