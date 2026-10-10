"use client";
import Link from "next/link";
import { useState } from "react";
import { references, referenceNumber } from "@/data/references";
const categories = [
  "All sources",
  "Paper",
  "Learning resource",
  "Course material",
  "Data & assets",
];
export function ReferenceBrowser({
  selected,
  returnPath,
}: {
  selected: string;
  returnPath: string;
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All sources");
  const selectedRef = references.find((ref) => ref.id === selected);
  const filtered = references.filter(
    (ref) =>
      (category === "All sources" || ref.category === category) &&
      [ref.title, ref.authors, ref.doi, ref.year]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase().trim()),
  );
  return (
    <>
      <div className="filter-row">
        <label className="grow">
          Search references
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Title, author, year or DOI"
          />
        </label>
        <label>
          Source category
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <button
          className="button-secondary"
          onClick={() => {
            setSearch("");
            setCategory("All sources");
          }}
        >
          Clear filters
        </button>
      </div>
      {selectedRef ? (
        <div className="notice mt-5">
          Selected citation [{referenceNumber(selectedRef.id)}]:{" "}
          {selectedRef.title}.{" "}
          <Link className="text-link" href={returnPath}>
            Return to source page →
          </Link>
          {!filtered.includes(selectedRef) ? (
            <p className="text-sm mt-2">
              Your filters hide this citation. Clear filters to show it.
            </p>
          ) : null}
        </div>
      ) : selected ? (
        <p className="muted text-sm mt-5">
          This citation was not found. Browse the sources below.
        </p>
      ) : null}
      <p className="muted text-sm mt-4" role="status">
        {filtered.length} sources shown
      </p>
      <div className="reference-list">
        {filtered.map((ref) => (
          <article
            id={"ref-" + ref.id}
            key={ref.id}
            className="panel reference-entry"
            data-selected={selected === ref.id}
          >
            <div className="study-meta">
              [{referenceNumber(ref.id)}] / {ref.category} / {ref.year}
            </div>
            <h3>{ref.title}</h3>
            <p className="text-sm mt-2">
              {ref.authors}. {ref.venue}.
            </p>
            <p className="muted text-sm mt-4">{ref.note}</p>
            {ref.status ? (
              <span className="status-label mt-3">{ref.status}</span>
            ) : null}
            <div className="actions">
              {ref.doi ? (
                <a
                  className="text-link break-all"
                  href={"https://doi.org/" + ref.doi}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  DOI: {ref.doi} ↗
                </a>
              ) : null}
              {ref.url ? (
                <a
                  className="text-link"
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Original source ↗
                </a>
              ) : null}
              {selected === ref.id ? (
                <Link className="button-secondary" href={returnPath}>
                  Return to source page
                </Link>
              ) : null}
            </div>
          </article>
        ))}
      </div>
      {!filtered.length ? (
        <div className="empty-state">
          No sources match your search. Try a shorter term or clear filters.
        </div>
      ) : null}
    </>
  );
}
