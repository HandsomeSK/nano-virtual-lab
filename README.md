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

Two reviewed skills are installed as ordinary files in `.agents/skills/` for Codex:

| Skill | Source | Purpose |
| --- | --- | --- |
| `frontend-design` | [anthropics/skills](https://github.com/anthropics/skills) | Visual direction, typography, layout, and interface design |
| `web-design-guidelines` | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | Accessibility, responsive layouts, and UI reviews |

`skills-lock.json` records their sources and content hashes. Commit the skill files and lockfile with the project so future checkouts retain them. The frontend-design license is included in its directory. These development instructions are independent of website runtime dependencies.

Verify project-local discovery with `npx skills list --agent codex`. To reinstall, use:

```sh
npx skills add anthropics/skills --skill frontend-design --agent codex --copy --yes
npx skills add vercel-labs/agent-skills --skill web-design-guidelines --agent codex --copy --yes
```

User instructions take precedence over skill guidance. The scientific topic remains undecided, and deployment remains a separate task.

## Scaffold verification

The initial scaffold passed `npm run lint`, `npm run build`, `npm run typecheck`, and `git diff --check`. Production-browser checks covered all five routes at 320, 390, 768, and 1440 pixel widths, with no horizontal overflow or runtime errors. Mobile-menu toggling, Escape-key focus restoration, navigation, the homepage call to action, route metadata, and the custom 404 were also verified.

## Commit the scaffold to GitHub

This checkout targets `HandsomeSK/nano-virtual-lab`. The scaffold is prepared on `initialize-website`, based on the existing `origin/main` initial commit. Review the files, then:

```sh
git status
git add .
git commit -m "Initialize Nano Virtual Lab educational website"
git push -u origin initialize-website
```

Open a pull request from `initialize-website` into `main`, review it, and merge it. GitHub authentication with write access is required to push. Generated build output, dependencies, local secrets, and Vercel state are ignored.

## Vercel compatibility (deployment not performed)

The project uses standard Next.js conventions, so a `vercel.json` is unnecessary. When you decide to deploy:

1. Commit and push the project, then import `HandsomeSK/nano-virtual-lab` in Vercel.
2. Select **Next.js** as the framework and leave the root directory at the repository root.
3. Use Node.js **24.x**, install command `npm ci`, and build command `npm run build`. Leave the output directory at the framework default.
4. Select `main` as the production branch. No environment variables are required for the scaffold.

All five pages currently prerender as static content and remain compatible with future server routes. No Vercel project has been linked and no deployment has been created.
