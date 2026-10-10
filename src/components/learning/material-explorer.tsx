"use client";
import { useState } from "react";
import { materials, type MaterialId } from "@/data/materials";
import { BandDiagram } from "./band-diagram";
import { ReferenceLink } from "@/components/reference-link";
export function MaterialStructure({ material }: { material: MaterialId }) {
  return (
    <svg
      viewBox="0 0 350 150"
      role="img"
      aria-label={materials[material].structure}
    >
      {material === "graphene" ? (
        [0, 1, 2, 3].map((i) => (
          <g key={i} transform={"translate(" + (50 + i * 65) + ",25)"}>
            <path
              d="M30 0 58 16v32L30 64 2 48V16Z"
              fill="none"
              stroke="#67e8f9"
              strokeWidth="2"
            />
            {[
              [30, 0],
              [58, 16],
              [58, 48],
              [30, 64],
              [2, 48],
              [2, 16],
            ].map(([x, y], j) => (
              <circle key={j} cx={x} cy={y} r="4" fill="#67e8f9" />
            ))}
          </g>
        ))
      ) : material === "mos2" ? (
        [0, 1, 2].map((row) => (
          <g key={row}>
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <circle
                key={i}
                cx={40 + i * 40}
                cy={32 + row * 38}
                r={row === 1 ? 10 : 7}
                fill={row === 1 ? "#b5a4ff" : "#e4c879"}
              />
            ))}
            <text x="323" y={37 + row * 38} fill="#aebfd5" fontSize="12">
              {row === 1 ? "Mo" : "S"}
            </text>
          </g>
        ))
      ) : (
        <g>
          <path
            d="M85 32 170 8 265 40 180 70Z M85 32v70l95 34V70 M180 136l85-35V40"
            fill="#243b5b"
            stroke="#67e8f9"
          />
          <text x="110" y="93" fill="#edf3ff" fontSize="15">
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
}: {
  from: string;
  showStructure?: boolean;
}) {
  const [selected, setSelected] = useState<MaterialId>("mos2");
  const material = materials[selected];
  return (
    <div className="panel">
      <div className="tabs" aria-label="Select a material">
        {(Object.keys(materials) as MaterialId[]).map((id) => (
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
          {showStructure ? <MaterialStructure material={selected} /> : null}
          <h3>{material.name}</h3>
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
    </div>
  );
}
