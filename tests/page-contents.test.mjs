import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { runInNewContext } from "node:vm";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";
import { fragmentId } from "../src/lib/navigation-scroll.ts";

const require = createRequire(import.meta.url);
const compiled = ts.transpileModule(
  readFileSync(new URL("../src/components/page-contents.tsx", import.meta.url), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } },
).outputText;
const compiledHook = ts.transpileModule(
  readFileSync(new URL("../src/lib/use-fragment.ts", import.meta.url), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS } },
).outputText;
const groups = [
  { title: "Learn", items: [{ id: "nanoscale", label: "Size scale", number: "01" }] },
  { title: "Explore", items: [{ id: "energy-bands", label: "Energy bands", number: "02" }] },
];

function load(window, overrides = {}, document, Node) {
  function evaluate(source) {
    const compiledModule = { exports: {} };
    runInNewContext(source, {
      module: compiledModule, exports: compiledModule.exports, window, document, Node,
      require: (name) => {
        if (name.endsWith(".module.css")) return {};
        if (name === "./navigation-scroll") return { fragmentId };
        if (name === "@/lib/use-fragment") return evaluate(compiledHook);
        if (name === "react") return { ...require(name), ...overrides };
        return require(name);
      },
    });
    return compiledModule.exports;
  }
  return evaluate(compiled).PageContents;
}

function eventHub() {
  const listeners = new Map();
  return {
    addEventListener(type, callback) {
      if (!listeners.has(type)) listeners.set(type, new Set());
      listeners.get(type).add(callback);
    },
    removeEventListener(type, callback) { listeners.get(type)?.delete(callback); },
    emit(type, event = {}) { for (const callback of listeners.get(type) ?? []) callback(event); },
    count(type) { return listeners.get(type)?.size ?? 0; },
  };
}

function harness() {
  const document = { ...eventHub(), activeElement: null };
  class Node {
    children = [];
    focuses = 0;
    contains(node) { return node === this || this.children.some((child) => child.contains(node)); }
    focus() { document.activeElement = this; this.focuses++; }
    blur() { document.activeElement = body; }
    querySelector() { return firstLink; }
  }
  const body = new Node();
  const drawer = new Node();
  const panel = new Node();
  const trigger = new Node();
  const firstLink = new Node();
  const outside = new Node();
  drawer.children = [trigger, panel];
  panel.children = [firstLink];
  document.activeElement = body;
  let fine = true;
  const window = {
    ...eventHub(),
    location: { hash: "" },
    matchMedia: () => ({ matches: fine }),
  };
  const slots = [];
  let cursor = 0;
  let pendingEffect;
  let effectDependencies;
  let cleanup;
  let store;
  const Contents = load(window, {
    useState(initial) {
      const key = cursor++;
      if (!(key in slots)) slots[key] = initial;
      return [slots[key], (value) => { slots[key] = typeof value === "function" ? value(slots[key]) : value; }];
    },
    useRef(initial) {
      const key = cursor++;
      return slots[key] ??= { current: initial };
    },
    useId: () => "test-contents-id",
    useCallback: (callback) => callback,
    useEffect(callback, dependencies) {
      // The production effect also depends on close, whose real useCallback identity is stable.
      if (!effectDependencies || effectDependencies[0] !== dependencies[0]) {
        pendingEffect = callback;
        effectDependencies = dependencies;
      }
    },
    useSyncExternalStore(subscribe, snapshot, serverSnapshot) {
      store = { subscribe, snapshot, serverSnapshot };
      return snapshot();
    },
  }, document, Node);
  function walk(element, predicate) {
    if (!element || typeof element !== "object") return null;
    if (predicate(element)) return element;
    for (const child of [element.props?.children].flat(Infinity)) {
      const found = walk(child, predicate);
      if (found) return found;
    }
    return null;
  }
  let tree;
  function render() {
    cursor = 0;
    tree = Contents({ groups });
    tree.props.ref.current = drawer;
    walk(tree, (item) => item.type === "nav").props.ref.current = panel;
    walk(tree, (item) => item.type === "button").props.ref.current = trigger;
    if (pendingEffect) {
      cleanup?.();
      cleanup = pendingEffect();
      pendingEffect = null;
    }
    return tree;
  }
  render();
  return {
    document, window, body, outside, drawer, panel, trigger, firstLink, render,
    get root() { return tree; },
    get nav() { return walk(tree, (item) => item.type === "nav"); },
    get button() { return walk(tree, (item) => item.type === "button"); },
    get link() { return walk(tree, (item) => item.type === "a"); },
    get store() { return store; },
    get open() { return tree.props["data-open"]; },
    setFine(value) { fine = value; },
    clickButton(detail = 1) {
      trigger.focus();
      this.button.props.onClick({ detail });
      render();
    },
    leave(pointerType = "mouse") {
      tree.props.onPointerLeave({ pointerType });
      render();
    },
    dispose() { cleanup?.(); },
  };
}

