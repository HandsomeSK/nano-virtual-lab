import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "./icon";
export function PageShell({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <div className="container page-shell">
      <div className="page-heading">
        <h1>{title}</h1>
        <p>{intro}</p>
      </div>
      {children}
    </div>
  );
}
export function SectionHeading({
  title,
  description,
  id,
}: {
  title: string;
  description?: string;
  id?: string;
}) {
  return (
    <div className="section-heading" id={id}>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}
export function RelatedTopics({
  links,
}: {
  links: { href: string; title: string; description: string }[];
}) {
  return (
    <section className="related-topics">
      <SectionHeading
        title="Continue Exploring"
        description="Connect this idea to the next part of the platform."
      />
      <div className="related-grid">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="related-link">
            <div>
              <h3>{link.title}</h3>
              <p>{link.description}</p>
            </div>
            <Icon name="arrow" />
          </Link>
        ))}
      </div>
    </section>
  );
}
export function Notice({ children }: { children: ReactNode }) {
  return <div className="notice">{children}</div>;
}
