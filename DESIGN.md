---
version: alpha
name: Nano Virtual Lab
description: Public nanotechnology explanations and interactive instruments, inspired by a materials research exhibition and a measurement bench.
colors:
  background: "#F5F7F7"
  surface: "#FFFFFF"
  ink: "#172C32"
  muted: "#506269"
  primary: "#086C70"
  signal: "#AE5A25"
  line: "#D4DEDF"
typography:
  sans:
    fontFamily: '"DM Sans Variable", Arial, sans-serif'
  display:
    fontFamily: '"Instrument Serif", Georgia, serif'
rounded:
  control: "0.375rem"
  instrument: "0.75rem"
spacing:
  section: "3rem"
  page-max: "90rem"
components:
  button:
    height: "2.75rem"
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.control}"
  scientific-figure:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.muted}"
  page:
    backgroundColor: "{colors.background}"
    textColor: "{colors.ink}"
  comparison-curve-b:
    textColor: "{colors.signal}"
  section-rule:
    backgroundColor: "{colors.line}"
---

# Nano Virtual Lab design context

## Overview

The platform is an independent public Nanotechnology Virtual Laboratory. Its primary task is to connect an atomic structure, its electronic properties and a device response. The current user brief authorizes a substantial presentation redesign while preserving the scientific content and calculation model.

Use the visual language of a materials exhibition and a measurement bench: a generous scientific title, tangible atomic diagrams, readable technical prose and clearly separated instrument controls. The homepage is expressive; the knowledge and research routes are editorial; Device, Simulator and Comparison are tools. English is the public language. No university affiliation or course identity is implied.

The memorable move is the oversized, regular serif Nanomaterials title beside the atomic-material illustration. The rest of the interface uses a quiet sans-serif hierarchy. Avoid a generic card dashboard, a newspaper imitation, cream-and-clay styling, or dark neon technology branding.

## Colors

Runtime CSS in `src/app/globals.css` remains the canonical token source (mapping model B). Frontmatter mirrors the accepted values. `--bg`, `--surface`, `--ink`, `--muted`, `--primary`, `--orange-ink` and `--line` map respectively to background, surface, ink, muted, primary, signal and line above. Tailwind's existing `@theme inline` maps these variables to utilities; shared components consume the same roles.

Paper-white content on a mineral-gray document surface supports scientific reading. Deep green-black text carries structure; teal indicates actions and selection. Orange distinguishes a second curve or a physical caution. Existing violet/cyan atom colors remain meaningful material encodings, not decorative page washes. Status and scientific chart colors retain text or line-style alternatives.

## Typography

`--font-sans` owns DM Sans, already hosted locally. `--font-display` owns Instrument Serif, also already installed and locally hosted; use it for page-level display headings, not form labels or numeric output. Headings align left, body lines stay near 65–78 characters, and numerical controls/readouts use tabular digits. Use normal case for navigation and scientific labels. No tracked uppercase ornament labels.

## Layout

The container is at most 1440 px with 48 px desktop insets, 24 px tablet and 16 px narrow-phone insets. The document owns vertical scrolling. Ordinary prose grows with content; no large minimum-height sections.

Home pairs a compact title/illustration with an asymmetric introduction, then an open two-column sequence and a large workbench feature. Foundations has a quiet side directory and an article stream with embedded experiments. Research separates study prose from contextual links. Challenges pairs a mechanism diagram with its explanation. Simulator places the plot/readouts before a 300 px parameter rail; under 900 px, the plot, controls and save bar stack. Device pairs a bounded 3D stage with a part inspector. Tables have their own visible horizontal scroll on narrow screens.

The base spacing rhythm is 6, 12, 18, 24, 36 and 48 px. Section gaps are usually 48 px; internal groups use 12–24 px. A two-column scientific diagram never crops its axes or annotations. Media geometry is reserved from verified intrinsic dimensions when available.

## Elevation & Depth

Static articles, navigation lists, references and related links have no shadows. Borders communicate section boundaries, not a box around every paragraph. Instruments can have one contained neutral surface. Dropdown menus use a small shadow to indicate their overlay relationship. No background gradients, glass effects or gratuitous hover lifts.

## Shapes

6 px radius is for controls; 12 px radius is for an instrument surface. Articles and figures are open layouts. Material atoms, sphere demonstrations and circular physical diagrams preserve their meaningful shape. A source image remains complete, unmodified and legible; NC-ND figures are never cropped or recolored.

## Components

Shared owners: `PageShell` for page titles, `SectionHeading` for article headings, `ScientificFigure` for evidence/media/rights, `ParameterControl` for numerical controls, `IVChart` for curves, `ReferenceBrowser` for source lookup, and `SiteHeader`/`SiteFooter` for navigation.

Primary buttons are solid teal; secondary buttons are a quiet outlined surface. Hover increases contrast, focus-visible uses an offset teal outline, disabled controls remain noninteractive, and pressed controls have text/ARIA state as well as color. Native selects keep platform-owned popups; the product does not promise custom popup geometry. Search includes an accessible clear action. Inputs keep real labels, help text and names.

Global scrollbar roles live in `globals.css`: visible thumb/track, hover/active tokens, standard properties and WebKit fallback, with a forced-colors path. No opt-in scrollbar utility is required.

Scientific images use Next.js optimization, descriptive alternatives and accessible captions. All source, author, licence and modification metadata remains available. Existing remote-source hosting restrictions are a verification limitation, not a reason to substitute images or remove attribution.

Motion answers an interaction or depicts carrier flow. No floating hero animation or scrolling reveal sequence. Reduced motion disables nonessential animation. Instrument drag has keyboard and button alternatives. Existing mathematical units, model boundaries, saving, comparison, URL state and storage contracts stay intact; see `docs/scientific-evidence.md` and `UX-CONTRACT.md`.

## Do's and Don'ts

- Do choose layout by content: article, material figure, plot, parameter rail or bibliography.
- Do keep an experimental figure separate from the unfitted educational simulation.
- Do retain Silicon and Beyond Silicon scientific content and brand references outside the specifically requested homepage subtitle.
- Don't turn every section into an equal rounded card or center long technical paragraphs.
- Don't change formulas, parameters, model defaults or state behavior to support a visual treatment.
- Don't promote this review branch to production without the user's confirmation.
