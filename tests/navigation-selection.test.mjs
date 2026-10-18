import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { runInNewContext } from "node:vm";
import * as React from "react";
import ts from "typescript";
import * as navigation from "../src/lib/navigation.ts";
import { fragmentId } from "../src/lib/navigation-scroll.ts";

const require = createRequire(import.meta.url);
const compiled = ts.transpileModule(
  readFileSync(new URL("../src/components/site-header.tsx", import.meta.url), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } },
).outputText;

// Exercise the actual menu callbacks and rendered props; browser focus/touch
// and hydration still require a real browser rather than this hook harness.
test("header section stays current after closing and reopening its category", () => {
  const states = [];
  let cursor = 0;
  let pathname = "/challenges";
  let hash = "#contacts";
  const compiledModule = { exports: {} };
  runInNewContext(compiled, {
    module: compiledModule, exports: compiledModule.exports,
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
      if (name === "@/lib/use-fragment") return { useFragment: () => fragmentId(hash) };
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
  function current(nodes) { return nodes.filter(({ props }) => props.href && props["aria-current"] === "location").map(({ props }) => props.href); }
  function toggle(nodes, path = "/challenges") { return nodes.find(({ props }) => props["data-submenu-toggle"] === path); }

  let nodes = render();
  assert.deepEqual(current(nodes), ["/challenges#contacts"]);
  toggle(nodes).props.onClick({ detail: 0 });
  nodes = render();
  assert.equal(toggle(nodes).props["aria-expanded"], true);
  nodes.find(({ props }) => props.href === "/challenges#interfaces").props.onClick();
  hash = "#%69nterfaces";
  nodes = render();
  assert.equal(toggle(nodes).props["aria-expanded"], false);
  assert.deepEqual(current(nodes), ["/challenges#interfaces"]);
  toggle(nodes).props.onClick({ detail: 0 });
  nodes = render();
  assert.equal(toggle(nodes).props["aria-expanded"], true);
  assert.deepEqual(current(nodes), ["/challenges#interfaces"], "reopening without another hash event retains selection");
  hash = "#contacts";
  assert.deepEqual(current(render()), ["/challenges#contacts"], "restored URL selects the earlier section");
  pathname = "/comparison"; hash = "#saved";
  nodes = render();
  assert.deepEqual(current(nodes), ["/comparison#saved"]);
  assert.equal(nodes.find(({ props }) => props.href === "/comparison").props["aria-current"], undefined);
  hash = "#missing";
  nodes = render();
  assert.deepEqual(current(nodes), []);
  assert.equal(nodes.find(({ props }) => props.href === "/comparison").props["aria-current"], "page");
});
