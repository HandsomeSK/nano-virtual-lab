"use client";

import { useSyncExternalStore } from "react";
import { fragmentId } from "@/lib/navigation-scroll";
import styles from "./page-contents.module.css";

function subscribe(callback: () => void) {
  window.addEventListener("hashchange", callback);
  window.addEventListener("popstate", callback);
  return () => {
    window.removeEventListener("hashchange", callback);
    window.removeEventListener("popstate", callback);
  };
}

function snapshot() {
  return fragmentId(window.location.hash);
}

function serverSnapshot() {
  return "";
}

export type PageContentsGroup = {
  title?: string;
  items: { id: string; label: string; number?: string }[];
};

export function PageContents({
  groups,
  title = "On this page",
}: {
  groups: PageContentsGroup[];
  title?: string;
}) {
  const selected = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
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
                  <a
                    href={"#" + item.id}
                    aria-current={selected === item.id ? "location" : undefined}
                  >
                    {item.number ? (
                      <>
                        <span className={styles.number}>{item.number}</span>{" "}
                      </>
                    ) : null}
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
