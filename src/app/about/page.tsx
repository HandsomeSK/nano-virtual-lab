import type { Metadata } from "next";
import Link from "next/link";
import {
  PageShell,
  SectionHeading,
} from "@/components/page-shell";
import { ReferenceBrowser } from "@/components/reference-browser";
import { ReferenceLink } from "@/components/reference-link";
import { figures } from "@/data/figures";
import { FigureCredit } from "@/components/scientific-figure";
import { safeReturnPath, queryValue, type Query } from "@/lib/site";

export const metadata: Metadata = {
  title: "About & References",
  description:
    "An independent nanotechnology virtual laboratory: scientific scope, research references, model assumptions and image credits.",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Query>;
}) {
  const query = await searchParams;
  return (
    <PageShell
      title="About & References"
      intro="An independent virtual laboratory for exploring nanomaterials, understanding devices and reading the evidence behind them."
    >
      <section className="section about-overview">
        <SectionHeading title="Science You Can Explore" />
        <div className="about-layout">
          <div>
            <p>
              NanoLab is a public Nanotechnology Virtual Laboratory. Its focus
              is two-dimensional nanomaterials, represented by graphene and
              MoS₂, and their role in next-generation semiconductor transistors.
            </p>
            <p className="mt-4">
              Explore the nanoscale and energy bands, discover graphene’s
              unusual electronic properties, and investigate why the finite band
              gap of MoS₂ is useful for transistor switching. Interactive
              diagrams, a three-dimensional device explorer and an educational
              simulator connect these concepts with engineering challenges and
              published research.
            </p>
          </div>
          <aside className="about-scope" aria-label="Laboratory scope">
            <dl>
              <div>
                <dt>Materials</dt>
                <dd>Graphene, MoS₂ & silicon</dd>
              </div>
              <div>
                <dt>Explore</dt>
                <dd>Atomic structure, transport & device engineering</dd>
              </div>
              <div>
                <dt>Experiment</dt>
                <dd>
                  Conceptual visualisations & an uncalibrated current model
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>
      <section className="section" id="learning">
        <SectionHeading title="From Fundamentals to Research" />
        <div className="about-layout">
          <div>
            <p>
              Nanoscale materials bring surfaces, quantum confinement and
              electronic structure into focus. A confined electron has discrete
              allowed energies; a crystal’s periodic lattice produces energy
              bands. Graphene’s carbon lattice gives rise to distinctive
              transport, while its zero intrinsic gap poses challenges for
              digital switching. These general principles remain the starting
              point for the experiments.
            </p>
            <p className="mt-4">
              MoS₂ provides a contrasting two-dimensional semiconductor with a
              finite gap. Its transistor applications connect material physics
              with contacts, gate dielectrics, scaling and fabrication. Selected
              studies from 2024–2026, together with earlier milestones, show how
              these questions are investigated experimentally.
            </p>
          </div>
          <div className="about-reading-links">
            <Link className="text-link" href="/foundations#bands">
              Energy Bands
            </Link>
            <Link
              className="text-link"
              href="/foundations#graphene-electronics"
            >
              Graphene Electronics
            </Link>
            <Link className="text-link" href="/why-mos2">
              From Graphene to MoS₂
            </Link>
            <Link className="text-link" href="/research">
              Research Frontier
            </Link>
          </div>
        </div>
      </section>
      <section className="section" id="references">
        <SectionHeading
          title="Scientific References"
          description="Find the original source, then return to the idea you were exploring."
        />
        <ReferenceBrowser
          key={JSON.stringify(query)}
          selected={queryValue(query, "ref")}
          returnPath={safeReturnPath(queryValue(query, "from"))}
        />
      </section>
      <section className="section" id="sources">
        <SectionHeading title="How to Read the Evidence" />
        <div className="about-evidence-grid">
          <article>
            <h3>Scientific Fundamentals</h3>
            <p>
              General definitions, principles and equations are explained
              directly. Open textbooks provide further background for the
              infinite quantum well and classical transistor equations; graphene
              research supports its structure and transport picture.
            </p>
          </article>
          <article>
            <h3>Peer-reviewed Research</h3>
            <p>
              Paper summaries and experimental figures describe specific methods
              and specimens. Early-version status, corrections and measurement
              conditions are identified where relevant. Titles and claims link
              to publisher or author sources.
            </p>
          </article>
          <article>
            <h3>Institutional Announcements</h3>
            <p>
              Industry announcements have their own source category. They are
              distinct from peer-reviewed publications and do not establish
              production qualification.
            </p>
          </article>
          <article>
            <h3>Original Models & Visualisations</h3>
            <p>
              Interactive SVG/CSS schematics exaggerate dimensions for
              visibility. Band and transport diagrams show concepts, rather than
              a complete material band structure. The homepage atmosphere is
              decorative, rather than an atomistic calculation or microscopy
              image.
            </p>
          </article>
        </div>
        <p className="mt-5">
          Simulator defaults and everyday scale examples are illustrative;
          actual specimens vary. No measured research datasets are fitted or
          imported into its curves. Graphene mobility, group velocity and mean
          free path describe different aspects of transport. The simplified MoS₂
          current model does not predict graphene or silicon device performance.{" "}
          <ReferenceLink id="assets" from="/about#sources" />
        </p>
      </section>
      <section className="section" id="figure-sources">
        <SectionHeading
          title="Scientific Image Registry"
          description="Creator, original source, figure identifier, DOI, licence and modification status for every external scientific image."
        />
        <p className="text-sm mb-5">
          Every image retains its stated licence. Share-alike images are
          displayed without scientific adaptation. CC BY-NC-ND figures are
          reproduced complete and unadapted for non-commercial public science
          education; commercial reuse needs separate permission.
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
      <section className="section about-details" id="credits">
        <div>
          <SectionHeading title="Development & Credits" />
          <p>
            Built with Next.js, React, TypeScript and Tailwind CSS; hosted on
            Vercel with version control on GitHub. Fonts are bundled locally. AI
            assisted interface concepts, implementation and testing. Generated
            design concepts are not scientific evidence.
          </p>
          <p className="mt-4">
            NanoLab uses locally hosted Inter for headings and body text,
            distributed under the{" "}
            <a className="text-link" href="/assets/Inter-OFL.txt">
              SIL Open Font License for Inter
            </a>
            .
          </p>
          <p className="mt-4">
            Shared scientific data, reusable learning components and a separate
            transistor model keep the platform easy to extend.
          </p>
          <a
            className="text-link"
            href="https://github.com/HandsomeSK/nano-virtual-lab"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Project Code & README ↗
          </a>
        </div>
        <div>
          <SectionHeading title="Your Experiments & Their Limits" />
          <p>
            Saved configurations remain in this browser’s local storage. No
            account or server database is used. Clearing browser data removes
            those saves; parameter URLs provide a separate way to share a
            configuration.
          </p>
          <p className="mt-4">
            The educational model omits subthreshold leakage, quantum transport,
            traps, self-heating and short-channel effects. Review its equations
            before interpreting trends.
          </p>
          <Link className="text-link" href="/simulator#model">
            Read Model Assumptions
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
