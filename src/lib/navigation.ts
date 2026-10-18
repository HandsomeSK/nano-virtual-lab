import { getPageCategory, primaryNavigation } from "./page-hierarchy.ts";
import { fragmentId } from "./navigation-scroll.ts";

type NavigationLink = { href: string; title: string };
type NavigationGroup = { title: string; links: readonly NavigationLink[] };

const categoryGroups: Record<
  (typeof primaryNavigation)[number]["href"],
  readonly NavigationGroup[]
> = {
  "/foundations": [
    {
      title: "Material fundamentals",
      links: [
        { href: "/foundations#nanoscale", title: "Understanding the nanoscale" },
        { href: "/foundations#quantum", title: "Quantum mechanics & energy bands" },
        { href: "/foundations#characterization", title: "Material characterization" },
      ],
    },
    {
      title: "Materials & devices",
      links: [
        { href: "/foundations#graphene-structure", title: "Graphene crystal structure" },
        { href: "/foundations#graphene-electronics", title: "Graphene electronic properties" },
        { href: "/why-mos2", title: "From graphene to MoS₂" },
        { href: "/device", title: "Transistor working principle" },
      ],
    },
  ],
  "/lab": [],
  "/simulator": [
    {
      title: "Numerical model",
      links: [
        { href: "/simulator#parameter-gateVoltage", title: "Explore bias & device parameters" },
        { href: "/simulator#understanding-results", title: "Interpret the model results" },
        { href: "/simulator#model-assumptions", title: "Device physics & model assumptions" },
      ],
    },
    {
      title: "Compare with context",
      links: [
        { href: "/comparison", title: "Compare configurations" },
        { href: "/comparison#saved", title: "Saved configurations" },
        { href: "/comparison#benchmarking", title: "Benchmarking limitations" },
        { href: "/simulator#experimental-evidence", title: "Measured transfer curves" },
      ],
    },
  ],
  "/research": [
    {
      title: "Research knowledge hub",
      links: [
        { href: "/research#research-directions", title: "Six research directions" },
        { href: "/research#research-connections", title: "How the directions connect" },
        { href: "/research#research-evidence", title: "Research evidence" },
      ],
    },
    {
      title: "Discoveries & studies",
      links: [
        { href: "/research#featured-discovery", title: "Featured discovery" },
        { href: "/research#timeline", title: "Research timeline" },
        { href: "/research#catalogue", title: "Study catalogue" },
        { href: "/discoveries/mos2-interface-breakthrough", title: "The MoS₂ interface breakthrough" },
      ],
    },
  ],
  "/challenges": [
    {
      title: "Device physics",
      links: [
        { href: "/challenges#contacts", title: "Contact resistance" },
        { href: "/challenges#interfaces", title: "Gate dielectric & interface" },
        { href: "/challenges#scaling", title: "Short-channel effects" },
      ],
    },
    {
      title: "Integration & operation",
      links: [
        { href: "/challenges#manufacturing", title: "Manufacturing & integration" },
        { href: "/challenges#thermal-management", title: "Heat removal" },
        { href: "/challenges#operating-history", title: "Instability over time" },
        { href: "/challenges#complementary-logic", title: "Complementary logic" },
        { href: "/challenges#outlook", title: "Bringing the pieces together" },
      ],
    },
  ],
};

export const navigationCategories = primaryNavigation.map((category) => ({
  ...category,
  groups: categoryGroups[category.href],
}));

const submenuLinks = navigationCategories.flatMap((category) =>
  category.groups.flatMap((group) => group.links),
);

export function selectedSubmenuHref(pathname: string, fragment: string) {
  return (
    submenuLinks.find(({ href }) => {
      const [page, hash] = href.split("#");
      return page === pathname && hash && fragmentId("#" + hash) === fragment;
    })?.href ?? submenuLinks.find(({ href }) => href === pathname)?.href
  );
}

export function isActiveCategory(
  category: (typeof navigationCategories)[number],
  pathname: string,
) {
  return getPageCategory(pathname)?.href === category.href;
}

export function keepSubmenuOnPointerLeave(
  keyboardInteraction: boolean,
  focusInside: boolean,
) {
  return keyboardInteraction && focusInside;
}
