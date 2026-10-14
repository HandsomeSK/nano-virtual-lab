import type { Reference } from "../data/references";

export function referenceResources(reference: Pick<Reference, "doi" | "url">) {
  let source: URL | undefined;
  try {
    const candidate = new URL(reference.url ?? "");
    if (candidate.protocol === "https:") source = candidate;
  } catch {}

  const resources: { href: string; label: string }[] = [];
  if (reference.doi) {
    resources.push({
      href: "https://doi.org/" + reference.doi,
      label: "Read publication",
    });
  } else if (source) {
    return [{ href: source.href, label: "View original source" }];
  }
  if (!source) return resources;

  const doi = reference.doi?.toLowerCase();
  const path = source.pathname.replace(/\/$/, "").toLowerCase();
  const samePublication =
    (source.hostname === "doi.org" && path === "/" + doi) ||
    (source.hostname === "www.nature.com" &&
      path === "/articles/" + doi?.split("/").slice(1).join("/")) ||
    (source.hostname === "journals.aps.org" && path.endsWith("/abstract/" + doi)) ||
    (source.hostname === "pubs.acs.org" && path === "/doi/" + doi);
  if (!samePublication) {
    resources.push({
      href: source.href,
      label: path.endsWith(".pdf")
        ? "Read full text"
        : source.hostname === "arxiv.org"
          ? "Read manuscript"
          : "View supporting resource",
    });
  }
  return resources;
}
