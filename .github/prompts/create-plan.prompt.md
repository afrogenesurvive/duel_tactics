---
description: "Create a detailed implementation plan for a feature in the Duel Tactics project. The Researcher explores the codebase, then the Planner produces a step-by-step plan. Use when: you need to design a new feature before coding."
agent: "planner"
argument-hint: "Describe the feature or problem you want to plan..."
---

You are creating an implementation plan for a new feature or change in the Duel Tactics project.

## Process

1. First, use the **Researcher** subagent to explore the codebase and understand the relevant systems. Tell it what specific systems to investigate.
2. Then, use the **Planner** subagent to produce a detailed, ordered implementation plan based on the research findings.
3. Present the plan to the user and **HARD STOP** — wait for their approval before any implementation begins.

## Input

The user will describe the feature, change, or problem they want to address. Use their description as the starting point for research.

## Output

Return a complete plan with:

- Summary of what will be built
- Data changes (player state, app state, constants)
- Complete file manifest with changes per file
- Numbered implementation steps with dependencies
- Risk areas and test criteria
