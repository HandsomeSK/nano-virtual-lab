import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "About the Nano Virtual Lab educational project for MECH6045 Nanotechnology: Fundamentals and Applications.",
};

export default function AboutPage() {
  return (
    <div className="container py-16 sm:py-24">
      <p className="eyebrow mb-6">A foundation for discovery</p>
      <h1 className="page-title">About the lab.</h1>
      <p className="mt-7 max-w-2xl text-lg leading-8 text-muted">
        {site.name} is an educational website being developed for{" "}
        {site.courseCode}: {site.courseTitle}.
      </p>
      <div className="mt-14 grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
        <section aria-labelledby="purpose-title">
          <h2
            id="purpose-title"
            className="text-2xl font-medium tracking-tight"
          >
            A place to understand, experiment, and connect.
          </h2>
          <p className="mt-5 text-sm leading-8 text-muted">
            The project aims to make a selected nanotechnology topic
            approachable through explanations, virtual experimentation, and
            supporting research. Its scientific focus, learning resources, and
            simulation models have not yet been decided.
          </p>
          <p className="mt-4 text-sm leading-8 text-muted">
            For now, this website provides the structure for that work. Explore,
            Simulator, and Research are placeholder spaces that will develop
            alongside the project.
          </p>
          <Link href="/explore" className="button-primary mt-8">
            Visit Explore <Icon name="arrow" className="size-4" />
          </Link>
        </section>
        <section
          aria-labelledby="status-title"
          className="rounded-2xl border border-line bg-sage/50 p-8"
        >
          <p className="eyebrow mb-5">Where we are</p>
          <h2 id="status-title" className="text-2xl font-medium">
            Project in development
          </h2>
          <dl className="mt-6 text-sm">
            <div className="border-t border-line py-4">
              <dt className="text-muted">Course</dt>
              <dd className="mt-1 font-medium">{site.courseCode}</dd>
            </div>
            <div className="border-t border-line py-4">
              <dt className="text-muted">Scientific topic</dt>
              <dd className="mt-1 font-medium">To be selected</dd>
            </div>
            <div className="border-t border-line py-4">
              <dt className="text-muted">Learning content and simulator</dt>
              <dd className="mt-1 font-medium">Planned · Not yet available</dd>
            </div>
          </dl>
        </section>
      </div>
    </div>
  );
}
