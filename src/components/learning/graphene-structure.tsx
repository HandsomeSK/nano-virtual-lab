"use client";
import { useState } from "react";
import { GrapheneLattice } from "./material-explorer";
import { ReferenceLink } from "@/components/reference-link";

const structures = {
  graphene: {
    name: "Graphene",
    description:
      "One honeycomb carbon sheet. Each carbon is bonded to three neighbours; two sites form the repeating basis.",
  },
  graphite: {
    name: "Graphite",
    description:
      "Stacked graphene-like sheets, with weaker interactions between layers than the strong bonds within a sheet.",
  },
  nanotube: {
    name: "Carbon nanotube",
    description:
      "A rolled-sheet picture of a nanotube. Diameter and wrapping direction affect its electronic structure; the drawing does not specify chirality.",
  },
};
export function GrapheneStructureExplorer() {
  const [structure, setStructure] =
    useState<keyof typeof structures>("graphene");
  const [highlight, setHighlight] = useState<"atoms" | "bonds" | "basis">(
    "atoms",
  );
  return (
    <div className="panel structure-explorer" id="materials">
      <h3>Explore the carbon sheet</h3>
      <div className="tabs mt-4" role="group" aria-label="Carbon structure">
        {(Object.keys(structures) as (keyof typeof structures)[]).map((id) => (
          <button
            key={id}
            aria-pressed={structure === id}
            onClick={() => setStructure(id)}
          >
            {structures[id].name}
          </button>
        ))}
      </div>
      <div className="two-column mt-5">
        <figure className="material-canvas">
          <svg
            viewBox="0 0 380 210"
            role="img"
            aria-label={
              structures[structure].name +
              " illustrative structure, highlighted " +
              highlight
            }
          >
            {structure === "graphite" ? (
              [-1, 0, 1].map((layer) => (
                <g
                  key={layer}
                  transform={
                    "translate(" +
                    (15 + layer * 12) +
                    "," +
                    (30 + layer * 26) +
                    ")"
                  }
                  opacity={layer === 1 ? 1 : 0.35 + (layer + 1) * 0.2}
                >
                  <GrapheneLattice highlight={highlight} />
                </g>
              ))
            ) : structure === "nanotube" ? (
              <g>
                <rect
                  x="32"
                  y="30"
                  width="310"
                  height="135"
                  rx="58"
                  fill="#102229"
                  stroke="var(--cyan-ink)"
                  strokeWidth="2"
                />
                <g transform="translate(15 47) scale(1 .7)">
                  <GrapheneLattice highlight={highlight} />
                </g>
                <ellipse
                  cx="88"
                  cy="97"
                  rx="54"
                  ry="67"
                  fill="none"
                  stroke="var(--cyan-ink)"
                  strokeDasharray="4 3"
                />
                <path
                  d="M285 32q58 65 0 132"
                  fill="none"
                  stroke="var(--cyan-ink)"
                />
              </g>
            ) : (
              <g transform="translate(15 30)">
                <GrapheneLattice highlight={highlight} />
              </g>
            )}
            <text
              x="190"
              y="200"
              textAnchor="middle"
              fill="var(--color-muted)"
              fontSize="11"
            >
              {structure === "nanotube"
                ? "Rolled-sheet geometry"
                : structure === "graphite"
                  ? "Stacked layers"
                  : "Honeycomb lattice"}{" "}
              · not to scale
            </text>
          </svg>
        </figure>
        <div>
          <h3>{structures[structure].name}</h3>
          <p className="mt-3 text-sm" aria-live="polite">
            {structures[structure].description}{" "}
            <ReferenceLink
              id="neto2009"
              from="/foundations#graphene-structure"
            />
          </p>
          <div
            className="tabs mt-5"
            role="group"
            aria-label="Highlight lattice feature"
          >
            {(
              [
                { id: "atoms", name: "Carbon atoms" },
                { id: "bonds", name: "Bonds" },
                { id: "basis", name: "Two-atom basis" },
              ] as const
            ).map((item) => (
              <button
                key={item.id}
                aria-pressed={highlight === item.id}
                onClick={() => setHighlight(item.id)}
              >
                {item.name}
              </button>
            ))}
          </div>
          <p className="text-xs muted mt-3">
            {highlight === "basis"
              ? "Cyan and indigo mark the two equivalent carbon sublattices, A and B; they are not different elements."
              : highlight === "bonds"
                ? "Highlighted lines show the connected honeycomb bond network."
                : "Cyan markers represent carbon atoms, not electron positions."}
          </p>
        </div>
      </div>
    </div>
  );
}
