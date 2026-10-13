import type { Metadata } from "next";
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
      intro="Begin with nanomaterials and their size-dependent properties, then explore energy bands, graphene and the path from two-dimensional materials to transistors. Investigate six connected scientific ideas."
    >
      <div className="learning-layout">
        <aside className="knowledge-toc">
          <h2>On this page</h2>
          <nav aria-label="Knowledge directory">
            {knowledge.map((item, i) => (
              <a href={"#" + item.id} key={item.id}>
                <span>{"0" + (i + 1)}</span>
                {item.title}
              </a>
            ))}
          </nav>
        </aside>
        <div>
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
                <ScientificFigure id="graphene-lattice" />
              ) : null}
              {item.id === "characterization" ? (
                <ScientificFigure id="graphene-hrtem" />
              ) : null}
            </KnowledgeCard>
          ))}
        </div>
      </div>
      <RelatedTopics
        links={[
          {
            href: "/why-mos2",
            title: "From Graphene to MoS₂",
            description:
              "Follow the band-gap question from graphene to a 2D semiconductor.",
          },
          {
            href: "/device",
            title: "Device Explorer",
            description: "Connect the concepts to a complete gate stack.",
          },
        ]}
      />
    </PageShell>
  );
}
