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
    note: "A gate-first fabrication approach to integrated circuits on rigid and flexible substrates. This platform links the study without importing experimental datasets.",
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
    note: "Background for gradual-channel transistor equations. The simulator adapts a long-channel square-law model with a symmetric series-resistance correction; it is not calibrated to a MoS₂ experiment.",
  },
  {
    id: "course",
    title: "MECH6045 — Nanotechnology: Fundamentals and Applications",
    authors: "Course teaching materials",
    year: 2026,
    venue: "Nanotechnology: Fundamentals and Applications",
    category: "Course material",
    note: "Course context for NanoLab. The project author identifies Lecture 2, pages 18–19, for energy bands and band gaps, and Lecture 3, page 26, for graphene electronic properties. Linked literature supports the scientific explanations.",
  },
  {
    id: "assets",
    title: "NanoLab diagrams, model defaults & interface assets",
    authors: "Project-created educational material",
    year: 2026,
    venue: "NanoLab: Beyond Silicon",
    category: "Data & assets",
    url: "https://github.com/HandsomeSK/nano-virtual-lab",
    note: "Original interactive SVG/CSS schematics; not to scale. The AI-generated homepage illustration is conceptual, not an atomistic calculation or microscopy image. Model defaults and everyday length examples are illustrative assumptions; actual specimens vary. No publisher figures or measured research datasets were imported.",
  },
  {
    id: "neto2009",
    title: "The electronic properties of graphene",
    authors:
      "A. H. Castro Neto, F. Guinea, N. M. R. Peres, K. S. Novoselov & A. K. Geim",
    year: 2009,
    venue: "Reviews of Modern Physics 81, 109–162",
    category: "Paper",
    doi: "10.1103/RevModPhys.81.109",
    url: "https://journals.aps.org/rmp/abstract/10.1103/RevModPhys.81.109",
    note: "Theory of graphene's structure, low-energy Dirac-like bands and transport. The cone describes states near K/K′, not the complete band structure. Disorder, substrates and layer number affect real samples.",
  },
  {
    id: "novoselov2004",
    title: "Electric Field Effect in Atomically Thin Carbon Films",
    authors:
      "K. S. Novoselov, A. K. Geim, S. V. Morozov, D. Jiang, Y. Zhang, S. V. Dubonos, I. V. Grigorieva & A. A. Firsov",
    year: 2004,
    venue: "Science 306, 666–669",
    category: "Paper",
    doi: "10.1126/science.1102896",
    url: "https://arxiv.org/abs/cond-mat/0410550",
    note: "Early atomically thin carbon field-effect devices, including 1–3-layer samples, with high mobility and submicron ballistic transport under the reported conditions. The measurements are not universal constants for every graphene device.",
  },
  {
    id: "novoselov2005",
    title: "Two-dimensional gas of massless Dirac fermions in graphene",
    authors:
      "K. S. Novoselov, A. K. Geim, S. V. Morozov, D. Jiang, M. I. Katsnelson, I. V. Grigorieva, S. V. Dubonos & A. A. Firsov",
    year: 2005,
    venue: "Nature 438, 197–200",
    category: "Paper",
    doi: "10.1038/nature04233",
    url: "https://www.nature.com/articles/nature04233",
    note: "Experimental evidence for Dirac-like carriers in monolayer graphene. The characteristic group velocity is approximately 10⁶ m/s; it is distinct from mobility and field-driven drift velocity. 'Massless' refers to the low-energy quasiparticle description.",
  },
  {
    id: "schwierz2010",
    title: "Graphene transistors",
    authors: "F. Schwierz",
    year: 2010,
    venue: "Nature Nanotechnology 5, 487–496",
    category: "Paper",
    doi: "10.1038/nnano.2010.89",
    url: "https://www.nature.com/articles/nnano.2010.89",
    note: "Reviews different requirements for logic and radiofrequency transistors, including band-gap engineering. High mobility alone does not establish good digital switching, and graphene remains relevant to other electronic applications.",
  },
  {
    id: "zhang2025",
    title:
      "Se-mediated dry transfer of wafer-scale 2D semiconductors for advanced electronics",
    authors: "X. Zhang, L. Zhou, S. Wang et al.",
    year: 2025,
    venue: "Nature Communications 16, 4468",
    category: "Paper",
    doi: "10.1038/s41467-025-59803-1",
    url: "https://www.nature.com/articles/s41467-025-59803-1",
    note: "Published 14 May 2025; publisher metadata and abstract checked. Selenium-assisted transfer addresses film integrity and interface cleanliness. Results belong to the reported films, processes and devices; no measured data are imported into the simulator.",
  },
  {
    id: "guo2026",
    title:
      "A towards-foundry strategy for creating fully interconnected two-dimensional microprocessors",
    authors: "Y. Guo, P. Zhang, Y. Liu et al.",
    year: 2026,
    venue: "Nature Electronics 9, 159–169",
    category: "Paper",
    doi: "10.1038/s41928-026-01573-9",
    url: "https://www.nature.com/articles/s41928-026-01573-9",
    note: "Published 26 February 2026; publisher metadata and abstract checked. A research demonstration linking fabrication yield with interconnected MoS₂ circuits. It does not establish superiority over present-day silicon processors.",
  },
  {
    id: "course-bands",
    title: "MECH6045 Lecture 2 — Energy Bands and Band Gap",
    authors: "Course teaching materials",
    year: 2026,
    venue: "Lecture 2, pages 18–19",
    category: "Course material",
    note: "Page reference supplied by the project author for the energy-band learning section. Scientific explanations use the linked literature; this entry is not a transcription of the lecture slides.",
  },
  {
    id: "course-graphene",
    title: "MECH6045 Lecture 3 — Electronic Properties of Graphene",
    authors: "Course teaching materials",
    year: 2026,
    venue: "Lecture 3, page 26",
    category: "Course material",
    note: "Page reference supplied by the project author for graphene's electronic properties and the learning route towards MoS₂. Scientific explanations use the linked graphene literature.",
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
