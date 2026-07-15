---
description: "Run the full development lifecycle for a feature in the Duel Tactics project: research → plan → implement → review → document. Each phase stops for user approval. Use when: building a complete feature from scratch."
agent: "orchestrator"
argument-hint: "Describe the feature to implement..."
---

You are running the **Full Lifecycle Workflow** for the Duel Tactics project. Follow each phase in order, stopping at every handoff for user approval.

## Workflow (must execute in order)

### Phase 1: Research

Invoke the **Researcher** agent to explore the codebase and understand the relevant systems.

### Phase 2: Plan

Invoke the **Planner** agent to produce a detailed implementation plan based on the research.

### 🔴 HARD STOP

Present the plan to the user. Wait for explicit approval before proceeding.

### Phase 3: Implement

If approved, invoke the **Implementer** agent to write the code following the plan and TDD practices.

### Phase 4: Review

Invoke the **Code-Reviewer** agent to validate the implementation.

### 🔴 HARD STOP

Present the review to the user. If changes required, return to Phase 3. If approved, proceed.

### Phase 5: Document

Invoke the **Docs-Writer** agent to update documentation and generate a commit message.

## Important Rules

- The Implementer MUST NOT start coding without an approved plan
- The Docs-Writer MUST NOT write documentation without Code-Reviewer approval
- Each agent receives context from the previous phase
- Present clear summaries at each stop

## Optional Additions

- After Phase 5, the user may also want the **Security-Auditor** or **Performance-Tuner** to analyze the changes
