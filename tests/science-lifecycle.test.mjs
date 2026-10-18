import test from "node:test";
import assert from "node:assert/strict";
import * as THREE from "three";
import { observeSceneResidency } from "../src/components/science/scene-residency.ts";
import { buildScientificModel } from "../src/components/science/build-scene.ts";

test("scientific canvases load nearby, survive small scrolls, and release distant residency", () => {
  const observers = [];
  class Observer {
    constructor(callback, options) {
      this.callback = callback;
      this.options = options;
      observers.push(this);
    }
    observe(element) {
      this.element = element;
    }
    disconnect() {
      this.disconnected = true;
    }
    emit(isIntersecting) {
      this.callback([{ isIntersecting }]);
    }
  }
  const states = [];
  const element = {};
  const stop = observeSceneResidency(element, (resident) => states.push(resident), Observer);
  const [enter, retain] = observers;
  assert.equal(enter.element, element);
  assert.equal(retain.element, element);
  assert.equal(enter.options.rootMargin, "200px 0px");
  assert.equal(retain.options.rootMargin, "900px 0px");
  retain.emit(true);
  assert.deepEqual(states, [], "the wider retention zone must not eagerly load models");
  enter.emit(true);
  enter.emit(false);
  enter.emit(true);
  assert.deepEqual(states, [true], "crossing the entry boundary must not rebuild a resident canvas");
  retain.emit(false);
  retain.emit(true);
  assert.deepEqual(states, [true, false], "a distant model releases resources until it approaches again");
  enter.emit(true);
  assert.deepEqual(states, [true, false, true]);
  stop();
  assert.ok(observers.every((observer) => observer.disconnected));
  retain.emit(false);
  assert.deepEqual(states, [true, false, true], "queued observer callbacks cannot revive an unmounted stage");
});

const options = {
  selected: "molybdenum",
  hidden: [],
  exploded: false,
  separation: 0,
  unitCell: true,
  labels: true,
  on: false,
  assembly: 0,
  touchOrbit: false,
};

test("the bilayer primitive cell stays on its lower sheet as separation changes", () => {
  const model = buildScientificModel({ kind: "atomic", material: "mos2", layers: 2, stacking: "2H" });
  try {
    const cell = model.root.children.find((child) => child instanceof THREE.Line);
    const lowerMo = model.root.children.find((child) => child.children.some((mesh) => mesh.userData.part === "molybdenum"));
    assert.ok(cell && lowerMo);
    for (const separation of [0, 2, 6, 0]) {
      model.update(options, { explosion: 0, separation, assembly: 1 });
      assert.ok(Math.abs(cell.position.y - lowerMo.position.y) < 1e-10);
      assert.equal(cell.visible, true);
    }
  } finally {
    model.dispose();
  }
});

test("all four scientific model variants release mesh buffers and shared render resources once", () => {
  const specs = [
    { kind: "atomic", material: "graphene", layers: 1, stacking: "2H" },
    { kind: "atomic", material: "mos2", layers: 2, stacking: "3R" },
    { kind: "device", interface: false },
    { kind: "device", interface: true },
    { kind: "device", interface: false, roughOxide: true },
  ];
  for (const spec of specs) {
    const model = buildScientificModel(spec);
    const resources = new Set();
    model.root.traverse((object) => {
      if (object instanceof THREE.InstancedMesh) resources.add(object);
      if (object.geometry) resources.add(object.geometry);
      for (const material of [object.material].flat().filter(Boolean)) {
        resources.add(material);
        for (const value of Object.values(material)) {
          if (value instanceof THREE.Texture) resources.add(value);
        }
      }
    });
    const counts = new Map([...resources].map((resource) => [resource, 0]));
    for (const resource of resources) {
      resource.addEventListener("dispose", () => counts.set(resource, counts.get(resource) + 1));
    }
    assert.ok([...resources].some((resource) => resource instanceof THREE.InstancedMesh));
    if (spec.kind === "device") assert.ok([...resources].some((resource) => resource instanceof THREE.Texture));
    model.dispose();
    assert.equal(model.root.children.length, 0);
    assert.ok([...counts.values()].every((count) => count === 1), JSON.stringify(spec));
    model.dispose();
    assert.ok([...counts.values()].every((count) => count === 1), "cleanup must remain safe if repeated");
  }
});
