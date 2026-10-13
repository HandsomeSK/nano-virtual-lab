import type { Metadata } from "next";
import Link from "next/link";
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
export const metadata: Metadata = {
  title: "Discoveries",
  description:
    "Connect verified MoS₂ research across interfaces, stacking, contacts, scaling, deformable devices and circuit integration.",
};
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
    <PageShell
      title="Small structures. Big questions"
      intro="Discover what changes when interfaces, atomic registry and device architecture become design variables. Follow the evidence from a single layer to an interconnected system."
    >
      <InterfaceFeature from="/research" />
      <section className="section">
        <SectionHeading
          title="Six directions. One connected frontier"
          description="Selected research reviewed through 13 October 2026. Dates establish a cutoff, not a claim to cover every new publication."
        />
        <DiscoverySynthesis />
      </section>
      <section className="section" id="catalogue">
        <SectionHeading
          title="Browse the evidence"
          description="Keep exploring the original study catalogue, source details and URL-linked filters, including earlier milestones."
        />
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
      </section>
      <section
        className="section institutional-research"
        id="institutional-research"
      >
        <SectionHeading
          title="Industry Research: 300 mm Integration"
          description="Institutional announcement · imec, ASML and TSMC · 15 June 2026"
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
        <a
          className="text-link"
          href={references.find((ref) => ref.id === "imec2026")!.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Read the announcement & original figures ↗
        </a>
      </section>
      <section className="section research-outlook">
        <SectionHeading title="Challenges & Future Outlook" />
        <p>
          Better electrostatic control must be balanced with contact quality,
          dielectric reliability and scalable fabrication. The next useful
          result is not simply a smaller dimension: it is a device or circuit
          whose performance can be reproduced under clearly stated conditions.
        </p>
        <div className="actions">
          <Link className="button-secondary" href="/challenges">
            Explore engineering challenges
          </Link>
          <Link className="text-link" href="/device">
            Revisit the device stack →
          </Link>
        </div>
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
  );
}
