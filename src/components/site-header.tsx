"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { navigation } from "@/lib/site";
import { Brand } from "./brand";
import { Icon } from "./icon";
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const research = useRef<HTMLDetailsElement>(null);
  function close() {
    setOpen(false);
    if (research.current) research.current.open = false;
  }
  return (
    <header
      className="site-header"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          const wasMobile = open;
          close();
          if (wasMobile) menuButton.current?.focus();
          else research.current?.querySelector("summary")?.focus();
        }
      }}
    >
      <div className="container header-inner">
        <Brand />
        <nav aria-label="Main navigation" className="desktop-nav">
          {navigation.slice(0, 6).map(({ href, title }) => (
            <Link
              key={href}
              href={href}
              className="nav-link"
              aria-current={pathname === href ? "page" : undefined}
            >
              {title}
            </Link>
          ))}
          <details ref={research} className="nav-dropdown">
            <summary
              className="nav-link"
              data-active={
                pathname === "/research" || pathname === "/challenges"
              }
            >
              Research <span aria-hidden="true">⌄</span>
            </summary>
            <div className="dropdown-panel">
              {navigation.slice(6, 8).map(({ href, title }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={close}
                  aria-current={pathname === href ? "page" : undefined}
                >
                  {title}
                </Link>
              ))}
            </div>
          </details>
          <Link
            href="/about"
            className="nav-link"
            aria-current={pathname === "/about" ? "page" : undefined}
          >
            References
          </Link>
        </nav>
        <button
          ref={menuButton}
          type="button"
          className="menu-button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>
      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        hidden={!open}
        className="mobile-nav container"
      >
        {navigation.map(({ href, title }) => (
          <Link
            key={href}
            href={href}
            onClick={close}
            aria-current={pathname === href ? "page" : undefined}
          >
            {title}
          </Link>
        ))}
      </nav>
    </header>
  );
}
