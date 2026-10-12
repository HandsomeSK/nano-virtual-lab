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

- Navigation links remain real links. Mobile menu opens with a button, closes on link selection and Escape, and returns focus on Escape. Page and research deep links continue to resolve.
- Foundations retains all six science topics, sliders, selectors, Fermi/transport activities, disclosures and the FET state toggle. Material controls keep their native button/keyboard behavior.
- Device retains orbit/zoom/reset, selection, visibility, explosion and ON/OFF concept controls. Keyboard arrows and orbit buttons provide alternatives to dragging.
- Simulator input changes recalculate immediately. Existing normalization and five parameter meanings do not change. Save records a bounded versioned scenario in browser-local storage; errors remain visible. Reset restores the existing defaults.
- Comparison retains A/B selection, shared scales, overlay/side-by-side layouts, parameter/readout table, edit links and saved-scenario removal. Removal retains the existing immediate behavior under the user's explicit requirement to preserve original functions; this redesign does not invent a new destructive server operation.
- Research filter/selection state remains in the URL; clear restores the full study set. Unmatched filters show recovery guidance. Study disclosures and timeline links remain available.
- Reference search is local and immediate. Clear returns focus to search. Citation selection and safe return links remain intact. The finite bibliography is rendered in full rather than paginated.

## State and access

Public content and mathematical experiments require no account or remote data mutation. Local-storage failure must not block calculation; recorded scenarios remain local to this browser. The website has no billing, server CRUD, sessions or permission flow. Error, loading and not-found routes retain navigation. Reduced-motion, keyboard focus and mobile alternatives apply throughout. English is the sole public UI language in this change.

Production publication is a separate user decision after reviewing this branch/preview.
