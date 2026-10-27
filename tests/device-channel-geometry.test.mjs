import test from "node:test";
import assert from "node:assert/strict";
import * as THREE from "three";
import { buildScientificModel } from "../src/components/science/build-scene.ts";
import { createAtomicStructure } from "../src/lib/science/atomic-structure.ts";
import { deviceParts } from "../src/data/device.ts";

test("the smaller device patch preserves every displayed atom and bond from the original patch", () => {
  const channel = deviceParts.find((part) => part.id === "channel");
  const original = createAtomicStructure("mos2", 1, "2H", 7);
  const kept = new Set(
    original.atoms.flatMap((atom, index) =>
      Math.abs(atom.position[0] * 0.21) < channel.w / 100 - 0.12 &&
      Math.abs(atom.position[2] * 0.21) < channel.d / 100 - 0.12
        ? [index]
        : [],
    ),
  );
  const expectedBonds = original.bonds.filter((bond) => kept.has(bond.a) && kept.has(bond.b));
  const model = buildScientificModel({ kind: "device", interface: false });
  const matrix = new THREE.Matrix4();
  const point = new THREE.Vector3();
  function close(actual, expected) {
    assert.ok(actual.distanceTo(expected) < 1e-6, `${actual.toArray()} != ${expected.toArray()}`);
  }
  try {
    assert.equal(model.atomCount, kept.size);
    assert.equal(model.bondCount, expectedBonds.length);
    assert.equal(model.atomCount, 123);
    assert.equal(model.bondCount, 220);
    const group = model.root.children.find((child) =>
      child.children.some((mesh) => mesh.isInstancedMesh && mesh.userData.part === "channel"),
    );
    const atomMeshes = group.children.filter((mesh) => mesh.isInstancedMesh && mesh.geometry.type === "SphereGeometry");
    assert.equal(atomMeshes.length, 2);
    for (const [index, element] of ["Mo", "S"].entries()) {
      const expected = original.atoms.filter((atom, atomIndex) => kept.has(atomIndex) && atom.element === element);
      const mesh = atomMeshes[index];
      assert.equal(mesh.count, expected.length);
      expected.forEach((atom, atomIndex) => {
        mesh.getMatrixAt(atomIndex, matrix);
        close(point.setFromMatrixPosition(matrix), new THREE.Vector3(...atom.position).multiplyScalar(0.21));
        const scale = new THREE.Vector3().setFromMatrixScale(matrix);
        close(scale, new THREE.Vector3().setScalar(element === "Mo" ? 0.125 : 0.105));
      });
    }
    const sticks = group.children.find((mesh) => mesh.isInstancedMesh && mesh.geometry.type === "CylinderGeometry");
    assert.equal(sticks.count, expectedBonds.length);
    expectedBonds.forEach((bond, index) => {
      sticks.getMatrixAt(index, matrix);
      close(point.set(0, -0.5, 0).applyMatrix4(matrix), new THREE.Vector3(...original.atoms[bond.a].position).multiplyScalar(0.21));
      close(point.set(0, 0.5, 0).applyMatrix4(matrix), new THREE.Vector3(...original.atoms[bond.b].position).multiplyScalar(0.21));
    });
  } finally {
    model.dispose();
  }
});
