import test from "node:test";
import assert from "node:assert/strict";
import { references } from "../src/data/references.ts";
import {
  formatScaleLength,
  selectedScaleExample,
  sizeScaleExamples,
} from "../src/data/size-scale.ts";

test("all nine cited length examples fit the slider and select only themselves", () => {
  assert.equal(sizeScaleExamples.length, 9);
  assert.equal(new Set(sizeScaleExamples.map((example) => example.label)).size, 9);
  for (const example of sizeScaleExamples) {
    const power = Math.log10(example.nm);
    assert.ok(power >= -1 && power <= 5);
    assert.equal(selectedScaleExample(power), example);
    assert.ok(references.some((reference) => reference.id === example.reference));
    assert.ok(example.measurement);
  }
  assert.equal(selectedScaleExample(-1), undefined);
  assert.equal(selectedScaleExample(5), undefined);
});

test("custom slider values cannot be mistaken for nearby carbon or layer lengths", () => {
  for (const nm of [0.14, 0.15, 0.24, 0.25, 0.33, 0.35, 0.64, 0.66]) {
    assert.equal(selectedScaleExample(Math.log10(nm)), undefined);
  }
  assert.equal(formatScaleLength(0.142), "0.142 nm");
  assert.equal(formatScaleLength(0.246), "0.246 nm");
  assert.equal(formatScaleLength(100), "100 nm");
  assert.equal(formatScaleLength(1000), "1 µm");
  assert.equal(formatScaleLength(80000), "80 µm");
});
