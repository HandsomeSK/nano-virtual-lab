import Link from "next/link";
import type { ReactNode } from "react";
import { knowledge } from "@/data/knowledge";
import { ReferenceLink } from "@/components/reference-link";
export function KnowledgeCard({
  concept,
  index,
  children,
}: {
  concept: (typeof knowledge)[number];
  index: number;
  children: ReactNode;
}) {
  return (
    <section id={concept.id} className="knowledge-section">
      <div className="knowledge-title">
        <span>{"0" + (index + 1)}</span>
        <h2>{concept.title}</h2>
      </div>
      <p className="theory">{concept.theory}</p>
      {children}
      <div className="connection">
        <h3>Connection to MoS₂</h3>
        <p>
          {concept.connection}{" "}
          <ReferenceLink
            id={concept.reference}
            from={"/foundations#" + concept.id}
          />
        </p>
        <Link href={concept.href} className="text-link">
          {concept.link} →
        </Link>
      </div>
    </section>
  );
}
