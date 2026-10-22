import { SectionHeading } from "@/components/page-shell";
import { ReferenceLink } from "@/components/reference-link";
import styles from "./mos2-characterization.module.css";

export function Mos2Characterization() {
  return (
    <section className="section" id="characterization">
      <SectionHeading
        title="How do we know what a MoS₂ sample contains?"
        description="Combine structural and optical measurements: a layer count, a lattice image and a light-emission spectrum are complementary evidence."
      />
      <div className={styles.methods}>
        <article className={styles.method} id="raman">
          <h3>Raman spectroscopy</h3>
          <dl className={styles.findings}>
            <div>
              <dt>Working principle</dt>
              <dd>
                Inelastic light scattering exchanges energy with lattice
                vibrations. Raman shift is the change in photon wavenumber
                (cm⁻¹), proportional to the energy exchanged.
              </dd>
            </div>
            <div>
              <dt>What it measures</dt>
              <dd>
                Vibrational peak positions, widths and intensities. The in-plane
                E′ and out-of-plane A₁′ modes of a 1H monolayer correspond to the
                commonly used bulk labels E₂g¹ and A₁g.
              </dd>
            </div>
            <div>
              <dt>What it reveals about MoS₂</dt>
              <dd>
                Their separation can help identify layer number; shifts and
                broadening also probe changes in bonding, strain and charge.
              </dd>
            </div>
            <div>
              <dt>Published evidence</dt>
              <dd>
                Lee et al. studied exfoliated MoS₂ on SiO₂/Si, with layer counts
                checked by AFM. As layers were added, the in-plane mode softened
                to lower frequency and the out-of-plane mode stiffened to higher
                frequency, increasing their separation in that sample series.
                <ReferenceLink id="lee2010" from="/why-mos2#raman" />
              </dd>
            </div>
            <div>
              <dt>Limitations</dt>
              <dd>
                Electron doping, strain and substrate interactions can change
                the spectrum. Compare matched excitation and sample conditions;
                one fixed peak separation is not a universal layer-count rule.
                <ReferenceLink id="chakraborty2012" from="/why-mos2#raman" />
                <ReferenceLink id="conley2013" from="/why-mos2#raman" />
                <ReferenceLink id="buscema2014" from="/why-mos2#raman" />
              </dd>
            </div>
          </dl>
        </article>
        <article className={styles.method} id="afm">
          <h3>Atomic force microscopy</h3>
          <dl className={styles.findings}>
            <div>
              <dt>Working principle</dt>
              <dd>
                A sharp tip scans the surface. Feedback adjusts its height to
                maintain a chosen tip–sample interaction, such as cantilever
                deflection or oscillation amplitude.
              </dd>
            </div>
            <div>
              <dt>What it measures</dt>
              <dd>
                Surface topography and apparent step height between a flake and
                its support, or between neighbouring terraces.
              </dd>
            </div>
            <div>
              <dt>What it reveals about MoS₂</dt>
              <dd>
                Terraces help count layers; maps reveal wrinkles, residue and
                roughness that can later affect contacts and dielectric growth.
              </dd>
            </div>
            <div>
              <dt>Published evidence</dt>
              <dd>
                In Lee et al.’s contact-mode measurements on SiO₂/Si, single
                layers measured against the substrate showed more height
                variation than steps between MoS₂ terraces.
                <ReferenceLink id="lee2010" from="/why-mos2#afm" />
              </dd>
            </div>
            <div>
              <dt>Limitations</dt>
              <dd>
                Adsorbates and substrate interactions affect apparent height;
                tip force and imaging mode also matter. Trapped material can
                contribute to the measured step. This is not a direct
                measurement of the separation between the two sulfur planes.
                <ReferenceLink id="lee2010" from="/why-mos2#afm" />
              </dd>
            </div>
          </dl>
        </article>
        <article className={styles.method} id="tem">
          <h3>Transmission electron microscopy</h3>
          <dl className={styles.findings}>
            <div>
              <dt>Working principle</dt>
              <dd>
                Electrons transmitted or scattered through a thin specimen form
                images and diffraction patterns. Scanning TEM can map atomic
                columns with a focused electron probe.
              </dd>
            </div>
            <div>
              <dt>What it measures</dt>
              <dd>
                Projected lattice structure, orientation and contrast associated
                with atomic columns, defects and grain boundaries.
              </dd>
            </div>
            <div>
              <dt>What it reveals about MoS₂</dt>
              <dd>
                Microscopy can distinguish differently oriented grains and
                resolve how their lattices join. Chemical assignments require
                suitable contrast, analysis and sometimes complementary
                spectroscopy.
              </dd>
            </div>
            <div>
              <dt>Published evidence</dt>
              <dd>
                Van der Zande et al. combined electron microscopy of CVD-grown
                monolayers with optical and electrical measurements to connect
                grain-boundary structure with sample behaviour.
                <ReferenceLink id="vanderzande2013" from="/why-mos2#tem" />
              </dd>
            </div>
            <div>
              <dt>Limitations</dt>
              <dd>
                Preparation, contamination and the electron beam can alter the
                specimen. Komsa et al. observed beam-induced vacancies in MoS₂
                at 80 keV. A lattice image alone does not establish mobility,
                a band gap or transistor performance.
                <ReferenceLink id="komsa2012" from="/why-mos2#tem" />
              </dd>
            </div>
          </dl>
        </article>
        <article className={styles.method} id="pl">
          <h3>Photoluminescence spectroscopy</h3>
          <dl className={styles.findings}>
            <div>
              <dt>Working principle</dt>
              <dd>
                Absorbed light creates electronic excitations. Electron–hole
                pairs can bind as excitons; radiative recombination emits light,
                competing with non-radiative decay.
              </dd>
            </div>
            <div>
              <dt>What it measures</dt>
              <dd>
                Emission energy, linewidth and intensity under stated
                illumination, temperature and collection conditions.
              </dd>
            </div>
            <div>
              <dt>What it reveals about MoS₂</dt>
              <dd>
                Layer-dependent emission helps test direct versus indirect
                optical-transition behaviour. Direct transitions can emit
                without the phonon assistance typical of indirect band-edge
                recombination.
              </dd>
            </div>
            <div>
              <dt>Published evidence</dt>
              <dd>
                Mak et al. compared suspended mono- and few-layer samples at
                room temperature using 532 nm excitation. Monolayers emitted
                much more efficiently than the thicker samples in that study.
                <ReferenceLink id="mak2010" from="/why-mos2#pl" />
              </dd>
            </div>
            <div>
              <dt>Limitations</dt>
              <dd>
                Substrate interference, doping, defects and competing decay
                channels affect brightness. Buscema et al. found different Raman
                and PL responses on dielectric and conducting supports. Bright
                PL alone is not a universal measure of crystal quality.
                <ReferenceLink id="buscema2014" from="/why-mos2#pl" />
              </dd>
            </div>
          </dl>
        </article>
      </div>
      <p className="learning-tip mt-5">
        Match the measurement to the question: use topography and Raman together
        for layer identification, microscopy for structure, and optical or
        electrical measurements for the corresponding response. Record the
        sample, substrate and measurement conditions before comparing results.
      </p>
    </section>
  );
}
