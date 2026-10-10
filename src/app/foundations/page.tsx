import type { Metadata } from "next";
import { PageShell, RelatedTopics, Notice } from "@/components/page-shell";
import { knowledge } from "@/data/knowledge";
import { KnowledgeCard } from "@/components/learning/knowledge-card";
import { FoundationWidget } from "@/components/learning/foundation-widgets";
export const metadata: Metadata = { title: "Foundations" };
export default function Foundations() {
  return (
    <PageShell
      title="Foundations"
      intro="Six ideas that connect the nanoscale to a working transistor. Explore the physics before exploring the device."
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
      <div className="section">
        <Notice>
          General foundations for MECH6045. Lecture 1–6 files have not yet been
          supplied; course-specific mapping is awaiting review.
        </Notice>
      </div>
      <RelatedTopics
        links={[
          {
            href: "/why-mos2",
            title: "Why MoS₂?",
            description:
              "Use these concepts to understand the material choice.",
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
