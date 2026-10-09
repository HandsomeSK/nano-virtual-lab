"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { navigation, site } from "@/lib/site";
import { Brand } from "./brand";
import { Icon } from "./icon";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  return (
    <header className="relative z-20 border-b border-line bg-paper">
      <div className="container flex min-h-24 items-center justify-between gap-8">
        <Brand />
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-8 md:flex"
        >
          {navigation.map(({ href, title }) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              className={`nav-link ${pathname === href ? "nav-link-active" : ""}`}
            >
              {title}
            </Link>
          ))}
        </nav>
        <span className="hidden rounded-full border border-line px-3 py-1.5 font-mono text-[11px] tracking-wide lg:block">
          {site.courseCode}
        </span>
        <button
          ref={menuButton}
          type="button"
          className="rounded-lg border border-line p-2.5 md:hidden"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((previous) => !previous)}
          onKeyDown={(event) => {
            if (event.key === "Escape") setOpen(false);
          }}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>
      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        hidden={!open}
        className="border-t border-line bg-paper md:hidden"
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setOpen(false);
            menuButton.current?.focus();
          }
        }}
      >
        <div className="container grid gap-1 py-4">
          {navigation.map(({ href, title }) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              className={`rounded-lg px-4 py-3 text-sm ${pathname === href ? "bg-sage font-semibold text-teal" : "text-muted"}`}
              onClick={() => setOpen(false)}
            >
              {title}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
