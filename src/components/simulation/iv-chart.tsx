import type { CurveMode, Parameters } from "@/lib/simulation/model";
import { curve } from "@/lib/simulation/model";
export function IVChart({
  series,
  mode,
  maximumCurrent,
}: {
  series: { name: string; parameters: Parameters; color: string }[];
  mode: CurveMode;
  maximumCurrent?: number;
}) {
  const curves = series.map((item) => ({
    ...item,
    points: curve(item.parameters, mode),
  }));
  const maxX = mode === "transfer" ? 3 : 2;
  const maxY =
    Math.max(
      1,
      maximumCurrent ??
        Math.max(
          ...curves.flatMap((item) => item.points.map((point) => point.y)),
        ),
    ) * 1.1;
  const x = (v: number) => 66 + (v / maxX) * 454,
    y = (v: number) => 280 - (v / maxY) * 236;
  return (
    <figure className="iv-chart">
      <svg
        viewBox="0 0 580 330"
        role="img"
        aria-label={
          (mode === "transfer" ? "Transfer" : "Output") +
          " characteristic: drain current in microamps vs " +
          (mode === "transfer" ? "gate" : "drain") +
          " voltage"
        }
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <path
              d={"M66 " + y((maxY * i) / 4) + "H520"}
              stroke="#29364c"
              strokeDasharray="4 5"
            />
            <text
              x="57"
              y={y((maxY * i) / 4) + 4}
              fill="#99abc4"
              fontSize="11"
              textAnchor="end"
            >
              {((maxY * i) / 4).toFixed(maxY < 10 ? 2 : 0)}
            </text>
            <text
              x={x((maxX * i) / 4)}
              y="299"
              fill="#99abc4"
              fontSize="11"
              textAnchor="middle"
            >
              {((maxX * i) / 4).toFixed(2)}
            </text>
          </g>
        ))}
        <path d="M66 40V280H520" stroke="#aebfd5" fill="none" />
        {curves.map((item) => (
          <path
            key={item.name}
            d={item.points
              .map(
                (point, i) =>
                  (i === 0 ? "M" : "L") +
                  x(point.x).toFixed(2) +
                  " " +
                  y(point.y).toFixed(2),
              )
              .join(" ")}
            fill="none"
            stroke={item.color}
            strokeWidth="2.5"
          />
        ))}
        <text x="293" y="325" fill="#edf3ff" fontSize="12" textAnchor="middle">
          {mode === "transfer" ? "Gate voltage (V)" : "Drain voltage (V)"}
        </text>
        <text
          transform="translate(15,170) rotate(-90)"
          fill="#edf3ff"
          fontSize="12"
          textAnchor="middle"
        >
          Drain current (µA)
        </text>
      </svg>
      <figcaption className="chart-legend">
        {series.map((item) => (
          <span key={item.name}>
            <i style={{ background: item.color }} />
            {item.name}
          </span>
        ))}
      </figcaption>
      <details>
        <summary>View curve data</summary>
        <div className="horizontal-scroll">
          <table>
            <caption className="sr-only">
              Sampled calculated curve values
            </caption>
            <thead>
              <tr>
                <th>{mode === "transfer" ? "Gate" : "Drain"} (V)</th>
                {curves.map((item) => (
                  <th key={item.name}>{item.name} (µA)</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[0, 20, 40, 60, 80, 100].map((i) => (
                <tr key={i}>
                  <td>{curves[0]?.points[i].x.toFixed(2)}</td>
                  {curves.map((item) => (
                    <td key={item.name}>{item.points[i].y.toFixed(3)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </figure>
  );
}
