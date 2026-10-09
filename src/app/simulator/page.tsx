import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholder-page";
import { sections } from "@/lib/site";

export const metadata: Metadata = {
  title: "Simulator",
  description:
    "A planned virtual experiment workspace. Scientific models and topic are not yet defined.",
};

export default function SimulatorPage() {
  return <PlaceholderPage section={sections[1]} />;
}
