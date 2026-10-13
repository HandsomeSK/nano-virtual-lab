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
  home-background: "#01061a"
  home-ink: "#ffffff"
  home-navigation: "rgba(238,242,255,.9)"
  home-subheading: "rgba(226,233,255,.74)"
  home-secondary: "rgba(212,236,255,.77)"
  home-hairline: "rgba(255,255,255,.19)"
  home-focus: "#7fd4ff"
  home-button-ink: "#0a0a0a"
typography:
  sans:
    fontFamily: '"DM Sans Variable", Arial, sans-serif'
  display:
    fontFamily: '"Instrument Serif", Georgia, serif'
  cinematic:
    fontFamily: '"Google Sans", "Product Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
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

# Nano Virtual Lab design context

## Overview

The platform is an independent public Nanotechnology Virtual Laboratory. Its primary task is to connect an atomic structure, its electronic properties and a device response. The current user brief authorizes a substantial presentation redesign while preserving the scientific content and calculation model.

Use the visual language of a materials exhibition and a measurement bench: a generous scientific title, tangible atomic diagrams, readable technical prose and clearly separated instrument controls. The homepage is expressive; the knowledge and research routes are editorial; Device, Simulator and Comparison are tools. English is the public language. No university affiliation or course identity is implied.

The homepage is a cinematic, single-viewport gateway specified by the owner's Vexel brief: a compact white NanoLab vector wordmark, centered three-link masthead and the two-line statement "Nanomaterials. Beyond graphene." above the exact supplied atmospheric video. Interior scientific pages retain the materials-exhibition and measurement-bench register. Avoid a generic card dashboard, a newspaper imitation, cream-and-clay styling, neon effects or extra homepage sections.

## Colors

Runtime CSS in `src/app/globals.css` remains the canonical token source (mapping model B). Frontmatter mirrors the accepted values. `--bg`, `--surface`, `--ink`, `--muted`, `--primary`, `--orange-ink` and `--line` map respectively to background, surface, ink, muted, primary, signal and line above. Tailwind's existing `@theme inline` maps these variables to utilities; shared components consume the same roles.

Paper-white content on a mineral-gray document surface supports scientific reading. Deep green-black text carries structure; teal indicates actions and selection. Orange distinguishes a second curve or a physical caution. Existing violet/cyan atom colors remain meaningful material encodings, not decorative page washes. Status and scientific chart colors retain text or line-style alternatives.

The homepage's separate semantic tokens are the --home-* variables in globals.css. They map directly to the matching home-* frontmatter colors; --home-font maps to typography.cinematic. homepage.module.css consumes these roles. The exact sky gradient is --home-sky: 90deg, #00061a at 0%, #01071b at 22%, #01071a at 45%, #010718 at 62%, #010614 at 80%, #020511 at 100%. This is an explicit, owner-requested homepage exception to the interior no-gradient rule, not a global theme replacement.

## Typography

The homepage uses locally hosted Google Sans 400 and 500, with the supplied fallback stack and font-display: block. Its two font files are preloaded; the SIL OFL licence ships beside them. The shared NanoLab wordmark uses original inline outlines from weight 500. The homepage's regular two-line headline follows the supplied --u scaling and restrained negative tracking; interior prose retains the families below.

`--font-sans` owns DM Sans, already hosted locally. `--font-display` owns Instrument Serif, also already installed and locally hosted; use it for page-level display headings, not form labels or numeric output. Headings align left, body lines stay near 65–78 characters, and numerical controls/readouts use tabular digits. Use normal case for navigation and scientific labels. No tracked uppercase ornament labels.

## Layout

The container is at most 1440 px with 48 px desktop insets, 24 px tablet and 16 px narrow-phone insets. The document owns vertical scrolling. Ordinary prose grows with content; no large minimum-height sections.

