import type { Metadata } from "next";
import Link from "next/link";
import {
  PageShell,
  SectionHeading,
  RelatedTopics,
} from "@/components/page-shell";
import { DeviceViewer } from "@/components/device-viewer";
import { ReferenceLink } from "@/components/reference-link";
import { ScientificFigure } from "@/components/scientific-figure";
export const metadata: Metadata = { title: "Device Explorer" };
export default function Device() {
  return (
    <PageShell
      title="Device Explorer"
      intro="Explore a simplified top-gated MoS₂ field-effect transistor. Orbit the model, reveal the layers and discover what each component does."
      contents={[
        {
          title: "Explore the device",
          items: [
            { id: "channel-choice", label: "Why a MoS₂ channel?" },
            { id: "interactive-device", label: "Interactive 3D viewer" },
          ],
        },
        {
          title: "Connect model and experiment",
          items: [
            {
              id: "experimental-device",
              label: "From the Model to an Experimental Device",
            },
            { id: "working-principle", label: "Working Principle" },
          ],
        },
      ]}
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
        <div className="actions">
          <Link href="/foundations#bands" className="text-link">
            Review Band Gap →
          </Link>
        </div>
      </section>
      <div id="interactive-device">
        <DeviceViewer />
      </div>
      <section className="section" id="experimental-device">
        <SectionHeading
          title="From the Model to an Experimental Device"
          description="Compare a conceptual top-gate stack with a separately published back-gated transistor."
        />
        <ScientificFigure id="macucci-device" />
        <p>
          The metal electrodes supply and collect carriers; the MoS₂ flake
          between them forms the channel. Here the global gate is below the
          oxide, rather than above the channel as in the 3D model. Contact
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
      <section className="section" id="working-principle">
        <SectionHeading title="Working Principle" />
        <div className="two-column">
          <p>
            The gate modulates channel charge through an insulating dielectric.
            Source and drain contacts provide a current path. The thin channel
            is only one part of the full device.{" "}
            <ReferenceLink id="radis2011" from="/device" />
            <ReferenceLink
              id="engineering2024"
              from="/device#working-principle"
            />
          </p>
          <div>
            <p>
              This is an original teaching structure, not a replica of a
              particular experimental device. Layer thicknesses and spacing are
              exaggerated. Contact barriers and electric-field distributions are
              not computed.
            </p>
          </div>
        </div>
      </section>
      <RelatedTopics
        links={[
          {
            href: "/why-mos2",
            title: "From Graphene to MoS₂",
            description: "Connect material properties with the channel choice.",
          },
          {
            href: "/simulator",
            title: "Transistor Simulator",
            description: "Connect the structure to a calculated I–V response.",
          },
        ]}
      />
    </PageShell>
  );
}
