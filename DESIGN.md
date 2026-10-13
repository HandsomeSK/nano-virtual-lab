---
version: alpha
name: Nano Virtual Lab
description: Public nanotechnology explanations and interactive instruments, inspired by a materials research exhibition and a measurement bench.
colors:
  background: "#000000"
  surface: "#111315"
  ink: "#F1F2F3"
  muted: "#A3A6AD"
  prose: "#D1D5DB"
  primary: "#80DEDC"
  signal: "#F1B87A"
  line: "#FFFFFF24"
  home-background: "#000000"
  home-ink: "#ffffff"
  home-navigation: "#f3f3f3"
  home-subheading: "#9a9a9a"
  home-secondary: "#d8d8d8"
  home-hairline: "rgba(255,255,255,.16)"
  home-focus: "#7fd4ff"
  home-button-ink: "#0a0a0a"
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

Runtime ownership is model B: src/app/globals.css holds semantic CSS variables and Tailwind mappings; src/app/experience.css holds the shared metal treatments. Frontmatter mirrors background, surface, ink, prose, muted, primary, signal and line. Homepage.module.css owns measured homepage geometry. Black #000 is forced in the first rule and body inline style. --text is white, --ink is #f1f2f3, --prose is #d1d5db, --muted is #a3a6ad; surfaces are charcoal. Cyan/teal and violet distinguish material/selected scientific roles; orange separates comparison curves. Text and line styles supplement color.

Deprecated --home-\* frontmatter entries remain descriptive aliases for the homepage black/white/gray roles. The live homepage uses the shared palette and scoped dimension tokens; it has no separate sky-gradient palette. Gradient metal is for navigation, buttons and instrument depth, not behind every paragraph. Borders are thin silver. No excessive glow or repeated floating cards.

## Typography

Inter variable roman is self-hosted with font-display: swap and owns UI, logo, prose and headings. The homepage heading is one phrase, “Explore nanomaterials.”, in uniform white Inter without a serif emphasis or tagline. Only Inter is preloaded; prior serif assets remain archived. Prose uses --prose #D1D5DB, distinct from metadata in --muted #A3A6AD. Theory paragraphs use 17px/1.8; challenge and discovery narratives use 16px/1.8. Numeric readouts use tabular figures. Long science prose aligns left and stays near 65–80 characters. ReferenceLink keeps a citation in the sentence, joined to its preceding text; source action links and citations share an inline group.

## Layout

Home adapts the supplied Vesper geometry with the owner's latest annotations: a three-column header, five metallic navigation pills, bottom-centered single-phrase copy, two actions and three capability links. Engineering Challenges is a peer category. Desktop >=901 px locks to one viewport; mobile <=900 px grows naturally and uses a full-screen menu. The menu owns vertical overflow on short screens, so all five destinations remain reachable. Existing size/height breakpoints remain.

Interior pages keep the document as scroll owner, with a 1440 px container and 48/24/16 px insets. Editorial research uses indexed chapters and open text rows. MoS₂ has a material workbench and a featured discovery; old fragments/widgets remain in a disclosure that fragment navigation opens. Tools reserve stage/plot geometry, then place controls and an inspector. Under 900 px the inspector follows the stage. Tables own horizontal overflow. Native selectors remain platform-owned.

## Elevation & Depth

Only navigation/buttons, selected elements and scientific instruments use metallic or frosted surfaces. Articles use rules and whitespace. Source figures stay complete on a white plate when needed; never invert, crop or recolor a licensed NC-ND image. Scientific ball-and-stick visuals use real geometry rather than raster artwork. The homepage uses an original silver-white Canvas 2D volume of twisting, depth-lit particles over black, replacing the abruptly restarting video. A static stippled SVG remains visible without JavaScript or Canvas.

## Shapes

Controls and navigation use 6/7 px corners; instruments use 12 px. Sphere sizes and device thicknesses are explicitly illustrative. No imaginary particle-orbit decorations, paid components, Lottie or video-driven scientific models.

## Components

Canonical owners: NanoNavigation for all five-category navigation, HomeMotion for decorative particles, ReferenceLink for inline citations, Brand for the Inter NanoLab mark, PageShell/SectionHeading for article titles, ParameterControl and IVChart for existing models, AtomicWorkbench/DeviceViewer for science controls, ScientificStage/ScientificCanvas for deferred WebGL, and ScientificFigure/ReferenceBrowser for evidence and rights. UX-CONTRACT.md defines native selection, forms, storage and source lookup.

Links: Materials /foundations; 3D Lab /lab; Simulators /simulator; Discoveries /research; Engineering Challenges /challenges. The silver header action goes to /foundations. Footer/context links preserve all original routes. Buttons perform actions; real links navigate. Menus close on Escape, navigation and desktop resize; background becomes inert while open, focus stays in the header and Escape restores the burger. Selection and visibility are distinct operations. Hover/focus increase contrast; labels, checked states and descriptions remain visible.

## Motion & resilience

Homepage CSS entrances run once, keep resting opacity 1, finish to is-in and recover after two requestAnimationFrames if animation APIs do not run. Ambient particle motion evolves continuously with no video rewind or shared timeline reset. Per the owner's explicit request, there is no pause button. System reduced motion freezes the decorative scene; hidden/offscreen frames stop and resume from the same phase. Rendering is capped at 30fps and DPR 1.5, with at most 72,000 dots on desktop and 22,000 on phones. No Three.js or Anime.js enters the homepage bundle. The particle field is decorative art, not a scientific simulation.

Scientific routes defer Three.js/Anime.js until a stage approaches view. Anime.js 4 animates assembly reveal, inspection separation/explosion and camera positioning, not physical particle dynamics. Frames are requested only for interaction/resize/animation; offscreen or hidden motion pauses. Reduced motion finalizes immediately. Instanced geometry, bounded DPR, antialiasing, procedural lighting/environment and disposal keep the scene sharp and bounded. WebGL/chunk/context failures offer a static schematic with native controls/descriptions. Touch orbit is opt-in; page scrolling remains available. Keyboard arrows, zoom and camera buttons provide gesture alternatives. Yaw is unrestricted and pitch reaches the underside. Graphene has sheet, C–C bond and three-neighbour views derived from the same ideal lattice. The shared device renderer uses gold electrodes, transparent teal HfO₂, an enlarged S–Mo–S motif and separate SiO₂/Si support layers. Material examples cite the 2011 device; the carbon-dot comparison cites the distinct 2026 study. The lab embeds this canonical viewer directly, while the middle homepage capability opens /device.

## Do's and Don'ts

- Preserve the classical solver, storage schema, saved comparisons and existing science widgets.
- Keep experiment, illustration and model results visibly distinct; citation and measurement context accompany quantitative claims.
- Treat EOT as capacitance-equivalent, not physical film thickness; distinguish gate, channel and transfer lengths.
- Do not reconstruct unavailable experimental coordinates, invent curves or use generated images as evidence.
- Research cutoff is 13 October 2026, not a claim to list every latest paper.
- Publish checked updates through main to the original production URL under AGENTS.md standing authorization.
