---
version: alpha
name: Nano Virtual Lab
description: Public nanotechnology explanations and interactive instruments, inspired by a materials research exhibition and a measurement bench.
colors:
  background: "#111E2D"
  surface: "#1B2B40"
  ink: "#F5F8FF"
  muted: "#A9B9CE"
  prose: "#D6E1EF"
  primary: "#85D7FF"
  signal: "#F1B87A"
  line: "#40556D24"
  home-background: "#0C1524"
  home-ink: "#F5F8FF"
  home-navigation: "#F5F8FF"
  home-subheading: "#A9B9CE"
  home-secondary: "#D6E1EF"
  home-hairline: "rgba(64,85,109,.16)"
  home-focus: "#85D7FF"
  home-button-ink: "#111E2D"
typography:
  sans:
    fontFamily: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  display:
    fontFamily: '"Inter", system-ui, sans-serif'
  cinematic:
    fontFamily: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
rounded:
  control: "0.375rem"
  instrument: "0.75rem"
spacing:
  section: "3rem"
  page-max: "90rem"
components:
  button:
    height: "2.75rem"
    backgroundColor: "{colors.home-ink}"
    textColor: "{colors.home-button-ink}"
    rounded: "{rounded.control}"
  scientific-figure:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.muted}"
  page:
    backgroundColor: "{colors.background}"
    textColor: "{colors.ink}"
  science-prose:
    textColor: "{colors.prose}"
  comparison-curve-b:
    textColor: "{colors.signal}"
  section-rule:
    backgroundColor: "{colors.line}"
  home-primary:
    backgroundColor: "{colors.home-ink}"
    textColor: "{colors.home-button-ink}"
  home-page:
    backgroundColor: "{colors.home-background}"
    textColor: "{colors.home-ink}"
  home-focus-indicator:
    backgroundColor: "{colors.home-focus}"
  home-navigation:
    textColor: "{colors.home-navigation}"
  home-subheading:
    textColor: "{colors.home-subheading}"
  home-secondary:
    textColor: "{colors.home-secondary}"
  home-divider:
    backgroundColor: "{colors.home-hairline}"
---

# NanoLab design context

## Overview

An independent public Nanotechnology Virtual Laboratory. English is the sole UI language; no course or university identity is implied. This is a hybrid: an expressive single-viewport marketing gateway, editorial science/research and usable scientific instruments. The 13 October 2026 brief supersedes the prior Vexel homepage and light exhibition palette.

## Colors

Runtime ownership is model B: src/app/globals.css holds semantic CSS variables and Tailwind mappings; src/app/experience.css holds the shared metal treatments. Frontmatter mirrors the runtime palette. Interior backgrounds use #111E2D, home uses #0C1524, viewer panels use #1B2B40 and navigation uses #26384A. Borders use #40556D with existing alpha values preserved. Main text is #F5F8FF, prose #D6E1EF, metadata #A9B9CE, primary UI accent #85D7FF and secondary accent #70E0D2. Route viewport colours match their backgrounds.

The Midnight Blue + Arctic Blue update preserves typography, dimensions, breakpoints, gradient angles/stops, alpha values, shadow geometry and animation timing. Scientific colours have separate ownership: --plot-primary remains #80DEDC; local scientific SVG variables retain their previous fills, strokes and labels. Atom, bond, material and data colours stay unchanged. Homepage.module.css continues to own homepage geometry, while HomeMotion and its particle renderer remain unchanged. Metal treatments remain confined to controls and instruments.

## Typography

Inter variable roman is self-hosted with font-display: swap and owns UI, logo, prose and headings. The homepage heading is one phrase, “Explore Nanomaterials”, in uniform 600-weight Inter, enlarged to about 72px at a 1413px viewport. A banded silver/steel base carries a broad white reflection with darker flanks across the full title. Each 4.8-second cycle has one 2.4-second pass and a 2.4-second quiet interval; the first pass begins after 0.35 seconds. The inner highlight layer is independent of entrance cleanup; solid-colour, reduced-motion and high-contrast fallbacks stay readable. The supplementary badge is removed. Only Inter is preloaded; prior serif assets remain archived. Prose uses --prose #D6E1EF, distinct from metadata in --muted #A9B9CE. Theory paragraphs use 17px/1.8; challenge and discovery narratives use 16px/1.8. Foundations section numbers and titles share one inherited size: 27px on wide screens and 24px on phones. Engineering Challenges uses consecutive 01–08 numbers within its eight main headings; numbers match their title size and stay beside the first line when the text wraps. Numeric readouts use tabular figures. Long science prose aligns left and stays near 65–80 characters. ReferenceLink keeps a visible numeric citation in the sentence, joined to its preceding text. The reference browser owns full publication metadata and external access. ReferenceAccess merges duplicate DOI/publisher links while retaining distinct full texts and institutional resources. Source figure, licence and article links remain separate when they serve different purposes.

