type PageLink = { href: string; title: string };

// Page ownership is independent of which sections happen to appear in a menu.
export const pageHierarchy = [
  {
    href: "/foundations",
    title: "Materials",
    children: [
      { href: "/why-mos2", title: "MoS₂" },
      { href: "/device", title: "Transistor Principles" },
    ],
  },
  { href: "/lab", title: "3D Lab", children: [] },
  {
    href: "/simulator",
    title: "Simulators",
    children: [{ href: "/comparison", title: "Comparison" }],
  },
  {
    href: "/research",
    title: "Discoveries",
    children: [
      {
        href: "/discoveries/mos2-interface-breakthrough",
        title: "Interface Breakthrough",
      },
    ],
  },
  { href: "/challenges", title: "Engineering Challenges", children: [] },
] as const;

export const auxiliaryPages = [
  { href: "/about", title: "About & References" },
] as const;

export const primaryNavigation = pageHierarchy.map(({ href, title }) => ({
  href,
  title,
}));

export function getPageCategory(pathname: string) {
  return pageHierarchy.find(
    (category) =>
      category.href === pathname ||
      category.children.some((page) => page.href === pathname),
  );
}

export function getBreadcrumbs(pathname: string): PageLink[] {
  const home = { href: "/", title: "Home" };
  const category = getPageCategory(pathname);
  if (category) {
    const parent = { href: category.href, title: category.title };
    const page = category.children.find((item) => item.href === pathname);
    return page ? [home, parent, page] : [home, parent];
  }
  const auxiliary = auxiliaryPages.find((page) => page.href === pathname);
  return auxiliary ? [home, auxiliary] : [];
}
