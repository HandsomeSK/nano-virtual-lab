// Editorial source cutoff, not an assertion that this is every/latest paper.
export const researchCutoff = "2026-10-21";
export const interfaceMeasurement = {
  reference: "wong2026",
  value: 0.6,
  uncertainty: 0.1,
  unit: "nm",
  name: "Equivalent oxide thickness",
  locator: "Paper abstract and Fig. 2; double-gate graphene test structures",
  context:
    "Graphene test-structure capacitance-equivalent SiO₂ thickness. The reported ± interval is not assigned a statistical meaning; this is not a MoS₂ layer thickness.",
} as const;
export const discoveryThemes = [
  {
    id: "interfaces",
    number: "01",
    title: "The interface becomes a design variable",
    reference: "wong2026",
    date: "7 October 2026",
    label: "Dielectric integration",
    question:
      "How do you grow a continuous oxide on a surface with few dangling bonds?",
    finding:
      "Carbon-dot assembly assists HfO₂ growth on MoS₂; graphene test structures give the reported 0.6 ± 0.1 nm hybrid EOT.",
    meaning:
      "The relevant object is the complete gate stack: semiconductor, interface and dielectric.",
    limit:
      "Equivalent thickness does not establish physical thickness, wafer yield or manufacturing readiness.",
    href: "/discoveries/mos2-interface-breakthrough",
    action: "Explore the interface breakthrough",
  },
  {
    id: "stacking",
    number: "02",
    title: "A second sheet changes the question",
    reference: "yang-stacking2026",
    date: "23 September 2026",
    label: "Stacking & bands",
    question:
      "Does adding a layer inevitably turn MoS₂ into an indirect-gap material?",
    finding:
      "A two-step CVD process engineers 1H bilayer alignment. Photoemission, calculations and optical measurements support a direct gap in this particular stack.",
    meaning:
      "Layer count is only part of the description. Atomic registry also shapes the band structure.",
    limit:
      "This is an engineered bilayer, not a universal result for conventional 2H bilayers. Exact reconstructed coordinates are not inferred from an abstract.",
    href: "/lab#mos2",
    action: "Inspect ideal stacking",
  },
  {
    id: "contacts",
    number: "03",
    title: "The contact has a length scale of its own",
    reference: "yang-contacts2026",
    date: "1 July 2026",
    label: "Contact injection",
    question:
      "Where does current actually transfer between a metal contact and the channel?",
    finding:
      "Room-temperature operando cross-sectional STM/STS probes carrier transfer in bismuth-contacted monolayer MoS₂, reporting a transfer length near 2.0 nm.",
    meaning:
      "A geometric electrode boundary does not describe the full injection region.",
    limit:
      "Transfer length depends on the specific contact and bias conditions. It is not gate length or channel length.",
    href: "/device",
    action: "Inspect the contacts",
  },
  {
    id: "scaling",
    number: "04",
    title: "Smaller dimensions demand clearer definitions",
    reference: "lin2026",
    secondaryReference: "wang2026",
    date: "July–September 2026",
    label: "Scaling & electrostatics",
    question:
      "What is getting smaller: the gate, the channel or the circuit pitch?",
    finding:
      "An accepted early-version abstract reports 88 mV/dec for sub-5 nm channels; a separate study combines a sub-1 nm graphene gate with a 10 nm channel.",
    meaning:
      "Gate geometry, drain fields and fabrication alignment must work together.",
    limit:
      "The early abstract does not provide all bias, temperature and extraction conditions. Its 88 mV/dec is not below the ideal room-temperature 60 mV/dec thermionic limit; an ångström gate is not an ångström channel.",
    href: "/research?study=lin2026#catalogue",
    action: "Compare the scaling studies",
  },
  {
    id: "stretchable",
    number: "05",
    title: "A flexible device needs more than a thin crystal",
    reference: "kim-stretch2026",
    date: "20 January 2026",
    label: "Deformable electronics",
    question:
      "How can a semiconductor channel keep a connected path as a device stretches?",
    finding:
      "MoS₂ flake networks accommodate strain through relative flake motion and persistent interconnections.",
    meaning:
      "Useful deformation can emerge from network architecture rather than uniform atomic-bond strain.",
    limit:
      "Film uniformity, contact cracks and deformation history still affect device reliability. This atomic viewer does not solve mechanics.",
    href: "/challenges",
    action: "Explore engineering limits",
  },
  {
    id: "integration",
    number: "06",
    title: "A transistor is a beginning, not a processor",
    reference: "guo2026",
    date: "2026",
    label: "Circuit integration",
    question:
      "Can many devices be fabricated, connected and operated reproducibly?",
    finding:
      "Foundry-oriented fully interconnected 2D microprocessor research connects device fabrication with routing and circuit operation.",
    meaning:
      "Integration turns a material result into a system-level engineering problem.",
    limit:
      "Research circuit demonstrations and institutional 300 mm announcements do not prove commercial mass production.",
    href: "/research?study=guo2026#catalogue",
    action: "Explore the integration study",
  },
] as const;
