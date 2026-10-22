# MoS₂ atomic geometry and phase audit

Reviewed 21 October 2026. Scope: the atomic-coordinate generator, material
comparison data, Lab descriptions, atomic inspector and existing geometry tests.
This is an audit of the ideal teaching model, not a new structural refinement.

## Evidence and access

| Source | What was checked | Access boundary |
| --- | --- | --- |
| [Ridolfi et al. (2015), Section 2](https://arxiv.org/html/1507.00356), DOI 10.1088/0953-8984/27/36/365501 | Three-atom basis; the paper's representative lattice parameter, atomic-plane positions and nearest-neighbour bond length | Full author manuscript inspected. The coordinates are consistent with the paper's DFT geometry; they are not measured coordinates of the viewer's finite fragment. |
| [Imani Yengejeh et al. (2020), Section 2 and Table 1](https://pmc.ncbi.nlm.nih.gov/articles/PMC7098060/), DOI 10.1021/acsomega.9b04360 | Coordination, stacking repeat and representative bulk layer spacing | Full primary article inspected through PMC. Table 1 distinguishes the authors' optimized values from experimental literature values. The ACS DOI endpoint returned 403; the PMC copy was accessible. |
| [Radisavljevic et al. (2011)](https://www.nature.com/articles/nnano.2010.279), DOI 10.1038/nnano.2010.279 | Published monolayer transistor thickness context | Publisher abstract and indexed text of the [EPFL primary PDF](https://infoscience.epfl.ch/bitstreams/90209eb7-1613-4ac8-8816-92372214c904/download) were available. A direct PDF open returned 429; no new claim of full-paper or figure inspection is made here. |

No source figure was copied or adapted in this change.

## Coordinate findings

The existing generator is internally consistent and was retained unchanged.

| Quantity | Unexpanded model value | Interpretation |
| --- | --- | --- |
| In-plane lattice constant | 3.16 Å | Primitive translation length |
| Mo-plane to either S-plane height | 1.56 Å | One vertical coordinate offset |
| Outer S-plane span | 3.12 Å | Two vertical offsets; not a channel-thickness convention |
| Nearest Mo–S bond | About 2.40 Å | Three-dimensional neighbour distance |
| Adjacent Mo-plane spacing | 6.15 Å | Representative sheet spacing, including the sheet and intersheet region |

The nominal approximately 0.65 nm channel-thickness scale must not replace the
S-plane coordinate span. Nor is the 6.15 Å spacing an empty gap or the complete
three-sheet repeat of bulk 3R. The 3R comparison intentionally holds the sheet
spacing fixed while changing registry; no separate relaxation is performed.

The finite model has the expected one-Mo/two-S basis, six S neighbours around
an interior Mo, and three Mo neighbours around an interior S. Edge truncation
does not model passivation or relaxation. Bonds do not connect separate sheets.

## Corrections and preserved behavior

- Material comparison now calls the semiconducting monolayer **1H** rather than
  assigning the bulk **2H** label without explanation. Both bulk 2H and 3R retain
  trigonal-prismatic local Mo coordination; ideal 1T is octahedral. A two-sheet
  3R-derived view shows local registry, not a complete bulk repeat.
- The MoS₂ optical-response summary cites Mak et al. rather than using a
  transistor reference as the primary source for optical energies. It
  distinguishes the optical onset and PL peak from a quasiparticle gap; the
  dedicated optics section supplies measurement conditions.
- Lab copy identifies MoS₂ as the main case study and graphene as a comparison.
  Inspector dimensions now separate bond length, unexpanded S-plane span and
  adjacent-sheet spacing. Enlarged inspection spacing is explicitly labelled.
- Geometry, three viewers, scene construction, atom selection, primitive-cell
  control, layer/stacking choices, camera, assembly and reset logic are retained.
  Neither electronic bands nor the engineered 2026 bilayer are reconstructed.
- The shared `Mos2StructureFigure` was reviewed without edits. It already labels
  1H coordination and declares its side view conceptual, with lateral registry
  and complete local coordination unavailable from that projection alone.

## Validation

`tests/atomic-geometry.test.mjs` adds a coordination/dimension invariant across
monolayer, 2H-derived and 3R-derived bilayers. It checks each atom in the interior
primitive basis and distinguishes the internal plane span from intersheet
spacing. All seven targeted geometry tests passed. Scoped ESLint and whitespace
checks passed. Whole-site TypeScript, build and rendered-browser checks are
reported in the parent scientific revision record.
