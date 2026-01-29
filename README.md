# GenAI DevOps with Cursor

Cursor rules and skills for AWS-focused DevOps workflows: JIRA task management, code generation from requirements, review, testing, security, docs, and CI/CD. Uses MCP integrations (Atlassian, AWS, Terraform, Snyk, etc.) where applicable.

## Structure

| Path | Purpose |
|------|---------|
| `.cursor/rules/` | Workflow and phase rules the agent follows (JIRA tasks, code gen, review, testing, security, docs, CI/CD) |
| `.cursor/skills/` | Reusable skills (JIRA epic generation from transcripts, presentation generation) |
| `.cursor/mcp.json` | MCP server config (Atlassian, AWS, Snyk, etc.) |
| `docs/meetings/` | Meeting transcripts and related docs |

## Workflows

- **JIRA task management** (`.cursor/rules/jira-task-workflow.mdc`) – Fetch/select JIRA tickets, generate requirements spec, confirm and update JIRA.
- **Generate code** (`.cursor/rules/generate-code-workflow.mdc`) – Implement requirements from JIRA with phase rules under `code-phases/`.
- **Review** (`review-workflow.mdc`, `review-phases/`) – Analyze changes, review code, provide feedback, finalize.
- **Testing** (`testing-workflow.mdc`, `testing-phases/`) – Plan tests, generate/execute/validate, review and integrate.
- **Security** (`security-workflow.mdc`, `security-phases/`) – Security checks and state.
- **Docs** (`docs-workflow.mdc`, `docs-phases/`) – Documentation workflow and state.
- **CI/CD** (`cicd-github-workflow.mdc`, `cicd-phases/`) – GitHub Actions detection, workflow generation, review, commit/push.

## Skills

- **JIRA Epic Generation** (`.cursor/skills/jira-epic-generation/`) – Turn meeting transcripts into JIRA epics, stories, and tasks (Atlassian MCP).
- **Presentation Generation** (`.cursor/skills/presentation-generation/`) – Build slide decks from content (scripts, OOXML, html2pptx).

## Requirements

- [Cursor](https://cursor.com) with MCP enabled.
- MCP servers as in `.cursor/mcp.json` (e.g. Atlassian for JIRA, AWS/Terraform for infra).

## Usage

1. Open this repo in Cursor.
2. Refer to a workflow by name (e.g. “JIRA task management”, “generate code from JIRA requirements”) or use the JIRA/epic skill with “generate JIRA epics from this transcript”.
3. Follow the prompts; the agent loads rules from `.cursor/rules/` and skills from `.cursor/skills/` as needed.

## License

See repository or project-specific license files.
