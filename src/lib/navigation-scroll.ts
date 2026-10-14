export type NavigationIntent = {
  kind: "page" | "anchor" | "state" | "state-anchor";
  destination: URL;
};

type LinkActivation = {
  button?: number;
  ctrlKey?: boolean;
  metaKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  defaultPrevented?: boolean;
  target?: string;
  download?: boolean;
};

export function navigationIntent(
  current: string,
  href: string,
  activation: LinkActivation = {},
): NavigationIntent | null {
  if (
    !href ||
    activation.defaultPrevented ||
    (activation.button ?? 0) !== 0 ||
    activation.ctrlKey ||
    activation.metaKey ||
    activation.shiftKey ||
    activation.altKey ||
    activation.download ||
    (activation.target && activation.target.toLowerCase() !== "_self")
  )
    return null;
  let source: URL, destination: URL;
  try {
    source = new URL(current);
    destination = new URL(href, source);
  } catch {
    return null;
  }
  if (
    !["http:", "https:"].includes(destination.protocol) ||
    source.origin !== destination.origin
  )
    return null;
  const kind =
    source.pathname !== destination.pathname
      ? "page"
      : source.search !== destination.search
        ? destination.hash
          ? "state-anchor"
          : "state"
        : destination.hash || source.hash || href.endsWith("#")
          ? "anchor"
          : null;
  return kind ? { kind, destination } : null;
}

export function fragmentId(hash: string) {
  try {
    return decodeURIComponent(hash.slice(1));
  } catch {
    return "";
  }
}

export function createNavigationScroll(
  win: Window & typeof globalThis,
  doc: Document,
) {
  let pathname = win.location.pathname;
  let search = new URLSearchParams(win.location.search).toString();
  let pending: {
    intent: NavigationIntent;
    position: { top: number; left: number };
  } | null = null;
  let restoredUrl = "";
  let observer: MutationObserver | null = null;
  let frame = 0;

  function cancel() {
    if (frame) win.cancelAnimationFrame(frame);
    frame = 0;
    observer?.disconnect();
    observer = null;
  }

  function seek(destination: URL, behavior: ScrollBehavior) {
    cancel();
    const expectedUrl = destination.href;
    const id = fragmentId(destination.hash);
    if (destination.hash && !id) return;
    function reveal() {
      if (win.location.href !== expectedUrl) {
        cancel();
        return true;
      }
      const target = id ? doc.getElementById(id) : null;
      if (id && !target) return false;
      for (let ancestor = target; ancestor; ancestor = ancestor.parentElement) {
        if (ancestor instanceof win.HTMLDetailsElement) ancestor.open = true;
      }
      observer?.disconnect();
      frame = win.requestAnimationFrame(() => {
        frame = 0;
        if (win.location.href !== expectedUrl) return;
        if (target?.isConnected) {
          target.scrollIntoView({ block: "start", behavior });
          if (target instanceof win.HTMLElement) {
            if (target.tabIndex < 0 && !target.hasAttribute("tabindex"))
              target.setAttribute("tabindex", "-1");
            target.focus({ preventScroll: true });
          }
        } else if (!id) {
          win.scrollTo({ top: 0, left: 0, behavior });
        }
      });
      return true;
    }
    if (!reveal()) {
      observer = new win.MutationObserver(reveal);
      observer.observe(doc.getElementById("main-content") ?? doc.body, {
        childList: true,
        subtree: true,
      });
    }
  }

  return {
    initialize() {
      // A restored document already has a reading position, even with a hash.
      const navigation = win.performance.getEntriesByType(
        "navigation",
      )[0] as PerformanceNavigationTiming | undefined;
      if (win.location.hash && navigation?.type !== "back_forward")
        seek(new URL(win.location.href), "instant");
    },
    activate(intent: NavigationIntent) {
      cancel();
      pending = null;
      restoredUrl = "";
      if (intent.kind !== "anchor")
        pending = {
          intent,
          position: { top: win.scrollY, left: win.scrollX },
        };
      if (intent.kind === "anchor") {
        if (win.location.href !== intent.destination.href)
          win.history.pushState(win.history.state, "", intent.destination.href);
        seek(
          intent.destination,
          win.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "instant"
            : "smooth",
        );
      }
    },
    commit(nextPathname: string, nextSearch = "") {
      if (pathname === nextPathname && search === nextSearch) return;
      pathname = nextPathname;
      search = nextSearch;
      cancel();
      const navigation = pending;
      pending = null;
      if (
        !navigation ||
        win.location.href !== navigation.intent.destination.href
      )
        return;
      const { intent, position } = navigation;
      if (intent.kind === "state") {
        win.scrollTo({ ...position, behavior: "instant" });
        return;
      }
      if (intent.destination.hash) seek(intent.destination, "instant");
      else win.scrollTo({ top: 0, left: 0, behavior: "instant" });
    },
    restore() {
      cancel();
      pending = null;
      restoredUrl = win.location.href;
    },
    hashChanged(event?: HashChangeEvent) {
      // Widget notifications update state; their own controls decide to scroll.
      if (event && !event.isTrusted) return;
      if (win.location.href !== restoredUrl && win.location.hash)
        seek(new URL(win.location.href), "instant");
    },
    dispose: cancel,
  };
}
