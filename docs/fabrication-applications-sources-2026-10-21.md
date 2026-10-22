# MoS₂ fabrication and applications: source and scope audit

Reviewed 21 October 2026. This is a selected teaching synthesis, not a claim of
complete literature coverage. Public abstracts, publisher records and author
repositories were used at the access levels recorded below. No unavailable
experimental methods, numerical performance values or figure permissions were
inferred from a title.

## Existing content and ownership

- Device already owns transistor components and operation. Its new
  `#fabrication` section connects preparation, transfer, patterning and gate
  integration without duplicating an interactive device.
- Research and Challenges already contain the selenium-transfer and flexible
  electronics case studies. The new process and application sections link to
  those canonical accounts rather than repeat their full experimental summaries.
- Research receives `#applications`, with `#application-photodetectors`,
  `#application-sensors` and `#application-catalysis`. No new route, navigation
  category, numerical solver, experimental curve or Three.js scene is added.
- Existing typography, section headings, native links, citations and reading
  disclosures are reused. Only the ordered process list needs scoped spacing.

## New sources and evidence boundaries

| Reference ID | Verified source | Access and use |
| --- | --- | --- |
| `lee-cvd2012` | [Lee et al., Advanced Materials (2012), DOI 10.1002/adma.201104798](https://doi.org/10.1002/adma.201104798); [author manuscript abstract](https://arxiv.org/abs/1202.5458) | Publisher metadata and author abstract read. Supports MoO₃/sulfur CVD on SiO₂ and structural/electrical characterization; no growth recipe or universal film quality is claimed. |
| `george-ald2010` | [George, Chemical Reviews (2010), DOI 10.1021/cr900056b](https://doi.org/10.1021/cr900056b) | Publisher metadata and indexed review description checked. Used for sequential, self-limiting surface reactions; the teaching account distinguishes cycle count from a complete atomic plane. The large institution-hosted PDF was not opened successfully in the web reader. |
| `lopez-photodetector2013` | [Lopez-Sanchez et al., Nature Nanotechnology (2013), DOI 10.1038/nnano.2013.100](https://doi.org/10.1038/nnano.2013.100) | Publisher metadata/indexed abstract checked; the EPFL publication record also exposes the abstract. Direct publisher open encountered an identity redirect. Only the demonstrated monolayer phototransistor response is summarized; headline responsivity values and unvisited bias protocols are omitted. |
| `furchi2014` | [Furchi et al., Nano Letters (2014), DOI 10.1021/nl502339q](https://doi.org/10.1021/nl502339q); [author abstract, revised October 2014](https://arxiv.org/abs/1406.5640) | Author abstract read. Biased mono-/bilayer devices distinguish molecular charge transfer and band-tail trapping. The site does not present those mechanisms as universal or import the paper’s model. |
| `late2013` | [Late et al., ACS Nano (2013), DOI 10.1021/nn400026u](https://doi.org/10.1021/nn400026u); [article abstract](https://pubmed.ncbi.nlm.nih.gov/23713986/) | Original article abstract read through PubMed. The reported comparison uses exfoliated single/few-layer films on SiO₂/Si, NO₂/NH₃/humidity, and varied bias/light. No detection-limit number is generalized. |
| `jaramillo2007` | [Jaramillo et al., Science (2007), DOI 10.1126/science.1141483](https://doi.org/10.1126/science.1141483); [article abstract](https://pubmed.ncbi.nlm.nih.gov/17615351/) | Original abstract read. STM site counting on MoS₂ nanoparticles/Au(111) is connected with HER activity. No unvisited electrolyte protocol or numerical benchmark is added. |
| `lukowski2013` | [Lukowski et al., JACS (2013), DOI 10.1021/ja404523s](https://doi.org/10.1021/ja404523s); [article abstract](https://pubmed.ncbi.nlm.nih.gov/23790049/) | Original abstract read. Supports the separate chemically exfoliated metallic-nanosheet case and the importance of transport/site accessibility. Performance numbers are omitted. |
| `li-her2016` | [Li et al., Nature Materials 15, 48–53 (2016), DOI 10.1038/nmat4465](https://doi.org/10.1038/nmat4465); [correction DOI 10.1038/nmat4564](https://doi.org/10.1038/nmat4564) | Indexed publisher abstract and correction record checked; direct opens encountered an identity redirect. Supports a specific vacancy/strain route to basal-plane activity; no universal activity statement follows. Online publication was in 2015; journal issue year is 2016. |

Metadata and access notes are centralized by the reference-registry audit in
`src/data/references.ts`. These sources are paraphrased; no article illustration,
spectrum, dataset or long extract is reproduced.

## Existing sources reused with limited purpose

- `radis2011`: exfoliated MoS₂ and a published top-gate example support process
  dependencies; the new seven-stage sequence is explicitly illustrative.
- `zhang2025`: the selenium-assisted transfer case remains research evidence,
  not proof of a residue-free universal process. “Dry transfer” is not treated as
  a promise that every ancillary step is liquid-free.
- `tang2023`: a gate-first integration example establishes that gate/dielectric
  formation can precede MoS₂ transfer; bending is distinct from network stretching.
- `engineering2024`: gate-stack chemistry, contacts and process compatibility
  connect fabrication to device behavior without creating a performance ranking.
- `mak2010`: layer-dependent optical transitions motivate light absorption;
  exciton separation and electrical collection remain separate steps.
- `kim-stretch2026`: the existing network case connects relative flake motion
  with electrical connectivity, rather than implying uniformly stretched bonds.

## Interpretation safeguards

Responsivity uses photocurrent divided by incident power on a defined active
area, with wavelength, bias, timing and area normalization stated as required
measurement context. It is not an absorbed-power efficiency or a noise metric.
No detectivity or quantum-efficiency value is calculated.

Sensor detection limits require noise/concentration protocols; selectivity,
humidity and recovery remain separate questions. HER comparisons require stated
current normalization, electrolyte, reference electrode, resistance correction,
loading and stability. No unsupported overpotential or Tafel-slope value is shown.

The process text gives no operational fabrication recipe. Surface chemistry,
patterning and architecture determine ordering; gate-first, gate-last and
contact-last examples must not be conflated.
