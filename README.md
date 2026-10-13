# NanoLab

**Nanomaterials. Beyond graphene.**

NanoLab is an independent **Nanotechnology Virtual Laboratory** for a public audience. Nanomaterials is its overall theme; two-dimensional nanomaterials are the research focus, with graphene and MoS₂ as representative materials and MoS₂-based semiconductor transistors as the advanced application. The learning journey connects nanoscale properties → two-dimensional materials and graphene → the zero-band-gap challenge → MoS₂ → transistors → simulation → 2024–2026 research and earlier milestones → future applications and engineering challenges.

[Production website](https://nano-virtual-lab.vercel.app) · [GitHub repository](https://github.com/HandsomeSK/nano-virtual-lab)

## Stack and local development

Next.js 16 App Router, React 19, strict TypeScript and Tailwind CSS 4. The cinematic homepage embeds Google Sans 400/500 from Fontsource 5.3.2 under the SIL OFL licence in `public/assets/google-sans-OFL.txt`. Interior pages retain locally bundled DM Sans and Instrument Serif. No website dependencies were added for the homepage. No API keys, environment variables, accounts or database are required. Production builds use Next.js’s supported Webpack compiler because Turbopack’s native temporary-port binding is restricted in this cloud environment. The `npm run build` command and Vercel configuration remain standard.

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

| Route          | Content and interactions                                                                                                                        |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`            | Single-viewport cinematic gateway; Explore, Simulator and Research navigation, two-line headline, exact supplied video and masked entrance      |
| `/foundations` | Six interactive sections: nanoscale/surfaces, quantum/bands, graphene structure, interactive Dirac/transport lab, characterization, transistors |
| `/why-mos2`    | From Graphene to MoS₂: transport, zero-gap challenge, interactive bands, layered structures and device connections                              |
| `/device`      | Original CSS 3D top-gate FET; orbit, zoom, reset, parts, visibility, exploded view and conceptual ON/OFF                                        |
| `/simulator`   | Five live parameters, calculated I–V curves, save/reset, result explanations from actual calculations and collapsed model details               |
| `/comparison`  | Qualitative material properties plus two educational-model scenarios; overlay/side-by-side with shared axes                                     |
| `/challenges`  | Contacts, interfaces, scaling and manufacturing; foundation, simulator and research links                                                       |
| `/research`    | Ten verified MoS₂ studies through 2026, filters/timeline, experimental figures and a separate industry announcement                             |
| `/about`       | Reference search/filter, highlighted citations and return links, public laboratory scope, scientific evidence and credits                       |

The legacy `/explore` route redirects to `/device`. The homepage links to `/foundations`, `/simulator` and `/research`; every interior page retains shared navigation and contextual Continue Exploring links. Mobile navigation, visible keyboard focus, SVG descriptions/data tables and reduced-motion support are included. Learning anchors include `/foundations#surfaces`, `#quantum`, `#bands`, `#graphene-structure`, `#graphene-electronics` and `#transistors`; previous `#materials` links still work.

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
src/lib/graphene.ts       Pure normalized educational dispersion and transport helpers
src/lib/site.ts          Shared identity, navigation, journey and safe return paths
tests/*.test.mjs         Model, units, contacts, URLs, persistence and new educational-logic checks
```

Add sources to `src/data/references.ts` before adding a new scientific claim. Citation numbers are assigned from the shared reference array; use stable source IDs instead of hardcoded numbers. Removed background references may change display numbering without changing scientific links. Research summaries reference those IDs. Extend `knowledge.ts` and learning widgets for new concepts; keep model changes in `model.ts` and update its tests and assumptions together. New material performance models require justification and their own calibration, not merely a material selector.

## Scientific scope and attribution

Graphene explanations cite Castro Neto et al. (2009), Novoselov et al. (2004, 2005) and Schwierz (2010). The MoS₂ timeline spans 2010–2026, including publisher-verified 2025 dry-transfer and 2026 microprocessor studies. This is a curated selection, not a comprehensive or automatically updated literature review.

The scientific foundations explain surfaces, quantum confinement, energy bands and graphene directly, without institutional identity or citations to internal materials. OpenStax provides public background for the infinite well, and the independently accessible COCOA open textbook supports the general transistor square-law equations. COCOA Section 2.1 and its linear/saturation equations were verified against the source on 12 October 2026. Specific research results, experimental figures and image rights retain their original scholarly sources.

The Dirac lab uses relative energy/wave-vector units and a low-energy schematic near a graphene Dirac point, not a full band calculation. Moving Fermi energy changes carrier occupancy, without opening an intrinsic graphene gap. Mobility, group velocity and mean free path are distinct quantities. The transport activity uses an illustrative length/mean-free-path ratio and does not predict measured conductance. Gapped/metal diagrams are qualitative. A finite gap can help switching; it does not guarantee a device's leakage or outperform silicon.

Interactive diagrams are original SVG/CSS schematics, not to scale. The homepage atmosphere is decorative footage at the exact owner-supplied remote video URL, rather than scientific evidence. It is streamed directly without a download, proxy, replacement image or poster. The previous conceptual WebP remains an unused asset. Licensed external scientific figures are separately identified and credited; their measured datasets are not fitted or imported into the current solver. AI also assisted design concepts, implementation and testing. Constants and everyday scale examples are explicitly illustrative. Credits appear on About & References.

## Scientific evidence update

All nine existing pages retain their learning tools and cited scientific explanations. The seven original studies and three newer 2026 papers remain, together with contact/dielectric studies, a benchmarking perspective and an engineering review; imec’s institutional announcement has its own category. After removing unnecessary institutional background citations, the total is **10 studies and 24 references**. Scientific source IDs and DOI links remain stable.

Eight licensed external images include graphene lattice/HRTEM evidence, MoS₂ crystal phases, an experimental back-gated transistor, measured transfer hysteresis, wafer-transfer evidence, a corrected crystalline-dielectric figure and self-aligned gate/channel microscopy. `src/data/figures.ts` holds every image's creator, source, DOI/figure identifier, licence, attribution and modification status. `ScientificFigure` uses Next.js Image with a small HTTPS host/path allowlist and `object-fit: contain` to display full figures.

The three Commons records verify intrinsic dimensions for the graphene lattice PNG (960 × 1042), HRTEM image (1024 × 1024) and MoS₂ phases illustration (2707 × 1522). Those values are recorded with their provenance. The five publisher figures have no independently verified width/height values; their complete scientific information remains protected by full-image display.

The managed executor blocks source-host downloads, so the images use controlled remote URLs and Vercel image optimization rather than claiming local `public` copies. Image hosting remains an external dependency. CC BY-SA images retain their licences; the two CC BY-NC-ND figures are complete/unadapted and limited to non-commercial public science education. Commercial reuse needs separate permission. Unverified image permissions result in source links rather than rehosting.

See [the content inventory](docs/content-audit.md) and [the scientific evidence ledger](docs/scientific-evidence.md) for page changes, licensing decisions, paper corrections, model audit and remaining subject review. The simulator's physical equations, inputs, defaults, result calculations, storage and comparison remain unchanged; experimental plots provide qualitative context rather than numerical validation.

## Visual system

Home uses the supplied midnight-blue gradient, compact inline NanoLab wordmark, centered Google Sans typography and viewport scaling. Native Web Animations preserve the specified entrance timings, with readiness bounded at 900 ms and a 3500 ms visibility guard. Reduced motion stops the decorative video and bypasses the intro; a small accessible pause/play control appears only when playback is available. Scientific routes retain the light exhibit palette and readable editorial/instrument layouts. Shared runtime tokens live in `src/app/globals.css`; `DESIGN.md` records the visual intent and token ownership. Charts retain labels, legends and distinct line styles; state is not communicated by color alone.

## Project-local Codex skills

Five skills are installed as ordinary files in `.agents/skills/` for Codex: the four requested frontend/browser skills and Ponytail.

| Skill                         | Source                                                                    | Purpose                                                                                         |
| ----------------------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `frontend-design`             | [anthropics/skills](https://github.com/anthropics/skills)                 | Visual direction, typography, layout, and interface design                                      |
| `web-design-guidelines`       | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills)   | Accessibility, responsive layouts, and UI reviews                                               |
| `agent-browser`               | [vercel-labs/agent-browser](https://github.com/vercel-labs/agent-browser) | Browser navigation, screenshots, rendered UI testing and debugging                              |
| `vercel-react-best-practices` | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills)   | React/Next.js component, data-fetching and performance guidance                                 |
| `ponytail`                    | [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail)     | Complete changes with minimal code, reuse existing features, and avoid unnecessary abstractions |

`skills-lock.json` records their sources and content hashes. Ponytail is pinned to upstream commit `9cc65d03aa2da1db7121b912d03596409ee340b8` (v5.1.0). Commit the skill files and lockfile with the project so future checkouts retain them. The frontend-design and ponytail licenses are included in their directories. These development instructions are independent of website runtime dependencies.

Verify project-local discovery with `npx skills list --agent codex`. To reinstall, use:

```sh
npx skills add anthropics/skills --skill frontend-design --agent codex --copy --yes
npx skills add vercel-labs/agent-skills --skill web-design-guidelines --agent codex --copy --yes
npx skills add vercel-labs/agent-browser --skill agent-browser --agent codex --copy --yes
npx skills add vercel-labs/agent-skills --skill vercel-react-best-practices --agent codex --copy --yes
npx skills add https://github.com/DietrichGebert/ponytail/tree/9cc65d03aa2da1db7121b912d03596409ee340b8 --skill ponytail --agent codex --copy --yes
```

The root `AGENTS.md` instructs Codex to read and apply Ponytail automatically for every coding task in this project, using `full` mode by default. No `$ponytail` invocation is required. Ask to switch to `lite` or `ultra`, or say "stop ponytail" / "normal mode" to disable it for the current session. This project-local installation contains the core skill and its MIT license; it does not install the upstream plugin's lifecycle hooks or companion skills.

The same `AGENTS.md` automatically selects frontend-design for visual UI work, web-design-guidelines for UI/accessibility reviews, vercel-react-best-practices for React/Next.js work and agent-browser for browser testing/debugging. The React skill's upstream name is **vercel-react-best-practices**, rather than the shorter `react-best-practices` selector. These rules apply to future Codex work in this repository and persist with the committed skill files.

Skills provide instructions; the browser CLI/browser runtime is separate. Before a browser task, check the available runtime and follow the environment's supported browser workflow. Project skill installation does not add website runtime dependencies.

User instructions take precedence over skill guidance.

## Verification

The cinematic homepage is documented in [the homepage report](docs/cinematic-homepage.md). Production-build browser checks cover 13 viewport sizes, preserved interior scrolling, native navigation, intro/failure states and reduced motion. Screenshots show the gradient fallback because the cloud environment blocks the supplied media host; the exact video remains embedded for unrestricted browsers. The production address continues to be https://nano-virtual-lab.vercel.app/.

Model checks exercise analytic linear/saturation limits, SI conversions, self-consistent contact drops, mobility/length scaling, finite curves, malformed parameter URLs, versioned stored data and safe citation return links. Run the commands above after model changes.

The public-laboratory redesign uses the actual **agent-browser CLI 0.39.0 with Chromium**. Its final verification and source-host limitations are recorded in [the redesign report](docs/public-lab-redesign.md). The scientific solver, Graphene calculations and persistence implementations remain unchanged. All **15 tests**, lint, TypeScript and the production build pass.

Design intent and canonical component ownership are recorded in [DESIGN.md](DESIGN.md) and [UX-CONTRACT.md](UX-CONTRACT.md). The official DESIGN.md lint and strict premium static audit pass. Static audits do not establish full accessibility compliance or replace browser checks. Screenshots and temporary browser dependencies remain outside the repository.

Browser coverage uses Chromium; Safari and Firefox are not included. Configurations remain browser-local; the transistor model remains educational and uncalibrated.

## GitHub and Vercel

Keep changes reviewable on a branch. Merge a validated pull request into `main` only after the site owner approves publishing it:

```sh
git switch main
git pull --ff-only origin main
git switch -c feature/your-change
# Implement and validate.
git add .
git commit -m "Describe your change"
git push -u origin feature/your-change
```

The existing Git integration deploys `main` automatically to the stable production domain. A merge therefore publishes the site; the current redesign must remain on its review branch until the owner confirms production deployment. Check GitHub's Vercel commit status and the Vercel deployment's READY state, then verify the live site. [Vercel dashboard](https://vercel.com/handsome-sk/nano-virtual-lab).

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
