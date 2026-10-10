import type { Metadata } from "next";
import Link from "next/link";
import {
  PageShell,
  RelatedTopics,
  SectionHeading,
  Notice,
} from "@/components/page-shell";
import { ChallengeExplorer } from "@/components/challenge-explorer";
export const metadata: Metadata = { title: "Engineering Challenges" };
export default function Page() {
  return (
    <PageShell
      title="Engineering Challenges"
      intro="An atomically thin channel is only one part of a reliable transistor. Explore the interfaces, electrostatics and processes that shape a device."
    >
      <section className="section">
        <SectionHeading
          title="Challenges Overview"
          description="Select a category, then connect the mechanism to the teaching model and real research."
        />
        <Notice>
          Simulator links illustrate resistance or ideal length scaling.
          Interface traps, tunnelling, short-channel effects and fabrication
          variability are outside the V1 model.
        </Notice>
        <ChallengeExplorer />
      </section>
      <section className="section">
        <SectionHeading
          title="Potential Solutions"
          description="Progress requires materials, device design and process engineering together."
        />
        <p>
          Contact and dielectric engineering can improve individual devices.
          Scalable growth, repeatable integration and careful characterization
          are needed to translate those gains into circuits.
        </p>
        <Link className="text-link" href="/research">
          Follow selected research directions →
        </Link>
      </section>
      <RelatedTopics
        links={[
          {
            href: "/simulator#parameter-contactResistance",
            title: "Simulator",
            description: "Isolate a contact-resistance assumption.",
          },
          {
            href: "/research",
            title: "Research Frontier",
            description: "Connect each challenge with a published study.",
          },
        ]}
      />
    </PageShell>
  );
}
