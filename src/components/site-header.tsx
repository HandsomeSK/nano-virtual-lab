"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { primaryNavigation } from "@/lib/site";
import { Brand } from "./brand";

export function NanoNavigation({ entrance = false }: { entrance?: boolean }) {
  const pathname = usePathname();
  const navId = useId();
  const [open, setOpen] = useState(false);
  const burger = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  const nav = useRef<HTMLElement>(null);
  const motion = (kind: string, delay: number) =>
    entrance
      ? {
          className: "appear appear--" + kind,
          style: { "--d": delay + "s" } as CSSProperties,
        }
      : { className: "", style: undefined };
  useEffect(() => {
    if (!open) return;
    const media = matchMedia("(min-width: 901px)");
    const backgrounds = document.querySelectorAll<HTMLElement>(
      pathname === "/"
        ? "[data-menu-background]"
        : "#main-content, .site-footer",
    );
    document.body.classList.add("menu-open");
    backgrounds.forEach((el) => {
      el.inert = true;
    });
    const focusFrame = requestAnimationFrame(() =>
      nav.current?.querySelector<HTMLAnchorElement>("a")?.focus(),
    );
    function closeAndFocus() {
      setOpen(false);
      burger.current?.focus();
    }
    function keydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeAndFocus();
      }
      if (event.key !== "Tab") return;
      const items = [
        ...(header.current?.querySelectorAll<HTMLElement>("a, button") ?? []),
      ];
      const first = items[0],
        last = items.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }
    function resize() {
      if (media.matches) closeAndFocus();
    }
    document.addEventListener("keydown", keydown);
    media.addEventListener("change", resize);
    return () => {
      cancelAnimationFrame(focusFrame);
      document.body.classList.remove("menu-open");
      backgrounds.forEach((el) => {
        el.inert = false;
      });
      document.removeEventListener("keydown", keydown);
      media.removeEventListener("change", resize);
    };
  }, [open, pathname]);
  return (
    <>
      <button
        type="button"
        className="menu-backdrop"
        aria-label="Close menu"
        tabIndex={-1}
        data-open={open}
        onClick={() => {
          setOpen(false);
          burger.current?.focus();
        }}
      />
      <header ref={header} className="nano-header">
        <div
          {...motion("scale", 0.08)}
          className={"nano-logo " + motion("scale", 0.08).className}
        >
          <Brand />
        </div>
        <nav
          ref={nav}
          id={navId}
          aria-label="Primary"
          className="nano-nav"
          data-open={open}
        >
          {primaryNavigation.map(({ href, title }, i) => (
            <Link
              key={href}
              href={href}
              {...motion(i % 2 ? "soft" : "scale", 0.16 + i * 0.12)}
              className={
                "metal-link " +
                motion(i % 2 ? "soft" : "scale", 0.16 + i * 0.12).className
              }
              aria-current={
                pathname === href ||
                (href === "/research" && pathname.startsWith("/discoveries/"))
                  ? "page"
                  : undefined
              }
              onClick={() => setOpen(false)}
            >
              {title}
            </Link>
          ))}
        </nav>
        <Link
          href="/foundations"
          {...motion("scale", 0.34)}
          className={
            "metal-button metal-solid header-cta " +
            motion("scale", 0.34).className
          }
          onClick={() => setOpen(false)}
        >
          Explore NanoLab
        </Link>
        <button
          ref={burger}
          type="button"
          {...motion("scale", 0.34)}
          className={"nano-burger " + motion("scale", 0.34).className}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls={navId}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>
    </>
  );
}
export function SiteHeader() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return (
    <div className="site-header">
      <NanoNavigation />
    </div>
  );
}
