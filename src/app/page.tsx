import Link from "next/link";
import { AbstractField } from "@/components/abstract-field";
import { Icon } from "@/components/icon";
import { SectionCard } from "@/components/section-card";
import { sections, site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <section
        className="container grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:gap-16"
        aria-labelledby="hero-title"
      >
        <div>
          <div className="mb-8 flex flex-wrap items-center gap-4">
            <p className="eyebrow">
              {site.courseCode} / A virtual learning space
            </p>
            <span className="status-badge">
              <span className="size-1.5 rounded-full bg-teal" /> In development
            </span>
          </div>
          <h1
            id="hero-title"
            className="text-[clamp(3.2rem,6.5vw,5.5rem)] font-medium leading-[1.07] tracking-[-0.055em]"
          >
            Small scale.
            <br />
            <span className="font-display font-normal italic tracking-[-0.035em] text-teal">
              Big possibilities.
            </span>
          </h1>
          <p className="mt-7 max-w-md text-base leading-8 text-muted">
            A space to explore nanotechnology, connect ideas, and learn through
            discovery. Built for curious minds, one concept at a time.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/explore" className="button-primary">
              Explore the lab <Icon name="arrow" className="size-4" />
            </Link>
            <Link href="/about" className="button-secondary">
              About the project
            </Link>
          </div>
          <p className="mt-10 flex items-center gap-3 text-xs text-muted">
            <span className="h-px w-7 bg-line" /> Fundamentals to applications.
            A foundation for what comes next.
          </p>
        </div>
        <AbstractField />
      </section>
      <section
        className="border-y border-line bg-sage/40"
        aria-label="Course context"
      >
        <div className="container flex flex-col justify-between gap-4 py-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-teal">
              {site.courseCode}
            </span>
            <span className="hidden h-5 w-px bg-line sm:block" />
            <p className="text-sm font-medium">{site.courseTitle}</p>
          </div>
          <p className="shrink-0 text-xs text-muted">
            An educational project in progress
          </p>
        </div>
      </section>
      <section
        className="container py-16 sm:py-24"
        aria-labelledby="learning-title"
      >
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow mb-4">The learning experience</p>
            <h2
              id="learning-title"
              className="text-3xl font-medium tracking-[-0.035em] sm:text-4xl"
            >
              Three ways to get closer.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-muted">
            Discover the ideas. Test your understanding.
            <br className="hidden sm:block" /> Connect the science to the wider
            world.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {sections.map((section, index) => (
            <SectionCard key={section.href} section={section} index={index} />
          ))}
        </div>
      </section>
      <section
        className="container pb-16 sm:pb-24"
        aria-labelledby="project-title"
      >
        <div className="relative overflow-hidden rounded-2xl bg-ink px-7 py-10 text-white sm:px-12 sm:py-12">
          <div
            className="pointer-events-none absolute -right-20 -top-32 size-96 rounded-full border border-white/10"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -right-8 -top-20 size-72 rounded-full border border-white/10"
            aria-hidden="true"
          />
          <div className="relative grid gap-8 md:grid-cols-[1.3fr_1fr] md:items-center md:gap-16">
            <div>
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-mint">
                An open starting point
              </p>
              <h2
                id="project-title"
                className="text-3xl font-medium tracking-tight"
              >
                The next discovery starts here.
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-7 text-white/70">
                The foundation is ready. Our scientific focus is still taking
                shape, leaving room for thoughtful exploration and a topic
                chosen with purpose.
              </p>
            </div>
            <div className="border-t border-white/15 pt-7 md:border-l md:border-t-0 md:pl-10 md:pt-0">
              <p className="text-xs text-mint">Project status</p>
              <p className="mt-2 text-xl">Topic to be selected</p>
              <Link
                href="/about"
                className="mt-6 inline-flex items-center gap-6 text-sm text-white underline decoration-white/30 underline-offset-4 hover:decoration-white"
              >
                Meet the project <Icon name="arrow" className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
