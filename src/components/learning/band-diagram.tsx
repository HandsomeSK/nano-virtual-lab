import type { MaterialId } from "@/data/materials";
import { normalizedBandEnergy } from "@/lib/graphene";

export function BandDiagram({
  material,
  fermiEnergy,
}: {
  material: MaterialId | "metal" | "semiconductor";
  fermiEnergy?: number;
}) {
  const color =
    material === "graphene"
      ? "#076b7d"
      : material === "mos2" || material === "semiconductor"
        ? "#7652c8"
        : "#4f46e5";
  const point = (k: number, energy: number) =>
    215 + k * 128 + "," + (123 - energy * 65);
  const points = Array.from({ length: 65 }, (_, i) => (i - 32) / 32);
  const upper = points
    .map((k) =>
      point(
        k,
        material === "silicon"
          ? 0.4 + 0.42 * (k - 0.45) ** 2
          : normalizedBandEnergy(
              k,
              material === "graphene" ? "graphene" : "gapped",
            ),
      ),
    )
    .join(" ");
  const lower = points
    .map((k) =>
      point(
        k,
        material === "silicon"
          ? -0.4 - 0.4 * k * k
          : -normalizedBandEnergy(
              k,
              material === "graphene" ? "graphene" : "gapped",
            ),
      ),
    )
    .join(" ");
  return (
    <figure className="dispersion-figure">
      <svg
        viewBox="0 0 440 270"
        role="img"
        aria-label={
          material +
          " conceptual energy versus wave-vector diagram" +
          (fermiEnergy !== undefined
            ? "; Fermi energy " + fermiEnergy.toFixed(2) + " in relative units"
            : "")
        }
        className="band-diagram"
      >
        <rect
          x="40"
          y="20"
          width="348"
          height="209"
          rx="12"
          fill={material === "graphene" ? "#eefbfe" : "#f5f2ff"}
        />
        <path
          d="M58 217V28m-5 8 5-8 5 8M58 217H377m-8-5 8 5-8 5"
          stroke="var(--color-muted)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M65 123H370M215 28V217"
          stroke="#b5c7dc"
          strokeDasharray="4 5"
        />
        <text x="12" y="15" fill="var(--color-ink)" fontSize="12">
          Energy E (relative units)
        </text>
        <text x="80" y="260" fill="var(--color-ink)" fontSize="12">
          Wave vector k (relative units)
        </text>
        {[-1, 0, 1].map((k) => (
          <text
            key={k}
            x={215 + k * 128}
            y="237"
            textAnchor="middle"
            fill="var(--color-muted)"
            fontSize="11"
          >
            {k === 0 && material === "graphene" ? "K" : k}
          </text>
        ))}
        <text x="42" y="128" fill="var(--color-muted)" fontSize="11">
          0
        </text>
        {material === "metal" ? (
          <>
            <polyline
              points={points.map((k) => point(k, 0.8 * k * k - 0.4)).join(" ")}
              fill="none"
              stroke={color}
              strokeWidth="3"
            />
            <path d="M65 123H370" stroke="#4f46e5" strokeDasharray="5 4" />
            <text x="87" y="73" fill={color} fontSize="12">
              Partly filled band
            </text>
            <text x="270" y="117" fill="#4f46e5" fontSize="11">
              Fermi level
            </text>
          </>
        ) : (
          <>
            <polyline
              points={upper}
              fill="none"
              stroke={color}
              strokeWidth="3"
            />
            <polyline
              points={lower}
              fill="none"
              stroke={color}
              strokeWidth="3"
              strokeDasharray="7 3"
            />
            <text x="75" y="45" fill={color} fontSize="11">
              Conduction band · solid
            </text>
            <text x="75" y="204" fill={color} fontSize="11">
              Valence band · dashed
            </text>
            {material === "graphene" ? (
              <>
                <circle cx="215" cy="123" r="5" fill={color} />
                <text x="272" y="15" fill="var(--color-ink)" fontSize="11">
                  Dirac point: K
                </text>
              </>
            ) : (
              <>
                <path
                  d={
                    material === "silicon"
                      ? "M215 149 273 97"
                      : "M215 149V97m-4 6 4-6 4 6m-8 40 4 6 4-6"
                  }
                  stroke="#4f46e5"
                  strokeWidth="1.5"
                  fill="none"
                  strokeDasharray={material === "silicon" ? "4 3" : undefined}
                />
                <text x="232" y="129" fill="var(--color-ink)" fontSize="11">
                  {material === "silicon" ? "Indirect gap" : "Finite gap"}
                </text>
              </>
            )}
          </>
        )}
        {fermiEnergy !== undefined ? (
          <>
            <path
              d={"M65 " + (123 - fermiEnergy * 65) + "H370"}
              stroke="#4f46e5"
              strokeWidth="2"
              strokeDasharray="5 4"
            />
            <text
              x="349"
              y={117 - fermiEnergy * 65}
              fill="#4f46e5"
              fontSize="11"
            >
              E<tspan baselineShift="sub">F</tspan>
            </text>
          </>
        ) : null}
      </svg>
      <figcaption className="muted text-xs">
        {material === "graphene"
          ? "Linear approximation near one K point; ideal monolayer graphene."
          : "Illustrative band shape; not a fitted material dispersion."}{" "}
        Axes are normalized; gap size and band alignment are not quantitative.
      </figcaption>
    </figure>
  );
}
