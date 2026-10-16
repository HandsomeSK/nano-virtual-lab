import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "./icon";
import {
  PageContentsLayout,
  type PageContentsGroup,
} from "./page-contents";
export function PageShell({
  title,
  intro,
  contents,
  contentsLayout = "sidebar",
  children,
}: {
  title: string;
  intro: string;
  contents?: PageContentsGroup[];
  contentsLayout?: "sidebar" | "inline";
  children: ReactNode;
}) {
  return (
    <div className="container page-shell">
      <div className="page-heading">
        <h1>{title}</h1>
        <p>{intro}</p>
      </div>
      {contents?.length ? (
        <PageContentsLayout groups={contents} layout={contentsLayout}>
          {children}
        </PageContentsLayout>
      ) : (
        children
      )}
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
      <SectionHeading title="Related topics" />
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
