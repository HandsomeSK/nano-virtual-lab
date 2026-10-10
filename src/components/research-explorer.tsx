"use client";
import Link from "next/link";
import { useState } from "react";
import { references } from "@/data/references";
import { studies, researchCategories } from "@/data/research";
import { ReferenceLink } from "./reference-link";
import { SectionHeading } from "./page-shell";
const papers = studies.map((study) => ({
  ...study,
  reference: references.find((ref) => ref.id === study.reference)!,
}));
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
      <section className="section">
        <SectionHeading
          title="Research Categories"
          description="A curated set of verified milestones, not a comprehensive or continuously updated literature review."
        />
        <div className="filter-row">
          <label>
            Publication year
            <select
              aria-label="Publication year"
              value={year}
              onChange={(event) => update(event.target.value, category, "")}
            >
              <option value="">All years</option>
              {papers.map((paper) => (
                <option key={paper.reference.year} value={paper.reference.year}>
                  {paper.reference.year}
                </option>
              ))}
            </select>
          </label>
          <label>
            Research direction
            <select
              aria-label="Research direction"
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
      <section className="section">
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
              className="panel study-card"
              id={"study-" + paper.reference.id}
              data-selected={active === paper.reference.id}
            >
              <div className="study-meta">
                {paper.reference.year} / {paper.category}
              </div>
              <h3>{paper.reference.title}</h3>
              <p className="muted text-sm mt-3">
                {paper.reference.authors} · {paper.reference.venue}
              </p>
              <p className="mt-4">{paper.summary}</p>
              <details
                key={String(active === paper.reference.id)}
                open={active === paper.reference.id}
                onToggle={(event) => {
                  if (event.currentTarget.open) setSelected(paper.reference.id);
                }}
              >
                <summary>Study details & open question</summary>
                <p>{paper.question}</p>
                <p className="muted text-sm mt-3">{paper.boundary}</p>
              </details>
              <div className="actions">
                <a
                  className="text-link"
                  href={paper.reference.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Original source ↗
                </a>
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
                <Link
                  className="text-link"
                  href={"/challenges#" + paper.challenge}
                >
                  Related engineering challenge →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
