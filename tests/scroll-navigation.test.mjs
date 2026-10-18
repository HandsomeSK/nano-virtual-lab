import test from "node:test";
import assert from "node:assert/strict";
import {
  createNavigationScroll,
  fragmentId,
  navigationIntent,
} from "../src/lib/navigation-scroll.ts";

const origin = "https://nano-virtual-lab.vercel.app";

function browser(path = "/research", navigationType = "navigate") {
  const targets = new Map(), frames = new Map(), observers = [], scrolls = [], historyEntries = [], historyReplacements = [];
  const events = new EventTarget();
  let frameId = 0;
  class Element {
    parentElement = null;
    isConnected = true;
    tabIndex = -1;
    attributes = new Map();
    hasAttribute(name) { return this.attributes.has(name); }
    setAttribute(name, value) { this.attributes.set(name, value); }
    scrollIntoView(options) { scrolls.push({ target: this, ...options }); }
    focus(options) { this.focusOptions = options; }
  }
  class Details extends Element { open = false; }
  class Observer {
    constructor(callback) { this.callback = callback; observers.push(this); }
    observe() { this.connected = true; }
    disconnect() { this.connected = false; }
  }
  const win = {
    location: new URL(path, origin),
    scrollX: 0,
    scrollY: 2400,
    performance: { getEntriesByType: () => [{ type: navigationType }] },
    history: {
      state: { readingNote: "preserve" },
      pushState: (state, _title, url) => {
        historyEntries.push({ state, url });
        win.history.state = state;
        win.location = new URL(url, win.location);
      },
      replaceState: (state, _title, url) => {
        historyReplacements.push({ state, url });
        win.history.state = state;
        win.location = new URL(url, win.location);
      },
    },
    Event,
    addEventListener: events.addEventListener.bind(events),
    dispatchEvent: events.dispatchEvent.bind(events),
    matchMedia: () => ({ matches: false }),
    MutationObserver: Observer,
    HTMLElement: Element,
    HTMLDetailsElement: Details,
    requestAnimationFrame: (callback) => { frames.set(++frameId, callback); return frameId; },
    cancelAnimationFrame: (id) => frames.delete(id),
    scrollTo: (options) => scrolls.push(options),
  };
  const doc = { body: new Element(), getElementById: (id) => targets.get(id) ?? null };
  const manager = createNavigationScroll(win, doc);
  win.addEventListener("hashchange", manager.hashChanged);
  return {
    manager, win, targets, observers, scrolls, historyEntries, historyReplacements, Element, Details,
    flush() { const pending = [...frames.values()]; frames.clear(); pending.forEach((callback) => callback()); },
    mutate() { observers.filter((observer) => observer.connected).forEach((observer) => observer.callback()); },
    activate(href) { const intent = navigationIntent(win.location.href, href); assert.ok(intent); manager.activate(intent); },
  };
}

test("links distinguish another page, a same-page fragment and filter state", () => {
  const current = origin + "/research?year=2026#study-a";
  assert.equal(navigationIntent(current, "/foundations").kind, "page");
  assert.equal(navigationIntent(current, "/foundations#bands").kind, "page");
  assert.equal(navigationIntent(current, "#directions").kind, "anchor");
  assert.equal(navigationIntent(current, "/research?year=2025").kind, "state");
  assert.equal(navigationIntent(current, "/research?year=2025#study-b").kind, "state-anchor");
  assert.equal(navigationIntent(origin + "/research", "#").kind, "anchor");
  assert.equal(navigationIntent(origin + "/research", "/research"), null);
});

test("legacy Lab material bookmarks focus the existing model without another history entry", () => {
  for (const material of ["graphene", "mos2"]) {
    const page = browser(`/lab?material=${material}&note=keep`);
    const target = new page.Element();
    page.targets.set(material, target);
    page.manager.initialize();
    page.flush();
    assert.equal(page.win.location.hash, `#${material}`);
    assert.equal(page.win.location.searchParams.get("note"), "keep");
    assert.equal(page.win.history.state.readingNote, "preserve");
    assert.equal(page.historyEntries.length, 0);
    assert.equal(page.historyReplacements.length, 1);
    assert.equal(page.scrolls.length, 1);
    assert.equal(page.scrolls[0].target, target);
  }
  for (const [path, navigationType] of [
    ["/lab?material=mos2#transistor", "navigate"],
    ["/lab?material=unknown", "navigate"],
    ["/research?material=mos2", "navigate"],
    ["/lab?material=mos2", "back_forward"],
  ]) {
    const page = browser(path, navigationType);
    page.manager.initialize();
    assert.equal(page.historyReplacements.length, 0, path);
    assert.equal(page.win.location.href, origin + path);
  }
});

