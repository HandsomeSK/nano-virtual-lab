import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { runInNewContext } from "node:vm";
import * as THREE from "three";
import { buildScientificModel } from "../src/components/science/build-scene.ts";
import * as types from "../src/components/science/types.ts";
import { deviceParts } from "../src/data/device.ts";

const require = createRequire(import.meta.url);
const React = require("react");
const ts = require("typescript");
const compiled = ts.transpileModule(
  readFileSync(new URL("../src/components/science/scientific-canvas.tsx", import.meta.url), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } },
).outputText;

// Real Three geometry; GPU and browser scheduling are controlled, not visually tested.
function createCanvasHarness({ constructFailure = false, renderFailure = false, compileFailure = false, compileThrows = false } = {}) {
  let hook = 0, pending = [], tree, sequence = 0, stateUpdates = 0;
  const slots = [], effects = [], raf = new Map(), timers = new Map(), records = [], observers = [];
  let resolveCompile;
  const compilation = new Promise((resolve) => { resolveCompile = resolve; });
  const events = () => ({
    handlers: new Map(),
    addEventListener(name, callback) { this.handlers.set(name, callback); },
    removeEventListener(name) { this.handlers.delete(name); },
  });
  const element = () => ({
    ...events(), style: {}, attributes: {}, dataset: {},
    clientWidth: 900, clientHeight: 470, children: [],
    setAttribute(name, value) { this.attributes[name] = value; },
    prepend(child) { this.children.unshift(child); },
    remove() { this.removed = true; },
  });
  const host = element(), annotation = element();
  const rendererInstances = [];
  class Renderer {
    constructor() {
      records.push("construct");
      if (constructFailure) throw new Error("WebGL blocked");
      this.domElement = element();
      this.shadowMap = {};
      this.renderLists = { dispose() { records.push("renderLists.dispose"); } };
      rendererInstances.push(this);
    }
    setPixelRatio() {}
    setSize() { records.push("size"); }
    compileAsync() {
      records.push("compile");
      if (compileThrows) throw new Error("synchronous shader failure");
      return compileFailure ? Promise.reject(new Error("shader failure")) : compilation;
    }
    render() {
      records.push("render");
      if (renderFailure) throw new Error("render failure");
    }
    dispose() { records.push("renderer.dispose"); }
    forceContextLoss() { records.push("context.loss"); }
  }
  class PMREM {
    fromScene() {
      return { texture: new THREE.Texture(), dispose() { records.push("environment.dispose"); } };
    }
    dispose() {}
  }
  class Room extends THREE.Scene { dispose() {} }
  class Controls {
    constructor() { this.target = new THREE.Vector3(); this.touches = {}; }
    update() {}
    addEventListener() {}
    removeEventListener() {}
    dispose() { records.push("controls.dispose"); }
  }
  class Observer {
    constructor(callback) { this.callback = callback; observers.push(this); }
    observe(element) { this.element = element; }
    disconnect() { this.disconnected = true; }
    emit(visible) { this.callback([{ isIntersecting: visible }]); }
  }
  class Resize {
    constructor(callback) { this.callback = callback; }
    observe() { this.callback(); }
    disconnect() {}
  }
  const media = { ...events(), matches: false };
  const compiledModule = { exports: {} };
  const SceneLoading = () => null;
  const SceneFallback = () => null;
  runInNewContext(compiled, {
    module: compiledModule, exports: compiledModule.exports,
    require(name) {
      if (name === "react") return {
        ...React,
        useId: () => "test-instructions",
        useRef(initial) {
          const i = hook++;
          return slots[i] ?? (slots[i] = { current: initial });
        },
        useState(initial) {
          const i = hook++;
          if (!(i in slots)) slots[i] = typeof initial === "function" ? initial() : initial;
          return [slots[i], (value) => {
            slots[i] = typeof value === "function" ? value(slots[i]) : value;
            stateUpdates++;
          }];
        },
        useEffect(callback, deps) {
          const i = hook++, prior = effects[i];
          if (!prior || !deps || deps.some((value, j) => value !== prior.deps[j])) {
            pending.push(() => {
              prior?.cleanup?.();
              effects[i] = { deps, cleanup: callback() };
            });
          }
        },
      };
      if (name === "three") return { ...THREE, WebGLRenderer: Renderer, PMREMGenerator: PMREM };
      if (name.includes("OrbitControls")) return { OrbitControls: Controls };
      if (name.includes("RoomEnvironment")) return { RoomEnvironment: Room };
      if (name === "animejs") return { animate: () => ({ cancel() {}, pause() {}, resume() {}, complete() {} }) };
      if (name === "./build-scene") return { buildScientificModel };
      if (name === "./types") return types;
      if (name === "./scene-fallback") return { SceneFallback };
      if (name === "./scene-loading") return { SceneLoading };
      if (name === "@/data/device") return { deviceParts };
      return require(name);
    },
    window: { ...events(), devicePixelRatio: 1 },
    document: { ...events(), hidden: false },
    requestAnimationFrame(callback) { const id = ++sequence; raf.set(id, callback); return id; },
    cancelAnimationFrame(id) { raf.delete(id); },
    setTimeout(callback) { const id = ++sequence; timers.set(id, callback); return id; },
    clearTimeout(id) { timers.delete(id); },
    matchMedia: () => media, IntersectionObserver: Observer, ResizeObserver: Resize,
    console, Promise,
  });
  let props = {
    spec: { kind: "atomic", material: "graphene", layers: 1, stacking: "2H" },
    options: {
      selected: "carbon", hidden: [], exploded: false, separation: 0,
      unitCell: false, labels: true, on: false, assembly: 0, touchOrbit: false,
    },
    camera: types.defaultCamera, onSelect() {}, onCameraChange() {},
  };
  function assignRefs(node) {
    if (!node?.props) return;
    const p = node.props;
    if (p.ref) p.ref.current = p.className === "scientific-canvas" ? host : annotation;
    for (const child of [p.children].flat()) assignRefs(child);
  }
  function render() {
    hook = 0;
    pending = [];
    tree = compiledModule.exports.default(props);
    assignRefs(tree);
    for (const effect of pending) effect();
    return tree;
  }
  function frame() {
    const batch = [...raf.values()];
    raf.clear();
    for (const callback of batch) callback(16);
  }
  function cleanup() {
    for (const effect of effects) effect?.cleanup?.();
  }
  return {
    render, frame, cleanup, records, observers, rendererInstances, resolveCompile,
    update(next) { props = { ...props, ...next }; return render(); },
    get stateUpdates() { return stateUpdates; },
    get tree() { return tree; },
    get rafCount() { return raf.size; },
    get timerCount() { return timers.size; },
    timeout() { const callbacks = [...timers.values()]; timers.clear(); for (const callback of callbacks) callback(); },
    get props() { return props; },
  };
}
function hasLoader(harness) {
  return [harness.tree.props?.children].flat().some(
    (child) => typeof child?.type === "function" && child.type.name === "SceneLoading",
  );
}
function initialize(harness) {
  harness.frame();
  harness.frame();
  harness.render();
  harness.observers.forEach((observer) => observer.emit(true));
}
async function settle() {
  await Promise.resolve();
  await Promise.resolve();
}

