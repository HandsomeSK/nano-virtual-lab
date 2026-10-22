> Historical release report. The current scientific revision and validation are recorded in [the October 2026 audit](scientific-audit-2026-10-21.md); the region-readout correction and current source ledger supersede older counts and unchanged-model statements below.

# Scientific evidence and image decisions

Source review date: **12 October 2026**. This ledger complements [the baseline inventory](content-audit.md), the scientific reference list, and the public image registry on About & References.

## Page changes

| Page                  | Scientific addition                                                                                                                                                                                                       |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Home                  | Surface/confinement mechanisms and the contact, dielectric and process challenges between a material and a useful device                                                                                                  |
| Foundations           | Six expandable explanations: sphere versus sheet surface geometry, infinite-well assumptions versus periodic bands, honeycomb π states, velocity/mobility/scattering, evidence limits, gate charge and ON/OFF definitions |
| From Graphene to MoS₂ | 1T/2H coordination, 1H monolayer terminology, original direct/indirect E–k sketches, excitonic optical transitions versus quasiparticle gaps, thin-body electrostatics and its limits                                     |
| Device                | Extended explanations for all six existing selectable parts and a separately identified monolayer back-gated experimental device                                                                                          |
| Simulator             | Explicit SI conversions, fixed/default parameters, symmetric source/drain drops, omitted physics, and measured environmental hysteresis with specimen/bias/sweep conditions                                               |
| Comparison            | Reporting context for mobility, current ratios, dimensions and variability; materials and A/B calculated scenarios stay distinct                                                                                          |
| Challenges            | Four specific literature cases, original mechanism diagrams retained, licensed experimental context and correction notices                                                                                                |
| Research              | All seven original studies expanded; three new 2026 studies; focused transfer/scaling/processor explanations; separate imec industry announcement                                                                         |
| About                 | Four evidence categories, appended references with preserved original numbers, independent image provenance registry                                                                                                      |

## Images used

The complete structured records, captions and actual HTTPS asset URLs are in `src/data/figures.ts`. Each image includes title, authors, source, DOI/figure number where applicable, licence, attribution and modification status.

