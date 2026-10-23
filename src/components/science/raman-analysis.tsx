"use client";
import Link from "next/link";
import { useId, useState } from "react";
import { ReferenceLink } from "@/components/reference-link";
import {
  analyzeRamanPeaks,
  conceptualRamanSpectrum,
  ramanExamples,
  ramanPeakBounds,
  ramanPlotBounds,
} from "@/lib/science/raman-analysis";
import styles from "./raman-analysis.module.css";

const x = (shift: number) => 90 + (shift - ramanPlotBounds.min) * 6.6;
const y = (intensity: number) => 235 - intensity * 160;

export function RamanAnalysis() {
  const id = useId();
  const [context, setContext] = useState(0);
  const [inPlane, setInPlane] = useState(String(ramanExamples[0].inPlane));
  const [outOfPlane, setOutOfPlane] = useState(String(ramanExamples[0].outOfPlane));
  const example = ramanExamples[context];
  const inside = inPlane.trim() === "" ? NaN : Number(inPlane);
  const outside = outOfPlane.trim() === "" ? NaN : Number(outOfPlane);
  const analysis = analyzeRamanPeaks(inside, outside);
  const spectrum = conceptualRamanSpectrum(inside, outside);
  const custom = inside !== example.inPlane || outside !== example.outOfPlane;
  const curve = spectrum.map((point, i) => `${i ? "L" : "M"}${x(point.shift)},${y(point.intensity)}`).join(" ");
  return (
    <section className="panel mt-6" id="raman-analysis" aria-labelledby={`${id}-heading`}>
      <h3 id={`${id}-heading`}>Raman analysis: identify a peak pair</h3>
      <p className="text-sm mt-3">
        Select an illustrative layer context, then edit the two mode positions.
        Raman shift measures photon energy exchanged with a phonon; the peak
        separation is Δω = ω(out-of-plane) − ω(in-plane).
      </p>
      <p className="text-sm muted mt-3">
        <strong>Conceptual spectrum · illustrative parameters.</strong> All
        presets, intensities and line shapes below are teaching choices, not
        published spectra or measured layer-count thresholds.
      </p>
      <div className="tabs mt-4" role="group" aria-label="Illustrative Raman layer context">
        {ramanExamples.map((item, index) => (
          <button key={item.label} type="button" aria-pressed={context === index}
            onClick={() => { setContext(index); setInPlane(String(item.inPlane)); setOutOfPlane(String(item.outOfPlane)); }}>
            {item.label}
          </button>
        ))}
      </div>
      <p className="text-xs muted mt-3">
        {custom ? "Custom illustrative positions" : "Illustrative preset"} · {example.symmetry} assumed, not inferred.
      </p>
      <div className={styles.layout}>
        <figure className={styles.figure}>
          <svg viewBox="0 0 590 300" role="img" aria-labelledby={`${id}-plot-title ${id}-plot-description`}>
            <title id={`${id}-plot-title`}>Conceptual MoS₂ Raman spectrum</title>
            <desc id={`${id}-plot-description`}>
              {analysis.valid
                ? `Two illustrative Lorentzian modes at ${inside} and ${outside} inverse centimetres, separated by ${analysis.separation.toPrecision(4)} inverse centimetres. Intensity is normalized and has no experimental scale.`
                : "No spectrum is displayed until both peak positions are valid."}
            </desc>
            {[0, 0.5, 1].map(value => (
              <g key={value}>
                <path d={`M90 ${y(value)}H552`} stroke="var(--line)" strokeDasharray="4 5" />
                <text x="78" y={y(value) + 4} fill="currentColor" fontSize="12" textAnchor="end">{value}</text>
              </g>
            ))}
            <path d="M90 50V235H552" fill="none" stroke="currentColor" />
            {[360, 380, 400, 420, 430].map(shift => (
              <g key={shift}>
                <path d={`M${x(shift)} 235v5`} stroke="currentColor" />
                <text x={x(shift)} y="258" fill="currentColor" fontSize="12" textAnchor="middle">{shift}</text>
              </g>
            ))}
            <text x="321" y="286" fill="currentColor" fontSize="14" textAnchor="middle">Raman shift (cm⁻¹)</text>
            <text transform="translate(24 150) rotate(-90)" fill="currentColor" fontSize="13" textAnchor="middle">Intensity (a.u.)</text>
            {analysis.valid ? (
              <g>
                <path d={curve} fill="none" stroke="var(--plot-primary)" strokeWidth="2.5" />
                {[
                  { shift: inside, label: example.inMode, color: "var(--primary)" },
                  { shift: outside, label: example.outMode, color: "var(--orange)" },
                ].map((peak, index) => (
                  <g key={peak.label}>
                    <path d={`M${x(peak.shift)} 58V235`} stroke={peak.color} strokeDasharray="4 4" />
                    <text x={x(peak.shift) + (analysis.separation < 8 ? (index ? 4 : -4) : 0)} y="48" fill={peak.color} fontSize="14" textAnchor={analysis.separation < 8 ? (index ? "start" : "end") : "middle"}>{peak.label}</text>
                  </g>
                ))}
              </g>
            ) : null}
          </svg>
          <figcaption>
            Original two-Lorentzian illustration: fixed 4 cm⁻¹ full width at
            half maximum and relative amplitudes 1:0.85, normalized to the
            largest sampled intensity. No noise, instrument response or fitted
            experimental dataset is represented. Supplied centres are not
            recovered by fitting; nearby modes can overlap.
          </figcaption>
        </figure>
        <div className={styles.controls}>
          <label htmlFor={`${id}-in`}>
            In-plane {example.inMode} peak (cm⁻¹)
            <input id={`${id}-in`} name="raman-in-plane" type="number" inputMode="decimal" step="any" autoComplete="off"
              min={ramanPeakBounds.min} max={ramanPeakBounds.max} value={inPlane}
              onChange={event => setInPlane(event.target.value)}
              aria-invalid={!analysis.valid} aria-describedby={`${id}-result`} />
          </label>
          <label htmlFor={`${id}-out`}>
            Out-of-plane {example.outMode} peak (cm⁻¹)
            <input id={`${id}-out`} name="raman-out-of-plane" type="number" inputMode="decimal" step="any" autoComplete="off"
              min={ramanPeakBounds.min} max={ramanPeakBounds.max} value={outOfPlane}
              onChange={event => setOutOfPlane(event.target.value)}
              aria-invalid={!analysis.valid} aria-describedby={`${id}-result`} />
          </label>
          <p id={`${id}-result`} className={styles.result} role="status">
            {analysis.valid
              ? <><strong>Calculated separation: {analysis.separation.toPrecision(4)} cm⁻¹</strong><br /><span className="text-xs muted">{outside} − {inside} cm⁻¹. This value alone cannot establish layer number. Peak calibration, spectral resolution and fitting uncertainty also matter.</span></>
              : <span className={styles.error}>{analysis.error}</span>}
          </p>
        </div>
      </div>
      <p className="text-xs muted mt-4">
        Mode names follow symmetry: ideal 2H-derived odd layers use E′ / A₁′,
        even layers E<sub>g</sub> / A₁g, and bulk E₂g¹ / A₁g. Other stacking or
        symmetry changes require their own assignments.
        <ReferenceLink id="obrien-raman2016" from="/why-mos2#raman-analysis" />
      </p>
      <div className={styles.evidence}>
        <p>
          <strong>Published experimental evidence — separate from this illustration.</strong>{" "}
          Lee et al. report an approximately 3 cm⁻¹ increase in peak separation
          from monolayer to bilayer and a monolayer in-plane peak near 384 cm⁻¹.
          Their supported flakes were exfoliated onto 285 nm SiO₂/Si and measured
          under ambient conditions with 514.5 nm excitation and 2.7 cm⁻¹
          instrumental resolution. No complete numerical spectrum is imported here.
          <ReferenceLink id="lee2010" from="/why-mos2#raman-analysis" />
        </p>
        <p className="mt-3">
          Added layers change restoring forces and screening. The out-of-plane
          mode stiffens while the in-plane mode softens in that series; a simple
          interlayer-spring picture alone does not explain both shifts.
          Strain, doping, defects and substrate interactions also move or broaden
          peaks. Compare matched conditions and combine Raman with{" "}
          <Link href="/why-mos2#afm" className="text-link">AFM evidence</Link>{" "}
          rather than assigning a layer count from one cutoff.
          <ReferenceLink id="lee2010" from="/why-mos2#raman-analysis" />
          <ReferenceLink id="chakraborty2012" from="/why-mos2#raman-analysis" />
          <ReferenceLink id="conley2013" from="/why-mos2#raman-analysis" />
          <ReferenceLink id="buscema2014" from="/why-mos2#raman-analysis" />
        </p>
      </div>
    </section>
  );
}