test("the loader covers deferred initialization and shader preparation until a frame actually renders", async () => {
  const harness = createCanvasHarness();
  try {
    harness.render();
    assert.ok(hasLoader(harness));
    assert.equal(harness.tree.props["aria-busy"], true);
    assert.equal(harness.records.includes("construct"), false, "allow the loading UI to paint before heavy work");
    harness.frame();
    assert.equal(harness.records.includes("construct"), false);
    initialize(harness);
    assert.ok(harness.records.includes("compile"));
    harness.frame();
    harness.render();
    assert.equal(harness.records.includes("render"), false, "do not render while shader preparation is pending");
    assert.ok(hasLoader(harness));
    harness.resolveCompile();
    await settle();
    harness.frame();
    harness.render();
    assert.ok(harness.records.includes("render"));
    assert.equal(hasLoader(harness), false);
    assert.equal(harness.tree.props["aria-busy"], false);
    assert.equal(harness.tree.props["data-webgl"], "ready");
    assert.equal(harness.timerCount, 0, "the first successful frame clears the preparation deadline");
    harness.update({ options: { ...harness.props.options, touchOrbit: true, labels: false } });
    harness.frame();
    assert.equal(harness.rendererInstances.length, 1, "ordinary controls must reuse the ready renderer");
    assert.equal(harness.rendererInstances[0].domElement.style.touchAction, "none");
    assert.equal(hasLoader(harness), false);
  } finally { harness.cleanup(); }
});

