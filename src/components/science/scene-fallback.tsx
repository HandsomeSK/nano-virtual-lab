import {
  createAtomicStructure,
  atomicColors,
} from "@/lib/science/atomic-structure";
import { deviceParts } from "@/data/device";
import type { SceneSpec } from "./types";
export function SceneFallback({
  spec,
  hidden = [],
  message = "Loading the interactive model…",
}: {
  spec: SceneSpec;
  hidden?: string[];
  message?: string;
}) {
  const structure =
    spec.kind === "atomic"
      ? createAtomicStructure(spec.material, spec.layers, spec.stacking, 2)
      : undefined;
  return (
    <div className="scene-fallback">
      <svg
        viewBox="0 0 600 350"
        role="img"
        aria-label={
          spec.kind === "atomic"
            ? "Static projection of the " + spec.material + " lattice"
            : "Static section of a conceptual top-gated MoS₂ transistor"
        }
      >
        {structure ? (
          <g transform="translate(300 175)">
            {structure.bonds
              .filter(
                ({ a, b }) =>
                  !hidden.includes(structure.atoms[a].kind) &&
                  !hidden.includes(structure.atoms[b].kind),
              )
              .map(({ a, b }, i) => (
                <line
                  key={i}
                  x1={structure.atoms[a].position[0] * 20}
                  y1={
                    structure.atoms[a].position[2] * 20 +
                    structure.atoms[a].position[1] * 8
                  }
                  x2={structure.atoms[b].position[0] * 20}
                  y2={
                    structure.atoms[b].position[2] * 20 +
                    structure.atoms[b].position[1] * 8
                  }
                  stroke="#6e8189"
                  strokeWidth="2"
                />
              ))}
            {structure.atoms
              .filter((atom) => !hidden.includes(atom.kind))
              .map((atom, i) => (
                <circle
                  key={i}
                  cx={atom.position[0] * 20}
                  cy={atom.position[2] * 20 + atom.position[1] * 8}
                  r={atom.element === "C" ? 5 : 7}
                  fill={atomicColors[atom.kind]}
                />
              ))}
          </g>
        ) : (
          <g transform="translate(90 280) scale(1 -1)">
            {deviceParts
              .filter((part) => !hidden.includes(part.id))
              .map((part) => (
                <rect
                  key={part.id}
                  x={part.x}
                  y={part.z * 2}
                  width={part.w}
                  height={Math.max(6, part.h * 2)}
                  fill={part.color}
                  stroke="#111"
                />
              ))}
            {spec.kind === "device" &&
            spec.interface &&
            !hidden.includes("interface") ? (
              <rect x="110" y="62" width="180" height="8" fill="#80dedc" />
            ) : null}
          </g>
        )}
      </svg>
      <p role="status">{message}</p>
      <p className="text-xs">
        Static schematic · not to scale. The controls and layer descriptions
        remain available.
      </p>
    </div>
  );
}
