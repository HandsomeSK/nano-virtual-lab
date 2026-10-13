# Public laboratory redesign

This report records the public-laboratory foundation and its original verification baseline. The current homepage and shared NanoLab wordmark are described in [the cinematic homepage report](cinematic-homepage.md); the earlier homepage composition and subtitle checks below document the preceding review version.

Review baseline: `main` at `886ed01248f2af953dd9127ba89f3f86e78e0352`, 12 October 2026. The requested change is a public scientific platform redesign; production publication requires the owner's confirmation.

## Scientific content and identity

- Removed the institutional identifier and course framing from the homepage, shared identity/SEO description, footer and About.
- Removed the three internal-material reference entries and their category. Definitions, the infinite-well equation, periodic energy bands, graphene, characterization and transistor explanations remain. Specific research, measurements and image rights retain scholarly provenance.
- Replaced the lecture-note MOSFET background source with the independently verified COCOA open textbook, preserving its existing source ID. The bibliography now has 24 sources; all 10 research studies and eight external image records remain.
- The header logo displays **NanoLab** without the **Beyond Silicon** subtitle. Its accessible home-link name matches the visible brand. The homepage retains **From Graphene to Next-Generation 2D Semiconductor Transistors** beneath Nanomaterials; footer branding and scientific Silicon content remain.
- `src/lib/simulation/model.ts`, `src/lib/graphene.ts`, the result interpretation helpers and all persistence implementations are unchanged. Formulae, ranges, defaults, units, bias response, contact solve, URL parameters and browser storage schema remain intact.

## Presentation changes

| Surface               | Result                                                                                                                                                 |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Shared layout         | Locally hosted serif display headings, quiet sans-serif technical text, mineral-gray/paper surfaces, teal actions, visible focus and shared scrollbars |
| Home                  | Asymmetric title/introduction, material illustration with a useful index, an open learning sequence, a wide workbench and ruled research links         |
| Foundations           | Article stream with a quiet contents directory; distinct embedded experiments; theory and contextual links remain readable                             |
| Materials             | Open technical sections, legible structure/band visuals and a responsive comparison                                                                    |
| Device                | A main 3D stage, part inspector, consolidated toolbar and keyboard/click alternatives to drag                                                          |
| Simulator             | Plot and readouts first, grouped bias/device parameters in a rail, separate save bar and preserved equations/disclosures                               |
| Comparison            | Scenario selectors and plots before observations and saved configurations; full tables scroll within their own narrow-screen region                    |
| Research / Challenges | Study prose with related-concept sidebars; mechanisms paired with explanatory diagrams; full evidence and source links retained                        |
| About                 | Public lab scope, source lookup, evidence categories and complete image registry, without institutional identity                                       |

Retired the old duplicate light-theme override layer, its gradients, generic card shadows and floating-hero treatment. The sphere's shading and physically meaningful carrier animation remain; reduced-motion support is retained.

## Images and spacing

The three Commons assets have verified intrinsic dimensions: graphene lattice 960×1042, graphene HRTEM 1024×1024 and MoS₂ phases 2707×1522. Next.js Image uses these dimensions to reserve their true proportions. The other five publisher figures keep `contain` with reserved geometry: no guessed intrinsic dimensions, no scientific cropping, recoloring or removal of scales/labels. Figures have bounded widths, compact captions and accessible source/licence links. Foundation images share space with captions on desktop and stack on mobile.

The conceptual homepage artwork trims its empty exterior through the display window; all material structures remain visible. No licensed scientific figure is modified. The hero has content-driven height. Article dividers and shorter, consistent group spacing replace repeated background containers.

## Validation and review evidence

Final review completed 13 October 2026. The actual agent-browser CLI 0.39.0 is installed temporarily outside the website. Before and after screenshots cover all nine routes at 1440 and 390 px; screenshots and browser reports live in `/workspace/artifacts/public-lab-redesign/`. Tests use a stable Next.js production build with hydrated interactions.

