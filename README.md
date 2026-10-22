# NanoLab — Beyond the visible

An independent public nanotechnology virtual laboratory. Explore nanomaterials through atomic structures, interactive science and verified research. English UI; no university affiliation is implied.

**Production:** https://nano-virtual-lab.vercel.app/
**Repository:** https://github.com/HandsomeSK/nano-virtual-lab

## Stack and local development

Next.js 16 App Router, React 19, strict TypeScript and Tailwind CSS 4. Scientific stages use Three.js 0.186.1 and Anime.js 4.5.0, dynamically imported near the viewport. The homepage uses one-time CSS entrances and a continuous Canvas 2D particle field; it does not load the 3D engine or stream a looping video. The owner requested no pause control; system reduced motion and hidden/offscreen states are respected. Inter variable roman (weight 100–900, optical size 14–32) is self-hosted under its bundled SIL OFL licence. Node.js 22+ is required; Node.js 24 was used during development.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. No credentials, API keys, environment variables, database or user account are required.

```sh
npm run lint
npm run typecheck
npm run test
npm run build
npm start
```

Run typecheck and build sequentially because both depend on generated .next type files. The production build uses Next.js's supported Webpack compiler. Keep dev and production build processes separate; both use .next. Generated build artifacts, local secrets, node_modules and Vercel local configuration are ignored.

## Routes

| Route                                      | Experience                                                                                        |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| `/`                                        | Single-viewport midnight-blue/metal gateway; natural scrolling on mobile                                  |
| `/foundations`                             | Six science topics, graphene geometry/electronics and existing experiments                        |
| `/lab`                                    | Three continuous 3D models: graphene, MoS₂, and a shared transistor/interface instrument |
| `/why-mos2`                                | Static MoS₂ structures, material properties, band explanations and featured discovery              |
| `/device`                                  | Static transistor cross-section, component roles, gate operation and experimental-device evidence |
| `/simulator`                               | Classical current model, bounded parameters, URL state and browser-local saves                    |
| `/comparison`                              | Shared-scale A/B curves, scenario inspection and edit links                                       |
| `/research`                                | Knowledge overview, six connected research directions and compact URL-filterable evidence catalogue                        |
| `/discoveries/mos2-interface-breakthrough` | Carbon-dot interface research, static before/after schematics and attributed EOT plot            |
| `/challenges`                              | Mechanisms and evidence behind engineering constraints                                            |
| `/about`                                   | Searchable references, citation return links, model boundaries and asset rights                   |

`/explore` continues to redirect to `/device`. Existing material fragments, citation IDs, research query parameters and saved configurations remain supported. On initial entry or explicit navigation from another route, legacy `/lab?material=graphene` and `/lab?material=mos2` URLs without a fragment focus the corresponding section of the complete Lab. All three models stay present; no model is hidden or reordered. The compatible fragment is added with `history.replaceState`, preserving queries and history state without another history entry. An explicit fragment takes precedence, unknown material values are unchanged, and browser back/forward restoration remains native. Core graphene/band-gap and monolayer/bilayer explanations remain visible on Why MoS₂; optional legacy foundations remain in a disclosure that fragment navigation opens automatically.

Foundations/Materials explains science; Lab owns every interactive scientific 3D viewer; Simulator/Comparison owns numerical calculations and 2D curves; Research/Challenges explains evidence and engineering limits. Multi-page header categories expose page-only dropdowns; single-page 3D Lab and Engineering Challenges are direct links. Every substantive interior page has a shared left-edge Contents drawer; it reserves desktop reading space while open, overlays on narrower screens, and retracts on pointer departure or touch navigation. Lab links to its three continuous models without hiding them.

Material comparison is consolidated at `/why-mos2#materials`, including the explorer, complete property table and conceptual band diagrams. Scenario Comparison starts directly with the A/B experiment and retains its benchmarking context; its former material fragment IDs provide explicit links to the canonical reading sections. Research owns the complete six-direction synthesis, while the interface article links back to those directions and keeps its full case study. Existing routes, citations, source images, section targets, saved configurations and numerical models remain compatible.

## Code owners and extension points

- `src/app`: server-rendered routes, shared layout and global styling.
- `src/components/science`: deferred renderer, instanced model construction, camera controls, workbench and static fallback. `src/lib/science/device-state.ts` owns structural transitions and legacy device-entry states.
- `ModelExplanation`: native default-closed scientific explanations with a keyboard-focusable 300 px desktop reading area and ordinary document flow on narrow/touch screens.
- `src/lib/science/atomic-structure.ts`: pure ideal geometry in Å; independent of rendering.
- `src/components/research`: source-attributed feature, explanation-led research synthesis and EOT plot.
- `src/lib/page-hierarchy.ts`: canonical ownership of the five categories, their child pages and auxiliary About page; shared breadcrumbs, active navigation and grouped footer consume it.
- `src/lib/navigation.ts`: page-only submenu destinations derived from those categories. `AnchorNavigation` and `navigation-scroll.ts` own explicit-link scroll intent; framework/browser history restoration remains in control.
- `ReferenceLink`, `ReferenceBrowser` and `ReferenceAccess`: visible numbered citations, full metadata and deduplicated external publication resources.
- `src/data/references.ts`, `research.ts`, `discoveries.ts`: bibliography, catalogue and themed evidence.
- `src/lib/simulation`: unchanged calculation, insights and versioned browser-local storage.
- `src/components/learning`: original learning widgets, recolored for the dark theme.
- `src/app/globals.css`: scientific semantic tokens and existing layouts. `experience.css`: shared metal UI/scientific experience. `homepage.module.css`: owner-specified homepage measurements.
- `DESIGN.md` and `UX-CONTRACT.md`: visual context and preserved behavior. `AGENTS.md`: automatic skill selection and standing production authorization.

