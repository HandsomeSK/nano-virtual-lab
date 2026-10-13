import { ReferenceLink } from "@/components/reference-link";

export function LayerBandEvidence() {
  return (
    <div className="mt-6">
      <h3>Direct and indirect transitions: layer number matters</h3>
      <div className="two-column mt-4">
        {(["Monolayer: direct", "Bulk: indirect"] as const).map((label, i) => (
          <figure className="panel" key={label}>
            <svg
              viewBox="0 0 320 215"
              role="img"
              aria-label={
                label + ": conceptual energy versus wave-vector diagram"
              }
            >
              <path
                d="M35 20v155h270"
                fill="none"
                stroke="var(--muted)"
                strokeWidth="2"
              />
              <text x="8" y="20" fill="var(--ink)" fontSize="14">
                E
              </text>
              <text x="300" y="198" fill="var(--ink)" fontSize="14">
                k
              </text>
              <path
                d={i === 0 ? "M65 35Q150 102 235 35" : "M105 35Q200 102 295 35"}
                fill="none"
                stroke="var(--violet-ink)"
                strokeWidth="3"
              />
              <path
                d="M65 157Q150 98 235 157"
                fill="none"
                stroke="var(--cyan-ink)"
                strokeWidth="3"
              />
              <path
                d={
                  i === 0
                    ? "M150 127V70M145 78L150 70L155 78"
                    : "M150 127L200 70M190 73L200 70L199 81"
                }
                fill="none"
                stroke="#e6c781"
                strokeWidth="3"
              />
              <text x="42" y="207" fill="var(--muted)" fontSize="13">
                {i === 0
                  ? "Same k: direct optical transition"
                  : "Different k: phonon-assisted transition"}
              </text>
            </svg>
            <figcaption className="text-sm">
              {label} · original qualitative schematic
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="text-sm mt-4">
        Mak et al. used optical spectroscopy to identify the indirect-to-direct
        evolution as MoS₂ becomes a monolayer. Direct transitions connect band
        extrema at the same wave vector; an indirect transition also needs
        momentum exchange, commonly with a phonon. These sketches explain the
        distinction without reproducing a computed dispersion or numerical
        scale.
        <ReferenceLink id="mak2010" from="/why-mos2#meet-mos2" />
      </p>
      <p className="text-sm mt-3">
        A photon can create a bound electron–hole pair (an exciton). Its optical
        transition energy can be below the quasiparticle gap by the binding
        energy. Screening, strain and layer number affect the result. The
        approximately 1.8 eV optical context above is neither a universal
        electrical gap nor a value used to calculate NanoLab’s drain current.
      </p>
    </div>
  );
}
