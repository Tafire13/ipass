# IPASS shared project context

Use this as the common product context for every skill. The repository is the source of truth: inspect existing code and documentation before assuming an implementation detail.

## Product
IPASS is a programming-exam management system using a private LLM to assist with algorithm evaluation.

## Intended stack
- Frontend: Next.js, React, TypeScript
- Backend: Python, FastAPI
- Database: PostgreSQL
- Execution: Docker-based code runner / sandbox
- Private model serving: Ollama
- Deployment: single-server deployment is the current preference unless the repository or user explicitly changes it.

## Roles
- `student`: take assigned exams, submit code, view own results and past exams only when enabled by the teacher.
- `teacher`: manage authorized courses, select students for exams, manage problems and exams, review results, control past-exam visibility, export grades.
- `admin`: system-level user and configuration management.

## Product rules
- MSU email addresses only.
- Problem difficulty is represented as a score.
- Show programming language and version.
- Teacher can choose whether students may view past exams.
- Teacher can select which students take an exam in a course.
- Grade export should support Excel/Sheet workflows when implemented.
- Library policy can be configured as disallowed or allowed; when allowed, only approved basic libraries are permitted.
- Do not invent exam time limits or CPU limits. Inspect current requirements and implementation.

## Submission and grading flow
1. Student submits source code and language/version.
2. Backend validates identity, exam assignment, and submission policy.
3. Backend sends source to an isolated Docker runner.
4. Runner executes test cases and returns raw stdout, stderr, exit code, and execution metadata.
5. Backend compares output using the configured exact-output policy. Spaces and newline differences may matter; never silently trim.
6. Private LLM evaluates algorithm-related criteria using only the approved context.
7. Backend validates model output and calculates final scores deterministically.
8. A problem passes only if every required testcase reaches the configured 95% threshold AND the algorithm check passes.
9. Only authorized result details are returned to the student.

## Non-negotiable engineering rules
- Backend is authoritative for authentication, authorization, grading, score calculation, and data access.
- Never expose hidden test cases, expected answers, secrets, database credentials, or private Ollama endpoints to browser code or students.
- Treat submitted code, uploads, API payloads, and LLM output as untrusted.
- Preserve existing repository conventions; prefer small, reviewable changes.
- Do not add major dependencies, perform destructive migrations, or change grading policy without explicit approval.
- Report what was actually inspected, changed, and tested. Never claim tests passed unless they were run.
