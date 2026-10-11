import test from "node:test";
import assert from "node:assert/strict";
import { parameterInsight } from "../src/lib/simulation/insights.ts";
import { defaultParameters } from "../src/lib/simulation/model.ts";

test("result explanations follow calculated mobility and contact responses", () => {
  assert.match(
    parameterInsight(
      defaultParameters,
      { ...defaultParameters, mobility: 100 },
      "mobility",
    ),
    /Mobility increased.*drain current increased/,
  );
  assert.match(
    parameterInsight(
      defaultParameters,
      { ...defaultParameters, contactResistance: 50 },
      "contactResistance",
    ),
    /Contact Resistance increased.*drain current decreased/,
  );
});

test("zero-current and saturation explanations do not claim a current increase", () => {
  const off = { ...defaultParameters, gateVoltage: 0.3 };
  assert.match(
    parameterInsight(off, { ...off, mobility: 100 }, "mobility"),
    /drain current remained 0\.000 µA/,
  );
  const noDrainBias = { ...defaultParameters, drainVoltage: 0 };
  assert.match(
    parameterInsight(
      noDrainBias,
      { ...noDrainBias, contactResistance: 50 },
      "contactResistance",
    ),
    /drain current remained 0\.000 µA/,
  );
  const saturated = {
    ...defaultParameters,
    contactResistance: 0,
    drainVoltage: 1,
  };
  assert.match(
    parameterInsight(
      saturated,
      { ...saturated, drainVoltage: 2 },
      "drainVoltage",
    ),
    /Drain Voltage increased.*drain current remained/,
  );
});

test("returning to an adjustment baseline reports the unchanged model current", () => {
  assert.match(
    parameterInsight(defaultParameters, defaultParameters, "channelLength"),
    /Channel Length returned to 500 nm.*drain current remained/,
  );
});
