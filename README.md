# Nano Virtual Lab

A responsive educational website for **MECH6045 Nanotechnology: Fundamentals and Applications**. The scientific topic is **not yet selected**. Explore, Simulator, and Research are clearly labelled placeholders; About records the project's current scope. The homepage illustration is abstract decoration, not a scientific model.

## Stack

- Next.js 16 with App Router and TypeScript (strict mode)
- React 19 and Tailwind CSS 4 using the PostCSS integration
- ESLint flat configuration with Next.js rules
- Locally bundled DM Sans and Instrument Serif fonts; no external font requests during builds

## Getting started

Use **Node.js 22 or newer** (Node.js 24 LTS recommended) and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. No environment variables, API keys, database, or external services are needed.

```sh
npm run lint       # ESLint; warnings fail the check
npm run build      # Production compilation, type validation, and static page generation
npm run typecheck  # Standalone TypeScript check; build first to generate Next.js route types
npm start         # Serve the production build locally
```

## Project structure

```text
src/
  app/
    layout.tsx           Shared shell, metadata, fonts, and skip link
    page.tsx             Homepage
    globals.css          Tailwind theme and reusable styles
    icon.svg             Site icon
    not-found.tsx        Custom 404 page
    explore/page.tsx     Explore placeholder
    simulator/page.tsx   Simulator placeholder
    research/page.tsx    Research placeholder
    about/page.tsx       Project overview and status
  components/
    abstract-field.tsx   Decorative, deterministic SVG illustration
    brand.tsx            Shared brand link
    icon.tsx             Small shared SVG icon collection
    placeholder-page.tsx Shared placeholder layout
    section-card.tsx     Learning section navigation card
    site-header.tsx      Responsive navigation with active states
    site-footer.tsx      Course context and footer links
  lib/site.ts            Site identity, navigation, and planned section content
```

Update `src/lib/site.ts` for shared copy and navigation. Replace individual route placeholders as the scientific topic develops, keeping reusable presentation in `src/components`. Pages are Server Components by default; only the navigation requires client state. Each route has its own metadata. The shared theme includes responsive layouts, keyboard focus states, a skip link, and reduced-motion support.

Scientific content, sources, model assumptions, units, validation, and limitations should be defined when the topic is chosen. This scaffold does not include a functioning scientific simulator.

## Project-local Codex skills

Three reviewed skills are installed as ordinary files in `.agents/skills/` for Codex:

| Skill | Source | Purpose |
| --- | --- | --- |
| `frontend-design` | [anthropics/skills](https://github.com/anthropics/skills) | Visual direction, typography, layout, and interface design |
| `web-design-guidelines` | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | Accessibility, responsive layouts, and UI reviews |
| `ponytail` | [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) | Complete changes with minimal code, reuse existing features, and avoid unnecessary abstractions |

`skills-lock.json` records their sources and content hashes. Ponytail is pinned to upstream commit `9cc65d03aa2da1db7121b912d03596409ee340b8` (v5.1.0). Commit the skill files and lockfile with the project so future checkouts retain them. The frontend-design and ponytail licenses are included in their directories. These development instructions are independent of website runtime dependencies.

Verify project-local discovery with `npx skills list --agent codex`. To reinstall, use:

```sh
npx skills add anthropics/skills --skill frontend-design --agent codex --copy --yes
npx skills add vercel-labs/agent-skills --skill web-design-guidelines --agent codex --copy --yes
npx skills add https://github.com/DietrichGebert/ponytail/tree/9cc65d03aa2da1db7121b912d03596409ee340b8 --skill ponytail --agent codex --copy --yes
```

Ask Codex to use `$ponytail` when working on this project. The core skill supports `lite`, `full` (default), and `ultra` levels. This project-local installation contains the core skill and its MIT license; it does not install the upstream plugin's lifecycle hooks or companion skills.

User instructions take precedence over skill guidance. The scientific topic remains undecided, and deployment remains a separate task.

## Scaffold verification

The initial scaffold passed `npm run lint`, `npm run build`, `npm run typecheck`, and `git diff --check`. Browser checks against the local production build covered all five routes at 320, 390, 768, and 1440 pixel widths, with no horizontal overflow or runtime errors. Mobile-menu toggling, Escape-key focus restoration, navigation, the homepage call to action, route metadata, and the custom 404 were also verified.

### Live-site verification

On 2026-10-09, Playwright Chromium checked [the production site](https://nano-virtual-lab.vercel.app) at 320, 390, 768, and 1440 pixel widths using a fresh browser context without Vercel credentials. All five pages returned HTTP 200, loaded their styles, displayed the correct titles and headings, and had no horizontal overflow. Mobile-menu navigation, Escape-key focus restoration, active navigation states, the homepage call to action, and the HTTP 404 page passed. No browser runtime errors or failed requests were recorded during the functional checks.

The tested production deployment was built from `main` commit `df8ce56`. Vercel confirmed its state as `READY` and source as `git`; the merge of PR #2 had automatically triggered this successful deployment. The Vercel runtime-error check also reported no errors in the preceding hour. The temporary browser-testing sandbox was stopped after verification.

## GitHub workflow

The scaffold and project-local skills are saved in [HandsomeSK/nano-virtual-lab](https://github.com/HandsomeSK/nano-virtual-lab). [PR #1](https://github.com/HandsomeSK/nano-virtual-lab/pull/1) merged the initial website into `main`.

For future changes, create a branch from the latest `main`, implement and validate the change, then push it:

```sh
git switch main
git pull --ff-only origin main
git switch -c feature/your-change
# Edit and validate the change before committing.
git add .
git commit -m "Describe your change"
git push -u origin feature/your-change
```

Open a pull request into `main`, review it, and merge it. GitHub authentication with write access is required to push. Generated build output, dependencies, local secrets, and Vercel state are ignored.

## Vercel deployment

The repository has been imported into the **HandsomeSK** Vercel workspace as **nano-virtual-lab**. GitHub reported the initial deployment of `main` commit `a5f8d39` as successful.

- **Website:** [nano-virtual-lab.vercel.app](https://nano-virtual-lab.vercel.app)
- [Initial deployment](https://nano-virtual-9hx0dj182-handsome-sk.vercel.app)
- [Vercel project dashboard](https://vercel.com/handsome-sk/nano-virtual-lab)

The website URL is the stable production address to share. Individual deployment URLs identify specific builds. Updates merged into `main` retain the production address.

The project uses standard Next.js conventions, so a `vercel.json` is unnecessary. The deployment configuration is:

| Setting | Value |
| --- | --- |
| Git repository | `HandsomeSK/nano-virtual-lab` |
| Production branch | `main` |
| Framework | Next.js |
| Root directory | Repository root (`./`) |
| Install command | `npm ci` |
| Build command | `npm run build` |
| Output directory | Next.js default |
| Environment variables | None required |

Node.js 24.x is recommended; the project's minimum is Node.js 22. All five pages currently prerender as static content and remain compatible with future server routes.

Vercel's Git integration builds updates to `main` automatically. After merging a change, check the commit's **Vercel** status on GitHub and the resulting deployment in Vercel. A successful build status confirms the deployment pipeline; public access and browser behaviour require separate checks against the live domain.
