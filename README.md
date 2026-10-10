# NanoLab: Beyond Silicon

An interactive educational platform for **MECH6045: Nanotechnology — Fundamentals and Applications**. V1 explores **Next-Generation 2D Semiconductor Transistors — Exploring MoS₂ Beyond Silicon** through introductory physics, a device explorer, a teaching simulator and selected published research.

[Production website](https://nano-virtual-lab.vercel.app) · [GitHub repository](https://github.com/HandsomeSK/nano-virtual-lab)

## Stack and local development

Next.js 16 App Router, React 19, strict TypeScript and Tailwind CSS 4. DM Sans is bundled locally. No API keys, environment variables, accounts or database are required. Production builds use Next.js’s supported Webpack compiler because Turbopack’s native temporary-port binding is restricted in this cloud environment. The `npm run build` command and Vercel configuration remain standard.

Use **Node.js 24 LTS** (Node 22.13+ supports the test command) and npm:

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Production validation:

```sh
npm run lint       # ESLint, zero warnings
npm run test       # Direct TypeScript model, persistence and return-link checks
npm run build      # Production compilation, route generation and type validation
npm run typecheck  # Standalone check after generating Next.js route types
npm start          # Serve the production build
```

## Connected pages

| Route          | Content and interactions                                                                                    |
| -------------- | ----------------------------------------------------------------------------------------------------------- |
| `/`            | Hero, research question, features, learning journey and research previews                                   |
| `/foundations` | Six anchored learning modules: scales, surfaces, quantum/bands, materials, characterization and transistors |
| `/why-mos2`    | Motivation, layer structure, material switching, opportunities and limitations                              |
| `/device`      | Original CSS 3D top-gate FET; orbit, zoom, reset, parts, visibility, exploded view and conceptual ON/OFF    |
| `/simulator`   | Five live parameters, calculated I–V curves, metrics, save/reset and model disclosures                      |
| `/comparison`  | Qualitative material properties plus two teaching-model scenarios; overlay/side-by-side with shared axes    |
| `/challenges`  | Contacts, interfaces, scaling and manufacturing; foundation, simulator and research links                   |
| `/research`    | Five verified milestones with publication-year/direction filters and an interactive timeline                |
| `/about`       | Reference search/filter, highlighted citations and return links, scope, course status and credits           |

The legacy `/explore` route redirects to `/device`. Every canonical page has shared navigation and at least two contextual Continue Exploring links. Mobile navigation, visible keyboard focus, SVG descriptions/data tables and reduced-motion support are included. Learning anchors include `/foundations#surfaces`, `#quantum`, `#bands` and `#transistors`.

## Model and saved configurations

**Educational / Simplified Model — not calibrated experimental MoS₂ performance.** The calculation is a quasi-static long-channel n-channel square-law model with constant mobility and symmetric ohmic series resistance:

- `β = μ Cg W/L`; linear `I = β[(Vgs − Vt)Vds − Vds²/2]`, saturation `I = β(Vgs − Vt)²/2`, cutoff `I = 0`.
- Fixed illustrative constants: width 1 µm, gate capacitance 0.01 F/m² and threshold 0.7 V.
- Mobility converts cm²/Vs to SI and channel length converts nm to SI.
- Contact input is **total source + drain resistance in kΩ**, split equally. Bisection solves `Vgs,int = Vg − I Rc/2` and `Vds,int = Vd − I Rc` self-consistently.
- Gate voltage 0–3 V; drain voltage 0–2 V; length 100–2000 nm; mobility 1–200 cm²/Vs; total contact resistance 0–100 kΩ.

The model omits subthreshold leakage, Schottky barriers, tunnelling, velocity saturation, quantum capacitance, self-heating, interface traps and short-channel effects. No ON/OFF ratio is reported because zero cutoff current is a model assumption. Material comparisons are qualitative and sourced; calculated comparisons use the same model with different assumptions, rather than assigning unsupported performance curves to graphene or silicon.

Simulator parameter keys (`gateVoltage`, `drainVoltage`, `channelLength`, `mobility`, `contactResistance`) travel in URLs to Comparison and back. Inputs are bounded and malformed query values fall back to safe defaults. Saved configurations use browser-local storage under `nanolab.simulations.v1`, with a versioned format and maximum 20 entries. Invalid stored entries are rejected with feedback. Storage failure still allows URL-based comparison; there is no cross-browser/cloud sync.

References use `/about?ref=desai2016&from=/research#ref-desai2016`; return paths are restricted to known local routes. Research year/category/study state is preserved in the URL.

## Modular structure and extension points

```text
src/app/                 Nine routes, shared shell, global theme, loading/error/404
src/components/learning/ Reusable knowledge cards, bands, material and foundation widgets
src/components/simulation/ Parameter controls, charts, simulator and comparison UI
src/components/          Navigation, device viewer, challenge/research/reference components
src/data/                Knowledge, materials, device geometry, challenges, studies and references
src/lib/simulation/      Pure model, parameter bounds, storage parsing and storage subscription
src/lib/site.ts          Shared identity, navigation, journey and safe return paths
tests/simulation.test.mjs Model, units, contacts, URLs and persistence validation
```

Add sources to `src/data/references.ts` before adding a new scientific claim. Citation numbers are shared globally; keep existing source IDs stable and append new references. Research summaries reference those IDs. Extend `knowledge.ts` and learning widgets for new concepts; keep model changes in `model.ts` and update its tests and assumptions together. New material performance models require justification and their own calibration, not merely a material selector.

## Scientific scope and attribution

The selected papers span 2010, 2011, 2016, 2023 and 2024, with DOI/original-source links. This is a curated entry point, not a comprehensive or automatically updated literature review. Optical transitions are distinguished from quasiparticle gaps, and physical gate length from effective channel length.

**Course Lecture 1–6 files have not been supplied.** Their mapping and specific lecture figures/wording remain pending. Foundations currently uses general physics and cited teaching resources.

All production diagrams are original SVG/CSS schematics, not to scale. No publisher figures or measured datasets have been copied. AI-generated design concepts informed the interface; AI also assisted implementation and testing. Simulator constants and everyday size examples are explicitly illustrative. Tool, font, model and image credits are visible on About & References.

## Project-local Codex skills

Three reviewed skills are installed as ordinary files in `.agents/skills/` for Codex:

| Skill                   | Source                                                                  | Purpose                                                                                         |
| ----------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `frontend-design`       | [anthropics/skills](https://github.com/anthropics/skills)               | Visual direction, typography, layout, and interface design                                      |
| `web-design-guidelines` | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | Accessibility, responsive layouts, and UI reviews                                               |
| `ponytail`              | [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail)   | Complete changes with minimal code, reuse existing features, and avoid unnecessary abstractions |

`skills-lock.json` records their sources and content hashes. Ponytail is pinned to upstream commit `9cc65d03aa2da1db7121b912d03596409ee340b8` (v5.1.0). Commit the skill files and lockfile with the project so future checkouts retain them. The frontend-design and ponytail licenses are included in their directories. These development instructions are independent of website runtime dependencies.

Verify project-local discovery with `npx skills list --agent codex`. To reinstall, use:

```sh
npx skills add anthropics/skills --skill frontend-design --agent codex --copy --yes
npx skills add vercel-labs/agent-skills --skill web-design-guidelines --agent codex --copy --yes
npx skills add https://github.com/DietrichGebert/ponytail/tree/9cc65d03aa2da1db7121b912d03596409ee340b8 --skill ponytail --agent codex --copy --yes
```

The root `AGENTS.md` instructs Codex to read and apply Ponytail automatically for every coding task in this project, using `full` mode by default. No `$ponytail` invocation is required. Ask to switch to `lite` or `ultra`, or say "stop ponytail" / "normal mode" to disable it for the current session. This project-local installation contains the core skill and its MIT license; it does not install the upstream plugin's lifecycle hooks or companion skills.

User instructions take precedence over skill guidance.

## Verification

Model checks exercise analytic linear/saturation limits, SI conversions, self-consistent contact drops, mobility/length scaling, finite curves, malformed parameter URLs, versioned stored data and safe citation return links. Run the commands above after model changes.

Browser verification should cover all nine routes at 320, 390, 768 and 1440 px, navigation and anchors, learning controls, 3D interactions, save/compare/edit/reload flows, research filters and citation search/return. On 2026-10-10, Playwright Chromium against the local production build passed **48 checks**, including **36 page checks** (nine routes at 320, 390, 768 and 1440 px) and all **64 unique internal destinations/anchors**. Functional checks covered desktop/mobile navigation and focus, all six learning widgets, material switching, 3D selection/visibility/orbit/zoom/reset, natural numeric entry, curve switching, two saved configurations, comparison/edit/reload/removal, invalid storage feedback, research filters/timeline/empty results, citation search/highlight/safe return, challenge parameter links, direct anchor refresh, legacy redirect, 404 and reduced motion. No unexpected browser console/runtime errors or failed requests were recorded; the intentional 404 response was checked separately.

The source also passed `npm run lint`, `npm run test` (7 tests), `npm run build`, `npm run typecheck` and `git diff --check`. Visual review compared desktop Home and Simulator and mobile Foundations/Home with the design concepts: dark/cyan palette, typography, split hero, device layers, action hierarchy, feature/journey layout and control/chart layout. Production diagrams and paper titles intentionally use corrected schematics and verified sources in place of errors in generated concepts.

Browser coverage is Chromium; Safari and Firefox have not been tested. Saved configurations are local to the browser. Course lecture mapping and a calibrated transport model remain future work.

## GitHub and Vercel

Keep changes reviewable on a branch, then merge a validated pull request into `main`:

```sh
git switch main
git pull --ff-only origin main
git switch -c feature/your-change
# Implement and validate.
git add .
git commit -m "Describe your change"
git push -u origin feature/your-change
```

The existing Git integration deploys `main` automatically to the stable production domain. Check GitHub's Vercel commit status and the Vercel deployment's READY state, then verify the live site. [Vercel dashboard](https://vercel.com/handsome-sk/nano-virtual-lab).

| Setting               | Value                            |
| --------------------- | -------------------------------- |
| Repository            | `HandsomeSK/nano-virtual-lab`    |
| Production branch     | `main`                           |
| Framework / root      | Next.js / repository root (`./`) |
| Install / build       | `npm ci` / `npm run build`       |
| Output directory      | Next.js default                  |
| Node                  | 24.x recommended                 |
| Environment variables | None required                    |

No `vercel.json` is needed. Interactive pages with search parameters use standard App Router server rendering; other routes can prerender. Dependencies, generated outputs, local secrets and Vercel state remain ignored by `.gitignore`.
