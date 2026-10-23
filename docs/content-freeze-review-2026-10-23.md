# Scientific content consistency review — 23 October 2026

## Scope and baseline

Reviewed the published scientific baseline `954cfa8733c78bff53c9ee1fafcf379ddf131238`
and the new Raman, photodetector and experimental-comparison source components.
This is a bounded content review: definitions, units, formula interpretation,
specimen identity, evidence categories, page ownership and necessary repetition.
It does not reopen the visual design, navigation architecture, model geometry,
large-scale performance work or full end-to-end acceptance.

The 21 October reference, atomic, simulation and research-claim ledgers remain
the source-access records for unchanged material. This review does not claim
fresh full-text access to every existing paper or repeat those bibliography
checks without a specific discrepancy. New source verification belongs to the
Raman and experimental-comparison records for this revision.

## Content ownership and consistency

| Page | Scientific responsibility and outcome |
| --- | --- |
| Home | Identifies MoS₂ as the primary case study and connects structure, fabrication, measurements and devices. No new numerical claim or design change is needed. |
| Foundations | Separates confinement from crystal bands, defines the sphere/plate surface-to-volume analogies and their limits, and uses graphene as a comparison. The infinite-well coefficient is consistent with free-electron mass and nanometre units. |
| Why MoS₂ | Keeps 1H coordination, bulk 2H/3R stacking and 1T coordination distinct. Nominal 0.65 nm thickness, 3.12 Å internal sulfur-plane span and 6.15 Å sheet spacing remain different quantities. Characterization belongs here. |
| 3D Lab | Describes ideal teaching geometry and local registry, not a relaxed reconstruction of a published engineered bilayer. Models remain tools for observing structure rather than predictions of bands or current. |
| Transistor Principles | Explains gate charge, contact transport and one illustrative process flow; gate-first and other orderings remain explicit alternatives. Macucci's device is kept separate from both simulator defaults and Shimazu's specimen. |
| Simulator | Current, β, SI conversions, symmetric contact drops, terminal transconductance and external drain power agree with the unchanged solver and prior derivations. A small wording clarification is identified below. |
| Comparison | A/B curves remain assumed scenarios in the same model, not measured material rankings. Mobility extraction, bias, geometry, width normalization and measured distributions are appropriately distinguished. |
| Research | Optical transitions do not imply universal quasiparticle gaps. Photodetection, sensing and HER retain their own mechanisms and limits. Gate/channel/transfer lengths, layout pitch and manufacturing readiness remain distinct. |
| Interface Breakthrough | Graphene test-structure EOT and separate MoS₂ transistor measurements remain identified. EOT is not physical HfO₂ thickness, and the uncertainty is not assigned an invented statistical meaning. |
| Engineering Challenges | Contact, trap, thermal and scaling explanations remain device-specific. Thermal boundary conductance is not bulk conductivity; complementary MoTe₂ evidence is explicitly a comparison rather than MoS₂ data. |
| About & References | Scientific fundamentals, measured research, institutional announcements and original models are separated; source and licence records remain centralized. |

The material and optical sections consistently distinguish the approximately
1.90 eV photoluminescence example from the approximately 1.8 eV photocurrent
onset. The conceptual relation `Eopt ≈ EgQP − Eb` is restricted to the same
direct transition, sample and dielectric environment; it is not a universal
numerical MoS₂ binding energy. Qualitative band sketches have normalized axes
and are not used to calculate simulator current.

## Small integration decisions completed

1. **Clarify zero-current versus cutoff language.** The baseline Simulator
   paragraph first groups zero drain bias and non-positive overdrive, then says
   “This assumed cutoff.” The numerical region code is already correct, but
   the prose can imply that both cases are cutoff. During comparison
   integration, explicitly state that zero drain bias can give zero current in
   an available channel, while cutoff means non-positive *internal* overdrive.
   The integrated paragraph now makes that distinction. No solver rewrite was
   needed.
2. **Use a link for an immediately repeated optical explanation.** The final
   paragraph of `LayerBandEvidence` repeats exciton binding and optical-gap
   content covered by `Mos2Optics` immediately afterwards. A short link can
   retain the learning connection without re-explaining the relation. The
   direct/indirect transition diagrams and their source remain useful. The
   integrated component now uses that contextual link.
3. **Keep necessary teaching repetition.** Device introduces gate control;
   Simulator defines its calculation; Challenges explains omitted mechanisms.
   These are different responsibilities. Concise material comparisons and
   research summaries should not be removed merely because a concept appears
   in another stage. Detailed experimental methods and citations remain at
   their canonical evidence sections.

No other baseline scientific correction was identified in the inspected
definitions, formulas, quantitative statements and evidence boundaries.

## New analysis functions

- **Raman:** preset centres and the fixed-width Lorentzian line shapes are
  labelled illustrative, with calculated separation in cm⁻¹. Published Lee
  statements remain a separate evidence block. Monolayer, even-layer and bulk
  mode labels have explicit symmetry context; other stackings need their own
  assignments. Changing peak positions does not produce an absolute
  layer-number classifier. The mode-symmetry source has been appended to the
  existing registry without renumbering earlier records. Lee's source note
  identifies the text pages for the reported peak trend and supported-sample
  conditions, keeping the separate suspended-sample protocol distinct.
- **Photodetection:** `Iph = Ilight − Idark` and `R = Iph/Pincident` preserve a
  declared current sign convention. Incident power concerns the defined active
  area and must be positive. Responsivity has A/W units and is not quantum
  efficiency, gain, noise or a response-time measurement. Illustrative defaults
  are not attributed to a paper. An extreme finite-input responsivity-underflow
  case was raised during review; the owning implementation now reports the
  same range error as other unsupported numerical cases instead of a false
  zero-response result.
- **Experimental comparison:** geometry, contacts, gate stack, bias and
  environment describe one Shimazu Figure 1 specimen. Author scaling/offsets
  stay visible, so no numerical fitting or validation error is inferred. The
  micrometre-channel device is not presented as evidence of short-channel
  effects. The existing memoryless solver cannot establish trapping dynamics
  or transferable material constants.

## Limited checks and review boundary

A read-only data check confirmed 51 unique baseline reference IDs and resolved
all 24 material/study/discovery reference entries. After integration, the
registry has 52 unique IDs and all 8 distinct references cited by the new
components resolve. No baseline reference was replaced for stylistic reasons.
The data check used Node's built-in TypeScript stripping; its existing
module-type warning did not require a package change.

The integrating task records final registry/anchor updates, focused formula
tests, lint, TypeScript and build results. This document does not claim a new
whole-site visual, performance, responsive or complete user-journey audit.
The three requested functions and the small wording/duplication corrections
complete the identified content scope. No additional scientific topic is
needed before content freeze.
