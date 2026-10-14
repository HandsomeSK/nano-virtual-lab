# Research knowledge hub and navigation update

The owner’s 14 October 2026 brief asks for explanation-led scientific content, traceable evidence, grouped navigation and predictable reading positions. The existing midnight-blue palette, Inter typography, metal controls, particle field and scientific instruments remain the design baseline. The evidence review cutoff stays 13 October 2026; this update does not claim a new literature search covering every subsequent publication.

## Pages and shared components

Research is the main content change. Foundations, MoS₂, Device, Challenges, the interface discovery and About receive related-link or citation cleanup. Comparison and the simulator retain their calculations and controls; their URL updates now preserve history state. The Lab’s material URL update receives the same history correction.

- `research/page.tsx`, `DiscoverySynthesis` and `research-knowledge.ts` organize the knowledge hub.
- `ResearchExplorer` preserves the catalogue, timeline, filters and detailed evidence.
- `ReferenceLink`, `ReferenceBrowser`, `ReferenceAccess` and `referenceResources` separate numbered citations from publication access.
- `NanoNavigation` and `navigation.ts` own the five categories and all submenu destinations.
- `AnchorNavigation` and `navigation-scroll.ts` own explicit navigation intent and scroll correction.
- `RelatedTopics` and existing page components provide fewer, more relevant continuation links.

The three new scoped stylesheets are `navigation-menu.css`, `research-hub.css` and `research-evidence.css`. They extend the existing UI rather than replacing the theme or scientific colours. No dependency or model-data changes are needed.

## Research structure

1. **Research Overview:** how channel structure, interfaces, contacts and fabrication connect material properties to working devices.
2. **Research Directions:** Dielectric Integration; Stacking & Band Structure; Contact Engineering; Scaling & Electrostatics; Deformable Electronics; Circuit Integration. Each explains the mechanism and engineering challenge before presenting the existing source-backed finding, limitations and next question.
3. **Research Connections:** interface quality and gate control; channel scaling and carrier injection; crystal design and fabrication; repeatable circuits and deformation.
4. **Research Evidence:** the featured interface discovery, existing interactive timeline, compact study catalogue and separately identified institutional integration announcement.

NanoLab’s explanatory synthesis is labelled separately from reported evidence. Quantitative findings keep their sources and conditions. EOT remains capacitance-equivalent; physical gate length, channel length, transfer length and circuit pitch are not interchangeable. An engineered direct-gap bilayer is not generalized to every bilayer, and wafer-scale research is not described as commercial production.

All existing study fields remain available. Catalogue entries initially show title, year, research theme/category, the original one-sentence contribution and a visible reference number. Expanding an entry reveals Research Question, Method or Evidence, Main Findings, Significance and Limitations, including its original image and related topics. A selected query or legacy study fragment opens that study; the first paper is no longer opened automatically.

Existing `year`, `category` and `study` query values remain compatible. Historical category values are labelled **Research category** to distinguish them from the six explanatory directions. Modern papers reuse the existing theme associations, rather than receiving speculative classifications.

## Citation and link rules

Numbered citations remain visible in prose and compact catalogue summaries. Full authors, venue, DOI, notes and publication access are centralized in the reference browser. Matching DOI and publisher article URLs produce one **Read publication** link. Distinct author-hosted full texts, manuscripts and institutional resources remain separate.

Repeated DOI/source buttons were removed from study cards and the interface discovery. Repeated Device, Simulator, Research and generic Home continuation links were reduced where the page already provides the same destination. Meaningful scientific foundations and engineering connections remain.

Scientific image links still distinguish the original figure, its licence and the associated article. These serve different provenance purposes and are retained. Bibliography IDs, citation numbers, return URLs, all legacy scientific section IDs and all original images are preserved.

## Five submenu categories

| Category | Groups and actual destinations |
| --- | --- |
| Materials | Material fundamentals: overview, nanoscale, quantum/bands, characterization. Two-dimensional materials: graphene structure/electronics, MoS₂ overview and properties. |
| 3D Lab | Atomic structures: Lab overview, graphene/carbon bonds, MoS₂ layers/stacking. Device inspection: embedded transistor, Device explorer and gate working principle. |
| Simulators | Interactive models: overview, bias/parameters, result interpretation and assumptions. Comparison/context: configurations, saved scenarios, benchmarking limits and measured transfer curves. |
| Discoveries | Knowledge hub: overview, directions, connections and evidence. Discoveries/studies: feature, timeline, catalogue and the existing interface detail page. |
| Engineering Challenges | Device control: overview, contacts and dielectric/interface. Reliable circuits: short-channel effects and manufacturing/integration. |

The canonical URLs and fragment identifiers live in `src/lib/navigation.ts`. Parent titles remain real category-home links; a separate button expands their submenu. Desktop hover opens one panel, with a 160 ms close grace and 220 ms opacity/translate motion. Moving into the panel does not close it. Mouse-opened panels close after the pointer leaves; keyboard browsing can retain a focused panel.

ArrowDown enters the submenu; Tab uses the native link order; Escape closes and restores focus. Mobile keeps the hamburger panel, direct category links and independent expand buttons. Groups expand within the scrollable panel; hidden submenus are inert. Reduced motion removes the transition.

## Scroll cause and correction

Next.js normally decides whether the new page is already visible before scrolling. In the existing persistent layout, a new page can retain a previous bottom position. Global smooth scrolling also applied to route changes. The old anchor effect re-ran on pathname/hash changes, including historical navigation, and synthetic widget hash notifications could unexpectedly move the reader.

The shared manager records only ordinary same-origin link activations, preserving modified clicks, downloads and external navigation. After a forward route commits, it corrects the new page once: immediately to the top, or to an explicit fragment after its streamed target exists. Collapsed ancestors open before fragment positioning; keyboard focus moves to the destination without a second scroll.

Same-page anchors use smooth motion, with an instant reduced-motion alternative. Same-page query-only links preserve their previous reading position; native filter and parameter updates trigger no manager scrolling. `popstate` cancels pending corrections and leaves Back/Forward restoration to the browser. Synthetic hash state notifications do not scroll. The document uses `scroll-behavior: auto`; only explicit in-page navigation requests smooth motion.

The existing 90 px scroll padding and 16 px section margin preserve room below the sticky header. Research timeline and Challenge overview controls explicitly request their intended same-page scroll. History state is retained in research, challenge, simulator, comparison and Lab controls.

## Validation and remaining limits

- `npm run lint` and `npm run typecheck` pass.
- 41 tests pass, including scroll/history intent, delayed fragment targets, reduced motion, synthetic notifications, keyboard destination focus, pointer-close rules, submenu destinations, source deduplication, research evidence integrity and the original scientific model/particle tests.
- The strict design audit passes. Source-rendered HTML checks include every route and selected, empty, invalid and legacy query/fragment variants; internal route/fragment and duplicate-ID checks pass.
- The particle renderer, 3D scene/geometry/material definitions, calculation and persistence libraries, bibliography, figure registry and study data retain their original Git blobs.
- Local `npm run build` was attempted but is blocked when Next.js receives empty output from its detached TypeScript subprocess. Vercel preview and production build results, the tested tree and domain assignment are recorded in the release PR and verification artifacts.
- This environment rejects local socket/listener operations and Chromium launch. Source rendering and unit tests are not browser interaction tests. Desktop hover travel, touch, real browser history/scroll timing, hydration, responsive screenshots and open native-select behaviour could not be exercised here.

Publication follows the owner’s previously recorded standing authorization for checked updates to the existing GitHub/Vercel project and original production address.
