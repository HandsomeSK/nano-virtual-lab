export const challenges = [
  {
    id: "contacts",
    title: "Contact Resistance",
    tag: "Charge injection",
    summary:
      "Metal–semiconductor interfaces can limit current even when the channel itself conducts well.",
    cause:
      "Carriers must cross a metal–semiconductor interface. Injection barriers, surface chemistry and contact geometry can make that crossing resistive.",
    impact:
      "Part of the applied voltage drops at the contacts, leaving less voltage to drive the channel and reducing the external drain current.",
    modelBoundary:
      "The simulator represents both contacts as symmetric series resistances; it does not calculate bias-dependent Schottky injection.",
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
    cause:
      "Dielectric thickness and permittivity set gate coupling. Defects at the interface can trap charge, while an imperfect insulating layer can allow leakage.",
    impact:
      "Trapped charge can shift threshold voltage and cause hysteresis. Leakage and breakdown affect power consumption and reliability.",
    modelBoundary:
      "The simulator keeps gate capacitance and threshold fixed; it does not calculate traps, dielectric leakage or breakdown.",
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
    cause:
      "At small channel lengths, drain fields can influence the channel barrier and compete with the gate. Tunnelling and device geometry can also affect transport.",
    impact:
      "Weaker gate control can increase off-state leakage and change threshold behaviour. An atomically thin body offers opportunities, but does not remove every scaling problem.",
    modelBoundary:
      "The length control illustrates ideal 1/L scaling, not short-channel leakage. Physical gate length and effective channel length are distinct.",
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
    cause:
      "Growth, grain boundaries, transfer damage and patterning can create variation across a wafer. Every extra fabrication step must preserve the ultrathin material and its interfaces.",
    impact:
      "Variations in threshold, current and contact quality reduce circuit yield. A good single transistor does not guarantee that many connected devices work together.",
    modelBoundary:
      "Saved simulator configurations explore assumptions for one educational model; they do not calculate wafer variation or fabrication yield.",
    solution:
      "Improve uniform growth, cleaner transfer and repeatable integration; use characterization and circuit-level testing to track variability and yield.",
    foundation: "/foundations#characterization",
    research: "/research?category=Manufacturing",
    reference: "kwon2024",
    diagram: "Growth → patterning → integration → yield",
  },
] as const;
