import type { FigureId } from "./figures";

export const researchCategories = [
  "Materials",
  "Devices",
  "Scaling",
  "Circuits",
  "Manufacturing",
] as const;
type Study = {
  reference: string;
  category: (typeof researchCategories)[number];
  summary: string;
  question: string;
  boundary: string;
  whyMatters: string;
  concept: string;
  conceptLabel: string;
  challenge: string;
  problem: string;
  demonstration: string;
  novelty: string;
  figure?: FigureId;
};
export function groupStudiesByCategory<T extends Pick<Study, "category">>(
  items: readonly T[],
) {
  return researchCategories
    .map((category) => ({
      category,
      studies: items.filter((study) => study.category === category),
    }))
    .filter((group) => group.studies.length > 0);
}
export const studies: Study[] = [
  {
    reference: "mak2010",
    problem:
      "The electronic consequences of reducing layered MoS₂ to an isolated monolayer were not captured by a bulk-material picture.",
    demonstration:
      "Optical measurements compare different layer counts and identify strong monolayer optical emission consistent with a direct transition.",
    novelty:
      "Connects thickness-dependent electronic structure to observable optical behaviour; it motivates, but does not itself demonstrate, transistor performance.",
    category: "Materials",
    summary:
      "Optical measurements connect decreasing MoS₂ thickness with a transition to a direct-gap semiconductor.",
    question:
      "How do layer number and the surrounding environment affect electronic and optical properties?",
    boundary:
      "An optical transition is not a direct measurement of all quasiparticle band energies or transistor performance.",
    whyMatters:
      "Connects layer-dependent energy bands with the choice of a semiconductor channel.",
    concept: "/foundations#bands",
    conceptLabel: "Review energy bands",
    challenge: "interfaces",
  },
  {
    reference: "radis2011",
    problem:
      "An atomically thin semiconductor must remain controllable when integrated with electrodes and a gate stack.",
    demonstration:
      "A monolayer MoS₂ device with a top-gate dielectric demonstrates strong gate-controlled switching.",
    novelty:
      "Integrates the thin semiconductor with a practical transistor architecture rather than relying on its band gap alone.",
    category: "Devices",
    summary:
      "A single-layer MoS₂ transistor demonstrates gate-controlled switching in an atomically thin semiconductor.",
    question:
      "How can contacts and the dielectric stack preserve useful switching in practical devices?",
    boundary:
      "Reported performance belongs to that device and measurement context; it is not a universal material constant.",
    whyMatters:
      "Turns the finite-band-gap idea into a gate-controlled device, while exposing the importance of contacts and the dielectric stack.",
    concept: "/device#working-principle",
    conceptLabel: "Explore transistor operation",
    challenge: "contacts",
  },
  {
    reference: "desai2016",
    problem:
      "Conventional gate patterning and electrostatic control become difficult at extremely small dimensions.",
    demonstration:
      "A carbon-nanotube gate defines a 1 nm physical gate dimension for a MoS₂ research transistor.",
    novelty:
      "Uses a nanoscale gate structure to explore scaling; physical gate length is not the same as the bias-dependent effective transport length.",
    category: "Scaling",
    summary:
      "A carbon-nanotube gate enables a MoS₂ research transistor with a physical gate length of 1 nm.",
    question:
      "What controls transport and electrostatics as gate dimensions approach the atomic scale?",
    boundary:
      "Physical gate length differs from effective channel length. The long-channel educational simulator does not reproduce this device.",
    whyMatters:
      "Connects atomically thin channels with the challenge of preserving gate control at very small dimensions.",
    concept: "/foundations#quantum",
    conceptLabel: "Review quantum confinement",
    challenge: "scaling",
  },
  {
    reference: "tang2023",
    problem:
      "Useful flexible electronics require multiple transistors that can be fabricated together with suitable interfaces.",
    demonstration:
      "A gate-first process produces monolayer MoS₂ integrated circuits on rigid and flexible substrates.",
    novelty:
      "Connects processing and device design with circuit functions and power considerations, rather than stopping at a single transistor.",
    category: "Circuits",
    summary:
      "A gate-first approach explores low-power monolayer MoS₂ integrated circuits on rigid and flexible substrates.",
    question:
      "How can device fabrication become a repeatable route to useful circuit functions?",
    boundary:
      "Selected study overview only; no experimental curves or circuit measurements have been imported into NanoLab.",
    whyMatters:
      "Shows how transistor fabrication and interface quality must work together to produce repeatable circuit functions.",
    concept: "/foundations#transistors",
    conceptLabel: "Review transistor basics",
    challenge: "interfaces",
  },
  {
    reference: "kwon2024",
    problem:
      "Small exfoliated flakes do not provide a repeatable route to large-area circuit fabrication.",
    demonstration:
      "Polycrystalline MoS₂ transistors are integrated across a 200 mm wafer-scale platform.",
    novelty:
      "Tests large-area processing and variation; wafer size is a fabrication metric, not a channel-length or performance metric.",
    category: "Manufacturing",
    summary:
      "A 200 mm wafer-scale integration study addresses polycrystalline MoS₂ transistors and scalable processing.",
    question:
      "Can large-area uniformity, variability and integration meet practical manufacturing requirements?",
    boundary:
      "A research-scale integration result does not establish a commercially mature silicon replacement.",
    whyMatters:
      "Moves the discussion from an individual flake to material uniformity, device variation and integration across a wafer.",
    concept: "/foundations#characterization",
    conceptLabel: "Explore material characterization",
    challenge: "manufacturing",
  },
  {
    reference: "zhang2025",
    problem:
      "Moving a grown monolayer onto a device-compatible substrate can tear the film or leave polymer residues that alter interfaces.",
    demonstration:
      "Two-inch MoS₂ films are transferred using a sacrificial selenium layer. Photographs, optical microscopy and AFM compare film integrity and surface quality with PMMA-assisted transfer; fabricated FETs and logic circuits assess electrical usefulness.",
    novelty:
      "The removable intermediate layer separates adhesion during peeling from cleanliness after transfer. The full figure below links the process to actual specimens, rather than using a wafer photograph as proof of circuit yield.",
    figure: "zhang-transfer",
    category: "Manufacturing",
    summary:
      "A selenium-assisted dry-transfer approach moves wafer-scale monolayer MoS₂ onto device-compatible substrates while preserving film integrity and clean interfaces.",
    question:
      "How can wafer-scale transfer preserve both structural integrity and electrical performance?",
    boundary:
      "The results belong to the study's films, devices and processing conditions; they do not establish universal MoS₂ performance or commercial manufacturing readiness.",
    whyMatters:
      "Connects material characterization and interface quality with the manufacturing challenge of transferring ultrathin semiconductor films.",
    concept: "/foundations#characterization",
    conceptLabel: "Explore surface and structure measurements",
    challenge: "manufacturing",
  },
  {
    reference: "guo2026",
    problem:
      "Defects and device variation accumulate when many MoS₂ transistors must operate as an interconnected processor.",
    demonstration:
      "Fully interconnected microprocessor research circuits are built through coordinated design, material growth/transfer, fabrication and testing.",
    novelty:
      "An iterative towards-foundry strategy treats circuit architecture and fabrication yield as a coupled problem. The engineering lesson is system integration, not a claim of superiority to current silicon processors.",
    category: "Circuits",
    summary:
      "An iterative approach coordinates circuit design, material growth and transfer, fabrication and testing to build interconnected MoS₂-based microprocessor circuits.",
    question:
      "How do fabrication yield and device variability affect increasingly complex 2D circuits?",
    boundary:
      "A research demonstration, not evidence that MoS₂ outperforms present-day silicon processors. Reported comparisons involve early Intel CPUs.",
    whyMatters:
      "Shows why useful circuits require coordinated improvements in yield and integration beyond a successful individual transistor.",
    concept: "/device#working-principle",
    conceptLabel: "Revisit the transistor building block",
    challenge: "manufacturing",
  },
  {
    reference: "fan2026",
    category: "Circuits",
    summary:
      "A bit-parallel MoS₂ research computer connects 1,433 transistors through multi-level co-optimization.",
    problem:
      "Device variability and defects can prevent an otherwise promising transistor technology from producing a functioning computer.",
    demonstration:
      "The study combines a 0.5 μm industrial fabrication process with academic back-end integration and four metal interconnect levels.",
    novelty:
      "Co-optimization across process, device and circuit levels makes system function the demonstration, beyond an isolated transistor metric.",
    question:
      "How can yield, interconnects and variation be controlled as circuit complexity increases?",
    boundary:
      "A research computer, not a production-qualified modern CPU. The process feature size is not an atomic-scale gate claim; publisher images remain linked only.",
    whyMatters:
      "Shows why contacts, materials and interconnects must work together for useful computing.",
    concept: "/device#working-principle",
    conceptLabel: "Revisit circuit building blocks",
    challenge: "manufacturing",
  },
  {
    reference: "wang2026",
    category: "Scaling",
    summary:
      "A dual-self-aligned vertical device uses a graphene edge as a sub-1 nm gate and oblique deposition to define a separate 10 nm MoS₂ channel.",
    problem:
      "Gate/channel alignment becomes difficult when target dimensions are smaller than straightforward lithographic patterning can resolve.",
    demonstration:
      "Graphene thickness sets the physical sidewall-gate dimension. Etching and oblique Bi/Pd deposition define and align the vertical MoS₂ channel; microscopy and measured geometry support the fabrication route.",
    novelty:
      "Two self-alignment steps separate the physical gate dimension from channel-length definition. The full figure combines process schematics with TEM, SEM and measured deposition-angle dependence.",
    figure: "wang-scaling",
    question:
      "Can alignment, contact pitch and ultrathin-channel integrity remain reproducible across integrated devices?",
    boundary:
      "Measured 10 nm devices and quantum-transport scaling projections are distinct. The paper's projected 5 nm limit is not a device calculation performed by NanoLab's long-channel simulator.",
    whyMatters:
      "Makes precise geometry and electrostatics central to the scaling question; a tiny gate dimension alone is not a complete device benchmark.",
    concept: "/foundations#quantum",
    conceptLabel: "Review confinement and model boundaries",
    challenge: "scaling",
  },
  {
    reference: "lin2026",
    category: "Scaling",
    summary:
      "A citable early-version study reports wafer-scale monolayer MoS₂ devices with sub-5 nm channels, using air-gap isolation and gate/contact overlap for electrostatic control.",
    problem:
      "Drain influence becomes increasingly difficult to suppress when the physical channel is only a few nanometres long.",
    demonstration:
      "The publisher's early-version abstract describes sub-5 nm channels on a four-inch wafer platform using a photolithography-compatible process.",
    novelty:
      "Co-designs gate/contact overlap and air-gap isolation to manage fields at short channel dimensions.",
    question:
      "What do full bias-dependent measurements and device statistics establish about the proposed scaling approach?",
    boundary:
      "Early version checked 12 October 2026; final figures and production metadata can change. The headline comparison with scaled silicon is not a claim of sub-60 mV/dec room-temperature switching. Numerical performance is not imported into this model.",
    whyMatters:
      "Links material thickness to device electrostatics while requiring geometry, bias and subthreshold extraction conditions to interpret scaling claims.",
    concept: "/why-mos2#layer-evidence",
    conceptLabel: "Review thin-body electrostatics",
    challenge: "scaling",
  },

  {
    reference: "wong2026",
    category: "Devices",
    summary: "Carbon-dot assembly assists HfO₂ integration on MoS₂.",
    question:
      "How can an oxide grow continuously on a chemically inert basal surface?",
    boundary:
      "EOT is capacitance-equivalent; the conceptual diagrams do not reproduce a fabricated device or measured current curve.",
    whyMatters: "Connects interface chemistry with gate-stack engineering.",
    concept: "/discoveries/mos2-interface-breakthrough",
    conceptLabel: "Explore the interface",
    challenge: "interfaces",
    problem: "Sparse nucleation sites complicate ultrathin oxide deposition.",
    demonstration:
      "An insulating carbon-dot assembly supports ultrathin HfO₂ growth.",
    novelty: "Engineers the interfacial layer as part of the gate stack.",
  },
  {
    reference: "yang-stacking2026",
    category: "Materials",
    summary:
      "Engineered bilayer registry supports a direct gap in CVD-grown 1H MoS₂.",
    question: "How does atomic alignment affect a bilayer's bands?",
    boundary:
      "The public abstract does not establish that every bilayer is direct-gap or provide an exact structure for this viewer.",
    whyMatters: "Makes stacking a materials design variable.",
    concept: "/lab#mos2",
    conceptLabel: "Inspect ideal stacking",
    challenge: "interfaces",
    problem:
      "Conventional bilayers are usually interpreted through an indirect-gap picture.",
    demonstration:
      "Photoemission, calculations and optical measurements support the engineered alignment.",
    novelty:
      "Connects a controlled growth sequence with a specific bilayer electronic structure.",
  },
  {
    reference: "yang-contacts2026",
    category: "Devices",
    summary:
      "Operando cross-sectional STM/STS probes current injection near a Bi/MoS₂ contact.",
    question: "What region of the contact injects carriers into the channel?",
    boundary:
      "Transfer length is contact-specific and is not the gate or channel length.",
    whyMatters:
      "Contact scaling requires a measurement of injection, not only electrode dimensions.",
    concept: "/device",
    conceptLabel: "Inspect the contacts",
    challenge: "contacts",
    problem: "Nanoscale injection regions are difficult to probe directly.",
    demonstration:
      "Cross-sectional measurements resolve the contact transfer region.",
    novelty:
      "Provides spatial evidence alongside model-based contact characterization.",
  },
  {
    reference: "kim-stretch2026",
    category: "Devices",
    summary:
      "MoS₂ flake networks retain transport pathways as the device stretches.",
    question: "How can a deformable network maintain electrical connectivity?",
    boundary:
      "Interflake motion does not imply uniform stretching of Mo–S bonds; device history and contacts remain important.",
    whyMatters: "Connects thin-film architecture with deformable electronics.",
    concept: "/challenges",
    conceptLabel: "Explore engineering limits",
    challenge: "interfaces",
    problem:
      "A stretchable transistor needs a mechanically connected semiconductor and electrodes.",
    demonstration:
      "Relative flake motion accommodates strain in the channel network.",
    novelty:
      "Uses network organization rather than a homogeneous single-crystal strain assumption.",
  },
];
