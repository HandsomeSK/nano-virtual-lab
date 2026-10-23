# MoS₂ photodetector analysis — 23 October 2026

## Scientific scope

The new `PhotodetectorAnalysis` belongs inside the existing Research photodetector article. It adds arithmetic on measurement inputs; it is not a second transport simulator or a new application direction.

The definition is signed external responsivity:

`Iph = Ilight − Idark`, in amperes, and `R = Iph / Pincident`, in A/W.

Both currents use the same stated bias and positive-current direction. Their signs are retained; a negative difference can indicate a reversed direction or photo-induced current suppression, depending on the measurement. Optical power must be positive and is the incident power on the defined active area. It is not absorbed power or automatically the whole laser-beam power. No absolute-value convention is silently applied.

The default pair (1.5 µA illuminated, 0.5 µA dark, 10 µW incident) is explicitly **Illustrative Parameters**. It gives **Calculated Results**: 1 µA photocurrent and 0.1 A/W responsivity. These inputs are not attributed to a publication. There is no generated experimental curve, inferred experimental quantum efficiency or claimed device performance record.

## Evidence and terminology

The parent article already carries verified references, retained without replacement:

- Lopez-Sanchez et al., *Ultrasensitive photodetectors based on monolayer MoS₂*, Nature Nanotechnology 8, 497–501 (2013), DOI `10.1038/nnano.2013.100` (`lopez-photodetector2013`). The prior reference audit records publisher metadata and accessible abstract verification. This supplies the monolayer MoS₂ phototransistor context and condition-dependent external responsivity, not the illustrative inputs.
- Furchi et al., *Mechanisms of photoconductivity in atomically thin MoS₂*, Nano Letters 14, 6165–6170 (2014), DOI `10.1021/nl502339q` (`furchi2014`). The prior audit records publisher metadata and author abstract verification. The existing article explains traps, molecular charge transfer and device-dependent response. No new inaccessible methods or numerical performance values are asserted by this component.

The calculator derives its outputs from the explicit algebra and SI conversions; no new numerical dataset is added. Quantum efficiency requires a photon-energy/wavelength convention; responsivity alone cannot separate absorption, charge collection and gain. Gain, bandwidth and noise remain distinct measurements. The interpretation links photogating to long-lived trapped charge and possible gain/recovery tradeoffs, without claiming that every MoS₂ detector has this mechanism.

## Input and numerical handling

Inputs retain editable strings so that clearing a field does not silently replace it with zero or a previous result. Current prefixes nA/µA/mA and power prefixes nW/µW/mW are converted independently to A and W. Inputs are finite, power is strictly positive, and nonrepresentable conversions or nonfinite results produce an inline correction message and no numerical output. Negative currents and zero/negative photocurrent are allowed under the stated signed convention. Responsivity is never fabricated for a zero-power measurement.

The component uses three native numeric fields, unit selectors and two live readouts, existing theme tokens, and a local CSS Module. It adds no dependency, transport solver, persistent-storage schema, curve library, new page or 3D scene.

## Limited checks

`tests/photodetector-analysis.test.mjs` independently checks the example in SI, all nine current/power prefix combinations plus mixed current units, signed/zero responses, algebraic current/power scaling, nonpositive optical power, empty/nonfinite/malformed inputs, conversion underflow and responsivity overflow/underflow. Focused ESLint checks cover only the new component and model. Parent integration owns the directory link, final TypeScript/build check and any necessary targeted rendered check; no full-site acceptance was attempted here.

Results: 7/7 focused tests passed; focused ESLint passed with zero warnings; a scoped TypeScript program for the new component/model passed without emitting files or writing `.next`.
