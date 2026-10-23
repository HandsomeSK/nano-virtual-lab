# Scientific analysis and content freeze — 23 October 2026

## Published baseline and scope

Started from production/main `954cfa8733c78bff53c9ee1fafcf379ddf131238` (PR #33), verified against the original Vercel project and production alias before editing. This round completes the three requested scientific analysis functions within existing pages. It does not redesign the site, add a material/application category, replace an instrument or begin whole-site acceptance.

## Three integrated functions

| Existing page | Addition | Evidence boundary |
| --- | --- | --- |
| `/why-mos2#raman-analysis` | Editable in-plane/out-of-plane centres, layer-context presets, cm⁻¹ separation and an original two-Lorentzian SVG. | All presets, widths and intensities are illustrative. Lee's text-reported approximately 384 cm⁻¹ monolayer mode and approximately 3 cm⁻¹ monolayer-to-bilayer separation increase appear separately with supported-sample conditions. No complete raw spectrum, guessed figure coordinates or layer classifier is introduced. |
| `/simulator#model-validation` | Same-device evidence record and qualitative model-applicability comparison, linked to the existing complete experimental figure. | Shimazu Figure 1's 6 nm, L=4.3 µm/W=4.1 µm, 270 nm SiO₂/Si, Ti/Au, 0.1 V and approximately 1 V/s conditions stay together. The +40 V point is an ON-current reference, not an inferred sweep endpoint. No curve fit, parameter splice or numerical prediction error is invented. |
| `/research#photodetector-analysis` | `Iph=Ilight−Idark` and `R=Iph/Pincident`, independent current/power unit selectors, live signed outputs and inline errors. | Defaults are illustrative: 1.5 µA, 0.5 µA and 10 µW give 1 µA and 0.1 A/W. Positive incident active-area power is distinct from absorbed/whole-beam power; responsivity alone is neither quantum efficiency nor noise/speed performance. |

All three targets are present in their existing left chapter directories. Earlier chapter IDs and images on the changed routes remain intact. The current plot uses larger phone-specific labels and enough axis space to keep units readable; this is local scientific readability work, not a visual-theme change.

## Content consistency

The bounded review covers the existing eleven scientific pages and the three new functions. Page responsibilities, dimensions, phase/stacking terminology, optical/quasiparticle distinctions, EOT/physical thickness and experiment/model boundaries remain consistent. Two small changes complete the review:

- The Simulator prose now distinguishes an available channel at zero drain bias from cutoff at non-positive internal overdrive. The already-correct solver is unchanged.
- A repeated exciton explanation immediately before the dedicated optics section becomes a contextual link. Device conditions move into the compact comparison record, while the original figure, complete caption, authors' scaling/offset notes and qualitative-only warning remain visible.

The repository now has 52 unique reference IDs. Existing entries and citation numbers 1–51 are unchanged; only O’Brien's verified Raman symmetry reference is appended. Lee and Shimazu full-source checks are recorded in the new source notes. Lopez-Sanchez/Furchi retain their earlier documented access levels; they do not supply the calculator's illustrative numbers. No new external scientific image, measured intensity array or performance record is added.

Detailed records:

- [Raman sources and conceptual calculation](raman-analysis-sources-2026-10-23.md)
- [Experimental comparison and mathematical review](model-experimental-comparison-2026-10-23.md)
- [Photodetector formula, units and interpretation](photodetector-analysis-2026-10-23.md)
- [Content ownership and consistency review](content-freeze-review-2026-10-23.md)

## Limited technical checks

- Sequential `npm run lint`, `npm run typecheck`, `npm run test` and `npm run build` passed. The suite has 92 passing tests, including 11 new formula/boundary tests. Following the local Raman label adjustment, scoped lint, TypeScript/build compatibility and the 11 formula tests passed again.
- The four affected source-rendered documents (Materials, Simulator, Research and their reference destination) passed 240 local links and 201 fragment checks, with no duplicate IDs or lost earlier anchors/images. All three new directory entries resolve.
- Hash checks confirm 28 protected owners/configuration files remain byte-identical: homepage/particles, header/navigation/directory logic, 3D geometry, simulator solver/inputs/save/comparison contracts, external-figure registry and package manifests.
- Targeted Chromium checks exercise only the new instruments, their three directory links and the comparison text. All 35 functional/integration checks passed, including invalid-input recovery and widget fit at 375 px. Eight narrow follow-up checks confirmed the improved Raman labels: approximately 11.8 px on the phone, with no clipping/overlap or application JavaScript errors. Six widget screenshots were inspected; no whole-site journey was run.

The Browser plugin is absent; these targeted checks use the installed Python Playwright/Chromium runtime. An unchanged external-image request failed through the local proxy and is recorded separately from application errors. The existing Node module-type warning remains a diagnostic; it did not justify an unrelated package change. Full-site visual review, broad responsive/performance work, viewer/save/A-B journey re-certification and comprehensive end-to-end acceptance were intentionally left to the separate acceptance stage requested by the owner.

## Freeze boundary

Scientific content stays within the current MoS₂ knowledge path. Correct existing explanations and purposeful teaching repetition are retained. The three requested additions and the identified wording/consolidation changes complete this content round; release verification checks the exact tested commit, existing project and original production alias without adding further scientific scope.
