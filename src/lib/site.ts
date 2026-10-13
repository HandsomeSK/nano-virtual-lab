export const site = {
  name: "NanoLab",
  url: "https://nano-virtual-lab.vercel.app",
  topic: "Nanomaterials",
  subtitle: "Beyond the visible",
  identity: "Nanotechnology Virtual Laboratory",
  description:
    "Discover nanomaterials through immersive atomic structures, interactive science and verified research. An independent nanotechnology virtual laboratory.",
};
export const navigation = [
  { href: "/", title: "Home" },
  { href: "/foundations", title: "Foundations" },
  { href: "/lab", title: "3D Lab" },
  { href: "/why-mos2", title: "MoS₂" },
  { href: "/device", title: "Device" },
  { href: "/simulator", title: "Simulator" },
  { href: "/comparison", title: "Comparison" },
  { href: "/challenges", title: "Engineering Challenges" },
  { href: "/research", title: "Research Frontier" },
  {
    href: "/discoveries/mos2-interface-breakthrough",
    title: "The Interface Breakthrough",
  },
  { href: "/about", title: "About & References" },
] as const;
export const primaryNavigation = [
  { href: "/foundations", title: "Materials" },
  { href: "/lab", title: "3D Lab" },
  { href: "/simulator", title: "Simulators" },
  { href: "/research", title: "Discoveries" },
] as const;
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
    title: "MoS₂ transistors",
    description: "Explore the layers of a transistor.",
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