- **36 responsive checks:** nine routes at 320, 390, 768 and 1440 px, with no horizontal overflow or remaining course identity. The narrow three-material comparison was corrected and the final run repeated successfully.
- **Nine automatic accessibility audits:** zero reported WCAG A/AA violations. SVG/non-text contrast findings marked incomplete still require human judgement; this is not a full accessibility certification.
- **Ten interaction groups:** navigation; all foundation widgets; material/layer comparisons; 3D orbit, zoom, parts, visibility, explosion and ON/OFF; simulator input/current response, save/compare/edit/reload/reset; research filters/timeline/deep links; four challenge cases; reference search/filter/return and the eight-image registry.
- **97 unique internal destinations** and citation/knowledge fragments resolve. No application JavaScript errors were observed.
- **Supplemental edge checks:** empty save-name validation and restored field focus; an 80-character unbroken saved name; selectors, legends and diagrams at 320 px; mobile Escape/focus restoration; native output semantics for the zoom readout.
- **Motion:** the carrier animation runs under normal preferences and stops under reduced motion, verified in the browser's computed styles and animation state.
- **Preview delivery:** the READY preview for source commit `46cac55` returns HTTP 200 for all nine pages and all eight scientific images at 640 px through Next.js Image optimization. Image responses have valid JPEG/PNG content types. This checks actual platform delivery independently of local source-host restrictions.
- **Code checks:** ESLint with zero warnings, all 15 tests, TypeScript, `npm run build`, Prettier and `git diff --check` pass. The model, Graphene helpers and persistence files remain byte-unchanged against main.

The official DESIGN.md lint and strict premium static audit pass. These audits check documented tokens/ownership and static anti-patterns; they do not establish full WCAG compliance. The project has no formatter script; changed presentation files are formatted with temporary Prettier tooling without changing website dependencies.

The header subtitle refinement was checked separately at 431×672 and 1440×1000 in Chromium: the logo is vertically centered without overflow, its accessible name is accurate, and the scientific homepage subtitle and footer subtitle remain. Native mobile navigation, Escape/focus restoration and the logo's home link pass. ESLint, TypeScript and the production build were repeated successfully; screenshots and results are in `/workspace/artifacts/header-subtitle/`.

## Main files

| Files                                                                                         | Responsibility                                                                     |
| --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `src/app/globals.css`, `src/app/layout.tsx`                                                   | Shared design tokens, typography, article/instrument layouts and responsive rules  |
| `src/app/page.tsx`, `src/app/about/page.tsx`                                                  | Homepage composition and independent public-platform scope                         |
| `src/components/scientific-figure.tsx`, `src/data/figures.ts`                                 | Complete scientific figures, verified image geometry and retained attribution      |
| `src/components/simulation/*.tsx`, `src/components/device-viewer.tsx`                         | Plot-first instruments, grouped controls/readouts and device inspection            |
| `src/components/research-explorer.tsx`, `src/components/challenge-explorer.tsx`               | Editorial studies and paired mechanism/explanation layouts                         |
| `src/data/references.ts`, `src/data/knowledge.ts`, `src/lib/site.ts`                          | Public identity, source cleanup and intact scientific content                      |
| `src/components/reference-browser.tsx`, `src/components/site-footer.tsx`, learning components | Source search/clear, course-free footer and accessible control groups              |
| `src/components/brand.tsx`, `src/components/site-header.tsx`                                  | Header-only subtitle suppression and an accurate accessible home-link name         |
| `DESIGN.md`, `UX-CONTRACT.md`, `premium-ui.json`, `README.md`, `tests/evidence.test.mjs`      | Durable design/behavior ownership, documentation and source-integrity verification |

## Remaining limits

- The managed executor still restricts the scientific source hosts. Local screenshots inspect layout and containment but cannot prove remote-image pixel rendering. Actual preview delivery for all eight images is verified separately above; source URLs and licences remain curated.
- Five publisher image dimensions remain unverified; their full-image containment is conservative. No replacement or estimated source dimensions were introduced.
- Browser testing uses Chromium; Safari and Firefox are not covered. Automatic accessibility checks need human review for SVG/media semantics and cannot certify the entire site.
- This review remains on its feature branch. Merging into main would trigger the existing production Git integration and therefore awaits owner confirmation.
