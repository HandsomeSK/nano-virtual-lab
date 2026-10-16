import type { ReactNode } from "react";
import styles from "./page-contents.module.css";

export type PageContentsGroup = {
  title?: string;
  items: { id: string; label: string }[];
};

export function PageContents({ groups }: { groups: PageContentsGroup[] }) {
  return (
    <nav className={styles.contents} aria-label="On this page">
      <h2 className={styles.title}>On this page</h2>
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
  layout = "sidebar",
  children,
}: {
  groups: PageContentsGroup[];
  layout?: "sidebar" | "inline";
  children: ReactNode;
}) {
  return (
    <div className={layout === "inline" ? styles.inline : styles.sidebar}>
      <PageContents groups={groups} />
      <div className={styles.body}>{children}</div>
    </div>
  );
}
