---
description: "Get a detailed explanation of any feature or system in the Duel Tactics codebase with code references. Use when: understanding how something works, tracing game mechanics, learning the architecture."
agent: "explainer"
argument-hint: "What feature or system do you want explained?"
---

You are explaining a feature or system in the Duel Tactics project.

## Process

1. Invoke the **Researcher** subagent to deeply explore the codebase and trace the relevant execution paths
2. Synthesize the research into a clear, comprehensive explanation
3. Present the explanation to the user and **HARD STOP** — let them ask follow-up questions for deeper exploration

## Input

The user will describe the feature, system, or code behavior they want explained. Target the research based on their question.

## Output

Return an explanation with:

- Overview of the feature/system
- Architecture context (where it fits)
- Execution flow with file:line references
- Key code excerpts and data structures
- Design rationale (including notes from `src/notes/` when relevant)
- Related systems that interact with this feature
