import type { Metadata } from "next";
import {
  PageShell,
  RelatedTopics,
  SectionHeading,
} from "@/components/page-shell";
import { ScientificFigure } from "@/components/scientific-figure";
import { ReferenceLink } from "@/components/reference-link";
import { Simulator } from "@/components/simulation/simulator";
import { normalizeParameters } from "@/lib/simulation/model";
import type { Query } from "@/lib/site";
export const metadata: Metadata = { title: "Transistor Simulator" };
export default async function SimulatorPage({
  searchParams,
}: {
  searchParams: Promise<Query>;
}) {
  const query = await searchParams;
  return (
    <PageShell
      title="Transistor Simulator"
      intro="Turn a material idea into a device experiment. Adjust bias, channel geometry and contacts, then follow the calculated response and its explanation."
    >
      <p className="model-note text-sm mb-6">
        <strong>Simplified Educational Model.</strong> A MoS₂-context,
        long-channel teaching calculation with assumed parameters, rather than a
        calibrated device prediction.
      </p>
      <div id="simulation">
        <Simulator
          key={JSON.stringify(query)}
          initial={normalizeParameters(query)}
        />
      </div>
      <section className="section" id="model-assumptions">
        <SectionHeading
          title="Model Assumptions & Units"
          description="Read the calculated curves as controlled experiments on one educational approximation."
        />
        <div className="two-column">
          <div className="panel">
            <h3>What is fixed?</h3>
            <p className="text-sm mt-3">
              W = 1 μm, Cg = 0.01 F/m² and VT = 0.7 V are assumed teaching
              constants. Mobility is constant and the long-channel,
              gradual-channel model treats the channel classically. The solver
              converts μ from cm²/Vs to m²/Vs (×10⁻⁴), L from nm to m (×10⁻⁹)
              and contact resistance from kΩ to Ω (×10³).
              <ReferenceLink id="assets" from="/simulator#model-assumptions" />
              <ReferenceLink id="mosfet" from="/simulator#model-assumptions" />
            </p>
            <p className="text-sm mt-3">
              The default inputs are VGS = 1.5 V, VDS = 1 V, L = 500 nm, μ = 50
              cm²/Vs and total Rc = 10 kΩ. They describe a teaching scenario,
              not the specimen in a published figure.
            </p>
          </div>
          <div className="panel">
            <h3>Why do contacts change the curve?</h3>
            <p className="text-sm mt-3">
              Rc is the total source-plus-drain resistance, split equally. The
              self-consistent current uses internal VGS = VGS,external − IDRc/2
              and VDS = VDS,external − IDRc. Contacts therefore reduce gate
              overdrive and channel bias. The kΩ control is not a
              width-normalized Ω·μm value from a contact-extraction paper.
            </p>
            <p className="text-sm mt-3">
              Zero drain bias or non-positive overdrive produces zero current.
              This assumed cutoff excludes subthreshold leakage, so no
              experimental ON/OFF ratio can be inferred. The model also omits
              traps, Schottky injection, quantum capacitance, velocity
              saturation, self-heating and short-channel
              tunnelling/electrostatics.
            </p>
          </div>
        </div>
      </section>
      <section
        className="section simulator-evidence"
        id="experimental-evidence"
      >
        <SectionHeading
          title="Experimental Evidence: History Matters"
          description="A measured transfer curve can depend on environment and sweep direction as well as voltage."
        />
        <ScientificFigure id="shimazu-hysteresis" />
        <p>
          Shimazu et al. found different forward and reverse transfer curves
          under different gas and humidity conditions. Charge adsorption and
          trapping can change the effective threshold as time passes. In
          contrast, the teaching model is memoryless: the same inputs always
          give the same current. Contact voltage drops are included; trap
          occupation and hysteresis are not.
          <ReferenceLink
            id="shimazu2016"
            from="/simulator#experimental-evidence"
          />
        </p>
        <p className="model-note text-sm mt-4">
          <strong>Qualitative comparison only.</strong> The published device
          uses different thickness, geometry, gate stack, bias range and
          environment. Its curves have not been digitized or fitted. They
          explain a missing physical mechanism; they do not validate this
          simulator’s numerical accuracy. See the original caption and methods
          for every panel.
        </p>
      </section>
      <RelatedTopics
        links={[
          {
            href: "/comparison",
            title: "Compare device assumptions",
            description: "Compare the same model under different assumptions.",
          },
          {
            href: "/challenges",
            title: "Engineering Challenges",
            description: "See the effects this teaching model leaves out.",
          },
        ]}
      />
    </PageShell>
  );
}
