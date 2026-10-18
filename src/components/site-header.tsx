"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import {
  isActiveCategory,
  keepSubmenuOnPointerLeave,
  navigationCategories,
  selectedSubmenuHref,
} from "@/lib/navigation";
import { useFragment } from "@/lib/use-fragment";
import { Brand } from "./brand";
import { AppreciationButton } from "./appreciation-button";

export function NanoNavigation({ entrance = false }: { entrance?: boolean }) {
  const pathname = usePathname();
  const selectedHref = selectedSubmenuHref(pathname, useFragment());
  const navId = useId();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const keyboardInteraction = useRef(false);
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
  function cancelClose() {
    if (closeTimer.current !== null) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  }
  function closeNavigation() {
    cancelClose();
    setExpanded(null);
    setOpen(false);
  }
  function leaveCategory(element: HTMLElement, href: string) {
    cancelClose();
    closeTimer.current = setTimeout(() => {
      if (
        !keepSubmenuOnPointerLeave(
          keyboardInteraction.current,
          element.contains(document.activeElement),
        )
      )
        setExpanded((current) => (current === href ? null : current));
    }, 160);
  }
  useEffect(() => {
    const media = matchMedia("(min-width: 901px)");
    function historyNavigation() {
      setExpanded(null);
      setOpen(false);
    }
    function resize() {
      setExpanded(null);
      if (media.matches) {
        setOpen(false);
        if (document.activeElement === burger.current)
          header.current?.querySelector<HTMLAnchorElement>("a")?.focus();
      }
    }
    media.addEventListener("change", resize);
    window.addEventListener("popstate", historyNavigation);
    return () => {
      if (closeTimer.current !== null) clearTimeout(closeTimer.current);
      media.removeEventListener("change", resize);
      window.removeEventListener("popstate", historyNavigation);
    };
  }, []);
  useEffect(() => {
    if (!expanded) return;
    function outside(event: PointerEvent | FocusEvent) {
      if (event.target instanceof Node && !nav.current?.contains(event.target))
        setExpanded(null);
    }
    document.addEventListener("pointerdown", outside);
    document.addEventListener("focusin", outside);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("focusin", outside);
    };
  }, [expanded]);
  useEffect(() => {
    if (!open) return;
    const backgrounds = document.querySelectorAll<HTMLElement>(
      pathname === "/"
        ? "[data-menu-background]"
        : "#main-content, .site-footer",
    );
    const priorInert = [...backgrounds].map((el) => el.inert);
    document.body.classList.add("menu-open");
    backgrounds.forEach((el) => {
      el.inert = true;
    });
    const focusFrame = requestAnimationFrame(() =>
      nav.current?.querySelector<HTMLAnchorElement>("a")?.focus(),
    );
    function closeAndFocus() {
      setExpanded(null);
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
      ].filter((el) => !el.closest("[inert]") && el.getClientRects().length);
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
    document.addEventListener("keydown", keydown);
    return () => {
      cancelAnimationFrame(focusFrame);
      document.body.classList.remove("menu-open");
      backgrounds.forEach((el, index) => {
        el.inert = priorInert[index];
      });
      document.removeEventListener("keydown", keydown);
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
          closeNavigation();
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
          onKeyDown={(event) => {
            if (event.key === "Tab" && expanded)
              keyboardInteraction.current = true;
            if (event.key !== "Escape" || (!expanded && !open)) return;
            event.preventDefault();
            event.stopPropagation();
            if (open) {
              closeNavigation();
              burger.current?.focus();
            } else {
              const trigger = nav.current?.querySelector<HTMLButtonElement>(
                `[data-submenu-toggle="${expanded}"]`,
              );
              cancelClose();
              setExpanded(null);
              trigger?.focus();
            }
          }}
        >
          {navigationCategories.map((category, i) => {
            const { href, title, groups } = category;
            const hasSubmenu = groups.length > 0;
            const panelId = `${navId}-category-${i}`;
            const isExpanded = expanded === href;
            return (
              <div
                key={href}
                className="nav-category"
                data-expanded={isExpanded}
                data-active={isActiveCategory(category, pathname)}
                onPointerEnter={(event) => {
                  if (
                    event.pointerType === "mouse" &&
                    matchMedia("(min-width: 901px)").matches
                  ) {
                    cancelClose();
                    keyboardInteraction.current = false;
                    setExpanded(hasSubmenu ? href : null);
                  }
                }}
                onPointerLeave={(event) => {
                  if (
                    hasSubmenu &&
                    event.pointerType === "mouse" &&
                    matchMedia("(min-width: 901px)").matches
                  )
                    leaveCategory(event.currentTarget, href);
                }}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) {
                    cancelClose();
                    setExpanded((current) => (current === href ? null : current));
                  }
                }}
              >
                <div
                  {...motion(i % 2 ? "soft" : "scale", 0.16 + i * 0.12)}
                  className={
                    "nav-category-row " +
                    motion(i % 2 ? "soft" : "scale", 0.16 + i * 0.12).className
                  }
                >
                  <Link
                    href={href}
                    className="metal-link"
                    aria-current={pathname === href ? "page" : undefined}
                    onClick={closeNavigation}
                    onKeyDown={(event) => {
                      if (!hasSubmenu || event.key !== "ArrowDown") return;
                      event.preventDefault();
                      cancelClose();
                      keyboardInteraction.current = true;
                      setExpanded(href);
                      requestAnimationFrame(() =>
                        document
                          .getElementById(panelId)
                          ?.querySelector<HTMLAnchorElement>("a")
                          ?.focus(),
                      );
                    }}
                  >
                    {title}
                  </Link>
                  {hasSubmenu ? (
                    <button
                      type="button"
                      className="nav-category-toggle"
                      aria-label={`${isExpanded ? "Close" : "Open"} ${title} submenu`}
                      aria-expanded={isExpanded}
                      aria-controls={panelId}
                      data-submenu-toggle={href}
                      onClick={(event) => {
                        cancelClose();
                        keyboardInteraction.current = event.detail === 0;
                        setExpanded((current) => (current === href ? null : href));
                      }}
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        aria-hidden="true"
                      >
                        <path
                          d="m2.5 4.5 3.5 3 3.5-3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </button>
                  ) : null}
                </div>
                {hasSubmenu ? (
                  <div
                    id={panelId}
                    className="nav-submenu"
                    role="region"
                    aria-label={`${title} sections`}
                    aria-hidden={!isExpanded}
                    inert={!isExpanded}
                  >
                    {groups.map((group, groupIndex) => (
                      <div className="nav-submenu-group" key={group.title}>
                        <h2 id={`${panelId}-group-${groupIndex}`}>{group.title}</h2>
                        <ul aria-labelledby={`${panelId}-group-${groupIndex}`}>
                          {group.links.map((link) => (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                prefetch={false}
                                aria-current={
                                  selectedHref === link.href
                                    ? link.href.includes("#") ? "location" : "page"
                                    : undefined
                                }
                                onClick={closeNavigation}
                              >
                                {link.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>
        <AppreciationButton {...motion("scale", 0.34)} />
        <button
          ref={burger}
          type="button"
          {...motion("scale", 0.34)}
          className={"nano-burger " + motion("scale", 0.34).className}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls={navId}
          onClick={() => {
            cancelClose();
            setExpanded(null);
            setOpen((value) => !value);
          }}
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