test("unmounting before initialization prevents WebGL creation", () => {
  const harness = createCanvasHarness();
  harness.render();
  harness.frame();
  harness.cleanup();
  harness.frame();
  assert.equal(harness.records.includes("construct"), false);
  assert.equal(harness.rafCount, 0);
});

test("a late shader result cannot render or update an unmounted canvas", async () => {
  const harness = createCanvasHarness();
  harness.render();
  initialize(harness);
  harness.cleanup();
  const updates = harness.stateUpdates;
  harness.resolveCompile();
  await settle();
  harness.frame();
  assert.equal(harness.records.includes("render"), false);
  assert.equal(harness.stateUpdates, updates);
  assert.equal(harness.rafCount, 0);
  assert.equal(harness.timerCount, 0);
  assert.equal(harness.records.filter((record) => record === "renderer.dispose").length, 1);
  assert.ok(harness.observers.every((observer) => observer.disconnected));
});

for (const [failure, expected] of [
  ["constructFailure", /WebGL|hardware acceleration/i],
  ["compileFailure", /3D|graphics|renderer|model/i],
  ["compileThrows", /3D|graphics|renderer|model/i],
  ["renderFailure", /3D|graphics|renderer|model/i],
]) {
  test(`${failure} replaces loading with an explanatory static fallback`, async () => {
    const harness = createCanvasHarness({ [failure]: true });
    try {
      harness.render();
      initialize(harness);
      harness.resolveCompile();
      await settle();
      harness.frame();
      harness.render();
      assert.equal(harness.tree.type.name, "SceneFallback");
      assert.match(harness.tree.props.message, expected);
      assert.equal(hasLoader(harness), false);
      assert.equal(harness.timerCount, 0);
      assert.equal(
        harness.records.filter((record) => record === "renderer.dispose").length,
        failure === "constructFailure" ? 0 : 1,
        "failed preparation must release an allocated renderer exactly once",
      );
    } finally { harness.cleanup(); }
  });
}


test("a stalled visible model exits loading with retry guidance", () => {
  const harness = createCanvasHarness();
  try {
    harness.render();
    initialize(harness);
    harness.timeout();
    harness.render();
    assert.equal(harness.tree.type.name, "SceneFallback");
    assert.match(harness.tree.props.message, /too long.*[Rr]eload/);
    assert.equal(harness.timerCount, 0);
  } finally { harness.cleanup(); }
});

test("an offscreen model keeps loading without treating deferred rendering as a fault", async () => {
  const harness = createCanvasHarness();
  try {
    harness.render();
    initialize(harness);
    harness.observers.forEach((observer) => observer.emit(false));
    harness.timeout();
    harness.render();
    assert.ok(hasLoader(harness));
    assert.equal(harness.timerCount, 1, "retry the readiness check after an offscreen interval");
    harness.resolveCompile();
    await settle();
    harness.frame();
    assert.equal(harness.records.includes("render"), false);
    harness.observers.forEach((observer) => observer.emit(true));
    harness.frame();
    harness.render();
    assert.equal(harness.tree.props["data-webgl"], "ready");
    assert.equal(hasLoader(harness), false);
  } finally { harness.cleanup(); }
});

test("graphics context loss replaces a ready model with the static fallback", async () => {
  const harness = createCanvasHarness();
  try {
    harness.render();
    initialize(harness);
    harness.resolveCompile();
    await settle();
    harness.frame();
    harness.render();
    let prevented = false;
    harness.rendererInstances[0].domElement.handlers.get("webglcontextlost")({
      preventDefault() { prevented = true; },
    });
    harness.render();
    assert.equal(prevented, true);
    assert.equal(harness.tree.type.name, "SceneFallback");
    assert.match(harness.tree.props.message, /context was lost/);
    assert.equal(harness.records.filter((record) => record === "renderer.dispose").length, 1);
  } finally { harness.cleanup(); }
});
