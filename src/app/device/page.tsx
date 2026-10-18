import type { Metadata } from "next";
import Link from "next/link";
import {
  PageShell,
  SectionHeading,
  RelatedTopics,
} from "@/components/page-shell";
import {
  DeviceComponentRoles,
  TransistorStructureFigure,
} from "@/components/science/teaching-figures";
import { ReferenceLink } from "@/components/reference-link";
import { ScientificFigure } from "@/components/scientific-figure";
import styles from "./device.module.css";
export const metadata: Metadata = {
  title: "MoS₂ Transistor Principles",
  description:
    "Read a labeled MoS₂ transistor cross-section, understand its gate and contacts, and compare the teaching structure with a published experimental device.",
};
export default function Device() {
  return (
    <PageShell
      title="MoS₂ Transistor Principles"
      intro="Follow the path from a thin semiconductor to a working switch. Understand how the contacts, channel and gate stack act together."
    >
      <section className="panel mb-6" id="channel-choice">
        <h2>Why a MoS₂ channel?</h2>
        <p className="mt-3">
          Semiconducting MoS₂ combines an atomically thin channel with a finite
          band gap. The gap supports switching between conducting and depleted
          states, while the thin channel offers a route to strong gate control.
          Contact and dielectric engineering still determine how well a real
          device performs. <ReferenceLink id="radis2011" from="/device" />
        </p>
      </section>
      <section id="interactive-device" className="section">
        <SectionHeading
          title="Read how the device fits together"
          description="The gate controls the channel through an insulator; source and drain connect the channel to the rest of the circuit."
        />
        <TransistorStructureFigure />
        <DeviceComponentRoles />
        <p className="text-sm mt-5">
          Component roles use the same material examples as the 3D Lab.
          <ReferenceLink id="radis2011" from="/device#interactive-device" />
          <ReferenceLink id="engineering2024" from="/device#interactive-device" />
        </p>
        <Link href="/lab#transistor" className="text-link mt-4 inline-block">
          Inspect the transistor structure in 3D Lab
        </Link>
        <p className="text-sm muted">
          Rotate and select the layers there. This static cross-section keeps
          the materials and their roles together while you read the theory.
        </p>
      </section>
      <section className="section" id="working-principle">
        <SectionHeading
          title="Working Principle"
          description="Follow the gate field, then the source-to-drain carrier path."
        />
        <div className="two-column">
          <div>
            <h3>Control charge through the gate stack</h3>
            <p className="mt-3">
              The gate modulates channel charge through an insulating
              dielectric. In an n-channel teaching picture, a sufficiently
              positive gate-to-source bias increases electron density; below
              threshold the channel is depleted. The insulator couples the
              field while limiting gate-to-channel current.
              <ReferenceLink id="radis2011" from="/device#working-principle" />
            </p>
          </div>
          <div>
            <h3>Drive transport between the contacts</h3>
            <p className="mt-3">
              Source and drain contacts provide a current path. A drain-to-source
              bias drives transport through the available channel charge;
              contact resistance reduces the voltage available inside the
              device. The thin channel is only one part of the full device.
              <ReferenceLink
                id="engineering2024"
                from="/device#working-principle"
              />
            </p>
          </div>
        </div>
        <p className="learning-tip mt-5">
          ON and OFF in 3D Lab illustrate carrier availability; they do not
          calculate a measured current. Real OFF current can include leakage
          and trap-assisted paths. The Simulator separately calculates a
          simplified long-channel I–V response from stated parameters.
          <ReferenceLink id="mosfet" from="/device#working-principle" />
        </p>
        <Link href="/simulator" className="text-link">
          Explore I–V characteristics in the Simulator
        </Link>
        <details className="mt-4">
          <summary>What the teaching structure does and does not represent</summary>
          <div>
            <p>
              This is an original teaching structure, not a replica of a
              particular experimental device. Layer thicknesses and spacing are
              exaggerated. Contact barriers and electric-field distributions are
              not computed.
            </p>
          </div>
        </details>
      </section>
      <section className={`section ${styles.experiment}`} id="experimental-device">
        <SectionHeading
          title="From the Schematic to an Experimental Device"
          description="Compare a conceptual top-gate stack with a separately published back-gated transistor."
        />
        <ScientificFigure id="macucci-device" />
        <p>
          The metal electrodes supply and collect carriers; the MoS₂ flake
          between them forms the channel. Here the global gate is below the
          oxide, rather than above the channel as in the schematic. Contact
          shape, oxide thickness and channel dimensions belong to this
          experiment.
          <ReferenceLink id="macucci2017" from="/device#experimental-device" />
        </p>
        <p className="text-sm mt-3">
          Macucci et al. measured time-dependent gate and drain currents and
          connected slow settling with charge trapping. A real measurement needs
          a stated bias history and settling protocol. This photo, the simulator
          defaults and Shimazu’s hysteresis device are three separate contexts.
        </p>
      </section>
      <RelatedTopics
        links={[
          {
            href: "/why-mos2",
            title: "From Graphene to MoS₂",
            description: "Connect material properties with the channel choice.",
          },
          {
            href: "/challenges#contacts",
            title: "Why contacts limit a device",
            description:
              "Follow the injection barrier and contact voltage drop into a specific engineering problem.",
          },
        ]}
      />
    </PageShell>
  );
}