const click = (extra = {}) => ({ button: 0, detail: 1, ...extra });

test("contents server-render all numbered native links in an initially hidden, inert controlled panel", () => {
  const html = renderToStaticMarkup(createElement(load(), { groups }));
  assert.match(html, /<aside[^>]*data-page-contents="true"[^>]*data-open="false"/);
  assert.match(html, /<button[^>]*aria-expanded="false"[^>]*aria-controls="([^"]+)"/);
  const controls = html.match(/aria-controls="([^"]+)"/)[1];
  assert.ok(html.includes(`<nav id="${controls}" aria-label="On this page" hidden="" inert="">`));
  assert.match(html, /href="#nanoscale"/);
  assert.match(html, /href="#energy-bands"/);
  assert.match(html, /01/);
  assert.match(html, /02/);
  assert.doesNotMatch(html, /aria-current|aria-modal|role="dialog"/);
});

test("mouse click opens without moving focus; selecting a native anchor retains the panel until pointer leave", () => {
  const h = harness();
  h.clickButton();
  assert.equal(h.open, true);
  assert.equal(h.nav.props.hidden, false);
  assert.equal(h.nav.props.inert, false);
  assert.equal(h.document.activeElement, h.trigger);
  assert.equal(h.firstLink.focuses, 0);
  h.root.props.onPointerDown({ pointerType: "mouse" });
  const activation = click({ defaultPrevented: true }); // the shared capture-phase fragment handler owns navigation
  h.link.props.onClick(activation);
  h.window.location.hash = "#nanoscale";
  h.document.activeElement = h.outside; // the shared fragment manager focuses the target
  h.render();
  assert.equal(h.open, true);
  h.leave();
  assert.equal(h.open, false);
  assert.equal(h.button.props["aria-expanded"], false);
  assert.equal(h.nav.props.hidden, true);
  assert.equal(h.nav.props.inert, true);
  h.clickButton();
  assert.equal(h.link.props["aria-current"], "location", "selection is retained after collapse and reopening");
  h.dispose();
});

test("keyboard opening focuses the first link, survives mouse leave, and closes on Escape or focus leaving", () => {
  const h = harness();
  h.clickButton(0);
  assert.equal(h.document.activeElement, h.firstLink);
  h.leave();
  assert.equal(h.open, true, "mouse movement cannot hide keyboard focus");
  h.root.props.onBlur({ currentTarget: h.drawer, relatedTarget: h.trigger });
  h.render();
  assert.equal(h.open, true, "focus within the drawer keeps it expanded");
  let prevented = false;
  h.document.emit("keydown", { key: "Escape", preventDefault() { prevented = true; } });
  h.render();
  assert.equal(prevented, true);
  assert.equal(h.open, false);
  assert.equal(h.document.activeElement, h.trigger);
  assert.equal(h.document.count("keydown"), 0);
  assert.equal(h.document.count("pointerdown"), 0);
  h.clickButton(0);
  h.outside.focus();
  h.root.props.onBlur({ currentTarget: h.drawer, relatedTarget: h.outside });
  h.render();
  assert.equal(h.open, false);
  assert.equal(h.document.activeElement, h.outside, "leaving by Tab does not steal focus");
  h.dispose();
});

