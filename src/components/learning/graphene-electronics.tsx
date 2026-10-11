"use client";
import { useId, useState } from "react";
import Link from "next/link";
import { BandDiagram } from "./band-diagram";
import { ReferenceLink } from "@/components/reference-link";
import {
  fermiCharacter,
  transportDescription,
  type DispersionKind,
} from "@/lib/graphene";

function ProjectedCone({
  kind,
  fermiEnergy,
}: {
  kind: DispersionKind;
  fermiEnergy: number;
}) {
  const clipId = useId();
  const color = kind === "graphene" ? "#076b7d" : "#7652c8";
  const top =
    kind === "graphene"
      ? "M60 49L180 175 300 49A120 26 0 0 0 60 49Z"
      : "M60 49Q180 217 300 49A120 26 0 0 0 60 49Z";
  const bottom =
    kind === "graphene"
      ? "M60 301L180 175 300 301A120 26 0 0 1 60 301Z"
      : "M60 301Q180 133 300 301A120 26 0 0 1 60 301Z";
  const fermiY = 175 - fermiEnergy * 105;
  return (
    <figure className="cone-figure">
      <svg
        viewBox="0 0 360 350"
        role="img"
        aria-label={
          (kind === "graphene"
            ? "Projected graphene Dirac double cone"
            : "Projected generic finite-gap bands") +
          "; Fermi plane at " +
          fermiEnergy.toFixed(2) +
          " relative energy units"
        }
      >
        <defs>
          <clipPath id={clipId}>
            <path d={top} />
            <path d={bottom} />
          </clipPath>
        </defs>
        <path
          d="M180 325V15m-5 8 5-8 5 8M180 175l153 40m-8-7 8 7-10 2M180 175 27 215m9-7-9 7 10 2"
          fill="none"
          stroke="var(--color-muted)"
          strokeWidth="1.5"
        />
        <path
          d={top}
          fill={kind === "graphene" ? "#06b6d41c" : "#8b5cf61c"}
          stroke={color}
          strokeWidth="1.5"
        />
        <path
          d={bottom}
          fill={kind === "graphene" ? "#06b6d41c" : "#8b5cf61c"}
          stroke={color}
          strokeWidth="1.5"
          strokeDasharray="5 3"
        />
        <rect
          x="40"
          y={fermiY}
          width="280"
          height={350 - fermiY}
          fill={color}
          fillOpacity=".2"
          clipPath={"url(#" + clipId + ")"}
        />
        {[0.45, 0.7, 0.95, 1.2].map((energy) => {
          const radius =
            kind === "graphene"
              ? 100 * energy
              : 120 * Math.sqrt((energy - 0.4) / 0.8);
          return (
            <g key={energy}>
              <ellipse
                cx="180"
                cy={175 - energy * 105}
                rx={radius}
                ry={radius / 4.6}
                fill="none"
                stroke={color}
                strokeOpacity=".45"
              />
              <ellipse
                cx="180"
                cy={175 + energy * 105}
                rx={radius}
                ry={radius / 4.6}
                fill="none"
                stroke={color}
                strokeOpacity=".45"
                strokeDasharray="4 3"
              />
            </g>
          );
        })}
        {kind === "graphene" ? (
          <>
            <path
              d="M120 26 180 175 240 26M120 324 180 175 240 324M180 23V327"
              fill="none"
              stroke={color}
              strokeOpacity=".5"
            />
            <circle cx="180" cy="175" r="4" fill={color} />
          </>
        ) : null}
        <path
          d={"M45 " + fermiY + "l70-16 200 16-70 16Z"}
          fill="#4f46e50b"
          stroke="#4f46e5"
          strokeDasharray="5 4"
        />
        <text x="294" y={fermiY - 6} fill="#4f46e5" fontSize="12">
          E<tspan baselineShift="sub">F</tspan>
        </text>
        <text x="193" y="18" fill="var(--color-ink)" fontSize="12">
          Energy E
        </text>
        <text x="332" y="233" fill="var(--color-ink)" fontSize="12">
          kₓ
        </text>
        <text x="20" y="233" fill="var(--color-ink)" fontSize="12">
          kᵧ
        </text>
        <text
          x="180"
          y="346"
          textAnchor="middle"
          fill="var(--color-muted)"
          fontSize="11"
        >
          Wave-vector components · relative units
        </text>
      </svg>
      <figcaption className="muted text-xs">
        {kind === "graphene"
          ? "Projected double cone near K."
          : "Generic gapped comparison, not a MoS₂ calculation."}{" "}
        Darker shading: occupied states below E_F in a zero-temperature picture.
      </figcaption>
    </figure>
  );
}

