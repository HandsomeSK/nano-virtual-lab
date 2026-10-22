import Link from "next/link";
import { SectionHeading } from "@/components/page-shell";
import { ReferenceLink } from "@/components/reference-link";
import styles from "./mos2-fabrication.module.css";

export function Mos2Fabrication() {
  return (
    <section className="section" id="fabrication">
      <SectionHeading
        title="Fabrication & processing"
        description="A useful MoS₂ channel must survive the steps that connect, insulate and measure it."
      />
      <div className="two-column">
        <div>
          <h3>Prepare the material</h3>
          <p className="mt-3">
            Mechanical exfoliation separates flakes from a layered crystal. It
            supplies crystalline samples for experiments, but their location,
            area and layer number vary. Chemical vapor deposition (CVD) instead
            grows MoS₂ from reacting precursors. Lee et al. demonstrated growth
            on SiO₂ using molybdenum oxide and sulfur sources. Larger coverage
            introduces questions about nucleation, grain boundaries, defects
            and uniformity; it does not guarantee uniform electronic quality.
            <ReferenceLink id="lee-cvd2012" from="/device#fabrication" />
            <ReferenceLink id="radis2011" from="/device#fabrication" />
          </p>
        </div>
        <div>
          <h3>Move a film without losing its interfaces</h3>
          <p className="mt-3">
            Growth and device substrates may require different temperatures,
            surface chemistry or insulation. Transfer connects those choices,
            but support residues, adsorbates, wrinkles and tears can change
            contact injection and gate response. The selenium-assisted study
            compares film integrity and device behavior; “dry transfer” does
            not mean every processing step avoids liquid or leaves no residue.
            <ReferenceLink id="zhang2025" from="/device#fabrication" />
          </p>
          <Link
            href="/research?study=zhang2025#study-zhang2025"
            className="text-link"
          >
            Read the transfer evidence and its limits
          </Link>
        </div>
      </div>
      <h3 className="mt-6">One illustrative top-gate process</h3>
      <p className="mt-3">
        This sequence explains process dependencies, not a fabrication recipe.
        Each step needs its own material-compatible conditions.
        <ReferenceLink id="radis2011" from="/device#fabrication" />
        <ReferenceLink id="engineering2024" from="/device#fabrication" />
      </p>
      <ol className={styles.stages}>
        <li><strong>Prepare the substrate.</strong> Establish cleanliness, insulation and alignment references.</li>
        <li><strong>Place the MoS₂.</strong> Grow or transfer the film; verify coverage and layer number.</li>
        <li><strong>Define the device.</strong> Use lithography and suitable patterning to establish the channel and contact regions.</li>
        <li><strong>Form source and drain.</strong> Prepare their interfaces and deposit the contact electrodes.</li>
        <li><strong>Integrate the dielectric.</strong> Establish continuous insulation while preserving the MoS₂ surface.</li>
        <li><strong>Form the gate.</strong> Pattern its electrode and complete the required connections.</li>
        <li><strong>Measure the result.</strong> Check transfer/output curves, leakage, hysteresis and variation across devices.</li>
      </ol>
      <p className="text-sm muted">
        Gate-first flows reorder these steps: Tang et al. prepared the buried
        gate and dielectric before transferring monolayer MoS₂. Contact-first,
        contact-last and self-aligned structures have other constraints.
        <ReferenceLink id="tang2023" from="/device#fabrication" />
      </p>
      <h3 className="mt-6">ALD is controlled surface chemistry</h3>
      <p className="mt-3">
        Atomic layer deposition separates precursor exposures with purges.
        Each suitable exposure saturates the available reactive surface sites;
        repeating the cycle builds a film. A cycle does not necessarily deposit
        one complete atomic plane, and early nucleation can differ from later
        growth.
        <ReferenceLink id="george-ald2010" from="/device#fabrication" />
      </p>
      <p className="mt-3">
        A pristine MoS₂ basal surface has few dangling bonds, so some oxide
        chemistries nucleate unevenly. Functionalization or an interfacial
        seeding layer can add reactive sites, but can also alter charge,
        scattering and insulation. A high-κ oxide such as HfO₂ must therefore
        be assessed through coverage, capacitance, leakage and stability
        together—not dielectric constant alone.
        <ReferenceLink id="engineering2024" from="/device#fabrication" />
        <ReferenceLink id="wong2026" from="/device#fabrication" />
      </p>
      <p className="mt-4">
        <Link href="/discoveries/mos2-interface-breakthrough" className="text-link">
          Follow the carbon-dot / HfO₂ interface case study
        </Link>{" "}
        or{" "}
        <Link href="/why-mos2#characterization" className="text-link">
          choose measurements that test the processed material
        </Link>.
      </p>
    </section>
  );
}
