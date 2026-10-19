import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { runInNewContext } from "node:vm";
import * as React from "react";
import ts from "typescript";
import * as navigation from "../src/lib/navigation.ts";

const require = createRequire(import.meta.url);
const compiled = ts.transpileModule(
  readFileSync(new URL("../src/components/site-header.tsx", import.meta.url), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } },
).outputText;

// Exercise the actual menu callbacks and rendered props; browser focus/touch
// and hydration still require a real browser rather than this hook harness.
test("multi-page menus retain selection; single-page modules stay direct links", () => {
  const states = [];
  let cursor = 0;
  let pathname = "/research";
  const compiledModule = { exports: {} };
  runInNewContext(compiled, {
    module: compiledModule, exports: compiledModule.exports,
    matchMedia: () => ({ matches: true }),
    require: (name) => {
      if (name === "react") return {
        ...React,
        useState(initial) {
          const index = cursor++;
          if (!(index in states)) states[index] = initial;
          return [states[index], (next) => { states[index] = typeof next === "function" ? next(states[index]) : next; }];
        },
        useEffect() {}, useId: () => "menu", useRef: () => ({ current: null }),
      };
      if (name === "next/navigation") return { usePathname: () => pathname };
      if (name === "next/link") return { default: "a", __esModule: true };
      if (name === "@/lib/navigation") return navigation;
      if (name === "./brand") return { Brand: () => null };
      if (name === "./appreciation-button") return { AppreciationButton: () => null };
      return require(name);
    },
  });
  const { NanoNavigation } = compiledModule.exports;
  function elements(node) {
    if (Array.isArray(node)) return node.flatMap(elements);
    return React.isValidElement(node) ? [node, ...elements(node.props.children)] : [];
  }
  function render() { cursor = 0; return elements(NanoNavigation({})); }
  function panels(nodes) { return nodes.filter(({ props }) => props.className === "nav-submenu"); }
  function current(nodes) { return panels(nodes).flatMap(elements).filter(({ props }) => props.href && props["aria-current"] === "page").map(({ props }) => props.href); }
  function toggle(nodes, path = "/research") { return nodes.find(({ props }) => props["data-submenu-toggle"] === path); }

  let nodes = render();
  assert.equal(panels(nodes).length, 3);
  assert.equal(nodes.filter(({ props }) => props["data-submenu-toggle"]).length, 3);
  for (const { href } of navigation.navigationCategories.filter(({ links }) => links.length > 1)) {
    toggle(nodes, href).props.onClick({ detail: 0 });
    nodes = render();
    assert.equal(toggle(nodes, href).props["aria-expanded"], true);
    for (const panel of panels(nodes)) {
      const active = panel.props.id === toggle(nodes, href).props["aria-controls"];
      assert.equal(panel.props.inert, !active);
      assert.equal(panel.props["aria-hidden"], !active);
    }
    toggle(nodes, href).props.onClick({ detail: 0 });
    nodes = render();
    assert.equal(toggle(nodes, href).props["aria-expanded"], false);
  }
  assert.deepEqual(current(nodes), ["/research"]);
  toggle(nodes).props.onClick({ detail: 0 });
  nodes = render();
  assert.equal(toggle(nodes).props["aria-expanded"], true);
  panels(nodes).flatMap(elements).find(({ props }) => props.href === "/research").props.onClick();
  nodes = render();
  assert.equal(toggle(nodes).props["aria-expanded"], false);
  assert.deepEqual(current(nodes), ["/research"]);
  toggle(nodes).props.onClick({ detail: 0 });
  nodes = render();
  assert.equal(toggle(nodes).props["aria-expanded"], true);
  assert.deepEqual(current(nodes), ["/research"], "reopening retains the selected page");
  for (const path of ["/lab", "/challenges"]) {
    assert.equal(toggle(nodes, path), undefined);
    const category = nodes.find(({ props }) => props.className === "nav-category" && props.children[0].props.children[0].props.href === path);
    const link = category.props.children[0].props.children[0];
    let prevented = false;
    link.props.onKeyDown({ key: "ArrowDown", preventDefault() { prevented = true; } });
    assert.equal(prevented, false, "direct-link ArrowDown keeps native behavior");
    category.props.onPointerEnter({ pointerType: "mouse" });
    nodes = render();
    assert.equal(panels(nodes).some(({ props }) => !props.inert), false, "hovering a direct module closes the previous submenu");
    const burger = nodes.find(({ props }) => props.className?.startsWith("nano-burger"));
    burger.props.onClick();
    nodes = render();
    assert.equal(nodes.find(({ props }) => props.className?.startsWith("nano-burger")).props["aria-expanded"], true);
    link.props.onClick();
    pathname = path;
    nodes = render();
    assert.equal(nodes.find(({ props }) => props.className?.startsWith("nano-burger")).props["aria-expanded"], false, "direct navigation closes the mobile menu");
    assert.equal(nodes.find(({ props }) => props.href === path).props["aria-current"], "page");
    assert.deepEqual(current(nodes), [], "direct modules have no duplicate submenu entry");
  }
  pathname = "/comparison";
  nodes = render();
  assert.deepEqual(current(nodes), ["/comparison"]);
  assert.equal(nodes.find(({ props }) => props.className === "nav-category" && props["data-active"]).props.children[0].props.children[0].props.href, "/simulator");
  pathname = "/about";
  assert.deepEqual(current(render()), []);
});
