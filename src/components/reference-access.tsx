import type { Reference } from "@/data/references";
import { referenceResources } from "@/lib/reference-resources";

export function ReferenceAccess({ reference }: { reference: Reference }) {
  return (
    <div className="reference-access">
      {referenceResources(reference).map((resource) => (
        <a
          key={resource.href}
          className="text-link"
          href={resource.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {resource.label} <span aria-hidden="true">↗</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ))}
    </div>
  );
}