function TransportExplorer() {
  const [ratio, setRatio] = useState(1);
  const [goal, setGoal] = useState<"transport" | "switching">("transport");
  const scatteringSites =
    ratio <= 0.25 ? 0 : Math.min(8, Math.floor(ratio * 2));
  const route = Array.from({ length: scatteringSites + 2 }, (_, i) => [
    75 + (i * 340) / (scatteringSites + 1),
    i === 0 || i === scatteringSites + 1 ? 103 : 103 + (i % 2 ? 24 : -24),
  ]);
  return (
    <div className="panel transport-lab">
      <h3>Mobility, mean free path & transport</h3>
      <div className="two-column mt-5">
        <div>
          <svg
            viewBox="0 0 490 172"
            role="img"
            aria-label={
              "Illustrative carrier path at channel length divided by mean free path " +
              ratio.toFixed(2)
            }
          >
            <rect
              x="70"
              y="60"
              width="350"
              height="85"
              rx="12"
              fill="#eefbfe"
              stroke="#b9e8ee"
            />
            <rect
              x="38"
              y="60"
              width="32"
              height="85"
              rx="4"
              fill="#dde5ef"
              stroke="#536480"
            />
            <rect
              x="420"
              y="60"
              width="32"
              height="85"
              rx="4"
              fill="#dde5ef"
              stroke="#536480"
            />
            <path
              d="M74 37H416m-8-4 8 4-8 4m-326-8-8 4 8 4"
              stroke="var(--color-muted)"
              fill="none"
            />
            <text
              x="245"
              y="24"
              textAnchor="middle"
              fill="var(--color-ink)"
              fontSize="12"
            >
              Channel length L
            </text>
            <polyline
              points={route.map(([x, y]) => x + "," + y).join(" ")}
              fill="none"
              stroke="#076b7d"
              strokeWidth="3"
            />
            {route.slice(1, -1).map(([x, y], i) => (
              <g key={i}>
                <circle
                  cx={x}
                  cy={y - 13}
                  r="7"
                  fill="#c2ceda"
                  stroke="#536480"
                />
                <circle cx={x} cy={y} r="4" fill="#06b6d4" stroke="#076b7d" />
              </g>
            ))}
            <path
              d="M406 97l9 6-9 6"
              fill="none"
              stroke="#076b7d"
              strokeWidth="2"
            />
            <text
              x="54"
              y="166"
              textAnchor="middle"
              fill="var(--color-muted)"
              fontSize="11"
            >
              Source
            </text>
            <text
              x="436"
              y="166"
              textAnchor="middle"
              fill="var(--color-muted)"
              fontSize="11"
            >
              Drain
            </text>
          </svg>
          <p className="text-xs muted">
            Cyan path: carrier trajectory. Grey circles: scattering sites. This
            illustration is not a microscopic simulation or an event-count
            prediction.
          </p>
          <label htmlFor="transport-ratio" className="block mt-4">
            Channel length / mean free path, L/ℓ:{" "}
            <output className="text-cyan">{ratio.toFixed(2)}</output>
          </label>
          <input
            id="transport-ratio"
            type="range"
            min={0.1}
            max={4}
            step={0.05}
            value={ratio}
            onChange={(event) => setRatio(Number(event.target.value))}
          />
          <p className="text-sm" aria-live="polite">
            {transportDescription(ratio)}
          </p>
        </div>
        <div className="learning-explanation">
          <h4>Two different ideas</h4>
          <p className="mt-3 text-sm">
            <strong>Mobility μ</strong> describes the drift-velocity response to
            a weak electric field. High mobility can support fast transport;
            disorder, substrate and temperature matter.
          </p>
          <p className="mt-3 text-sm">
            <strong>Mean free path ℓ</strong> is a typical distance between
            momentum-scattering events. When L ≪ ℓ, transport can approach the
            ballistic limit.
          </p>
          <p className="mt-3 text-sm">
            The band slope gives a carrier velocity scale; it is not the same
            quantity as mobility. Neither a long mean free path nor high
            mobility opens a band gap.{" "}
            <ReferenceLink
              id="neto2009"
              from="/foundations#graphene-electronics"
            />
          </p>
        </div>
      </div>
      <details className="learning-question mt-6">
        <summary>
          Does fast transport guarantee a low-leakage digital OFF state?
        </summary>
        <div className="tabs mt-3" aria-label="Compare electronic goals">
          <button
            aria-pressed={goal === "transport"}
            onClick={() => setGoal("transport")}
          >
            Fast transport
          </button>
          <button
            aria-pressed={goal === "switching"}
            onClick={() => setGoal("switching")}
          >
            Digital OFF state
          </button>
        </div>
        <p className="mt-4 text-sm" aria-live="polite">
          {goal === "transport"
            ? "High mobility and low scattering help charge move through a biased channel. Graphene is interesting for analogue, radio-frequency and other electronic applications; transport performance depends on the actual device."
            : "Digital logic also needs unwanted current to become small. Ideal pristine monolayer graphene has no band gap, making a low-leakage conventional OFF state challenging. A finite gap helps reduce carrier availability, but it does not eliminate real-device leakage."}{" "}
          <ReferenceLink
            id="schwierz2010"
            from="/foundations#graphene-electronics"
          />
        </p>
        <Link href="/why-mos2#zero-gap" className="text-link">
          Explore the band-gap challenge →
        </Link>
      </details>
    </div>
  );
}

