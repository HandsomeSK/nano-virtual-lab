import type { CurveMode, Parameters } from "@/lib/simulation/model";
import { currentA, curve } from "@/lib/simulation/model";
export function IVChart({
  series,
  mode,
  maximumCurrent,
  operatingPoint,
}: {
  series: { name: string; parameters: Parameters; color: string }[];
  mode: CurveMode;
  maximumCurrent?: number;
  operatingPoint?: Parameters;
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
  const selectedX = operatingPoint
    ? operatingPoint[mode === "transfer" ? "gateVoltage" : "drainVoltage"]
    : null;
  const selectedCurrent = operatingPoint ? currentA(operatingPoint) * 1e6 : null;
  return (
    <figure className="iv-chart instrument-chart">
      <svg
        viewBox="0 0 580 330"
        role="img"
        aria-label={
          (mode === "transfer" ? "Transfer" : "Output") +
          " characteristic: drain current in microamps vs " +
          (mode === "transfer" ? "gate" : "drain") +
          " voltage" +
          (selectedX !== null && selectedCurrent !== null
            ? `. Selected point: ${selectedX.toFixed(2)} V, ${selectedCurrent.toFixed(3)} microamps.`
            : "")
        }
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <path
              d={"M66 " + y((maxY * i) / 4) + "H520"}
              stroke="var(--line)"
              strokeDasharray="4 5"
            />
            <text
              x="57"
              y={y((maxY * i) / 4) + 4}
              fill="var(--muted)"
              fontSize="11"
              textAnchor="end"
            >
              {((maxY * i) / 4).toFixed(maxY < 10 ? 2 : 0)}
            </text>
            <text
              x={x((maxX * i) / 4)}
              y="299"
              fill="var(--muted)"
              fontSize="11"
              textAnchor="middle"
            >
              {((maxX * i) / 4).toFixed(2)}
            </text>
          </g>
        ))}
        <path d="M66 40V280H520" stroke="var(--muted)" fill="none" />
        {curves.map((item, index) => (
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
            strokeDasharray={index ? "7 4" : undefined}
          />
        ))}
        {selectedX !== null && selectedCurrent !== null ? (
          <g data-selected-bias>
            <path
              d={`M${x(selectedX)} 280V${y(selectedCurrent)}`}
              stroke="var(--muted)"
              strokeDasharray="3 4"
            />
            <circle
              cx={x(selectedX)}
              cy={y(selectedCurrent)}
              r="4.5"
              fill="var(--ink)"
              stroke="var(--surface)"
              strokeWidth="2"
            />
          </g>
        ) : null}
        <text
          x="293"
          y="325"
          fill="var(--ink)"
          fontSize="12"
          textAnchor="middle"
        >
          {mode === "transfer" ? "Gate voltage (V)" : "Drain voltage (V)"}
        </text>
        <text
          transform="translate(15,170) rotate(-90)"
          fill="var(--ink)"
          fontSize="12"
          textAnchor="middle"
        >
          Drain current (µA)
        </text>
      </svg>
      <figcaption className="chart-legend">
        {series.map((item, index) => (
          <span key={item.name}>
            <i
              style={{
                borderTop:
                  "2px " + (index ? "dashed" : "solid") + " " + item.color,
              }}
            />
            {item.name}
          </span>
        ))}
        {operatingPoint ? (
          <span>
            Selected bias: Vg {operatingPoint.gateVoltage.toFixed(2)} V; Vd{" "}
            {operatingPoint.drainVoltage.toFixed(2)} V
          </span>
        ) : null}
      </figcaption>
      <details className="curve-data">
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
