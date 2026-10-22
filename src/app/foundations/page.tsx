import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, RelatedTopics } from "@/components/page-shell";
import { knowledge } from "@/data/knowledge";
import { KnowledgeCard } from "@/components/learning/knowledge-card";
import { FoundationWidget } from "@/components/learning/foundation-widgets";
import { foundationDetails } from "@/data/foundation-details";
import { ReferenceLink } from "@/components/reference-link";
import { ScientificFigure } from "@/components/scientific-figure";
export const metadata: Metadata = { title: "Foundations" };
export default function Foundations() {
  return (
    <PageShell
      title="Foundations"
      intro="Build the foundations for studying MoS₂: nanoscale surfaces, energy bands, complementary measurements and transistor charge control. Graphene supplies a useful structural and electronic comparison."
      contents={[
        {
          items: knowledge.map(({ id, title }, index) => ({
            id,
            label: title,
            number: String(index + 1).padStart(2, "0"),
          })),
        },
      ]}
    >
      <nav className="connection mb-8" aria-label="Materials learning paths">
        <p>
          <Link href="/why-mos2" className="text-link">
            From Graphene to MoS₂
          </Link>{" "}
          Follow the band-gap question into a layered semiconductor.
        </p>
        <p>
          <Link href="/device" className="text-link">
            Transistor Working Principles
          </Link>{" "}
          Connect a semiconductor channel with its contacts and gate stack.
        </p>
      </nav>
      {knowledge.map((item, i) => (
        <KnowledgeCard key={item.id} concept={item} index={i}>
          <FoundationWidget id={item.id} />
          <details className="mt-5">
            <summary>{foundationDetails[item.id].title}</summary>
            {foundationDetails[item.id].paragraphs.map(
              (paragraph, index) => (
                <p className="text-sm mt-3" key={paragraph}>
                  {paragraph}
                  {index ===
                  foundationDetails[item.id].paragraphs.length - 1 ? (
                    <ReferenceLink
                      id={foundationDetails[item.id].reference}
                      from={"/foundations#" + item.id}
                    />
                  ) : null}
                </p>
              ),
            )}
          </details>
          {item.id === "graphene-structure" ? (
            <>
              <ScientificFigure id="graphene-lattice" />
              <Link href="/lab#graphene" className="text-link">
                Inspect graphene bonds and the primitive cell in 3D Lab
              </Link>
            </>
          ) : null}
          {item.id === "characterization" ? (
            <>
              <p className="text-sm mt-4">
                Use MoS₂ to combine Raman, AFM, TEM and photoluminescence rather
                than asking one image to establish every property. The carbon
                micrograph below remains a contrasting example, not a MoS₂
                specimen.
              </p>
              <Link href="/why-mos2#characterization" className="text-link mt-3 inline-block">
                Study MoS₂ characterization methods and their limits
              </Link>
              <ScientificFigure id="graphene-hrtem" />
            </>
          ) : null}
          {item.id === "transistors" ? (
            <p className="text-sm mt-4">
              Structure explains where the contacts and gate act. Continue to
              transistor principles before changing parameters in a numerical
              I–V experiment; the 3D view and the calculated curves answer
              different questions.
            </p>
          ) : null}
        </KnowledgeCard>
      ))}
      <RelatedTopics
        links={[
          {
            href: "/why-mos2#band-structure",
            title: "Compare electronic bands",
            description:
              "See how graphene, MoS₂ and silicon differ without treating the sketches as device benchmarks.",
          },
        ]}
      />
    </PageShell>
  );
}
