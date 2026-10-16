import type { ReactNode } from "react";
import { PageContentsPanel } from "./page-contents-panel";
import styles from "./page-contents.module.css";

export type PageContentsGroup = {
  title?: string;
  items: { id: string; label: string }[];
};

export function PageContents({
  groups,
  title = "On this page",
}: {
  groups: PageContentsGroup[];
  title?: string;
}) {
  return (
    <nav className={styles.contents} aria-label={title}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.groups}>
        {groups.map((group) => (
          <div className={styles.group} key={group.title ?? group.items[0]?.id}>
            {group.title ? <h3>{group.title}</h3> : null}
            <ul>
              {group.items.map((item) => (
                <li key={item.id}>
                  <a href={"#" + item.id}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}

export function PageContentsLayout({
  groups,
  title = "On this page",
  children,
}: {
  groups: PageContentsGroup[];
  title?: string;
  children: ReactNode;
}) {
  return (
    <PageContentsPanel
      title={title}
      navigation={<PageContents groups={groups} title={title} />}
    >
      {children}
    </PageContentsPanel>
  );
}