Home alone owns one viewport and has no document scrolling. Its centered masthead/copy and flexible bottom video field use the exact 1280×800 scale model, 82.98/318.68 flex weights, safe-area insets and tablet/portrait/short-landscape rules. The .cinematic-home marker scopes the chrome/scroll exceptions through :has; leaving Home restores the full shared navigation, footer and normal scrolling. Foundations has a quiet side directory and an article stream with embedded experiments. Research separates study prose from contextual links. Challenges pairs a mechanism diagram with its explanation. Simulator places the plot/readouts before a 300 px parameter rail; under 900 px, the plot, controls and save bar stack. Device pairs a bounded 3D stage with a part inspector. Tables have their own visible horizontal scroll on narrow screens.

The base spacing rhythm is 6, 12, 18, 24, 36 and 48 px. Section gaps are usually 48 px; internal groups use 12–24 px. A two-column scientific diagram never crops its axes or annotations. Media geometry is reserved from verified intrinsic dimensions when available.

## Elevation & Depth

Static articles, navigation lists, references and related links have no shadows. Borders communicate section boundaries, not a box around every paragraph. Instruments can have one contained neutral surface. Dropdown menus use a small shadow to indicate their overlay relationship. No background gradients, glass effects or gratuitous hover lifts.

## Shapes

6 px radius is for controls; 12 px radius is for an instrument surface. Articles and figures are open layouts. Material atoms, sphere demonstrations and circular physical diagrams preserve their meaningful shape. A source image remains complete, unmodified and legible; NC-ND figures are never cropped or recolored.

## Components

Shared owners: `PageShell` for page titles, `SectionHeading` for article headings, `ScientificFigure` for evidence/media/rights, `ParameterControl` for numerical controls, `IVChart` for curves, `ReferenceBrowser` for source lookup, and `SiteHeader`/`SiteFooter` for navigation.

The shared Brand component displays a filled NanoLab SVG with the accessible home-link name "NanoLab home"; it has no explanatory subtitle. Home uses three real destinations: Explore and the primary action go to /foundations, Simulator and the secondary action go to /simulator, and Research goes to /research. All deeper content stays accessible through the interior navigation.

Primary buttons are solid teal; secondary buttons are a quiet outlined surface. Hover increases contrast, focus-visible uses an offset teal outline, disabled controls remain noninteractive, and pressed controls have text/ARIA state as well as color. Native selects keep platform-owned popups; the product does not promise custom popup geometry. Search includes an accessible clear action. Inputs keep real labels, help text and names.

Global scrollbar roles live in `globals.css`: visible thumb/track, hover/active tokens, standard properties and WebKit fallback, with a forced-colors path. No opt-in scrollbar utility is required.

Scientific images use Next.js optimization, descriptive alternatives and accessible captions. All source, author, licence and modification metadata remains available. Existing remote-source hosting restrictions are a verification limitation, not a reason to substitute images or remove attribution.

Motion answers an interaction or depicts carrier flow. No floating hero animation or scrolling reveal sequence. Reduced motion disables nonessential animation. Instrument drag has keyboard and button alternatives. Existing mathematical units, model boundaries, saving, comparison, URL state and storage contracts stay intact; see `docs/scientific-evidence.md` and `UX-CONTRACT.md`.

## Do's and Don'ts

The requested homepage entrance is the only brand-motion exception: native Web Animations use the exact supplied delays/easing and masked .l/.li headline spans. It starts after font/video readiness or 900 ms, has a 3500 ms visibility guard, runs once per full page load and yields to focus/pointer interaction. Reduced motion stops the decorative video and bypasses the intro. A discreet pause/play control appears only when video playback is available; the video has no native controls and never receives focus. No video download, proxy, replacement image or poster is used.

- Do choose layout by content: article, material figure, plot, parameter rail or bibliography.
- Do keep an experimental figure separate from the unfitted educational simulation.
- Do retain Silicon scientific content; NanoLab branding is consistent across Home and the interior shell.
- Don't turn every section into an equal rounded card or center long technical paragraphs.
- Don't change formulas, parameters, model defaults or state behavior to support a visual treatment.
- Don't promote this review branch to production without the user's confirmation.
