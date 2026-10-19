import type { Metadata } from "next";
import Link from "next/link";
import { InterfaceComparisonFigure } from "@/components/science/teaching-figures";
import { EotChart } from "@/components/research/eot-chart";
import { discoveryThemes } from "@/data/discoveries";
import styles from "@/components/research/research-context.module.css";
import { ReferenceLink } from "@/components/reference-link";
import { PageReadingLayout, RelatedTopics } from "@/components/page-shell";
import { Breadcrumb } from "@/components/breadcrumb";
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
  const article = (
    <article className="container page-shell discovery-feature-page">
      <PageReadingLayout
        contents={[
          {
            title: "The interface study",
            items: [
              { id: "challenge", label: "The surface-growth challenge", number: "01" },
              { id: "breakthrough", label: "The carbon-dot breakthrough", number: "02" },
              { id: "interactive-stack", label: "Compare the interface layers" },
              { id: "measurements", label: "Measure the complete stack", number: "03" },
              { id: "significance", label: "What the architecture changes", number: "04" },
              { id: "limits", label: "Boundaries of the result", number: "05" },
            ],
          },
          {
            title: "Context & sources",
            items: [
              { id: "connected-discoveries", label: "Connected discoveries", number: "06" },
              { id: "primary-source", label: "The primary study" },
            ],
          },
        ]}
      >
      <Breadcrumb />
      <header className="discovery-hero">
        <span className="eyebrow">
          Research story · Nature Communications · 7 October 2026
        </span>
        <h1>The Interface Breakthrough</h1>
        <p>
          How a nanometre-scale interfacial layer helps unlock the potential of
          MoS₂ transistors.
        </p>
        <p className="research-context">
          Wong et al. · Evidence reviewed 13 October 2026
          <ReferenceLink id="wong2026" from={route} />
        </p>
      </header>
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
          <h2>Find the layer between the layers</h2>
          <p>
            Compare oxide growth on a bare surface with growth on an insulating
            carbon-dot assembly. The diagrams explain placement and function;
            the measurements below describe the reported electrical result.
          </p>
        </div>
        <InterfaceComparisonFigure />
        <Link href="/lab#interface-engineering" className="text-link mt-5 inline-block">
          Inspect the interface layers in 3D Lab
        </Link>
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
              NanoLab schematics do not test them, predict wafer yield or fit the
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
          <nav aria-label="Connected research directions">
            <ul className={styles.connections}>
              {discoveryThemes.map((story) => (
                <li id={"discovery-" + story.id} key={story.id}>
                  <Link href={"/research#discovery-" + story.id}>
                    <span>{story.label}</span>
                    <strong>{story.title}</strong>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
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
          title="Continue from the evidence"
          links={[
            {
              href: "/challenges#interfaces",
              title: "Gate dielectric & interface challenge",
              description:
                "Connect oxide nucleation with charge traps, leakage and reliability.",
            },
            {
              href: "/research#discovery-interfaces",
              title: "Follow dielectric-integration research",
              description:
                "Place this study beside the mechanism and questions that remain open.",
            },
          ]}
        />
      </PageReadingLayout>
    </article>
  );
  return article;
}
