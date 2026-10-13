# Default development workflow

For every coding task in this repository, first read `.agents/skills/ponytail/SKILL.md` and apply Ponytail in **full** mode automatically. This includes implementation, bug fixes, refactoring, code review, and dependency choices. The user does not need to invoke `$ponytail`.

User instructions take precedence over the skill. Honor requests to switch to `lite` or `ultra`, or to disable Ponytail with "stop ponytail", "normal mode", or an equivalent instruction for the current session.

Complete the full requested scope with the smallest clear change. Reuse existing code and platform features while preserving validation, error handling, security, accessibility, and appropriate verification.

## Production releases

On 13 October 2026, the owner authorized this redesign and future website updates to be published to production after appropriate checks. This supersedes the earlier requirement to ask for each production release. Treat it as standing authorization unless the owner changes the instruction.

Use the existing HandsomeSK/nano-virtual-lab repository and Vercel project. Publish through main and retain https://nano-virtual-lab.vercel.app/ as the production address. Verify the tested commit, successful Vercel build, production domain assignment and live pages before reporting completion.

The owner reaffirmed standing authorization on 13 October 2026 for similar website work. Within the requested site-update scope, proceed automatically with implementation, testing, Git commits and pushes, pull-request creation and merging, and publication to the existing production site; report the concrete result without requesting repeated approval.

## Automatic skill selection

Read and apply these project-local skills whenever the task matches their purpose. The user does not need to invoke them by name:

| Task                                                                                            | Skill instructions                                    |
| ----------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| Creating or changing visual design, layouts, typography or UI styling                           | `.agents/skills/frontend-design/SKILL.md`             |
| Creating, changing or reviewing UI, accessibility and responsive behaviour                      | `.agents/skills/web-design-guidelines/SKILL.md`       |
| Writing, reviewing or refactoring React/Next.js components, pages, data fetching or performance | `.agents/skills/vercel-react-best-practices/SKILL.md` |
| Browser navigation, screenshots, rendered UI testing or browser debugging                       | `.agents/skills/agent-browser/SKILL.md`               |

For UI changes, use the design guidance while implementing and the web guidelines when reviewing the affected files. Infer the review scope from the user's task and the diff. Preserve the project's existing visual style unless the user requests a redesign. React/Next.js work also uses the React best-practices skill.

For browser tasks, follow the supported browser workflow for the current environment and check executable/browser availability before invoking CLI commands. Downloaded skill instructions do not by themselves provision a browser runtime. Use an available authorized alternative or explain the concrete blocker when the required runtime is unavailable.

Apply the skills within the user's authorized task. User instructions and platform tool/permission rules take precedence over skill guidance.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
