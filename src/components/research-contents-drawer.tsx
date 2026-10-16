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
import styles from "./research-contents-drawer.module.css";

export function ResearchContentsDrawer({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const id = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const releaseScroll = useRef<(() => void) | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const modal = dialog.current;
    return () => {
      releaseScroll.current?.();
      releaseScroll.current = null;
      modal?.close();
    };
  }, [pathname]);

  function openDrawer() {
    const modal = dialog.current;
    if (!modal || modal.open) return;
    modal.showModal();
    const body = document.body;
    const previousOverflow = body.style.overflow;
    releaseScroll.current = () => {
      body.style.overflow = previousOverflow;
    };
    body.style.overflow = "hidden";
    setOpen(true);
  }

  function finishClosing() {
    releaseScroll.current?.();
    releaseScroll.current = null;
    setOpen(false);
  }

  function closeDrawer() {
    dialog.current?.close();
    finishClosing();
  }

  function closeForAnchor(event: MouseEvent<HTMLDivElement>) {
    if (
      event.button !== 0 || event.ctrlKey || event.metaKey ||
      event.shiftKey || event.altKey
    )
      return;
    if (event.target instanceof Element && event.target.closest("a[href^='#']")) {
      // AnchorNavigation focuses the destination next frame; close synchronously first.
      closeDrawer();
    }
  }

  function closeOnBackdrop(event: MouseEvent<HTMLDialogElement>) {
    if (event.target !== event.currentTarget) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
    )
      closeDrawer();
  }

  return (
    <>
      <button
        type="button"
        className={styles.trigger}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={id}
        onClick={openDrawer}
      >
        <svg viewBox="0 0 20 20" width="18" height="18" fill="none" aria-hidden="true">
          <path
            d="M4 5h12M4 10h8M4 15h12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        Contents
      </button>
      <dialog
        ref={dialog}
        id={id}
        className={styles.drawer}
        aria-labelledby={id + "-title"}
        onClose={() => {
          if (!dialog.current?.open) finishClosing();
        }}
        onCancel={(event) => {
          event.preventDefault();
          closeDrawer();
        }}
        onClick={closeOnBackdrop}
      >
        <header className={styles.heading}>
          <h2 id={id + "-title"}>Research contents</h2>
          <button type="button" onClick={closeDrawer} aria-label="Close research contents">
            <svg viewBox="0 0 20 20" width="20" height="20" fill="none" aria-hidden="true">
              <path
                d="m5 5 10 10M15 5 5 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </header>
        <div className={styles.body} onClickCapture={closeForAnchor}>
          {children}
        </div>
      </dialog>
    </>
  );
}
