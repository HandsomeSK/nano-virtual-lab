import type { Metadata } from "next";
import Link from "next/link";
import {
  PageShell,
  SectionHeading,
  RelatedTopics,
} from "@/components/page-shell";
import { DeviceViewer } from "@/components/device-viewer";
import { ReferenceLink } from "@/components/reference-link";
export const metadata: Metadata = { title: "Device Explorer" };
export default function Device() {
  return (
    <PageShell
      title="Device Explorer"
      intro="Explore a simplified top-gated MoS₂ field-effect transistor. Orbit the model, reveal the layers and discover what each component does."
    >
      <section className="panel mb-6">
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
          <Link href="/why-mos2#meet-mos2" className="text-link">
            From Graphene to MoS₂ →
          </Link>
        </div>
      </section>
      <DeviceViewer />
      <section className="section" id="working-principle">
        <SectionHeading title="Working Principle" />
        <div className="two-column">
          <p>
            The gate modulates channel charge through an insulating dielectric.
            Source and drain contacts provide a current path. The thin channel
            is only one part of the full device.{" "}
            <ReferenceLink id="radis2011" from="/device" />
          </p>
          <div>
            <p>
              This is an original teaching structure, not a replica of a
              particular experimental device. Layer thicknesses and spacing are
              exaggerated. Contact barriers and electric-field distributions are
              not computed.
            </p>
            <Link href="/simulator" className="button-primary mt-5">
              Launch Simulator →
            </Link>
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
