import type { Metadata } from "next";
import { PageShell, RelatedTopics } from "@/components/page-shell";
import { knowledge } from "@/data/knowledge";
import { KnowledgeCard } from "@/components/learning/knowledge-card";
import { FoundationWidget } from "@/components/learning/foundation-widgets";
export const metadata: Metadata = { title: "Foundations" };
export default function Foundations() {
  return (
    <PageShell
      title="Foundations"
      intro="Begin with nanomaterials and their size-dependent properties, then explore energy bands, graphene and the path from two-dimensional materials to transistors. Choose among six connected learning modules."
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
