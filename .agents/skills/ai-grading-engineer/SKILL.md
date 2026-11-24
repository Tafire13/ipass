---
name: ai-grading-engineer
description: Design and validate IPASS testcase scoring and LLM-assisted algorithm evaluation.
---
# AI Grading Engineer

Read `../IPASS-CONTEXT.md` first when available.

## Grading contract
Keep deterministic execution grading separate from semantic/algorithm evaluation.

1. Runner returns raw testcase outputs and execution status.
2. Backend applies the configured exact-output comparison policy.
3. Algorithm evaluation receives only permitted code/problem/context data.
4. LLM returns structured rubric results with evidence.
5. Backend validates the response and calculates final score.
6. Backend persists auditable results and returns role-filtered feedback.

## Rules
- Current pass policy: every required testcase must reach at least 95%, AND algorithm check must pass.
- Do not average away a failed testcase if the policy requires all testcases to pass.
- Do not silently trim spaces, remove trailing newlines, or normalize output.
- Keep per-testcase score, algorithm score/status, and final decision as distinct fields.
- Define handling for model timeout, invalid JSON, low confidence, and contradictory evaluation; never invent a passing score.
- Build a labeled evaluation set of correct, incorrect, inefficient, edge-case, and adversarial solutions.
- Measure false accept and false reject rates.
- Protect hidden test data and expected answers from students.
- Ensure the LLM cannot alter database state or override backend policy.

Document every proposed grading-policy change and obtain approval before implementation.
