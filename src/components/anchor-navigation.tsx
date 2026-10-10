"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function AnchorNavigation() {
  const pathname = usePathname();
  useEffect(() => {
    // Streamed route content can arrive after the browser's initial fragment scroll.
    const observer = new MutationObserver(reveal);
    function reveal() {
      let id: string;
      try {
        id = decodeURIComponent(window.location.hash.slice(1));
      } catch {
        return false;
      }
      if (!id) return false;
      const target = document.getElementById(id);
      if (!target) return false;
      for (
        let ancestor = target.parentElement;
        ancestor;
        ancestor = ancestor.parentElement
      ) {
        if (ancestor instanceof HTMLDetailsElement) ancestor.open = true;
      }
      target.scrollIntoView({ block: "start" });
      observer.disconnect();
      return true;
    }
    function seek() {
      observer.disconnect();
      if (window.location.hash && !reveal())
        observer.observe(document.getElementById("main-content")!, {
          childList: true,
          subtree: true,
        });
    }
    seek();
    window.addEventListener("hashchange", seek);
    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", seek);
    };
  }, [pathname]);
  return null;
}
