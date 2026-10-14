import test from "node:test";
import assert from "node:assert/strict";
import { figures } from "../src/data/figures.ts";
import { references } from "../src/data/references.ts";
import { studies } from "../src/data/research.ts";
import { knowledge } from "../src/data/knowledge.ts";
import { foundationDetails } from "../src/data/foundation-details.ts";
import { challengeEvidence } from "../src/data/challenge-evidence.ts";
import { materials } from "../src/data/materials.ts";
import { challenges } from "../src/data/challenges.ts";
import { discoveryThemes } from "../src/data/discoveries.ts";
import {
  researchDirections,
  researchConnections,
} from "../src/data/research-knowledge.ts";

test("research explanations keep the six legacy directions and trace their connections to existing evidence", () => {
  const directionIds = new Set(researchDirections.map((direction) => direction.id));
  assert.deepEqual(
    researchDirections.map((direction) => direction.id),
    discoveryThemes.map((story) => story.id),
  );
  assert.equal(directionIds.size, 6);
  for (const direction of researchDirections) {
    assert.ok(directionIds.has(direction.connectedId));
    assert.notEqual(direction.id, direction.connectedId);
  }
  for (const connection of researchConnections) {
    assert.ok(directionIds.has(connection.fromId));
    assert.ok(directionIds.has(connection.toId));
    assert.ok(references.some((reference) => reference.id === connection.reference));
  }
});

test("scientific content preserves research sources and resolves citations after identity cleanup", () => {
  const originalIds = [
    "mak2010",
    "radis2011",
    "desai2016",
    "tang2023",
    "kwon2024",
    "quantum",
    "mosfet",
    "assets",
    "neto2009",
    "novoselov2004",
    "novoselov2005",
    "schwierz2010",
    "zhang2025",
    "guo2026",
  ];
  assert.deepEqual(
    references.slice(0, originalIds.length).map((ref) => ref.id),
    originalIds,
  );
  const refIds = new Set(references.map((ref) => ref.id));
  assert.equal(refIds.size, references.length);
  assert.equal(
    new Set(studies.map((study) => study.reference)).size,
    studies.length,
  );
  for (const item of [
    ...studies,
    ...knowledge,
    ...Object.values(materials),
    ...challenges,
    ...Object.values(challengeEvidence),
    ...Object.values(foundationDetails),
  ]) {
    assert.ok(refIds.has(item.reference), item.reference);
    if (item.figure) assert.ok(figures[item.figure], item.figure);
  }
  for (const item of knowledge) assert.ok(foundationDetails[item.id], item.id);
  for (const figure of Object.values(figures)) {
    if (figure.doi)
      assert.ok(
        references.some((ref) => ref.doi === figure.doi),
        figure.doi,
      );
  }
  assert.equal(
    references.find((ref) => ref.id === "imec2026").category,
    "Institutional announcement",
  );
  assert.doesNotMatch(
    JSON.stringify([references, knowledge, figures]),
    /MECH6045|lecture|course material|course-bands|course-graphene/i,
  );
});

test("every displayed scientific image has curated HTTPS provenance and explicit reuse conditions", () => {
  const allowedHosts = new Set([
    "upload.wikimedia.org",
    "thumb.wikimedia.org",
    "media.springernature.com",
  ]);
  const licences = new Set([
    "CC0 1.0",
    "CC BY 4.0",
    "CC BY-SA 3.0",
    "CC BY-SA 4.0",
    "CC BY-NC-ND 4.0",
  ]);
  for (const [id, figure] of Object.entries(figures)) {
    assert.equal(figure.id, id);
    for (const key of [
      "title",
      "authors",
      "sourceUrl",
      "license",
      "licenseUrl",
      "attribution",
      "modification",
      "alt",
      "caption",
    ])
      assert.ok(figure[key]?.trim(), id + ": " + key);
    const image = new URL(figure.imageUrl);
    if (figure.width !== undefined || figure.height !== undefined) {
      assert.ok(Number.isInteger(figure.width) && figure.width > 0, id);
      assert.ok(Number.isInteger(figure.height) && figure.height > 0, id);
    }
    assert.equal(image.protocol, "https:");
    assert.ok(allowedHosts.has(image.hostname));
    assert.equal(image.search, "");
    assert.equal(new URL(figure.sourceUrl).protocol, "https:");
    assert.equal(new URL(figure.licenseUrl).hostname, "creativecommons.org");
    assert.ok(licences.has(figure.license));
    if (figure.license === "CC BY-NC-ND 4.0") {
      assert.match(figure.modification, /no cropping/i);
      assert.match(figure.attribution, /non-commercial/i);
    }
  }
  assert.match(figures["zeng-dielectric"].sourceUrl, /08001-y/);
  assert.equal(figures["macucci-device"].kind, "Microscopy");
});
