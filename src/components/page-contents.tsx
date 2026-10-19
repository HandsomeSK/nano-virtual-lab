"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useFragment } from "@/lib/use-fragment";
import styles from "./page-contents.module.css";

export type PageContentsGroup = {
  title?: string;
  items: { id: string; label: string; number?: string }[];
};

export function PageContents({
  groups,
  title = "On this page",
}: {
  groups: PageContentsGroup[];
  title?: string;
}) {
  const selected = useFragment();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const drawer = useRef<HTMLElement>(null);
  const panel = useRef<HTMLElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const keyboard = useRef(false);
  const focusFirst = useRef(false);
  const pointer = useRef("");

  const close = useCallback((restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) trigger.current?.focus({ preventScroll: true });
    else if (panel.current?.contains(document.activeElement))
      (document.activeElement as HTMLElement).blur();
  }, []);

  useEffect(() => {
    if (!open) return;
    if (focusFirst.current) {
      panel.current?.querySelector<HTMLAnchorElement>("a")?.focus();
      focusFirst.current = false;
    }
    function outside(event: PointerEvent) {
      if (event.target instanceof Node && !drawer.current?.contains(event.target))
        close();
    }
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close(true);
      }
    }
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [open, close]);

  return (
    <aside
      ref={drawer}
      className={styles.drawer}
      data-page-contents
      data-open={open}
      onPointerDown={(event) => {
        pointer.current = event.pointerType;
        keyboard.current = false;
      }}
      onKeyDown={() => {
        keyboard.current = true;
        pointer.current = "";
      }}
      onPointerLeave={(event) => {
        if (
          event.pointerType !== "mouse" ||
          !window.matchMedia("(any-hover: hover) and (any-pointer: fine)").matches ||
          (keyboard.current && drawer.current?.contains(document.activeElement))
        )
          return;
        close();
      }}
      onBlur={(event) => {
        if (keyboard.current && !event.currentTarget.contains(event.relatedTarget))
          close();
      }}
    >
      <button
        ref={trigger}
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close page contents" : "Open page contents"}
        onClick={(event) => {
          if (open) close();
          else {
            keyboard.current = event.detail === 0;
            focusFirst.current = keyboard.current;
            setOpen(true);
          }
        }}
      >
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M3 4h14M3 10h14M3 16h14" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <span>Contents</span>
        <svg className={styles.chevron} viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="m7 4 6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
      <nav
        ref={panel}
        id={panelId}
        className={styles.contents}
        aria-label={title}
        hidden={!open}
        inert={!open}
      >
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.groups}>
          {groups.map((group) => (
            <div className={styles.group} key={group.title ?? group.items[0]?.id}>
              {group.title ? <h3>{group.title}</h3> : null}
              <ul>
                {group.items.map((item) => (
                  <li key={item.id}>
                    <a
                      href={"#" + item.id}
                      aria-current={selected === item.id ? "location" : undefined}
                      onClick={(event) => {
                        if (
                          event.ctrlKey ||
                          event.metaKey ||
                          event.altKey ||
                          event.shiftKey ||
                          event.button !== 0
                        )
                          return;
                        if (event.detail !== 0 && pointer.current === "touch") close();
                      }}
                    >
                      {item.number ? (
                        <>
                          <span className={styles.number}>{item.number}</span>{" "}
                        </>
                      ) : null}
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </nav>
    </aside>
  );
}
