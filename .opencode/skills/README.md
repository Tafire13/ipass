# IPASS Professional OpenCode Skills Pack

This pack contains 24 project-specific OpenCode skills plus shared IPASS context.

## Install
Copy the entire `.opencode` folder into the root of your IPASS repository so the structure is:

```text
IPASS/
└── .opencode/
    └── skills/
        ├── frontend-developer/SKILL.md
        ├── backend-developer/SKILL.md
        └── ...
```

In this archive, the `skills/` directory contains the skill folders and `IPASS-CONTEXT.md` is shared project context. Copy `IPASS-CONTEXT.md` into `.opencode/` alongside `skills/` so each skill can read it using `../IPASS-CONTEXT.md`.

Restart/reopen OpenCode after installation. OpenCode discovers project skills from `.opencode/skills/<skill-id>/SKILL.md`.

## Skills (24)
- `frontend-developer` — Build IPASS user interfaces with Next.js, React, TypeScript, responsive design, accessibility, and FastAPI integration.
- `backend-developer` — Implement IPASS backend services and REST APIs using Python, FastAPI, PostgreSQL, validation, and authorization.
- `fullstack-developer` — Deliver end-to-end IPASS features across Next.js, FastAPI, PostgreSQL, Docker runner, and private Ollama.
- `ui-ux-designer` — Design clear, accessible, consistent examination workflows and visual interfaces for IPASS.
- `api-engineer` — Design, document, and maintain stable FastAPI REST contracts consumed by the IPASS Next.js frontend.
- `database-engineer` — Design and optimize PostgreSQL schema, migrations, indexes, constraints, and queries for IPASS.
- `software-architect` — Review and evolve the IPASS architecture across frontend, backend, database, code execution, and private AI.
- `docker-engineer` — Build and maintain Docker images, Compose configuration, networking, volumes, and deployment for IPASS.
- `sandbox-security-engineer` — Threat-model and harden the IPASS untrusted-code execution sandbox.
- `code-runner-engineer` — Implement and debug compilation, execution, testcase orchestration, and output capture for IPASS.
- `llm-engineer` — Integrate private LLM evaluation into IPASS with robust prompts, structured outputs, validation, and failure handling.
- `ollama-engineer` — Operate and integrate Ollama for IPASS private LLM inference, model lifecycle, API access, and resource planning.
- `ai-grading-engineer` — Design and validate IPASS testcase scoring and LLM-assisted algorithm evaluation.
- `qa-engineer` — Plan and coordinate IPASS quality assurance, acceptance criteria, regression coverage, and release readiness.
- `software-tester` — Create and execute unit, integration, API, and end-to-end tests for IPASS.
- `security-engineer` — Review IPASS application security, authentication, authorization, data exposure, and OWASP risks.
- `code-reviewer` — Review IPASS code changes for correctness, security, maintainability, regressions, and project conventions.
- `performance-engineer` — Measure and improve IPASS frontend, FastAPI, PostgreSQL, Docker runner, and Ollama performance.
- `debugging-specialist` — Diagnose and fix IPASS bugs systematically across frontend, backend, database, Docker, and Ollama.
- `devops-engineer` — Build CI/CD, deployment automation, environment configuration, backups, and monitoring for IPASS.
- `system-administrator` — Manage the IPASS host server, Linux/Windows services, networking, storage, GPU resources, and operational health.
- `technical-writer` — Write and maintain accurate IPASS technical documentation, API docs, setup guides, user manuals, and architecture notes.
- `project-planner` — Break IPASS requirements into milestones, tasks, dependencies, acceptance criteria, and manageable implementation plans.
- `git-workflow` — Manage safe Git workflows, branches, commits, diffs, and release hygiene for IPASS.

## Usage
Mention a skill explicitly when you want to load it, for example:

```text
@fullstack-developer Build the teacher exam assignment workflow.
@database-engineer Review the schema for exam submissions.
@sandbox-security-engineer Audit the Docker runner isolation.
@ai-grading-engineer Verify the 95% per-testcase pass rule.
```

You can also describe the task normally; OpenCode can advertise and load relevant skills when appropriate.

## Notes
- Skills are reusable instructions, not executable plugins or autonomous agents.
- They do not install packages, configure services, or modify code by themselves.
- The repository's actual implementation and approved requirements take precedence over assumptions in the skills.
- Review all changes and run tests before using them in a real exam environment.

Official documentation: https://opencode.ai/docs/skills/
