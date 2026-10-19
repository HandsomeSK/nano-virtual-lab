import Link from "next/link";
import { ReferenceLink } from "@/components/reference-link";
import styles from "./interface-feature.module.css";
export function InterfaceFeature({
  from,
  compact = false,
}: {
  from: string;
  compact?: boolean;
}) {
  return (
    <section className={compact ? styles.compact : "interface-feature"}>
      <div className={compact ? styles.content : undefined}>
        <span className="eyebrow">Featured discovery · 7 October 2026</span>
        <h2>One interface, a different possibility</h2>
        <p>
          A carbon-dot assembly helps an ultrathin oxide take shape on MoS₂.
          Explore what happens between the channel and the gate.
        </p>
        <p className="feature-measurement">
          <strong>
            0.6 ± 0.1 <small>nm</small>
          </strong>
          <span>
            Reported equivalent oxide thickness
            <ReferenceLink id="wong2026" from={from} />
          </span>
        </p>
        <Link
          href="/discoveries/mos2-interface-breakthrough"
          className="metal-button metal-solid"
        >
          Explore the breakthrough
        </Link>
      </div>
      {compact ? null : (
        <figure className="interface-illustration">
          <svg
            viewBox="0 0 500 380"
            role="img"
            aria-label="Conceptual exploded gate stack: a gate above HfO₂, an insulating carbon-dot interfacial layer and a MoS₂ channel"
          >
            <defs>
              <linearGradient id="feature-metal" x2="1" y2="1">
                <stop stopColor="#e7edf5" />
                <stop offset=".5" stopColor="#8c97a7" />
                <stop offset="1" stopColor="#3d4859" />
              </linearGradient>
              <linearGradient id="feature-oxide" x2="0" y2="1">
                <stop stopColor="#98a7ba" />
                <stop offset="1" stopColor="#465870" />
              </linearGradient>
            </defs>
            <path
              d="m90 94 190-45 140 68-189 48Z"
              fill="url(#feature-metal)"
              stroke="#c4cdd9"
            />
            <path d="m90 94 141 71 189-48v18l-189 49L90 113Z" fill="#5c697d" />
            <text x="22" y="98" fill="#c9cfd9" fontSize="13">
              Gate
            </text>
            <path
              d="m90 167 190-45 140 68-189 48Z"
              fill="url(#feature-oxide)"
              stroke="#aabed5"
            />
            <path d="m90 167 141 71 189-48v12l-189 49-141-71Z" fill="#33465e" />
            <text x="22" y="167" fill="#c9cfd9" fontSize="13">
              HfO₂
            </text>
            <path
              d="m90 230 190-45 140 68-189 48Z"
              fill="#0e363a"
              stroke="#80dedc"
            />
            {Array.from({ length: 28 }, (_, i) => (
              <ellipse
                key={i}
                cx={131 + (i % 7) * 25 + Math.floor(i / 7) * 15}
                cy={230 + (i % 7) * -6 + Math.floor(i / 7) * 12}
                rx="6"
                ry="3"
                fill="#80dedc"
              />
            ))}
            <text x="22" y="228" fill="#80dedc" fontSize="13">
              Carbon dots
            </text>
            <path
              d="m90 292 190-45 140 68-189 48Z"
              fill="#37254b"
              stroke="#b49fea"
            />
            <text x="22" y="293" fill="#c8b6ed" fontSize="13">
              MoS₂
            </text>
          </svg>
          <figcaption>
            Original concept schematic · thicknesses and gaps exaggerated
          </figcaption>
        </figure>
      )}
    </section>
  );
}
