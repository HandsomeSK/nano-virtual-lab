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
    structure: "Semiconducting 2H phase; S–Mo–S monolayer",
    band: "Direct-gap in monolayer; indirect in bulk",
    gap: "Approximately 1.8 eV optical-gap context",
    strength: "An ultrathin channel with a finite gap; promising gate control.",
    limitation:
      "Contacts, defects and dielectric integration remain device-level challenges.",
    reference: "radis2011",
  },
  graphene: {
    name: "Graphene",
    structure: "A single honeycomb layer of carbon",
    band: "Pristine graphene: zero-gap semimetal",
    gap: "No intrinsic gap in pristine monolayer graphene",
    strength: "Excellent transport possibilities and an atomically thin sheet.",
    limitation:
      "A missing gap makes a low OFF current challenging for digital switching.",
    reference: "radis2011",
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
