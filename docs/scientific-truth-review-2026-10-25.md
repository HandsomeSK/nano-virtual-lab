# Scientific source, figure and demonstration review — 25 October 2026

## Scope and evidence boundary

Reviewed baseline `af299a29ca5ffb1e004731a9f0a6bccda5557f2d` against primary literature, independent calculations, the atomic-coordinate generator and the actual React SVG output. This review prioritizes scientific meaning and provenance over the layout checks in the [23 October site review](site-review-2026-10-23.md).

Published experimental images, original conceptual schematics and calculated teaching curves remain distinct. No experimental curve was invented or digitized, no source image was replaced with generated artwork, and no new material-performance model or measured dataset was introduced.

## Corrections

| Issue | Correction and supporting evidence |
| --- | --- |
| The MoS₂ bilayer readout still displayed the monolayer's three-atom basis. | The selected bilayer now shows **2 Mo + 4 S atoms** per in-plane primitive cell; a monolayer retains **1 Mo + 2 S**. This counts both sheets, rather than claiming to show a bulk 3R cell. The [Ridolfi author manuscript](https://arxiv.org/html/1507.00356) defines the per-sheet basis and coordinates; the generator and component regression test independently count both bilayer registries. |
| A drift-velocity equation left the electron sign convention implicit. | The explanation now uses the speed magnitude **\|vdrift\| = μ\|E\|**, and states that electron drift velocity is opposite the electric field. See [COCOA, first-order MOSFET model, Eq. 2.3](https://bmurmann.github.io/COCOA/contents/partI/partI.2.html#first-order-mosfet-model). No transport equation or numerical output changed. |
| The optical example could imply identical sample/excitation conditions for PL and photoconductivity. | The [Mak author-hosted paper](https://web.stanford.edu/group/heinz/publications/Pub173.pdf), p. 2, distinguishes suspended flakes measured by PL with 532 nm excitation from separate FET photoconductivity samples on 300 nm SiO₂/Si under spectrally selected illumination. The existing 1.90 eV and approximately 1.8 eV observations retain their different measurement contexts. |
| Lin's scaling study remained labelled as an early version after its final publication. | [The publisher record](https://www.nature.com/articles/s41467-026-77186-9) now identifies **Nature Communications 17, 11003 (2026)**, first published 21 September and version of record 22 October. The bibliography, study and cross-topic summaries now reflect that status. The measured MoS₂ result remains separate from modeled ultrascaled silicon; 88 mV/dec is not described as breaking the approximately 60 mV/dec room-temperature thermionic limit. |
| The EOT chart's accessible description called its plotted datum one measurement. | It now describes a single source-reported value and uncertainty interval. [Wong et al., dielectric-properties section and Fig. 2](https://www.nature.com/articles/s41467-026-78053-3) derive the EOT using graphene double-gate transfer data. The 0.6 ± 0.1 nm value, unit conversion and interval geometry are unchanged. |
| A static model preview could be mistaken for a rendering of every live display option. | Its caption now explicitly identifies camera, expanded-spacing and ON/OFF effects as features of the interactive 3D view. The static projection continues to show the selected structure and layer visibility. |

The selected-research review date advances to 25 October 2026. Research renders this date from the existing editorial cutoff field. This remains a curated selection, not a claim to cover every publication through that date. Historical audit dates and their original access observations remain unchanged.

## Calculations, plots and atomic geometry

- An independently derived current solution matched the production solver across **1,512** allowed parameter combinations, with maximum current discrepancy about **1.73 × 10⁻¹⁸ A**. Default current, external transconductance and power conservation agreed. This validates the implemented teaching equations, not an experimental MoS₂ calibration.
- Raman peak separation, illustrative linewidth and normalization, signed photocurrent, incident-power conversion, responsivity, the infinite-well energy coefficient, EOT coordinates and nm/ångström conversion were independently checked.
- Ideal graphene and MoS₂ bond lengths, coordination, atomic planes, 2H/3R bilayer registry, primitive-cell basis counts and absence of drawn inter-sheet covalent bonds were checked. No coordinate or bond-generation change was needed.
- **22 actual React SVG views** were rendered offline, with **12** independent coordinate/readout assertions covering EOT, band extrema, direct/indirect transitions, Raman and photocurrent. Original transistor/interface and carbon-structure schematics were included in the visual inspection. Resolving the canonical palette for this static rendering is not a test of the full browser CSS cascade, font layout or WebGL output.

## Research-source coverage

All **14** catalogue studies were rechecked at the level of the claims displayed by NanoLab: **8** through accessible primary full text or author manuscripts, **5** through publisher abstracts and **1** through a first-party research-institution explanation when the publisher denied access. Six additional engineering/institutional records and targeted foundational sources were checked with their actual access limits recorded. Abstract-only sources retain qualified descriptions; a resolved DOI alone was not treated as proof of every claim.

The review does not represent a full-text rereading of all 52 bibliography entries or a reproduction of the reported experiments. Lin's full publisher response was accessible in the source review, while other canonical requests encountered Nature's cookie redirect; the successful publication metadata and relevant numerical/method locators were retained separately.

## External scientific images

The eight existing image records retain their original asset URLs, full-frame presentation, attribution and licence information. No newly confirmed caption error justified changing those images.

| Image | Evidence obtained in this review |
| --- | --- |
| Graphene lattice illustration | The Commons record matches its author, CC0 dedication, illustration status and 960 × 1042 PNG dimensions. |
| Graphene HRTEM | The Commons record matches the creator, CC BY-SA licence and 1024 × 1024 dimensions. Its graphene identification is the creator's attribution; acquisition and specimen metadata remain limited as the caption states. |
| MoS₂ 1T/2H phases | The Commons record matches the author, CC BY-SA licence, crystallographic purpose and 2707 × 1522 dimensions. |
| Macucci device, Fig. 1 | Author-hosted primary PDF text supports the micrograph/inset identity, 1.7 μm length, 4.3 μm width, Au contacts and 270 nm SiO₂/Si back gate. |
| Shimazu hysteresis, Fig. 1 | Indexed primary-paper text supports the author scaling caveat. The displayed curves remain published measurements, separate from NanoLab's teaching model. |
| Zeng corrected Fig. 1 | The primary correction identifies the Fig. 1g sample-label correction. The registry retains its corrected-figure source. |
| Zhang transfer, Fig. 1 | Paper identity and transfer-research context were consistent. Exact panel-by-panel correspondence was not independently reverified in this session. |
| Wang scaling, Fig. 1 | Paper identity and gate/channel fabrication context were consistent. Exact panel-by-panel correspondence was not independently reverified in this session. |

Nature identity redirects, PMC verification pages and PDF rate limits prevented a fresh original-raster or PDF-screenshot comparison. These source-record and text checks are therefore not reported as eight successful visual image inspections. Successful production image delivery establishes availability, not experimental authenticity or complete panel validation.

## Verification and limitations

ESLint, standalone TypeScript checks and all **94 tests** passed. The new regression renders AtomicWorkbench for graphene, one MoS₂ sheet and both bilayer registries, then compares the displayed basis counts with the coordinate generator.

The local Next build could not parse captured TypeScript `--showConfig` output: direct TypeScript output was valid, but the Next child-process helper returned empty output. Build scripts, dependencies and type-safety settings were left intact. Publication is gated on independent Vercel preview and production builds for the checked source tree.

The current managed environment blocks Chromium startup and loopback access with `EPERM`. This round therefore has no fresh live-browser interaction, responsive-layout or WebGL-pixel acceptance result. Component rendering, static SVG inspection and geometry/math checks are reported separately. Earlier browser results remain historical. Production source-image delivery and rendered page content are checked separately during release verification.
