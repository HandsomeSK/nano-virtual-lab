// Ideal coordinates, in Å. Sphere radii are display sizes, not atomic radii.
// Sources: Castro Neto et al. (2009); Ridolfi et al. (2015), Fig. 1.
export type Point3 = [number, number, number];
export type AtomicMaterial = "graphene" | "mos2";
export type AtomKind = "carbon" | "molybdenum" | "sulfur-top" | "sulfur-bottom";
export type Atom = {
  position: Point3;
  kind: AtomKind;
  element: "C" | "Mo" | "S";
  layer: number;
  cell: [number, number];
};
export type Bond = { a: number; b: number };
export type AtomicStructure = {
  atoms: Atom[];
  bonds: Bond[];
  unitCell: Point3[];
  latticeConstant: number;
};
export const atomicColors: Record<AtomKind, string> = {
  carbon: "#85c6da",
  molybdenum: "#b49fea",
  "sulfur-top": "#e6c781",
  "sulfur-bottom": "#cda961",
};
export function distance(a: Point3, b: Point3) {
  return Math.hypot(...a.map((x, i) => x - b[i]));
}
export function createAtomicStructure(
  material: AtomicMaterial,
  layers: 1 | 2 = 1,
  stacking: "2H" | "3R" = "2H",
  radius = 3,
): AtomicStructure {
  const a = material === "graphene" ? 2.46 : 3.16;
  const shift: Point3 = [a / 2, 0, (a * Math.sqrt(3)) / 6];
  const atoms: Atom[] = [];
  const layerCount = material === "graphene" ? 1 : layers;
  for (let layer = 0; layer < layerCount; layer++) {
    const rotation = layer === 1 && stacking === "2H" ? -1 : 1;
    // Representative 2H bulk Mo-plane spacing, c/2 ≈ 6.15 Å. The 3R comparison
    // holds that spacing fixed to isolate registry, not a separate relaxation.
    const y = (layer - (layerCount - 1) / 2) * 6.15;
    for (let i = -radius; i <= radius; i++)
      for (let j = -radius; j <= radius; j++) {
        const x = a * (i + j / 2),
          z = (a * Math.sqrt(3) * j) / 2;
        const add = (
          element: Atom["element"],
          kind: AtomKind,
          offset: Point3,
        ) => {
          atoms.push({
            element,
            kind,
            layer,
            cell: [i, j],
            position: [
              rotation * (x + offset[0]) + (layer ? shift[0] : 0),
              y + offset[1],
              rotation * (z + offset[2]) + (layer ? shift[2] : 0),
            ],
          });
        };
        if (material === "graphene") {
          add("C", "carbon", [0, 0, 0]);
          add("C", "carbon", shift);
        } else {
          add("Mo", "molybdenum", [0, 0, 0]);
          add("S", "sulfur-top", [shift[0], 1.56, shift[2]]);
          add("S", "sulfur-bottom", [shift[0], -1.56, shift[2]]);
        }
      }
  }
  const bonds: Bond[] = [];
  const target =
    material === "graphene"
      ? a / Math.sqrt(3)
      : Math.hypot(a / Math.sqrt(3), 1.56);
  for (let i = 0; i < atoms.length; i++)
    for (let j = i + 1; j < atoms.length; j++) {
      if (atoms[i].layer !== atoms[j].layer) continue;
      if (
        material === "mos2" &&
        (atoms[i].element === "Mo") === (atoms[j].element === "Mo")
      )
        continue;
      if (
        Math.abs(distance(atoms[i].position, atoms[j].position) - target) < 0.02
      )
        bonds.push({ a: i, b: j });
    }
  const unitY = (-(layerCount - 1) * 6.15) / 2 + 0.025;
  const unitCell: Point3[] = [
    [0, unitY, 0],
    [a, unitY, 0],
    [a * 1.5, unitY, (a * Math.sqrt(3)) / 2],
    [a / 2, unitY, (a * Math.sqrt(3)) / 2],
    [0, unitY, 0],
  ];
  return { atoms, bonds, unitCell, latticeConstant: a };
}

export function carbonDetail(detail: "bond" | "coordination"): AtomicStructure {
  const sheet = createAtomicStructure("graphene");
  const center = sheet.atoms.findIndex(
    (atom) =>
      atom.cell[0] === 0 && atom.cell[1] === 0 && atom.position[0] === 0,
  );
  const neighbours = sheet.bonds
    .filter((bond) => bond.a === center || bond.b === center)
    .map((bond) => (bond.a === center ? bond.b : bond.a));
  const ids = [
    center,
    ...(detail === "bond" ? neighbours.slice(0, 1) : neighbours),
  ];
  const origin: Point3 = [0, 0, 0];
  ids.forEach((id) =>
    sheet.atoms[id].position.forEach((v, i) => {
      origin[i] += v / ids.length;
    }),
  );
  const atoms = ids.map((id) => ({
    ...sheet.atoms[id],
    position: sheet.atoms[id].position.map((v, i) => v - origin[i]) as Point3,
  }));
  return {
    atoms,
    bonds: neighbours
      .slice(0, ids.length - 1)
      .map((_, i) => ({ a: 0, b: i + 1 })),
    unitCell: [],
    latticeConstant: sheet.latticeConstant,
  };
}
