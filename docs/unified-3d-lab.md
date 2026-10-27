# Unified 3D Lab — second round, 18 October 2026

The current brief keeps `/lab` as the sole home for interactive scientific 3D and merges the earlier transistor and interface modules into one instrument. This record replaces the previous four-module description. Historical release reports retain their original verification results; README.md, DESIGN.md and UX-CONTRACT.md describe the current architecture.

## Page responsibilities and ownership

`src/lib/page-hierarchy.ts` owns the five categories, their child pages and auxiliary About & References route. Breadcrumbs, header category ownership and the grouped footer consume this configuration. Home is reached through the logo. Main pages expose a few descriptive next steps within their content, in addition to header menus.

| Category / page | Responsibility |
| --- | --- |
| Materials / Foundations | Six scientific topics, graphene geometry/electronics and original 2D activities |
| Materials / MoS₂ | Material choice, visible core band-gap/layer explanations, static structures and optional deeper background |
| Materials / Transistor Principles | Static labelled cross-section, component roles, gate operation and experimental evidence |
| 3D Lab | All three interactive scientific WebGL demonstrations |
| Simulators / Simulator and Comparison | Existing calculations, parameter experiments, shared-scale A/B curves and browser-local scenarios |
| Discoveries / Research and Interface Breakthrough | Explanation-led directions, research connections, evidence, papers, timeline and source limits |
| Engineering Challenges | Eight numbered mechanisms, device impacts and targeted experiments/research |
| About & References | Auxiliary source search, citation returns, scientific limits and asset rights |

The latest 19 October navigation brief uses page-only dropdowns for categories with multiple pages; the single-page 3D Lab and Engineering Challenges modules are direct links. Every substantive interior page uses the shared left-edge Contents drawer; Lab lists its three continuous models without a category switcher or whole-model accordion. The Midnight Blue / Arctic Blue palette, homepage silver particles, equal-size heading numbers and scientific colour ownership remain unchanged.

## Three continuous modules

| Heading / fragment | Component | Scientific controls |
| --- | --- | --- |
| Graphene atomic structure / `#graphene` | Fixed-graphene AtomicWorkbench | Sheet, C–C bond, three-neighbour view, primitive cell, labels, atom visibility, assembly and camera |
| MoS₂ atomic structure / `#mos2` | Fixed-MoS₂ AtomicWorkbench | Monolayer/bilayer, ideal 2H/3R registry, atomic planes, layer separation, primitive cell, labels and camera |
| MoS₂ transistor & interface engineering / `#transistor` | One DeviceViewer | Independent OFF/ON and Standard/Without carbon dots/With carbon dots, component selection/visibility, explosion, labels and camera |

Every model is present in the server-rendered document, with a reserved preview, essential controls, selection/material and concise current-state explanation. Moving between models requires scrolling, not loading another model route. At 900 px and below the inspector follows its viewer. Touch orbit is opt-in; keyboard camera buttons remain available.

The atomic instances retain independent state. Atomic Reset restores the lattice/monolayer, 2H registry, camera, labels and visibility. Device Reset always restores Standard, OFF, all layers and the initial camera. Resetting one model never changes another model.

## One shared device scene

DeviceViewer renders one ScientificStage. A constant `deviceSpec` keeps the scene specification and canvas identity stable. `SceneOptions.deviceStructure` selects `standard`, `without-carbon` or `with-carbon`; build-scene owns the prebuilt continuous dielectric, oxide-island control and carbon-dot interface geometry. Updates toggle geometry visibility/material state in that scene rather than mounting another viewer or hiding a second Canvas.

`src/lib/science/device-state.ts` owns structural transitions. Switching architecture preserves valid selection, layer visibility, ON/OFF, explosion, labels, touch policy and camera. Removing the interface clears its stale hidden entry, and interface selection falls back to dielectric while camera focus safely ignores removed geometry. Component selection restores a hidden selected part. No removed interface remains selected or targeted. Controls remain available in every architecture.

Standard is an ideal continuous gate dielectric without carbon dots. Without carbon dots is a discontinuous-oxide conceptual control specific to the cited interface study, not a depiction of every untreated transistor. With carbon dots illustrates an insulating assembly assisting continuous HfO₂ nucleation. Carbon dots are not a conductive graphene channel. ON/OFF changes illustrative channel charge; this model calculates no current, field, measured roughness or performance improvement. EOT remains capacitance-equivalent thickness rather than physical HfO₂ thickness.

## Compact scientific explanations

