import type { Metadata } from "next";
import Link from "next/link";
import {
  PageShell,
  SectionHeading,
  RelatedTopics,
} from "@/components/page-shell";
import { Comparison } from "@/components/simulation/comparison";
import { ReferenceLink } from "@/components/reference-link";
import { normalizeParameters } from "@/lib/simulation/model";
import { queryValue, type Query } from "@/lib/site";
import { comparisonPair } from "@/lib/simulation/journey";
import styles from "./comparison.module.css";
export const metadata: Metadata = { title: "Scenario Comparison" };
export default async function ComparisonPage({
  searchParams,
}: {
  searchParams: Promise<Query>;
}) {
  const query = await searchParams;
  return (
    <PageShell
      title="Scenario Comparison"
      intro="Compare two parameter sets in one teaching model. The A/B curves are assumed device scenarios, not a ranking of materials."
    >
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
          initialPair={comparisonPair(query)}
          initialMode={
            queryValue(query, "curve") === "output" ? "output" : "transfer"
          }
          initialLayout={
            queryValue(query, "layout") === "side" ? "side" : "overlay"
          }
        />
      </div>
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
          The A/B tool above compares the same classical equations with
          different assumed parameters. Its curves are not measured graphene,
          silicon or MoS₂ benchmarks. The separate material explorer does not
          assign a new calibrated transport model.
        </p>
      </section>
      <nav className={styles.context} aria-label="Material comparison context">
        <h2>Material context</h2>
        <p>
          Compare material properties and electronic bands separately from the
          assumed A/B device scenarios.
        </p>
        <div className={styles.contextLinks}>
          <Link
            id="material-selector"
            href="/why-mos2#materials"
            className="text-link"
          >
            Explore the materials
          </Link>
          <Link
            id="electronic-properties"
            href="/why-mos2#electronic-properties"
            className="text-link"
          >
            Material properties
          </Link>
          <Link
            id="band-structure"
            href="/why-mos2#band-structure"
            className="text-link"
          >
            Electronic bands
          </Link>
        </div>
      </nav>
      <RelatedTopics
        links={[
          {
            href: "/why-mos2#zero-gap",
            title: "Why a band gap matters",
            description:
              "Connect remarkable transport with the band-gap question.",
          },
          {
            href: "/challenges#contacts",
            title: "Understand contact resistance",
            description:
              "Understand why material promise is not a device benchmark.",
          },
        ]}
      />
    </PageShell>
  );
}
