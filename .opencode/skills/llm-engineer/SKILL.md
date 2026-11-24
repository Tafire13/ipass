---
name: llm-engineer
description: Integrate private LLM evaluation into IPASS with robust prompts, structured outputs, validation, and failure handling.
---
# LLM Engineer

Read `../IPASS-CONTEXT.md` first when available.

## Principles
- The LLM is an advisory evaluator for algorithm-related criteria, not the authority for access control, exact output comparison, score arithmetic, or persistence.
- Send only the minimum approved context needed for evaluation.
- Version prompts and model configuration.
- Request a strict structured response and validate it against a schema.
- Treat all model output as untrusted, including valid-looking JSON.
- Handle timeout, refusal, malformed output, truncation, model unavailability, and inconsistent judgments.
- Do not fabricate percentages when the model omits them.
- Keep model name, endpoint, timeout, and generation parameters in environment/configuration.
- Never expose private model endpoints or credentials to the browser.

## Evaluation quality
Define rubric, scoring scale, evidence requirements, and uncertainty handling. Ask the model to cite specific code evidence rather than give unsupported conclusions. Test prompt injection inside submitted code/comments and problem statements. Keep model outputs auditable without retaining unnecessary personal data.
