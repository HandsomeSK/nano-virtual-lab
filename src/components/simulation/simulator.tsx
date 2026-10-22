"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import {
  currentA,
  defaultParameters,
  metrics,
  modelConstants,
  parameterControls,
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
import {
  comparisonHref,
  simulatorParametersHref,
  type ComparisonJourney,
} from "@/lib/simulation/journey";

export function Simulator({
  initial,
  journey = null,
}: {
  initial: Parameters;
  journey?: ComparisonJourney | null;
}) {
  const [parameters, setParameters] = useState(initial);
  const [mode, setMode] = useState<CurveMode>(journey?.mode ?? "transfer");
  const [name, setName] = useState("My configuration");
  const nameInput = useRef<HTMLInputElement>(null);
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
      window.history.state,
      "",
      simulatorParametersHref(next, window.location.search, window.location.hash),
    );
  }
  function save() {
    setSaveError("");
    setMessage("");
    if (!name.trim()) {
      setSaveError("Enter a configuration name.");
      nameInput.current?.focus();
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
      {journey ? (
        <p className="model-note text-sm mb-6" data-comparison-edit>
          Editing Scenario {journey.slot.toUpperCase()}:{" "}
          {journey[journey.slot].name}.{" "}
          Return to Comparison to apply these parameters; the other scenario and
          your saved configurations stay unchanged.{" "}
          <Link
            href={comparisonHref(initial, journey, false)}
            className="text-link"
          >
            Cancel changes
          </Link>
        </p>
      ) : null}
      <div className="instrument-console">
        <section className="instrument-stage" aria-label="Calculated response">
          <div className="chart-heading instrument-heading">
            <div>
              <h2>I–V Characteristics</h2>
              <p className="text-sm mt-2">
                Calculated curves. No experimental data.
              </p>
            </div>
            <div className="tabs" role="group" aria-label="Curve type">
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
          <p className="text-sm mt-3" aria-live="polite" data-sweep-explanation>
            {mode === "transfer"
              ? `Transfer: sweep gate voltage from 0 to 3 V with external drain voltage held at ${parameters.drainVoltage.toFixed(2)} V.`
              : `Output: sweep drain voltage from 0 to 2 V with external gate voltage held at ${parameters.gateVoltage.toFixed(2)} V.`}
            {" "}
            The marker shows your selected external bias; the readouts refer to
            that point.
          </p>
          <IVChart
            mode={mode}
            operatingPoint={parameters}
            series={[
              {
                name: "Current configuration",
                parameters,
                color: "var(--plot-primary)",
              },
            ]}
          />
          <div className="metrics-grid instrument-readouts" aria-live="polite">
            <div>
              <span>Selected-point current</span>
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
          <details className="instrument-state mt-4">
            <summary>
              Device State Visualization ·{" "}
              {currentA(parameters) > 0 ? "Current flowing" : "Zero current"}
            </summary>
            <div className="device-state">
              <DeviceSchematic on={currentA(parameters) > 0} />
              <p className="text-sm">
                Conceptual current-flow indication, not a charge-density
                calculation. Zero drain bias gives no net current even when
                the gate induces channel charge. A real OFF state can still
                have leakage.
              </p>
            </div>
          </details>
          <div className="actions instrument-links">
            <Link
              href={comparisonHref(parameters, journey)}
              className="button-primary"
            >
              {journey ? "Return to Comparison" : "Compare Results"}
            </Link>
            <Link href="/challenges#contacts" className="text-link">
              Explore contact limitations
            </Link>
            <Link href="#model-assumptions" className="text-link">
              Model assumptions & units
            </Link>
          </div>
        </section>
        <section
          className="controls-panel instrument-controls"
          aria-label="Parameter Controls"
        >
          <h2>Parameter Controls</h2>
          <p className="text-sm mt-2">
            Adjust an assumed device and bias point. Curves and readouts update
            immediately.
          </p>
          <fieldset className="parameter-group">
            <legend>Bias</legend>
            {parameterControls.slice(0, 2).map((control) => (
              <ParameterControl
                key={control.key}
                control={control}
                value={parameters[control.key]}
                onChange={change}
              />
            ))}
          </fieldset>
          <fieldset className="parameter-group">
            <legend>Device assumptions</legend>
            {parameterControls.slice(2).map((control) => (
              <ParameterControl
                key={control.key}
                control={control}
                value={parameters[control.key]}
                onChange={change}
              />
            ))}
          </fieldset>
          <button
            className="button-secondary reset-parameters"
            onClick={() => {
              setParameters({ ...defaultParameters });
              setAdjustment(null);
              setMessage("");
              window.history.replaceState(
                window.history.state,
                "",
                simulatorParametersHref(
                  defaultParameters,
                  window.location.search,
                  window.location.hash,
                ),
              );
            }}
          >
            {journey ? "Reset edited scenario parameters" : "Reset Parameters"}
          </button>
        </section>
      </div>
      <section
        className="configuration-bar"
        aria-label="Save this configuration"
      >
        <div className="configuration-field">
          <label htmlFor="config-name">Configuration name</label>
          <input
            ref={nameInput}
            id="config-name"
            name="configuration-name"
            type="text"
            autoComplete="off"
            maxLength={80}
            value={name}
            onChange={(event) => setName(event.target.value)}
            aria-invalid={
              saveError === "Enter a configuration name." ? true : undefined
            }
            aria-describedby={saveError ? "configuration-error" : undefined}
          />
        </div>
        <button className="button-primary" onClick={save}>
          Save Configuration
        </button>
        <p className="configuration-note text-sm">
          Save a named copy on this device. Comparing also works without saving.
        </p>
        <div className="configuration-feedback">
          <p aria-live="polite" className="success-text">
            {message}
          </p>
          <p
            id="configuration-error"
            role={saveError ? "alert" : undefined}
            className="error-text"
          >
            {saveError}
          </p>
          {issue ? <p className="error-text">{issue}</p> : null}
        </div>
      </section>
      <section
        className="section result-insights instrument-analysis"
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
      <div className="two-column section instrument-model-notes">
        <div>
          <details>
            <summary>Model & Equations</summary>
            <p className="formula" id="model">
              β = μ Cg W/L
            </p>
            <p className="formula">I_D = β[(VGS,i − VT)VDS,i − VDS,i²/2]</p>
            <p className="text-sm">
              The subscript i denotes the internal channel voltage after the
              contact drops. For positive overdrive, the linear region has
              0 ≤ VDS,i &lt; VGS,i − VT; saturation has
              VDS,i ≥ VGS,i − VT and I_D = β(VGS,i − VT)²/2. At or below
              threshold the model assumes I_D = 0.{" "}
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
              <p className="text-sm mt-3">
                β has units A/V². The transconductance readout is the
                derivative of external drain current with respect to external
                gate voltage at fixed external drain bias. It is estimated
                using a ±1 mV finite difference, one-sided at the gate-control
                bounds. The model computes drain-supply electrical power as
                P = I_D VDS,external and includes both channel and contact
                dissipation; it does not calculate temperature.
              </p>
            </details>
          </details>
        </div>
        <div>
          <details>
            <summary>Assumptions & Limitations</summary>
            <p className="text-sm">
              Long-channel, quasi-static n-channel educational model with
              constant mobility and ohmic series contacts. No quantum or
              ballistic transport, Schottky-barrier injection, trap dynamics,
              subthreshold or short-channel leakage, velocity saturation,
              quantum capacitance or self-heating. No channel-length
              modulation is included. These curves use assumed parameters,
              without calibration to an experimental MoS₂ device.
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
        <h2>Understand the model</h2>
        <div className="actions">
          <Link href="/foundations#bands" className="text-link">
            Energy Bands →
          </Link>
          <Link href="/foundations#transistors" className="text-link">
            Transistor Basics →
          </Link>
        </div>
      </section>
    </>
  );
}
