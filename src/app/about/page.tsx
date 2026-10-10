import type { Metadata } from "next";
import Link from "next/link";
import {
  PageShell,
  RelatedTopics,
  SectionHeading,
  Notice,
} from "@/components/page-shell";
import { ReferenceBrowser } from "@/components/reference-browser";
import { ReferenceLink } from "@/components/reference-link";
import { safeReturnPath, queryValue, type Query } from "@/lib/site";
export const metadata: Metadata = { title: "About & References" };
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Query>;
}) {
  const query = await searchParams;
  return (
    <PageShell
      title="About & References"
      intro="The scope, evidence and assumptions behind NanoLab: Beyond Silicon."
    >
      <section className="section">
        <SectionHeading title="About This Project" />
        <p>
          NanoLab is an interactive educational project for MECH6045:
          Nanotechnology — Fundamentals and Applications. Its theme is
          next-generation 2D semiconductor transistors, exploring MoS₂ beyond
          silicon.
        </p>
        <p className="mt-4">
          V1 connects introductory physics, a simplified top-gate device, an
          educational transistor model and selected research. It supports
          learning and comparison of assumptions rather than predicting a
          fabricated device.
        </p>
      </section>
      <section className="section" id="references">
        <SectionHeading
          title="Academic References"
          description="Citation numbers stay consistent across the site. Search papers, teaching resources, course status and asset credits."
        />
        <ReferenceBrowser
          key={JSON.stringify(query)}
          selected={queryValue(query, "ref")}
          returnPath={safeReturnPath(queryValue(query, "from"))}
        />
      </section>
      <section className="section" id="course">
        <SectionHeading title="Course Materials" />
        <Notice>
          <strong>Lecture 1–6 mapping: awaiting upload.</strong> Course files
          have not been supplied. General Foundations content is not represented
          as a verified transcription of the course.{" "}
          <ReferenceLink id="course" from="/about#course" />
        </Notice>
      </section>
      <section className="section" id="sources">
        <SectionHeading title="Data & Image Sources" />
        <p>
          Device, material and learning diagrams are original SVG or CSS
          schematics, with dimensions exaggerated for visibility. They are not
          microscopy images. Research titles and claims link to publisher,
          author or institutional sources.
        </p>
        <p className="mt-4">
          Simulator defaults are illustrative assumptions. No measured research
          datasets are used in its curves. Everyday scale examples are
          approximate, and actual specimens vary.
        </p>
        <ReferenceLink id="assets" from="/about#sources" />
      </section>
      <section className="section" id="credits">
        <SectionHeading title="Development & Credits" />
        <p>
          Built with Next.js, React, TypeScript and Tailwind CSS; hosted on
          Vercel with version control on GitHub. DM Sans is bundled locally
          through Fontsource. AI assisted interface concepts, implementation and
          testing. Generated design concepts are not scientific evidence.
        </p>
        <p className="mt-4">
          The project uses Ponytail, frontend-design and web-design-guidelines
          as development skills. Shared data, reusable learning cards and a
          separate model module allow future revisions without rebuilding the
          platform.
        </p>
        <a
          className="text-link"
          href="https://github.com/HandsomeSK/nano-virtual-lab"
          target="_blank"
          rel="noopener noreferrer"
        >
          View project code & README ↗
        </a>
      </section>
      <section className="section">
        <SectionHeading title="Additional Information" />
        <p>
          Saved configurations remain in this browser’s local storage. No
          account or server database is used. Clearing browser data removes
          those saves; parameter URLs provide a separate way to share a
          configuration.
        </p>
        <p className="mt-4">
          The teaching model omits subthreshold leakage, quantum transport,
          traps, self-heating and short-channel effects. Review its equations
          before interpreting trends.
        </p>
        <Link className="text-link" href="/simulator#model">
          Read model assumptions →
        </Link>
      </section>
      <RelatedTopics
        links={[
          {
            href: "/",
            title: "Home",
            description: "Restart the connected learning journey.",
          },
          {
            href: "/research",
            title: "Research Frontier",
            description: "Explore the studies behind this platform.",
          },
        ]}
      />
    </PageShell>
  );
}
