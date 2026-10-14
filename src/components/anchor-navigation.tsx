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
      // Keep Next/native route links intact; handle only same-document fragments.
      if (intent.kind === "anchor") event.preventDefault();
      scroll.activate(intent);
    }
    scroll.initialize();
    document.addEventListener("click", activate, true);
    window.addEventListener("popstate", scroll.restore);
    window.addEventListener("hashchange", scroll.hashChanged);
    return () => {
      scroll.dispose();
      manager.current = null;
      document.removeEventListener("click", activate, true);
      window.removeEventListener("popstate", scroll.restore);
      window.removeEventListener("hashchange", scroll.hashChanged);
    };
  }, []);
  useLayoutEffect(() => {
    manager.current?.commit(pathname, search);
  }, [pathname, search]);
  return null;
}
