import test from "node:test";
import assert from "node:assert/strict";
import * as THREE from "three";
import { changeDeviceStructure, deviceStructureFromHash } from "../src/lib/science/device-state.ts";
import { buildScientificModel } from "../src/components/science/build-scene.ts";

const base = {
  selected: "channel", hidden: [], exploded: false, separation: 0,
  unitCell: false, labels: true, on: false, assembly: 0, touchOrbit: false,
  deviceStructure: "standard",
};

test("old device and interface hashes open the correct state of the merged model", () => {
  for (const hash of ["#transistor", "#interactive-device"])
    assert.equal(deviceStructureFromHash(hash), "standard");
  for (const hash of ["#interface-engineering", "#interactive-stack"])
    assert.equal(deviceStructureFromHash(hash), "with-carbon");
  assert.equal(deviceStructureFromHash("#graphene"), null);
  assert.equal(deviceStructureFromHash("#%E0%A4%A"), null);
  assert.equal(deviceStructureFromHash("#interactive%2Dstack"), "with-carbon");
});

test("structure changes preserve channel and controls and discard only a removed interface", () => {
  const active = { ...base, deviceStructure: "with-carbon", selected: "gate", hidden: ["source", "interface"], on: true, exploded: true, touchOrbit: true };
  const changed = changeDeviceStructure(active, "without-carbon");
  assert.equal(changed.selected, "gate");
  assert.deepEqual(changed.hidden, ["source"]);
  assert.equal(changed.on, true);
  assert.equal(changed.exploded, true);
  assert.equal(changed.touchOrbit, true);
  assert.equal(changeDeviceStructure(changed, "without-carbon"), changed);
  const removed = changeDeviceStructure({ ...active, selected: "interface" }, "standard");
  assert.equal(removed.selected, "dielectric");
  assert.deepEqual(removed.hidden, ["source"]);
  assert.equal(changeDeviceStructure(removed, "with-carbon").selected, "dielectric");
});

test("one built device reuses all meshes while switching oxide morphology and interface", () => {
  const model = buildScientificModel({ kind: "device", interface: false });
  const original = [...model.root.children];
  const meshes = [];
  model.root.traverse((object) => { if (object instanceof THREE.Mesh) meshes.push(object); });
  const group = (id) => model.root.children.find((object) => object.children.some((child) => child.userData.part === id));
  const dielectric = group("dielectric");
  const continuous = dielectric.children.find((object) => object instanceof THREE.Mesh && !(object instanceof THREE.InstancedMesh));
  const islands = dielectric.children.find((object) => object instanceof THREE.InstancedMesh);
  const interfaceLayer = group("interface");
  const gate = group("gate");
  const initialGateY = gate.position.y;
  const display = { explosion: 0, separation: 0, assembly: 1 };
  try {
    for (const structure of ["standard", "without-carbon", "with-carbon", "without-carbon", "standard"]) {
      model.update({ ...base, deviceStructure: structure, on: true, hidden: ["source"] }, display);
      assert.equal(continuous.visible, structure !== "without-carbon", "Standard is continuous; only the research control shows islands");
      assert.equal(islands.visible, structure === "without-carbon");
      assert.equal(interfaceLayer.visible, structure === "with-carbon");
      assert.equal(group("source").visible, false);
      assert.ok(Math.abs(gate.position.y - initialGateY - (structure === "with-carbon" ? 0.08 : 0)) < 1e-8);
      assert.deepEqual(model.root.children, original);
      const currentMeshes = [];
      model.root.traverse((object) => { if (object instanceof THREE.Mesh) currentMeshes.push(object); });
      assert.deepEqual(currentMeshes, meshes, "display changes must not replace geometry or allocate a second model");
    }
    model.update({ ...base, deviceStructure: "with-carbon", selected: "interface", hidden: ["interface"] }, display);
    assert.equal(interfaceLayer.visible, false);
    model.update({ ...base, deviceStructure: "with-carbon", selected: "interface", exploded: true }, { ...display, explosion: 1 });
    assert.equal(interfaceLayer.visible, true);
    assert.ok(interfaceLayer.position.y > group("channel").position.y);
  } finally {
    model.dispose();
  }
});
