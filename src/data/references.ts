export type Reference = {
  id: string;
  title: string;
  authors: string;
  year: number;
  venue: string;
  category: "Paper" | "Learning resource" | "Course material" | "Data & assets";
  doi?: string;
  url?: string;
  note: string;
  status?: "Awaiting upload";
};
export const references: Reference[] = [
  {
    id: "mak2010",
    title: "Atomically Thin MoS₂: A New Direct-Gap Semiconductor",
    authors: "K. F. Mak, C. Lee, J. Hone, J. Shan & T. F. Heinz",
    year: 2010,
    venue: "Physical Review Letters 105, 136805",
    category: "Paper",
    doi: "10.1103/PhysRevLett.105.136805",
    url: "https://web.stanford.edu/group/heinz/publications/Pub173.pdf",
    note: "Optical evidence for the indirect-to-direct transition with decreasing layer number. Optical transition energies are not interchangeable with quasiparticle gaps.",
  },
  {
    id: "radis2011",
    title: "Single-layer MoS₂ transistors",
    authors:
      "B. Radisavljevic, A. Radenovic, J. Brivio, V. Giacometti & A. Kis",
    year: 2011,
    venue: "Nature Nanotechnology 6, 147–150",
    category: "Paper",
    doi: "10.1038/nnano.2010.279",
    url: "https://www.nature.com/articles/nnano.2010.279",
    note: "A specific monolayer device demonstration, not universal mobility or switching performance. Provides the approximately 0.65 nm monolayer thickness and 1.8 eV band-gap context used here.",
  },
  {
    id: "desai2016",
    title: "MoS₂ transistors with 1-nanometer gate lengths",
    authors: "S. B. Desai et al.",
    year: 2016,
    venue: "Science 354, 99–102",
    category: "Paper",
    doi: "10.1126/science.aah4698",
    url: "https://foundry.lbl.gov/2016/10/16/mos2-transistors-with-1-nanometer-gate-lengths/",
    note: "A carbon-nanotube gate research device. Physical gate length is distinct from effective channel length; the teaching simulator does not reproduce this experiment.",
  },
  {
    id: "tang2023",
    title: "Low power flexible monolayer MoS₂ integrated circuits",
    authors: "J. Tang et al.",
    year: 2023,
    venue: "Nature Communications",
    category: "Paper",
    doi: "10.1038/s41467-023-39390-9",
    url: "https://www.nature.com/articles/s41467-023-39390-9",
    note: "A gate-first fabrication approach to integrated circuits on rigid and flexible substrates. V1 links the study without importing experimental datasets.",
  },
  {
    id: "kwon2024",
    title:
      "200-mm-wafer-scale integration of polycrystalline molybdenum disulfide transistors",
    authors: "J. Kwon et al.",
    year: 2024,
    venue: "Nature Electronics 7, 356–364",
    category: "Paper",
    doi: "10.1038/s41928-024-01158-4",
    url: "https://www.nature.com/articles/s41928-024-01158-4",
    note: "A wafer-scale integration study. Demonstrates manufacturing research rather than proving commercial replacement of silicon.",
  },
  {
    id: "quantum",
    title: "The Quantum Particle in a Box",
    authors: "OpenStax",
    year: 2016,
    venue: "University Physics Volume 3, Section 7.4",
    category: "Learning resource",
    url: "https://openstax.org/books/university-physics-volume-3/pages/7-4-the-quantum-particle-in-a-box",
    note: "Background for the infinite-well visualization. The free-electron well is not a quantitative MoS₂ band-structure calculation.",
  },
  {
    id: "mosfet",
    title: "Microelectronic Devices and Circuits — Lecture Notes",
    authors: "C. Fonstad / MIT OpenCourseWare",
    year: 2009,
    venue: "6.012, Fall 2009; Lectures 10–11",
    category: "Learning resource",
    url: "https://ocw.mit.edu/courses/6-012-microelectronic-devices-and-circuits-fall-2009/pages/lecture-notes/",
    note: "Background for gradual-channel transistor equations. V1 adapts a long-channel square-law model and adds a symmetric series-resistance correction; it is not calibrated to a MoS₂ experiment.",
  },
  {
    id: "course",
    title: "MECH6045 — Lectures 1–6",
    authors: "Course teaching materials",
    year: 2026,
    venue: "Nanotechnology: Fundamentals and Applications",
    category: "Course material",
    status: "Awaiting upload",
    note: "Lecture files have not been supplied. Foundations currently presents general introductory physics; course-specific wording, figures and lecture mapping will be added only after review.",
  },
  {
    id: "assets",
    title: "NanoLab diagrams, model defaults & interface assets",
    authors: "Project-created educational material",
    year: 2026,
    venue: "NanoLab: Beyond Silicon V1",
    category: "Data & assets",
    url: "https://github.com/HandsomeSK/nano-virtual-lab",
    note: "Original SVG/CSS schematics; not to scale. Default mobility, threshold, width and capacitance are illustrative assumptions, not measured data. Approximate everyday length examples are illustrative; actual specimens vary. AI-generated design concepts guided the interface; no publisher figures were copied.",
  },
];
export function referenceNumber(id: string) {
  return references.findIndex((ref) => ref.id === id) + 1;
}
export function referenceHref(id: string, from: string) {
  return (
    "/about?" + new URLSearchParams({ ref: id, from }).toString() + "#ref-" + id
  );
}
