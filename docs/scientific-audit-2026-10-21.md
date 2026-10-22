# MoS₂ scientific revision — 21 October 2026

## Scope and evidence policy

Reviewed the scientific routes and their backing data/components: Home, Foundations, Why MoS₂, 3D Lab, Transistor Principles, Simulator, Comparison, Research, the interface case study, Engineering Challenges, and About & References. The baseline is commit `988e065432922a7483014f105fe6f26ac88d5e39`. Five navigation categories, page ownership, existing chapter anchors, visual tokens, homepage particle/motif rendering, three scientific viewers, scenario schemas and saved-configuration flows remain the established contract. This is a content/science revision, not a redesign.

Important statements are checked against an accessible primary text, publisher abstract/metadata or an identified original institutional source. The reference ledger distinguishes these access levels; an accessible abstract does not establish that paywalled methods were inspected. New explanations are paraphrases with citations, not reconstructed experimental datasets. New figures are labelled original conceptual schematics; no new publisher images are copied.

## Phase 1: findings before expansion

| Area | Baseline finding | Decision |
| --- | --- | --- |
| Scope | Homepage and Foundations emphasize general nanomaterials/graphene before the core MoS₂ example. | State the MoS₂ case-study focus in existing copy; keep comparative graphene/silicon material. |
| Atomic geometry | Existing generator matches cited ideal lattice coordinates: a=3.16 Å, sulfur planes at ±1.56 Å, Mo–S nearest neighbours≈2.40 Å. | Keep geometry and controls; independently test coordination and dimensions. |
| Thickness/phase | A material label conflates an isolated 1H sheet with the 2H bulk polytype; nominal layer thickness, internal S-plane span and sheet repeat need explicit distinction. | Correct terminology and inspector/theory explanation without altering model scales. |
| Optical evidence | Existing ≈1.8 eV wording lacks measurement definition. Mak reports ≈1.90 eV monolayer PL and a separate photocurrent onset near1.8 eV. | Identify optical measurement and conditions; explain exciton binding versus quasiparticle gap. |
| Characterization | General AFM/TEM discussion exists but no systematic MoS₂ Raman/AFM/TEM/PL evidence chain. | Add a source-backed section to the existing Materials page, retaining Foundations as an introduction. |
| Fabrication | CVD, transfer, ALD and device integration are distributed among case studies. | Add one connected, explicitly illustrative process narrative to Transistor Principles and link existing case studies. |
| Numerical solver | SI conversion, square-law regions, symmetric contact feedback and bisection bracket are consistent. | Keep the solver; test independent analytic limits, power balance and corner-case residuals. |
| Numerical readout | Zero drain current is used as a synonym for cutoff; an above-threshold channel at zero drain bias is mislabelled OFF. | Classify the region from internal overdrive and drain bias; distinguish channel state from current flow. |
| Research | Most existing claims and dimensional distinctions are sound. Wong’s lowest EOT belongs to a graphene double-gate capacitance test, not automatically every MoS₂ device. | Preserve correct results, distinguish specimens/measurement methods, and update only actually reviewed records. |
| Applications | Nanoelectronics is substantive; photodetection, sensing and HER lack mechanism/evidence/limitations. | Add one concise applications section to Research, with photodetectors as the main example and shorter sensor/catalyst cases. |
| Repetition | Comparison ownership and three-model Lab consolidation are already useful. | Preserve canonical routes; link theory, instruments and evidence instead of duplicating complete studies/viewers. |
| Images | Eight external scientific figures have a source/license/attribution registry. | Verify source permissions and claims; preserve full-image presentation and existing size limits. |

## Phases 2–4: implementation and audit records

Existing corrections precede integration of new sections. Detailed source checks and derivations are recorded in the accompanying reference, research-claim, atomic, simulation, characterization, fabrication and applications documents. New chapter targets are added to the existing left-side directory; no new top-level category or duplicate simulator is introduced.

## Phase 5: validation

Validation was completed on 22 October 2026, continuing the 21 October audit. The requested sequence passed: `npm run lint`, `npm run typecheck`, `npm run test` (81 tests) and `npm run build`. The production build generated all 15 route outputs successfully. The independent source review found no blocking scientific inconsistency.

- All 55 source-rendered route/query variants passed the internal-link audit: 5,296 links and 3,714 fragments, with no missing route/fragment or duplicate-ID issues. Every pre-existing anchor, image record and legacy redirect was retained.
- The bibliography contains 51 unique reference IDs (15 additions); existing citation numbers 1–36 are preserved. Source access and corrections are itemized in the reference ledger, including the Qiu erratum and specimen-specific Wong EOT distinction.
- Official design lint reported no errors or warnings; the strict UI audit reported no findings. CSS Modules also passed compilation in pure mode. New reading components are server-rendered; no package, font, large client dependency or additional WebGL scene was added.
- Real Chromium checks cover the homepage particle motion/reduced-motion state, MoS₂ default and material switching, chapter drawer/highlight/focus/history, citation-and-return navigation, research filters, three WebGL viewers and controls, all five simulator parameter controls, zero-drain-bias classification, transfer/output curves, saved scenarios and A/B edit/return/reload. Storage denial retains usable calculations and comparison links.
- Responsive verification passed 96 checks at 768×1024 and 390×844, with no horizontal overflow, blank pages, framework overlays, JavaScript page errors or unexpected console errors. All 16 settled chapter-position checks cleared the fixed header. Updated desktop and phone screenshots were inspected.

The local proxy prevents fetching some existing external scientific images, producing recorded image-optimizer errors in local Chromium; this is not reported as a clean resource console. The unchanged MoS₂ phase image was separately fetched successfully (HTTP 200) from the original production optimizer through Vercel. Image source/licence records remain intact. Some publisher papers were accessible only as metadata/abstracts; no uninspected full methods or performance data are claimed. Publication verification of the exact commit and original production alias is recorded separately in the release artifacts.


Actual-browser integration found a pre-existing directory reflow problem: after a desktop chapter jump, retracting the sidebar widened the text and moved several headings behind the fixed header. The shared AnchorNavigation owner now corrects the current target after that specific collapse, without adding history or moving focus. User scrolling/outside interaction and browser history restoration cancel/guard the correction. A regression test covers the alignment and restoration boundary; native browser checks cover the event wiring.
