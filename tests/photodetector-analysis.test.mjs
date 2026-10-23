import test from "node:test";
import assert from "node:assert/strict";
import { analyzePhotodetector } from "../src/lib/science/photodetector-analysis.ts";

const input = {
  illuminatedCurrent: "1.5", illuminatedUnit: "µA",
  darkCurrent: "0.5", darkUnit: "µA",
  incidentPower: "10", powerUnit: "µW",
};
function close(actual, expected) {
  assert.ok(Math.abs(actual - expected) <= Math.max(1e-30, Math.abs(expected) * 1e-12), `${actual} != ${expected}`);
}
function valid(values) {
  const result = analyzePhotodetector(values);
  assert.equal(result.ok, true, JSON.stringify(result));
  return result;
}

test("responsivity subtracts signed dark current and divides by incident watts", () => {
  const r = valid(input);
  close(r.illuminatedCurrentA, 1.5e-6);
  close(r.darkCurrentA, 0.5e-6);
  close(r.incidentPowerW, 1e-5);
  close(r.photocurrentA, 1e-6);
  close(r.responsivityAw, 0.1);
});

test("all current and power prefixes describe the same physical measurement", () => {
  const currents = [
    ["1500", "500", "nA"],
    ["1.5", "0.5", "µA"],
    ["0.0015", "0.0005", "mA"],
  ];
  const powers = [["10000", "nW"], ["10", "µW"], ["0.01", "mW"]];
  for (const [illuminatedCurrent, darkCurrent, currentUnit] of currents)
    for (const [incidentPower, powerUnit] of powers) {
      const r = valid({ illuminatedCurrent, illuminatedUnit: currentUnit, darkCurrent, darkUnit: currentUnit, incidentPower, powerUnit });
      close(r.photocurrentA, 1e-6);
      close(r.responsivityAw, 0.1);
    }
  close(valid({ ...input, illuminatedCurrent: "1500", illuminatedUnit: "nA", darkCurrent: "0.0005", darkUnit: "mA" }).responsivityAw, 0.1);
});

test("zero and negative photocurrents remain signed rather than becoming absolute values", () => {
  close(valid({ ...input, illuminatedCurrent: "0.5" }).responsivityAw, 0);
  close(valid({ ...input, illuminatedCurrent: "0.25" }).photocurrentA, -0.25e-6);
  close(valid({ ...input, illuminatedCurrent: "-1.5", darkCurrent: "-0.5" }).responsivityAw, -0.1);
  close(valid({ ...input, illuminatedCurrent: "0.5", darkCurrent: "-0.5" }).responsivityAw, 0.1);
});

test("finite measurement changes obey the algebraic scaling, not an assumed device model", () => {
  const r = valid({ ...input, illuminatedCurrent: "2.5" });
  close(r.responsivityAw, 0.2);
  close(valid({ ...input, illuminatedCurrent: "2.5", incidentPower: "20" }).responsivityAw, r.responsivityAw / 2);
});

test("zero and negative incident power are rejected before division", () => {
  for (const incidentPower of ["0", "-0", "-10"])
    for (const powerUnit of ["nW", "µW", "mW"]) {
      const result = analyzePhotodetector({ ...input, incidentPower, powerUnit });
      assert.equal(result.ok, false);
      assert.match(result.errors.incidentPower, /greater than zero/);
      assert.equal("responsivityAw" in result, false);
    }
});

test("empty, non-finite and malformed measurement strings produce field errors", () => {
  for (const field of ["illuminatedCurrent", "darkCurrent", "incidentPower"])
    for (const bad of ["", "  ", "NaN", "Infinity", "-Infinity", "1e309", "not a number"]){
      const result = analyzePhotodetector({ ...input, [field]: bad });
      assert.equal(result.ok, false);
      assert.match(result.errors[field], /finite number/);
    }
});

test("unrepresentable unit conversion and overflow are recoverable errors", () => {
  const underflow = analyzePhotodetector({ ...input, incidentPower: "1e-320", powerUnit: "nW" });
  assert.equal(underflow.ok, false);
  assert.match(underflow.errors.incidentPower, /numerical range/);
  const overflow = analyzePhotodetector({ ...input, illuminatedCurrent: "1e308", illuminatedUnit: "mA", incidentPower: "1e-20", powerUnit: "nW" });
  assert.equal(overflow.ok, false);
  assert.match(overflow.errors.calculation, /numerical range/);
  assert.equal("responsivityAw" in overflow, false);
  const ratioUnderflow = analyzePhotodetector({ ...input, illuminatedCurrent: "1e-290", illuminatedUnit: "nA", darkCurrent: "0", incidentPower: "1e300", powerUnit: "mW" });
  assert.equal(ratioUnderflow.ok, false);
  assert.match(ratioUnderflow.errors.calculation, /numerical range/);
  assert.equal(analyzePhotodetector(input).ok, true);
});
