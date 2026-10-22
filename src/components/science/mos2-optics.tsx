import { SectionHeading } from "@/components/page-shell";
import { ReferenceLink } from "@/components/reference-link";
import styles from "./mos2-characterization.module.css";

export function Mos2Optics() {
  return (
    <section className="section" id="excitons">
      <SectionHeading
        title="An optical transition is not a quasiparticle gap"
        description="Light creates an interacting electron–hole pair. Its energy differs from the energy needed to create separated charge carriers."
      />
      <div className={styles.optics}>
        <div>
          <p>
            An exciton is a Coulomb-bound electron–hole pair. The quasiparticle
            gap describes creating separated electron and hole excitations; an
            optical transition can instead create a bound pair below that
            continuum. Reduced dielectric screening in a monolayer makes
            electron–hole interactions important. Many-body calculations for
            MoS₂ therefore treat both the quasiparticle bands and excitons.
            <ReferenceLink id="qiu2013" from="/why-mos2#excitons" />
          </p>
          <p className="mt-4">
            For the same direct transition, sample and dielectric environment,
            the simple neutral-exciton relation is Eopt ≈ EgQP − Eb, where Eb is
            the positive binding energy below the free-pair continuum. Screening
            can change both EgQP and Eb; there is no single binding-energy
            constant for every MoS₂ sample. Charged excitons, phonons and
            defect-assisted emission require additional terms.
            <ReferenceLink id="qiu2013" from="/why-mos2#excitons" />
            <ReferenceLink id="buscema2014" from="/why-mos2#excitons" />
          </p>
        </div>
        <figure className={styles.energyFigure}>
          <svg
            viewBox="0 0 360 240"
            role="img"
            aria-label="Conceptual excitation-energy diagram. A bound exciton lies below the separated electron–hole continuum. The optical excitation energy plus the exciton binding energy equals the corresponding quasiparticle gap."
          >
            <path d="M25 200V20m-5 9 5-9 5 9" fill="none" stroke="var(--muted)" strokeWidth="2" />
            <g strokeWidth="2">
              <path d="M60 195h275" stroke="var(--muted)" />
              <path d="M60 95h275" stroke="var(--secondary)" />
              <path d="M60 35h275" stroke="var(--primary)" strokeDasharray="7 5" />
              <path d="M72 189V41m-5 8 5-8 5 8m-10 132 5 8 5-8" fill="none" stroke="var(--primary)" />
              <path d="M172 189V101m-5 8 5-8 5 8m-10 72 5 8 5-8" fill="none" stroke="var(--secondary)" />
              <path d="M301 89V41m-5 8 5-8 5 8m-10 32 5 8 5-8" fill="none" stroke="var(--primary)" />
            </g>
            <g fill="currentColor" fontSize="20">
              <text x="62" y="24">Free e–h pair</text>
              <text x="150" y="84">Bound exciton</text>
              <text x="83" y="139">EgQP</text>
              <text x="183" y="155">Eopt</text>
              <text x="311" y="72">Eb</text>
              <text x="185" y="223">Ground state</text>
            </g>
          </svg>
          <figcaption>
            Original conceptual schematic of excitation energies, not a measured
            spectrum, a band dispersion or a numerical prediction. Spacings
            carry no experimental scale.
          </figcaption>
        </figure>
      </div>
      <p className="learning-tip mt-5">
        A published optical example: Mak et al. measured a monolayer PL A peak
        at 1.90 eV in suspended MoS₂ at room temperature with 532 nm excitation.
        Their photoconductivity response rose near 1.8 eV. These are different
        optical observables under specified conditions, not interchangeable
        measurements of a universal quasiparticle gap.
        <ReferenceLink id="mak2010" from="/why-mos2#excitons" />
      </p>
    </section>
  );
}
