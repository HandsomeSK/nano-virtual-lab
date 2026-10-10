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
      <DeviceViewer />
      <section className="section">
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
            href: "/foundations#transistors",
            title: "Transistor Basics",
            description:
              "Revisit source, drain, gate and electrostatic control.",
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
