import Link from "next/link";
import { Brand } from "./brand";
import { site } from "@/lib/site";
import { auxiliaryPages, pageHierarchy } from "@/lib/page-hierarchy";
import styles from "./site-footer.module.css";
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <Brand />
          <p className="muted text-sm">
            {site.topic} · 2D materials and transistor research.
            <br />
            An independent {site.identity}.
          </p>
        </div>
        <nav aria-label="Footer navigation" className={styles.navigation}>
          {pageHierarchy.map(({ href, title, children }) => (
            <div key={href} className={styles.group}>
              <h2>
                <Link href={href}>{title}</Link>
              </h2>
              {children.length ? (
                <ul>
                  {children.map((page) => (
                    <li key={page.href}>
                      <Link href={page.href}>{page.title}</Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </nav>
        <nav aria-label="Site information" className={styles.auxiliary}>
          {auxiliaryPages.map(({ href, title }) => (
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