ModelExplanation is a shared native default-closed details/summary component. The inspector keeps its essential controls, selected name/material, important dimensions and one-sentence explanation visible. Detailed physics, assumptions and citations remain inside its named, keyboard-focusable region.

The desktop region is at most 300 px high, uses a 75 ch text measure and scrolls without removing content. At 900 px and below or on coarse pointers, it has no internal height cap or overflow trap and expands in normal document flow. Summary controls are 48 px high and have a native marker, hover and visible focus. No CSS truncates scientific content.

Graphene explains honeycomb bonds, three-neighbour coordination, primitive basis/cell, dimensions and ideal-model limits. MoS₂ explains S–Mo–S planes, monolayer/bilayer, 2H/3R registry, trigonal-prismatic coordination, interlayer interactions and scale limits. The merged device has one “Materials, scale & model limits” disclosure containing component roles, gate operation, ON/OFF, both interface comparisons and their assumptions; it does not retain duplicate device notes.

## Theory pages and compatibility

Why MoS₂, Device and the interface discovery retain original static diagrams, scientific text, figures and numbered citations rather than duplicate WebGL viewers. Materials continues to own full theory. Specific next-step links connect graphene and MoS₂ theory to their Lab fragments, device theory to the shared model and numerical simulator, and interface research to the appropriate device state and dielectric challenge. The article's EOT plot remains separate from conceptual geometry.

All four device fragments point into the same combined model:

| Existing Lab fragment | Structural entry state |
| --- | --- |
| `#transistor` | Standard |
| `#interactive-device` | Standard |
| `#interface-engineering` | With carbon dots |
| `#interactive-stack` | With carbon dots |

DeviceViewer reads initial location, hashchange and popstate, deduplicates unchanged URL notifications and releases its listeners on unmount. Repeating an explicit link to the exact current URL reapplies its intended entry state. The viewer never writes browser history or scrolls the document; AnchorNavigation owns fragment reveal/focus/scroll and preserves native history restoration. A synthetic state notification therefore cannot create a second scroll.

`#atomic-structure` stays at the sequence start. Legacy `/lab?material=graphene` and `/lab?material=mos2` without fragments still gain their matching fragment on initial or explicit cross-route navigation using history.replaceState. All query parameters and existing history state are preserved without another entry. Explicit fragments take precedence; unknown material values and back/forward restoration remain native. Existing fragments on static theory/research routes and `/explore`'s Device redirect remain valid.

## Resource lifecycle

ScientificStage mounts a Canvas within 200 px of the viewport and retains it until its host leaves a wider 900 px boundary. Only the Canvas is released; parent model options and camera stay mounted. Hysteresis avoids rebuilding after small scrolls. Static previews reserve layout while a model is distant. There is no claim of a hard global WebGL context limit.

As of 27 October 2026, the shared Canvas module starts downloading at Lab hydration, before the residency observer mounts a renderer. A shared spinner covers both module loading and GPU preparation in the reserved stage. Initialization allows the indicator to paint, then uses `compileAsync` before demand-rendering; readiness means the first successful `renderer.render`, rather than canvas creation. A visible preparation exceeding 30 seconds shows the static fallback; hidden/offscreen waiting is excluded. Cleanup ignores late shader completion and cancels frames and the preparation timer. Device channel generation starts with a smaller source lattice, retaining exactly the same 123 displayed atoms and 220 bonds; a regression test compares every displayed coordinate and bond endpoint with the previous larger source.

ScientificCanvas demand-renders, pauses hidden/offscreen transitions and respects reduced motion. Cleanup removes observers/listeners/OrbitControls and queued animation frames, cancels animations, frees instance buffers, geometry, materials, textures, shadow/environment targets and render lists, disposes the renderer and loses the old WebGL context. Chunk/WebGL/context failures retain a labelled schematic and complete scientific explanation.

## Verification boundaries

Source SSR can verify three complete modules, visible essential controls, unique labels, native disclosures, breadcrumbs, route/fragment links and scientific text. An isolated hook-state harness can execute the actual component handlers and effects without claiming DOM/hydration or GPU results. Pure geometry, transition and scroll-history tests protect their contracts. Actual HTTP and stylesheet checks establish served content and CSS author rules.

A real browser is still necessary for measured layout at 1440/768/390 px, pointer/raycast/touch interactions, hydration, console errors and WebGL/context/memory behavior. Static or handler checks do not establish those observations. Report each release's actual browser capability and evidence separately; do not infer browser success from a passing build or HTTP response.
