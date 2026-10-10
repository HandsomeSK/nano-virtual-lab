import type { Metadata } from "next";
import Link from "next/link";
import {
  PageShell,
  SectionHeading,
  RelatedTopics,
} from "@/components/page-shell";
import { MaterialExplorer } from "@/components/learning/material-explorer";
import { ReferenceLink } from "@/components/reference-link";
export const metadata: Metadata = { title: "Why MoS₂?" };
export default function Why() {
  return (
    <PageShell
      title="Why MoS₂?"
      intro="A material choice, not a promise to replace silicon. Explore why atomically thin semiconductors are an active research direction."
    >
      <section id="beyond-silicon">
        <SectionHeading title="Beyond Silicon" />
        <div className="two-column">
          <p>
            Silicon remains the foundation of modern electronics. As devices
            shrink, electrostatic control, power dissipation and manufacturing
            complexity become harder to balance. New channel materials are one
            part of a much larger engineering problem.{" "}
            <ReferenceLink id="mosfet" from="/why-mos2#beyond-silicon" />
          </p>
          <div className="connection m-0">
            <h3>Why 2D Semiconductors?</h3>
            <p>
              An ultrathin body can help a gate control channel charge. A finite
              band gap can support switching. These potential advantages still
              depend on the contacts, dielectric and architecture.
            </p>
            <Link href="/foundations#transistors" className="text-link">
              Review transistor basics →
            </Link>
          </div>
        </div>
      </section>
      <section className="section" id="meet-mos2">
        <SectionHeading
          title="Meet MoS₂"
          description="Semiconducting 2H-molybdenum disulfide: a layered transition-metal dichalcogenide."
        />
        <div className="three-column">
          {[
            [
              "An atomically thin body",
              "A monolayer is approximately 0.65 nm thick — a sulfur–molybdenum–sulfur unit.",
              "radis2011",
            ],
            [
              "A finite band gap",
              "The monolayer has a direct-gap optical transition near the approximately 1.8 eV context used here; layer number and environment matter.",
              "mak2010",
            ],
            [
              "A device, not just a material",
              "Measured current and apparent mobility depend on interfaces, contact barriers and fabrication.",
              "radis2011",
            ],
          ].map(([title, text, ref]) => (
            <details className="panel" key={title}>
              <summary>{title}</summary>
              <p className="text-sm">
                {text} <ReferenceLink id={ref} from="/why-mos2#meet-mos2" />
              </p>
            </details>
          ))}
        </div>
      </section>
      <section className="section" id="materials">
        <SectionHeading
          title="Graphene vs MoS₂ vs Silicon"
          description="Compare intrinsic material context. These are not head-to-head device benchmarks."
        />
        <MaterialExplorer from="/why-mos2#materials" />
      </section>
      <section className="section">
        <SectionHeading title="Opportunities & Limitations" />
        <div className="two-column">
          <div className="panel">
            <h3>The opportunity</h3>
            <p className="mt-3">
              Thin-body electrostatics, layered integration and a gap suitable
              for switching motivate exploration. Different applications may
              favour different materials.
            </p>
            <Link href="/foundations#quantum" className="text-link">
              Review energy bands →
            </Link>
          </div>
          <div className="panel">
            <h3>The work still ahead</h3>
            <p className="mt-3">
              Uniform growth, reliable dielectrics, low-resistance contacts and
              complementary integration remain open engineering questions.
            </p>
            <Link href="/challenges" className="text-link">
              Explore engineering challenges →
            </Link>
          </div>
        </div>
      </section>
      <div className="actions">
        <Link href="/device" className="button-primary">
          Explore Device →
        </Link>
        <Link href="/comparison" className="button-secondary">
          Compare Materials
        </Link>
      </div>
      <RelatedTopics
        links={[
          {
            href: "/foundations#materials",
            title: "Carbon & 2D Materials",
            description: "Return to the structural fundamentals.",
          },
          {
            href: "/comparison",
            title: "Material Comparison",
            description:
              "Keep material properties and device scenarios distinct.",
          },
        ]}
      />
    </PageShell>
  );
}
