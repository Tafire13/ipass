# IPASS database ER diagram

This diagram is a logical overview of the PostgreSQL draft in `schema.sql`.

## Users and classroom-style groups

```mermaid
erDiagram
    APP_USERS ||--o{ USER_ROLES : assigned
    ROLES ||--o{ USER_ROLES : grants
    APP_USERS ||--o{ USER_ROLES : receives

    COURSES ||--|{ COURSE_SECTIONS : contains
    COURSE_SECTIONS ||--o{ SECTION_TEACHERS : has
    APP_USERS ||--o{ SECTION_TEACHERS : teaches

    COURSE_SECTIONS ||--o{ ENROLLMENTS : includes
    APP_USERS ||--o{ ENROLLMENTS : enrolls
    APP_USERS ||--o{ AUDIT_EVENTS : acts
```

## Problems, exams, and grading

```mermaid
erDiagram
    APP_USERS ||--o{ PROBLEMS : authors
    PROBLEMS ||--|{ PROBLEM_VERSIONS : versions
    PROBLEM_VERSIONS ||--o{ PROBLEM_VERSION_LANGUAGES : supports
    PROBLEM_VERSIONS ||--o{ PROBLEM_ALLOWED_LIBRARIES : permits
    PROBLEM_VERSIONS ||--|{ TEST_CASES : defines

    APP_USERS ||--o{ EXAMS : creates
    EXAMS ||--o{ EXAM_SECTIONS : targets
    COURSE_SECTIONS ||--o{ EXAM_SECTIONS : assigned_to
    EXAMS ||--o{ EXAM_PARTICIPANTS : allows
    APP_USERS ||--o{ EXAM_PARTICIPANTS : eligible_student
    EXAMS ||--|{ EXAM_PROBLEMS : contains
    PROBLEM_VERSIONS ||--o{ EXAM_PROBLEMS : uses

    EXAM_PARTICIPANTS ||--o{ SUBMISSIONS : submits
    EXAM_PROBLEMS ||--o{ SUBMISSIONS : receives
    SUBMISSIONS ||--o{ SUBMISSION_TEST_RESULTS : produces
    TEST_CASES ||--o{ SUBMISSION_TEST_RESULTS : checks
    SUBMISSIONS ||--o| SUBMISSION_ASSESSMENTS : analyzes

    EXAM_PARTICIPANTS ||--o{ EXAM_PROBLEM_RESULTS : gets
    EXAM_PROBLEMS ||--o{ EXAM_PROBLEM_RESULTS : scores
    SUBMISSIONS ||--o| EXAM_PROBLEM_RESULTS : selected_attempt
```

## Notes

- `exam_participants` is the final eligibility roster for a particular exam. It can be populated from one or more course sections and adjusted by the teacher.
- `exam_problems.problem_version_id` pins the exact problem version and its test cases used by that exam.
- Hidden test inputs and expected outputs are stored in `test_cases`; student-facing APIs must return only public test cases and must never expose hidden expected outputs.
- `submission_assessments` stores LLM evidence and rubric output. The backend remains responsible for validating that output and calculating final scores.
- The schema does not decide submission attempt limits, which attempt counts, or the final grade release policy. Those need product decisions before production migrations.
