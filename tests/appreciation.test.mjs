import test from "node:test";
import assert from "node:assert/strict";
import {
  appreciationStorageKey,
  createAppreciationPreference,
} from "../src/lib/appreciation.ts";

test("a like is reversible, restored on a new visit and isolated to its own storage key", () => {
  const values = new Map([["nanolab-configurations", "saved experiment"]]);
  const storage = () => ({
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  });
  const preference = createAppreciationPreference(storage);
  assert.equal(preference.snapshot(), false);
  assert.equal(preference.toggle(), true);
  assert.equal(values.get(appreciationStorageKey), "1");
  const revisit = createAppreciationPreference(storage);
  assert.equal(revisit.snapshot(), true);
  assert.equal(revisit.toggle(), false);
  assert.equal(preference.snapshot(), false);
  assert.equal(values.get("nanolab-configurations"), "saved experiment");
  values.clear();
  preference.sync();
  assert.equal(preference.snapshot(), false);
});

test("blocked reads or writes still allow reversible likes for the current visit", () => {
  for (const storage of [
    () => { throw new Error("Storage access denied"); },
    () => ({
      getItem: () => "0",
      setItem: () => { throw new Error("Storage quota exceeded"); },
    }),
  ]) {
    const preference = createAppreciationPreference(storage);
    assert.equal(preference.snapshot(), false);
    assert.equal(preference.toggle(), true);
    assert.equal(preference.snapshot(), true);
    assert.equal(preference.toggle(), false);
    assert.equal(preference.snapshot(), false);
  }
});

test("unexpected saved data never implies a like and can be replaced or synchronized", () => {
  let stored = '{"liked":true}';
  const preference = createAppreciationPreference(() => ({
    getItem: () => stored,
    setItem: (_, value) => { stored = value; },
  }));
  assert.equal(preference.snapshot(), false);
  assert.equal(preference.toggle(), true);
  assert.equal(stored, "1");
  stored = "0";
  preference.sync();
  assert.equal(preference.snapshot(), false);
});
