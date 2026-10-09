import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholder-page";
import { sections } from "@/lib/site";

export const metadata: Metadata = {
  title: "Explore",
  description:
    "A future home for guided concepts and visual learning. Scientific topic to be selected.",
};

export default function ExplorePage() {
  return <PlaceholderPage section={sections[0]} />;
}
