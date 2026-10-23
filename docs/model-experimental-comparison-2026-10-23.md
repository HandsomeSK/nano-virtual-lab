# Experimental evidence and model validation

Content review: **23 October 2026**. New content belongs to `/simulator#model-validation`; the existing simulator, equations, parameter bounds, URLs, save schema and comparison workflow are unchanged.

## Source and data choice

Rechecked [Shimazu et al., Scientific Reports 6, 30084 (2016)](https://doi.org/10.1038/srep30084), including the publisher Results, Methods and [publisher PDF Figure 1 caption](https://www.nature.com/articles/srep30084.pdf). The [PMC primary full-text copy](https://pmc.ncbi.nlm.nih.gov/articles/PMC4951808/) also exposes the caption. Later direct publisher HTML/figure requests reached Nature's SSO redirect; this does not imply inaccessible portions were inspected.

Figure 1's sample dimensions, back-gate stack, contacts and measurement protocol are recorded together in the component. The caption's +40 V ON-current reference is used explicitly; no sweep endpoints or numerical current values are inferred by reading plot pixels. The distinct low-temperature specimen in Figure 2a is excluded. The existing complete licensed Figure 1 and its author scaling/offset warnings remain the sole measured visual evidence. No raw dataset, digitization, fit, copied plot or new experimental result is introduced.

[COCOA Section 2.1](https://bmurmann.github.io/COCOA/contents/partI/partI.2.html#first-order-mosfet-model) was freshly read: its classical drift and gradual-channel derivation supports the general square-law assumptions, not MoS₂ calibration. Existing benchmarking reference `benchmark2022` supports the need to specify devices and extraction conditions; no new inspection of paywalled methods is claimed.

## Scientific interpretation

This is a qualitative applicability check, not a fitted comparison. Fixed parameters can shift a static curve; they cannot supply a missing time-dependent state. Separate the illustrative lumped contact loss from actual injection/interface mechanisms. Short-channel effects remain listed as omitted physics but are not presented as findings of this micrometre-channel experiment. Matching shape alone would not validate absolute current, leakage, switching limits or a universal mobility.

## Read-only numerical check

Reviewed `model.ts`, its displayed equations and existing analytic tests. No correction to the solver is warranted: SI conversions, linear/saturation continuity, symmetric contact feedback and bisection, external-terminal transconductance, external drain power and the zero-drain-bias linear state remain consistent with the October 21 audit. The existing simulation, insight and journey tests passed: 18/18. Scoped ESLint on the new component passed with zero warnings. The only test diagnostic was the pre-existing Node module-type warning; no package configuration was changed.

One wording correction is recommended in the existing assumptions paragraph: explicitly associate the abrupt cutoff with non-positive overdrive, and separately describe the zero-current linear endpoint at zero drain bias. The current paragraph's phrase “This assumed cutoff” can ambiguously refer to both preceding cases. No production model code was edited.

## Integration and limited verification

Place `ModelValidation` after the assumptions and before the original experimental figure; add its anchor to the current Simulator directory. The original figure and source/provenance caption should remain complete. Its following prose can be shortened to avoid repeating the new sample/method summary while retaining the authors' trapping interpretation and the qualitative-only limit.

The component is server-rendered and uses existing SectionHeading, reference links, native definition lists, two-column layout and reading styles. It adds no state, client script, chart package or CSS file. Scoped lint and existing simulation tests are the intended checks; no full-site visual or end-to-end acceptance was performed for this subtask.
