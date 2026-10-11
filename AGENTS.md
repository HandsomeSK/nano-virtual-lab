# Default development workflow

For every coding task in this repository, first read `.agents/skills/ponytail/SKILL.md` and apply Ponytail in **full** mode automatically. This includes implementation, bug fixes, refactoring, code review, and dependency choices. The user does not need to invoke `$ponytail`.

User instructions take precedence over the skill. Honor requests to switch to `lite` or `ultra`, or to disable Ponytail with "stop ponytail", "normal mode", or an equivalent instruction for the current session.

Complete the full requested scope with the smallest clear change. Reuse existing code and platform features while preserving validation, error handling, security, accessibility, and appropriate verification.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
