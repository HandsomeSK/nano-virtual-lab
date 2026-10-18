// NanoLab explanations connect the source-backed findings in discoveries.ts.
export const researchDirections = [
  {
    id: "interfaces",
    label: "Dielectric Integration",
    mechanism:
      "The gate controls charge through an insulating stack. Increasing its capacitance can strengthen that control, but the interface must also avoid trapping charge or disturbing transport. MoS₂ exposes a largely saturated basal surface: the same lack of dangling bonds that makes the crystal attractive complicates uniform oxide nucleation.",
    challenge:
      "Seeding an oxide and transferring a preformed film solve different parts of this problem. A useful process must provide continuous coverage without adding damage, residues or a poorly insulating interlayer. Capacitance, leakage and stability therefore need to be assessed together.",
    next:
      "The engineering question is whether the complete stack keeps its electrical quality through subsequent processing and repeated operation. That connects interface chemistry directly to short-channel control and circuit reproducibility.",
    connectedId: "scaling",
    connectedLabel: "Scaling & Electrostatics",
    relatedHref: "/discoveries/mos2-interface-breakthrough",
    relatedLabel: "Examine the carbon-dot interface",
  },
  {
    id: "stacking",
    label: "Stacking & Band Structure",
    mechanism:
      "Adding a sheet changes which electronic states can interact across layers. Their overlap depends on atomic registry, so layer count alone cannot specify the bands. A direct gap places the band edges at the same crystal momentum; an indirect gap requires momentum to change during a band-edge optical transition.",
    challenge:
      "A chosen registry must be grown or assembled consistently and then identified experimentally. Optical emission, photoemission and calculation answer complementary questions; a bright optical signal alone does not establish transistor mobility or contact performance.",
    next:
      "The next engineering test is whether a controlled stack can retain its intended structure and useful electrical behaviour after contacts and dielectrics are added.",
    connectedId: "interfaces",
    connectedLabel: "Dielectric Integration",
    relatedHref: "/lab#mos2",
    relatedLabel: "Compare ideal layer registries in 3D",
  },
  {
    id: "contacts",
    label: "Contact Engineering",
    mechanism:
      "Carriers must enter the semiconductor before they can cross it. The metal–semiconductor interface and the region beneath the electrode determine how that injection occurs. Current can crowd near a contact edge, so the electrode's full footprint is not necessarily an equally active injection area.",
    challenge:
      "Reducing a contact footprint can restrict injection even when the exposed channel works well. Contact resistance and transfer length need their own measurements; a smaller channel does not automatically make either quantity smaller.",
    next:
      "A useful scaling strategy therefore co-designs the injection region and the channel. Spatial contact measurements help test assumptions that a resistance extracted from a complete transistor can leave hidden.",
    connectedId: "scaling",
    connectedLabel: "Scaling & Electrostatics",
    relatedHref: "/challenges#contacts",
    relatedLabel: "Explore the contact-resistance challenge",
  },
  {
    id: "scaling",
    label: "Scaling & Electrostatics",
    mechanism:
      "A transistor switches by letting the gate control the channel's potential barrier. As the channel shortens, the drain can influence that barrier more strongly. An atomically thin body helps gate control, but gate geometry, dielectric coupling, contact placement and alignment still determine the actual device.",
    challenge:
      "Scaling must specify which dimension changes. Physical gate length, source–drain channel length, contact transfer length and circuit pitch describe different objects. Comparing a tiny gate with another device's channel length obscures both the fabrication achievement and the transport problem.",
    next:
      "The sub-5 nm report is a citable early version whose final production details can change. Compare geometry together with bias-dependent switching, leakage and device statistics. NanoLab's long-channel simulator illustrates parameter trends; it cannot validate these ultrascaled architectures or their quantum-transport projections.",
    connectedId: "contacts",
    connectedLabel: "Contact Engineering",
    relatedHref: "/challenges#scaling",
    relatedLabel: "Explore short-channel effects",
  },
  {
    id: "stretchable",
    label: "Deformable Electronics",
    mechanism:
      "Bending and stretching impose different demands. A thin sheet can bend without every bond undergoing the strain needed to extend a flat sheet. A flake network offers another route: flakes can slide and rearrange while connected paths continue to carry charge.",
    challenge:
      "The full transistor must deform together. The channel, electrodes and dielectric must preserve electrical continuity and insulation, while repeated strain can change contacts and network junctions. A result at one applied strain is only part of a reliability assessment.",
    next:
      "The relevant next questions concern deformation history, device-to-device variation and the process used to connect many deformable transistors into a working circuit.",
    connectedId: "integration",
    connectedLabel: "Circuit Integration",
    relatedHref: "/research?study=kim-stretch2026#catalogue",
    relatedLabel: "Read the stretchable-device evidence",
  },
  {
    id: "integration",
    label: "Circuit Integration",
    mechanism:
      "A circuit needs devices to cooperate: thresholds and drive strengths affect logic levels, while contacts and interconnects carry signals between them. Variation that is tolerable in an isolated transistor can become a functional failure when many devices depend on one another.",
    challenge:
      "Growth, transfer, patterning and routing must preserve useful interfaces across many locations. Device yield, circuit-module yield and complete-system function are separate tests. A large wafer or a strong individual transfer curve cannot substitute for all three.",
    next:
      "The next engineering target is a reproducible process and circuit design supported by statistics, reliability and system-level testing. Material quality, contacts and dielectric integration become linked process choices.",
    connectedId: "interfaces",
    connectedLabel: "Dielectric Integration",
    relatedHref: "/challenges#manufacturing",
    relatedLabel: "Explore manufacturing & integration",
  },
] as const;

export const researchConnections = [
  {
    title: "Interface quality changes what the gate can control",
    explanation:
      "A larger gate capacitance can improve coupling, but charge trapped at the interface can also shift the apparent switching voltage or make it depend on sweep history. The useful target is strong coupling with stable charge response; a low EOT by itself is incomplete evidence.",
    reference: "shimazu2016",
    fromId: "interfaces",
    fromLabel: "Dielectric integration",
    toId: "scaling",
    toLabel: "Electrostatic control",
  },
  {
    title: "A shorter channel makes injection more important",
    explanation:
      "If channel resistance falls while the contacts remain resistive, a greater share of the applied voltage is lost at the contacts. Shrinking the channel then produces less benefit than its geometry suggests. Contact footprint and the region actually transferring carriers must be considered together.",
    reference: "mosfet",
    fromId: "contacts",
    fromLabel: "Contact engineering",
    toId: "scaling",
    toLabel: "Device scaling",
  },
  {
    title: "Crystal design has to survive device fabrication",
    explanation:
      "Registry gives an extra way to tune a layered material, but the finished device still needs clean interfaces and reproducible contacts. The research question becomes whether the structural choice remains useful after growth, transfer and gate-stack processing, rather than treating a band result as a complete device specification.",
    reference: "engineering2024",
    fromId: "stacking",
    fromLabel: "Stacking & bands",
    toId: "interfaces",
    toLabel: "Interface integration",
  },
  {
    title: "A working transistor must become a repeatable building block",
    explanation:
      "Circuit function depends on many devices and their connections. For deformable electronics, those connections must also survive motion. This makes process variation, interconnects and reliability shared questions across rigid and stretchable systems; improving a single headline metric cannot settle them.",
    reference: "guo2026",
    fromId: "stretchable",
    fromLabel: "Deformable devices",
    toId: "integration",
    toLabel: "Circuit integration",
  },
] as const;