test("outside activation closes, inside activation stays open, and listeners are removed on unmount", () => {
  const h = harness();
  h.clickButton();
  assert.equal(h.document.count("keydown"), 1);
  assert.equal(h.document.count("pointerdown"), 1);
  h.document.emit("pointerdown", { target: h.firstLink });
  h.render();
  assert.equal(h.open, true);
  h.document.emit("pointerdown", { target: h.outside });
  h.render();
  assert.equal(h.open, false);
  h.clickButton();
  h.dispose();
  assert.equal(h.document.count("keydown"), 0);
  assert.equal(h.document.count("pointerdown"), 0);
});

test("touch needs no hover, closes on section selection, and preserves modified-link browser behavior", () => {
  const h = harness();
  h.setFine(false);
  h.root.props.onPointerDown({ pointerType: "touch" });
  h.clickButton();
  h.leave("touch");
  h.leave("mouse");
  assert.equal(h.open, true, "coarse pointer movement cannot collapse the panel");
  h.link.props.onClick(click({ ctrlKey: true }));
  h.render();
  assert.equal(h.open, true, "modified links retain native behavior");
  h.link.props.onClick(click());
  h.render();
  assert.equal(h.open, false, "touch selection closes without waiting for pointer leave");
  h.clickButton();
  h.root.props.onKeyDown({ key: "Tab" });
  h.link.props.onClick(click({ detail: 0 }));
  h.render();
  assert.equal(h.open, true, "switching from touch to keyboard waits for focus to leave");
  h.dispose();
});

test("contents keep URL selection through focus, scroll, collapse, initial deep links and browser history", () => {
  const h = harness();
  const render = () => renderToStaticMarkup(h.render());
  const active = () => [...render().matchAll(/<a href="([^"]+)" aria-current="location"/g)].map((match) => match[1]);
  h.window.location.hash = "#%65nergy-bands";
  assert.deepEqual(active(), ["#energy-bands"], "encoded initial deep link");
  assert.equal(h.store.serverSnapshot(), "", "stable hydration snapshot");

  const observed = [];
  const unsubscribe = h.store.subscribe(() => observed.push(h.store.snapshot()));
  function navigate(hash, event) {
    h.window.location.hash = hash;
    h.window.emit(event);
  }
  navigate("#nanoscale", "hashchange");
  assert.deepEqual(active(), ["#nanoscale"]);
  h.window.emit("focusout");
  h.window.emit("scroll");
  assert.deepEqual(active(), ["#nanoscale"], "selection does not depend on focus or scroll");
  h.clickButton();
  h.leave();
  assert.deepEqual(active(), ["#nanoscale"], "collapsing the panel retains selection");
  navigate("#nanoscale", "hashchange");
  assert.deepEqual(active(), ["#nanoscale"], "repeat selection stays highlighted");
  navigate("#energy-bands", "popstate");
  assert.deepEqual(active(), ["#energy-bands"], "back or forward restores selected section");
  assert.deepEqual(observed, ["nanoscale", "nanoscale", "energy-bands"]);
  for (const hash of ["#missing", "#%E0%A4%A", ""]) {
    navigate(hash, "hashchange");
    assert.deepEqual(active(), [], `no stale selection for ${hash}`);
  }
  const count = observed.length;
  unsubscribe();
  navigate("#nanoscale", "hashchange");
  navigate("#energy-bands", "popstate");
  assert.equal(observed.length, count, "both fragment listeners are removed");
  h.dispose();
});
