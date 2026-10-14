import { ReferenceLink } from "@/components/reference-link";
import { researchDirections } from "@/data/research-knowledge";

export function ResearchSystemMap() {
  return (
    <figure className="research-system-map">
      <h3>A connected device problem</h3>
      <svg
        viewBox="0 0 480 250"
        role="img"
        aria-label="Conceptual transistor cross-section: a gate sits above a dielectric and a semiconductor channel, with source and drain contacts on either side and a supporting substrate beneath."
      >
        <rect x="38" y="180" width="404" height="34" rx="4" fill="#53677c" />
        <rect x="38" y="158" width="404" height="22" fill="#af8560" />
        <rect x="72" y="150" width="336" height="8" rx="3" fill="#c6b4f8" />
        <rect x="58" y="110" width="95" height="40" rx="4" fill="#d6b657" />
        <rect x="327" y="110" width="95" height="40" rx="4" fill="#d6b657" />
        <rect x="158" y="113" width="164" height="37" rx="3" fill="#80dedc" fillOpacity=".4" stroke="#80dedc" />
        <rect x="182" y="80" width="116" height="33" rx="3" fill="#d6b657" />
        <g fill="var(--ink)" fontSize="14" textAnchor="middle">
          <text x="240" y="59">Gate</text>
          <text x="104" y="96">Source</text>
          <text x="376" y="96">Drain</text>
          <text x="240" y="138">Dielectric</text>
          <text x="240" y="236">Supporting substrate</text>
        </g>
        <path d="M240 63v12M240 214v7M310 154l40 28h50" fill="none" stroke="var(--muted)" />
        <text x="359" y="202" fill="var(--ink)" fontSize="13">Channel</text>
      </svg>
      <nav className="research-system-links" aria-label="Device research map">
        {researchDirections.map((direction) => (
          <a key={direction.id} href={"#discovery-" + direction.id}>
            {direction.label}
          </a>
        ))}
      </nav>
      <figcaption>
        Each material choice affects the whole device. Original conceptual
        schematic; dimensions are illustrative.
        <ReferenceLink id="engineering2024" from="/research#research-overview" />
      </figcaption>
    </figure>
  );
}
