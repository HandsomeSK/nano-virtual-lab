"use client";
import Link from "next/link";
import { useState } from "react";
import {
  currentA,
  defaultParameters,
  metrics,
  modelConstants,
  parameterControls,
  parametersQuery,
  type Parameters,
  type CurveMode,
} from "@/lib/simulation/model";
import {
  useConfigurations,
  writeConfigurations,
} from "@/lib/simulation/use-configurations";
import { IVChart } from "./iv-chart";
import { ParameterControl } from "./parameter-control";
import { DeviceSchematic } from "@/components/device-schematic";
import { ReferenceLink } from "@/components/reference-link";
import { parameterInsight } from "@/lib/simulation/insights";

export function Simulator({ initial }: { initial: Parameters }) {
  const [parameters, setParameters] = useState(initial);
  const [mode, setMode] = useState<CurveMode>("transfer");
  const [name, setName] = useState("My configuration");
  const [message, setMessage] = useState("");
  const [saveError, setSaveError] = useState("");
  const [adjustment, setAdjustment] = useState<{
    key: keyof Parameters;
    before: Parameters;
  } | null>(null);
  const { configurations, issue } = useConfigurations();
  const result = metrics(parameters);
  const withoutContacts = metrics({ ...parameters, contactResistance: 0 });
  function change(key: keyof Parameters, value: number) {
    if (parameters[key] === value) return;
    const next = { ...parameters, [key]: value };
    setAdjustment((previous) =>
      previous?.key === key ? previous : { key, before: parameters },
    );
    setParameters(next);
    setMessage("");
    window.history.replaceState(
      null,
      "",
      "/simulator?" + parametersQuery(next) + window.location.hash,
    );
  }
  function save() {
    setSaveError("");
    setMessage("");
    if (!name.trim()) {
      setSaveError("Enter a configuration name.");
      return;
    }
    if (configurations.length >= 20) {
      setSaveError(
        "You have 20 saved configurations. Remove one in Comparison before saving another.",
      );
      return;
    }
    try {
      writeConfigurations([
        ...configurations,
        { id: crypto.randomUUID(), name: name.trim().slice(0, 80), parameters },
      ]);
      setMessage(
        "Configuration saved in this browser. Open Comparison to use it.",
      );
    } catch {
      setSaveError(
        "Could not save to browser storage. Use Compare Results to transfer this configuration by URL.",
      );
    }
  }
  return (
    <>
      <div className="simulator-layout">
        <section
          className="panel controls-panel"
          aria-label="Parameter Controls"
        >
          <h2>Parameter Controls</h2>
          <p className="text-sm mt-2">
            Adjust an assumed device and bias point.
          </p>
          {parameterControls.map((control) => (
            <ParameterControl
              key={control.key}
              control={control}
              value={parameters[control.key]}
              onChange={change}
            />
          ))}
          <label htmlFor="config-name" className="block text-sm mt-5">
            Configuration name
          </label>
          <input
            id="config-name"
            type="text"
            maxLength={80}
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full mt-2"
          />
          <div className="actions">
            <button
              className="button-secondary"
              onClick={() => {
                setParameters({ ...defaultParameters });
                setAdjustment(null);
                setMessage("");
                window.history.replaceState(
                  null,
                  "",
                  "/simulator?" + parametersQuery(defaultParameters),
                );
              }}
            >
              Reset Parameters
            </button>
            <button className="button-primary" onClick={save}>
              Save Configuration
            </button>
          </div>
          <p aria-live="polite" className="success-text mt-3">
            {message}
          </p>
          <p role={saveError ? "alert" : undefined} className="error-text">
            {saveError}
          </p>
          {issue ? <p className="error-text mt-3">{issue}</p> : null}
        </section>
        <section className="panel">
          <div className="chart-heading">
            <div>
              <h2>I–V Characteristics</h2>
              <p className="text-sm mt-2">
                Calculated curves. No experimental data.
              </p>
            </div>
            <div className="tabs" aria-label="Curve type">
              <button
                aria-pressed={mode === "transfer"}
                onClick={() => setMode("transfer")}
              >
                Transfer
              </button>
              <button
                aria-pressed={mode === "output"}
                onClick={() => setMode("output")}
              >
                Output
              </button>
            </div>
          </div>
          <IVChart
            mode={mode}
            series={[
              { name: "Current configuration", parameters, color: "#4f46e5" },
            ]}
          />
          <div className="metrics-grid" aria-live="polite">
            <div>
              <span>Drain current</span>
              <strong data-metric="current">
                {result.currentUa.toFixed(3)} <small>µA</small>
              </strong>
            </div>
            <div>
              <span>Transconductance</span>
              <strong>
                {result.gmUs.toFixed(3)} <small>µS</small>
              </strong>
            </div>
            <div>
              <span>Operating region</span>
              <strong>{result.region}</strong>
            </div>
          </div>
          <details className="mt-4">
            <summary>
              Device State Visualization ·{" "}
              {currentA(parameters) > 0 ? "ON" : "OFF"}
            </summary>
            <div className="device-state">
              <DeviceSchematic on={currentA(parameters) > 0} />
              <p className="text-sm">
                Bias-point indication in the idealized model. A real OFF state
                may still have leakage.
              </p>
            </div>
          </details>
          <div className="actions">
            <Link
              href={
                "/comparison?" +
                parametersQuery(parameters) +
                "&source=simulator"
              }
              className="button-primary"
            >
              Compare Results →
            </Link>
            <Link href="/challenges#contacts" className="text-link">
              Explore contact limitations →
            </Link>
          </div>
        </section>
      </div>
      <section
        className="section panel result-insights"
        id="understanding-results"
      >
        <h2>Understanding the Results</h2>
        <p className="mt-3" aria-live="polite" data-result-explanation>
          {adjustment
            ? parameterInsight(adjustment.before, parameters, adjustment.key)
            : "Change one parameter to compare its calculated current with the value before that adjustment. All other assumptions stay fixed during that comparison."}
        </p>
        <div className="two-column mt-5">
          <div>
            <h3>Your selected bias point</h3>
            <p className="text-sm mt-2" data-bias-explanation>
              {parameters.gateVoltage <= modelConstants.thresholdV
                ? "The external gate bias is at or below the model threshold, so the calculation gives zero channel current. Increasing mobility alone cannot turn this bias point ON."
                : parameters.drainVoltage === 0
                  ? "There is no source-to-drain bias, so calculated drain current is zero even though the gate can induce channel charge."
                  : `The model is in the ${result.region.toLowerCase()} region. Its internal gate-to-source voltage is ${result.internalVgs.toFixed(3)} V and its internal drain-to-source voltage is ${result.internalVds.toFixed(3)} V.`}
            </p>
          </div>
          <div>
            <h3>What the contacts change</h3>
            <p className="text-sm mt-2" data-contact-explanation>
              {result.currentUa === 0
                ? "At this zero-current bias point, the model has no contact voltage drop. Raising contact resistance therefore leaves the calculated current at zero."
                : parameters.contactResistance === 0
                  ? "You selected ideal zero-resistance contacts. The internal and external voltages are equal; add contact resistance to explore their difference."
                  : `At the same external bias and channel assumptions, ideal zero-resistance contacts would give ${withoutContacts.currentUa.toFixed(3)} µA. Your selected contacts give ${result.currentUa.toFixed(3)} µA, because part of the applied voltage drops across the contacts.`}
            </p>
          </div>
        </div>
        <p className="text-sm mt-4">
          These explanations describe the selected bias point. The graph sweeps{" "}
          {mode === "transfer" ? "gate" : "drain"} voltage to show a wider
          response.
        </p>
      </section>
      <div className="two-column section">
        <div className="panel">
          <details>
            <summary>Model & Equations</summary>
            <p className="formula" id="model">
              β = μ Cg W/L
            </p>
            <p className="formula">I = β[(Vgs − Vt)Vds − Vds²/2]</p>
            <p className="text-sm">
              Linear region: 0 ≤ Vds &lt; Vgs − Vt. In saturation: I = β(Vgs −
              Vt)²/2. In cutoff: I = 0.{" "}
              <ReferenceLink id="mosfet" from="/simulator#model" />
            </p>
            <details>
              <summary>Units, constants & contact correction</summary>
              <p className="text-sm">
                W = 1 µm; Cg = 0.01 F/m²; Vt = 0.7 V. Mobility converts from
                cm²/Vs to m²/Vs; length from nm to m. These are illustrative
                assumptions. Total Rc is split equally: internal Vgs = Vg − I
                Rc/2; internal Vds = Vd − I Rc. A bisection solve makes I
                consistent with these internal voltages.
              </p>
            </details>
          </details>
        </div>
        <div className="panel">
          <details>
            <summary>Assumptions & Limitations</summary>
            <p className="text-sm">
              Long-channel, quasi-static n-channel teaching model with constant
              mobility and ohmic series contacts. No Schottky barriers,
              subthreshold transport, tunnelling, velocity saturation, quantum
              capacitance, self-heating or traps. It does not predict
              experimental MoS₂ performance.
            </p>
            <p className="text-sm mt-3">
              No ON/OFF ratio is reported: zero model cutoff current is an
              assumption, not a real leakage prediction.{" "}
              <ReferenceLink id="assets" from="/simulator" />
            </p>
          </details>
        </div>
      </div>
      <section className="section">
        <h2>Related Knowledge</h2>
        <div className="actions">
          <Link href="/foundations#bands" className="text-link">
            Energy Bands →
          </Link>
          <Link href="/foundations#transistors" className="text-link">
            Transistor Basics →
          </Link>
          <Link href="/comparison" className="text-link">
            Material Comparison →
          </Link>
        </div>
      </section>
    </>
  );
}
