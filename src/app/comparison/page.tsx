import type { Metadata } from "next";
import Link from "next/link";
import {
  PageShell,
  SectionHeading,
  RelatedTopics,
} from "@/components/page-shell";
import { MaterialExplorer } from "@/components/learning/material-explorer";
import { BandDiagram } from "@/components/learning/band-diagram";
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
      intro="Explore what makes graphene, MoS₂ and silicon different, then test two device assumptions. Material properties and simulated device response answer different questions."
    >
      <section>
        <SectionHeading
          title="Material Selector"
          description="Select a material to connect its atomic structure, electronic bands and possible applications."
        />
        <MaterialExplorer from="/comparison" />
      </section>
      <section className="section">
        <SectionHeading
          title="Electronic Properties Comparison"
          description="A qualitative comparison of material context, rather than a device-performance ranking."
        />
        <div className="horizontal-scroll">
          <table>
            <caption className="sr-only">
              Qualitative comparison of three material families
            </caption>
            <thead>
              <tr>
                <th>Material</th>
                <th>Band structure context</th>
                <th>Opportunity</th>
                <th>Engineering considerations</th>
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
                  <td>{item.strength}</td>
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
      <section className="section" id="band-structure">
        <SectionHeading
          title="Band Structure Comparison"
          description="Pristine graphene has touching bands. Semiconducting MoS₂ and silicon have a finite gap; the direct or indirect character also depends on the material and layer count."
        />
        <div className="three-column">
          {(["graphene", "mos2", "silicon"] as const).map((id) => (
            <div className="panel" key={id}>
              <h3>{materials[id].name}</h3>
              <BandDiagram material={id} />
              <p className="text-sm mt-2">{materials[id].band}</p>
            </div>
          ))}
        </div>
        <p className="text-sm mt-3">
          Conceptual sketches with no common numerical energy scale. A finite
          gap helps suppress thermally accessible carriers, while contacts,
          electrostatics and defects also influence an actual OFF current.
        </p>
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
            title: "From Graphene to MoS₂",
            description:
              "Connect remarkable transport with the band-gap question.",
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
