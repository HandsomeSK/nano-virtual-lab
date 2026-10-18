import type { ReactNode } from "react";
import styles from "./model-explanation.module.css";

export function ModelExplanation({
  title,
  label,
  children,
}: {
  title: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <details className={styles.explanation}>
      <summary>{title}</summary>
      <div
        className={styles.content}
        role="region"
        aria-label={label}
        tabIndex={0}
      >
        {children}
      </div>
    </details>
  );
}
