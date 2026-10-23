import type { Metadata } from "next";
import Link from "next/link";
import {
  PageShell,
  RelatedTopics,
  SectionHeading,
} from "@/components/page-shell";
import { ScientificFigure } from "@/components/scientific-figure";
import { ModelValidation } from "@/components/simulation/model-validation";
import { ReferenceLink } from "@/components/reference-link";
import { Simulator } from "@/components/simulation/simulator";
import { normalizeParameters } from "@/lib/simulation/model";
import { comparisonJourney } from "@/lib/simulation/journey";
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
      intro="Explore a classical transistor calculation in a MoS₂ context. Test bias, channel geometry and contacts, inspect the response, then compare two assumed scenarios."
      contents={[
        {
          title: "Run the experiment",
          items: [
            { id: "simulation", label: "I–V characteristics & controls" },
            { id: "understanding-results", label: "Understanding the results" },
          ],
        },
        {
          title: "Interpret the model",
          items: [
            { id: "model-assumptions", label: "Model assumptions & units" },
            { id: "model-validation", label: "Model & experiment comparison" },
            { id: "experimental-evidence", label: "Experimental evidence" },
          ],
        },
      ]}
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
          journey={comparisonJourney(query)}
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
              Zero drain bias gives zero current even when a channel is
              available. Cutoff means non-positive internal overdrive. The
              assumed cutoff excludes subthreshold leakage, so no
              experimental ON/OFF ratio or subthreshold swing can be inferred.
              The model omits quantum and ballistic transport,
              Schottky-barrier injection, trap dynamics, short-channel
              leakage/electrostatics, quantum capacitance, velocity saturation
              and self-heating. A shorter assumed channel therefore does not
              turn this calculation into a nanoscale transport solver.
            </p>
          </div>
        </div>
        <p className="text-sm mt-4">
          Real threshold voltage depends on the gate stack, work functions,
          charge environment and extraction method. Below threshold, real
          channels can carry thermally activated or leakage current. The fixed
          threshold and abrupt cutoff here deliberately leave out those
          mechanisms; a transfer curve from this model cannot establish the
          leakage or switching limits of a fabricated MoS₂ transistor.
          <ReferenceLink id="mosfet" from="/simulator#model-assumptions" />
          <ReferenceLink id="benchmark2022" from="/simulator#model-assumptions" />
        </p>
      </section>
      <ModelValidation />
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
          Inspect the published forward and reverse sweeps with their
          panel-specific annotations. The{" "}
          <Link href="#model-validation" className="text-link">
            device conditions and model comparison
          </Link>{" "}
          explain which physical conclusions the figure supports, without
          turning the measured histories into fitted simulator parameters.
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
            href: "/device#working-principle",
            title: "Understand gate control",
            description:
              "Connect the calculated voltages with transistor operation.",
          },
          {
            href: "/challenges#operating-history",
            title: "Explore history-dependent behaviour",
            description:
              "Read why measured curves can change with time and sweep direction.",
          },
        ]}
      />
    </PageShell>
  );
}
