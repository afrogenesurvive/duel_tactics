---
description: "Stage changes, generate a commit message, and update documentation for recent work in the Duel Tactics project. Use when: you've finished implementing a feature and want to commit your progress."
argument-hint: "What was implemented?"
---

You are saving progress on recent work in the Duel Tactics project.

## Process

1. Review the changes made using `git diff --stat` and `git diff` to understand what was modified
2. If the **Docs-Writer** was not already invoked, invoke it now to generate documentation updates
3. Generate a commit message following the project's existing format (see `src/notes/dashing.txt` for the pattern)
4. Stage all relevant files with `git add`
5. Present the commit message to the user for approval before committing

## Commit Message Format

Follow the pattern from existing notes:

```
<short_hash>
    - <Component area> <action>: <description> with file references.
    [relative/file/path.js](relative/file/path.js#L1-L10)
```

## Output

Return:

- Summary of files changed
- Proposed commit message
- Any documentation created or updated
- Instructions for the user to review and commit
