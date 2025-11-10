# JIRA Task Management Workflow Process Flow Diagram

## Mermaid Flowchart

```mermaid
flowchart TD
    Start([User Requests JIRA Task Management]) --> Welcome["Display Welcome Message"]

    Welcome --> CheckSession{"Existing Session?"}

    CheckSession -->|Yes| Resume["Resume from Previous Phase"]
    CheckSession -->|No| Init["Initialize New Session"]

    Resume --> ConfirmStart{"Ready to Begin?"}
    Init --> ConfirmStart

    ConfirmStart -->|No| WaitStart[Wait]
    WaitStart --> ConfirmStart
    ConfirmStart -->|Yes| Phase1["Phase 1: Fetch & Select JIRA Tickets"]

    Phase1 --> Actions1["Fetch Open JIRA Tickets, Display & Select Ticket"]
    Actions1 --> Confirm1{"Ready to Generate Requirements?"}
    Confirm1 -->|No| Wait1[Wait]
    Wait1 --> Confirm1
    Confirm1 -->|Yes| Phase2["Phase 2: Generate Requirements Spec"]

    Phase2 --> Actions2["Generate Technical Requirements Document"]
    Actions2 --> Confirm2{"Ready for Final Review?"}
    Confirm2 -->|No| Wait2[Wait]
    Wait2 --> Confirm2
    Confirm2 -->|Yes| Phase3["Phase 3: Final Confirmation & JIRA Update"]

    Phase3 --> Actions3["Review Requirements, Confirm Approval, Update JIRA"]
    Actions3 --> End([Complete])

    style Start fill:#e1f5ff
    style End fill:#d4edda
    style Phase1 fill:#fff3cd
    style Phase2 fill:#fff3cd
    style Phase3 fill:#fff3cd
    style CheckSession fill:#f8d7da
    style ConfirmStart fill:#d1ecf1
    style Confirm1 fill:#d1ecf1
    style Confirm2 fill:#d1ecf1
    style Actions1 fill:#f0f0f0
    style Actions2 fill:#f0f0f0
    style Actions3 fill:#f0f0f0
```

## High-Level Process Flow

### Entry & Initialization
1. **User Request** → User requests JIRA task management
2. **Welcome & Session Check** → Display welcome message and check for existing session
3. **Initial Confirmation** → User confirms ready to begin

### Phase 1: Fetch & Select JIRA Tickets
- **Actions**: Fetch open JIRA tickets, display list, allow user to select ticket
- **Checkpoint**: User confirms ready to generate requirements

### Phase 2: Generate Requirements Spec
- **Actions**: Generate comprehensive technical requirements document based on JIRA ticket
- **Checkpoint**: User confirms ready for final review

### Phase 3: Final Confirmation & JIRA Update
- **Actions**: Review requirements, confirm approval, update JIRA ticket
- **Completion**: Requirements generation and JIRA update complete

