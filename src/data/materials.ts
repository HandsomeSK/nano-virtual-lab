export type MaterialId = "mos2" | "graphene" | "silicon";
export const materials: Record<
  MaterialId,
  {
    name: string;
    structure: string;
    band: string;
    gap: string;
    strength: string;
    limitation: string;
    reference: string;
  }
> = {
  mos2: {
    name: "MoS₂",
    structure: "1H S–Mo–S monolayer; trigonal-prismatic Mo coordination",
    band: "Direct-gap monolayer; conventional 2H bulk has an indirect gap",
    gap: "Reported monolayer optical response near 1.8–1.9 eV; onset and PL peak differ, and neither is the quasiparticle gap",
    strength: "An ultrathin channel with a finite gap; promising gate control.",
    limitation:
      "Contacts, defects and dielectric integration remain device-level challenges.",
    reference: "mak2010",
  },
  graphene: {
    name: "Graphene",
    structure: "A single honeycomb layer of carbon",
    band: "Pristine graphene: zero-gap semimetal",
    gap: "No intrinsic gap in pristine monolayer graphene",
    strength:
      "High mobility and long mean free paths in suitable conditions; opportunities in fast transport, analogue and sensing devices.",
    limitation:
      "A missing gap makes a low OFF current challenging for digital switching.",
    reference: "neto2009",
  },
  silicon: {
    name: "Silicon",
    structure: "Three-dimensional covalent crystal",
    band: "Indirect-gap semiconductor",
    gap: "Finite gap; depends on temperature",
    strength: "A mature materials, manufacturing and circuit ecosystem.",
    limitation:
      "Continued scaling requires complex electrostatics and integration.",
    reference: "mosfet",
  },
};
