# Research claims audit — 21 October 2026

This record covers every study in `src/data/research.ts`, the six research-direction summaries, the Research Knowledge Hub and the complete Interface Breakthrough article. It records the material actually accessible during this review; it does not claim that every paywalled method, source-data file or supplementary result was independently reproduced. The bibliography audit is recorded separately in `reference-verification-2026-10-21.md`.

## Findings and corrections

- **Distinguish dielectric test structures from MoS₂ transistor results.** The Wong case now identifies the graphene metrology structure separately from the MoS₂ devices in the article, the shared EOT measurement context and the research summaries. The existing physical-height values are retained with structural-specimen context. Different microscopy methods and electrical structures must not be pooled into one device specification.
- **Qualify an accepted early-version result.** Lin remains explicitly labelled an early version on the publisher page at this review date. Its abstract supports the stated channel scale and reported subthreshold result, but does not expose every bias, temperature or extraction condition. The short discovery summary now states that access boundary. No final volume/article number or unobserved measurement condition was invented.
- **Add contact measurement context.** The Yang contact summary now identifies room-temperature measurements; the result remains specific to the Bi/MoS₂ contact and distinct from gate and channel lengths.
- **Refresh the editorial review date honestly.** The selected-study cutoff and the two research-page review statements are 21 October 2026. This indicates this audit of the selected records, rather than exhaustive coverage of all recent research.

The other checked research claims were supported at their stated level and retained. No source I–V curves, new fabricated data, figures or crystal coordinates were added. Existing study identifiers, category values, filters, timeline, section anchors and interfaces remain unchanged.

## Study-by-study access and decision record

| Record | Primary source actually checked | Access and decision |
| --- | --- | --- |
| `mak2010` | [Author-hosted paper](https://web.stanford.edu/group/heinz/publications/Pub173.pdf), DOI 10.1103/PhysRevLett.105.136805 | PDF opening pages, optical methods and layer-dependent evidence. Retain the optical/direct-gap overview; do not equate an optical transition with a quasiparticle gap or transistor performance. |
| `radis2011` | [Publisher](https://www.nature.com/articles/nnano.2010.279), DOI 10.1038/nnano.2010.279 | Public abstract, figure headings and correction history. Retain the qualitative top-gated single-layer demonstration; no universal mobility or new experimental curve is inferred. |
| `desai2016` | [Participating laboratory technical summary](https://foundry.lbl.gov/2016/10/16/mos2-transistors-with-1-nanometer-gate-lengths/), DOI 10.1126/science.aah4698 | Primary institutional account, including the physical nanotube gate and bias-dependent effective channel distinction. The complete Science methods were not re-accessed in this pass. |
| `tang2023` | [Publisher](https://www.nature.com/articles/s41467-023-39390-9), DOI 10.1038/s41467-023-39390-9 | Public main text and Fig. 1 caption verify gate-first processing and rigid/flexible circuit demonstrations. Preserve qualitative claims and their processing scope. |
| `kwon2024` | [Publisher](https://www.nature.com/articles/s41928-024-01158-4), DOI 10.1038/s41928-024-01158-4 | Public abstract verifies polycrystalline MoS₂ integration on the stated wafer platform. Paywalled fabrication methods were not assumed accessible; commercial adoption remains unestablished. |
| `zhang2025` | [Publisher](https://www.nature.com/articles/s41467-025-59803-1), DOI 10.1038/s41467-025-59803-1 | Main text and Fig. 1 caption verify the transfer specimens and characterization. “Dry transfer” is the reported method name, not a claim that every cleaning step is liquid-free. |
| `guo2026` | [Publisher](https://www.nature.com/articles/s41928-026-01573-9), DOI 10.1038/s41928-026-01573-9 | Public abstract verifies iterative integration and the comparison to early Intel processors. Retain the distinction from superiority over modern silicon CPUs; full paywalled methods were not inspected. |
| `fan2026` | [Publisher](https://www.nature.com/articles/s41928-026-01641-0), DOI 10.1038/s41928-026-01641-0 | Public abstract verifies the existing process, transistor-count and interconnect-level claims. Device integration remains a research-computer demonstration. |
| `wang2026` | [Publisher](https://www.nature.com/articles/s41467-026-75409-7), DOI 10.1038/s41467-026-75409-7 | Abstract and main-text fabrication/scaling discussion. Preserve the separate physical gate and channel dimensions, and distinguish measured devices from transport projections. |
| `lin2026` | [Publisher early version](https://www.nature.com/articles/s41467-026-77186-9), DOI 10.1038/s41467-026-77186-9 | Early-version notice and public abstract checked. Measurement-condition details not supplied there remain unverified; the accepted version can change. |
| `wong2026` | [Publisher](https://www.nature.com/articles/s41467-026-78053-3), DOI 10.1038/s41467-026-78053-3 | Relevant main-text measurement descriptions and Figs. 1–4. Separate test structures; preserve reported uncertainty without assigning an unverified statistical meaning. |
| `yang-stacking2026` | [Publisher](https://www.nature.com/articles/s41586-026-11069-3), DOI 10.1038/s41586-026-11069-3 | Public abstract and figure headings support the engineered stacking/ARPES/calculation/optical account. Paywalled coordinates and methods were not inferred; ideal Lab coordinates do not reconstruct this study. |
| `yang-contacts2026` | [Publisher](https://www.nature.com/articles/s41586-026-10707-0), DOI 10.1038/s41586-026-10707-0 | Public main text identifies spatial contact metrology and its specific specimen/operating context. The directly probed injection region is distinct from a TLM extrapolation and from channel length. |
| `kim-stretch2026` | [Publisher](https://www.nature.com/articles/s41467-026-68504-2), DOI 10.1038/s41467-026-68504-2 | Public main text supports interflake motion and network connectivity. Do not reinterpret network strain as uniform Mo–S bond strain or extracted field-effect mobility as an intrinsic constant. |
| `imec2026` | [Institutional release](https://www.imec-int.com/en/press/asml-tsmc-and-imec-bring-industry-ready-2d-material-transistors-closer-breakthrough-300mm) | Primary announcement, not a journal paper. Retain pitch/wafer/yield-criterion distinctions and the mixed-TMD scope; its WS₂ image is not relabelled as MoS₂. |

The selected-study abstracts were accessed through the public publisher pages. Some publisher pages required their normal `?error=cookies_not_supported` public rendering. Direct shell requests were rejected by the session proxy; no access to subscription content was obtained or implied. The author-hosted Mak PDF and institutional Desai/imec sources were accessible through the web tool.

## Consistency decisions retained

- Physical gate length, source–drain channel length, carrier transfer length, contacted pitch and wafer diameter describe different dimensions.
- Equivalent oxide thickness describes capacitance; it is not the physical oxide, carbon-dot, or MoS₂ thickness.
- A direct-gap stacking result does not apply to every bilayer or supply an experimentally relaxed coordinate set for the Lab.
- Wafer integration, individual-device yield, circuit-module yield, full-system operation and commercial qualification are different evidence levels.
- The classical numerical simulator neither fits these papers nor reproduces quantum transport, structural relaxation, trapping, optical response or strain mechanics.
- Existing original conceptual diagrams and the single-value EOT plot remain separate from attributed experimental images; this task imports no new publisher figure or experimental transport dataset.

## Verification scope

Run the project lint/typecheck/tests/build and the parent's complete site/link/anchor checks after integration. This audit itself verifies source claims and text, not a reproduction of the experiments. The narrow text edits require no change to the solver, chart math, category schema, reference IDs or scientific scene geometry.