## Layout

The Device page's experimental micrograph uses a 340px image column beside its caption and source credits. At 800px and below it stacks into one column with the full image centered and capped at 340px; the complete figure and original labels stay uncropped. This is a page-scoped layout using the shared ScientificFigure.

Home adapts the supplied Vesper geometry with the owner's latest annotations: a three-column header, five metallic navigation pills, bottom-centered single-phrase copy and two primary actions. The badge and bottom capability strip are removed. The primary action reads “Learn materials” and retains the Foundations destination. Desktop copy sits about 48px higher; shorter screens use a smaller lift, and the mobile position is retained. Engineering Challenges is a peer category. Desktop >=901 px locks to one viewport; mobile <=900 px grows naturally and uses a full-screen menu. The menu owns vertical overflow on short screens, so all five destinations remain reachable. Existing size/height breakpoints remain.

Interior pages keep the document as scroll owner, with a 1440 px container and 48/24/16 px insets. Shared page headings use the full content width, with the introduction beneath; titles wrap naturally only when their text exceeds the available space. Research overview starts with a short lead, then pairs an original transistor cross-section in an equal-width, equal-height desktop panel with three readable stages: material structure, device control and system integration. The six direction links are grouped within those explanations; synthesis/source context sits beneath the whole section. Research is a knowledge hub: a device framework, six explanation-led research directions, four cross-topic connections, then featured evidence, a timeline and a compact study catalogue. Each direction keeps its finding and unresolved limit visible; detailed mechanisms and next questions expand through a native disclosure. Direct study-analysis links and engineering-problem anchors distinguish the next reading step. Existing direction anchors and URL filters remain. The study catalogue groups the same papers into Materials, Devices, Scaling, Circuits and Manufacturing; the separate timeline keeps chronological order. Each category uses up to three compact summary columns on wide screens, two on tablets and one on phones, with fewer columns when only one or two papers are present. Expanded analysis spans its category grid so complete figures and explanations remain readable; an explicitly selected deep-linked study opens initially. Articles use text and rules rather than repeated cards. Engineering challenge diagrams sit above topic-specific measurement checks, paired with mechanisms and process tradeoffs; a new, separately sourced thermal-boundary case explains heat escape through a molecularly modified channel/support interface; source-backed operating-history examples distinguish trap cancellation from contact noise; an original complementary-inverter diagram introduces paired n-/p-type integration. The final outlook separates device yield, stress reliability and storage stability with cited evaluation guidance. These explanations reproduce no experimental curves and extend no simulator model. MoS₂ theory pairs a static structure figure with a featured discovery; old fragments/widgets remain in a disclosure that fragment navigation opens. Tools reserve stage/plot geometry, then place controls and an inspector. Under 900 px the inspector follows the stage. Tables own horizontal overflow. Native selectors remain platform-owned. The size-scale instrument presents nine cited examples, including carbon bond/lattice lengths, in a compact three-column grid (two on phones). Labels distinguish bonds, spacings, thicknesses, wavelengths and object sizes; selected examples expose their source. Tight logarithmic matching prevents nearby custom values being labelled as exact examples. Each example circle, name and size forms one selectable control; its slider and live preview share the same logarithmic state. The transistor inspector keeps material examples visible and places full role/model explanations in native disclosures, with one unified model-notes disclosure in the inspector. The simulator evidence figure retains its complete source image in a maximum 460 px column beside caption and provenance, stacked on phones. These are the owner’s explicit layout exceptions to the colour-only brief. The Foundations graphene illustration uses a 240px complete-image column beside its credit/caption, stacking on phones; source imagery and licence information remain intact. Editorial headings omit final periods; sentence and bibliography punctuation remains intact.

PageContents owns an always-visible, server-rendered index beneath the page introduction on Foundations, Research and Engineering Challenges. Foundations lists six numbered topics; Research groups eight destinations into ideas and studies; Challenges groups its eight numbered sections into device physics and integration/operation. Links use compact text and rules, with three columns for the single Foundations list, two grouped columns on wide screens and one column on phones. There are no side buttons, hidden panels, reserved reading rails or index-specific client state. Other pages omit the added index and retain their section IDs. The document remains the scroll owner; native fragment links reveal collapsed ancestors, focus the destination and preserve history. A same-document URL change also publishes a state-only hash notification so challenge selection remains in sync without a second scroll.

