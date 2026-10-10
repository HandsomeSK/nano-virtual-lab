import type { MaterialId } from "@/data/materials";
export function BandDiagram({ material }: { material: MaterialId | "metal" }) {
  const zeroGap = material === "graphene" || material === "metal";
  return (
    <figure>
      <svg
        viewBox="0 0 440 200"
        role="img"
        aria-label={material + " conceptual energy band diagram"}
        className="band-diagram"
      >
        <path d="M55 165V22M50 30l5-8 5 8" stroke="#8299b7" fill="none" />
        <text x="10" y="18" fill="#99abc4" fontSize="11">
          Energy
        </text>
        <rect
          x="84"
          y={zeroGap ? 72 : 36}
          width="282"
          height="48"
          fill="#67e8f9"
          fillOpacity=".18"
          stroke="#67e8f9"
        />
        <rect
          x="84"
          y={zeroGap ? 82 : 117}
          width="282"
          height="48"
          fill="#b5a4ff"
          fillOpacity=".18"
          stroke="#b5a4ff"
        />
        {!zeroGap ? (
          <>
            <path
              d="M388 84v33m-5-27 5-6 5 6m-10 21 5 6 5-6"
              stroke="#edf3ff"
              fill="none"
            />
            <text x="205" y="106" fill="#edf3ff" fontSize="13">
              Band gap
            </text>
          </>
        ) : null}
        <text x="99" y={zeroGap ? 68 : 65} fill="#67e8f9" fontSize="12">
          {zeroGap ? "No forbidden gap at the Fermi level" : "Conduction band"}
        </text>
        <text x="99" y={zeroGap ? 154 : 148} fill="#b5a4ff" fontSize="12">
          {zeroGap
            ? material === "graphene"
              ? "Bands touch (semimetal)"
              : "Partly filled / overlapping bands"
            : "Valence band"}
        </text>
      </svg>
      <figcaption className="muted text-xs">
        Conceptual energy diagram · not a band-offset alignment or dispersion
        calculation.
      </figcaption>
    </figure>
  );
}
