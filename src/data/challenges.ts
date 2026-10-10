export const challenges = [
  {
    id: "contacts",
    title: "Contact Resistance",
    tag: "Charge injection",
    summary:
      "Metal–semiconductor interfaces can limit current even when the channel itself conducts well.",
    detail:
      "Injection barriers, interface chemistry and contact geometry affect resistance. A single ohmic resistor cannot describe bias-dependent Schottky injection.",
    solution:
      "Explore contact engineering, interface preparation and device-specific extraction of contact resistance.",
    foundation: "/foundations#surfaces",
    research: "/research?category=Devices",
    simulator: "/simulator?contactResistance=50#parameter-contactResistance",
    simLabel: "Try higher contact resistance",
    reference: "radis2011",
    diagram: "Metal → interface → MoS₂ channel",
  },
  {
    id: "interfaces",
    title: "Gate Dielectric & Interface",
    tag: "Electrostatic control",
    summary:
      "A thin gate stack must control charge while limiting leakage, traps and reliability problems.",
    detail:
      "Dielectric thickness, permittivity and interface states influence gate coupling and threshold stability. The simulator keeps capacitance and threshold fixed; it does not calculate traps or dielectric breakdown.",
    solution:
      "Investigate dielectric integration and passivation, then measure hysteresis and long-term stability.",
    foundation: "/foundations#transistors",
    research: "/research?category=Circuits",
    reference: "tang2023",
    diagram: "Gate → dielectric → channel charge",
  },
  {
    id: "scaling",
    title: "Short-Channel Effects",
    tag: "Shrinking dimensions",
    summary:
      "As a channel shrinks, drain fields can compete with the gate and weaken switching control.",
    detail:
      "Atomically thin channels offer electrostatic opportunities, but tunnelling, contacts and gate geometry still matter. Physical gate length and effective channel length are different quantities.",
    solution:
      "Study thin-body electrostatics, gate geometry and transport together. Quantitative nanoscale predictions require a more complete model.",
    foundation: "/foundations#quantum",
    research: "/research?category=Scaling",
    simulator: "/simulator?channelLength=100#parameter-channelLength",
    simLabel: "Explore the model's 1/L scaling",
    reference: "desai2016",
    diagram: "Gate control ↔ competing drain field",
  },
  {
    id: "manufacturing",
    title: "Manufacturing & Integration",
    tag: "From flakes to wafers",
    summary:
      "Useful circuits require uniform materials, repeatable contacts and processes compatible with integration.",
    detail:
      "Growth, grain boundaries, transfer, patterning and yield can introduce variation. A successful laboratory device is not evidence of a production-ready replacement for silicon.",
    solution:
      "Connect wafer-scale growth and integration studies with variability, yield and process-temperature requirements.",
    foundation: "/foundations#characterization",
    research: "/research?category=Manufacturing",
    reference: "kwon2024",
    diagram: "Growth → patterning → integration → yield",
  },
] as const;
