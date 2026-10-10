import type { Metadata } from "next";
import Link from "next/link";
import {
  PageShell,
  SectionHeading,
  RelatedTopics,
} from "@/components/page-shell";
import { MaterialExplorer } from "@/components/learning/material-explorer";
import { Comparison } from "@/components/simulation/comparison";
import { materials } from "@/data/materials";
import { ReferenceLink } from "@/components/reference-link";
import { normalizeParameters } from "@/lib/simulation/model";
import { queryValue, type Query } from "@/lib/site";
export const metadata: Metadata = { title: "Material Comparison" };
export default async function ComparisonPage({
  searchParams,
}: {
  searchParams: Promise<Query>;
}) {
  const query = await searchParams;
  return (
    <PageShell
      title="Material Comparison"
      intro="Compare material context first, then compare your simulations. Intrinsic properties and device performance answer different questions."
    >
      <section>
        <SectionHeading title="Material Selection" />
        <MaterialExplorer from="/comparison" />
      </section>
      <section className="section">
        <SectionHeading title="Material Properties" />
        <div className="horizontal-scroll">
          <table>
            <caption className="sr-only">
              Qualitative comparison of three material families
            </caption>
            <thead>
              <tr>
                <th>Material</th>
                <th>Band structure context</th>
                <th>Engineering context</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(materials).map((item) => (
                <tr key={item.name}>
                  <th>{item.name}</th>
                  <td>
                    {item.band}
                    <ReferenceLink id={item.reference} from="/comparison" />
                  </td>
                  <td>{item.limitation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link href="/foundations#bands" className="text-link mt-3">
          Review the meaning of a band gap →
        </Link>
      </section>
      <Comparison
        key={JSON.stringify(query)}
        incoming={
          queryValue(query, "source") === "simulator"
            ? normalizeParameters(query)
            : null
        }
        initialA={queryValue(query, "a")}
        initialB={queryValue(query, "b")}
      />
      <RelatedTopics
        links={[
          {
            href: "/why-mos2",
            title: "Why MoS₂?",
            description: "Revisit the reasoning behind the material choice.",
          },
          {
            href: "/challenges",
            title: "Engineering Challenges",
            description:
              "Understand why material promise is not a device benchmark.",
          },
        ]}
      />
    </PageShell>
  );
}
