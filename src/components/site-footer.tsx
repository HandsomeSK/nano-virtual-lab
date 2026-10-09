import Link from "next/link";
import { Brand } from "./brand";
import { navigation, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line py-10">
      <div className="container">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <Brand />
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap gap-x-6 gap-y-3"
          >
            {navigation
              .filter(({ href }) => href !== "/")
              .map(({ href, title }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm text-muted hover:text-teal"
                >
                  {title}
                </Link>
              ))}
          </nav>
        </div>
        <div className="mt-8 flex flex-col justify-between gap-3 border-t border-line pt-6 text-xs leading-relaxed text-muted sm:flex-row">
          <p>
            {site.courseCode} · {site.courseTitle}
          </p>
          <p>An educational project · In development</p>
        </div>
      </div>
    </footer>
  );
}
