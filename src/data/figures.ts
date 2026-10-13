export type FigureId =
  | "graphene-lattice"
  | "graphene-hrtem"
  | "mos2-phases"
  | "macucci-device"
  | "shimazu-hysteresis"
  | "zhang-transfer"
  | "zeng-dielectric"
  | "wang-scaling";

export type ScientificImage = {
  id: FigureId;
  title: string;
  kind: "Scientific illustration" | "Microscopy" | "Experimental figure";
  imageUrl: string;
  width?: number;
  height?: number;
  sourceUrl: string;
  authors: string;
  doi?: string;
  figureNumber?: string;
  license: string;
  licenseUrl: string;
  attribution: string;
  modification: string;
  alt: string;
  caption: string;
};

export const figures: Record<FigureId, ScientificImage> = {
  "graphene-lattice": {
    id: "graphene-lattice",
    title: "Graphene honeycomb lattice",
    kind: "Scientific illustration",
    imageUrl:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/10/Graphene.svg/960px-Graphene.svg.png",
    width: 960,
    height: 1042,
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Graphene.svg",
    authors: "J_Alves / OpenClipArt",
    license: "CC0 1.0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    attribution:
      "Graphene.svg by J_Alves, via Wikimedia Commons; dedicated to the public domain under CC0 1.0.",
    modification:
      "Full illustration; Wikimedia's 960 × 1042 px PNG rendering, as listed on the original Commons file page. Display size only; no scientific annotations added.",
    alt: "Perspective illustration of carbon atoms connected in a graphene honeycomb lattice",
    caption:
      "The honeycomb structure has two carbon sites per primitive cell. This external illustration supports the lattice picture; it is not a microscopy image or a band-structure calculation.",
  },
  "graphene-hrtem": {
    id: "graphene-hrtem",
    title: "Graphene HRTEM micrograph",
    kind: "Microscopy",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/7/7d/Graphene_HRTEM.jpg",
    width: 1024,
    height: 1024,
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Graphene_HRTEM.jpg",
    authors: "materialesnano.com / Materialesnano2",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    attribution:
      "Graphene HRTEM.jpg by materialesnano.com (Materialesnano2), Wikimedia Commons, CC BY-SA 3.0.",
    modification:
      "Full 1024 × 1024 px image, as listed on the original Commons file page; uncropped and unannotated. Display resizing/format optimization only. The image retains its CC BY-SA 3.0 licence.",
    alt: "High-resolution transmission electron micrograph described by its creator as graphene",
    caption:
      "A real HRTEM image, as identified by its creator. The Commons record does not provide a complete preparation or measurement protocol: this image alone does not establish monolayer identity, carrier mobility or a zero band gap.",
  },
  "mos2-phases": {
    id: "mos2-phases",
    title: "Crystal structures of the 1T and 2H phases of MoS₂",
    kind: "Scientific illustration",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/b/ba/Crystal_structures_of_the_1T_and_2H_phases_of_MoS2.png",
    width: 2707,
    height: 1522,
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Crystal_structures_of_the_1T_and_2H_phases_of_MoS2.png",
    authors: "Stephanmsutter",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    attribution:
      "Crystal structures of the 1T and 2H phases of MoS₂ by Stephanmsutter, Wikimedia Commons, CC BY-SA 4.0.",
    modification:
      "Full 2707 × 1522 px illustration, as listed on the original Commons file page; uncropped and unannotated. Display resizing/format optimization only. The image retains its CC BY-SA 4.0 licence.",
    alt: "Side-by-side crystallographic illustrations of layered 1T and 2H MoS₂ with sulfur and molybdenum atoms",
    caption:
      "View along the b axis, with two layers shown for each phase. Strong bonding is within each S–Mo–S sheet; adjacent sheets are weakly coupled. The 2H-derived semiconducting structure is the channel context here. This crystallographic illustration is not a micrograph.",
  },
  "macucci-device": {
    id: "macucci-device",
    title: "Experimental MoS₂ transistor and device structure",
    kind: "Microscopy",
    imageUrl:
      "https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41598-017-11930-6/MediaObjects/41598_2017_11930_Fig1_HTML.jpg",
    sourceUrl: "https://www.nature.com/articles/s41598-017-11930-6/figures/1",
    authors:
      "M. Macucci, G. Tambellini, D. Ovchinnikov, A. Kis, G. Iannaccone & G. Fiori",
    doi: "10.1038/s41598-017-11930-6",
    figureNumber: "Figure 1",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    attribution:
      "Figure 1 from Macucci et al., On current transients in MoS₂ Field Effect Transistors, Scientific Reports 7, 11575 (2017), CC BY 4.0.",
    modification:
      "Full original figure including its structure inset; uncropped and unannotated. Display resizing/format optimization only.",
    alt: "Micrograph of the MoS₂ transistor investigated by Macucci and colleagues, with an inset sketch of its device structure",
    caption:
      "A mechanically exfoliated monolayer MoS₂ channel, L = 1.7 μm and W = 4.3 μm, connects Au electrodes. Doped silicon is the global back gate beneath 270 nm SiO₂. The inset shows that arrangement. This is a separate research device, not a photograph of NanoLab's idealized top-gate model.",
  },
  "shimazu-hysteresis": {
    id: "shimazu-hysteresis",
    title: "Environmental dependence of measured MoS₂ transfer characteristics",
    kind: "Experimental figure",
    imageUrl:
      "https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fsrep30084/MediaObjects/41598_2016_Article_BFsrep30084_Fig1_HTML.jpg",
    sourceUrl: "https://www.nature.com/articles/srep30084/figures/1",
    authors: "Y. Shimazu, M. Tashiro, S. Sonobe & M. Takahashi",
    doi: "10.1038/srep30084",
    figureNumber: "Figure 1",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    attribution:
      "Figure 1 from Shimazu et al., Environmental Effects on Hysteresis of Transfer Characteristics in Molybdenum Disulfide Field-Effect Transistors, Scientific Reports 6, 30084 (2016), CC BY 4.0.",
    modification:
      "Full original four-panel figure, uncropped and unannotated; display resizing/format optimization only. Author scaling and offsets are retained.",
    alt: "Four-panel experimental figure showing a MoS₂ device and transfer-current hysteresis under different gas, humidity and pumping conditions",
    caption:
      "Panel a: optical device image. Panels b–d: measured transfer curves and sweep history in different environments. The 6 nm-thick MoS₂ device has L = 4.3 μm, W = 4.1 μm, Ti/Au contacts and a SiO₂/Si back gate. Measurements use VDS = 0.1 V at room temperature, with approximately 1 V/s gate sweeps. Some panel c curves were scaled and panel d curves offset by the authors; do not compare their displayed heights as absolute current values.",
  },
  "zhang-transfer": {
    id: "zhang-transfer",
    title: "Se-mediated transfer of a two-inch MoS₂ film",
    kind: "Experimental figure",
    imageUrl:
      "https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41467-025-59803-1/MediaObjects/41467_2025_59803_Fig1_HTML.png",
    sourceUrl: "https://www.nature.com/articles/s41467-025-59803-1/figures/1",
    authors: "X. Zhang, L. Zhou, S. Wang et al.",
    doi: "10.1038/s41467-025-59803-1",
    figureNumber: "Figure 1",
    license: "CC BY-NC-ND 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-nc-nd/4.0/",
    attribution:
      "Figure 1 from Zhang et al., Se-mediated dry transfer of wafer-scale 2D semiconductors for advanced electronics, Nature Communications 16, 4468 (2025), CC BY-NC-ND 4.0. Reproduced for non-commercial public science education.",
    modification:
      "Full original figure; no cropping, annotations, panel extraction or adaptation. Technical display resizing/format optimization only. Non-commercial use; no endorsement implied.",
    alt: "Complete published figure containing the selenium-assisted transfer process, two-inch MoS₂ film photographs, optical images and AFM comparisons",
    caption:
      "The complete figure combines a process schematic (a), photographs of the two-inch film during and after transfer (b–d), and optical/AFM comparisons for Se-mediated (e–f) and PMMA-assisted (g–h) transfer. These specimens and comparison methods belong to this study; a wafer photograph alone does not establish device yield or manufacturing qualification.",
  },
  "zeng-dielectric": {
    id: "zeng-dielectric",
    title:
      "Fabrication and characterization of crystalline Al₂O₃ — corrected figure",
    kind: "Experimental figure",
    imageUrl:
      "https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41586-024-08001-y/MediaObjects/41586_2024_8001_Fig1_HTML.png",
    sourceUrl: "https://www.nature.com/articles/s41586-024-08001-y/figures/1",
    authors: "D. Zeng, Z. Zhang, Z. Xue et al.",
    doi: "10.1038/s41586-024-07786-2",
    figureNumber: "Figure 1 (publisher correction: 10.1038/s41586-024-08001-y)",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    attribution:
      "Corrected Figure 1 from Zeng et al., Single-crystalline metal-oxide dielectrics for top-gate 2D transistors, Nature 632, 788–794 (2024); publisher correction, Nature 633, E5 (2024). CC BY 4.0.",
    modification:
      "Full corrected publisher figure, uncropped and unannotated; display resizing/format optimization only. The publisher corrected the c-Al₂O₃ 2 nm label in panel g.",
    alt: "Corrected full figure showing crystalline alumina fabrication, a four-inch substrate photograph, cross-sectional TEM and dielectric breakdown measurements",
    caption:
      "Fabrication schematic and four-inch template lift-off photograph (a–b), cross-sectional TEM and elemental mapping (c–e), oxide growth (f), and dielectric breakdown comparisons (g–h). These measurements probe dielectric structure and insulation; they do not establish the performance of every MoS₂ transistor.",
  },
  "wang-scaling": {
    id: "wang-scaling",
    title: "Self-aligned graphene-edge gate and MoS₂ channel fabrication",
    kind: "Experimental figure",
    imageUrl:
      "https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41467-026-75409-7/MediaObjects/41467_2026_75409_Fig1_HTML.png",
    sourceUrl: "https://www.nature.com/articles/s41467-026-75409-7/figures/1",
    authors: "Z. Wang, A. Liu, H. Ding et al.",
    doi: "10.1038/s41467-026-75409-7",
    figureNumber: "Figure 1",
    license: "CC BY-NC-ND 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-nc-nd/4.0/",
    attribution:
      "Figure 1 from Wang et al., Wafer-scale 2D MoS₂ transistors with self-aligned angstrom gate length and nanometer channel length, Nature Communications 17, 8556 (2026), CC BY-NC-ND 4.0. Reproduced for non-commercial public science education.",
    modification:
      "Full original figure; no cropping, annotations, panel extraction or adaptation. Technical display resizing/format optimization only. Non-commercial use; no endorsement implied.",
    alt: "Complete fabrication figure with graphene-edge gate schematics, sidewall TEM, channel SEM and measured channel-length versus deposition-angle data",
    caption:
      "A graphene sidewall edge defines the sub-1 nm physical gate dimension; oblique deposition defines a separate nanometre-scale MoS₂ channel. TEM/SEM panels f–g and the measured relation in h support the geometry. The two lengths are distinct, and the figure combines schematics with measured images and data.",
  },
};
