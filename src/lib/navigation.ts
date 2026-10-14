import { primaryNavigation } from "./site.ts";

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
        { href: "/foundations", title: "Materials overview" },
        { href: "/foundations#nanoscale", title: "Understanding the nanoscale" },
        { href: "/foundations#quantum", title: "Quantum mechanics & energy bands" },
        { href: "/foundations#characterization", title: "Material characterization" },
      ],
    },
    {
      title: "Two-dimensional materials",
      links: [
        { href: "/foundations#graphene-structure", title: "Graphene crystal structure" },
        { href: "/foundations#graphene-electronics", title: "Graphene electronic properties" },
        { href: "/why-mos2", title: "From graphene to MoS₂" },
        { href: "/why-mos2#possibilities", title: "MoS₂ properties & opportunities" },
      ],
    },
  ],
  "/lab": [
    {
      title: "Atomic structures",
      links: [
        { href: "/lab", title: "3D Lab overview" },
        { href: "/lab?material=graphene", title: "Graphene & carbon bonds" },
        { href: "/lab?material=mos2", title: "MoS₂ layers & stacking" },
      ],
    },
    {
      title: "Device inspection",
      links: [
        { href: "/lab#transistor", title: "Inspect the transistor stack" },
        { href: "/device", title: "Device explorer" },
        { href: "/device#working-principle", title: "How the gate controls a channel" },
      ],
    },
  ],
  "/simulator": [
    {
      title: "Interactive models",
      links: [
        { href: "/simulator", title: "Simulator overview" },
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
        { href: "/research#research-overview", title: "Research overview" },
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
      title: "Control the device",
      links: [
        { href: "/challenges", title: "Challenges overview" },
        { href: "/challenges#contacts", title: "Contact resistance" },
        { href: "/challenges#interfaces", title: "Gate dielectric & interface" },
      ],
    },
    {
      title: "Build reliable circuits",
      links: [
        { href: "/challenges#scaling", title: "Short-channel effects" },
        { href: "/challenges#manufacturing", title: "Manufacturing & integration" },
      ],
    },
  ],
};

export const navigationCategories = primaryNavigation.map((category) => ({
  ...category,
  groups: categoryGroups[category.href],
}));

export function isActiveCategory(
  category: (typeof navigationCategories)[number],
  pathname: string,
) {
  return (
    pathname === category.href ||
    category.groups.some((group) =>
      group.links.some((link) => link.href.split(/[?#]/, 1)[0] === pathname),
    )
  );
}

export function keepSubmenuOnPointerLeave(
  keyboardInteraction: boolean,
  focusInside: boolean,
) {
  return keyboardInteraction && focusInside;
}
