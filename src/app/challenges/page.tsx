import type { Metadata } from "next";
import Link from "next/link";
import {
  PageShell,
  RelatedTopics,
  SectionHeading,
} from "@/components/page-shell";
import { ChallengeExplorer } from "@/components/challenge-explorer";
import { ReferenceLink } from "@/components/reference-link";
export const metadata: Metadata = { title: "Engineering Challenges" };
export default function Page() {
  return (
    <PageShell
      title="Engineering Challenges"
      intro="An atomically thin channel is only one part of a reliable transistor. Explore the interfaces, electrostatics and processes that shape a device."
    >
      <section className="section challenges-overview">
        <SectionHeading
          title="Challenges Overview"
          description="Choose a problem, explore its mechanism and device impact, then follow the related experiment or research direction."
        />
        <ChallengeExplorer />
      </section>
      <section className="section challenges-outlook" id="outlook">
        <SectionHeading
          title="Bringing the Pieces Together"
          description="Progress requires materials, device design and process engineering together."
        />
        <p>
          Contact and dielectric engineering can improve individual devices.
          Scalable growth, repeatable integration and careful characterization
          are needed to translate those gains into circuits.
        </p>
        <p className="mt-4">
          These constraints interact. A more conductive channel cannot recover
          voltage lost at a resistive contact; a thinner gate stack is useful
          only if leakage and reliability remain acceptable. Growth and transfer
          must preserve those interfaces consistently across devices. This is
          why a promising material or a best-performing transistor does not
          establish circuit yield.
          <ReferenceLink id="engineering2024" from="/challenges#outlook" />
          <ReferenceLink id="benchmark2022" from="/challenges#outlook" />
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
        ]}
      />
    </PageShell>
  );
}
