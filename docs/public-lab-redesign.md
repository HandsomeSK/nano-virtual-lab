# Public laboratory redesign

Review baseline: `main` at `886ed01248f2af953dd9127ba89f3f86e78e0352`, 12 October 2026. The requested change is a public scientific platform redesign; production publication requires the owner's confirmation.

## Scientific content and identity

- Removed the institutional identifier and course framing from the homepage, shared identity/SEO description, footer and About.
- Removed the three internal-material reference entries and their category. Definitions, the infinite-well equation, periodic energy bands, graphene, characterization and transistor explanations remain. Specific research, measurements and image rights retain scholarly provenance.
- Replaced the lecture-note MOSFET background source with the independently verified COCOA open textbook, preserving its existing source ID. The bibliography now has 24 sources; all 10 research studies and eight external image records remain.
- The inspected homepage already used **From Graphene to Next-Generation 2D Semiconductor Transistors** beneath Nanomaterials. It did not have a **Beyond Silicon** hero subtitle. The redesigned hero keeps that scientific description and has no Beyond Silicon subtitle. The existing brand and scientific Beyond Silicon/Silicon content elsewhere remain within the user's strict scope.
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

The actual agent-browser CLI is installed temporarily outside the website. Before screenshots cover all nine routes at 1440 and 390 px; final screenshots and browser reports live in `/workspace/artifacts/public-lab-redesign/`. Tests run against a stable Next.js production server, not an SSR-only page snapshot. Full results are appended after the final browser pass.

The official DESIGN.md lint and strict premium static audit pass. These audits check documented tokens/ownership and static anti-patterns; they do not establish full WCAG compliance. The project has no formatter script; changed presentation files are formatted with temporary Prettier tooling without changing website dependencies.

## Remaining limits

- The managed executor still restricts the scientific source hosts. Local screenshots cannot prove successful loading or crop fidelity for the five publisher images. Existing image URLs/licences remain curated; preview HTTP delivery is verified separately when available.
- Five publisher image dimensions remain unverified; their full-image containment is conservative. No replacement or estimated source dimensions were introduced.
- Browser testing uses Chromium; Safari and Firefox are not covered. Automatic accessibility checks need human review for SVG/media semantics and cannot certify the entire site.
- This review remains on its feature branch. Merging into main would trigger the existing production Git integration and therefore awaits owner confirmation.