test("legacy material links from another page enter the corresponding Lab section", () => {
  const page = browser("/research");
  page.activate("/lab?material=mos2");
  page.win.location = new URL("/lab?material=mos2", origin);
  const target = new page.Element();
  page.targets.set("mos2", target);
  page.manager.commit("/lab", "material=mos2");
  page.flush();
  assert.equal(page.win.location.hash, "#mos2");
  assert.equal(page.historyReplacements.length, 1);
  assert.equal(page.scrolls[0].target, target);
  page.manager.commit("/lab", "material=mos2");
  page.flush();
  assert.equal(page.scrolls.length, 1);
});

test("new tabs, downloads, prevented clicks and external or unsafe URLs stay native", () => {
  for (const activation of [
    { button: 1 }, { ctrlKey: true }, { metaKey: true }, { shiftKey: true },
    { altKey: true }, { target: "_blank" }, { target: "preview" },
    { download: true }, { defaultPrevented: true },
  ]) assert.equal(navigationIntent(origin + "/research", "/foundations", activation), null);
  for (const href of ["https://example.com/", "javascript:alert(1)", "mailto:editor@example.com", "http://[", ""])
    assert.equal(navigationIntent(origin + "/research", href), null);
  assert.equal(navigationIntent(origin + "/research", "/foundations", { target: "_SELF" }).kind, "page");
});

test("a bottom-of-page cross-route click starts at the committed page top", () => {
  const page = browser();
  page.activate("/foundations");
  assert.equal(page.scrolls.length, 0, "do not scroll the outgoing page");
  page.win.location = new URL("/foundations", origin);
  page.manager.commit("/foundations");
  assert.deepEqual(page.scrolls, [{ top: 0, left: 0, behavior: "instant" }]);
  page.manager.commit("/foundations");
  assert.equal(page.scrolls.length, 1, "subsequent renders leave reading position alone");
});

test("an asynchronous hash destination opens closed ancestors and scrolls once", () => {
  const page = browser();
  page.activate("/about#ref-a");
  page.win.location = new URL("/about#ref-a", origin);
  page.manager.commit("/about");
  const outer = new page.Details(), target = new page.Details();
  target.parentElement = outer;
  page.targets.set("ref-a", target);
  page.mutate();
  assert.ok(outer.open && target.open);
  page.flush();
  assert.equal(page.scrolls[0].target, target);
  assert.equal(page.scrolls[0].behavior, "instant");
  assert.ok(page.observers.every((observer) => !observer.connected));
  page.mutate();
  assert.equal(page.scrolls.length, 1);
});

test("same-document anchors use smooth motion, with an immediate reduced-motion alternative", () => {
  const page = browser("/foundations");
  page.targets.set("bands", new page.Element());
  page.activate("#bands");
  page.flush();
  assert.equal(page.win.location.hash, "#bands");
  assert.equal(page.win.history.state.readingNote, "preserve");
  assert.equal(page.scrolls[0].behavior, "smooth");
  const target = page.targets.get("bands");
  assert.equal(target.attributes.get("tabindex"), "-1");
  assert.deepEqual(target.focusOptions, { preventScroll: true });
  page.win.matchMedia = () => ({ matches: true });
  page.activate("#bands");
  page.flush();
  assert.equal(page.scrolls[1].behavior, "instant");
});

test("same-document links notify hash subscribers once without a second scroll or history entry", () => {
  const page = browser("/challenges");
  const notifications = [];
  page.targets.set("interfaces", new page.Element());
  page.win.addEventListener("hashchange", (event) => {
    notifications.push({
      hash: page.win.location.hash,
      state: page.win.history.state,
      trusted: event.isTrusted,
    });
  });
  page.activate("#interfaces");
  assert.deepEqual(notifications, [{
    hash: "#interfaces",
    state: { readingNote: "preserve" },
    trusted: false,
  }]);
  assert.equal(page.historyEntries.length, 1);
  page.flush();
  assert.equal(page.scrolls.length, 1);
  assert.equal(page.scrolls[0].behavior, "smooth");
  page.flush();
  assert.equal(page.scrolls.length, 1, "synthetic notifications must not schedule another scroll");
  page.activate("#interfaces");
  page.flush();
  assert.equal(notifications.length, 1, "the unchanged hash does not notify again");
  assert.equal(page.historyEntries.length, 1, "the unchanged URL does not create another history entry");
  assert.equal(page.scrolls.length, 2, "a repeated user click still scrolls once");
});

