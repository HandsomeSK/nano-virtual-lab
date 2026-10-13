# Cinematic NanoLab homepage

The default entry is a single-viewport gateway matching the supplied Vexel specification. NanoLab has a filled inline SVG wordmark, the exact “Nanomaterials. / Beyond graphene.” headline, the specified supporting sentence, three navigation links and two actions. Explore and the primary action lead to /foundations; Simulator and the secondary action lead to /simulator; Research leads to /research.

The production address is https://nano-virtual-lab.vercel.app/. It is also the homepage's canonical URL. The existing review branch and draft PR are used for validation; production publication still requires the owner's confirmation, as requested in the prior overall-optimization brief.

## Implementation

- src/app/page.tsx renders the semantic content, font preloads, decorative video and exact metadata on the server. No homepage content depends on React hydration.
- src/app/homepage.module.css implements the exact horizontal sky gradient through shared --home-* tokens, --u scale equations, two masked .l/.li spans, safe-area spacing, 82.98/318.68 flexible fields, tablet/portrait/short-landscape rules and the specified video horizon/container sizing.
- src/components/home-motion.tsx handles the native Web Animations sequence, 900 ms font/video readiness bound, 3500 ms visibility guard, focus/pointer interruption and cancellation on departure. The intro runs once per document load; returning through client navigation does not replay it.
- Reduced motion bypasses the intro, stops the decorative video and shows the complete gradient. A discreet motion toggle provides keyboard/touch pause and play when playback is available. Native video controls are disabled.
- Brand and NanoLabWordmark share the compact inline vector identity across the homepage and interior chrome. The outlines were created from Google Sans 500; no VEXEL glyphs or raster logo are used.
- Google Sans 400/500 are self-hosted at the requested /assets paths. Fontsource 5.3.2 distributes these fonts under the SIL OFL; the complete licence is included in public/assets/google-sans-OFL.txt and linked in About. The upstream Google Fonts copyright/licence was independently checked. No website dependencies were added.

The video source is exactly the supplied cloudfront.net URL. It is neither downloaded into the project nor proxied. No poster, replacement image, generated visual or animated background is used. The sky gradient is a complete fallback.

The homepage marker scopes viewport ownership and hidden shared chrome to Home. Interior knowledge, research and instrument routes keep their existing scrolling, navigation, scientific figures, calculations and browser-local storage.

## Design reconciliation

| Prior design rule                                   | Approved change                                                       | Scope        |
| --------------------------------------------------- | --------------------------------------------------------------------- | ------------ |
| Serif exhibition homepage and open article sequence | Centered Google Sans cinematic gateway, exact supplied video/gradient | Home         |
| No background gradients or entrance sequence        | Owner-specified sky gradient and native masked entrance               | Home         |
| NanoLab / Beyond Silicon branding                   | Consistent NanoLab SVG identity with no logo subtitle                 | Shared brand |

Interior typography, light reading surfaces and instrument behavior retain their existing owners. DESIGN.md records the explicit homepage exceptions and runtime token mapping; no application-wide dark theme is introduced.

## Validation

Production-build Chromium checks and screenshots live in /workspace/artifacts/cinematic-homepage/.

- 13 homepage viewports: 1280×800, 1440×900, 1920×1080, 1024×768, 768×1024, 600×800, 431×672, 390×844, 320×568, 844×390, 667×375, 568×320 and 360×240. Two headline lines, visible copy/actions, font loading, viewport containment, exact scale/flex values and video geometry pass.
- All eight interior routes restore visible header/footer and normal scrolling, with no horizontal overflow or remaining course identifiers.
- Native keyboard navigation visits all six homepage links in the expected order, with the visible 2 px sky-blue focus outline. Enter on the secondary action and native masthead clicks reach the existing Simulator and Foundations routes. Changing the simulator gate voltage to 2 V updates its current readout from 23.344 µA to 44.444 µA.
- Coarse-pointer mobile landscape emulation at 844×390 retains the 44 px primary touch target (34 px visible button plus 5 px on each edge), approximately 44 px secondary target and 5 px separation, with no page overflow. This is browser emulation rather than physical-device coverage.
- Eleven motion/failure checks pass: normal entrance, stalled font readiness, missing Web Animations, missing matchMedia, partial animation failure, mocked media availability, native pause/play state changes, client back navigation without replay, reduced motion, primary lower-edge hit testing with native link navigation and React-bundle failure.
- Actual animation calls use all 11 specified timings with fill: both. Stalled font readiness starts at approximately 0.96 s after navigation, including hydration; the readiness timer itself is bounded at 900 ms. Completed animations are canceled. No application JavaScript errors or unhandled rejections are recorded in these cases. Across cold and repeated local loads, observed CLS ranges from 0 to 0.057, below the Core Web Vitals good threshold of 0.1; these checks are not a field-performance benchmark.
- Homepage axe-core WCAG A/AA audit: zero violations. One incomplete check requires human judgement; automated checks are not accessibility certification.
- Development-mode StrictMode also records all 11 entrance animations and no hydration warnings or application errors. Effect remounting preserves a pending entrance; intentional root/bootstrap attributes are the only hydration-warning exceptions.
- ESLint with zero warnings, all 15 scientific/model/persistence tests, TypeScript, production build, Prettier, git diff --check, official DESIGN.md lint and the strict premium static audit pass.
- The solver, Graphene helpers, configuration persistence and result interpretation files are byte-unchanged against main.

## Limits

The managed environment blocks the supplied video host at the network proxy (CONNECT 403). Exact source/attributes, geometry, media events and failure handling are tested, but actual footage, external availability and playback pixels require review in an unrestricted browser. Screenshots show the complete gradient fallback; media-control success checks use event/API fault injection without replacing the video source.

Browser coverage uses Chromium. Safari/Firefox, physical mobile safe-area behavior and a complete manual accessibility assessment are not covered. Scientific source-host restrictions and publisher-image geometry limits from the existing evidence ledger remain.
