"use client";
import Link from "next/link";
import { useState } from "react";
import { references } from "@/data/references";
import { studies, researchCategories } from "@/data/research";
import { ReferenceLink } from "./reference-link";
import { SectionHeading } from "./page-shell";
import { ScientificFigure } from "./scientific-figure";
const papers = studies.map((study) => ({
  ...study,
  reference: references.find((ref) => ref.id === study.reference)!,
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
    filtered.find((paper) => paper.reference.id === selected)?.reference.id ||
    filtered[0]?.reference.id;
  function update(nextYear: string, nextCategory: string, nextStudy: string) {
    setYear(nextYear);
    setCategory(nextCategory);
    setSelected(nextStudy);
    const params = new URLSearchParams();
    if (nextYear) params.set("year", nextYear);
    if (nextCategory) params.set("category", nextCategory);
    if (nextStudy) params.set("study", nextStudy);
    window.history.replaceState(
      null,
      "",
      "/research" +
        (params.size ? "?" + params : "") +
        (nextStudy ? "#study-" + nextStudy : ""),
    );
  }
  return (
    <>
      <section className="section research-findings">
        <SectionHeading
          title="Find a Research Direction"
          description="Explore selected, verified studies from monolayer physics to integrated circuits."
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
            Research direction
            <select
              aria-label="Research direction"
              name="category"
              value={category}
              onChange={(event) => update(year, event.target.value, "")}
            >
              <option value="">All directions</option>
              {researchCategories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <button
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
      <section className="section research-timeline">
        <SectionHeading
          title="Interactive Timeline"
          description="Select a milestone to open its study and research question."
        />
        <div className="timeline">
          {filtered.map((paper) => (
            <button
              key={paper.reference.id}
              aria-pressed={active === paper.reference.id}
              onClick={() => {
                update(year, category, paper.reference.id);
                document
                  .getElementById("study-" + paper.reference.id)
                  ?.scrollIntoView({ block: "start" });
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
      <section className="section">
        <SectionHeading title="Featured Studies" />
        <div className="study-list">
          {filtered.map((paper) => (
            <article
              key={paper.reference.id}
              className="study-card"
              id={"study-" + paper.reference.id}
              data-selected={active === paper.reference.id}
            >
              <header className="study-heading">
                <p className="study-meta">
                  <span>{paper.reference.year}</span>
                  <span>{paper.category}</span>
                </p>
                <h3>{paper.reference.title}</h3>
                <p className="study-byline">
                  {paper.reference.authors} · {paper.reference.venue}
                </p>
              </header>
              <div className="study-layout">
                <div className="study-main">
                  <p className="study-summary">{paper.summary}</p>
                  <details
                    key={String(active === paper.reference.id)}
                    open={active === paper.reference.id}
                    onToggle={(event) => {
                      if (
                        event.currentTarget.open &&
                        active !== paper.reference.id
                      ) {
                        update(year, category, paper.reference.id);
                      }
                    }}
                  >
                    <summary>Study details & open question</summary>
                    <div className="study-body">
                      <h4>Research problem</h4>
                      <p>{paper.problem}</p>
                      <h4>What was demonstrated?</h4>
                      <p>{paper.demonstration}</p>
                      <h4>What is technically new?</h4>
                      <p>{paper.novelty}</p>
                      {paper.figure ? (
                        <ScientificFigure id={paper.figure} />
                      ) : null}
                      <h4>Limitations & open question</h4>
                      <p>{paper.question}</p>
                      <p className="study-boundary">{paper.boundary}</p>
                    </div>
                  </details>
                  <div className="actions study-sources">
                    <a
                      className="text-link"
                      href={paper.reference.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Original source ↗
                    </a>
                    <span className="inline-source">
                      <a
                        className="text-link"
                        href={"https://doi.org/" + paper.reference.doi}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        DOI ↗
                      </a>
                      <ReferenceLink
                        id={paper.reference.id}
                        from={
                          "/research?" +
                          new URLSearchParams({
                            year,
                            category,
                            study: paper.reference.id,
                          }) +
                          "#study-" +
                          paper.reference.id
                        }
                      />
                    </span>
                  </div>
                </div>
                <aside className="study-context">
                  <h4>Why This Research Matters</h4>
                  <p>{paper.whyMatters}</p>
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
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