| Image                               | Verified source                                                                                                            | Licence / delivery                                                                              |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Graphene lattice illustration       | [J_Alves / Commons](https://commons.wikimedia.org/wiki/File:Graphene.svg)                                                  | CC0 1.0; original SVG's Commons PNG rendering, explicitly an illustration                       |
| Graphene HRTEM                      | [materialesnano.com / Materialesnano2 / Commons](https://commons.wikimedia.org/wiki/File:Graphene_HRTEM.jpg)               | CC BY-SA 3.0; complete micrograph, not a fully documented peer-reviewed specimen                |
| MoS₂ crystal phases                 | [Stephanmsutter / Commons](https://commons.wikimedia.org/wiki/File:Crystal_structures_of_the_1T_and_2H_phases_of_MoS2.png) | CC BY-SA 4.0; full crystallographic illustration, not microscopy                                |
| Experimental monolayer FET          | [Macucci et al. 2017, Figure 1](https://www.nature.com/articles/s41598-017-11930-6/figures/1)                              | CC BY 4.0; full micrograph and inset, monolayer/Au/270 nm SiO₂/global Si back gate              |
| Experimental transfer hysteresis    | [Shimazu et al. 2016, Figure 1](https://www.nature.com/articles/srep30084/figures/1)                                       | CC BY 4.0; full four-panel figure; specimen, bias, sweep rate and author scaling/offsets stated |
| Two-inch selenium-assisted transfer | [Zhang et al. 2025, Figure 1](https://www.nature.com/articles/s41467-025-59803-1/figures/1)                                | CC BY-NC-ND 4.0; complete figure, no adaptation, non-commercial public science education        |
| Crystalline dielectric fabrication  | [Zeng et al. publisher correction, Figure 1](https://www.nature.com/articles/s41586-024-08001-y/figures/1)                 | CC BY 4.0; corrected full figure, including the amended crystalline-oxide label                 |
| Self-aligned sidewall gate/channel  | [Wang et al. 2026, Figure 1](https://www.nature.com/articles/s41467-026-75409-7/figures/1)                                 | CC BY-NC-ND 4.0; complete figure, no adaptation, non-commercial public science education        |

Images remain uncropped/unannotated. `object-fit: contain` preserves each complete figure, including panels, scale bars and legends. Next.js performs technical resizing/format optimization; it does not extract or redraw experimental data. Share-alike licences remain attached to the images. Non-commercial/no-derivatives figures require separate permission before commercial reuse or adaptation.

### Delivery decision

The managed executor's enforced policy permits GitHub/npm but denies the image source hosts. Supported configuration changes require the environment configuration workflow, which the available runtime tool cannot edit. No destination-policy bypass was attempted. Rather than claim that images were downloaded into `public`, this site uses a small set of curated source URLs with Next.js `remotePatterns` and server image optimization. Original-source links and credits are always available. Source availability remains an external dependency; permitted local copies can replace these URLs later without changing consumers.

## Research and correction review

- [Lin et al., sub-5 nm channels](https://doi.org/10.1038/s41467-026-77186-9): publisher early version, 21 September 2026. Air-gap isolation/gate-contact overlap; four-inch platform. Early-version status is displayed; incomplete method conditions are not converted into a numerical benchmark. Its silicon-scaling headline is not interpreted as breaking the room-temperature thermal swing limit.
- [Wang et al., self-aligned gate](https://doi.org/10.1038/s41467-026-75409-7): first publication 11 July 2026, version of record 18 August 2026. Sub-1 nm physical graphene-edge gate versus measured 10 nm channel; quantum transport projections are separated from measurements.
- [Fan et al., bit-parallel computer](https://doi.org/10.1038/s41928-026-01641-0): 26 May 2026, 1,433 transistors; 0.5 μm industrial process plus academic back-end integration. No modern-CPU superiority claim.
- [Guo et al., towards-foundry processors](https://doi.org/10.1038/s41928-026-01573-9): existing milestone retained and expanded; 26 February 2026. Coordinated design/growth/transfer/fabrication/testing, not commercial qualification.
- [imec announcement](https://www.imec-int.com/en/press/asml-tsmc-and-imec-bring-industry-ready-2d-material-transistors-closer-breakthrough-300mm): 15 June 2026. Institutional category, not peer reviewed; 300 mm wafer and 50 nm contacted poly pitch are distinct dimensions. The reported operational fraction uses Imax/Imin > 10⁵; the first microscopy figure is WS₂, not MoS₂.
- [Du et al. antimony contacts](https://doi.org/10.1038/s41928-025-01500-4): 17 December 2025. [Author correction](https://doi.org/10.1038/s41928-026-01563-x), 13 January 2026, fixes duplicated reverse traces in Figure 4b and Supplementary Figure 18. The case does not claim zero hysteresis from the original traces.
- [Zeng et al. dielectric](https://doi.org/10.1038/s41586-024-07786-2): 7 August 2024. [Publisher correction](https://doi.org/10.1038/s41586-024-08001-y), 6 September 2024, changes Figure 1g's label from amorphous to crystalline Al₂O₃; corrected image used.
- [Cheng et al. benchmarking](https://doi.org/10.1038/s41928-022-00798-8) and [Zeng et al. engineering review](https://doi.org/10.1038/s44287-024-00045-6) support the reporting and integration context. Their figures are not reproduced.

## Planned images not reproduced

Du contact figures, Guo/Fan processor photos, the engineering/benchmarking review figures and imec microscopy/branding remain linked at their original sources because a clear applicable reuse licence was not verified. Lin's early-version figures also remain at the source pending final version/method review. Different papers' specimens are never identified as the same device. No new AI artwork was generated or presented as scientific evidence.

## Model audit

`src/lib/simulation/model.ts` is unchanged. The existing five controls, constants, input normalization, 101-point curves, symmetric self-consistent series-resistance solve, computed explanations, saved configuration schema/key and comparison URLs are preserved. The solver uses SI units internally and finite nonnegative currents. At cutoff it returns zero by assumption; it cannot predict an experimental ON/OFF ratio, traps/hysteresis, quantum/ballistic transport or short-channel leakage. Literature plots provide qualitative context only.

## Verification

- ESLint passes with zero warnings; all **15 automated tests** pass, including the original 13 model/transport/persistence checks and two provenance/cross-reference checks.
- Standalone TypeScript validation, `git diff --check` and the production `npm run build` pass.
- Production-build browser checks use **Chromium / Playwright 1.64.0**; the Browser plugin is not available. All nine pages pass at **320, 390, 768 and 1440 px** (36 route/layout checks), with no blank pages, framework overlays or horizontal overflow.
- **105 unique internal destinations** resolve, including knowledge fragments and citation targets.
- Retained flows exercised: mobile navigation; all six foundations and new disclosures; material selection/direct-indirect diagrams; 3D part selection/visibility/explosion/ON–OFF/keyboard orbit/zoom/reset; live simulator changes, contact response, save/output/A–B/edit/reload/reset; research filters/timeline/three case deep links; all four engineering cases; reference search/citation return/institutional filtering and eight image registry records.
- No application errors or unexpected non-image responses were observed. Local remote-image requests were intentionally skipped because the enforced source-host denial was already established; actual image delivery is a separate Vercel preview/production check, not claimed from these local screenshots.
- The existing Git integration produced a **READY** Vercel preview for commit `e93b58b6a047c8bc9b06e0a156f4440a85f452ca`. All **eight curated images** returned **HTTP 200** with `image/jpeg` or `image/png` from Next.js Image optimization at **640 px and 828 px**: **16 successful image responses**. These checks verify actual platform delivery independently of the restricted local executor.
- Desktop homepage and mobile simulator screenshots were visually inspected. Browser coverage is Chromium, not Safari or Firefox.

## Human review and further work

- A subject expert can review the concise paraphrases, especially the early-version 2026 scaling claims, against the final articles and supplementary methods.
- General fundamentals are explained directly; the independent open textbook and scholarly sources remain available for further reading.
- Browser coverage and actual image-loading results are recorded above. Remote source hosting and non-commercial image conditions remain practical limits.
