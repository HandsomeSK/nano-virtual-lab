import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { primaryNavigation } from "../src/lib/site.ts";
import {
  auxiliaryPages,
  getBreadcrumbs,
  getPageCategory,
  pageHierarchy,
} from "../src/lib/page-hierarchy.ts";
import {
  navigationCategories,
  isActiveCategory,
  keepSubmenuOnPointerLeave,
} from "../src/lib/navigation.ts";
import { knowledge } from "../src/data/knowledge.ts";
import { challenges } from "../src/data/challenges.ts";

const root = fileURLToPath(new URL("../", import.meta.url));

test("pointer leave closes mouse-opened panels despite retained button focus", () => {
  assert.equal(keepSubmenuOnPointerLeave(false, true), false);
  assert.equal(keepSubmenuOnPointerLeave(false, false), false);
  assert.equal(keepSubmenuOnPointerLeave(true, true), true);
  assert.equal(keepSubmenuOnPointerLeave(true, false), false);
});

test("five category homes stay stable and related routes select one category", () => {
  assert.deepEqual(
    navigationCategories.map(({ href, title }) => ({ href, title })),
    primaryNavigation,
  );
  for (const [pathname, expected] of [
    ["/foundations", "/foundations"],
    ["/why-mos2", "/foundations"],
    ["/lab", "/lab"],
    ["/device", "/foundations"],
    ["/simulator", "/simulator"],
    ["/comparison", "/simulator"],
    ["/research", "/research"],
    ["/discoveries/mos2-interface-breakthrough", "/research"],
    ["/challenges", "/challenges"],
  ]) {
    assert.deepEqual(
      navigationCategories
        .filter((category) => isActiveCategory(category, pathname))
        .map(({ href }) => href),
      [expected],
      pathname,
    );
  }
  assert.equal(
    navigationCategories.some((category) => isActiveCategory(category, "/about")),
    false,
  );
});

test("3D Lab has one direct entry while transistor theory belongs to Materials", () => {
  const lab = navigationCategories.find(({ href }) => href === "/lab");
  const materials = navigationCategories.find(({ href }) => href === "/foundations");
  assert.deepEqual(lab.groups, []);
  assert.ok(materials.groups.some(({ links }) => links.some(({ href }) => href === "/device")));
  assert.equal(isActiveCategory(lab, "/device"), false);
});

test("page ownership remains stable when a submenu changes", () => {
  const materials = navigationCategories.find(({ href }) => href === "/foundations");
  const discoveries = navigationCategories.find(({ href }) => href === "/research");
  assert.equal(isActiveCategory({ ...materials, groups: [] }, "/device"), true);
  assert.equal(
    isActiveCategory(
      { ...discoveries, groups: [] },
      "/discoveries/mos2-interface-breakthrough",
    ),
    true,
  );
  for (const path of ["/", "/about", "/researcher", "/device/unknown", "/missing"]) {
    assert.equal(getPageCategory(path), undefined, path);
  }
});

test("each maintained page has exactly one category or auxiliary role", () => {
  const pages = pageHierarchy.flatMap(({ href, children }) => [href, ...children.map((page) => page.href)]);
  const maintainedRoutes = [
    "/foundations", "/why-mos2", "/device", "/lab", "/simulator",
    "/comparison", "/research", "/discoveries/mos2-interface-breakthrough",
    "/challenges", "/about",
  ];
  const ownedRoutes = [...pages, ...auxiliaryPages.map(({ href }) => href)];
  assert.equal(new Set(ownedRoutes).size, maintainedRoutes.length);
  assert.deepEqual([...ownedRoutes].sort(), [...maintainedRoutes].sort());
  for (const pathname of maintainedRoutes) {
    assert.ok(existsSync(`${root}src/app${pathname}/page.tsx`), pathname);
    const owners = pageHierarchy.filter(
      (category) => category.href === pathname || category.children.some((page) => page.href === pathname),
    );
    assert.equal(owners.length, pathname === "/about" ? 0 : 1, pathname);
  }
});

test("breadcrumbs expose useful ancestors without duplicate or self-navigation steps", () => {
  for (const [pathname, titles, ancestors] of [
    ["/why-mos2", ["Home", "Materials", "MoS₂"], ["/", "/foundations"]],
    ["/device", ["Home", "Materials", "Transistor Principles"], ["/", "/foundations"]],
    ["/comparison", ["Home", "Simulators", "Comparison"], ["/", "/simulator"]],
    ["/discoveries/mos2-interface-breakthrough", ["Home", "Discoveries", "Interface Breakthrough"], ["/", "/research"]],
    ["/foundations", ["Home", "Materials"], ["/"]],
    ["/lab", ["Home", "3D Lab"], ["/"]],
    ["/about", ["Home", "About & References"], ["/"]],
  ]) {
    const crumbs = getBreadcrumbs(pathname);
    assert.deepEqual(crumbs.map(({ title }) => title), titles, pathname);
    assert.deepEqual(crumbs.slice(0, -1).map(({ href }) => href), ancestors, pathname);
    assert.equal(crumbs.at(-1).href, pathname);
    assert.equal(new Set(crumbs.map(({ href }) => href)).size, crumbs.length);
  }
  assert.deepEqual(getBreadcrumbs("/"), []);
  assert.deepEqual(getBreadcrumbs("/missing"), []);
});

test("every secondary destination resolves an actual route and section", () => {
  const dynamicAnchors = {
    "/foundations": new Set(knowledge.map(({ id }) => id)),
    "/challenges": new Set(challenges.map(({ id }) => id)),
    "/simulator": new Set(["parameter-gateVoltage", "understanding-results"]),
    "/comparison": new Set(["saved"]),
  };
  for (const category of navigationCategories) {
    const seen = new Set();
    for (const group of category.groups) {
      assert.ok(group.title && group.links.length);
      for (const link of group.links) {
        assert.ok(link.title && link.href.startsWith("/") && !link.href.startsWith("//"));
        assert.equal(seen.has(link.href), false, `Duplicate ${link.href}`);
        seen.add(link.href);
        const url = new URL(link.href, "https://nanolab.invalid");
        const page = `${root}src/app${url.pathname}/page.tsx`;
        assert.ok(existsSync(page), `Missing route: ${link.href}`);
        if (url.hash && !dynamicAnchors[url.pathname]?.has(url.hash.slice(1))) {
          const sources = readFileSync(page, "utf8") +
            (url.pathname === "/research"
              ? readFileSync(`${root}src/components/research-explorer.tsx`, "utf8")
              : "");
          assert.ok(
            sources.includes(`id="${url.hash.slice(1)}"`),
            `Missing section: ${link.href}`,
          );
        }
      }
    }
  }
});
