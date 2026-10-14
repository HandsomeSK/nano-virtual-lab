import type { Metadata } from "next";
import Link from "next/link";
import { DeviceViewer } from "@/components/device-viewer";
import { EotChart } from "@/components/research/eot-chart";
import { DiscoverySynthesis } from "@/components/research/discovery-synthesis";
import { ReferenceLink } from "@/components/reference-link";
import { RelatedTopics } from "@/components/page-shell";
import { references } from "@/data/references";
const route = "/discoveries/mos2-interface-breakthrough";
const paper = references.find((r) => r.id === "wong2026")!;
export const metadata: Metadata = {
  title: "The Interface Breakthrough",
  description:
    "How a nanometre-scale interfacial layer helps unlock the potential of MoS₂ transistors. Explore the 2026 carbon-dot and high-κ oxide study.",
  alternates: { canonical: route },
};
export default function InterfaceDiscovery() {
  return (
    <article className="container page-shell discovery-feature-page">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/research">Discoveries</Link>
        <span aria-hidden="true">/</span>
        <span>MoS₂ interfaces</span>
      </nav>
      <header className="discovery-hero">
        <span className="eyebrow">
          Research story · Nature Communications · 7 October 2026
        </span>
        <h1>The Interface Breakthrough</h1>
        <p>
          How a nanometre-scale interfacial layer helps unlock the potential of
          MoS₂ transistors.
        </p>
        <div className="actions">
          <a href="#interactive-stack" className="metal-button metal-solid">
            Inspect the 3D stack
          </a>
        </div>
        <p className="research-context">
          Wong et al. · Evidence reviewed 13 October 2026
          <ReferenceLink id="wong2026" from={route} />
        </p>
      </header>
      <nav className="chapter-nav" aria-label="Story chapters">
        {[
          ["challenge", "The challenge"],
          ["breakthrough", "The interface"],
          ["interactive-stack", "Explore the stack"],
          ["measurements", "The evidence"],
          ["significance", "What changes"],
          ["limits", "What remains"],
        ].map(([id, label]) => (
          <a key={id} href={"#" + id}>
            {label}
          </a>
        ))}
      </nav>
      <section id="challenge" className="research-chapter">
        <div className="chapter-index">01</div>
        <div>
          <h2>The surface is part of the problem</h2>
          <p>
            A thin semiconductor is only useful to a transistor if its gate can
            control charge through a reliable insulator. A pristine
            two-dimensional basal surface offers relatively few chemical
            attachment sites for atomic layer deposition. Oxide growth can begin
            as islands rather than a continuous film.
            <ReferenceLink id="engineering2024" from={route + "#challenge"} />
          </p>
          <p>
            Adding nucleation sites poses its own design problem: preserve the
            channel while building an insulating, electrically controlled
            interface. High permittivity can improve coupling, but an interface
            can also add traps and reliability limits. The material and the
            stack must be evaluated together.
          </p>
        </div>
      </section>
      <section id="breakthrough" className="research-chapter">
        <div className="chapter-index">02</div>
        <div>
          <h2>A monolayer that helps another layer grow</h2>
          <p>
            Wong and colleagues assemble insulating carbon dots at a water
            surface and transfer them onto MoS₂. Functional groups at dot edges
            support subsequent HfO₂ nucleation. Their bare-surface control
            instead shows discontinuous oxide growth.
            <ReferenceLink id="wong2026" from={route + "#breakthrough"} />
          </p>
          <ol className="process-steps">
            <li>
              <strong>Assemble</strong>
              <span>
                Compress a carbon-dot monolayer at the air–water interface.
              </span>
            </li>
            <li>
              <strong>Transfer</strong>
              <span>Place the assembly on the semiconductor.</span>
            </li>
            <li>
              <strong>Integrate</strong>
              <span>Grow the high-κ oxide on the seeded surface.</span>
            </li>
          </ol>
          <p className="text-sm">
            Carbon dots here are an insulating interfacial assembly. They are
            not a continuous, conducting graphene channel.
          </p>
        </div>
      </section>
      <section id="interactive-stack" className="section">
        <div className="section-heading">
          <span className="eyebrow">An original interactive explanation</span>
          <h2>Find the layer between the layers</h2>
          <p>
            Compare the architectures, select the carbon-dot layer, then
            separate the stack. This structural model explains placement and
            function; it does not reproduce a measured device.
          </p>
        </div>
        <DeviceViewer interfaceResearch />
      </section>
      <section id="measurements" className="research-chapter">
        <div className="chapter-index">03</div>
        <div>
          <h2>Measure the stack, not just its appearance</h2>
          <p>
            The reported hybrid dielectric has an EOT of 0.6 ± 0.1 nm. Initial
            structural measurements resolve HfO₂ near 1.6 nm and an interfacial
            layer around 0.4–0.6 nm.
            <ReferenceLink id="wong2026" from={route + "#measurements"} />
          </p>
          <EotChart />
          <div className="measurement-explainer">
            <h3>Equivalent thickness is not physical thickness</h3>
            <p>
              EOT describes the thickness of SiO₂ that would give the same
              capacitance per area. For an ideal uniform dielectric, EOT ≈ t ×
              κSiO₂ / κ. A hybrid stack needs its complete capacitance. Reading
              “0.6 nm” as the actual HfO₂ thickness would describe a different
              quantity.
              <ReferenceLink id="mosfet" from={route + "#measurements"} />
            </p>
          </div>
          <p className="text-sm">
            The paper also reports leakage, breakdown and transistor switching
            tests. The plot above contains one reported EOT value and its stated
            ± interval. It does not invent an I–V trace, pool different devices
            or assign an unverified statistical meaning to the uncertainty.
          </p>
        </div>
      </section>
      <section id="significance" className="research-chapter">
        <div className="chapter-index">04</div>
        <div>
          <h2>The useful change is architectural</h2>
          <p>
            The interface enables a continuous ultrathin oxide while
            contributing to the stack’s electrical behaviour.
            <ReferenceLink id="wong2026" from={route + "#significance"} />
          </p>
          <p>
            For a field-effect transistor, stronger gate coupling can help
            control channel charge at a given voltage. That benefit must be
            evaluated alongside traps, leakage, contacts and the channel’s
            electrostatics. An atomically thin semiconductor alone does not
            guarantee a complete low-power device.
            <ReferenceLink
              id="engineering2024"
              from={route + "#significance"}
            />
          </p>
          <Link href="/simulator#model" className="text-link">
            Separate gate-stack evidence from the classical current model
          </Link>
        </div>
      </section>
      <section id="limits" className="research-chapter">
        <div className="chapter-index">05</div>
        <div>
          <h2>A breakthrough still has boundaries</h2>
          <p>
            This result does not establish commercial wafer yield or replace
            every dielectric process.
            <ReferenceLink id="wong2026" from={route + "#limits"} />
          </p>
          <div className="open-questions">
            <article>
              <h3>Uniformity & transfer</h3>
              <p>
                Coverage, contamination and reproducibility must be assessed
                across many devices and process cycles.
              </p>
            </article>
            <article>
              <h3>Electrical reliability</h3>
              <p>
                Leakage, breakdown, trapping and bias history require stated
                testing conditions. A single best metric cannot represent them
                all.
              </p>
            </article>
            <article>
              <h3>Integration</h3>
              <p>
                Contacts, temperature budgets and fabrication order constrain
                the complete circuit. A promising layer must survive the rest of
                the process.
              </p>
            </article>
          </div>
          <p className="text-sm">
            These are engineering questions for interpreting the result. The
            NanoLab viewer does not test them, predict wafer yield or fit the
            paper’s experimental transport data.
          </p>
        </div>
      </section>
      <section id="connected-discoveries" className="section">
        <div className="section-heading">
          <span className="eyebrow">06 · Connected discoveries</span>
          <h2>No layer works alone</h2>
          <p>
            Interfaces, registry, injection, scaling and integration describe
            different parts of the same device problem.
          </p>
        </div>
        <DiscoverySynthesis compact />
      </section>
      <section className="source-record" id="primary-source">
        <span className="eyebrow">Primary source</span>
        <h2>{paper.title}</h2>
        <p>
          Open the reference for publication details and the original study.
          Its reported values describe this particular hybrid stack and its
          measurement conditions.
          <ReferenceLink id="wong2026" from={route + "#primary-source"} />
        </p>
        <p className="text-xs">
          Original NanoLab schematics and geometry. No publisher figure is
          adapted; the reported EOT value is attributed to the paper. Public
          metadata, abstract and initial PDF results were checked.
        </p>
      </section>
      <RelatedTopics
        links={[
          {
            href: "/why-mos2",
            title: "Explore MoS₂",
            description:
              "Return to the material, structure and device context.",
          },
          {
            href: "/research",
            title: "Discoveries",
            description:
              "Connect the interface result with the wider research frontier.",
          },
        ]}
      />
    </article>
  );
}
