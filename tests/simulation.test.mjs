import test from "node:test";
import assert from "node:assert/strict";
import {
  currentA,
  metrics,
  curve,
  defaultParameters,
  normalizeParameters,
  parametersQuery,
  modelConstants,
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
test("cutoff and linear-to-saturation boundaries are continuous", () => {
  const p = {
    ...defaultParameters,
    gateVoltage: modelConstants.thresholdV + 1,
    contactResistance: 0,
  };
  const beta = (50e-4 * 0.01 * 1e-6) / 500e-9;
  const epsilon = 1e-7;
  const onset = currentA({ ...p, drainVoltage: 1 });
  close(onset, beta / 2);
  close(currentA({ ...p, drainVoltage: 1 - epsilon }), onset);
  close(currentA({ ...p, drainVoltage: 1 + epsilon }), onset);
  assert.equal(currentA({ ...p, gateVoltage: modelConstants.thresholdV }), 0);
  const gateStep = 1e-4;
  close(
    currentA({ ...p, gateVoltage: modelConstants.thresholdV + gateStep }),
    (beta * gateStep ** 2) / 2,
  );
});
test("zero drain bias above threshold is a zero-current linear point, not cutoff", () => {
  const charged = metrics({ ...defaultParameters, gateVoltage: 1.5, drainVoltage: 0 });
  assert.equal(charged.currentUa, 0);
  assert.equal(charged.region, "Linear");
  assert.ok(charged.internalVgs > modelConstants.thresholdV);
  assert.equal(metrics({ ...defaultParameters, gateVoltage: 0.7 }).region, "OFF");
});
test("series-contact solve stays physical and satisfies its channel equation across parameter corners", () => {
  for (const gateVoltage of [0, 0.7, 0.700001, 1.5, 3])
    for (const drainVoltage of [0, 0.001, 0.2, 2])
      for (const channelLength of [100, 2000])
        for (const mobility of [1, 200])
          for (const contactResistance of [0, 0.000001, 10, 100]) {
            const p = { gateVoltage, drainVoltage, channelLength, mobility, contactResistance };
            const current = currentA(p), result = metrics(p);
            const beta = (mobility * 1e-4 * 0.01 * 1e-6) / (channelLength * 1e-9);
            const overdrive = result.internalVgs - 0.7;
            const drain = result.internalVds;
            const expected = overdrive <= 0 || drain <= 0 ? 0
              : drain < overdrive ? beta * (overdrive * drain - drain ** 2 / 2)
                : beta * overdrive ** 2 / 2;
            assert.ok(Number.isFinite(current) && current >= 0);
            assert.ok(result.internalVgs >= -1e-12 && result.internalVgs <= gateVoltage);
            assert.ok(drain >= -1e-12 && drain <= drainVoltage);
            assert.ok(Number.isFinite(result.gmUs) && result.gmUs >= 0);
            close(current, expected);
            if (contactResistance > 0)
              assert.ok(current <= drainVoltage / (contactResistance * 1000) + 1e-15);
          }
});
test("external transconductance agrees with the contact-feedback derivative and power balances", () => {
  for (const p of [
    { ...defaultParameters, gateVoltage: 2, drainVoltage: 0.2, contactResistance: 0 },
    { ...defaultParameters, gateVoltage: 2, drainVoltage: 0.2, contactResistance: 30 },
    { ...defaultParameters, gateVoltage: 1.5, drainVoltage: 2, contactResistance: 0 },
    { ...defaultParameters, gateVoltage: 1.5, drainVoltage: 2, contactResistance: 50 },
  ]) {
    const i = currentA(p), result = metrics(p), r = p.contactResistance * 1000;
    const beta = (p.mobility * 1e-4 * 0.01 * 1e-6) / (p.channelLength * 1e-9);
    const overdrive = result.internalVgs - 0.7;
    const saturated = result.internalVds >= overdrive;
    const intrinsicGm = beta * (saturated ? overdrive : result.internalVds);
    const intrinsicGd = saturated ? 0 : beta * (overdrive - result.internalVds);
    const expectedGm = intrinsicGm / (1 + r * intrinsicGm / 2 + r * intrinsicGd);
    assert.ok(Math.abs(result.gmUs * 1e-6 - expectedGm) <= expectedGm * 2e-5 + 1e-12);
    close(result.powerUw * 1e-6, i * p.drainVoltage);
    close(result.powerUw * 1e-6, i * result.internalVds + i ** 2 * r);
  }
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
