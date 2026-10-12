import Image from "next/image";
import { figures, type FigureId, type ScientificImage } from "@/data/figures";

export function FigureCredit({ figure }: { figure: ScientificImage }) {
  return (
    <>
      <p className="text-xs muted mt-3">{figure.attribution}</p>
      <p className="text-xs muted mt-2">{figure.modification}</p>
      <div className="actions">
        <a
          className="text-link"
          href={figure.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Original {figure.figureNumber ?? "image"} ↗
        </a>
        <a
          className="text-link"
          href={figure.licenseUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {figure.license} ↗
        </a>
        {figure.doi ? (
          <a
            className="text-link break-all"
            href={"https://doi.org/" + figure.doi}
            target="_blank"
            rel="noopener noreferrer"
          >
            DOI: {figure.doi} ↗
          </a>
        ) : null}
      </div>
    </>
  );
}

export function ScientificFigure({ id }: { id: FigureId }) {
  const figure = figures[id];
  return (
    <figure className="scientific-figure">
      <div className="scientific-image">
        <Image
          src={figure.imageUrl}
          alt={figure.alt}
          fill
          sizes="(max-width: 800px) 92vw, 760px"
        />
      </div>
      <figcaption>
        <span className="study-meta">
          {figure.kind} · {figure.figureNumber ?? "External image"}
        </span>
        <h4 className="mt-2">{figure.title}</h4>
        <p className="text-sm mt-3">{figure.caption}</p>
        <FigureCredit figure={figure} />
      </figcaption>
    </figure>
  );
}
