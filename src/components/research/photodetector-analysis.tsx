"use client";

import { useState } from "react";
import {
  analyzePhotodetector,
  currentUnitScales,
  opticalPowerUnitScales,
  type CurrentUnit,
  type OpticalPowerUnit,
  type PhotodetectorInputs,
} from "@/lib/science/photodetector-analysis";
import styles from "./photodetector-analysis.module.css";

function number(value: number) {
  const magnitude = Math.abs(value);
  return new Intl.NumberFormat("en-US", {
    maximumSignificantDigits: 4,
    notation: magnitude !== 0 && (magnitude < 0.0001 || magnitude >= 1e6) ? "scientific" : "standard",
  }).format(value);
}

function current(value: number) {
  const magnitude = Math.abs(value);
  const [scale, unit]: [number, string] = magnitude === 0 || magnitude >= 1
    ? [1, "A"]
    : magnitude >= 1e-3 ? [1e-3, "mA"]
      : magnitude >= 1e-6 ? [1e-6, "µA"] : [1e-9, "nA"];
  return number(value / scale) + " " + unit;
}

export function PhotodetectorAnalysis() {
  const [input, setInput] = useState<PhotodetectorInputs>({
    illuminatedCurrent: "1.5",
    illuminatedUnit: "µA",
    darkCurrent: "0.5",
    darkUnit: "µA",
    incidentPower: "10",
    powerUnit: "µW",
  });
  const result = analyzePhotodetector(input);
  const errors = result.ok ? {} : result.errors;
  return (
    <section id="photodetector-analysis" className={styles.analysis} aria-labelledby="photodetector-analysis-title">
      <h4 id="photodetector-analysis-title">Photodetector analysis</h4>
      <p className={styles.intro} id="photodetector-example">
        <strong>Illustrative parameters → calculated results.</strong> The initial
        values below are teaching assumptions, not measurements from a paper.
        Change the currents and optical power to calculate I<sub>ph</sub> =
        I<sub>light</sub> − I<sub>dark</sub> and R = I<sub>ph</sub> / P<sub>incident</sub>.
      </p>
      <p className={styles.intro} id="photodetector-convention">
        Use the same bias and a fixed positive-current direction for both
        current readings. Keep their signs; no absolute values are taken.
        Optical power is positive and refers to light incident on the defined
        active area, not the absorbed power or necessarily the whole beam.
      </p>
      <div className={styles.controls}>
        <div className={styles.measurement}>
          <label htmlFor="photodetector-illuminated">Illuminated current, Ilight</label>
          <div className={styles.inputs}>
            <input
              id="photodetector-illuminated"
              name="photodetector-illuminated-current"
              type="number"
              step="any"
              autoComplete="off"
              value={input.illuminatedCurrent}
              onChange={(event) => setInput({ ...input, illuminatedCurrent: event.target.value })}
              aria-invalid={Boolean(errors.illuminatedCurrent)}
              aria-describedby={"photodetector-convention" + (errors.illuminatedCurrent ? " photodetector-illuminated-error" : "")}
            />
            <select
              aria-label="Illuminated current unit"
              name="photodetector-illuminated-unit"
              value={input.illuminatedUnit}
              onChange={(event) => setInput({ ...input, illuminatedUnit: event.target.value as CurrentUnit })}
            >
              {Object.keys(currentUnitScales).map((unit) => <option key={unit}>{unit}</option>)}
            </select>
          </div>
          {errors.illuminatedCurrent ? <p className={styles.error} id="photodetector-illuminated-error">{errors.illuminatedCurrent}</p> : null}
        </div>
        <div className={styles.measurement}>
          <label htmlFor="photodetector-dark">Dark current, Idark</label>
          <div className={styles.inputs}>
            <input
              id="photodetector-dark"
              name="photodetector-dark-current"
              type="number"
              step="any"
              autoComplete="off"
              value={input.darkCurrent}
              onChange={(event) => setInput({ ...input, darkCurrent: event.target.value })}
              aria-invalid={Boolean(errors.darkCurrent)}
              aria-describedby={"photodetector-convention" + (errors.darkCurrent ? " photodetector-dark-error" : "")}
            />
            <select
              aria-label="Dark current unit"
              name="photodetector-dark-unit"
              value={input.darkUnit}
              onChange={(event) => setInput({ ...input, darkUnit: event.target.value as CurrentUnit })}
            >
              {Object.keys(currentUnitScales).map((unit) => <option key={unit}>{unit}</option>)}
            </select>
          </div>
          {errors.darkCurrent ? <p className={styles.error} id="photodetector-dark-error">{errors.darkCurrent}</p> : null}
        </div>
        <div className={styles.measurement}>
          <label htmlFor="photodetector-power">Incident optical power</label>
          <div className={styles.inputs}>
            <input
              id="photodetector-power"
              name="photodetector-incident-power"
              type="number"
              min="0"
              step="any"
              autoComplete="off"
              value={input.incidentPower}
              onChange={(event) => setInput({ ...input, incidentPower: event.target.value })}
              aria-invalid={Boolean(errors.incidentPower)}
              aria-describedby={"photodetector-convention" + (errors.incidentPower ? " photodetector-power-error" : "")}
            />
            <select
              aria-label="Incident optical power unit"
              name="photodetector-power-unit"
              value={input.powerUnit}
              onChange={(event) => setInput({ ...input, powerUnit: event.target.value as OpticalPowerUnit })}
            >
              {Object.keys(opticalPowerUnitScales).map((unit) => <option key={unit}>{unit}</option>)}
            </select>
          </div>
          {errors.incidentPower ? <p className={styles.error} id="photodetector-power-error">{errors.incidentPower}</p> : null}
        </div>
      </div>
      <div aria-live="polite" aria-atomic="true">
        <dl className={styles.results}>
          <div>
            <dt>Calculated photocurrent, Ilight − Idark</dt>
            <dd data-photodetector-result="photocurrent">{result.ok ? current(result.photocurrentA) : "—"}</dd>
          </div>
          <div>
            <dt>Calculated signed responsivity</dt>
            <dd data-photodetector-result="responsivity">{result.ok ? number(result.responsivityAw) + " A/W" : "—"}</dd>
          </div>
        </dl>
        <p className={styles.interpretation}>
          {!result.ok
            ? errors.calculation || "Correct the marked inputs to calculate the photocurrent and responsivity."
            : result.photocurrentA > 0
              ? "Illumination increases current in the defined positive direction. At fixed incident power, a larger positive photocurrent gives a larger signed responsivity."
              : result.photocurrentA < 0
                ? "The signed photocurrent is negative. This can reflect the opposite current direction or photo-induced current suppression; interpret it with the bias and sign convention. Optical power remains positive."
                : "The illuminated and dark readings are equal, giving zero net photocurrent and zero responsivity for this measurement pair."}
        </p>
      </div>
      <details className={styles.limitations}>
        <summary>What this calculation can and cannot tell you</summary>
        <p>
          Responsivity connects charge flow to incident optical power. It is not
          quantum efficiency: photon counting also needs the wavelength, and
          gain can allow multiple collected charges per incident photon.
          Responsivity alone cannot separate absorption, charge collection and gain.
        </p>
        <p>
          In MoS₂ phototransistors, a trapped carrier can gate the channel while
          other carriers continue to flow. Such photogating can enhance gain
          while slowing recovery. A high responsivity does not establish low
          noise or a fast response; those need independent measurements.
        </p>
        <p>
          Compare devices only with matching or explicitly reported wavelength,
          bias, illuminated active area, timing and power normalization.
          This algebraic calculator does not solve absorption, exciton
          dissociation, transport, noise or response dynamics.
        </p>
      </details>
    </section>
  );
}
