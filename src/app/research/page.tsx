import type { Metadata } from "next";
import {
  PageShell,
  RelatedTopics,
  SectionHeading,
} from "@/components/page-shell";
import { ResearchExplorer } from "@/components/research-explorer";
import { researchCategories, studies } from "@/data/research";
import { references } from "@/data/references";
import { ReferenceLink } from "@/components/reference-link";
import { queryValue, type Query } from "@/lib/site";
import { InterfaceFeature } from "@/components/research/interface-feature";
import { DiscoverySynthesis } from "@/components/research/discovery-synthesis";
import { ResearchSystemMap } from "@/components/research/research-system-map";
import {
  researchConnections,
  researchDirections,
} from "@/data/research-knowledge";
export const metadata: Metadata = {
  title: "Research Knowledge Hub",
  description:
    "Connect verified MoS₂ research across interfaces, stacking, contacts, scaling, deformable devices and circuit integration.",
};
const overviewSteps = [
  {
    title: "Material structure",
    explanation:
      "Stacking changes the electronic structure. How atomic sheets meet matters as well as how many layers are present.",
    directions: ["stacking"],
  },
  {
    title: "Device control",
    explanation:
      "Dielectrics couple the gate to the channel; contacts inject carriers. Shrinking dimensions tests whether the gate can maintain control.",
    directions: ["interfaces", "contacts", "scaling"],
  },
  {
    title: "System integration",
    explanation:
      "Motion must preserve connected paths. Circuits require many devices to work together through a repeatable fabrication process.",
    directions: ["stretchable", "integration"],
  },
];
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Query>;
}) {
  const query = await searchParams;
  const year = queryValue(query, "year"),
    category = queryValue(query, "category"),
    study = queryValue(query, "study");
  return (
    <div className="research-hub">
      <PageShell
        title="Research Knowledge Hub"
        intro="Understand the problems connecting two-dimensional materials, working transistors and useful circuits. Start with the physics, then examine the evidence."
        contents={[
          {
            title: "The bigger picture",
            items: [
              { id: "research-overview", label: "Research overview" },
              { id: "research-connections", label: "Connections" },
            ],
          },
          {
            title: "Research directions",
            items: researchDirections.map(({ id, label }) => ({
              id: "discovery-" + id,
              label,
            })),
          },
          {
            title: "Evidence & studies",
            items: [
              { id: "featured-discovery", label: "Featured discovery" },
              { id: "timeline", label: "Research timeline" },
              { id: "studies", label: "Studies by category" },
              { id: "institutional-research", label: "Industry research" },
            ],
          },
          {
            items: [{ id: "research-outlook", label: "Future outlook" }],
          },
        ]}
      >
        <section className="section research-overview" id="research-overview">
          <SectionHeading
            title="Research Overview"
            description="From material properties to working devices"
          />
          <p className="research-overview-lead">
            An atomically thin channel is a starting point. A working transistor
            also needs reliable insulation, efficient carrier injection and a
            repeatable fabrication process. These requirements meet at interfaces,
            where an oxide, an electrode or another atomic sheet can change the
            finished device.
            <ReferenceLink id="engineering2024" from="/research#research-overview" />
          </p>
          <div className="research-overview-layout">
            <ResearchSystemMap />
            <div className="research-overview-steps">
              {overviewSteps.map((step) => (
                <article className="research-overview-step" key={step.title}>
                  <h3>{step.title}</h3>
                  <p>{step.explanation}</p>
                  <nav aria-label={step.title + " research directions"}>
                    {step.directions.map((id) => {
                      const direction = researchDirections.find((item) => item.id === id)!;
                      return (
                        <a key={id} href={"#discovery-" + id}>
                          {direction.label}
                        </a>
                      );
                    })}
                  </nav>
                </article>
              ))}
            </div>
          </div>
          <p className="research-editorial-note">
            NanoLab synthesis, supported by the numbered sources. Reported results
            remain specific to their devices and methods. Selected research
            reviewed through 13 October 2026.
          </p>
        </section>
        <section className="section" id="research-directions">
          <SectionHeading
            title="Research Directions"
            description="Follow each scientific question through its mechanism, engineering challenge, selected evidence and unresolved limits."
          />
          <DiscoverySynthesis />
        </section>
        <section className="section" id="research-connections">
          <SectionHeading
            title="Research Connections"
            description="NanoLab synthesis: these relationships explain why an isolated improvement does not settle the whole device problem."
          />
          <div className="research-connections">
            {researchConnections.map((connection) => (
              <article className="research-connection" key={connection.title}>
                <div className="research-connection-path">
                  <a href={"#discovery-" + connection.fromId}>
                    {connection.fromLabel}
                  </a>
                  <span aria-hidden="true">↔</span>
                  <a href={"#discovery-" + connection.toId}>
                    {connection.toLabel}
                  </a>
                </div>
                <div>
                  <h3>{connection.title}</h3>
                  <p>
                    {connection.explanation}
                    <ReferenceLink
                      id={connection.reference}
                      from="/research#research-connections"
                    />
                  </p>
                </div>
              </article>
            ))}
          </div>
          <p className="research-reading-note">
            Compare a result together with its geometry, bias, extraction method
            and statistics. A measured curve, a band calculation and a circuit
            demonstration establish different things.
            <ReferenceLink
              id="benchmark2022"
              from="/research#research-connections"
            />
          </p>
        </section>
        <section className="section" id="research-evidence">
          <SectionHeading
            title="Research Evidence"
            description="Use the featured discovery, timeline and study catalogue to inspect how the explanations are supported."
          />
          <div id="featured-discovery">
            <InterfaceFeature from="/research#featured-discovery" />
          </div>
          <div id="catalogue">
            <ResearchExplorer
              key={JSON.stringify(query)}
              initialYear={
                studies.some(
                  (item) =>
                    String(
                      references.find((ref) => ref.id === item.reference)?.year,
                    ) === year,
                )
                  ? year
                  : ""
              }
              initialCategory={
                researchCategories.some((item) => item === category) ? category : ""
              }
              initialStudy={
                studies.some((item) => item.reference === study) ? study : ""
              }
            />
          </div>
        </section>
        <section
          className="section institutional-research"
          id="institutional-research"
        >
          <SectionHeading
            title="Industry Research: 300 mm Integration"
            description="Institutional evidence · imec, ASML and TSMC · 15 June 2026"
          />
          <p>
            imec reports a reverse-TFT integration flow with prepatterned bottom
            contacts, transferred 2D channels and EUV-defined devices on 300 mm
            wafers. The reported 50 nm contacted poly pitch is a layout pitch,
            rather than the physical channel or gate length. The announcement’s
            94% operational-device figure uses Imax/Imin &gt; 10⁵ as its stated
            test criterion.
            <ReferenceLink
              id="imec2026"
              from="/research#institutional-research"
            />
          </p>
          <p className="text-sm mt-3">
            This press release describes industry-linked research, not a
            peer-reviewed article or proof of commercial mass production. Its
            Figure 1 microscopy depicts WS₂, so it must not be relabelled as MoS₂.
            Images remain at the source because a clear reuse licence was not
            found.
          </p>
          <p className="research-institution-context">
            The integration lesson is to evaluate the whole flow: material transfer,
            contact formation, gate patterning and device testing. Wafer diameter
            establishes the platform size; it does not describe channel length or
            guarantee that a complete circuit meets reliability requirements.
          </p>
        </section>
        <section className="section research-outlook" id="research-outlook">
          <SectionHeading title="Challenges & Future Outlook" />
          <p>
            Better electrostatic control must be balanced with contact quality,
            dielectric reliability and scalable fabrication. The next useful
            result is not simply a smaller dimension: it is a device or circuit
            whose performance can be reproduced under clearly stated conditions.
          </p>
        </section>
        <RelatedTopics
          links={[
            {
              href: "/challenges",
              title: "Engineering Challenges",
              description:
                "Connect milestones to unresolved engineering problems.",
            },
            {
              href: "/about#references",
              title: "References",
              description: "Read source details and model boundaries.",
            },
          ]}
        />
      </PageShell>
    </div>
  );
}
