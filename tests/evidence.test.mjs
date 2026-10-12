import test from "node:test";
import assert from "node:assert/strict";
import { figures } from "../src/data/figures.ts";
import { references } from "../src/data/references.ts";
import { studies } from "../src/data/research.ts";
import { knowledge } from "../src/data/knowledge.ts";
import { foundationDetails } from "../src/data/foundation-details.ts";
import { challengeEvidence } from "../src/data/challenge-evidence.ts";

test("scientific content has resolvable references and preserves original citation numbering", () => {
  const originalIds = [
    "mak2010",
    "radis2011",
    "desai2016",
    "tang2023",
    "kwon2024",
    "quantum",
    "mosfet",
    "course",
    "assets",
    "neto2009",
    "novoselov2004",
    "novoselov2005",
    "schwierz2010",
    "zhang2025",
    "guo2026",
    "course-bands",
    "course-graphene",
  ];
  assert.deepEqual(
    references.slice(0, 17).map((ref) => ref.id),
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
