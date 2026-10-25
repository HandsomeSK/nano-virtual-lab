import {
  createAtomicStructure,
  atomicColors,
  carbonDetail,
} from "@/lib/science/atomic-structure";
import { deviceParts } from "@/data/device";
import type { SceneOptions, SceneSpec } from "./types";
import { deviceStructureForScene } from "@/lib/science/device-state";
export function SceneFallback({
  spec,
  hidden = [],
  message = "Loading the interactive model…",
  options,
}: {
  spec: SceneSpec;
  hidden?: string[];
  message?: string;
  options?: Pick<SceneOptions, "deviceStructure">;
}) {
  const deviceStructure = spec.kind === "device"
    ? deviceStructureForScene(spec, options)
    : null;
  const structure =
    spec.kind === "atomic"
      ? spec.material === "graphene" && spec.detail && spec.detail !== "lattice"
        ? carbonDetail(spec.detail)
        : createAtomicStructure(spec.material, spec.layers, spec.stacking, 2)
      : undefined;
  return (
    <div className="scene-fallback">
      <svg
        viewBox="0 0 600 350"
        role="img"
        aria-label={
          spec.kind === "atomic"
            ? "Static projection of the " + spec.material + " lattice"
            : deviceStructure === "with-carbon"
              ? "Static transistor section with a carbon-dot interlayer and continuous dielectric"
              : deviceStructure === "without-carbon"
                ? "Static transistor section without carbon dots, showing discontinuous oxide islands"
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
          <g transform="translate(90 290) scale(1 -1)">
            {deviceParts
              .filter((part) => !hidden.includes(part.id))
              .map((part) =>
                part.id === "dielectric" &&
                spec.kind === "device" &&
                deviceStructure === "without-carbon" ? (
                  <g key={part.id} fill={part.color} opacity="0.5" stroke="#111">
                    {[0, 1, 2].map((island) => (
                      <rect
                        key={island}
                        x={part.x + (part.w / 3) * island + 5}
                        y={part.z * 2}
                        width={part.w / 3 - 10}
                        height={20 + island * 2}
                      />
                    ))}
                  </g>
                ) : (
                  <rect
                    key={part.id}
                    x={part.x}
                    y={
                      part.z * 2 +
                      (spec.kind === "device" &&
                      deviceStructure === "with-carbon" &&
                      (part.id === "dielectric" || part.id === "gate")
                        ? 8
                        : 0)
                    }
                    width={part.w}
                    height={Math.max(6, part.h * 2)}
                    fill={part.color}
                    opacity={part.id === "dielectric" ? 0.5 : 1}
                    stroke="#111"
                  />
                ),
              )}
            {spec.kind === "device" &&
            deviceStructure === "with-carbon" &&
            !hidden.includes("interface") ? (
              <rect x="110" y="148" width="180" height="8" fill="#80dedc" />
            ) : null}
          </g>
        )}
      </svg>
      <p role="status">{message}</p>
      <p className="text-xs">
        Static schematic · not to scale. Camera motion, expanded spacing and
        ON/OFF effects require the interactive 3D view.
      </p>
    </div>
  );
}
