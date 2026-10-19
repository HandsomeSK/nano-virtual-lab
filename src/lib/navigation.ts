import { getPageCategory, pageHierarchy } from "./page-hierarchy.ts";

const categoryPageTitles: Partial<Record<(typeof pageHierarchy)[number]["href"], string>> = {
  "/foundations": "Foundations",
  "/simulator": "Transistor Simulator",
  "/research": "Research Knowledge Hub",
};

export const navigationCategories = pageHierarchy.map(({ children, ...category }) => ({
  ...category,
  links: [
    { href: category.href, title: categoryPageTitles[category.href] ?? category.title },
    ...children,
  ],
}));

const submenuLinks = navigationCategories.flatMap((category) => category.links);

export function selectedSubmenuHref(pathname: string) {
  return submenuLinks.find(({ href }) => href === pathname)?.href;
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