The second 18 October 2026 brief keeps “3D Lab” as the sole interactive scientific 3D destination and consolidates it into three continuous modules: Graphene atomic structure, MoS₂ atomic structure, and MoS₂ transistor & interface engineering. There is no Lab index, model submenu, model-category tab or disclosure hiding an entire model. Each module uses its own large viewer, controls, inspector, citations and limits, with consistent spacing. Viewers reserve 470px on desktop, 400px on tablet and 330px on phones; at 900px and below inspectors follow their viewer. Both atomic materials stay present; monolayer/bilayer, stacking and interface architecture remain local scientific controls. Device, Why MoS₂ and the interface article retain static cross-sections/structures, complete theory, evidence and source context rather than duplicate interactive viewers. The article's EOT plot stays separate from the conceptual interface drawing.

Each model keeps its essential controls, selected material, key dimensions and one-sentence state explanation visible. ModelExplanation supplies the detailed physics and citations in a default-closed native disclosure: a 48 px summary with a native marker, deep-blue surface and visible focus; its named keyboard-focusable region is at most 300 px high on desktop with a 75 ch text measure. At 900 px and below or with a coarse pointer, details return to ordinary document flow so nested scrolling cannot trap a touch gesture. The shared transistor has exactly one “Materials, scale & model limits” disclosure; it explains both gate operation and the carbon-dot study. Important scientific content remains available without clipping.

The canonical page hierarchy separates five categories, their four child pages and auxiliary About & References. Shared compact breadcrumbs sit before interior headings, wrap on narrow screens and render the current page as aria-current text. Category ownership controls header active state independently of dropdown contents. The footer groups children beneath their owning category, with About & References in a separate site-information landmark; it does not flatten every route into a primary page. Each principal page also exposes a small number of descriptive contextual next steps rather than relying only on the header or repeated decorative cards.

## Elevation & Depth

Only navigation/buttons, selected elements and scientific instruments use metallic or frosted surfaces. Articles use rules and whitespace. Source figures stay complete on a white plate when needed; never invert, crop or recolor a licensed NC-ND image. Scientific ball-and-stick visuals use real geometry rather than raster artwork. The homepage uses an original silver-white Canvas 2D volume of twisting, depth-lit particles over midnight blue, replacing the abruptly restarting video. A static stippled SVG remains visible without JavaScript or Canvas. A separate aria-hidden CSS layer paints very dim arctic-blue/teal edge light and a faint masked perspective grid below the transparent particle surface; the silver particle ribbon remains the focal element. The backing layer introduces no renderer changes or extra client JavaScript. Four very faint, unlabelled server-rendered lattice motifs sit at the hero edges: two carbon honeycomb fragments and two three-plane MoS₂ fragments from the canonical ideal geometry, staggered in size and position. Central masking and pointer-events:none protect the copy and actions. Independent slow drift and small-angle multi-axis rocking keep the structures readable without edge-on flips; reduced motion freezes them. These are decorative structural projections, not measurements or electron orbit models.

## Shapes

Controls and navigation use 6/7 px corners; instruments use 12 px. Sphere sizes and device thicknesses are explicitly illustrative. No imaginary particle-orbit decorations, paid components, Lottie or video-driven scientific models.

## Components

Canonical owners: NanoNavigation for all five-category navigation, HomeMotion for decorative particles, ReferenceLink for inline citations, Brand for the Inter NanoLab mark, PageShell/SectionHeading for article titles, PageContents for grouped page indices, AppreciationButton for the local header like, ParameterControl and IVChart for existing models, AtomicWorkbench/DeviceViewer for science controls, ModelExplanation for compact native scientific disclosures, page-hierarchy.ts/Breadcrumb for route ownership, ScientificStage/ScientificCanvas for deferred WebGL, and ScientificFigure/ReferenceBrowser for evidence and rights. UX-CONTRACT.md defines native selection, forms, storage and source lookup.

