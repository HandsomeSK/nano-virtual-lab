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

function load(window, useSyncExternalStore) {
  function evaluate(source) {
    const compiledModule = { exports: {} };
    runInNewContext(source, {
      module: compiledModule, exports: compiledModule.exports, window,
      require: (name) => {
        if (name.endsWith(".module.css")) return {};
        if (name === "./navigation-scroll") return { fragmentId };
        if (name === "@/lib/use-fragment") return evaluate(compiledHook);
        if (name === "react" && useSyncExternalStore) return { useSyncExternalStore };
        return require(name);
      },
    });
    return compiledModule.exports;
  }
  return evaluate(compiled).PageContents;
}

test("contents retain server-rendered native numbered links without reading browser state", () => {
  const html = renderToStaticMarkup(createElement(load(), { groups }));
  assert.match(html, /<nav[^>]*aria-label="On this page"/);
  assert.match(html, /href="#nanoscale"/);
  assert.match(html, /href="#energy-bands"/);
  assert.match(html, /01/);
  assert.match(html, /02/);
  assert.doesNotMatch(html, /aria-current|tabindex|<button/);
});

test("contents keep the URL selection after focus or scroll changes and restore deep links and history", () => {
  const events = new EventTarget();
  const window = {
    location: { hash: "#%65nergy-bands" },
    addEventListener: events.addEventListener.bind(events),
    removeEventListener: events.removeEventListener.bind(events),
  };
  let store;
  const Contents = load(window, (subscribe, snapshot, serverSnapshot) => {
    store = { subscribe, snapshot, serverSnapshot };
    return snapshot();
  });
  const render = () => renderToStaticMarkup(Contents({ groups }));
  const active = () => [...render().matchAll(/<a href="([^"]+)" aria-current="location"/g)].map((match) => match[1]);
  assert.deepEqual(active(), ["#energy-bands"], "encoded initial deep link");
  assert.equal(store.serverSnapshot(), "", "stable hydration snapshot");

  const observed = [];
  const unsubscribe = store.subscribe(() => observed.push(store.snapshot()));
  function navigate(hash, event) {
    window.location.hash = hash;
    events.dispatchEvent(new Event(event));
  }
  navigate("#nanoscale", "hashchange");
  assert.deepEqual(active(), ["#nanoscale"], "native or synthetic hash notification");
  events.dispatchEvent(new Event("focusout"));
  events.dispatchEvent(new Event("scroll"));
  assert.deepEqual(active(), ["#nanoscale"], "selection does not depend on focus or scroll position");
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
  assert.equal(observed.length, count, "both event listeners are removed");
});
