import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { runInNewContext } from "node:vm";
import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";
import * as geometry from "../src/lib/science/atomic-structure.ts";
import * as sceneTypes from "../src/components/science/types.ts";

const require = createRequire(import.meta.url);
const compiled = ts.transpileModule(
  readFileSync(new URL("../src/components/science/atomic-workbench.tsx", import.meta.url), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } },
).outputText;

test("atomic readouts count the complete in-plane cell for monolayers and both bilayer registries", () => {
  let layers = 1;
  let stacking = "2H";
  const compiledModule = { exports: {} };
  runInNewContext(compiled, {
    module: compiledModule, exports: compiledModule.exports,
    require: (name) => {
      if (name === "react") return {
        ...React,
        useId: () => "atomic-cell-test",
        useState: (initial) => [initial === 1 ? layers : initial === "2H" ? stacking : initial, () => {}],
      };
      if (name === "@/lib/science/atomic-structure") return geometry;
      if (name === "./types") return sceneTypes;
      if (name === "./scientific-stage") return { ScientificStage: () => null };
      if (name === "./camera-controls") return { CameraControls: () => null };
      if (name === "@/components/reference-link") return { ReferenceLink: () => null };
      if (name === "@/components/model-explanation") return { ModelExplanation: ({ children }) => children };
      return require(name);
    },
  });
  const render = (material) => renderToStaticMarkup(
    React.createElement(compiledModule.exports.AtomicWorkbench, { initialMaterial: material, fixedMaterial: true }),
  );
  assert.match(render("graphene"), /<dt>Primitive cell<\/dt><dd>2 C atoms<\/dd>/);
  assert.match(render("mos2"), /<dt>Primitive cell<\/dt><dd>1 Mo \+ 2 S atoms<\/dd>/);
  for (stacking of ["2H", "3R"]) {
    layers = 2;
    const html = render("mos2");
    assert.ok(html.includes(stacking + " bilayer"));
    assert.match(html, /<dt>Primitive cell<\/dt><dd>2 Mo \+ 4 S atoms<\/dd>/);
    const cell = geometry.createAtomicStructure("mos2", layers, stacking).atoms.filter(
      (atom) => atom.cell.every((coordinate) => coordinate === 0),
    );
    assert.equal(cell.filter((atom) => atom.element === "Mo").length, 2);
    assert.equal(cell.filter((atom) => atom.element === "S").length, 4);
  }
});
