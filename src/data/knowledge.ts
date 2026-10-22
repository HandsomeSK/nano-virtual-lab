export const knowledge = [
  {
    id: "nanoscale",
    title: "Understanding the Nanoscale",
    theory:
      "A nanometre is one billionth of a metre. Nanotechnology often concerns dimensions around 1–100 nm, where surfaces and quantum behaviour can become especially important.",
    connectionTitle: "Why does size change behaviour?",
    connection:
      "Smaller particles expose more surface per volume. For atomically thin MoS₂, exposed surfaces and interfaces are especially important; the spherical model below is a geometric analogy.",
    href: "/challenges#interfaces",
    link: "Explore interfaces",
    reference: "assets",
  },
  {
    id: "quantum",
    title: "Quantum Mechanics & Energy Bands",
    theory:
      "Electrons have wave-like behaviour. Confinement restricts allowed states. In a solid, the periodic lattice potential organizes electron states into energy bands, sometimes separated by forbidden gaps. A semiconductor can modulate carrier density for switching.",
    connectionTitle: "From allowed states to switching",
    connection:
      "A band gap is an energy interval without allowed states in an ideal crystal. It helps a gate suppress carrier density, while contacts, defects and architecture determine the actual OFF current.",
    href: "/why-mos2#band-gap",
    link: "Explore why the gap matters",
    reference: "quantum",
  },
  {
    id: "graphene-structure",
    title: "Structure of Graphene",
    theory:
      "Graphene is a single layer of carbon atoms arranged in a honeycomb lattice. Two carbon sites form the repeating basis; strong in-plane bonds create an atomically thin sheet.",
    connectionTitle: "One sheet, several carbon structures",
    connection:
      "Stacking graphene-like sheets gives graphite; rolling a sheet provides a geometric picture of a carbon nanotube. Structure changes electronic behaviour: nanotubes can be metallic or semiconducting depending on how the sheet is rolled.",
    href: "/foundations#graphene-electronics",
    link: "Explore graphene electronics",
    reference: "neto2009",
  },
  {
    id: "graphene-electronics",
    title: "Electronic Properties of Graphene",
    theory:
      "Near the K and K′ points, ideal monolayer graphene has approximately linear energy–wave-vector dispersion. Its bands meet at the Dirac point. Clean graphene can support high mobility and long mean free paths, creating opportunities for high-speed electronics.",
    connectionTitle: "A natural next question",
    connection:
      "Moving charge efficiently and switching a digital transistor to a low-leakage OFF state are different goals. Explore how graphene’s zero gap motivates interest in semiconducting 2D materials.",
    href: "/why-mos2#zero-gap",
    link: "From graphene to MoS₂",
    reference: "neto2009",
  },
  {
    id: "characterization",
    title: "Nanomaterial Characterization",
    theory:
      "Imaging, spectroscopy and electrical measurements answer different questions. The right technique depends on whether you need morphology, atomic structure, local electronic states or transport.",
    connectionTitle: "Choose evidence for your question",
    connection:
      "AFM can help identify thin flakes; TEM can investigate atomic structure. Optical spectroscopy and electrical measurements provide complementary evidence.",
    href: "/why-mos2#characterization",
    link: "Study MoS₂ characterization",
    reference: "mak2010",
  },
  {
    id: "transistors",
    title: "From Materials to Transistors",
    connectionTitle: "Build on the material picture",
    theory:
      "A field-effect transistor has source and drain contacts connected by a semiconductor channel. A gate acts through an insulating dielectric to control channel charge.",
    connection:
      "A MoS₂ FET combines an atomically thin semiconductor with contacts and a gate stack. Every interface contributes to the behaviour of the complete device.",
    href: "/device",
    link: "Explore Device",
    reference: "mosfet",
  },
] as const;
