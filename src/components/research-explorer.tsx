"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { references } from "@/data/references";
import {
  studies,
  researchCategories,
  groupStudiesByCategory,
} from "@/data/research";
import { discoveryThemes } from "@/data/discoveries";
import { ReferenceLink } from "./reference-link";
import { SectionHeading } from "./page-shell";
import { ScientificFigure } from "./scientific-figure";
const papers = studies.map((study) => ({
  ...study,
  reference: references.find((ref) => ref.id === study.reference)!,
  direction: discoveryThemes.find(
    (theme) =>
      theme.reference === study.reference ||
      ("secondaryReference" in theme &&
        theme.secondaryReference === study.reference),
  )?.label,
}));
const publicationYears = [
  ...new Set(papers.map((paper) => paper.reference.year)),
];
export function ResearchExplorer({
  initialYear,
  initialCategory,
  initialStudy,
}: {
  initialYear: string;
  initialCategory: string;
  initialStudy: string;
}) {
  const [year, setYear] = useState(initialYear),
    [category, setCategory] = useState(initialCategory),
    [selected, setSelected] = useState(initialStudy);
  const filtered = papers.filter(
    (paper) =>
      (!year || String(paper.reference.year) === year) &&
      (!category || paper.category === category),
  );
  const active =
    filtered.find((paper) => paper.reference.id === selected)?.reference.id;
  useEffect(() => {
    function restore() {
      const params = new URLSearchParams(window.location.search);
      const nextYear = params.get("year") ?? "";
      const nextCategory = params.get("category") ?? "";
      const nextStudy =
        params.get("study") ?? window.location.hash.replace(/^#study-/, "");
      setYear(
        publicationYears.some((item) => String(item) === nextYear) ? nextYear : "",
      );
      setCategory(
        researchCategories.some((item) => item === nextCategory) ? nextCategory : "",
      );
      setSelected(
        papers.some((paper) => paper.reference.id === nextStudy) ? nextStudy : "",
      );
    }
    // Older shared links can identify a study with only its fragment.
    const frame = requestAnimationFrame(restore);
    window.addEventListener("popstate", restore);
    window.addEventListener("hashchange", restore);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("popstate", restore);
      window.removeEventListener("hashchange", restore);
    };
  }, []);
  function update(nextYear: string, nextCategory: string, nextStudy: string) {
    setYear(nextYear);
    setCategory(nextCategory);
    setSelected(nextStudy);
    const url = new URL(window.location.href);
    for (const [key, value] of Object.entries({
      year: nextYear,
      category: nextCategory,
      study: nextStudy,
    })) {
      if (value) url.searchParams.set(key, value);
      else url.searchParams.delete(key);
    }
    url.hash = nextStudy ? "study-" + nextStudy : "";
    window.history.replaceState(
      window.history.state,
      "",
      url.pathname + url.search + url.hash,
    );
  }
  return (
    <>
      <section className="section research-findings">
        <SectionHeading
          title="Filter the evidence"
          description="Compare selected studies within their publication year and research category."
        />
        <div className="filter-row">
          <label>
            Publication year
            <select
              aria-label="Publication year"
              name="year"
              value={year}
              onChange={(event) => update(event.target.value, category, "")}
            >
              <option value="">All years</option>
              {publicationYears.map((publicationYear) => (
                <option key={publicationYear} value={publicationYear}>
                  {publicationYear}
                </option>
              ))}
            </select>
          </label>
          <label>
            Research category
            <select
              aria-label="Research category"
              name="category"
              value={category}
              onChange={(event) => update(year, event.target.value, "")}
            >
              <option value="">All categories</option>
              {researchCategories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <button
            type="button"
            className="button-secondary"
            onClick={() => update("", "", "")}
          >
            Clear filters
          </button>
        </div>
        <p className="muted text-sm mt-4" role="status">
          {filtered.length} studies shown
        </p>
      </section>
      <section className="section research-timeline" id="timeline">
        <SectionHeading
          title="Interactive Timeline"
          description="Select a milestone to open its study and research question."
        />
        <div className="timeline">
          {filtered.map((paper) => (
            <button
              type="button"
              key={paper.reference.id}
              aria-pressed={active === paper.reference.id}
              onClick={() => {
                update(year, category, paper.reference.id);
                requestAnimationFrame(() => {
                  document
                    .getElementById("study-" + paper.reference.id)
                    ?.scrollIntoView({
                      block: "start",
                      behavior: window.matchMedia(
                        "(prefers-reduced-motion: reduce)",
                      ).matches
                        ? "instant"
                        : "smooth",
                    });
                });
              }}
            >
              <span>{paper.reference.year}</span>
              <strong>{paper.category}</strong>
              <span className="text-xs muted">{paper.reference.title}</span>
            </button>
          ))}
        </div>
        {!filtered.length ? (
          <div className="empty-state">
            No study matches both filters. Choose another year or direction, or
            clear the filters.
          </div>
        ) : null}
      </section>
      <section className="section research-studies" id="studies">
        <SectionHeading
          title="Study catalogue"
          description="Browse studies by research category. Open a study for its complete analysis, evidence and limits."
        />
        <div className="catalogue-categories">
          {groupStudiesByCategory(filtered).map((group) => (
            <section
              className="catalogue-category"
              key={group.category}
              aria-labelledby={"study-category-" + group.category.toLowerCase()}
            >
              <header className="catalogue-category-heading">
                <h3 id={"study-category-" + group.category.toLowerCase()}>
                  {group.category}
                </h3>
                <span className="muted text-sm">
                  {group.studies.length}{" "}
                  {group.studies.length === 1 ? "study" : "studies"}
                </span>
              </header>
              <div className="study-list evidence-catalogue">
                {group.studies.map((paper) => (
                  <article
                    key={paper.reference.id}
                    className="study-card"
                    id={"study-" + paper.reference.id}
                    data-selected={active === paper.reference.id}
                  >
                    <header className="study-heading">
                      <p className="study-meta">
                        <span>{paper.reference.year}</span>
                        <span>{paper.direction ?? paper.category}</span>
                      </p>
                      <h4>{paper.reference.title}</h4>
                    </header>
                    <p className="study-summary">
                      {paper.summary}{" "}
                      <ReferenceLink
                        id={paper.reference.id}
                        from={
                          "/research?" +
                          new URLSearchParams({
                            ...(year ? { year } : {}),
                            ...(category ? { category } : {}),
                            study: paper.reference.id,
                          }) +
                          "#study-" +
                          paper.reference.id
                        }
                      />
                    </p>
                    <details
                      className="study-analysis"
                      open={active === paper.reference.id}
                      onToggle={(event) => {
                        if (
                          event.currentTarget.open &&
                          active !== paper.reference.id
                        ) {
                          update(year, category, paper.reference.id);
                        } else if (
                          !event.currentTarget.open &&
                          active === paper.reference.id
                        ) {
                          update(year, category, "");
                        }
                      }}
                    >
                      <summary>
                        {active === paper.reference.id
                          ? "Close study analysis"
                          : "View study analysis"}
                        <span className="sr-only">: {paper.reference.title}</span>
                      </summary>
                      <div className="study-byline">
                        {paper.reference.authors} · {paper.reference.venue}
                      </div>
                      <div className="study-layout">
                        <div className="study-body">
                          <h5>Research question</h5>
                          <p>{paper.problem}</p>
                          <p>{paper.question}</p>
                          <h5>Method or evidence</h5>
                          <p>{paper.demonstration}</p>
                          <h5>Main findings</h5>
                          <p>{paper.novelty}</p>
                          {paper.figure ? (
                            <ScientificFigure id={paper.figure} />
                          ) : null}
                          <h5>Limitations</h5>
                          <p className="study-boundary">{paper.boundary}</p>
                        </div>
                        <aside className="study-context">
                          <h5>Significance</h5>
                          <p>{paper.whyMatters}</p>
                          <h5>Related topics</h5>
                          <Link className="text-link" href={paper.concept}>
                            {paper.conceptLabel} →
                          </Link>
                          <Link
                            className="text-link"
                            href={"/challenges#" + paper.challenge}
                          >
                            Related engineering challenge →
                          </Link>
                        </aside>
                      </div>
                    </details>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
        {!filtered.length ? (
          <p className="muted">
            No studies match the current filters. Clear the filters above to browse
            every category.
          </p>
        ) : null}
      </section>
    </>
  );
}
