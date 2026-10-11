export const site = {
  name: "NanoLab: Beyond Silicon",
  courseCode: "MECH6045",
  courseTitle: "Nanotechnology: Fundamentals and Applications",
  description:
    "An Interactive Learning Platform for Nanotechnology and Next-Generation Electronics. Explore graphene, energy bands, MoS₂ transistors and educational simulations.",
};
export const navigation = [
  { href: "/", title: "Home" },
  { href: "/foundations", title: "Foundations" },
  { href: "/why-mos2", title: "From Graphene to MoS₂" },
  { href: "/device", title: "Device" },
  { href: "/simulator", title: "Simulator" },
  { href: "/comparison", title: "Comparison" },
  { href: "/challenges", title: "Engineering Challenges" },
  { href: "/research", title: "Research Frontier" },
  { href: "/about", title: "About & References" },
] as const;
export const journey = [
  {
    href: "/foundations",
    title: "Nanotechnology",
    description: "Find your bearings at the nanoscale.",
    tone: "indigo",
  },
  {
    href: "/foundations#graphene-electronics",
    title: "Graphene",
    description: "Explore extraordinary transport.",
    tone: "cyan",
  },
  {
    href: "/why-mos2#zero-gap",
    title: "Zero-gap challenge",
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
    title: "Devices",
    description: "Explore the layers of a transistor.",
    tone: "violet",
  },
  {
    href: "/simulator",
    title: "Simulation",
    description: "Change a parameter. See its effect.",
    tone: "indigo",
  },
  {
    href: "/challenges",
    title: "Challenges",
    description: "Connect the science to engineering.",
    tone: "orange",
  },
  {
    href: "/research",
    title: "Research",
    description: "Follow the evidence and open questions.",
    tone: "indigo",
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
