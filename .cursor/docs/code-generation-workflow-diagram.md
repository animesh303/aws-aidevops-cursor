# Code Generation Workflow Process Flow Diagram

## Mermaid Flowchart

```mermaid
flowchart TD
    Start([User Requests Code Generation]) --> Welcome["Display Welcome Message"]

    Welcome --> CheckSession{"Existing Session?"}

    CheckSession -->|Yes| Resume["Resume from Previous Phase"]
    CheckSession -->|No| Init["Initialize New Session"]

    Resume --> ConfirmStart{"Ready to Begin?"}
    Init --> ConfirmStart

    ConfirmStart -->|No| WaitStart[Wait]
    WaitStart --> ConfirmStart
    ConfirmStart -->|Yes| Phase1["Phase 1: Select Requirements"]

    Phase1 --> Actions1["List Available Requirements, Select IAC Tool & Runtime"]
    Actions1 --> Confirm1{"Ready to Generate Code?"}
    Confirm1 -->|No| Wait1[Wait]
    Wait1 --> Confirm1
    Confirm1 -->|Yes| Phase2["Phase 2: Generate Code"]

    Phase2 --> Actions2["Generate IAC Code, Application Code & Tests"]
    Actions2 --> Confirm2{"Ready to Review & Refine?"}
    Confirm2 -->|No| Wait2[Wait]
    Wait2 --> Confirm2
    Confirm2 -->|Yes| Phase3["Phase 3: Review & Refine"]

    Phase3 --> Actions3["Review Code, Run Tests, Lint, Refine"]
    Actions3 --> Confirm3{"Satisfied with Final Implementation?"}
    Confirm3 -->|No| Wait3[Wait]
    Wait3 --> Confirm3
    Confirm3 -->|Yes| Phase4["Phase 4: Commit & Push"]

    Phase4 --> Actions4["Commit & Push Code Changes"]
    Actions4 --> End([Complete])

    style Start fill:#e1f5ff
    style End fill:#d4edda
    style Phase1 fill:#fff3cd
    style Phase2 fill:#fff3cd
    style Phase3 fill:#fff3cd
    style Phase4 fill:#fff3cd
    style CheckSession fill:#f8d7da
    style ConfirmStart fill:#d1ecf1
    style Confirm1 fill:#d1ecf1
    style Confirm2 fill:#d1ecf1
    style Confirm3 fill:#d1ecf1
    style Actions1 fill:#f0f0f0
    style Actions2 fill:#f0f0f0
    style Actions3 fill:#f0f0f0
    style Actions4 fill:#f0f0f0
```

## High-Level Process Flow

### Entry & Initialization
1. **User Request** → User requests code generation from JIRA requirements
2. **Welcome & Session Check** → Display welcome message and check for existing session
3. **Initial Confirmation** → User confirms ready to begin

### Phase 1: Select Requirements
- **Actions**: List available requirements documents, select requirements, choose IAC tool and runtime
- **Checkpoint**: User confirms ready to generate code

### Phase 2: Generate Code
- **Actions**: Generate Infrastructure as Code, application code, and tests
- **Checkpoint**: User confirms ready to review and refine

### Phase 3: Review & Refine
- **Actions**: Review code, run tests, perform linting, refine implementation
- **Checkpoint**: User approves final implementation

### Phase 4: Commit & Push
- **Actions**: Commit and push code changes to repository (optional)
- **Completion**: Code generation complete

