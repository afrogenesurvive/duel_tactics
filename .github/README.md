# Duel Tactics — Multi-Agent System

A persistent, multi-agent development system for the **Duel Tactics** project — an isometric grid-based tactics game with a React+Canvas frontend and Express/GraphQL/MongoDB backend.

## Architecture Overview

```
                    ┌─────────────────────────────────┐
                    │         Orchestrator             │
                    │  (workflow coordination, no      │
                    │   implementation — delegates)    │
                    └─────────────────────────────────┘
                         │              │
            ┌────────────┼──────────────┼────────────┐
            ▼            ▼              ▼            │
    ┌──────────┐ ┌──────────┐ ┌──────────┐          │
    │Researcher│ │ Planner  │ │Explainer │          │
    │(read-only│ │(read-only│ │(read-only│          │
    │explore)  │ │plan)     │ │explain)  │          │
    └──────────┘ └──────────┘ └──────────┘          │
            │            │                           │
            └────────────┼───────────────┐           │
                         ▼               ▼           │
                ┌──────────────┐ ┌──────────────┐    │
                │ Implementer  │ │Code-Reviewer  │    │
                │(writes code) │ │(validates)    │    │
                └──────────────┘ └──────────────┘    │
                         │               │           │
                         └───────────────┼────┐      │
                                        ▼    ▼      │
                               ┌──────────┐ ┌──────────┐
                               │Docs-Writer│ │Security-  │
                               │(docs+commit│ │Auditor    │
                               │ messages) │ │& Perf     │
                               └──────────┘ │ Tuner     │
                                             └──────────┘
```

## Agent Directory

### Core Agents

| Agent                 | File                                | Tools                           | Invocable | Purpose                                                                                |
| --------------------- | ----------------------------------- | ------------------------------- | --------- | -------------------------------------------------------------------------------------- |
| **Orchestrator**      | `agents/orchestrator.agent.md`      | `[agent, read]`                 | ✅        | Coordinates all workflows. Delegates only — never implements.                          |
| **Researcher**        | `agents/researcher.agent.md`        | `[read, search]`                | ✅        | Read-only codebase exploration. Traces execution paths, maps architecture.             |
| **Planner**           | `agents/planner.agent.md`           | `[read, search]`                | ✅        | Creates detailed, ordered implementation plans with file manifests and risk analysis.  |
| **Explainer**         | `agents/explainer.agent.md`         | `[read, search]`                | ✅        | Explains features/systems with code references, execution flows, and design rationale. |
| **Implementer**       | `agents/implementer.agent.md`       | `[read, edit, search, execute]` | ✅        | Writes code following TDD. Must have approved plan before coding.                      |
| **Code-Reviewer**     | `agents/code-reviewer.agent.md`     | `[read, search]`                | ✅        | Validates code quality, pattern adherence, and correctness. Must approve before docs.  |
| **Security-Auditor**  | `agents/security-auditor.agent.md`  | `[read, search]`                | ✅        | Audits backend (Express/GraphQL/MongoDB) and frontend for vulnerabilities.             |
| **Performance-Tuner** | `agents/performance-tuner.agent.md` | `[read, search]`                | ✅        | Analyzes game loop, canvas rendering, AI evaluation for bottlenecks.                   |
| **Docs-Writer**       | `agents/docs-writer.agent.md`       | `[read, edit, search]`          | ✅        | Updates README, creates design notes, generates commit messages.                       |

## Workflows

### 1. Plan-First (for design & architecture)

**Trigger**: Say `plan: <feature description>` or use the `/create-plan` prompt

```
User says "plan: add a new weapon type"
  → Researcher explores codebase (weapon system, item data, combat functions)
  → Planner produces detailed implementation plan
  🔴 HARD STOP → User reviews and approves plan
  ✅ Plan ready for implementation
```

### 2. Full Lifecycle (for complete feature delivery)

**Trigger**: Say `implement: <feature description>` or use the `/implement-feature` prompt

```
User says "implement: add dodge roll mechanic"
  → Researcher explores codebase (existing dodge, movement, animation systems)
  → Planner produces implementation plan
  🔴 HARD STOP → User approves plan
  → Implementer writes code following TDD
  → Code-Reviewer validates implementation
  🔴 HARD STOP → User reviews (approve or request changes)
  → Docs-Writer updates documentation and generates commit message
  ✅ Feature complete
```

### 3. Explain (for understanding existing code)

**Trigger**: Say `explain: how does deflection work?` or use the `/explain-feature` prompt

```
User says "explain: how does the AI targeting work"
  → Researcher explores codebase (aiEvaluate, targeting sub-evaluators)
  🔴 HARD STOP → Present findings with code references
  ✅ User understands the system
```

### 4. Individual Agent Invocation

Each agent can be invoked directly via the VS Code agent picker:

