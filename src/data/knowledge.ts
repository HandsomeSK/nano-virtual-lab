export const knowledge = [
  {
    id: "nanoscale",
    title: "Nanoscale & Nanotechnology",
    theory:
      "A nanometre is one billionth of a metre. Nanotechnology often concerns dimensions around 1–100 nm, where surfaces and quantum behaviour can become especially important.",
    connection:
      "An MoS₂ monolayer is approximately 0.65 nm thick. An atomically thin channel offers a different geometry for controlling charge.",
    href: "/why-mos2#meet-mos2",
    link: "Meet MoS₂",
    reference: "radis2011",
  },
  {
    id: "surfaces",
    title: "Size-Dependent Properties",
    theory:
      "For a sphere, surface area grows with diameter squared while volume grows with diameter cubed. Smaller particles therefore expose more surface per unit volume.",
    connection:
      "A sphere is only an analogy: the exposed surfaces of a 2D channel make interfaces, contamination and contacts central to device behaviour.",
    href: "/challenges#interfaces",
    link: "Explore interfaces",
    reference: "assets",
  },
  {
    id: "quantum",
    title: "Quantum Effects & Energy Bands",
    theory:
      "Electrons have wave-like behaviour. Confinement restricts allowed states; in solids, many states form bands separated by gaps. A useful semiconductor can modulate carrier density for switching.",
    connection:
      "MoS₂ has a finite band gap; pristine graphene is a zero-gap semimetal. This matters for switching, but a band gap alone does not determine a transistor’s performance.",
    href: "/why-mos2#materials",
    link: "Why the band gap matters",
    reference: "mak2010",
  },
  {
    id: "materials",
    title: "Carbon & 2D Materials",
    theory:
      "Graphene is one atomic layer of carbon. A MoS₂ monolayer contains a sulfur–molybdenum–sulfur unit. Strong bonds within a layer and weaker interactions between layers enable thin sheets.",
    connection:
      "Semiconducting 2H-MoS₂ belongs to the transition-metal dichalcogenides. Its material properties and graphene’s properties lead to different device opportunities.",
    href: "/why-mos2",
    link: "Explore the material choice",
    reference: "radis2011",
  },
  {
    id: "characterization",
    title: "Nanomaterial Characterization",
    theory:
      "Imaging, spectroscopy and electrical measurements answer different questions. The right technique depends on whether you need morphology, atomic structure, local electronic states or transport.",
    connection:
      "AFM can help identify thin flakes; TEM can investigate atomic structure. Optical spectroscopy and electrical measurements provide complementary evidence.",
    href: "/research",
    link: "See characterization in research",
    reference: "mak2010",
  },
  {
    id: "transistors",
    title: "From Nanomaterials to Transistors",
    theory:
      "A field-effect transistor has source and drain contacts connected by a semiconductor channel. A gate acts through an insulating dielectric to control channel charge.",
    connection:
      "A MoS₂ FET combines an atomically thin semiconductor with contacts and a gate stack. Every interface contributes to the behaviour of the complete device.",
    href: "/device",
    link: "Explore Device",
    reference: "mosfet",
  },
] as const;