test("back and forward cancel an incoming route correction and retain a hash reading position", () => {
  const page = browser("/foundations#bands");
  page.activate("/research#directions");
  page.win.location = new URL("/research#directions", origin);
  page.manager.commit("/research");
  page.win.location = new URL("/foundations#bands", origin);
  page.manager.restore();
  page.manager.commit("/foundations");
  page.targets.set("bands", new page.Element());
  page.manager.hashChanged();
  page.mutate();
  page.flush();
  assert.equal(page.scrolls.length, 0);
  assert.ok(page.observers.every((observer) => !observer.connected));
  const restored = browser("/foundations#bands", "back_forward");
  restored.targets.set("bands", new restored.Element());
  restored.manager.initialize();
  restored.flush();
  assert.equal(restored.scrolls.length, 0);
});

test("new navigation and filter updates cannot reveal a stale or invalid fragment", () => {
  const page = browser("/research#missing");
  page.manager.initialize();
  page.activate("/research?year=2026");
  page.win.location = new URL("/research?year=2026", origin);
  page.targets.set("missing", new page.Element());
  page.mutate();
  page.manager.commit("/research", "year=2026");
  page.flush();
  assert.deepEqual(page.scrolls, [{ top: 2400, left: 0, behavior: "instant" }]);
  assert.ok(page.observers.every((observer) => !observer.connected));
  assert.equal(fragmentId("#%E0%A4%A"), "");
  assert.equal(fragmentId("#%5Bdata-private%5D"), "[data-private]");
  page.activate("/foundations#%E0%A4%A");
  page.win.location = new URL("/foundations#%E0%A4%A", origin);
  page.manager.commit("/foundations");
  page.flush();
  assert.equal(page.scrolls.length, 1);
});

test("same-path query plus an explicit fragment reaches streamed study content", () => {
  const page = browser("/research?category=Contacts");
  page.activate("/research?category=Stacking#study-b");
  page.win.location = new URL("/research?category=Stacking#study-b", origin);
  page.manager.commit("/research", "category=Stacking");
  const target = new page.Element();
  page.targets.set("study-b", target);
  page.mutate();
  page.flush();
  assert.deepEqual(page.scrolls, [{ target, block: "start", behavior: "instant" }]);
  page.win.location = new URL("/research?category=Contacts", origin);
  page.manager.restore();
  page.manager.commit("/research", "category=Contacts");
  page.flush();
  assert.equal(page.scrolls.length, 1, "query history keeps its reading position");
});

test("native query filter changes leave scrolling entirely to the browser", () => {
  const page = browser("/research?year=2025");
  page.win.location = new URL("/research?year=2026", origin);
  page.manager.commit("/research", "year=2026");
  page.flush();
  assert.equal(page.scrolls.length, 0);
});

test("a disclosure's synthetic hash notification cannot jump away from its explanation", () => {
  const page = browser("/challenges");
  page.targets.set("interfaces", new page.Element());
  page.win.location = new URL("/challenges#interfaces", origin);
  page.manager.hashChanged({ isTrusted: false });
  page.flush();
  assert.equal(page.scrolls.length, 0);
});

test("fragment focus preserves a naturally focusable destination's tab order", () => {
  const page = browser("/foundations");
  const target = new page.Element();
  target.tabIndex = 0;
  page.targets.set("bands", target);
  page.activate("#bands");
  page.flush();
  assert.equal(target.hasAttribute("tabindex"), false);
  assert.deepEqual(target.focusOptions, { preventScroll: true });
});

test("a scheduled anchor scroll is cancelled by a newer destination or component disposal", () => {
  const page = browser("/foundations");
  page.targets.set("bands", new page.Element());
  page.activate("#bands");
  page.activate("/research");
  page.flush();
  assert.equal(page.scrolls.length, 0);
  page.activate("#bands");
  page.manager.dispose();
  page.flush();
  assert.equal(page.scrolls.length, 0);
});
