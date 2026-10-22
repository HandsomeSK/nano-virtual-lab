# Classical simulator scientific audit

Audit date: **21 October 2026**. This review covers `src/lib/simulation/model.ts`, its live result explanations and the Simulator/Comparison reading paths. It does not calibrate the model to an experimental MoS₂ transistor.

## Scope and findings

| Item | Finding and action |
| --- | --- |
| Current law | Preserve the existing piecewise gradual-channel square law. Its assumptions and the meaning of internal channel voltages are now explicit beside the equations. |
| SI conversion | Correct: mobility cm²/(V s) × 10⁻⁴ → m²/(V s); length nm × 10⁻⁹ → m; total contact resistance kΩ × 10³ → Ω. |
| Fixed parameters | Preserve assumed W = 1 μm, Cg = 0.01 F/m² and VT = 0.7 V. These are teaching constants, not extracted MoS₂ material constants. |
| Contact model | Preserve symmetric, voltage-independent, lumped ohmic resistances. The slider is total source-plus-drain resistance, not a contact resistivity or width-normalized Ω·μm quantity. |
| Operating region | **Corrected:** zero current at VDS = 0 and VGS > VT was labelled OFF. A gate-induced channel at zero drain bias is the zero-current endpoint of the linear region. Region classification now uses internal overdrive; current and solver values do not change. |
| State schematic | Its current-flow markers remain unchanged. Replace the ambiguous zero-current OFF label with “Zero current,” so the illustration does not imply absence of gate-induced channel charge. It is a conceptual current indication, not a calculated charge map. |
| Transconductance | Preserve the numerical derivative. Explain external terminal definition, ±1 mV central difference and one-sided endpoint differences. |
| Power | Correct: the returned electrical power is I × external VDS. It includes channel and contacts, not just channel dissipation, and is not a temperature or self-heating result. |
| Parameter explanations | Extend the existing live interpretation: mobility and length enter β; contact feedback limits current gain; the classical 1/L trend cannot be extrapolated to ballistic/atomic transport. |
| Unmodelled physics | State quantum/ballistic transport, Schottky injection, trap dynamics, subthreshold/short-channel leakage, quantum capacitance, velocity saturation, self-heating and channel-length modulation explicitly. |
| Measurement evidence | Retain the existing licensed Shimazu Figure 1. Verify its actual sample, bias and sweep conditions and the paper’s attributed trapping interpretation. No curve is digitized, fitted or reconstructed. |
| Persistence and comparison | No changes to normalization bounds, all five parameter controls, URL schemas, scenario names, save storage, reset, edit/return, curve modes or A/B calculation paths. Comparison automatically receives the corrected region label from the shared model. |

## Derivation and consistency

Let β = μ Cg W/L, with β in A/V², internal overdrive u = VGS,i − VT and internal drain bias d = VDS,i. The model has:

- Cutoff: I = 0 when u ≤ 0.
- Linear region: I = β(ud − d²/2), for u > 0 and 0 ≤ d < u.
- Saturation: I = βu²/2, for u > 0 and d ≥ u.

The two conducting expressions agree at d = u; their drain derivatives both approach zero there. Current also approaches zero continuously at u = 0. At d = 0 and u > 0, the linear expression gives zero current without implying cutoff.

For total contact resistance R, Rs = Rd = R/2. With the external source as voltage reference:

VGS,i = VGS,external − IR/2

VDS,i = VDS,external − IR

The solver finds the root of F(I) = I_channel(VGS,i, VDS,i) − I. Increasing I reduces both internal voltages, so the channel contribution cannot increase within this model; subtracting I gives a unique root. With positive biases and R > 0, the bracket [0, min(I_without_contacts, VDS,external/R)] contains that root. At zero bias or cutoff, zero is returned directly. Sixty bisection iterations preserve this bounded, self-consistent solution across the UI parameter range.

For an independent transconductance check, write the intrinsic local derivatives as gmi = ∂I_channel/∂VGS,i and gdi = ∂I_channel/∂VDS,i. Differentiating the contact equations at fixed external VDS gives:

gm,external = gmi / (1 + Rgmi/2 + Rgdi)

In the linear region, gmi = βd and gdi = β(u − d); in saturation, gmi = βu and gdi = 0. This derivative is used only as a regression oracle, not as a second production model.

Electrical power satisfies:

Pexternal = I VDS,external = I VDS,i + I²R

The first term is channel electrical dissipation and the second is combined contact dissipation. Neither term supplies a temperature without an additional thermal model.

## Evidence checked

1. [COCOA, Section 2.1: First-Order MOSFET Model](https://bmurmann.github.io/COCOA/contents/partI/partI.2.html#first-order-mosfet-model): accessible textbook equations 2.6–2.9 checked on 21 October 2026. These support the general classical model, not a material-specific MoS₂ fit. NanoLab’s constant parameters and symmetric series contacts are its own teaching assumptions.
2. [Shimazu et al., Scientific Reports 6, 30084 (2016)](https://www.nature.com/articles/srep30084), DOI [10.1038/srep30084](https://doi.org/10.1038/srep30084): full publisher Results and Figure 1 caption accessible and checked on 21 October 2026. Figure 1 uses the 6 nm specimen, L = 4.3 μm and W = 4.1 μm, Ti/Au contacts, SiO₂/Si back gate, VDS = 0.1 V and approximately 1 V/s sweeps. The authors’ scaling of some panel-c curves and offsets in panel d remain in the unchanged figure/caption. This is qualitative evidence for environmental and history dependence; it does not validate the model’s numerical current.
3. [Cheng et al., Nature Electronics 5, 416–423 (2022)](https://doi.org/10.1038/s41928-022-00798-8): existing benchmarking reference retained for device and measurement context. The separate registry audit owns fresh bibliography/access verification; this simulator review does not claim new inspection of inaccessible publisher methods.

## Automated checks

`tests/simulation.test.mjs` retains its existing analytic SI examples, normalization/URL/save validation and curve checks. Added independent checks cover:

- Continuity at cutoff and linear/saturation boundaries.
- The above-threshold, zero-drain-bias region regression, reproduced as failing before the correction.
- A 320-case parameter grid spanning gate/bias boundaries, both length/mobility endpoints and zero, tiny, nominal and maximum contact resistances: finite nonnegative results, bounded internal voltages, the contact-limited current bound and channel-equation residual.
- External transconductance against the analytic contact-feedback derivative in linear and saturated examples, with/without contacts.
- External power and channel-plus-contact energy balance.

The production current law, fixed constants, 60-iteration solver, curve sampling and finite-difference algorithm remain unchanged. Only the operating-region predicate is corrected. Focused simulation/insight tests pass; site-wide checks and actual-browser acceptance are recorded by the integrating task.
