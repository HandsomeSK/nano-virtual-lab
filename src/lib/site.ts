export const site = {
  name: "NanoLab: Beyond Silicon",
  courseCode: "MECH6045",
  courseTitle: "Nanotechnology: Fundamentals and Applications",
  description:
    "Explore MoS₂ beyond silicon through nanoscale foundations, a 3D device explorer, educational transistor simulations, and research.",
};
export const navigation = [
  { href: "/", title: "Home" },
  { href: "/foundations", title: "Foundations" },
  { href: "/why-mos2", title: "Why MoS₂?" },
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
    title: "Foundations",
    description: "Start with six ideas at the nanoscale.",
  },
  {
    href: "/why-mos2",
    title: "Why MoS₂?",
    description: "Understand the material choice.",
  },
  {
    href: "/device",
    title: "Device",
    description: "Explore the layers of a transistor.",
  },
  {
    href: "/simulator",
    title: "Simulator",
    description: "Change a parameter. See its effect.",
  },
  {
    href: "/comparison",
    title: "Comparison",
    description: "Compare materials and your scenarios.",
  },
  {
    href: "/research",
    title: "Research",
    description: "Follow the evidence and open questions.",
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
