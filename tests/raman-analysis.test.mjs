import test from "node:test";
import assert from "node:assert/strict";
import {
  analyzeRamanPeaks,
  conceptualRamanSpectrum,
  ramanExamples,
  ramanPlotBounds,
} from "../src/lib/science/raman-analysis.ts";

test("Raman separation is the signed high-minus-low frequency difference in cm−1", () => {
  assert.deepEqual(analyzeRamanPeaks(384.25, 403.5), { valid: true, separation: 19.25 });
  assert.equal(analyzeRamanPeaks(370, 420).separation, 50);
  assert.equal(analyzeRamanPeaks(400, 400.1).valid, true);
});

test("Raman analysis rejects missing/nonfinite, out-of-window and reversed mode pairs", () => {
  for (const pair of [[NaN, 403], [384, Infinity], [-Infinity, 400], [369.99, 400], [384, 420.01], [0, 0], [400, 400], [405, 384]]) {
    assert.equal(analyzeRamanPeaks(...pair).valid, false);
    assert.deepEqual(conceptualRamanSpectrum(...pair), []);
  }
});

test("conceptual spectra are deterministic, normalized finite curves, not random measurements", () => {
  const points = conceptualRamanSpectrum(384, 404);
  assert.deepEqual(points, conceptualRamanSpectrum(384, 404));
  assert.equal(points[0].shift, ramanPlotBounds.min);
  assert.equal(points.at(-1).shift, ramanPlotBounds.max);
  assert.equal(Math.max(...points.map(point => point.intensity)), 1);
  assert.ok(points.every(point => Number.isFinite(point.intensity) && point.intensity >= 0 && point.intensity <= 1));
  const at = shift => points.find(point => point.shift === shift).intensity;
  assert.ok(at(384) > at(382) && at(384) > at(386));
  assert.ok(Math.abs(at(382) / at(384) - 0.5) < 0.02, "4cm−1 FWHM gives half height at ±2cm−1, apart from the second mode's small tail");
  assert.ok(at(404) > at(400) && at(404) > at(408));
});

test("illustrative layer contexts preserve symmetry names and opposing-shift teaching trends", () => {
  const deltas = ramanExamples.map(example => analyzeRamanPeaks(example.inPlane, example.outOfPlane).separation);
  assert.ok(deltas[0] < deltas[1] && deltas[1] < deltas[2]);
  assert.deepEqual(ramanExamples.map(example => example.inMode), ["E′", "Eg", "E₂g¹"]);
  assert.ok(ramanExamples[0].inPlane > ramanExamples[1].inPlane && ramanExamples[1].inPlane > ramanExamples[2].inPlane);
  assert.ok(ramanExamples[0].outOfPlane < ramanExamples[1].outOfPlane && ramanExamples[1].outOfPlane < ramanExamples[2].outOfPlane);
});
