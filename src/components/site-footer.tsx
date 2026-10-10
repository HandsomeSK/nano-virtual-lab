import Link from "next/link";
import { Brand } from "./brand";
import { navigation, site } from "@/lib/site";
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <Brand />
          <p className="muted text-sm">
            An interactive educational research platform.
            <br />
            {site.courseCode} · {site.courseTitle}
          </p>
        </div>
        <nav aria-label="Footer navigation" className="footer-nav">
          {navigation.map(({ href, title }) => (
            <Link key={href} href={href}>
              {title}
            </Link>
          ))}
        </nav>
        <div className="footer-bottom">
          <span>Learn the physics. Explore the possibilities.</span>
          <Link href="/about#credits">Sources, model scope & credits ↗</Link>
        </div>
      </div>
    </footer>
  );
}
