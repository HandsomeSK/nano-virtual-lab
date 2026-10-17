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
      <section id="material-selector">
        <SectionHeading
          title="Material Selector"
          description="Select a material to connect its atomic structure, electronic bands and possible applications."
        />
        <MaterialExplorer from="/comparison" />
      </section>
      <section className="section" id="electronic-properties">
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
      <section className="section panel" id="benchmarking">
        <SectionHeading title="Material Properties Are Not Device Benchmarks" />
        <p>
          A band gap or crystal structure describes a material under stated
          conditions. Drain current, OFF leakage, field-effect mobility and
          switching speed depend on a complete device and measurement protocol.
          Cheng et al. recommend reporting the information needed for a fair FET
          benchmark rather than ranking isolated headline values.
          <ReferenceLink id="benchmark2022" from="/comparison#benchmarking" />
        </p>
        <div className="horizontal-scroll mt-4">
          <table>
            <caption className="sr-only">
              Context required to compare measured transistor performance
            </caption>
            <thead>
              <tr>
                <th>Reported quantity</th>
                <th>Context needed</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Mobility</th>
                <td>
                  Extraction method, gate capacitance, contact effects, drain
                  bias and temperature; field-effect and Hall values are
                  different measurements.
                </td>
              </tr>
              <tr>
                <th>ON/OFF current</th>
                <td>
                  Gate/drain bias points, width normalization, measurement
                  floor, leakage paths, environment and sweep history.
                </td>
              </tr>
              <tr>
                <th>Scaled dimensions</th>
                <td>
                  Physical gate length, effective channel length and contacted
                  pitch, each defined separately.
                </td>
              </tr>
              <tr>
                <th>Repeatability</th>
                <td>
                  Device count, distributions, selection criteria, geometry and
                  fabrication process.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm mt-4">
          The A/B tool below compares the same classical equations with
          different assumed parameters. Its curves are not measured graphene,
          silicon or MoS₂ benchmarks, and changing the material selector does
          not assign a new calibrated transport model.
        </p>
      </section>
      <div id="device-comparison">
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
      </div>
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
