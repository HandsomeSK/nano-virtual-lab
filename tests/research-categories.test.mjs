import test from "node:test";
import assert from "node:assert/strict";
import {
  groupStudiesByCategory,
  researchCategories,
  studies,
} from "../src/data/research.ts";

test("category catalogue contains every study once without changing the chronological source", () => {
  const originalOrder = studies.map((study) => study.reference);
  const groups = groupStudiesByCategory(studies);
  assert.deepEqual(groups.map((group) => group.category), researchCategories);
  assert.deepEqual(groups.map((group) => group.studies.length), [2, 4, 3, 3, 2]);
  const grouped = groups.flatMap((group) => group.studies);
  assert.equal(new Set(grouped.map((study) => study.reference)).size, studies.length);
  assert.deepEqual(new Set(grouped), new Set(studies));
  assert.deepEqual(studies.map((study) => study.reference), originalOrder);
});

test("filtered catalogue omits empty categories and keeps a selected study's full data", () => {
  const selected = studies.find((study) => study.reference === "wang2026");
  const groups = groupStudiesByCategory([selected]);
  assert.equal(groups.length, 1);
  assert.equal(groups[0].category, "Scaling");
  assert.equal(groups[0].studies[0], selected);
  assert.deepEqual(groupStudiesByCategory([]), []);
});
