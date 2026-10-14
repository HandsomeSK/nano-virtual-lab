import type { FigureId } from "./figures";
import type { challenges } from "./challenges";

export const challengeChecks: Record<
  (typeof challenges)[number]["id"],
  {
    measurement: string;
    measurementReference: string;
    tradeoff: string;
    tradeoffReference: string;
  }
> = {
  contacts: {
    measurement:
      "Compare otherwise consistent devices with different channel lengths at low drain bias and the same carrier density. Transfer-length-method fitting separates channel resistance from the two-contact contribution. State whether a value describes one contact, both contacts, or a width-normalized resistance.",
    measurementReference: "benchmark2022",
    tradeoff:
      "A contact must inject efficiently at a small footprint and survive later processing. Low resistance before annealing does not establish thermal compatibility of the completed stack.",
    tradeoffReference: "engineering2024",
  },
  interfaces: {
    measurement:
      "Record forward and reverse gate sweeps with their rate, hold time and bias range; measure gate leakage separately from drain current. Compare like measurement conditions before attributing a change to the interface.",
    measurementReference: "benchmark2022",
    tradeoff:
      "Adsorbed molecules can change trapping and the apparent hysteresis. State humidity, gas environment and temperature: a narrow loop under one condition does not establish stability in another.",
    tradeoffReference: "shimazu2016",
  },
  scaling: {
    measurement:
      "Compare transfer curves at low and high drain bias. A drain-dependent threshold shift probes drain-induced barrier lowering; evaluate off-current and subthreshold behaviour too. Report physical gate length, channel length and contact dimensions separately.",
    measurementReference: "benchmark2022",
    tradeoff:
      "Reducing the gate dimension leaves less room for contacts and alignment. Higher device density requires the complete layout to shrink while gate control is preserved; a short gate is only one dimension.",
    tradeoffReference: "engineering2024",
  },
  manufacturing: {
    measurement:
      "Map threshold voltage, contact resistance and leakage across multiple devices and wafer positions. Report distributions, the number tested and explicit pass criteria. Film coverage alone cannot establish electrical uniformity or functional yield.",
    measurementReference: "lanza2020",
    tradeoff:
      "Track properties after growth, transfer and patterning. Residues, wrinkles and process-induced defects can change local behaviour, so assess the complete fabrication sequence rather than only the starting film.",
    tradeoffReference: "lanza2020",
  },
};

export const challengeEvidence: Record<
  string,
  {
    title: string;
    explanation: string;
    reference: string;
    figure: FigureId;
    boundary: string;
    source: string;
  }
> = {
  contacts: {
    title: "Research case: crystalline antimony contacts",
    explanation:
      "Du et al. use molecular-beam epitaxy to grow crystalline semimetallic antimony contacts on MoS₂ and investigate contact-length scaling. The interface and injection pathway must be engineered alongside the channel. A width-normalized contact value from that paper is not the simulator's lumped source-plus-drain resistance.",
    reference: "du2025",
    figure: "macucci-device",
    boundary:
      "The micrograph below illustrates contact/channel geometry in a separate 2017 Au-contact device; it is not Du's antimony-contact specimen or evidence of its resistance. Du's figures remain at the publisher. The 2026 author correction fixes duplicated reverse sweeps in Figure 4b and Supplementary Figure 18; consult the corrected article before interpreting hysteresis.",
    source: "https://www.nature.com/articles/s41928-025-01500-4",
  },
  interfaces: {
    title: "Research case: transferred crystalline oxide",
    explanation:
      "Zeng et al. form crystalline Al₂O₃ and transfer a prepared gate/contact stack onto MoS₂. Structural characterization and electrical measurements address oxide quality and interface integration together. This is a specific fabrication route; high permittivity or thinness alone cannot guarantee reliability.",
    reference: "zeng2024",
    figure: "zeng-dielectric",
    boundary:
      "The figure below is the publisher-corrected full Figure 1: panel g distinguishes crystalline c-Al₂O₃ from amorphous a-Al₂O₃. NanoLab fixes Cg and VT; it does not calculate the measured dielectric breakdown, trap density or leakage.",
    source: "https://www.nature.com/articles/s41586-024-07786-2",
  },
  scaling: {
    title: "Research case: self-aligned vertical geometry",
    explanation:
      "Wang et al. combine a graphene-edge gate with self-aligned deposition of source/drain contacts on a vertical MoS₂ channel. Gate dimension, channel length and contact pitch remain separate measures. Microscopy and geometry measurements support the process; quantum transport requires a more complete model.",
    reference: "wang2026",
    figure: "wang-scaling",
    boundary:
      "The reported sub-1 nm physical gate and measured 10 nm channel do not mean an angstrom-long measured channel. The simulator's ideal 1/L scaling is not a calculation of this structure or its short-channel leakage.",
    source: "https://www.nature.com/articles/s41467-026-75409-7",
  },
  manufacturing: {
    title: "Research case: cleaner wafer-scale transfer",
    explanation:
      "Zhang et al. use selenium as a sacrificial intermediate layer to transfer two-inch MoS₂ films. Photographs show film-scale handling; optical microscopy and AFM examine damage and residues. Electrical tests on fabricated devices and logic circuits are needed to connect material integrity with function.",
    reference: "zhang2025",
    figure: "zhang-transfer",
    boundary:
      "Film intactness, surface roughness and circuit yield are different metrics. A transferred wafer is an important process result, but it is not evidence of commercial qualification or uniform performance at every site.",
    source: "https://www.nature.com/articles/s41467-025-59803-1",
  },
};