Add evidence to the bibliography before citing it. Add a study and/or a themed story using existing data shapes. A new atomic material needs verified coordinates, bond rules, context and a geometric invariant test. Do not put the heavy renderer in the root layout or homepage.

## Scientific scope

The atomic model is an ideal finite ball-and-stick lattice, not electron density or molecular dynamics. Graphene has a two-carbon basis, plus inspectable single-bond and three-neighbour close-ups. Full yaw and above/below orbit are available with mouse, touch and keyboard controls. Semiconducting MoS₂ has one Mo and two S atoms per primitive cell, with trigonal-prismatic coordination. Sphere radii, assembly transitions and expanded spacing aid inspection. The 3R view holds representative spacing fixed to compare registry; it does not reconstruct the 2026 engineered bilayer.

The Lab directly embeds three models in this order: Graphene atomic structure, MoS₂ atomic structure, and MoS₂ transistor & interface engineering. Two fixed-material AtomicWorkbench instances and one DeviceViewer reuse the existing geometry and renderer; each model owns its controls, selection and camera state. The shared device keeps one ScientificStage and a constant scene specification: Standard / Without carbon dots / With carbon dots updates the existing model’s geometry visibility and materials without mounting a second viewer. Channel OFF/ON remains an independent conceptual control. Standard has a continuous ideal dielectric; the discontinuous no-carbon morphology is a study-specific control, not a claim about all untreated transistors. Scroll to any model to use it without leaving the page or selecting a model category. Device, Why MoS₂ and the interface discovery retain static scientific explanations instead of duplicate WebGL viewers. The transistor's gold electrodes, transparent HfO₂, enlarged atomic channel and separate SiO₂/Si support use cited material examples. See [the unified Lab architecture](docs/unified-3d-lab.md) and [materials and geometry provenance](docs/nanoscale-depth.md). The homepage projects a continuously twisting, depth-lit silver particle volume through one Canvas pixel upload per frame, with no video rewind.

Device layers and carbon-dot placement are original concept schematics, with exaggerated thicknesses. They do not compute spatial fields, injection or transport. The ON/OFF toggle illustrates charge control. The existing simulator remains an uncalibrated classical long-channel model; it omits subthreshold leakage, quantum transport, traps, self-heating and short-channel effects.

The research cutoff is **13 October 2026**, not a claim to cover every latest paper. The interface plot shows a single reported **0.6 ± 0.1 nm EOT** from Wong et al. EOT is capacitance-equivalent, not physical HfO₂ thickness. The uncertainty is reproduced as reported without assigning an unverified statistical meaning. No invented I–V dataset, performance comparison or band-gap energy is presented.

Materials, 3D Lab, Simulators, Discoveries and Engineering Challenges are the five peer categories. Home is reached through the logo, and About & References is auxiliary. Child pages expose a Home / category / page breadcrumb and keep their owning category active. Footer children sit below their category rather than appearing as extra primary pages. Context links connect theory to specific Lab models, simulator experiments and exact research/challenge sections.

Saved scenarios remain in this browser's local storage, without server backup. Clearing browser data removes them. Sharing a parameter URL is independent of saving.

## Media and rights

The current Inter licence is in `public/assets/Inter-OFL.txt`; archived Instrument Serif assets retain their original licence. The NanoLab mark and decorative silver particle field are original procedural graphics. HomeMotion uses a deterministic field with continuous drift and a static SVG fallback. It is visual atmosphere, not measured data or a scientific particle simulation.

Existing scientific images retain the registry in `src/data/figures.ts`, complete originals, source/licence links and Next.js image optimization. White data plates are preserved when necessary; NC-ND figures are not cropped, recolored or adapted. New discovery diagrams/3D are original explanations, not reproductions of publisher figures. AI-assisted UI concept images are design references, never scientific evidence.

## Vercel / GitHub publication

The existing Vercel project tracks `main`, detects Next.js, runs `npm ci` and `npm run build`, and retains the original production alias. No new Vercel project or domain is needed. The owner has authorized checked future updates to production; publish through GitHub main after checks.

For manual contributions:

```sh
git switch -c feat/your-change
# Edit, then run the checks above.
git add <changed-files>
git commit -m "Describe the concrete change"
git push -u origin feat/your-change
```

Open/review a pull request, verify its Vercel preview, merge to main, and verify the main deployment and original alias. A preview URL is not the permanent production address. Do not manually point the production alias at an unverified preview.

Latest homepage/navigation/reading refinements are recorded in `docs/home-reading-feedback.md`. Scientific source and model verification for the broader redesign are in `docs/beyond-visible.md`. Earlier documents record previous releases; their screenshots/check counts are historical.

The content, citation, submenu and scroll refinements are documented in [the research hub update](docs/research-hub-update.md). That report records an earlier release; [the unified Lab architecture](docs/unified-3d-lab.md) defines current 3D ownership and navigation. Browser screenshots and interaction coverage are reported only when a real browser could be run.


MoS₂ is the primary research case. The [scientific audit](docs/scientific-audit-2026-10-21.md) records this revision’s corrections, added characterization, optics, fabrication and applications, and validation. The [reference ledger](docs/reference-verification-2026-10-21.md) records the evidence actually accessible for all 51 sources and the eight existing figure licences. The [simulation derivation](docs/simulation-audit-2026-10-21.md) documents units, contact feedback, transconductance, power and the zero-drain-bias region correction. These records supersede older release reports where their validation scope or source counts differ.
