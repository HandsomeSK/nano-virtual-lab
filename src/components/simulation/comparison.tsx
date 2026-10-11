"use client";
import Link from "next/link";
import { useState } from "react";
import {
  curve,
  defaultParameters,
  metrics,
  parametersQuery,
  parameterControls,
  type Parameters,
  type CurveMode,
} from "@/lib/simulation/model";
import {
  useConfigurations,
  writeConfigurations,
} from "@/lib/simulation/use-configurations";
import { IVChart } from "./iv-chart";
import { SectionHeading } from "@/components/page-shell";
import { parameterInsight } from "@/lib/simulation/insights";
type Scenario = { id: string; name: string; parameters: Parameters };
export function Comparison({
  incoming,
  initialA,
  initialB,
}: {
  incoming: Parameters | null;
  initialA: string;
  initialB: string;
}) {
  const { configurations, issue } = useConfigurations();
  const [a, setA] = useState(initialA),
    [b, setB] = useState(initialB);
  const [mode, setMode] = useState<CurveMode>("transfer");
  const [layout, setLayout] = useState("overlay");
  const [error, setError] = useState("");
  const scenarios: Scenario[] = [
    {
      id: "example-a",
      name: "Example A · baseline assumptions",
      parameters: defaultParameters,
    },
    {
      id: "example-b",
      name: "Example B · 50 kΩ total contacts",
      parameters: { ...defaultParameters, contactResistance: 50 },
    },
    ...(incoming
      ? [
          {
            id: "incoming",
            name: "Current simulator configuration",
            parameters: incoming,
          },
        ]
      : []),
    ...configurations,
  ];
  const first =
    scenarios.find((item) => item.id === a) ||
    scenarios.find((item) => item.id === "incoming") ||
    scenarios[0];
  const second = scenarios.find((item) => item.id === b) || scenarios[1];
  const mA = metrics(first.parameters),
    mB = metrics(second.parameters);
  const differingControls = parameterControls.filter(
    (item) => first.parameters[item.key] !== second.parameters[item.key],
  );
  const maximumCurrent = Math.max(
    ...curve(first.parameters, mode).map((point) => point.y),
    ...curve(second.parameters, mode).map((point) => point.y),
  );
  function select(slot: "a" | "b", id: string) {
    if (slot === "a") setA(id);
    else setB(id);
    const url = new URL(window.location.href);
    url.searchParams.set(slot, id);
    window.history.replaceState(null, "", url.pathname + url.search + url.hash);
  }
  function remove(id: string) {
    try {
      writeConfigurations(configurations.filter((item) => item.id !== id));
      setError("");
    } catch {
      setError("Browser storage could not be updated.");
    }
  }
  return (
    <>
      <section className="section" id="saved">
        <SectionHeading
          title="Saved Simulations"
          description="Configurations stay in this browser. Simulator URLs also transfer a current configuration without storage."
        />
        {issue ? <p className="error-text mb-4">{issue}</p> : null}
        {configurations.length ? (
          <div className="saved-list">
            {configurations.map((item) => (
              <div className="panel" key={item.id}>
                <h3>{item.name}</h3>
                <div className="actions">
                  <button
                    className="button-secondary"
                    onClick={() => select("a", item.id)}
                  >
                    Use as A
                  </button>
                  <button
                    className="button-secondary"
                    onClick={() => select("b", item.id)}
                  >
                    Use as B
                  </button>
                  <Link
                    className="text-link"
                    href={"/simulator?" + parametersQuery(item.parameters)}
                  >
                    Edit in Simulator →
                  </Link>
                  <button
                    className="text-sm text-violet p-2"
                    onClick={() => remove(item.id)}
                    aria-label={"Remove " + item.name}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            No saved configurations yet. Try the two labelled examples below, or{" "}
            <Link className="text-link" href="/simulator">
              save a configuration in Simulator →
            </Link>
          </div>
        )}
        <p role={error ? "alert" : undefined} className="error-text">
          {error}
        </p>
      </section>
      <section className="section">
        <SectionHeading
          title="Simulator Results Comparison"
          description="Compare two parameter sets in the same MoS₂-context teaching model. The qualitative material properties above do not set the parameters of these curves."
        />
        <div className="two-column">
          <label className="block text-sm">
            Scenario A
            <select
              aria-label="Scenario A"
              className="block w-full mt-2"
              value={first.id}
              onChange={(event) => select("a", event.target.value)}
            >
              {scenarios.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm">
            Scenario B
            <select
              aria-label="Scenario B"
              className="block w-full mt-2"
              value={second.id}
              onChange={(event) => select("b", event.target.value)}
            >
              {scenarios.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        {first.id === second.id ? (
          <p className="text-violet text-sm mt-3">
            Both slots show the same configuration. Select a different scenario
            to explore a difference.
          </p>
        ) : null}
        <div className="chart-heading mt-6">
          <div className="tabs" aria-label="Comparison curve type">
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
          <div className="tabs" aria-label="Comparison layout">
            <button
              aria-pressed={layout === "overlay"}
              onClick={() => setLayout("overlay")}
            >
              Overlay
            </button>
            <button
              aria-pressed={layout === "side"}
              onClick={() => setLayout("side")}
            >
              Side by side
            </button>
          </div>
        </div>
        {layout === "overlay" ? (
          <div className="panel mt-5">
            <IVChart
              mode={mode}
              series={[
                {
                  name: "A: " + first.name,
                  parameters: first.parameters,
                  color: "#4f46e5",
                },
                {
                  name: "B: " + second.name,
                  parameters: second.parameters,
                  color: "#7652c8",
                },
              ]}
            />
          </div>
        ) : (
          <div className="two-column mt-5">
            <div className="panel">
              <IVChart
                mode={mode}
                maximumCurrent={maximumCurrent}
                series={[
                  {
                    name: "A: " + first.name,
                    parameters: first.parameters,
                    color: "#4f46e5",
                  },
                ]}
              />
            </div>
            <div className="panel">
              <IVChart
                mode={mode}
                maximumCurrent={maximumCurrent}
                series={[
                  {
                    name: "B: " + second.name,
                    parameters: second.parameters,
                    color: "#7652c8",
                  },
                ]}
              />
            </div>
          </div>
        )}
        <div className="horizontal-scroll mt-6">
          <table>
            <caption className="sr-only">
              Parameter and bias-point comparison
            </caption>
            <thead>
              <tr>
                <th>Assumption / metric</th>
                <th>Scenario A</th>
                <th>Scenario B</th>
              </tr>
            </thead>
            <tbody>
              {parameterControls.map((item) => (
                <tr key={item.key}>
                  <th>
                    {item.label} ({item.unit})
                  </th>
                  <td>{first.parameters[item.key]}</td>
                  <td>{second.parameters[item.key]}</td>
                </tr>
              ))}
              <tr>
                <th>Bias-point current (µA)</th>
                <td>{mA.currentUa.toFixed(3)}</td>
                <td>{mB.currentUa.toFixed(3)}</td>
              </tr>
              <tr>
                <th>Region</th>
                <td>{mA.region}</td>
                <td>{mB.region}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="actions">
          <Link
            href={"/simulator?" + parametersQuery(first.parameters)}
            className="button-secondary"
          >
            Modify Scenario A
          </Link>
          <Link
            href={"/simulator?" + parametersQuery(second.parameters)}
            className="button-secondary"
          >
            Modify Scenario B
          </Link>
        </div>
      </section>
      <section className="section">
        <SectionHeading title="Key Observations" />
        <p aria-live="polite" data-comparison-observation>
          {differingControls.length === 0
            ? `Both scenarios use the same parameters and give ${mA.currentUa.toFixed(3)} µA at the selected bias point.`
            : differingControls.length === 1
              ? `Relative to Scenario B, Scenario A changes one assumption: ${parameterInsight(second.parameters, first.parameters, differingControls[0].key)}`
              : `At their selected bias points, A gives ${mA.currentUa.toFixed(3)} µA and B gives ${mB.currentUa.toFixed(3)} µA. The scenarios differ in ${differingControls.map((item) => item.label.toLowerCase()).join(", ")}; their response combines these changes.`}
        </p>
        <p className="text-sm mt-3">
          A finite gap, strong carrier transport and a mature fabrication
          process answer different materials questions. These assumed device
          curves cannot rank graphene, MoS₂ and silicon. Real comparisons also
          need matched architecture and measurement conditions.
        </p>
        <Link href="/challenges" className="text-link">
          Explore what this model omits →
        </Link>
      </section>
    </>
  );
}
