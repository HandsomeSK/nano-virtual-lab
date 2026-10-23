# Raman analysis — 23 October 2026

## Data and access decision

No complete, machine-readable Raman spectrum with a verified reuse basis was obtained for this feature. The website therefore keeps source-reported numerical observations separate from its original conceptual spectrum. No figure coordinates were guessed, digitized or traced. No publisher image, measured intensity array or experimental linewidth is copied.

- **Published experimental evidence:** [Lee et al., ACS Nano 4, 2695–2700 (2010), DOI10.1021/nn1003937](https://doi.org/10.1021/nn1003937), existing `lee2010`. The [author-hosted full article](https://www.columbia.edu/cu/chemistry/fac-bios/brus/group/pdf-files/Changgu_Lee_ACS_Nano_2010.pdf) was read on 23 October. Page2696 explicitly reports an approximately3cm⁻¹ monolayer-to-bilayer increase in the separation and the monolayer in-plane mode near384cm⁻¹. Page2699 specifies supported flakes on285nm SiO₂/Si, ambient514.5nm excitation, backscattering and2.7cm⁻¹ instrumental resolution. Its separate suspended-sample measurement uses532nm and1.0cm⁻¹ resolution; those conditions are not combined with the supported series.
- **Symmetry naming:** [O’Brien et al., Scientific Reports6,19476 (2016), DOI10.1038/srep19476](https://www.nature.com/articles/srep19476), `obrien-raman2016`. Full accessible primary article checked on23October. Its Results distinguishes ideal2H odd-layer D₃h, even-layer D₃d and bulk D₆h representations; the component names E′/A₁′, Eg/A₁g and E₂g¹/A₁g accordingly. These assignments are not asserted for arbitrary stacking/symmetry.
- Existing `chakraborty2012`, `conley2013` and `buscema2014` remain the linked doping, strain and substrate caveats; their established source scope from the previous registry audit is retained, not relabelled as newly read full text.

## Calculation and illustration

`analyzeRamanPeaks` calculates Δω = ωout − ωin in cm⁻¹, with finite-input and demonstration-window validation. Reversed/equal pairs receive a correction message rather than a layer classification.

All three presets are explicitly illustrative: (385,403), (384,406), (383,409)cm⁻¹. Their differences18/22/26cm⁻¹ are calculated teaching values, not Lee's measured peak table. Mode labels follow the selected assumed symmetry; editing positions never infers a crystal structure.

The original SVG samples two deterministic Lorentzians: L(ω,ω₀)=4/[(ω−ω₀)²+4], I=L₁+0.85L₂. Each has an illustrative4cm⁻¹ FWHM. Intensities are divided by the largest sampled sum on360–430cm⁻¹ at0.25cm⁻¹ intervals. This is a conceptual line shape with illustrative parameters, not an instrument model, spectral fit, simulated Raman cross-section or experimental array. No random noise, performance threshold or automatic monolayer/bilayer classifier is introduced.

## Necessary checks

Scoped lint and four unit tests cover the difference/units, nonfinite/out-of-window/reversed values, normalized deterministic peaks/FWHM and opposing illustrative shifts. Parent integration owns route/anchor/reference checks and compilation. No full-site visual, performance or end-to-end acceptance was undertaken for this isolated feature.
