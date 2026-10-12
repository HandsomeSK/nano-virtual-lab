"use client";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { challenges } from "@/data/challenges";
import { ReferenceLink } from "./reference-link";
import { challengeEvidence } from "@/data/challenge-evidence";
import { ScientificFigure } from "./scientific-figure";
function subscribe(callback: () => void) {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
}
function selectedChallenge() {
  const id = window.location.hash.slice(1);
  return challenges.some((item) => item.id === id) ? id : "contacts";
}
function selectChallenge(id: string) {
  if (window.location.hash === "#" + id) return;
  window.history.replaceState(
    null,
    "",
    window.location.pathname + window.location.search + "#" + id,
  );
  window.dispatchEvent(new Event("hashchange"));
}
function ChallengeDiagram({
  id,
  description,
}: {
  id: string;
  description: string;
}) {
  return (
    <figure className="challenge-diagram">
      <svg
        viewBox="0 0 600 220"
        className="block w-full"
        role="img"
        aria-label={description}
      >
        {id === "contacts" ? (
          <>
            <rect
              x="30"
              y="75"
              width="120"
              height="65"
              rx="12"
              fill="#536480"
            />
            <rect
              x="170"
              y="65"
              width="32"
              height="85"
              rx="8"
              fill="#FEF3C7"
              stroke="#A16207"
              strokeWidth="3"
            />
            <rect
              x="225"
              y="75"
              width="330"
              height="65"
              rx="12"
              fill="#EDE9FE"
              stroke="#7652C8"
              strokeWidth="3"
            />
            <path
              d="M115 110H165M215 110H475"
              stroke="#076B7D"
              strokeWidth="5"
            />
            <path d="M475 100L495 110L475 120" fill="#076B7D" />
            <text
              x="90"
              y="45"
              textAnchor="middle"
              fill="#202D53"
              fontSize="27"
            >
              Metal
            </text>
            <text
              x="385"
              y="45"
              textAnchor="middle"
              fill="#202D53"
              fontSize="27"
            >
              MoS₂ channel
            </text>
            <text
              x="187"
              y="190"
              textAnchor="middle"
              fill="#805800"
              fontSize="25"
            >
              Interface barrier
            </text>
          </>
        ) : id === "interfaces" ? (
          <>
            <rect
              x="105"
              y="40"
              width="390"
              height="30"
              rx="8"
              fill="#536480"
            />
            <rect
              x="105"
              y="100"
              width="390"
              height="30"
              rx="8"
              fill="#CFFAFE"
              stroke="#076B7D"
              strokeWidth="2"
            />
            <rect
              x="105"
              y="155"
              width="390"
              height="15"
              rx="6"
              fill="#8B5CF6"
            />
            {[200, 300, 400].map((x) => (
              <path
                key={x}
                d={`M${x} 78V145m-7-9 7 9 7-9`}
                fill="none"
                stroke="#4F46E5"
                strokeWidth="3"
              />
            ))}
            {[160, 255, 350, 445].map((x) => (
              <circle
                key={x}
                cx={x}
                cy="137"
                r="7"
                fill="#F59E0B"
                stroke="#A16207"
                strokeWidth="2"
              />
            ))}
            <text
              x="300"
              y="27"
              textAnchor="middle"
              fill="#202D53"
              fontSize="25"
            >
              Gate
            </text>
            <text
              x="300"
              y="123"
              textAnchor="middle"
              fill="#202D53"
              fontSize="25"
            >
              Dielectric
            </text>
            <text
              x="300"
              y="205"
              textAnchor="middle"
              fill="#202D53"
              fontSize="25"
            >
              Channel · interface traps shown as circles
            </text>
          </>
        ) : id === "scaling" ? (
          <>
            <rect
              x="235"
              y="58"
              width="130"
              height="36"
              rx="8"
              fill="#536480"
            />
            <rect
              x="105"
              y="145"
              width="390"
              height="18"
              rx="8"
              fill="#EDE9FE"
              stroke="#7652C8"
              strokeWidth="3"
            />
            <rect
              x="470"
              y="112"
              width="90"
              height="55"
              rx="8"
              fill="#536480"
            />
            <path
              d="M275 100V133m-7-9 7 9 7-9M325 100V133m-7-9 7 9 7-9"
              fill="none"
              stroke="#4F46E5"
              strokeWidth="4"
            />
            <path
              d="M465 115Q410 105 350 140M465 130Q405 125 370 147"
              fill="none"
              stroke="#A16207"
              strokeWidth="4"
              strokeDasharray="8 6"
            />
            <text
              x="300"
              y="38"
              textAnchor="middle"
              fill="#202D53"
              fontSize="27"
            >
              Gate control
            </text>
            <text
              x="510"
              y="92"
              textAnchor="middle"
              fill="#202D53"
              fontSize="25"
            >
              Drain
            </text>
            <text
              x="300"
              y="200"
              textAnchor="middle"
              fill="#805800"
              fontSize="25"
            >
              Dashed paths: competing drain influence
            </text>
          </>
        ) : (
          <>
            <circle
              cx="110"
              cy="110"
              r="75"
              fill="#EDE9FE"
              stroke="#7652C8"
              strokeWidth="3"
            />
            {[0, 1, 2].flatMap((row) =>
              [0, 1, 2].map((column) => (
                <rect
                  key={`${row}-${column}`}
                  x={64 + column * 32}
                  y={65 + row * 32}
                  width="25"
                  height="25"
                  rx="4"
                  fill={row === 1 && column === 2 ? "#FEF3C7" : "#FFFFFF"}
                  stroke={row === 1 && column === 2 ? "#A16207" : "#7652C8"}
                  strokeWidth="2"
                />
              )),
            )}
            <path
              d="M205 110H270m-15-10 15 10-15 10"
              fill="none"
              stroke="#4F46E5"
              strokeWidth="4"
            />
            <rect
              x="305"
              y="55"
              width="230"
              height="110"
              rx="14"
              fill="#FFFFFF"
              stroke="#536480"
              strokeWidth="3"
            />
            <path
              d="M330 110H390V85H475M390 110V135H490"
              fill="none"
              stroke="#076B7D"
              strokeWidth="4"
            />
            {[
              { x: 330, y: 110 },
              { x: 390, y: 110 },
              { x: 475, y: 85 },
              { x: 490, y: 135 },
            ].map((point) => (
              <circle
                key={point.x}
                cx={point.x}
                cy={point.y}
                r="9"
                fill="#8B5CF6"
              />
            ))}
            <text
              x="110"
              y="210"
              textAnchor="middle"
              fill="#202D53"
              fontSize="27"
            >
              Wafer uniformity
            </text>
            <text
              x="420"
              y="210"
              textAnchor="middle"
              fill="#202D53"
              fontSize="27"
            >
              Connected circuits
            </text>
          </>
        )}
      </svg>
      <figcaption className="text-sm mt-3">
        {description} · conceptual schematic, not measured data.
      </figcaption>
    </figure>
  );
}
export function ChallengeExplorer() {
  const selected = useSyncExternalStore(
    subscribe,
    selectedChallenge,
    () => "contacts",
  );
  return (
    <>
      <div className="challenge-overview" aria-label="Challenge categories">
        {challenges.map((item) => (
          <button
            key={item.id}
            className="panel"
            aria-pressed={selected === item.id}
            onClick={() => {
              selectChallenge(item.id);
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
            <ChallengeDiagram id={item.id} description={item.diagram} />
            <details
              open={selected === item.id}
              onToggle={(event) => {
                if (event.currentTarget.open && selected !== item.id)
                  selectChallenge(item.id);
              }}
            >
              <summary>Why it happens & how it affects a transistor</summary>
              <div className="grid gap-5 md:grid-cols-2 mt-4">
                <div>
                  <h3>Why it happens</h3>
                  <p className="mt-2">{item.cause}</p>
                </div>
                <div>
                  <h3>Device impact</h3>
                  <p className="mt-2">{item.impact}</p>
                </div>
              </div>
              <p className="muted text-sm mt-4">{item.modelBoundary}</p>
            </details>
            <div className="connection">
              <h3>Research Directions</h3>
              <p>{item.solution}</p>
              <ReferenceLink
                id="engineering2024"
                from={"/challenges#" + item.id}
              />
            </div>
            <details>
              <summary>{challengeEvidence[item.id].title}</summary>
              <p className="text-sm mt-3">
                {challengeEvidence[item.id].explanation}{" "}
                <ReferenceLink
                  id={challengeEvidence[item.id].reference}
                  from={"/challenges#" + item.id}
                />
              </p>
              <p className="text-sm muted mt-3">
                {challengeEvidence[item.id].boundary}
              </p>
              <ScientificFigure id={challengeEvidence[item.id].figure} />
              <a
                className="text-link"
                href={challengeEvidence[item.id].source}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read the research case ↗
              </a>
            </details>
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
