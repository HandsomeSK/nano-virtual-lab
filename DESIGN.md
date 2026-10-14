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

Inter variable roman is self-hosted with font-display: swap and owns UI, logo, prose and headings. The homepage heading is one phrase, “Explore nanomaterials”, in uniform light Inter without a serif emphasis or tagline. Only Inter is preloaded; prior serif assets remain archived. Prose uses --prose #D6E1EF, distinct from metadata in --muted #A9B9CE. Theory paragraphs use 17px/1.8; challenge and discovery narratives use 16px/1.8. Numeric readouts use tabular figures. Long science prose aligns left and stays near 65–80 characters. ReferenceLink keeps a visible numeric citation in the sentence, joined to its preceding text. The reference browser owns full publication metadata and external access. ReferenceAccess merges duplicate DOI/publisher links while retaining distinct full texts and institutional resources. Source figure, licence and article links remain separate when they serve different purposes.

## Layout

Home adapts the supplied Vesper geometry with the owner's latest annotations: a three-column header, five metallic navigation pills, bottom-centered single-phrase copy, two actions and three capability links. Engineering Challenges is a peer category. Desktop >=901 px locks to one viewport; mobile <=900 px grows naturally and uses a full-screen menu. The menu owns vertical overflow on short screens, so all five destinations remain reachable. Existing size/height breakpoints remain.

Interior pages keep the document as scroll owner, with a 1440 px container and 48/24/16 px insets. Research is a knowledge hub: overview, six explanation-led research directions, four cross-topic connections, then featured evidence, a timeline and a compact study catalogue. Existing direction anchors and URL filters remain. Full study analysis is disclosed on demand; an explicitly selected deep-linked study opens initially. Articles use text and rules rather than repeated cards. MoS₂ has a material workbench and a featured discovery; old fragments/widgets remain in a disclosure that fragment navigation opens. Tools reserve stage/plot geometry, then place controls and an inspector. Under 900 px the inspector follows the stage. Tables own horizontal overflow. Native selectors remain platform-owned. The size-scale instrument connects each example circle, name and size into one selectable control; its slider and live preview share the same logarithmic state. The transistor inspector keeps material examples visible and places full role/model explanations in native disclosures, with model notes spanning the workbench. The simulator evidence figure retains its complete source image in a maximum 460 px column beside caption and provenance, stacked on phones. These are the owner’s explicit layout exceptions to the colour-only brief. Editorial headings omit final periods; sentence and bibliography punctuation remains intact.

## Elevation & Depth

Only navigation/buttons, selected elements and scientific instruments use metallic or frosted surfaces. Articles use rules and whitespace. Source figures stay complete on a white plate when needed; never invert, crop or recolor a licensed NC-ND image. Scientific ball-and-stick visuals use real geometry rather than raster artwork. The homepage uses an original silver-white Canvas 2D volume of twisting, depth-lit particles over midnight blue, replacing the abruptly restarting video. A static stippled SVG remains visible without JavaScript or Canvas.

## Shapes

Controls and navigation use 6/7 px corners; instruments use 12 px. Sphere sizes and device thicknesses are explicitly illustrative. No imaginary particle-orbit decorations, paid components, Lottie or video-driven scientific models.

## Components

Canonical owners: NanoNavigation for all five-category navigation, HomeMotion for decorative particles, ReferenceLink for inline citations, Brand for the Inter NanoLab mark, PageShell/SectionHeading for article titles, ParameterControl and IVChart for existing models, AtomicWorkbench/DeviceViewer for science controls, ScientificStage/ScientificCanvas for deferred WebGL, and ScientificFigure/ReferenceBrowser for evidence and rights. UX-CONTRACT.md defines native selection, forms, storage and source lookup.

Links: Materials /foundations; 3D Lab /lab; Simulators /simulator; Discoveries /research; Engineering Challenges /challenges. The silver header action goes to /foundations. Footer/context links preserve all original routes. Buttons perform actions; real links navigate. Each category has two grouped submenu columns. Desktop pointer hover opens one submenu, with 160 ms close grace and a 220 ms opacity/translate transition. Parent links still navigate; separate buttons support keyboard and touch. ArrowDown enters a submenu, Escape restores its trigger, and Tab follows native links. Mobile keeps the full-screen, scrollable hamburger panel and expands groups inline. Background becomes inert while the mobile panel is open and Escape restores the burger. Selection and visibility are distinct operations. Hover/focus increase contrast; labels, checked states and descriptions remain visible.

## Motion & resilience

Homepage CSS entrances run once, keep resting opacity 1, finish to is-in and recover after two requestAnimationFrames if animation APIs do not run. Ambient particle motion evolves continuously with no video rewind or shared timeline reset. Per the owner's explicit request, there is no pause button. System reduced motion freezes the decorative scene; hidden/offscreen frames stop and resume from the same phase. Rendering is capped at 30fps and DPR 1.5, with at most 72,000 dots on desktop and 22,000 on phones. No Three.js or Anime.js enters the homepage bundle. The document uses automatic scroll behaviour; explicit same-page anchors request smooth motion (instant under reduced motion). Shared AnchorNavigation records forward-link intent and corrects new route top/fragment positioning once after commit. Browser history restoration is left to the platform, and query-only updates retain reading position. Synthetic hash state notifications do not trigger scrolling. The particle field is decorative art, not a scientific simulation.

Scientific routes defer Three.js/Anime.js until a stage approaches view. Anime.js 4 animates assembly reveal, inspection separation/explosion and camera positioning, not physical particle dynamics. Frames are requested only for interaction/resize/animation; offscreen or hidden motion pauses. Reduced motion finalizes immediately. Instanced geometry, bounded DPR, antialiasing, procedural lighting/environment and disposal keep the scene sharp and bounded. WebGL/chunk/context failures offer a static schematic with native controls/descriptions. Touch orbit is opt-in; page scrolling remains available. Keyboard arrows, zoom and camera buttons provide gesture alternatives. Yaw is unrestricted and pitch reaches the underside. Graphene has sheet, C–C bond and three-neighbour views derived from the same ideal lattice. The shared device renderer uses gold electrodes, transparent teal HfO₂, an enlarged S–Mo–S motif and separate SiO₂/Si support layers. Material examples cite the 2011 device; the carbon-dot comparison cites the distinct 2026 study. The lab embeds this canonical viewer directly, while the middle homepage capability opens /device.

## Do's and Don'ts

- Preserve the classical solver, storage schema, saved comparisons and existing science widgets.
- Keep experiment, illustration and model results visibly distinct; citation and measurement context accompany quantitative claims.
- Treat EOT as capacitance-equivalent, not physical film thickness; distinguish gate, channel and transfer lengths.
- Do not reconstruct unavailable experimental coordinates, invent curves or use generated images as evidence.
- Research cutoff is 13 October 2026, not a claim to list every latest paper.
- Publish checked updates through main to the original production URL under AGENTS.md standing authorization.
