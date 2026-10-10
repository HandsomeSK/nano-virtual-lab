"use client";
import { useState } from "react";
import Link from "next/link";
import { BandDiagram } from "./band-diagram";
import { MaterialExplorer } from "./material-explorer";
import { ReferenceLink } from "@/components/reference-link";

function ScaleExplorer() {
  const [power, setPower] = useState(0);
  const size = 10 ** power;
  const examples = [
    { label: "MoS₂ layer", nm: 0.65 },
    { label: "DNA diameter", nm: 2 },
    { label: "Virus (example)", nm: 100 },
    { label: "Hair (example)", nm: 80000 },
  ];
  return (
    <div className="panel">
      <h3>Explore the size scale</h3>
      <p className="mt-2 text-sm">
        Move along a logarithmic scale: each major step is ten times larger.
      </p>
      <div className="tabs mt-4">
        {examples.map((item) => (
          <button
            key={item.label}
            aria-pressed={Math.abs(size - item.nm) < 0.01}
            onClick={() => setPower(Math.log10(item.nm))}
          >
            {item.label}
          </button>
        ))}
      </div>
      <label className="block mt-5" htmlFor="scale-range">
        Size:{" "}
        <output className="text-cyan">
          {size < 1000
            ? size.toFixed(2) + " nm"
            : (size / 1000).toFixed(2) + " µm"}
        </output>
      </label>
      <input
        id="scale-range"
        type="range"
        min={-1}
        max={5}
        step={0.01}
        value={power}
        onChange={(event) => setPower(Number(event.target.value))}
      />
      <div className="flex justify-between text-xs muted">
        <span>0.1 nm</span>
        <span>10 nm</span>
        <span>1 µm</span>
        <span>100 µm</span>
      </div>
      <div className="scale-objects">
        {examples.map((item) => (
          <div key={item.label}>
            <span
              className="scale-dot"
              style={{
                width: 12 + Math.log10(item.nm + 1) * 12,
                height: 12 + Math.log10(item.nm + 1) * 12,
              }}
            />
            <strong>{item.label}</strong>
            <span>
              ≈ {item.nm >= 1000 ? item.nm / 1000 + " µm" : item.nm + " nm"}
            </span>
          </div>
        ))}
      </div>
      <p className="text-xs muted mt-4">
        Examples are approximate; specimens vary. Diagram circles are
        illustrative, not linearly to scale.{" "}
        <ReferenceLink id="assets" from="/foundations#nanoscale" />
      </p>
    </div>
  );
}
function SurfaceExplorer() {
  const [diameter, setDiameter] = useState(10);
  return (
    <div className="panel two-column">
      <div>
        <h3>Explore surface-to-volume ratio</h3>
        <label htmlFor="particle-size" className="block mt-5">
          Particle diameter:{" "}
          <output className="text-cyan">{diameter} nm</output>
        </label>
        <input
          id="particle-size"
          type="range"
          min={1}
          max={100}
          value={diameter}
          onChange={(event) => setDiameter(Number(event.target.value))}
        />
        <p className="formula">S/V = 6/d = {(6 / diameter).toFixed(3)} nm⁻¹</p>
        <details>
          <summary>What does the formula mean?</summary>
          <p className="text-sm">
            For a sphere, S = πd² and V = πd³/6. The ratio has units of inverse
            length. This geometric model does not describe a 2D sheet.
          </p>
        </details>
      </div>
      <div className="sphere-area">
        <div
          className="sphere"
          style={{ width: 70 + diameter, height: 70 + diameter }}
        />
        <p className="text-xs muted">
          Smaller diameter → more surface per volume.
        </p>
      </div>
    </div>
  );
}
function QuantumExplorer() {
  const [width, setWidth] = useState(2);
  const [band, setBand] = useState<"mos2" | "metal" | "graphene">("mos2");
  return (
    <div className="two-column">
      <div className="panel">
        <h3>Confinement: an infinite well</h3>
        <label htmlFor="well-width" className="block mt-4">
          Well width:{" "}
          <output className="text-cyan">{width.toFixed(1)} nm</output>
        </label>
        <input
          id="well-width"
          type="range"
          min={1}
          max={4}
          step={0.1}
          value={width}
          onChange={(event) => setWidth(Number(event.target.value))}
        />
        <svg
          viewBox="0 0 360 190"
          role="img"
          aria-label="First three infinite-well energy levels in electronvolts"
        >
          <path
            d="M65 18v145h235V18"
            fill="none"
            stroke="#526886"
            strokeWidth="3"
          />
          {[1, 2, 3].map((n) => {
            const e = (0.376 * n * n) / (width * width);
            const y = 160 - (e / 3.5) * 130;
            return (
              <g key={n}>
                <path
                  d={"M70 " + y + "H293"}
                  stroke={n === 1 ? "#67e8f9" : "#b5a4ff"}
                />
                <text x="74" y={y - 6} fill="#edf3ff" fontSize="12">
                  {"n=" + n + " · " + e.toFixed(3) + " eV"}
                </text>
              </g>
            );
          })}
        </svg>
        <details>
          <summary>Eₙ = n²h² / (8mL²): variables</summary>
          <p className="text-sm">
            n: positive integer; h: Planck’s constant; m: free-electron mass; L:
            well width. Narrower wells increase energy spacing. This is an
            analogy, not a MoS₂ band-gap model.{" "}
            <ReferenceLink id="quantum" from="/foundations#quantum" />
          </p>
        </details>
      </div>
      <div className="panel" id="bands">
        <h3>Energy bands & the band gap</h3>
        <div className="tabs mt-4">
          {(
            [
              { id: "mos2", label: "Semiconductor" },
              { id: "metal", label: "Metal" },
              { id: "graphene", label: "Graphene" },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              aria-pressed={band === item.id}
              onClick={() => setBand(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <BandDiagram material={band} />
        <p className="text-sm mt-4">
          Electrons behave as waves. In a crystal, allowed states form bands; a
          forbidden energy interval is the band gap. Graphene is a semimetal,
          not a conventional gapped semiconductor.
        </p>
      </div>
    </div>
  );
}
const techniques = [
  {
    id: "Optical",
    group: "Light",
    measure: "Flake location and optical contrast.",
    limit:
      "Diffraction limits spatial resolution; contrast alone does not establish an electronic band gap.",
  },
  {
    id: "SEM",
    group: "Electrons",
    measure: "Surface morphology and device geometry.",
    limit:
      "Resolution and contrast depend on setup; generally not a direct band-gap or transport measurement.",
  },
  {
    id: "TEM",
    group: "Electrons",
    measure: "Internal / atomic structure and diffraction.",
    limit:
      "Requires electron-transparent preparation; beam damage can affect thin materials.",
  },
  {
    id: "AFM",
    group: "Probe",
    measure: "Topography, step height and surface roughness.",
    limit:
      "Apparent monolayer height depends on substrate, adsorbates and measurement conditions.",
  },
  {
    id: "STM",
    group: "Probe",
    measure: "Local tunnelling response and atomic-scale surfaces.",
    limit:
      "Requires a conductive path; spectroscopy probes local electronic states, not full-device transport.",
  },
];
function CharacterizationExplorer() {
  const [group, setGroup] = useState("All");
  const [selected, setSelected] = useState("AFM");
  const technique = techniques.find((item) => item.id === selected)!;
  const visible = techniques.filter(
    (item) => group === "All" || item.group === group,
  );
  return (
    <div className="panel">
      <h3>Choose a measurement</h3>
      <div className="tabs mt-4">
        {["All", "Light", "Electrons", "Probe"].map((item) => (
          <button
            key={item}
            aria-pressed={group === item}
            onClick={() => {
              setGroup(item);
              setSelected(
                techniques.find(
                  (entry) => item === "All" || entry.group === item,
                )!.id,
              );
            }}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="two-column mt-5">
        <div className="tabs">
          {visible.map((item) => (
            <button
              key={item.id}
              aria-pressed={selected === item.id}
              onClick={() => setSelected(item.id)}
            >
              {item.id}
            </button>
          ))}
        </div>
        <div aria-live="polite">
          <h3>{technique.id}</h3>
          <p className="mt-3 text-sm">
            <strong className="text-cyan">Measures:</strong> {technique.measure}
          </p>
          <p className="mt-3 text-sm">
            <strong className="text-violet">Limit:</strong> {technique.limit}
          </p>
        </div>
      </div>
      <svg
        viewBox="0 0 420 140"
        className="mt-5"
        role="img"
        aria-label={technique.id + " measurement target: " + technique.measure}
      >
        <path d="M35 95H385V120H35Z" fill="#243b5b" stroke="#526886" />
        {selected === "TEM" ? (
          <g>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <g key={i}>
                <circle cx={75 + i * 38} cy="65" r="5" fill="#67e8f9" />
                <circle cx={75 + i * 38} cy="80" r="5" fill="#b5a4ff" />
              </g>
            ))}
          </g>
        ) : selected === "AFM" || selected === "STM" ? (
          <g>
            <path d="M70 95V82H190V72H310V95" fill="#316777" stroke="#67e8f9" />
            <path d="M175 20H235L205 57Z" fill="#b5a4ff" />
            <path d="M205 60V70" stroke="#e4c879" strokeDasharray="3 2" />
          </g>
        ) : (
          <g>
            <path d="M105 85H315V95H105Z" fill="#316777" stroke="#67e8f9" />
            <path
              d="M185 15 205 75 225 15"
              fill="none"
              stroke={selected === "SEM" ? "#b5a4ff" : "#e4c879"}
              strokeWidth="2"
            />
          </g>
        )}
        <text x="210" y="136" fill="#aebfd5" textAnchor="middle" fontSize="11">
          {selected === "TEM"
            ? "Atomic structure / diffraction"
            : selected === "AFM"
              ? "Tip scans surface height"
              : selected === "STM"
                ? "Tip probes local tunnelling response"
                : selected === "SEM"
                  ? "Electron beam: surface morphology"
                  : "Light: flake contrast / location"}{" "}
          · schematic
        </text>
      </svg>
      <p className="mt-5 text-sm muted">
        Use photoluminescence / absorption spectroscopy for optical transitions
        and electrical I–V measurements for device transport. No single image
        supplies every material property.
      </p>
    </div>
  );
}
const parts = [
  { id: "Source", text: "Injects carriers into the channel." },
  {
    id: "Channel",
    text: "The semiconducting path connecting source and drain.",
  },
  { id: "Drain", text: "Collects carriers; drain bias drives current." },
  { id: "Gate", text: "Controls channel charge electrostatically." },
  { id: "Dielectric", text: "Insulates the gate from the channel." },
];
function TransistorExplorer() {
  const [on, setOn] = useState(false);
  const [part, setPart] = useState("Gate");
  return (
    <div className="panel">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h3>A field controls the channel</h3>
        <div className="tabs">
          <button aria-pressed={!on} onClick={() => setOn(false)}>
            OFF
          </button>
          <button aria-pressed={on} onClick={() => setOn(true)}>
            ON
          </button>
        </div>
      </div>
      <div className={"fet-demo " + (on ? "is-on" : "")}>
        <button onClick={() => setPart("Gate")} className="fet-gate">
          Gate
        </button>
        <button
          onClick={() => setPart("Dielectric")}
          className="fet-dielectric"
        >
          Dielectric
        </button>
        <div className="fet-terminal-row">
          {["Source", "Channel", "Drain"].map((name) => (
            <button
              key={name}
              onClick={() => setPart(name)}
              aria-pressed={part === name}
            >
              {name === "Channel" ? "MoS₂ channel" : name}
            </button>
          ))}
        </div>
        <p>
          {on
            ? "ON · channel charge is increased in this n-channel example"
            : "OFF · channel charge is reduced (idealized)"}
        </p>
      </div>
      <p aria-live="polite" className="text-sm">
        <strong className="text-cyan">{part}:</strong>{" "}
        {parts.find((item) => item.id === part)!.text}
      </p>
      <div className="actions">
        <Link href="/why-mos2" className="text-link">
          Explore MoS₂ →
        </Link>
        <Link href="/device" className="button-secondary">
          Explore Device
        </Link>
      </div>
    </div>
  );
}
export function FoundationWidget({ id }: { id: string }) {
  switch (id) {
    case "nanoscale":
      return <ScaleExplorer />;
    case "surfaces":
      return <SurfaceExplorer />;
    case "quantum":
      return <QuantumExplorer />;
    case "materials":
      return <MaterialExplorer from="/foundations#materials" />;
    case "characterization":
      return <CharacterizationExplorer />;
    default:
      return <TransistorExplorer />;
  }
}
