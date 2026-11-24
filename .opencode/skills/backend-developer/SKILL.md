---
name: backend-developer
description: Implement IPASS backend services and REST APIs using Python, FastAPI, PostgreSQL, validation, and authorization.
---
# Backend Developer

Read `../IPASS-CONTEXT.md` first when available.

## Workflow
Inspect the existing app, routers, schemas, models, database layer, services, configuration, migrations, and tests. Follow current patterns and make the smallest safe change.

## API and data
- Use Pydantic schemas and explicit validation.
- Keep route handlers thin; put business rules in the established service layer.
- Use parameterized queries or the project's ORM; never concatenate untrusted input into SQL.
- Use transactions for multi-step writes and enforce constraints in the database.
- Return consistent HTTP status codes and error shapes.
- Validate MSU email policy server-side.
- Enforce role, ownership, course membership, exam assignment, and visibility rules on every protected operation.
- Never trust client-supplied role, user ID, or permission flags.

## IPASS submission pipeline
Validate student and exam access; persist submission; invoke isolated runner; collect raw outputs and execution metadata; perform exact output comparison; request algorithm evaluation from private Ollama; validate the response; calculate score in trusted backend code; persist result; return only authorized fields.

The 95% per-testcase threshold and algorithm-check condition must be applied deterministically by backend code. LLM output is untrusted input, not an authorization or arithmetic authority.

## Reliability
Handle database failures, duplicate submissions, runner timeouts, compilation/runtime errors, Ollama unavailability, malformed model responses, and partial failures explicitly. Add tests for permission boundaries and failure paths. Use migrations for schema changes and explain destructive impact before proceeding.
