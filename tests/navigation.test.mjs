import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
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
  selectedSubmenuHref,
} from "../src/lib/navigation.ts";

const root = fileURLToPath(new URL("../", import.meta.url));

test("submenu selection stays on the owning page for section and parameter URLs", () => {
  const links = navigationCategories.flatMap(({ links }) => links);
  for (const { href } of links) {
    for (const suffix of ["", "#existing-section", "#%E0%A4%A", "?mode=output#saved"]) {
      const url = new URL(href + suffix, "https://nanolab.invalid");
      const selected = selectedSubmenuHref(url.pathname);
      assert.equal(selected, href);
      assert.equal(links.filter((link) => link.href === selected).length, 1);
    }
  }
  for (const path of ["/", "/about", "/missing", "/researcher"]) {
    assert.equal(selectedSubmenuHref(path), undefined);
  }
});

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

test("all five dropdowns list each owned page once with no section, query or Overview entries", () => {
  const allLinks = navigationCategories.flatMap(({ links }) => links);
  assert.equal(navigationCategories.length, 5);
  assert.equal(allLinks.length, 9);
  assert.equal(new Set(allLinks.map(({ href }) => href)).size, 9);
  for (const category of navigationCategories) {
    const owner = pageHierarchy.find(({ href }) => href === category.href);
    assert.deepEqual(
      category.links.map(({ href }) => href),
      [owner.href, ...owner.children.map(({ href }) => href)],
    );
    assert.ok(category.links.length > 0, category.href);
    for (const link of category.links) {
      assert.equal(getPageCategory(link.href).href, category.href);
      assert.ok(link.title && !/overview/i.test(link.title));
      const url = new URL(link.href, "https://nanolab.invalid");
      assert.equal(url.hash, "");
      assert.equal(url.search, "");
    }
  }
  assert.deepEqual(
    navigationCategories.find(({ href }) => href === "/foundations").links,
    [
      { href: "/foundations", title: "Foundations" },
      { href: "/why-mos2", title: "MoS₂" },
      { href: "/device", title: "Transistor Principles" },
    ],
  );
});

test("page ownership remains stable when a submenu changes", () => {
  const materials = navigationCategories.find(({ href }) => href === "/foundations");
  const discoveries = navigationCategories.find(({ href }) => href === "/research");
  assert.equal(isActiveCategory({ ...materials, links: [] }, "/device"), true);
  assert.equal(
    isActiveCategory(
      { ...discoveries, links: [] },
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

test("every dropdown destination resolves an actual maintained page", () => {
  for (const category of navigationCategories) {
    for (const { href } of category.links) {
      assert.ok(href.startsWith("/") && !href.startsWith("//"));
      assert.ok(existsSync(`${root}src/app${href}/page.tsx`), `Missing route: ${href}`);
    }
  }
});
