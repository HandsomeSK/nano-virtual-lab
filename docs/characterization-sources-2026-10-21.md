# MoS₂ characterization and optical definitions

Reviewed 21 October 2026. These additions use the existing Materials page and
server-rendered editorial components. No source image, experimental spectrum or
unavailable dataset is reproduced. The excitation-level SVG is original and
explicitly conceptual, with no numerical scale.

## Existing-content audit and scope

Foundations already introduces complementary measurement techniques and retains
its existing teaching activities. The MoS₂ page lacked a method-by-method account
of Raman, AFM, electron microscopy and photoluminescence, and did not explain why
an optical feature differs from a quasiparticle gap. The new sections fill those
gaps without duplicating the layer/stacking evidence or creating another viewer.

Each characterization method states its principle, measured observable,
MoS₂ inference, published evidence and limitations. Stable targets are
`#characterization`, `#raman`, `#afm`, `#tem` and `#pl`; optics uses `#excitons`.
Parent-page integration and directory entries are maintained by the page owner.

## Primary evidence and access

| Reference ID | Source | Access actually checked | Use and boundary |
| --- | --- | --- | --- |
| `lee2010` | [Lee et al., ACS Nano, DOI 10.1021/nn1003937](https://pubs.acs.org/doi/10.1021/nn1003937); [author preprint](https://arxiv.org/pdf/1005.2509) | Full author preprint, especially pp. 2–3 and Methods | Exfoliated SiO₂/Si samples; independent contact-mode AFM layer counts and layer-dependent Raman shifts. Apparent substrate/flake heights differ from internal terraces. No universal Raman-spacing threshold is assigned. |
| `chakraborty2012` | [Chakraborty et al., Physical Review B, DOI 10.1103/PhysRevB.85.161403](https://journals.aps.org/prb/abstract/10.1103/PhysRevB.85.161403) | Publisher abstract; author version available | Electrochemically top-gated monolayer Raman evidence for doping-dependent phonon response; not a calibration for arbitrary devices. |
| `conley2013` | [Conley et al., Nano Letters, DOI 10.1021/nl4014748](https://pubs.acs.org/doi/10.1021/nl4014748); [author preprint](https://arxiv.org/abs/1305.3880) | Publisher-indexed abstract and author preprint metadata | Strain can modify Raman/optical response. The site does not copy reported numerical shift coefficients into a universal rule. |
| `vanderzande2013` | [Van der Zande et al., Nature Materials, DOI 10.1038/nmat3633](https://www.nature.com/articles/nmat3633); [author-hosted paper](https://web.stanford.edu/group/heinz/publications/Pub205.pdf) | Author-hosted full article | CVD grain orientation and boundaries from electron microscopy; optical/electrical evidence comes from separate measurements, not an image alone. |
| `komsa2012` | [Komsa et al., Physical Review Letters, DOI 10.1103/PhysRevLett.109.035503](https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.109.035503) | Publisher abstract | The explicitly reported 80 keV MoS₂ vacancy observation illustrates beam damage. No general safe beam voltage or dose is inferred. |
| `mak2010` | [Mak et al., Physical Review Letters, DOI 10.1103/PhysRevLett.105.136805](https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.105.136805); [author-hosted paper](https://web.stanford.edu/group/heinz/publications/Pub173.pdf) | Full author-hosted article, particularly p. 2 | Room-temperature suspended-sample PL used 532 nm excitation; the reported A peak is 1.90 eV. The photoconductivity rise near 1.8 eV is a different observable. Neither becomes a universal quasiparticle gap. |
| `buscema2014` | [Buscema et al., Nano Research, DOI 10.1007/s12274-014-0424-0](https://www.sciopen.com/article/10.1007/s12274-014-0424-0) | Publisher abstract | Comparison of dielectric and conducting supports; optical interference, doping and decay pathways affect Raman/PL response. No generalized PL-quality ranking is made. |
| `qiu2013` | [Qiu et al., Physical Review Letters, DOI 10.1103/PhysRevLett.111.216805](https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.111.216805); [2015 erratum](https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.115.119901) | Full author preprint; registry owner additionally checked the official erratum PDF | Many-body optical calculation, explicitly distinct from experiment. Only the qualitative interacting-pair relationship is used; original pre-erratum binding-energy numbers are not repeated. |

The selected Raman-mode notation distinguishes 1H-monolayer E′/A₁′ from common
bulk E₂g¹/A₁g labels. The optical relation applies to a corresponding neutral
exciton and direct quasiparticle continuum in the same sample/environment;
charged, defect-assisted and phonon-assisted transitions require more detail.

AFM height is an interaction-dependent apparent step, not the separation of the
two sulfur atomic planes. No separate mica-height number or uncertain
Castellanos-Gomez citation was added. The relevant Castellanos-Gomez 2010 optical
identification paper is DOI 10.1063/1.3442495, rather than the initially suggested
1.3449577; Lee's actually accessed MoS₂ measurements suffice here.

## Layout and implementation

The four methods use open editorial columns and rules, without card grids,
mandatory disclosures or added client JavaScript. They stack on narrow screens.
The small optical diagram uses existing scientific surface/ink/accent tokens,
keeps a textual explanation and accessible name, and has no animation.
The original diagrams, 3D instruments and material-comparison activities remain
owned by their existing components.

## Verification boundary

Scoped ESLint and CSS Modules compilation are run on the added files. Scientific
source checking is recorded above; the complete page, citation and browser checks
are performed after integration. No claim of experimental-data reproduction or
numerical exciton calculation is made.
