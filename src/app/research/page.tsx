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
import { queryValue, type Query } from "@/lib/site";
export const metadata: Metadata = { title: "Research Frontier" };
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
      title="Research Frontier"
      intro="From the discovery of monolayer behaviour to scaled devices and wafer-level integration: explore selected published milestones."
    >
      <section className="section">
        <SectionHeading title="Research Overview" />
        <p>
          MoS₂ research spans material physics, gate-controlled devices and
          manufacturing. These five studies offer entry points into that story.
          Summaries are brief; follow the original sources for methods,
          conditions and evidence.
        </p>
      </section>
      <ResearchExplorer
        key={JSON.stringify(query)}
        initialYear={
          references.some(
            (ref) => String(ref.year) === year && ref.category === "Paper",
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
      <section className="section">
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
