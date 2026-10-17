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
  children,
}: {
  title: string;
  intro: string;
  contents?: PageContentsGroup[];
  children: ReactNode;
}) {
  const page = (
    <div className="container page-shell">
      <div className="page-heading">
        <h1>{title}</h1>
        <p>{intro}</p>
      </div>
      {children}
    </div>
  );
  return contents?.length ? (
    <PageContentsLayout groups={contents}>{page}</PageContentsLayout>
  ) : (
    page
  );
}
export function SectionHeading({
  title,
  description,
  id,
  number,
}: {
  title: string;
  description?: string;
  id?: string;
  number?: string;
}) {
  return (
    <div className="section-heading" id={id}>
      <h2 className={number ? "numbered-section-title" : undefined}>
        {number ? (
          <>
            <span className="section-number">{number}</span>{" "}
            <span>{title}</span>
          </>
        ) : title}
      </h2>
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
