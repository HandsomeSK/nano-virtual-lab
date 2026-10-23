# Full-site review — 23 October 2026

## Scope

Reviewed the current site from baseline `586b5a486aaf8d781b1e467191e3b10d2a56e252`, using the owner's latest information architecture, left-side directory, unified Lab, scientific-source and selective readability requirements. This is the broader site review previously deferred during the scientific analysis work.

The five primary modules retain their canonical pages. Multi-page categories have page-only dropdowns; Lab and Engineering Challenges remain direct links. Unique scientific explanations, the three continuous Lab models, saved scenarios, query/fragment compatibility and existing images remain in place. No new page, dependency or numerical model was needed.

## Corrections

| Finding | Result |
| --- | --- |
| Resizing across the mobile breakpoint could hide a focused header control and leave keyboard focus on the document body. | Focus moves to the visible menu button, Home link or relevant category toggle. Focus outside the header stays in place. A regression test covers the actual component's breakpoint listener and cleanup. |
| Resting scrollbar thumbs had only about 2.20:1 contrast against their track. | The existing scrollbar token now uses `#667D99`, giving about 3.98:1 against `#111E2D`; hover, active and system-colour fallbacks remain. |
| The missing-page button said “Return to the lab” while linking to Home. | Its label and explanation now clearly identify Home. |
| Current design/development documentation still named the older research cutoff. | README and DESIGN now agree with the existing 21 October research cutoff. README also names the graphene capacitance-test structure behind the plotted EOT and distinguishes the MoS₂ transistor measurements. Historical release records retain their original dates. |

## Content and structure review

- All 52 bibliography IDs are unique and have complete metadata. The eight registered external figures retain their source, licence, attribution and modification records.
- Fresh primary-source checks supported the Raman measurement conditions, graphene/MoS₂ EOT distinction, early-version publication qualifier, stacking/stretchable research claims and correction notices. No substantive scientific rewrite was justified. This does not represent a full-text rereading of every cited paper or a reproduction of the experiments.
- The rendered link review covered 11 routes, 875 links and 207 citation links. It found no missing internal routes, anchors or citation-return targets, duplicate IDs, missing image alternatives, unsafe new-tab links or hydrated heading-level skips.
- Material comparison, A/B simulation and research timeline/catalogue keep their distinct jobs. Existing contextual entrances reach the appropriate theory, model, study or engineering section.

## Verification

`npm run lint`, `npm run typecheck`, all 93 tests and `npm run build` passed. The design strict audit and DESIGN lint passed without findings.

Rendered baseline checks covered all 11 routes at 1440, 900, 470, 390 and 320px: 55 page checks, 12 deep-section checks and 12 directory-selection/reopen checks. No document horizontal overflow or JavaScript page errors were found. The final build received targeted navigation, recovery and responsive rechecks.

The 53 functional browser assertions covered simulator parameter trends and invalid-input recovery, save/reload, A/B edit-return, denied storage, Raman validation, signed photocurrent and power-unit handling, and MoS₂/device model controls. Seven final navigation assertions verified breakpoint focus, menu dismissal, restored background access and directory selection. Both desktop and phone missing-page checks returned 404, retained noindex and navigated Home successfully.

Computed styles confirm the new scrollbar contrast, unchanged root typography, normal decorative motion, reduced-motion freezing and forced-colour fallbacks. Homepage particles, metallic title and material motifs retain their established design.

Browser checks used installed Playwright/Chromium because the Browser plugin was unavailable. External scientific image pixels were blocked by the local network policy; image-source availability is checked separately on the production deployment. Safari, physical devices and experimental reproducibility are outside this review's verification coverage.
