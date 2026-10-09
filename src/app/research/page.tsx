import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholder-page";
import { sections } from "@/lib/site";

export const metadata: Metadata = {
  title: "Research",
  description:
    "A planned space for literature, references, and evidence. Resources will follow topic selection.",
};

export default function ResearchPage() {
  return <PlaceholderPage section={sections[2]} />;
}
