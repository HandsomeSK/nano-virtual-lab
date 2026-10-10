"use client";
import Link from "next/link";
import { useState } from "react";
import { challenges } from "@/data/challenges";
import { ReferenceLink } from "./reference-link";
export function ChallengeExplorer() {
  const [selected, setSelected] = useState<string>("contacts");
  return (
    <>
      <div className="challenge-overview" aria-label="Challenge categories">
        {challenges.map((item) => (
          <button
            key={item.id}
            className="panel"
            aria-pressed={selected === item.id}
            onClick={() => {
              setSelected(item.id);
              document
                .getElementById(item.id)
                ?.scrollIntoView({ block: "start" });
            }}
          >
            <span className="kicker">{item.tag}</span>
            <strong>{item.title}</strong>
            <span className="muted text-sm">{item.summary}</span>
            <span className="text-cyan text-sm">Explore challenge ↓</span>
          </button>
        ))}
      </div>
      <div className="challenge-list">
        {challenges.map((item) => (
          <section
            key={item.id}
            className="panel"
            id={item.id}
            data-selected={selected === item.id}
          >
            <div className="section-heading">
              <span className="kicker">{item.tag}</span>
              <h2>{item.title}</h2>
              <p>{item.summary}</p>
            </div>
            <div
              className="challenge-diagram"
              role="img"
              aria-label={item.diagram}
            >
              {item.diagram}
            </div>
            <details
              open={selected === item.id}
              onToggle={(event) => {
                if (event.currentTarget.open) setSelected(item.id);
              }}
            >
              <summary>Mechanism & model boundary</summary>
              <p>{item.detail}</p>
            </details>
            <div className="connection">
              <h3>Potential Solutions</h3>
              <p>{item.solution}</p>
            </div>
            <div className="actions">
              {"simulator" in item ? (
                <Link className="button-secondary" href={item.simulator}>
                  {item.simLabel} →
                </Link>
              ) : null}
              <Link className="text-link" href={item.research}>
                Related research →
              </Link>
              <Link className="text-link" href={item.foundation}>
                Review the foundation →
              </Link>
              <ReferenceLink
                id={item.reference}
                from={"/challenges#" + item.id}
              />
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
