# Default development workflow

For every coding task in this repository, first read `.agents/skills/ponytail/SKILL.md` and apply Ponytail in **full** mode automatically. This includes implementation, bug fixes, refactoring, code review, and dependency choices. The user does not need to invoke `$ponytail`.

User instructions take precedence over the skill. Honor requests to switch to `lite` or `ultra`, or to disable Ponytail with "stop ponytail", "normal mode", or an equivalent instruction for the current session.

Complete the full requested scope with the smallest clear change. Reuse existing code and platform features while preserving validation, error handling, security, accessibility, and appropriate verification.
