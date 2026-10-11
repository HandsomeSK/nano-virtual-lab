"use client";
import { useState } from "react";
import { materials, type MaterialId } from "@/data/materials";
import { BandDiagram } from "./band-diagram";
import { ReferenceLink } from "@/components/reference-link";

export function GrapheneLattice({
  highlight = "atoms",
}: {
  highlight?: "atoms" | "bonds" | "basis";
}) {
  return (
    <g>
      {Array.from({ length: 14 }, (_, i) => {
        const column = i % 7,
          row = Math.floor(i / 7);
        const centerX = 60 + column * 37.5;
        const centerY = 42 + row * 43.3 + (column % 2) * 21.65;
        const vertices = Array.from({ length: 6 }, (_, n) => [
          centerX + 25 * Math.cos((n * Math.PI) / 3),
          centerY + 25 * Math.sin((n * Math.PI) / 3),
        ]);
        return (
          <g key={i}>
            <polygon
              points={vertices
                .map(([x, y]) => x.toFixed(2) + "," + y.toFixed(2))
                .join(" ")}
              fill="none"
              stroke="#076b7d"
              strokeWidth={highlight === "bonds" ? 3 : 1.5}
            />
            {vertices.map(([x, y], n) => (
              <circle
                key={n}
                cx={x}
                cy={y}
                r={highlight === "bonds" ? 2.8 : 4}
                fill={highlight === "basis" && n % 2 ? "#4f46e5" : "#06b6d4"}
                stroke="#076b7d"
                strokeWidth=".7"
              />
            ))}
          </g>
        );
      })}
    </g>
  );
}

export function MaterialStructure({ material }: { material: MaterialId }) {
  return (
    <svg
      viewBox="0 0 350 150"
      role="img"
      aria-label={materials[material].structure}
    >
      {material === "graphene" ? (
        <GrapheneLattice />
      ) : material === "mos2" ? (
        <g>
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <g key={i}>
              <path
                d={
                  "M" +
                  (40 + i * 40) +
                  " 35l20 38-20 38M" +
                  (40 + i * 40) +
                  " 35l-20 38 20 38"
                }
                fill="none"
                stroke="#b6a1e8"
                strokeWidth="3"
              />
              <circle
                cx={40 + i * 40}
                cy="35"
                r="7"
                fill="#f6c453"
                stroke="#ad7509"
              />
              <circle
                cx={20 + i * 40}
                cy="73"
                r="10"
                fill="#8b5cf6"
                stroke="#7652c8"
              />
              <circle
                cx={40 + i * 40}
                cy="111"
                r="7"
                fill="#f6c453"
                stroke="#ad7509"
              />
            </g>
          ))}
          <text x="322" y="39" fill="var(--color-muted)" fontSize="12">
            S
          </text>
          <text x="307" y="77" fill="#7652c8" fontSize="12">
            Mo
          </text>
          <text x="322" y="115" fill="var(--color-muted)" fontSize="12">
            S
          </text>
        </g>
      ) : (
        <g>
          <path
            d="M85 32 170 8 265 40 180 70Z M85 32v70l95 34V70 M180 136l85-35V40"
            fill="#edf1fb"
            stroke="#4f46e5"
            strokeWidth="2"
          />
          <text x="110" y="93" fill="var(--color-ink)" fontSize="15">
            Bulk crystal
          </text>
        </g>
      )}
    </svg>
  );
}

export function MaterialExplorer({
  from,
  showStructure = true,
  initialMaterial = "mos2",
}: {
  from: string;
  showStructure?: boolean;
  initialMaterial?: MaterialId;
}) {
  const [selected, setSelected] = useState<MaterialId>(initialMaterial);
  const material = materials[selected];
  return (
    <div className="panel material-explorer" data-material={selected}>
      <div className="tabs" aria-label="Select a material">
        {(["graphene", "mos2", "silicon"] as MaterialId[]).map((id) => (
          <button
            key={id}
            type="button"
            aria-pressed={selected === id}
            onClick={() => setSelected(id)}
          >
            {materials[id].name}
          </button>
        ))}
      </div>
      <div className="two-column mt-6">
        <div>
          {showStructure ? (
            <div className="material-canvas">
              <MaterialStructure material={selected} />
            </div>
          ) : null}
          <h3 className="mt-4">{material.name}</h3>
          <p className="mt-2 text-sm">{material.structure}</p>
          <p className="mt-3 text-sm">{material.band}</p>
          <p className="mt-2 text-sm">
            {material.gap} <ReferenceLink id={material.reference} from={from} />
          </p>
        </div>
        <BandDiagram material={selected} />
      </div>
      <div className="two-column mt-5">
        <p className="text-sm">
          <strong className="text-ink">Opportunity.</strong> {material.strength}
        </p>
        <p className="text-sm">
          <strong className="text-ink">Limitation.</strong>{" "}
          {material.limitation}
        </p>
      </div>
      <p className="text-xs muted mt-4">
        Intrinsic material context, not device-performance rankings. Structure
        and band diagrams are original schematics.
      </p>
    </div>
  );
}
