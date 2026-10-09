import Link from "next/link";
import type { LabSection } from "@/lib/site";
import { Icon } from "./icon";

export function PlaceholderPage({ section }: { section: LabSection }) {
  return (
    <div className="container py-16 sm:py-24">
      <Link
        href="/"
        className="mb-12 inline-flex items-center gap-2 text-sm text-muted hover:text-teal"
      >
        <Icon name="arrow" className="size-4 rotate-180" /> Back to the lab
      </Link>
      <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-24">
        <div>
          <p className="eyebrow mb-6">{section.label}</p>
          <h1 className="page-title">{section.title}</h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-muted">
            {section.description}
          </p>
          <span className="status-badge mt-8">
            <span className="size-1.5 rounded-full bg-teal" /> Coming soon
          </span>
        </div>
        <section
          className="rounded-2xl border border-line bg-white/60 p-8 sm:p-10"
          aria-labelledby="planned-content"
        >
          <span className="mb-8 grid size-14 place-items-center rounded-xl bg-sage text-teal">
            <Icon name={section.icon} className="size-7" />
          </span>
          <h2 id="planned-content" className="text-xl font-medium">
            A space taking shape
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted">
            The scientific topic for this MECH6045 project is still to be
            selected. This page reserves a home for the following planned
            content.
          </p>
          <ul className="mt-7 space-y-4">
            {section.planned.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm leading-6"
              >
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-teal" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 border-t border-line pt-5 text-xs leading-6 text-muted">
            This is a placeholder. Learning resources and scientific models will
            be added after the project scope is defined.
          </p>
        </section>
      </div>
      <div className="mt-16 flex flex-wrap gap-4">
        <Link href="/about" className="button-primary">
          About the project <Icon name="arrow" className="size-4" />
        </Link>
        <Link href="/" className="button-secondary">
          Return home
        </Link>
      </div>
    </div>
  );
}
