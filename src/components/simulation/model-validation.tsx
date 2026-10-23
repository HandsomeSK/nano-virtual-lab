import Link from "next/link";
import { SectionHeading } from "@/components/page-shell";
import { ReferenceLink } from "@/components/reference-link";
import readingStyles from "@/components/reading-paths.module.css";

export function ModelValidation() {
  return (
    <section className="section" id="model-validation">
      <SectionHeading
        title="Model validation: what can be compared?"
        description="Compare one documented MoS₂ device with the assumptions behind the calculated response."
      />
      <div className="two-column">
        <div>
          <h3>Published experimental evidence</h3>
          <p className="text-sm mt-3">
            Shimazu et al., Figure 1, follows one multilayer device. These
            conditions belong together; they are not the simulator defaults.
            <ReferenceLink id="shimazu2016" from="/simulator#model-validation" />
          </p>
          <dl className={readingStyles.brief}>
            <div>
              <dt>Specimen & geometry</dt>
              <dd>6 nm-thick MoS₂; channel L = 4.3 μm, W = 4.1 μm.</dd>
            </div>
            <div>
              <dt>Gate & contacts</dt>
              <dd>270 nm SiO₂ on a highly doped Si back gate; Ti/Au contacts.</dd>
            </div>
            <div>
              <dt>Bias & protocol</dt>
              <dd>
                VDS = 0.1 V at room temperature; gate sweeps in both directions
                at approximately 1 V/s. The Figure 1 caption uses Vg = +40 V
                as the ON-current reference point.
              </dd>
            </div>
            <div>
              <dt>Reported behaviour</dt>
              <dd>
                The hysteresis changes with gas and humidity. The authors
                attribute its main environmental contribution to charge
                trapping associated with adsorbed water.
              </dd>
            </div>
          </dl>
        </div>
        <div>
          <h3>Interpret the comparison</h3>
          <dl className={readingStyles.brief}>
            <div>
              <dt>What the model explains</dt>
              <dd>
                Classical drift transport and the gradual-channel approximation
                relate gate-induced charge to current. Within each chosen
                scenario, mobility, gate capacitance and threshold are constant;
                symmetric lumped contacts reduce the internal biases. This
                explains controlled trends within the assumed scenario.
                <ReferenceLink id="mosfet" from="/simulator#model-validation" />
              </dd>
            </div>
            <div>
              <dt>What the experiment tests</dt>
              <dd>
                Sweep history and the environment can change a measured curve
                at the same applied voltage. A memoryless calculation has no
                trap occupation or adsorption state, so changing its constant
                mobility or contact resistance cannot reproduce those dynamics.
              </dd>
            </div>
            <div>
              <dt>What this comparison cannot establish</dt>
              <dd>
                A lumped resistance does not resolve Schottky injection or
                interface chemistry. Short-channel effects are also omitted,
                but this micrometre-channel example is not evidence for them.
                The comparison establishes neither calibrated current accuracy
                nor a transferable set of MoS₂ material constants.
                <ReferenceLink id="benchmark2022" from="/simulator#model-validation" />
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <p className="learning-tip mt-4">
        <strong>Why a mismatch matters.</strong> First match the specimen,
        gate stack, geometry, bias, environment and measurement protocol; then
        check independently extracted parameters and unscaled data with their
        uncertainty. The published figure scales some panel-c curves and offsets
        panel-d curves. No raw dataset is imported, fitted or overlaid here, and
        no numerical validation error is inferred from their displayed heights.
      </p>
      <div className={readingStyles.actions}>
        <Link href="#model-assumptions" className="text-link">
          Read the assumptions and units
        </Link>
        <Link href="#experimental-evidence" className="text-link">
          Inspect the original measured figure
        </Link>
      </div>
    </section>
  );
}