- `/agent researcher` — Explore any part of the codebase
- `/agent security-auditor` — Run a security audit
- `/agent performance-tuner` — Profile performance
- `/agent explainer` — Get a detailed explanation of any system

## Prompts Reference

| Prompt               | File                                  | Agent        | Use Case                                  |
| -------------------- | ------------------------------------- | ------------ | ----------------------------------------- |
| `/create-plan`       | `prompts/create-plan.prompt.md`       | planner      | Design a feature before implementing      |
| `/implement-feature` | `prompts/implement-feature.prompt.md` | orchestrator | Full lifecycle for a new feature          |
| `/explain-feature`   | `prompts/explain-feature.prompt.md`   | explainer    | Understand existing code                  |
| `/save-progress`     | `prompts/save-progress.prompt.md`     | (default)    | Stage changes and generate commit message |

## Inter-Agent Rules

These rules are encoded directly into the agent instructions:

1. **Implementer** cannot write code if the **Planner** is still creating the plan — checks for plan approval before any code changes
2. **Code-Reviewer** must approve all changes before **Docs-Writer** can update documentation — checks for `APPROVED` verdict

## Approval Gates

Every phase transition in every workflow requires a **HARD STOP**:

- The agent presents results to the user
- The user explicitly approves before the next phase begins
- These are enforced by instructions in every agent file, not by code

## Monitoring & Observability

### Method 1: VS Code Agent Tracing (Built-in, Real-time)

Toggle built-in Agent Tracing (also called AgentLens):

1. Open VS Code Settings (`Cmd+,`)
2. Search for `github.copilot.chat.agent.tracing`
3. Set to `true`

Or use Command Palette (`Cmd+Shift+P`) → **"Developer: Agent Tracing"**

This shows a live feed of:

- Agent invocations and completions
- Tool calls with arguments
- Reasoning steps
- Timing information

### Method 2: Hook-Based Logging (Persistent)

The orchestrator and hook files log agent activity to disk:

| Log File                       | Contents                                        |
| ------------------------------ | ----------------------------------------------- |
| `.github/logs/agent-trace.log` | Subagent start/stop with timestamps and results |
| `.github/logs/tool-trace.log`  | Tool calls with agent name and success status   |

View in real-time:

```bash
tail -f .github/logs/agent-trace.log
tail -f .github/logs/tool-trace.log
```

### Method 3: Debug Logs (Complete History)

Full session logs are stored at:

```
~/Library/Application Support/Code/User/workspaceStorage/<hash>/GitHub.copilot-chat/debug-logs/
```

These JSONL files contain every interaction, tool call, and agent response.

## Memory Integration

The system integrates with VS Code Copilot's native memory:

- **Repository Memory**: Agent files (`.agent.md`) serve as persistent, version-controlled configuration for agent roles
- **Project Instructions**: `.github/copilot-instructions.md` provides project-wide standards that apply to all agents
- **Session Context**: Agent invocations preserve context across workflow phases
- **Design Notes**: Store findings in `frontend_canvas_vite/src/notes/` for cross-session memory

## Getting Started

### 1. Enable Agent Tracing (optional but recommended)

```json
"github.copilot.chat.agent.tracing": true
```

### 2. Verify the Logs Directory

```bash
ls .github/logs/
```

If empty, touch the log files:

```bash
touch .github/logs/agent-trace.log .github/logs/tool-trace.log
```

### 3. Try a Workflow

```chat
/create-plan add a retreat mechanic for AI players
```

or

```chat
explain: how does the deflection system work?
```

### 4. Check the Logs

```bash
cat .github/logs/agent-trace.log
```

## File Structure

```
.github/
├── agents/
│   ├── orchestrator.agent.md
│   ├── planner.agent.md
│   ├── researcher.agent.md
│   ├── explainer.agent.md
│   ├── implementer.agent.md
│   ├── code-reviewer.agent.md
│   ├── security-auditor.agent.md
│   ├── docs-writer.agent.md
│   └── performance-tuner.agent.md
├── hooks/
│   ├── subagent-trace.json
│   └── tool-use-audit.json
├── logs/
│   ├── agent-trace.log
│   └── tool-trace.log
├── prompts/
│   ├── create-plan.prompt.md
│   ├── implement-feature.prompt.md
│   ├── explain-feature.prompt.md
│   └── save-progress.prompt.md
├── copilot-instructions.md
└── README.md
```

## Extensions for Monitoring

| Name                         | Purpose                                | Setup                    |
| ---------------------------- | -------------------------------------- | ------------------------ |
| **Agent Tracing** (built-in) | Real-time agent flow visualization     | VS Code setting toggle   |
| **Log File Highlighter**     | View `.log` files with syntax coloring | Install from marketplace |
| **GitLens**                  | Track who changed agent files and when | Install from marketplace |
