import test from "node:test";
import assert from "node:assert/strict";
import {
  comparisonPair,
  comparisonJourney,
  comparisonHref,
  editScenarioHref,
  simulatorParametersHref,
} from "../src/lib/simulation/journey.ts";
import { defaultParameters, normalizeParameters } from "../src/lib/simulation/model.ts";

const pair = {
  a: { id: "saved-a", name: "Low contact resistance", parameters: defaultParameters },
  b: {
    id: "saved-b",
    name: "Higher contact resistance",
    parameters: { ...defaultParameters, gateVoltage: 2.2, contactResistance: 60 },
  },
};
const asQuery = (href) => Object.fromEntries(new URL(href, "https://nanolab.invalid").searchParams);

test("editing either scenario returns both parameter sets without overwriting its opposite", () => {
  for (const slot of ["a", "b"]) {
    const other = slot === "a" ? "b" : "a";
    const editHref = editScenarioHref(slot, pair, "output", "side");
    const editQuery = asQuery(editHref);
    assert.deepEqual(normalizeParameters(editQuery), pair[slot].parameters);
    const journey = comparisonJourney(editQuery);
    assert.equal(journey.slot, slot);
    const edited = { ...pair[slot].parameters, mobility: 93, channelLength: 1200 };
    const changedUrl = simulatorParametersHref(edited, new URL(editHref, "https://nanolab.invalid").search, "#simulation");
    const reloaded = asQuery(changedUrl);
    assert.deepEqual(normalizeParameters(reloaded), edited);
    const returnHref = comparisonHref(edited, comparisonJourney(reloaded));
    const returned = asQuery(returnHref);
    const snapshots = comparisonPair(returned);
    assert.deepEqual(snapshots[slot].parameters, edited);
    assert.deepEqual(snapshots[other].parameters, pair[other].parameters);
    assert.equal(snapshots[other].name, pair[other].name);
    assert.equal(returned.a, "comparison-a");
    assert.equal(returned.b, "comparison-b");
    assert.equal(returned.curve, "output");
    assert.equal(returned.layout, "side");
    assert.ok(returnHref.endsWith("#device-comparison"));
    assert.equal(pair.a.id, "saved-a");
    assert.equal(pair.b.id, "saved-b");
    assert.deepEqual(pair.a.parameters, defaultParameters);
  }
});

test("cancel restores both original scenarios and parameter reset retains the return context", () => {
  const href = editScenarioHref("b", pair, "transfer", "overlay");
  const query = asQuery(href);
  const journey = comparisonJourney(query);
  const cancelled = comparisonPair(asQuery(comparisonHref(defaultParameters, journey, false)));
  assert.deepEqual(cancelled.a.parameters, pair.a.parameters);
  assert.deepEqual(cancelled.b.parameters, pair.b.parameters);
  const reset = simulatorParametersHref(defaultParameters, new URL(href, "https://nanolab.invalid").search + "&campaign=lesson", "#model");
  assert.deepEqual(comparisonJourney(asQuery(reset)), journey);
  assert.equal(asQuery(reset).campaign, "lesson");
  assert.ok(reset.endsWith("#model"));
});

test("legacy simulator and saved-selection URLs retain their original parameter schema", () => {
  const href = comparisonHref(pair.b.parameters, null);
  const query = asQuery(href);
  assert.equal(query.source, "simulator");
  assert.deepEqual(normalizeParameters(query), pair.b.parameters);
  assert.equal(comparisonPair(query), null);
  assert.equal(comparisonJourney({ a: "saved-a", b: "saved-b" }), null);
});

test("comparison URL snapshots reject malformed, oversized and invalid saved-configuration values", () => {
  const valid = asQuery(editScenarioHref("a", pair, "transfer", "overlay"));
  for (const bad of [
    "broken",
    "x".repeat(1025),
    JSON.stringify({ ...pair.a, id: "//example.com" }),
    JSON.stringify({ ...pair.a, name: "x".repeat(81) }),
    JSON.stringify({ ...pair.a, parameters: { ...defaultParameters, mobility: 1000 } }),
    JSON.stringify({ ...pair.a, parameters: { ...defaultParameters, gateVoltage: "2" } }),
  ]) {
    assert.equal(comparisonPair({ ...valid, scenarioA: bad }), null);
    assert.equal(comparisonJourney({ ...valid, scenarioA: bad }), null);
  }
  assert.equal(comparisonJourney({ ...valid, editScenario: "https://example.com" }), null);
  let next = pair;
  for (let i = 0; i < 20; i++) {
    const href = editScenarioHref(i % 2 ? "a" : "b", next, "output", "side");
    assert.ok(href.length < 2000);
    next = comparisonPair(asQuery(comparisonHref(defaultParameters, comparisonJourney(asQuery(href)))));
  }
});
