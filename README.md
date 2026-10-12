# Nanomaterials

**From Graphene to Next-Generation 2D Semiconductor Transistors**

NanoLab: Beyond Silicon is an interactive educational project for **MECH6045: Nanotechnology — Fundamentals and Applications**. Nanomaterials is the overall course topic; two-dimensional nanomaterials are the research focus, with graphene and MoS₂ as representative materials and MoS₂-based semiconductor transistors as the advanced application. The learning journey connects nanoscale properties → two-dimensional materials and graphene → the zero-band-gap challenge → MoS₂ → transistors → simulation → 2024–2026 research and earlier milestones → future applications and engineering challenges.

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

| Route          | Content and interactions                                                                                                           |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `/`            | Nanomaterials hero, course-to-research introduction, eight clickable learning nodes, tools and 2024–2026 research previews          |
| `/foundations` | Six modules: nanoscale/surfaces, quantum/bands, graphene structure, interactive Dirac/transport lab, characterization, transistors |
| `/why-mos2`    | From Graphene to MoS₂: transport, zero-gap challenge, interactive bands, layered structures and device connections                 |
| `/device`      | Original CSS 3D top-gate FET; orbit, zoom, reset, parts, visibility, exploded view and conceptual ON/OFF                           |
| `/simulator`   | Five live parameters, calculated I–V curves, save/reset, result explanations from actual calculations and collapsed model details  |
| `/comparison`  | Qualitative material properties plus two teaching-model scenarios; overlay/side-by-side with shared axes                           |
| `/challenges`  | Contacts, interfaces, scaling and manufacturing; foundation, simulator and research links                                          |
| `/research`    | Seven verified MoS₂ milestones through 2026, filters/timeline and links explaining why each study matters                          |
| `/about`       | Reference search/filter, highlighted citations and return links, scope, course resources and credits                               |

The legacy `/explore` route redirects to `/device`. Every canonical page has shared navigation and at least two contextual Continue Exploring links. Mobile navigation, visible keyboard focus, SVG descriptions/data tables and reduced-motion support are included. Learning anchors include `/foundations#surfaces`, `#quantum`, `#bands`, `#graphene-structure`, `#graphene-electronics` and `#transistors`; previous `#materials` links still work.

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
src/lib/simulation/      Unchanged physical model and persistence; calculated interpretation helper
src/lib/graphene.ts       Pure normalized teaching dispersion and transport helpers
src/lib/site.ts          Shared identity, navigation, journey and safe return paths
tests/*.test.mjs         Model, units, contacts, URLs, persistence and new teaching-logic checks
```

Add sources to `src/data/references.ts` before adding a new scientific claim. Citation numbers are shared globally; keep existing source IDs stable and append new references. Research summaries reference those IDs. Extend `knowledge.ts` and learning widgets for new concepts; keep model changes in `model.ts` and update its tests and assumptions together. New material performance models require justification and their own calibration, not merely a material selector.

## Scientific scope and attribution

Graphene explanations cite Castro Neto et al. (2009), Novoselov et al. (2004, 2005) and Schwierz (2010). The MoS₂ timeline spans 2010–2026, including publisher-verified 2025 dry-transfer and 2026 microprocessor studies. This is a curated selection, not a comprehensive or automatically updated literature review.

Course connections use the project author's supplied lecture topics and page locations: **Lecture 2: Nanomaterials**, including **pp. 18–19** for energy bands and band gap, and **Lecture 3: Carbon-Based Nanomaterials**, including **p. 26** for graphene electronic properties. The MoS₂ transistor case study extends the course theory through scientific literature; it does not claim that Lectures 2–3 teach these devices in detail. The 2024–2026 papers form a separate recent-research layer. No lecture quotations or additional page numbers are invented. The full lecture files have not been independently reviewed; linked scientific literature supports the explanations.

The Dirac lab uses relative energy/wave-vector units and a low-energy schematic near a graphene Dirac point, not a full band calculation. Moving Fermi energy changes carrier occupancy, without opening an intrinsic graphene gap. Mobility, group velocity and mean free path are distinct quantities. The transport activity uses an illustrative length/mean-free-path ratio and does not predict measured conductance. Gapped/metal diagrams are qualitative. A finite gap can help switching; it does not guarantee a device's leakage or outperform silicon.

Interactive diagrams are original SVG/CSS schematics, not to scale. The homepage illustration is AI-generated conceptual artwork, optimized locally as WebP; it is not an atomistic simulation or experimental image. No publisher figures or measured datasets have been copied. AI also assisted design concepts, implementation and testing. Constants and everyday scale examples are explicitly illustrative. Credits appear on About & References.

## Visual system

The light theme uses a cool `#F7FAFF` background, white learning panels, navy `#202D53` text and `#536480` secondary text. Indigo `#4F46E5` marks actions, cyan `#06B6D4` graphene and transport, violet `#8B5CF6` MoS₂, and orange `#F59E0B` learning questions. Darker cyan/violet variants keep small text readable. Shared CSS variables, soft borders/shadows and rounded interaction cards apply across all nine pages. Charts include labels, legends and distinct line styles; state is not communicated by color alone.

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

The redesign passed ESLint with zero warnings, standalone TypeScript validation, all **13 named automated tests**, and `npm run build`. Production-build browser validation used Playwright Chromium because the Browser plugin was unavailable:

- All nine pages at **320, 390, 768 and 1440 px**: 36 route/layout checks, with no horizontal overflow.
- **76 unique internal destinations**, including knowledge anchors, citation targets and parameter links.
- **15 interaction flows**: desktop/mobile navigation and keyboard focus; six foundation widgets and the Dirac/Fermi/transport lab; material switching; 3D rotation, zoom, selection, visibility, exploded view and ON/OFF; simulator controls, calculated explanations, save/compare/edit/reload and malformed storage; research filters/timeline; reference search/filter/return; challenge deep links; direct/refreshed model anchors; redirects, 404 and reduced motion.
- No unexpected console warnings, application errors or framework overlays. The intentional missing-page check produced its expected 404 response.
- A computed foreground/background review covered **1,366 text samples** across the nine pages with no flagged contrast failures. Gradients and all possible interactive states are not exhaustively resolved by this review.
- Visual checks at **1536 × 1024** and **390 × 844** compared design concepts with rendered screenshots. Fixed narrow-screen overflow, cyan label contrast, diagram annotations, quantum-level label overlap and topic-number wrapping.
- Fragment positioning completes immediately so rapid cross-page navigation does not interrupt a pending smooth scroll. Direct links, refreshes and the zero-gap → Dirac lab → learning-question return flow were checked in the production build.

The core physical solver, storage schema/key, dependency manifests and route definitions remain unchanged. Temporary browser scripts and screenshots are kept outside the repository.

Browser coverage uses Chromium; Safari and Firefox are not included. Configurations remain browser-local; the transistor model remains educational and uncalibrated.

The Nanomaterials topic update also passed lint, type checking, all 13 tests and the production build. Its production-build Chromium check covered **44 checks**: all nine pages at the four widths above, exact homepage copy and metadata, **93 internal destinations**, the retained Graphene/3D/simulator/save/compare/edit/reload flows, recent-year research filters and citation search/return. All seven studies and 17 references remain available. No unexpected browser errors or warnings were recorded. Only introduction copy, shared metadata, learning-node labels/order, course context and subtitle spacing changed; scientific data, model parameters, interaction implementations and deployment configuration were verified unchanged.

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
