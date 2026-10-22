"use client";
import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  createNavigationScroll,
  navigationIntent,
} from "@/lib/navigation-scroll";

export function AnchorNavigation() {
  const pathname = usePathname();
  const search = useSearchParams().toString();
  const manager = useRef<ReturnType<typeof createNavigationScroll> | null>(null);
  useEffect(() => {
    const scroll = createNavigationScroll(window, document);
    manager.current = scroll;
    let drawerObserver: MutationObserver | null = null;
    function stopTrackingDrawer() {
      drawerObserver?.disconnect();
      drawerObserver = null;
    }
    function readingKey(event: KeyboardEvent) {
      if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(event.key))
        stopTrackingDrawer();
    }
    function outsidePointer(event: PointerEvent) {
      if (event.target instanceof Element && !event.target.closest("[data-page-contents]"))
        stopTrackingDrawer();
    }
    function activate(event: MouseEvent) {
      const link =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>("a[href]")
          : null;
      if (!link) return;
      const intent = navigationIntent(window.location.href, link.href, {
        button: event.button,
        ctrlKey: event.ctrlKey,
        metaKey: event.metaKey,
        shiftKey: event.shiftKey,
        altKey: event.altKey,
        defaultPrevented: event.defaultPrevented,
        target: link.target,
        download: link.hasAttribute("download"),
      });
      if (!intent) return;
      stopTrackingDrawer();
      // Keep Next/native route links intact; handle only same-document fragments.
      if (intent.kind === "anchor") event.preventDefault();
      scroll.activate(intent);
      const drawer = link.closest("[data-page-contents]");
      if (
        intent.kind === "anchor" &&
        drawer?.getAttribute("data-open") === "true" &&
        window.matchMedia("(min-width: 1101px)").matches
      ) {
        // The reading width changes on collapse; align after that layout settles.
        drawerObserver = new MutationObserver(() => {
          if (drawer.getAttribute("data-open") !== "false") return;
          stopTrackingDrawer();
          scroll.realign(intent.destination);
        });
        drawerObserver.observe(drawer, { attributes: true, attributeFilter: ["data-open"] });
      }
    }
    scroll.initialize();
    document.addEventListener("click", activate, true);
    window.addEventListener("popstate", scroll.restore);
    window.addEventListener("hashchange", scroll.hashChanged);
    window.addEventListener("wheel", stopTrackingDrawer, { passive: true });
    window.addEventListener("touchmove", stopTrackingDrawer, { passive: true });
    document.addEventListener("keydown", readingKey);
    document.addEventListener("pointerdown", outsidePointer);
    return () => {
      stopTrackingDrawer();
      scroll.dispose();
      manager.current = null;
      document.removeEventListener("click", activate, true);
      window.removeEventListener("popstate", scroll.restore);
      window.removeEventListener("hashchange", scroll.hashChanged);
      window.removeEventListener("wheel", stopTrackingDrawer);
      window.removeEventListener("touchmove", stopTrackingDrawer);
      document.removeEventListener("keydown", readingKey);
      document.removeEventListener("pointerdown", outsidePointer);
    };
  }, []);
  useLayoutEffect(() => {
    manager.current?.commit(pathname, search);
  }, [pathname, search]);
  return null;
}
