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
      "Physical gate length differs from effective channel length. The V1 long-channel simulator does not reproduce this device.",
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
    challenge: "manufacturing",
  },
] as const;