export function GrapheneElectronicsExplorer() {
  const [kind, setKind] = useState<DispersionKind>("graphene");
  const [fermiEnergy, setFermiEnergy] = useState(0);
  return (
    <div className="graphene-lab">
      <div className="panel dirac-lab">
        <h3>Explore bands near the Dirac point</h3>
        <p className="text-sm mt-2">
          Change the Fermi energy to explore carrier character. Compare touching
          bands with a finite-gap teaching schematic.
        </p>
        <div className="tabs mt-4" aria-label="Select dispersion">
          <button
            aria-pressed={kind === "graphene"}
            onClick={() => setKind("graphene")}
          >
            Graphene
          </button>
          <button
            aria-pressed={kind === "gapped"}
            onClick={() => setKind("gapped")}
          >
            Gapped semiconductor
          </button>
        </div>
        <div className="dirac-visuals mt-4">
          <BandDiagram
            material={kind === "graphene" ? "graphene" : "semiconductor"}
            fermiEnergy={fermiEnergy}
          />
          <ProjectedCone kind={kind} fermiEnergy={fermiEnergy} />
        </div>
        <div className="fermi-control">
          <label htmlFor="fermi-energy">
            Fermi energy E_F:{" "}
            <output>{fermiEnergy.toFixed(2)} relative units</output>
          </label>
          <input
            id="fermi-energy"
            type="range"
            min={-1.2}
            max={1.2}
            step={0.05}
            value={fermiEnergy}
            onChange={(event) => setFermiEnergy(Number(event.target.value))}
          />
          <div className="fermi-scale">
            <span>Hole-like</span>
            <span>Neutral / gap</span>
            <span>Electron-like</span>
          </div>
          <p className="mt-3 text-sm" aria-live="polite">
            <strong>{fermiCharacter(fermiEnergy, kind)}.</strong>{" "}
            {kind === "graphene"
              ? "Moving E_F changes which states are occupied; the graphene bands still touch and the gap stays zero."
              : "The comparison keeps a fixed illustrative gap. A Fermi level inside it reduces available states in this ideal band picture; real carrier populations and leakage also depend on temperature and device physics."}
          </p>
        </div>
        <details className="mt-4">
          <summary>What does the Dirac cone mean?</summary>
          <p className="text-sm">
            Near K or K′, E ≈ ±ℏv_F|q|, where q is the wave-vector displacement
            from that point. The two signs describe upper and lower branches.
            This low-energy linear approximation does not describe the full
            Brillouin zone. The comparison uses normalized curves, not a fitted
            MoS₂ band structure.{" "}
            <ReferenceLink
              id="neto2009"
              from="/foundations#graphene-electronics"
            />
          </p>
        </details>
      </div>
      <TransportExplorer />
    </div>
  );
}
