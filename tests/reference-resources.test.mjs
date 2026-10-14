import test from "node:test";
import assert from "node:assert/strict";
import { referenceResources } from "../src/lib/reference-resources.ts";
import { references } from "../src/data/references.ts";

test("publication access merges DOI and publisher article while retaining distinct resources", () => {
  for (const id of ["radis2011", "neto2009", "polytypes2020"]) {
    const reference = references.find((item) => item.id === id);
    assert.deepEqual(referenceResources(reference), [{
      href: "https://doi.org/" + reference.doi,
      label: "Read publication",
    }]);
  }
  for (const id of ["mak2010", "desai2016", "novoselov2004", "ridolfi2015"]) {
    const reference = references.find((item) => item.id === id);
    const resources = referenceResources(reference);
    assert.equal(resources.length, 2, id);
    assert.equal(resources[0].href, "https://doi.org/" + reference.doi);
    assert.equal(resources[1].href, reference.url);
  }
});

test("non-paper resources stay reachable and unsafe or missing source URLs are omitted", () => {
  const source = references.find((item) => item.id === "imec2026");
  assert.deepEqual(referenceResources(source), [{
    href: source.url,
    label: "View original source",
  }]);
  assert.deepEqual(referenceResources({}), []);
  assert.deepEqual(referenceResources({ url: "javascript:alert(1)" }), []);
  assert.deepEqual(referenceResources({ url: "not a URL" }), []);
  assert.equal(referenceResources({ url: "https://example.org/%" }).length, 1);
  assert.equal(referenceResources({ doi: "10.1038/example", url: "not a URL" }).length, 1);
});
