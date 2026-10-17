import type { Metadata } from "next";
import Link from "next/link";
import {
  PageShell,
  RelatedTopics,
  SectionHeading,
} from "@/components/page-shell";
import { ChallengeExplorer } from "@/components/challenge-explorer";
import { ReferenceLink } from "@/components/reference-link";
import {
  operatingHistoryCases,
  stressSequence,
  thermalBoundaryCase,
} from "@/data/challenge-evidence";
export const metadata: Metadata = { title: "Engineering Challenges" };
export default function Page() {
  return (
    <PageShell
      title="Engineering Challenges"
      intro="An atomically thin channel is only one part of a reliable transistor. Explore the interfaces, electrostatics and processes that shape a device."
      contents={[
        {
          title: "Device physics",
          items: [
            { id: "contacts", label: "Contact resistance", number: "01" },
            { id: "interfaces", label: "Gate dielectric & interface", number: "02" },
            { id: "scaling", label: "Short-channel effects", number: "03" },
          ],
        },
        {
          title: "Integration & operation",
          items: [
            { id: "manufacturing", label: "Manufacturing & integration", number: "04" },
            { id: "thermal-management", label: "Heat removal", number: "05" },
            { id: "operating-history", label: "Instability over time", number: "06" },
            { id: "complementary-logic", label: "Complementary logic", number: "07" },
            { id: "outlook", label: "Bringing the pieces together", number: "08" },
          ],
        },
      ]}
    >
      <section className="section challenges-overview" id="challenges-overview">
        <ChallengeExplorer />
      </section>
      <section className="section challenge-thermal" id="thermal-management">
        <SectionHeading
          title="Heat Must Leave the Channel"
          number="05"
          description="A transistor needs a heat path as well as an electrical path."
        />
        <div className="challenge-thermal-layout">
          <figure className="challenge-thermal-figure">
            <svg viewBox="0 0 520 300" role="img" aria-label="Conceptual heat path from the MoS₂ channel across a molecularly modified interface, through silicon dioxide and into the silicon support.">
              <defs>
                <marker id="thermal-heat-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0 0L6 3L0 6" fill="var(--orange-ink)" />
                </marker>
              </defs>
              <rect x="34" y="114" width="452" height="66" rx="4" fill="var(--orange-soft)" stroke="var(--orange-ink)" />
              <rect x="34" y="180" width="452" height="82" rx="4" fill="var(--indigo-soft)" stroke="var(--muted)" />
              <rect x="42" y="82" width="436" height="12" rx="3" fill="var(--cyan-soft)" stroke="var(--cyan-ink)" strokeWidth="2" />
              <path d="M44 104H476" fill="none" stroke="var(--primary)" strokeWidth="3" strokeDasharray="6 6" />
              <rect x="42" y="45" width="98" height="36" rx="4" fill="var(--muted)" />
              <rect x="380" y="45" width="98" height="36" rx="4" fill="var(--muted)" />
              <g fill="var(--ink)" fontSize="18" textAnchor="middle">
                <text x="91" y="32">Source</text>
                <text x="429" y="32">Drain</text>
                <text x="260" y="65">MoS₂ channel</text>
                <text x="107" y="152">SiO₂</text>
                <text x="114" y="228">Silicon</text>
              </g>
              <g fill="none" stroke="var(--orange-ink)" strokeWidth="3" markerEnd="url(#thermal-heat-arrow)">
                <path d="M221 90V240" />
                <path d="M260 90V240" />
                <path d="M299 90V240" />
              </g>
              <path d="M327 105H370L388 126" fill="none" stroke="var(--primary)" strokeWidth="1.5" />
              <text x="376" y="146" fill="var(--ink)" fontSize="16">SAM interface</text>
              <text x="260" y="287" textAnchor="middle" fill="var(--orange-ink)" fontSize="16">Heat flows into the supporting stack</text>
            </svg>
            <figcaption>
              Original heat-path schematic; layers are illustrative, with no calculated temperature field.
              <ReferenceLink id={thermalBoundaryCase.reference} from="/challenges#thermal-management" />
            </figcaption>
          </figure>
          <div className="challenge-thermal-prose">
            <h3>A Molecular Layer Changes the Heat Path</h3>
            <p>
              {thermalBoundaryCase.explanation}
              <ReferenceLink id={thermalBoundaryCase.reference} from="/challenges#thermal-management" />
            </p>
            <table className="challenge-thermal-table">
              <caption>Measured thermal boundary conductance (MW m⁻² K⁻¹)</caption>
              <thead><tr><th scope="col">Supporting surface</th><th scope="col">Conductance</th></tr></thead>
              <tbody>
                {thermalBoundaryCase.measurements.map((measurement) => (
                  <tr key={measurement.surface}>
                    <th scope="row">{measurement.surface}</th>
                    <td>{measurement.conductance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="challenge-source-note">
              {thermalBoundaryCase.conditions}
              <ReferenceLink id={thermalBoundaryCase.reference} from="/challenges#thermal-management" />
            </p>
          </div>
        </div>
        <div className="challenge-thermal-notes">
          <div>
            <h3>Separate the Interface from the Whole Stack</h3>
            <p>
              {thermalBoundaryCase.method}
              <ReferenceLink id={thermalBoundaryCase.reference} from="/challenges#thermal-management" />
            </p>
          </div>
          <div>
            <h3>What This Model Leaves Open</h3>
            <p>
              {thermalBoundaryCase.boundary}
              <ReferenceLink id={thermalBoundaryCase.reference} from="/challenges#thermal-management" />
            </p>
          </div>
        </div>
      </section>
      <section className="section challenge-history" id="operating-history">
        <SectionHeading
          title="What Happens After the First Sweep"
          number="06"
          description="Time, temperature and the injection path reveal different kinds of instability."
        />
        <ol className="challenge-stress-sequence" aria-label="Bias-stress measurement sequence">
          {stressSequence.map((step) => (
            <li key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
        <p className="challenge-source-note">
          Measurement sequence explained from Illarionov et al.; choose conditions
          for the device under test.
          <ReferenceLink id="illarionov2024" from="/challenges#operating-history" />
        </p>
        <div className="challenge-history-grid">
          {operatingHistoryCases.map((item) => (
            <article className="challenge-history-case" key={item.id}>
              <h3>{item.title}</h3>
              <p className="challenge-observation-label">{item.observation}</p>
              <p>
                {item.explanation}
                <ReferenceLink id={item.reference} from="/challenges#operating-history" />
              </p>
              <p className="challenge-takeaway">{item.takeaway}</p>
            </article>
          ))}
        </div>
        <p className="challenge-source-note">
          These examples describe particular fabricated devices. The simulator
          uses fixed parameters and constant series resistance; it does not model
          trapping, noise, recovery or device lifetime.
        </p>
      </section>
      <section className="section challenge-complementary" id="complementary-logic">
        <SectionHeading
          title="Two Carrier Types, One Logic Function"
          number="07"
          description="Complementary logic adds a materials-and-process question: how do you make electron and hole devices work together?"
        />
        <div className="challenge-complementary-layout">
          <figure className="challenge-logic-figure">
            <svg viewBox="0 0 520 300" role="img" aria-label="Conceptual complementary inverter: one input drives a p-type and an n-type transistor; their shared output connects to the supply or ground.">
              <g fill="none" stroke="var(--muted)" strokeWidth="3">
                <path d="M310 32V64M310 136V164H448M310 164V184M310 256V276" />
                <path d="M66 164H176V100H222M176 164V220H222" stroke="var(--primary)" />
              </g>
              <rect x="222" y="64" width="176" height="72" rx="6" fill="var(--orange-soft)" stroke="var(--orange-ink)" strokeWidth="2" />
              <rect x="222" y="184" width="176" height="72" rx="6" fill="var(--cyan-soft)" stroke="var(--cyan-ink)" strokeWidth="2" />
              <g fill="var(--ink)" textAnchor="middle" fontSize="19">
                <text x="310" y="24">Supply</text>
                <text x="310" y="94">p-type transistor</text>
                <text x="310" y="214">n-type transistor</text>
                <text x="310" y="296">Ground</text>
                <text x="72" y="146">Input</text>
                <text x="464" y="146">Output</text>
              </g>
              <g fill="var(--prose)" textAnchor="middle" fontSize="15">
                <text x="310" y="119">Hole channel</text>
                <text x="310" y="239">Electron channel</text>
              </g>
              <circle cx="310" cy="164" r="5" fill="var(--ink)" />
              <circle cx="176" cy="164" r="5" fill="var(--primary)" />
            </svg>
            <figcaption>
              Original circuit block diagram, not a device cross-section or measured response.
              <ReferenceLink id="pan2024" from="/challenges#complementary-logic" />
            </figcaption>
            <table className="challenge-logic-table">
              <caption>Ideal inverter states</caption>
              <thead><tr><th scope="col">Input</th><th scope="col">Conducting device</th><th scope="col">Output</th></tr></thead>
              <tbody>
                <tr><th scope="row">Low</th><td>p-type</td><td>High</td></tr>
                <tr><th scope="row">High</th><td>n-type</td><td>Low</td></tr>
              </tbody>
            </table>
          </figure>
          <div className="challenge-complementary-prose">
            <h3>Control the Carrier Type</h3>
            <p>
              Pan et al. patterned niobium-doped p-type and rhenium-doped n-type
              regions in few-layer 2H-MoTe₂, then connected them into inverter
              arrays. This is a complementary-material example, rather than
              a demonstration using the MoS₂ model here.
              <ReferenceLink id="pan2024" from="/challenges#complementary-logic" />
            </p>
            <h3>Match the Whole Pair</h3>
            <p>
              Their inverter fabrication used different contact metals for the two
              carrier types. Controlled doping helped match their on-currents:
              changing carrier polarity alone does not finish the circuit.
              <ReferenceLink id="pan2024" from="/challenges#complementary-logic" />
            </p>
            <p className="challenge-source-note">
              The table shows ideal stable logic levels. Real switching passes
              through an intermediate region with current and finite voltage gain.
              NanoLab does not compute this circuit.
            </p>
            <Link className="text-link" href="/research#discovery-integration">
              Connect this question to circuit integration →
            </Link>
          </div>
        </div>
      </section>
      <section className="section challenges-outlook" id="outlook">
        <SectionHeading
          title="Bringing the Pieces Together"
          number="08"
          description="Progress requires materials, device design and process engineering together."
        />
        <div className="challenge-qualification-layout">
          <div className="challenge-outlook-prose">
            <p>
              Contact and dielectric engineering can improve individual devices.
              Scalable growth, repeatable integration and careful characterization
              are needed to translate those gains into circuits.
            </p>
            <p className="mt-4">
              These constraints interact. A more conductive channel cannot recover
              voltage lost at a resistive contact; a thinner gate stack is useful
              only if leakage and reliability remain acceptable. Growth and transfer
              must preserve those interfaces consistently across devices. This is
              why a promising material or a best-performing transistor does not
              establish circuit yield.
              <ReferenceLink id="engineering2024" from="/challenges#outlook" />
              <ReferenceLink id="benchmark2022" from="/challenges#outlook" />
            </p>
            <Link className="text-link" href="/research">
              Follow selected research directions →
            </Link>
          </div>
          <aside
            className="challenge-qualification"
            aria-labelledby="qualification-title"
          >
            <h3 id="qualification-title">
              From a promising result to dependable devices
            </h3>
            <dl>
              <div>
                <dt>Uniformity and yield</dt>
                <dd>
                  Use distributions to identify spread and outliers. State the
                  operating window and pass criteria used to classify failures.
                </dd>
              </div>
              <div>
                <dt>Reliability under stress</dt>
                <dd>
                  Track drift and failure during stated electrical, thermal or
                  mechanical stress. An initial current–voltage sweep does not
                  establish operating lifetime.
                </dd>
              </div>
              <div>
                <dt>Stability during storage</dt>
                <dd>
                  Recheck properties after time in a stated environment. Changes
                  without operating stress differ from degradation during use.
                </dd>
              </div>
            </dl>
            <p className="qualification-source">
              Evaluation framework adapted in prose from Lanza et al.; required
              tolerances depend on the intended application.
              <ReferenceLink id="lanza2020" from="/challenges#outlook" />
            </p>
          </aside>
        </div>
      </section>
      <RelatedTopics
        links={[
          {
            href: "/simulator#parameter-contactResistance",
            title: "Simulator",
            description: "Isolate a contact-resistance assumption.",
          },
        ]}
      />
    </PageShell>
  );
}
