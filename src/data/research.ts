export const researchCategories = [
  "Materials",
  "Devices",
  "Scaling",
  "Circuits",
  "Manufacturing",
] as const;
export const studies = [
  {
    reference: "mak2010",
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
    category: "Scaling",
    summary:
      "A carbon-nanotube gate enables a MoS₂ research transistor with a physical gate length of 1 nm.",
    question:
      "What controls transport and electrostatics as gate dimensions approach the atomic scale?",
    boundary:
      "Physical gate length differs from effective channel length. The long-channel teaching simulator does not reproduce this device.",
    whyMatters:
      "Connects atomically thin channels with the challenge of preserving gate control at very small dimensions.",
    concept: "/foundations#quantum",
    conceptLabel: "Review quantum confinement",
    challenge: "scaling",
  },
  {
    reference: "tang2023",
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
] as const;
