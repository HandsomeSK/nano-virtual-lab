import test from "node:test";
import assert from "node:assert/strict";
import {
  currentA,
  metrics,
  curve,
  defaultParameters,
  normalizeParameters,
  parametersQuery,
} from "../src/lib/simulation/model.ts";
import { parseConfigurations } from "../src/lib/simulation/configurations.ts";
const close = (actual, expected) =>
  assert.ok(
    Math.abs(actual - expected) < Math.max(1e-14, Math.abs(expected) * 1e-8),
    actual + " != " + expected,
  );
test("linear and saturated currents match analytic long-channel limits with SI units", () => {
  const p = {
    ...defaultParameters,
    gateVoltage: 1.7,
    contactResistance: 0,
    drainVoltage: 0.2,
  };
  const beta = (50e-4 * 0.01 * 1e-6) / 500e-9;
  close(currentA(p), beta * (1 * 0.2 - (0.2 * 0.2) / 2));
  close(currentA({ ...p, drainVoltage: 2 }), beta / 2);
  assert.equal(currentA({ ...p, gateVoltage: 0.7 }), 0);
  assert.equal(currentA({ ...p, drainVoltage: 0 }), 0);
});
test("resistance solve obeys its internal-voltage equation and reduces current", () => {
  const p = defaultParameters,
    i = currentA(p),
    r = p.contactResistance * 1000;
  const reference = currentA({
    ...p,
    contactResistance: 0,
    gateVoltage: p.gateVoltage - (i * r) / 2,
    drainVoltage: p.drainVoltage - i * r,
  });
  close(i, reference);
  assert.ok(currentA({ ...p, contactResistance: 50 }) < i);
  assert.ok(i < currentA({ ...p, contactResistance: 0 }));
});
test("mobility and geometry have expected zero-contact scaling", () => {
  const p = { ...defaultParameters, contactResistance: 0 };
  close(currentA({ ...p, mobility: p.mobility * 2 }), currentA(p) * 2);
  close(
    currentA({ ...p, channelLength: p.channelLength * 2 }),
    currentA(p) / 2,
  );
});
test("URL state round-trips; malformed and out-of-range inputs remain bounded", () => {
  assert.deepEqual(
    normalizeParameters(
      Object.fromEntries(
        new URLSearchParams(parametersQuery(defaultParameters)),
      ),
    ),
    defaultParameters,
  );
  const bad = normalizeParameters({
    gateVoltage: "NaN",
    drainVoltage: "Infinity",
    channelLength: -2,
    mobility: 10000,
    contactResistance: ["2"],
  });
  assert.equal(bad.gateVoltage, defaultParameters.gateVoltage);
  assert.equal(bad.drainVoltage, defaultParameters.drainVoltage);
  assert.equal(bad.channelLength, 100);
  assert.equal(bad.mobility, 200);
  assert.equal(bad.contactResistance, 10);
});
test("curves stay finite and nonnegative through the full parameter range", () => {
  for (const p of [
    defaultParameters,
    {
      gateVoltage: 3,
      drainVoltage: 2,
      channelLength: 100,
      mobility: 200,
      contactResistance: 100,
    },
    { ...defaultParameters, gateVoltage: 0 },
  ]) {
    for (const mode of ["transfer", "output"])
      assert.ok(
        curve(p, mode).every(
          (point) => Number.isFinite(point.y) && point.y >= 0,
        ),
      );
    assert.ok(Number.isFinite(metrics(p).gmUs));
  }
});
test("saved configurations reject malformed state and unsupported versions", () => {
  assert.equal(parseConfigurations("broken").configurations.length, 0);
  assert.equal(
    parseConfigurations('{"version":2,"configurations":[]}').configurations
      .length,
    0,
  );
  const valid = { id: "test-1", name: "A", parameters: defaultParameters };
  const result = parseConfigurations(
    JSON.stringify({
      version: 1,
      configurations: [
        valid,
        {
          ...valid,
          id: "bad",
          parameters: { ...defaultParameters, mobility: -1 },
        },
      ],
    }),
  );
  assert.deepEqual(result.configurations, [valid]);
  assert.ok(result.issue);
});

test("reference return links stay within known local learning routes", async () => {
  const { safeReturnPath } = await import("../src/lib/site.ts");
  assert.equal(
    safeReturnPath("/simulator?gateVoltage=2#model"),
    "/simulator?gateVoltage=2#model",
  );
  for (const value of [
    "https://example.com/",
    "//example.com/",
    "javascript:alert(1)",
    "/missing",
  ])
    assert.equal(safeReturnPath(value), "/");
});
