import Link from "next/link";
import { references, referenceNumber, referenceHref } from "@/data/references";
export function ReferenceLink({ id, from }: { id: string; from: string }) {
  const reference = references.find((item) => item.id === id);
  if (!reference) return null;
  return (
    <Link
      className="citation"
      href={referenceHref(id, from)}
      aria-label={"Reference " + referenceNumber(id) + ": " + reference.title}
    >
      [{referenceNumber(id)}]
    </Link>
  );
}
