import test from "node:test";
import assert from "node:assert/strict";
import {
  createAtomicStructure,
  distance,
  carbonDetail,
} from "../src/lib/science/atomic-structure.ts";
import {
  interfaceMeasurement,
  discoveryThemes,
} from "../src/data/discoveries.ts";
import { references } from "../src/data/references.ts";

test("carbon close-ups preserve the sheet's bond length and trigonal geometry", () => {
  const bond = carbonDetail("bond");
  assert.equal(bond.atoms.length, 2);
  assert.equal(bond.bonds.length, 1);
  assert.ok(
    Math.abs(distance(...bond.atoms.map((a) => a.position)) - 1.42) < 0.005,
  );
  const local = carbonDetail("coordination");
  assert.equal(local.atoms.length, 4);
  assert.equal(local.bonds.length, 3);
  const vectors = local.atoms
    .slice(1)
    .map((a) => a.position.map((v, i) => v - local.atoms[0].position[i]));
  for (let i = 0; i < vectors.length; i++) {
    assert.ok(Math.abs(Math.hypot(...vectors[i]) - 1.42) < 0.005);
    const cosine =
      vectors[i].reduce((sum, v, k) => sum + v * vectors[(i + 1) % 3][k], 0) /
      Math.hypot(...vectors[i]) /
      Math.hypot(...vectors[(i + 1) % 3]);
    assert.ok(Math.abs(cosine + 0.5) < 0.0001);
  }
});

test("graphene has a planar two-atom basis and three nearest neighbours per interior carbon", () => {
  const { atoms, bonds } = createAtomicStructure("graphene");
  const interior = atoms
    .map((a, i) => ({ a, i }))
    .filter(({ a }) => a.cell[0] === 0 && a.cell[1] === 0);
  assert.equal(interior.length, 2);
  assert.ok(atoms.every((a) => a.position[1] === 0 && a.element === "C"));
  for (const { i } of interior)
    assert.equal(bonds.filter((b) => b.a === i || b.b === i).length, 3);
  for (const { a, b } of bonds)
    assert.ok(
      Math.abs(distance(atoms[a].position, atoms[b].position) - 1.42) < 0.005,
    );
});
test("MoS₂ is one trigonal-prismatic S–Mo–S sheet with six S neighbours per Mo and no S–S bonds", () => {
  const { atoms, bonds } = createAtomicStructure("mos2");
  assert.equal(
    atoms.filter((a) => a.element === "S").length,
    atoms.filter((a) => a.element === "Mo").length * 2,
  );
  const centre = atoms.findIndex(
    (a) => a.element === "Mo" && a.cell[0] === 0 && a.cell[1] === 0,
  );
  const neighbours = bonds
    .filter((b) => b.a === centre || b.b === centre)
    .map((b) => atoms[b.a === centre ? b.b : b.a]);
  assert.equal(neighbours.length, 6);
  assert.equal(neighbours.filter((a) => a.position[1] === 1.56).length, 3);
  assert.equal(neighbours.filter((a) => a.position[1] === -1.56).length, 3);
  for (const top of neighbours.filter((a) => a.kind === "sulfur-top"))
    assert.ok(
      neighbours.some(
        (a) =>
          a.kind === "sulfur-bottom" &&
          a.position[0] === top.position[0] &&
          a.position[2] === top.position[2],
      ),
    );
  for (const { a, b } of bonds) {
    assert.notEqual(atoms[a].element, atoms[b].element);
    assert.ok(
      Math.abs(distance(atoms[a].position, atoms[b].position) - 2.4) < 0.01,
    );
  }
});
test("bilayer registry changes orientation while preserving sheet coordination and excluding interlayer covalent bonds", () => {
  const lower = createAtomicStructure("mos2", 1),
    twoH = createAtomicStructure("mos2", 2, "2H"),
    threeR = createAtomicStructure("mos2", 2, "3R");
  assert.equal(twoH.atoms.length, lower.atoms.length * 2);
  for (const structure of [twoH, threeR]) {
    assert.equal(structure.bonds.length, lower.bonds.length * 2);
    assert.ok(
      structure.bonds.every(
        (b) => structure.atoms[b.a].layer === structure.atoms[b.b].layer,
      ),
    );
  }
  const mo = (structure, i) =>
    structure.atoms.find(
      (a) =>
        a.layer === 1 &&
        a.element === "Mo" &&
        a.cell[0] === i &&
        a.cell[1] === 0,
    ).position;
  assert.ok(mo(twoH, 1)[0] - mo(twoH, 0)[0] < 0);
  assert.ok(mo(threeR, 1)[0] - mo(threeR, 0)[0] > 0);
});
test("2H places upper sulfur above lower molybdenum, while 3R places it above a molybdenum hollow site", () => {
  const sameProjection = (a, b) =>
    Math.hypot(a.position[0] - b.position[0], a.position[2] - b.position[2]) <
    1e-9;
  for (const stacking of ["2H", "3R"]) {
    const { atoms, latticeConstant } = createAtomicStructure("mos2", 2, stacking);
    const upperMo = atoms.find(
      (a) => a.layer === 1 && a.element === "Mo" && a.cell.every((v) => v === 0),
    );
    const upperS = atoms.find(
      (a) => a.layer === 1 && a.kind === "sulfur-bottom" && a.cell.every((v) => v === 0),
    );
    const lowerMo = atoms.filter((a) => a.layer === 0 && a.element === "Mo");
    const lowerS = atoms.filter((a) => a.layer === 0 && a.kind === "sulfur-top");
    assert.ok(lowerS.some((a) => sameProjection(a, upperMo)));
    assert.ok(Math.abs(upperMo.position[1] - lowerMo[0].position[1] - 6.15) < 1e-9);
    if (stacking === "2H") {
      assert.ok(lowerMo.some((a) => sameProjection(a, upperS)));
    } else {
      assert.ok(!lowerMo.some((a) => sameProjection(a, upperS)));
      const distances = lowerMo
        .map((a) => Math.hypot(a.position[0] - upperS.position[0], a.position[2] - upperS.position[2]))
        .sort((a, b) => a - b);
      assert.equal(
        distances.filter((d) => Math.abs(d - latticeConstant / Math.sqrt(3)) < 1e-9).length,
        3,
      );
    }
  }
});
test("featured evidence resolves primary citations and keeps EOT independent of geometric film thickness", () => {
  const ids = new Set(references.map((r) => r.id));
  for (const story of discoveryThemes) {
    assert.ok(ids.has(story.reference));
    if (story.secondaryReference) assert.ok(ids.has(story.secondaryReference));
  }
  assert.equal(interfaceMeasurement.name, "Equivalent oxide thickness");
  assert.equal(interfaceMeasurement.reference, "wong2026");
  assert.ok(
    interfaceMeasurement.uncertainty > 0 &&
      interfaceMeasurement.value > interfaceMeasurement.uncertainty,
  );
  assert.match(interfaceMeasurement.context, /Capacitance-equivalent/);
  assert.equal(
    references.filter((r) => r.doi === "10.1038/s41467-026-78053-3").length,
    1,
  );
});
