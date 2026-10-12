import type { Metadata } from "next";
import Link from "next/link";
import {
  PageShell,
  RelatedTopics,
  SectionHeading,
} from "@/components/page-shell";
import { ReferenceBrowser } from "@/components/reference-browser";
import { ReferenceLink } from "@/components/reference-link";
import { figures } from "@/data/figures";
import { FigureCredit } from "@/components/scientific-figure";
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
      intro="The course foundations and research sources behind Nanomaterials: From Graphene to Next-Generation 2D Semiconductor Transistors."
    >
      <section className="section">
        <SectionHeading title="About NanoLab" />
        <p>
          NanoLab is an interactive educational project on Nanomaterials for
          MECH6045: Nanotechnology — Fundamentals and Applications. Its focused
          research case is two-dimensional nanomaterials, represented by
          graphene and MoS₂, and their role in next-generation semiconductor
          transistors.
        </p>
        <p className="mt-4">
          Explore the nanoscale and energy bands, discover graphene’s unusual
          electronic properties, and investigate why the finite band gap of MoS₂
          is useful for transistor switching. Interactive diagrams, a
          three-dimensional device explorer and a teaching simulator connect
          these concepts with engineering challenges and published research.
        </p>
      </section>
      <section className="section" id="references">
        <SectionHeading
          title="Academic References"
          description="Follow a citation from any learning page, find the original source, and return to the idea you were exploring."
        />
        <ReferenceBrowser
          key={JSON.stringify(query)}
          selected={queryValue(query, "ref")}
          returnPath={safeReturnPath(queryValue(query, "from"))}
        />
      </section>
      <section className="section" id="course">
        <SectionHeading title="Course and Educational Resources" />
        <div className="grid gap-5 md:grid-cols-2">
          <article className="panel p-6">
            <h3>Lecture 2: Nanomaterials</h3>
            <p className="muted mt-3">
              The course foundation covers nanoscale properties, quantum
              confinement and electronic bands. Lecture 2, pages 18–19, provides
              the starting point for comparing allowed energy bands and the gap
              between them.{" "}
              <ReferenceLink id="course-bands" from="/about#course" />
            </p>
            <Link className="text-link" href="/foundations#bands">
              Explore energy bands →
            </Link>
          </article>
          <article className="panel p-6">
            <h3>Lecture 3: Carbon-Based Nanomaterials</h3>
            <p className="muted mt-3">
              Graphene’s two-dimensional carbon structure and electronic
              properties connect the course material with the interactive
              learning activities. Lecture 3, page 26, motivates the graphene
              transport discussion.{" "}
              <ReferenceLink id="course-graphene" from="/about#course" />
            </p>
            <Link
              className="text-link"
              href="/foundations#graphene-electronics"
            >
              Explore graphene electronics →
            </Link>
          </article>
        </div>
        <h3 className="mt-6">Beyond the Lectures</h3>
        <p className="mt-3">
          The MoS₂ transistor case study extends the course principles using
          scientific literature; it is not presented as a device topic taught in
          detail in Lectures 2–3. The 2024–2026 studies cover more recent
          research on wafer-scale integration, transfer and interconnected
          circuits, distinct from the course foundation.
        </p>
        <div className="actions">
          <Link className="text-link" href="/why-mos2">
            Explore the MoS₂ extension →
          </Link>
          <Link className="text-link" href="/research">
            Explore 2024–2026 research and earlier milestones →
          </Link>
        </div>
        <p className="muted text-sm mt-4">
          Lecture topics and page references supplied by the project author;
          scientific explanations are supported by linked literature. OpenStax
          and MIT OpenCourseWare provide further background for the quantum-well
          visualization and transistor model.
        </p>
      </section>
      <section className="section" id="sources">
        <SectionHeading title="Scientific Data & Visualisations" />
        <p>
          Interactive device, material and learning diagrams are original SVG or
          CSS schematics, with dimensions exaggerated for visibility. The
          AI-generated homepage illustration is conceptual, not an atomistic
          calculation or microscopy image. Research titles and claims link to
          publisher, author or institutional sources.
        </p>
        <p className="mt-4">
          Simulator defaults are illustrative assumptions. No measured research
          datasets are used in its curves. Everyday scale examples are
          approximate, and actual specimens vary.
        </p>
        <p className="mt-4">
          Energy-band and transport diagrams highlight concepts rather than
          calculate a material’s complete band structure. Graphene mobility,
          group velocity and mean free path describe different aspects of
          transport; the simplified MoS₂ teaching model does not predict
          graphene or silicon device performance.
        </p>
        <ReferenceLink id="assets" from="/about#sources" />
        <div className="two-column mt-5">
          <div className="panel">
            <h3>Course-derived Fundamentals</h3>
            <p className="text-sm mt-3">
              Author-supplied MECH6045 topics establish the learning route;
              literature and educational sources support the explanations. No
              lecture passages are reproduced.
            </p>
          </div>
          <div className="panel">
            <h3>Peer-reviewed Research</h3>
            <p className="text-sm mt-3">
              Paper summaries and experimental figures describe specific methods
              and specimens. Early-version status, corrections and measurement
              conditions are identified where relevant.
            </p>
          </div>
          <div className="panel">
            <h3>Institutional Announcements</h3>
            <p className="text-sm mt-3">
              Industry press releases have their own source category. They are
              distinct from peer-reviewed publications and do not establish
              production qualification.
            </p>
          </div>
          <div className="panel">
            <h3>Original Simulations & Visualisations</h3>
            <p className="text-sm mt-3">
              The classical current solver, conceptual 3D device, interactive
              learning diagrams and explanatory band sketches are project
              contributions. Measured figure data are not fitted or imported
              into the current solver.
            </p>
          </div>
        </div>
      </section>
      <section className="section" id="figure-sources">
        <SectionHeading
          title="Scientific Image Registry"
          description="Independent image provenance: creator, original source, figure identifier, DOI, licence and modification status."
        />
        <p className="text-sm mb-5">
          Every image below retains its stated licence; site code does not
          relicense third-party material. Share-alike images are displayed
          without scientific adaptation. CC BY-NC-ND figures are reproduced
          complete and unadapted for this non-commercial course project. A
          commercial reuse of those figures needs separate permission.
        </p>
        <div className="reference-list">
          {Object.values(figures).map((figure) => (
            <article
              className="panel"
              id={"figure-" + figure.id}
              key={figure.id}
            >
              <div className="study-meta">
                {figure.kind} · {figure.figureNumber ?? "External image"}
              </div>
              <h3 className="mt-2">{figure.title}</h3>
              <p className="text-sm mt-3">
                Creator / authors: {figure.authors}
              </p>
              <FigureCredit figure={figure} />
            </article>
          ))}
        </div>
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
          Shared reference data, reusable learning components and a separate
          transistor-model module keep the platform easy to extend as its
          educational content develops.
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
