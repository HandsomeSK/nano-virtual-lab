import test from "node:test";
import assert from "node:assert/strict";
import {
  normalizedBandEnergy,
  fermiCharacter,
  transportDescription,
} from "../src/lib/graphene.ts";

test("normalized dispersions preserve graphene's touching bands and a finite illustrative gap", () => {
  assert.equal(normalizedBandEnergy(0, "graphene"), 0);
  assert.equal(normalizedBandEnergy(0, "gapped") * 2, 0.8);
  for (const kind of ["graphene", "gapped"]) {
    for (const k of [0, 0.1, 0.5, 1]) {
      assert.equal(
        normalizedBandEnergy(k, kind),
        normalizedBandEnergy(-k, kind),
      );
      assert.ok(normalizedBandEnergy(k, kind) >= 0);
    }
  }
  assert.equal(normalizedBandEnergy(0.5, "graphene"), 0.5);
  assert.ok(Math.abs(normalizedBandEnergy(0.5, "gapped") - 0.6) < 1e-12);
});

test("changing Fermi energy changes carrier character without opening a graphene gap", () => {
  assert.equal(fermiCharacter(-0.8, "graphene"), "Hole-like carriers");
  assert.equal(fermiCharacter(0, "graphene"), "Charge-neutral Dirac point");
  assert.equal(fermiCharacter(0.8, "graphene"), "Electron-like carriers");
  assert.equal(fermiCharacter(0.2, "gapped"), "Fermi level in the gap");
  assert.equal(fermiCharacter(0.8, "gapped"), "Electron-like carriers");
  assert.equal(normalizedBandEnergy(0, "graphene"), 0);
});

test("mean-free-path explanations distinguish short channels, crossover and scattering", () => {
  assert.match(transportDescription(0.1), /near-ballistic/);
  assert.match(transportDescription(1), /crossover/);
  assert.match(transportDescription(4), /scattering/);
});
