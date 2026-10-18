import { auxiliaryPages, pageHierarchy } from "./page-hierarchy.ts";
export { primaryNavigation } from "./page-hierarchy.ts";

export const site = {
  name: "NanoLab",
  url: "https://nano-virtual-lab.vercel.app",
  topic: "Nanomaterials",
  subtitle: "Beyond the visible",
  identity: "Nanotechnology Virtual Laboratory",
  description:
    "Learn nanomaterial principles, explore three scientific models in one 3D Lab, and test transistor parameters with numerical simulations and verified research.",
};
export const navigation = [
  { href: "/", title: "Home" },
  ...pageHierarchy.flatMap(({ href, title, children }) => [
    { href, title },
    ...children,
  ]),
  ...auxiliaryPages,
];
export const journey = [
  {
    href: "/foundations",
    title: "Nanomaterials",
    description: "Explore size-dependent and surface properties.",
    tone: "indigo",
  },
  {
    href: "/foundations#graphene-structure",
    title: "2D materials & graphene",
    description: "Connect atomic structure with electronic properties.",
    tone: "cyan",
  },
  {
    href: "/why-mos2#zero-gap",
    title: "Graphene limitations",
    description: "Ask what a digital switch needs.",
    tone: "cyan",
  },
  {
    href: "/why-mos2#meet-mos2",
    title: "MoS₂",
    description: "Meet a 2D semiconductor.",
    tone: "violet",
  },
  {
    href: "/device",
    title: "Transistor principles",
    description: "Understand how a gate controls the channel.",
    tone: "violet",
  },
  {
    href: "/simulator",
    title: "Interactive simulations",
    description: "Change a parameter. See its effect.",
    tone: "indigo",
  },
  {
    href: "/research",
    title: "Latest research",
    description: "Explore 2024–2026 developments and their foundations.",
    tone: "indigo",
  },
  {
    href: "/challenges",
    title: "Future & challenges",
    description: "Connect future applications with engineering limits.",
    tone: "orange",
  },
];
export type Query = Record<string, string | string[] | undefined>;
export function queryValue(query: Query, key: string) {
  return typeof query[key] === "string" ? (query[key] as string) : "";
}
export function safeReturnPath(value: string) {
  try {
    const url = new URL(value, "https://nanolab.invalid");
    if (
      url.origin === "https://nanolab.invalid" &&
      navigation.some((item) => item.href === url.pathname)
    )
      return url.pathname + url.search + url.hash;
  } catch {}
  return "/";
}
