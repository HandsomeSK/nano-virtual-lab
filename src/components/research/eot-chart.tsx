"use client";
import { useState } from "react";
import { interfaceMeasurement as metric } from "@/data/discoveries";
import { ReferenceLink } from "@/components/reference-link";
export function EotChart() {
  const [unit, setUnit] = useState<"nm" | "Å">("nm");
  const factor = unit === "nm" ? 1 : 10;
  return (
    <figure className="eot-chart">
      <div className="chart-heading">
        <h3>A measured equivalent thickness</h3>
        <div className="tabs" role="group" aria-label="Thickness units">
          {(["nm", "Å"] as const).map((u) => (
            <button
              type="button"
              key={u}
              aria-pressed={unit === u}
              onClick={() => setUnit(u)}
            >
              {u}
            </button>
          ))}
        </div>
      </div>
      <svg
        viewBox="0 0 640 240"
        role="img"
        aria-label={
          "Reported EOT " +
          (metric.value * factor).toFixed(1) +
          " ± " +
          (metric.uncertainty * factor).toFixed(1) +
          " " +
          unit +
          "; one measurement with a reported uncertainty interval, not a device characteristic curve"
        }
      >
        {Array.from({ length: 7 }, (_, i) => {
          const x = 90 + i * 75;
          return (
            <g key={i}>
              <path
                d={"M" + x + " 48V170"}
                stroke="var(--line)"
                strokeDasharray="3 5"
              />
              <text
                x={x}
                y="194"
                textAnchor="middle"
                fill="var(--muted)"
                fontSize="12"
              >
                {(i * 0.2 * factor).toFixed(unit === "nm" ? 1 : 0)}
              </text>
            </g>
          );
        })}
        <text x="90" y="29" fill="var(--ink)" fontSize="13">
          Hybrid HfO₂ / carbon-dot dielectric
        </text>
        <path d="M90 170H540" stroke="var(--muted)" />
        <path
          d="M277.5 100H352.5M277.5 89v22M352.5 89v22"
          stroke="#80dedc"
          strokeWidth="2"
        />
        <circle cx="315" cy="100" r="6" fill="#80dedc" />
        <text
          x="315"
          y="76"
          textAnchor="middle"
          fill="var(--ink)"
          fontSize="16"
        >
          {(metric.value * factor).toFixed(1)} ±{" "}
          {(metric.uncertainty * factor).toFixed(1)} {unit}
        </text>
        <text
          x="315"
          y="226"
          textAnchor="middle"
          fill="var(--muted)"
          fontSize="13"
        >
          Equivalent oxide thickness ({unit})
        </text>
      </svg>
      <figcaption>
        {metric.context}
        <ReferenceLink
          id={metric.reference}
          from="/discoveries/mos2-interface-breakthrough#measurements"
        />
      </figcaption>
      <details>
        <summary>Read the value and its source</summary>
        <div
          className="horizontal-scroll"
          tabIndex={0}
          role="region"
          aria-label="Reported EOT measurement table"
        >
          <table>
            <thead>
              <tr>
                <th>Quantity</th>
                <th>Reported value</th>
                <th>Measurement context</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>{metric.name}</th>
                <td>
                  {(metric.value * factor).toFixed(1)} ±{" "}
                  {(metric.uncertainty * factor).toFixed(1)} {unit}
                </td>
                <td>{metric.locator}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </details>
    </figure>
  );
}
