# Unified 3D Lab — 18 October 2026

The owner's current brief makes `/lab` the sole home for interactive scientific 3D models. This replaces the previous atomic-only Lab and its handoff to Device Explorer. Older release reports describe historical layouts and verification; README.md, DESIGN.md and UX-CONTRACT.md describe the current architecture.

## Page responsibilities

| Page | Responsibility |
| --- | --- |
| Foundations / Materials | Scientific principles, static structures and existing 2D learning activities |
| 3D Lab | All interactive scientific WebGL models in one continuous page |
| Device / Why MoS₂ | Static device/material explanations, evidence and references |
| Simulator / Comparison | Existing calculations, parameter analysis, 2D curves and saved scenarios |
| Research / Challenges | Research evidence, engineering limits, filters and timeline |
| Interface discovery | Research narrative, static before/after diagrams, reported EOT and source limits |

The header's 3D Lab item links directly to `/lab`, without a submenu or expand button. Foundations, Research and Challenges retain their visible indices beneath the introduction; no sidebar or index is added to Lab. The Midnight Blue / Arctic Blue palette, equal-size numbered headings and homepage particle effects remain established design constraints.

## Four direct modules

| Heading / fragment | Reused component | Local scientific controls |
| --- | --- | --- |
| Graphene atomic structure / `#graphene` | AtomicWorkbench, fixed graphene | Honeycomb, C–C bond and three-neighbour views; primitive cell, labels, atom visibility and assembly |
| MoS₂ atomic structure / `#mos2` | AtomicWorkbench, fixed MoS₂ | Monolayer/bilayer, ideal 2H/3R registry, plane inspection, layer separation, primitive cell and labels |
| MoS₂ transistor / `#transistor` | DeviceViewer | Component selection/visibility, exploded view and conceptual ON/OFF |
| Interface engineering / `#interface-engineering` | DeviceViewer with interface research | With/without carbon dots, interface/dielectric inspection and layer selection/visibility |

Every module includes its own camera controls, inspector, source context and limits. Controls use unique instance IDs. Selection, visibility, reset and camera changes belong to one instance. Both atomic materials are always present; their necessary scientific controls do not act as model-category tabs. Atomic Reset restores the lattice/monolayer, 2H registry, camera, labels and visibility. Device Reset restores camera and viewing options within the current interface architecture. Neither resets another module.

Modules appear directly in the server-rendered document, with no whole-model accordion, separate model route or navigation link standing in for a viewer. The Lab reuses AtomicWorkbench, DeviceViewer, ScientificStage, ScientificCanvas and build-scene rather than recreating scientific geometry. Large viewers pair with an inspector on desktop; controls follow the viewer at 900px and below. Mouse/keyboard camera controls and opt-in touch orbit preserve ordinary page scrolling.

## Static teaching pages and compatibility

- Why MoS₂ replaces its AtomicWorkbench with original static S–Mo–S monolayer/bilayer projections. They show plane order, not full coordination or 2H/3R registry. Existing material properties, band diagrams, 2D activities, citations and collapsed legacy foundations remain.
- Device replaces DeviceViewer with a labeled static transistor cross-section and component-role explanations. Gate operation, experimental device imagery and scientific sources remain.
- The interface discovery replaces its DeviceViewer with original static bare-surface/carbon-dot comparison diagrams. The EOT chart, reported measurements, primary paper and limitations remain separate and intact.

`/lab#atomic-structure` remains at the start of the sequence. Lab also retains `#interactive-device` and `#interactive-stack` aliases beside the corresponding transistor/interface modules. Legacy `/lab?material=graphene` and `/lab?material=mos2` URLs resolve to the complete Lab; neither hides, reorders or synchronizes another model. On initial entry or explicit navigation from another route, a legacy material URL without a fragment gains the matching `#graphene` or `#mos2` and focuses that existing section. The shared navigation manager uses `history.replaceState`, preserving all query parameters and history state without adding an entry. Explicit fragments win; unknown material values and browser back/forward restoration remain unchanged. Existing article/Device fragment IDs remain with their static scientific explanations. `/explore` retains its Device redirect. Theory-to-Lab links name the relevant module; obsolete instructions to rotate a stack on Device are removed.

## Resource lifecycle

`scene-residency.ts` mounts a ScientificCanvas within 200px of the viewport and retains it until its host leaves a wider 900px boundary. This hysteresis avoids rebuilding from small scrolls. Only the canvas unmounts; workbench and inspector state, including camera position, remain owned by the module. The static preview reserves space while a model is distant. There is no claimed hard limit on concurrent WebGL contexts.

ScientificCanvas renders on demand, pauses transitions when truly offscreen or when the document is hidden, and cancels queued animation frames. Cleanup disconnects observers, removes listeners, cancels animations/frames and disposes instanced buffers, geometry, materials, textures, floor, shadow/environment targets, render lists and renderer; context loss releases the old WebGL context. Nearby models initialize again from their retained module state. WebGL/chunk/context failures expose the existing labeled fallback instead of removing the scientific explanation. Reduced motion finalizes transitions immediately.

## Scientific and verification boundaries

Ball-and-stick structures, device layers, carbon-dot placement and ON/OFF states are idealized teaching geometry, not measured atomic dynamics or computed transport. Atomic coordinates, material examples, citations and existing limits remain authoritative. EOT is capacitance-equivalent thickness, not physical HfO₂ thickness. Simulator calculations, comparison scales and browser-local storage keep their existing contracts.

Source checks can verify module ownership, retained fragments, independent controls, static-page imports and cleanup behavior. A real browser is still needed to establish rendered layout at 1440/768/390px, pointer/touch interactions, WebGL loading and actual context/memory behavior; static checks are not substitutes for those observations. Test, browser and deployment results should be reported from their actual release evidence, not inferred from this architecture record.
