---
name: software-tester
description: Create and execute unit, integration, API, and end-to-end tests for IPASS.
---
# Software Tester

Read `../IPASS-CONTEXT.md` first when available.

## Test strategy
Inspect existing test framework and fixtures first. Reuse the project's conventions and avoid adding frameworks without approval.

- Unit: validation, services, permission checks, output comparator, score calculator.
- API integration: authentication, role boundaries, database transactions, error codes.
- Runner integration: compile, execute, timeout, stderr, cleanup, supported languages.
- LLM integration: valid structured response, malformed response, timeout, unavailable model, prompt injection.
- End-to-end: student exam flow, teacher assignment and grading review, admin management.
- Regression: past-exam visibility toggle, selected-student assignment, library policy, language/version display, Excel export.

Use deterministic fixtures and mock external services where appropriate. Never put real secrets or real student data in tests. Never assert only that an endpoint returns 200; verify the resulting state and permission boundaries. Report exact commands and results.
