"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import styles from "./page-contents.module.css";

type ContentsPanelProps = {
  title: string;
  navigation: ReactNode;
  children: ReactNode;
};

export function PageContentsPanel(props: ContentsPanelProps) {
  const pathname = usePathname();
  return <ContentsPanel key={pathname} {...props} />;
}

function ContentsPanel({ title, navigation, children }: ContentsPanelProps) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const frame = window.matchMedia("(max-width: 900px)").matches
      ? window.requestAnimationFrame(() => {
          panel.current?.scrollIntoView({ block: "start", behavior: "instant" });
        })
      : 0;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key !== "Escape" || event.defaultPrevented) return;
      const panelHasFocus = panel.current?.contains(document.activeElement);
      setOpen(false);
      if (panelHasFocus) trigger.current?.focus({ preventScroll: true });
    }
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  function notifyFragment(event: MouseEvent<HTMLElement>) {
    if (
      event.button !== 0 || event.ctrlKey || event.metaKey ||
      event.shiftKey || event.altKey
    )
      return;
    if (event.target instanceof Element && event.target.closest("a[href^='#']")) {
      // The shared anchor handler writes history during document capture.
      window.dispatchEvent(new Event("hashchange"));
    }
  }

  return (
    <div className={styles.frame} data-page-contents="" data-open={open}>
      <button
        ref={trigger}
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((value) => !value)}
      >
        <svg viewBox="0 0 20 20" width="18" height="18" fill="none" aria-hidden="true">
          <path
            d="M3 5h8M3 10h6M3 15h8m2-8 3 3-3 3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        Contents
      </button>
      <aside
        ref={panel}
        id={id}
        className={styles.panel}
        hidden={!open}
        aria-label={title}
        onClick={notifyFragment}
      >
        {navigation}
      </aside>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
