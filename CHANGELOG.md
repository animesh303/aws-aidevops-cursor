# Changelog

All notable changes to this project are documented here.

## [Unreleased]

### Added

- **JIRA Epic Generation skill**
  - Item consolidation guide for structuring epics, stories, and tasks.
  - Updated phase references (Phase 2: generate epics/stories, Phase 4: update JIRA).
- **Presentation Generation skill**
  - Scripts and OOXML support moved into `.cursor/skills/presentation-generation/` for reuse.
- **Meeting transcripts**
  - `docs/meetings/transcripts/02.txt` added.

### Changed

- **MCP configuration** (`.cursor/mcp.json`)
  - Updated for current MCP server usage (AWS, Snyk, Atlassian, etc.).
- **JIRA Epic Generation skill** (`.cursor/skills/jira-epic-generation/`)
  - SKILL.md and phase references refined for clarity and consistency.
- **Docs cleanup**
  - Legacy presentation content (Bedrock training, exercise deck, slide HTML) removed from `docs/presentations/` and `exercise-presentation/`; presentation generation is now skill-based.

### Removed

- In-repo slide decks and slide HTML under `docs/presentations/workspace/` and `exercise-presentation/` (replaced by presentation-generation skill).

---

## Previous work

- Cursor rules for JIRA task workflow, generate-code workflow, review, testing, security, docs, and CI/CD.
- Skills: JIRA epic generation from transcripts, presentation generation (html2pptx, scripts).
