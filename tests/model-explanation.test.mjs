import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { runInNewContext } from "node:vm";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";

// This checks initial HTML semantics and content retention. Native disclosure
// interaction still requires a real browser rather than a simulated DOM shim.
const require = createRequire(import.meta.url);
const source = readFileSync(
  new URL("../src/components/model-explanation.tsx", import.meta.url),
  "utf8",
);
const compiledModule = { exports: {} };
runInNewContext(
  ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
  }).outputText,
  {
    module: compiledModule,
    exports: compiledModule.exports,
    require: (name) =>
      name.endsWith(".module.css")
        ? { explanation: "explanation", content: "content" }
        : require(name),
  },
);
const { ModelExplanation } = compiledModule.exports;

test("model explanations remain independently expandable without hydration, with complete cited content and keyboard scroll access", () => {
  const labels = ["Graphene", "MoS₂", "Transistor & interface"];
  const html = renderToStaticMarkup(
    createElement(
      "div",
      null,
      ...labels.map((label, index) =>
        createElement(
          ModelExplanation,
          {
            key: label,
            title: `${label} model limits`,
            label: `${label} scientific explanation`,
          },
          createElement("p", null, "Scientific assumptions. ".repeat(50)),
          createElement("a", { href: `/about#ref-${index}` }, "Source"),
        ),
      ),
    ),
  );
  const disclosures = [...html.matchAll(/<details\b([^>]*)>([\s\S]*?)<\/details>/g)];
  assert.equal(disclosures.length, labels.length);
  for (const [index, [, attributes, body]] of disclosures.entries()) {
    assert.doesNotMatch(attributes, /\b(?:open|name|hidden|aria-hidden)\b/);
    assert.match(body, /^<summary>[^<]+model limits<\/summary>/);
    assert.match(body, /role="region" aria-label="[^"]+ scientific explanation" tabindex="0"/);
    assert.equal(body.match(/Scientific assumptions\./g).length, 50);
    assert.ok(body.includes(`href="/about#ref-${index}"`));
  }
});
