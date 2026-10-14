# Nano Virtual Lab interface behavior

This record preserves existing behavior during the public-platform redesign. The current user request is the presentation and public-content authority. The model and persistence contracts are documented in `docs/scientific-evidence.md` and verified in `tests/simulation.test.mjs`, `tests/graphene.test.mjs` and `tests/insights.test.mjs`. Visual intent belongs to `DESIGN.md`.

## Canonical UI Map

| Capability     | Canonical owner                                                         | Source of truth                                                   | Allowed variants                    | Verification                                       |
| -------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------- | -------------------------------------------------- |
| Select/Listbox | Native HTML select in ResearchExplorer, ReferenceBrowser and Comparison | Platform popup behavior accepted; labels and theme from DESIGN.md | native                              | Keyboard selection, opened popup and mobile checks |
| Form           | ParameterControl and simulator configuration bar                        | Existing bounds/schema in model.ts and configurations.ts          | number/range, configuration name    | Model tests and browser save/edit/reload checks    |
| Scrollbar      | src/app/globals.css                                                     | DESIGN.md runtime tokens                                          | document, horizontal table overflow | Computed styles and narrow viewport                |
| Toast          | Inline status/error regions in use-configurations consumers             | Existing local-storage outcomes                                   | success, recoverable error          | Save feedback and storage failure checks           |

## Preserved flows

- Shared navigation and scroll rules come from the owner’s 14 October 2026 content/navigation/UX brief; the existing route set and research parameter values define compatibility.
- Navigation links remain real links. Mobile menu opens with a button, closes on link selection and Escape, and returns focus on Escape. Page and research deep links continue to resolve.
- The five peer categories include Engineering Challenges. The mobile menu owns vertical overflow on short screens. Prose citations remain attached to their sentence; linked source actions and their citations wrap as a group.
- The homepage's decorative silver particles drift continuously in normal motion mode. The owner's latest instruction removes the pause control. System reduced motion freezes the scene and hidden/offscreen rendering pauses without resetting its phase.
- Foundations retains all six science topics, sliders, selectors, Fermi/transport activities, disclosures and the FET state toggle. Material controls keep their native button/keyboard behavior.
- The nanoscale examples, logarithmic slider and live preview share one selection. Example cards expose their pressed state; the range exposes its physical size in nanometres or micrometres. A custom slider value clears the example selection.
- Transistor materials and their citations remain visible in the inspector. Full role explanations and model limits use native disclosures; model limits span the shared workbench. Published simulator evidence retains the complete original image beside its caption and provenance, stacked on phones.
- Device retains orbit/zoom/reset, selection, visibility, explosion and ON/OFF concept controls. Keyboard arrows and orbit buttons provide alternatives to dragging. Full yaw and above/below pitch work in all shared scientific viewers. Graphene detail buttons select a sheet, single C–C bond or local three-neighbour motif; changing material restores the full sheet. The lab embeds the canonical DeviceViewer directly. Material examples and geometry citations stay beside the selected component.
- Simulator input changes recalculate immediately. Existing normalization and five parameter meanings do not change. Save records a bounded versioned scenario in browser-local storage; errors remain visible. Reset restores the existing defaults.
- Comparison retains A/B selection, shared scales, overlay/side-by-side layouts, parameter/readout table, edit links and saved-scenario removal. Removal retains the existing immediate behavior under the user's explicit requirement to preserve original functions; this redesign does not invent a new destructive server operation.
- Each of the five parent categories retains its direct route and exposes two groups of actual pages/sections. Hover and a separate expand button open one submenu; hidden panels are inert. Keyboard ArrowDown, Tab and Escape have explicit destinations. Mobile expands subgroups inside its scrollable menu.
- Explicit cross-route links without a fragment start at the new page top immediately. Explicit fragment links reveal collapsed ancestors and position below the header. Same-page anchors scroll smoothly except with reduced motion. Popstate cancels pending corrections and preserves history restoration. Query-only controls and synthetic hash state notifications do not reset scrolling.
- Research filter/selection state remains in the URL; clear restores the full study set. Unmatched filters show recovery guidance. Study disclosures and timeline links remain available. Catalogue entries start collapsed unless selected by a query/fragment; expanding them exposes every existing evidence/analysis field. Timeline selection intentionally opens and scrolls to the study. Numbered references remain visible outside the disclosure. DOI, authors and publication access are centralized in ReferenceBrowser, with ReferenceAccess retaining only genuinely distinct resources.
- Reference search is local and immediate. Clear returns focus to search. Citation selection and safe return links remain intact. The finite bibliography is rendered in full rather than paginated.

## State and access

Public content and mathematical experiments require no account or remote data mutation. Local-storage failure must not block calculation; recorded scenarios remain local to this browser. The website has no billing, server CRUD, sessions or permission flow. Error, loading and not-found routes retain navigation. Reduced-motion, keyboard focus and mobile alternatives apply throughout. English is the sole public UI language in this change.

The owner has authorized checked updates to be published to the original production address. Follow the standing release instruction in AGENTS.md.

## Route document title policy

Existing Next.js metadata identifies each route and NanoLab. Research now identifies itself as the Research Knowledge Hub. Error and not-found boundaries retain recovery navigation. No access or account model changes are part of this task.
