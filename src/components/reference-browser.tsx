"use client";
import { useRef, useState } from "react";
import { references, referenceNumber } from "@/data/references";
const categories = [
  "All sources",
  "Paper",
  "Learning resource",
  "Data & assets",
  "Institutional announcement",
];
export function ReferenceBrowser({
  selected,
  returnPath,
}: {
  selected: string;
  returnPath: string;
}) {
  const [search, setSearch] = useState("");
  const searchInput = useRef<HTMLInputElement>(null);
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
          <span className="search-field">
            <input
              ref={searchInput}
              name="reference-search"
              type="search"
              autoComplete="off"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Title, author, year or DOI…"
            />
            {search ? (
              <button
                type="button"
                className="search-clear"
                aria-label="Clear search"
                onClick={() => {
                  setSearch("");
                  searchInput.current?.focus();
                }}
              >
                <span aria-hidden="true">×</span>
              </button>
            ) : null}
          </span>
        </label>
        <label>
          Source category
          <select
            name="source-category"
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
          {/* Native navigation preserves the source fragment on return. */}
          <a className="text-link" href={returnPath}>
            Return to source page →
          </a>
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
                <a className="button-secondary" href={returnPath}>
                  Return to source page
                </a>
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
