import Link from "next/link";
import { SectionHeading } from "@/components/page-shell";
import { ReferenceLink } from "@/components/reference-link";
import readingStyles from "@/components/reading-paths.module.css";

export function Mos2Applications() {
  return (
    <section className="section" id="applications">
      <SectionHeading
        title="MoS₂ beyond the transistor channel"
        description="The same atomic thickness, electronic states and exposed surfaces enable other nanoscale devices—and create different engineering limits."
      />
      <article id="application-photodetectors">
        <h3>Photodetectors: from absorbed light to an electrical signal</h3>
        <dl className={readingStyles.brief}>
          <div>
            <dt>Nanoscale property & mechanism</dt>
            <dd>
              Monolayer 1H MoS₂ supports direct optical transitions;
              conventional 2H multilayers can have an indirect fundamental
              gap while retaining higher-energy direct transitions. Absorption can
              create bound electron–hole excitations, or excitons; collecting
              charge requires separation and transport before recombination.
              Fields, contacts and interfaces influence this competition. An
              atomically thin absorber offers strong electrostatic control,
              but its small optical path limits the light absorbed in one pass.
              A biased phototransistor, a junction photodiode and a hybrid
              detector need not use the same collection or gain mechanism.
              <ReferenceLink id="mak2010" from="/research#application-photodetectors" />
              <ReferenceLink id="lopez-photodetector2013" from="/research#application-photodetectors" />
            </dd>
          </div>
          <div>
            <dt>What published experiments demonstrate</dt>
            <dd>
              Lopez-Sanchez et al. demonstrated monolayer MoS₂
              phototransistors with an illumination-dependent electrical
              response. Furchi et al. studied biased mono- and bilayer devices:
              molecular charge transfer and trapping in band-tail states
              produced distinct contributions to the measured response.
              Their results do not define a universal MoS₂ detector efficiency.
              <ReferenceLink id="lopez-photodetector2013" from="/research#application-photodetectors" />
              <ReferenceLink id="furchi2014" from="/research#application-photodetectors" />
            </dd>
          </div>
          <div>
            <dt>Read responsivity with its measurement conditions</dt>
            <dd>
              External responsivity is R = (I<sub>light</sub> − I<sub>dark</sub>)
              / P<sub>incident</sub>, in A/W. State the optical power incident
              on the defined active area, wavelength, gate/drain biases and
              measurement timing. Incident power differs from absorbed power;
              dividing by the whole laser-beam power gives a different
              normalization when only part of the beam reaches the device.
              Report dark current and rise/fall times with their protocols.
              <ReferenceLink id="lopez-photodetector2013" from="/research#application-photodetectors" />
            </dd>
          </div>
          <div>
            <dt>Gain, speed & noise must be tested together</dt>
            <dd>
              A trapped carrier can prolong the influence of illumination
              while other carriers circulate. This can increase gain while
              slowing recovery or shifting the operating point. Defects,
              adsorbates and contacts also affect dark current, noise and
              stability. High responsivity alone therefore establishes
              neither rapid detection nor a low detection limit; measured
              noise and bandwidth are needed.
              <ReferenceLink id="furchi2014" from="/research#application-photodetectors" />
            </dd>
          </div>
        </dl>
        <Link href="/why-mos2#excitons" className="text-link">
          Separate optical transitions, excitons and quasiparticle gaps
        </Link>
      </article>
      <div className="two-column mt-6">
        <article id="application-sensors">
          <h3>Nanosensors: make surface interactions readable</h3>
          <p className="mt-3">
            An exposed MoS₂ sheet has a large surface relative to its volume.
            Adsorbed molecules can exchange charge or change local
            electrostatics, modulating carrier density and the measured
            channel/contact resistance. Late et al. compared exfoliated
            single- and few-layer transistors exposed to NO₂, NH₃ and humidity,
            with gate bias and illumination as experimental variables. Fewer
            layers did not automatically give the best response.
            <ReferenceLink id="late2013" from="/research#application-sensors" />
          </p>
          <p className="mt-3">
            Sensitivity is not selectivity. A detection limit needs a stated
            noise baseline and concentration protocol; recovery time needs
            exposure and purge conditions. Humidity, defects, contamination
            and drift can mimic or obscure an analyte signal. One reported
            gas detection limit is not a constant of MoS₂.
            <ReferenceLink id="late2013" from="/research#application-sensors" />
          </p>
        </article>
        <article id="application-catalysis">
          <h3>Electrocatalysis: control sites and charge delivery</h3>
          <p className="mt-3">
            In the hydrogen evolution reaction, an electrode supplies
            electrons to form H₂ from proton or water-derived species. MoS₂
            edge structure and nanosheet size affect the accessible reaction
            sites. Jaramillo et al. used scanning tunneling microscopy and
            electrochemistry to relate activity to edge-site abundance in
            MoS₂ nanoparticles on Au(111).
            <ReferenceLink id="jaramillo2007" from="/research#application-catalysis" />
          </p>
          <p className="mt-3">
            Phase engineering can also change conductivity and site
            accessibility, as studied in chemically exfoliated metallic
            nanosheets. Separately, sulfur vacancies and strain activated
            basal-plane sites in a specific monolayer study. Thus neither
            “all basal planes are inactive” nor “all MoS₂ surfaces are equally
            active” is a general rule.
            <ReferenceLink id="lukowski2013" from="/research#application-catalysis" />
            <ReferenceLink id="li-her2016" from="/research#application-catalysis" />
          </p>
          <p className="mt-3">
            Compare overpotential at a stated current density and Tafel slope
            over a stated fitting range, together with electrolyte, reference
            electrode, resistance correction, catalyst loading and stability.
            Electrode coupling and usable site density constrain performance.
            <ReferenceLink id="lukowski2013" from="/research#application-catalysis" />
          </p>
        </article>
      </div>
      <p className="learning-tip mt-6">
        <strong>Flexible nanoelectronics connects structure to a system.</strong>{" "}
        Thin films can bend with a support, but their strain depends on
        curvature and distance from the stack’s neutral mechanical plane.
        Stretchable flake networks can instead
        accommodate motion between flakes; the contacts and conducting paths
        must remain connected. Bending and stretching are different tests.
        <ReferenceLink id="tang2023" from="/research#applications" />
        <ReferenceLink id="kim-stretch2026" from="/research#applications" />{" "}
        <Link href="#discovery-stretchable" className="text-link">
          Read the existing deformable-electronics evidence
        </Link>.
      </p>
    </section>
  );
}