Links: Materials /foundations; 3D Lab /lab; Simulators /simulator; Discoveries /research; Engineering Challenges /challenges. The silver header action is a native Like NanoLab toggle with a stable label, visible heart feedback and pressed state. It stores a reversible, versioned preference on this device; denied storage keeps the choice for the current visit. It has no global count or remote mutation. Footer/context links preserve all original routes. Buttons perform actions; real links navigate. 3D Lab is a direct link, with no submenu or expand button on desktop or mobile. The other four categories retain two grouped submenu columns. Overview shortcuts are omitted because the category title already opens its home. Engineering Challenges includes all eight section destinations, grouped under Device physics and Integration & operation; thermal, operating-history and complementary-logic topics remain accessible from both desktop and mobile menus. Desktop pointer hover opens one submenu, with 160 ms close grace and a 220 ms opacity/translate transition. Parent links still navigate; separate buttons support keyboard and touch. ArrowDown enters a submenu, Escape restores its trigger, and Tab follows native links. Mobile keeps the full-screen, scrollable hamburger panel and expands groups inline. Background becomes inert while the mobile panel is open and Escape restores the burger. Selection and visibility are distinct operations. Hover/focus increase contrast; labels, checked states and descriptions remain visible.

## Motion & resilience

Homepage CSS entrances run once, keep resting opacity 1, finish to is-in and recover after two requestAnimationFrames if animation APIs do not run. Ambient particle motion evolves continuously with no video rewind or shared timeline reset. Per the owner's explicit request, there is no pause button. System reduced motion freezes the decorative scene and the new 24-second CSS light breathing; hidden/offscreen frames stop and resume from the same phase. Rendering is capped at 30fps and DPR 1.5, with at most 72,000 dots on desktop and 22,000 on phones. No Three.js or Anime.js enters the homepage bundle. The document uses automatic scroll behaviour; explicit same-page anchors request smooth motion (instant under reduced motion). Shared AnchorNavigation records forward-link intent and corrects new route top/fragment positioning once after commit. Browser history restoration is left to the platform, and ordinary query-only updates retain reading position. For legacy Lab material URLs without a fragment, initial entry or explicit cross-route navigation adds the matching #graphene/#mos2 with history.replaceState and focuses the existing section; all three models remain present. Explicit fragments take precedence, and unknown material values and back/forward restoration remain unchanged. Synthetic hash state notifications do not trigger scrolling. The particle field is decorative art, not a scientific simulation.

Lab defers Three.js/Anime.js until a stage approaches view. A viewer mounts within 200px of the viewport and is retained until it exits a wider 900px boundary; this prevents repeated initialization on small scrolls. Far-away canvases unmount and release GPU resources while each module retains its scientific controls and camera state. This bounds residency to nearby content without claiming a fixed context-count cap. Anime.js 4 animates assembly reveal, inspection separation/explosion and camera positioning, not physical particle dynamics. Frames are requested only for interaction/resize/animation; offscreen or hidden motion pauses. Reduced motion finalizes immediately. Instanced geometry, bounded DPR, antialiasing, procedural lighting/environment and disposal keep the scene sharp and bounded. WebGL/chunk/context failures offer a static schematic with native controls/descriptions. Touch orbit is opt-in; page scrolling remains available. Keyboard arrows, zoom and camera buttons provide gesture alternatives. Yaw is unrestricted and pitch reaches the underside. Graphene has sheet, C–C bond and three-neighbour views derived from the same ideal lattice. The shared device renderer uses gold electrodes, transparent teal HfO₂, an enlarged S–Mo–S motif and separate SiO₂/Si support layers. Material examples cite the 2011 device; the carbon-dot comparison cites the distinct 2026 study. One DeviceViewer lives only in Lab. Its channel-state controls and Standard / Without carbon dots / With carbon dots controls share one scene and camera; architecture changes toggle prebuilt geometry without changing the scene specification or mounting another Canvas. Standard uses a continuous ideal dielectric, while discontinuous oxide represents only the selected research control. Reset explicitly restores Standard, OFF, visible layers and the initial camera. Static article figures identify conceptual geometry separately from reported measurements. See docs/unified-3d-lab.md for ownership, legacy anchors and resource lifecycle.

## Do's and Don'ts

- Preserve the classical solver, storage schema, saved comparisons and existing science widgets.
- Keep experiment, illustration and model results visibly distinct; citation and measurement context accompany quantitative claims.
- Treat EOT as capacitance-equivalent, not physical film thickness; distinguish gate, channel and transfer lengths.
- Do not reconstruct unavailable experimental coordinates, invent curves or use generated images as evidence.
- Research cutoff is 13 October 2026, not a claim to list every latest paper.
- Publish checked updates through main to the original production URL under AGENTS.md standing authorization.
