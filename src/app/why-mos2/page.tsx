import type { Metadata } from "next";
import Link from "next/link";
import {
  PageShell,
  SectionHeading,
  RelatedTopics,
} from "@/components/page-shell";
import {
  MaterialExplorer,
  MaterialStructure,
} from "@/components/learning/material-explorer";
import { BandDiagram } from "@/components/learning/band-diagram";
import { ReferenceLink } from "@/components/reference-link";
import { ScientificFigure } from "@/components/scientific-figure";
import { AtomicWorkbench } from "@/components/science/atomic-workbench";
import { InterfaceFeature } from "@/components/research/interface-feature";
import { LayerBandEvidence } from "@/components/learning/layer-band-evidence";

export const metadata: Metadata = {
  title: "MoS₂ — Engineering the Next Atomic Layer",
};

export default function Why() {
  return (
    <PageShell
      title="MoS₂ — Engineering the Next Atomic Layer"
      intro="A two-dimensional semiconductor where atomic structure, interfaces, and device design redefine electronic possibilities."
      contents={[
        {
          title: "Explore MoS₂",
          items: [
            { id: "atomic-structure", label: "Atomic structure" },
            {
              id: "possibilities",
              label: "Atomic thickness changes the design space",
            },
            {
              id: "engineering-limits",
              label: "The next layer is an engineering decision",
            },
          ],
        },
        {
          title: "Foundations: deeper reading",
          items: [
            { id: "beyond-silicon", label: "Two-Dimensional Nanomaterials" },
            { id: "band-gap", label: "Why Band Gap Matters" },
            { id: "layer-evidence", label: "Layer evidence" },
          ],
        },
      ]}
    >
      <section className="material-arrival" id="atomic-structure">
        <AtomicWorkbench initialMaterial="mos2" fixedMaterial />
      </section>
      <section className="section material-reasons" id="possibilities">
        <SectionHeading
          title="Atomic thickness changes the design space"
          description="A material property becomes useful when its environment and device architecture support it."
        />
        <div className="open-questions">
          <article>
            <h3>A finite gap</h3>
            <p>
              Unlike pristine graphene, semiconducting MoS₂ has a finite band
              gap. It helps carrier depletion, while real leakage also depends
              on contacts, defects and the gate stack.
              <ReferenceLink id="radis2011" from="/why-mos2#possibilities" />
            </p>
            <a className="text-link" href="#band-gap">
              Explore the switching question
            </a>
          </article>
          <article>
            <h3>Layer-dependent bands</h3>
            <p>
              Monolayer and conventional multilayer band structures differ.
              Engineered stacking can change that pattern; layer count alone is
              not a complete descriptor.
              <ReferenceLink id="mak2010" from="/why-mos2#possibilities" />
              <ReferenceLink
                id="yang-stacking2026"
                from="/why-mos2#possibilities"
              />
            </p>
            <a className="text-link" href="#layer-evidence">
              Read the layer evidence
            </a>
          </article>
          <article>
            <h3>A thin channel</h3>
            <p>
              Atomic-scale thickness offers a route to gate control. Oxide
              capacitance, contact injection and drain fields still shape the
              complete transistor.
              <ReferenceLink
                id="engineering2024"
                from="/why-mos2#possibilities"
              />
            </p>
            <a className="text-link" href="#engineering-limits">
              Connect the material to engineering limits
            </a>
          </article>
        </div>
      </section>
      <InterfaceFeature from="/why-mos2" />
      <section className="section lab-next" id="engineering-limits">
        <div>
          <span className="eyebrow">Materials become devices</span>
          <h2>The next layer is an engineering decision</h2>
          <p>
            Contacts, dielectrics, transfer cleanliness and reproducible
            processing decide how much of a material’s potential survives
            integration. Explore the structure, then experiment with the
            separate classical model.
          </p>
        </div>
        <div className="actions">
          <Link href="/challenges" className="metal-button metal-ghost">
            Read the engineering limits
          </Link>
        </div>
      </section>
      <details className="material-deep-dive">
        <summary>
          Read the foundations: graphene, band gaps and layer evidence
        </summary>
        <div>
          <nav className="bridge-nav" aria-label="Explore the material story">
            <a href="#beyond-silicon">Graphene transport ↓</a>
            <a href="#zero-gap">The band-gap question ↓</a>
            <a href="#meet-mos2">Introducing MoS₂ ↓</a>
          </nav>
          <section id="beyond-silicon" className="bridge-intro">
            <div>
              <SectionHeading title="Two-Dimensional Nanomaterials" />
              <p>
                These materials have atomic-scale thickness while extending much
                farther in the plane. Their structure and electronic properties
                make them interesting for advanced electronics. Graphene and
                MoS₂ are the representative materials explored here.{" "}
                <ReferenceLink id="neto2009" from="/why-mos2#beyond-silicon" />
                <ReferenceLink id="radis2011" from="/why-mos2#beyond-silicon" />
              </p>
              <h3 className="mt-5">The Remarkable Properties of Graphene</h3>
              <p className="mt-3">
                A carbon sheet just one atom thick can carry charge with high
                mobility and long mean free paths in suitable conditions. Its
                linear bands near the Dirac point make it a distinctive platform
                for electronic transport. Substrates, disorder and temperature
                still matter.{" "}
                <ReferenceLink id="neto2009" from="/why-mos2#beyond-silicon" />
              </p>
              <Link
                href="/foundations#graphene-electronics"
                className="text-link"
              >
                Explore the interactive Dirac cone →
              </Link>
            </div>
            <div className="bridge-materials">
              <figure className="material-canvas">
                <MaterialStructure material="graphene" />
                <figcaption>Graphene · honeycomb carbon sheet</figcaption>
              </figure>
              <span
                className="material-journey-arrow"
                aria-label="Continue to a different 2D material"
              >
                →
              </span>
              <figure className="material-canvas">
                <MaterialStructure material="mos2" />
                <figcaption>MoS₂ · sulfur–molybdenum–sulfur layer</figcaption>
              </figure>
            </div>
          </section>

          <section className="section panel" id="zero-gap">
            <SectionHeading
              title="The Zero-Band-Gap Challenge"
              description="Efficient transport and a low-leakage digital OFF state ask different things of a material."
            />
            <div className="two-column">
              <BandDiagram material="graphene" />
              <div>
                <p>
                  In ideal pristine monolayer graphene, the valence and
                  conduction bands meet. Moving the Fermi level changes
                  occupancy without opening an intrinsic gap. Suppressing
                  unwanted current in a conventional digital field-effect
                  transistor is therefore challenging.{" "}
                  <ReferenceLink id="schwierz2010" from="/why-mos2#zero-gap" />
                </p>
                <p className="mt-4">
                  Graphene remains interesting for analogue and radio-frequency
                  electronics, sensing and other applications. A digital
                  switching limitation does not erase those opportunities.
                </p>
              </div>
            </div>
          </section>

          <section className="section" id="band-gap">
            <SectionHeading
              title="Why Band Gap Matters"
              description="A switch needs both a useful ON state and a controlled OFF state."
            />
            <div className="two-column">
              <div className="panel learning-goal">
                <span className="goal-marker" aria-hidden="true">
                  ON
                </span>
                <h3>Let charge move</h3>
                <p className="mt-3">
                  A gate increases channel charge. Mobility and contacts
                  influence how much current the device can carry.
                </p>
              </div>
              <div className="panel learning-goal">
                <span className="goal-marker" aria-hidden="true">
                  OFF
                </span>
                <h3>Suppress unwanted current</h3>
                <p className="mt-3">
                  A finite gap provides an energy interval without allowed
                  states in the ideal crystal, helping suppress carrier
                  availability.
                </p>
              </div>
            </div>
            <p className="learning-tip mt-5">
              A finite gap helps switching; real OFF current also depends on
              thermal carriers, defects, contacts, electrostatics and leakage
              paths. <ReferenceLink id="mosfet" from="/why-mos2#band-gap" />
            </p>
            <Link href="/foundations#bands" className="text-link">
              Review energy bands & the band gap →
            </Link>
            <details>
              <summary>
                What does an ON/OFF ratio tell a digital circuit?
              </summary>
              <p className="text-sm">
                ION/IOFF describes two specified bias states of a device. Low
                leakage reduces static power and helps separate logic levels;
                useful ON current must charge a circuit’s load. Both values
                require drain/gate biases, temperature and a measurement floor.
                A high ratio alone does not establish speed, reliability or
                manufacturing yield.
                <ReferenceLink id="benchmark2022" from="/why-mos2#band-gap" />
              </p>
            </details>
          </section>

          <section className="section panel" id="meet-mos2">
            <SectionHeading
              title="Introducing MoS₂"
              description="Semiconducting 2H-molybdenum disulfide: a layered transition-metal dichalcogenide."
            />
            <div className="two-column">
              <div className="material-canvas">
                <MaterialStructure material="mos2" />
                <p className="text-xs muted">
                  Monolayer side-view schematic · geometry not to scale
                </p>
              </div>
              <div>
                {[
                  [
                    "An atomically thin body",
                    "A monolayer is approximately 0.65 nm thick: a sulfur–molybdenum–sulfur unit. An ultrathin channel can help a gate control charge.",
                    "radis2011",
                  ],
                  [
                    "A finite band gap",
                    "Monolayer semiconducting MoS₂ has a direct-gap optical transition in the approximately 1.8 eV context used here. Layer number and environment matter; optical transition energies are not quasiparticle-gap measurements.",
                    "mak2010",
                  ],
                  [
                    "Interfaces and real devices",
                    "Contacts, defects and gate dielectrics affect measured current and extracted mobility. A promising semiconductor still needs a well-engineered device.",
                    "radis2011",
                  ],
                ].map(([title, text, ref]) => (
                  <details key={title}>
                    <summary>{title}</summary>
                    <p className="text-sm">
                      {text}{" "}
                      <ReferenceLink id={ref} from="/why-mos2#meet-mos2" />
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section className="section" id="layer-evidence">
            <ScientificFigure id="mos2-phases" />
            <p className="text-sm">
              The 2H bulk stacking has trigonal-prismatic coordination within
              each sheet; an isolated sheet is often called the 1H monolayer.
              The 1T coordination is different and must not be assigned the same
              semiconducting band picture. Layer coupling changes band extrema,
              while crystal phase, defects and the environment also matter.
              <ReferenceLink
                id="engineering2024"
                from="/why-mos2#layer-evidence"
              />
            </p>
            <LayerBandEvidence />
            <details>
              <summary>
                Thin-body electrostatics: an advantage with conditions
              </summary>
              <p className="text-sm">
                A thin channel reduces the depth over which the gate must
                control charge and can improve electrostatics. The benefit also
                depends on oxide thickness/permittivity, gate geometry, contacts
                and drain bias. Drain-induced barrier changes and tunnelling
                still matter at very short lengths. NanoLab’s 100–2000 nm length
                slider demonstrates classical geometry scaling; it does not
                calculate those effects.
                <ReferenceLink
                  id="engineering2024"
                  from="/why-mos2#layer-evidence"
                />
              </p>
            </details>
          </section>

          <section className="section" id="materials">
            <SectionHeading
              title="Graphene vs MoS₂"
              description="Switch the material to explore its structure, band picture and opportunities. Silicon provides a familiar reference."
            />
            <MaterialExplorer
              from="/why-mos2#materials"
              initialMaterial="graphene"
            />
            <Link href="/foundations#graphene-structure" className="text-link">
              Review graphene and carbon structures →
            </Link>
          </section>

          <section className="section" id="devices">
            <SectionHeading
              title="From Materials to Devices"
              description="The channel is one part of the story. Contacts and a gate stack turn a material into a transistor."
            />
            <div className="two-column">
              <div className="panel">
                <h3>Explore the complete structure</h3>
                <p className="mt-3">
                  See how a MoS₂ channel, source, drain, dielectric and gate fit
                  together. Select a layer and examine its role.
                </p>
                <Link href="/device" className="button-primary mt-5">
                  Explore Device →
                </Link>
              </div>
              <div className="panel">
                <h3>Experiment with a teaching model</h3>
                <p className="mt-3">
                  Change mobility, geometry and contact resistance to understand
                  a simplified transistor model. Material band diagrams and
                  simulated device curves answer different questions.
                </p>
                <Link href="/simulator" className="button-secondary mt-5">
                  Launch Simulator →
                </Link>
              </div>
            </div>
            <p className="text-sm muted mt-5">
              Different applications favour different materials. Silicon retains
              a mature manufacturing ecosystem; MoS₂ research explores
              opportunities alongside substantial integration challenges.
            </p>
          </section>
        </div>
      </details>
      <RelatedTopics
        links={[
          {
            href: "/comparison",
            title: "Material Comparison",
            description: "Compare material context and saved device scenarios.",
          },
        ]}
      />
    </PageShell>
  );
}
