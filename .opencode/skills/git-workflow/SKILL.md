---
name: git-workflow
description: Manage safe Git workflows, branches, commits, diffs, and release hygiene for IPASS.
---
# Git Workflow

Read `../IPASS-CONTEXT.md` first when available.

## Rules
- Inspect git status, current branch, and diff before changes.
- Never overwrite or discard user changes.
- Keep commits focused and use clear conventional commit messages if the repository follows that convention.
- Do not commit secrets, environment files, database dumps, student submissions, model weights, or generated artifacts unless explicitly intended.
- Review staged files before committing.
- Do not force-push, reset hard, rebase shared branches, delete branches, or rewrite history without explicit approval.
- Keep migrations and corresponding application changes coordinated.
- Summarize changed files and verification in commit/release notes.

If the worktree contains unrelated modifications, preserve them and avoid staging them.
