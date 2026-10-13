import Image from "next/image";
import { figures, type FigureId, type ScientificImage } from "@/data/figures";

export function FigureCredit({ figure }: { figure: ScientificImage }) {
  return (
    <div className="figure-credit">
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
    </div>
  );
}

export function ScientificFigure({ id }: { id: FigureId }) {
  const figure = figures[id];
  return (
    <figure className="scientific-figure" data-kind={figure.kind}>
      <div
        className={
          "scientific-image" +
          (figure.width && figure.height ? " scientific-image-intrinsic" : "")
        }
        style={
          figure.width && figure.height
            ? { aspectRatio: `${figure.width} / ${figure.height}` }
            : undefined
        }
      >
        {figure.width && figure.height ? (
          <Image
            src={figure.imageUrl}
            alt={figure.alt}
            width={figure.width}
            height={figure.height}
            sizes="(max-width: 800px) 92vw, 760px"
          />
        ) : (
          <Image
            src={figure.imageUrl}
            alt={figure.alt}
            fill
            sizes="(max-width: 800px) 92vw, 1000px"
          />
        )}
      </div>
      <figcaption>
        <span className="study-meta">
          {figure.kind} · {figure.figureNumber ?? "External image"}
        </span>
        <p className="figure-title mt-2">{figure.title}</p>
        <p className="text-sm mt-3">{figure.caption}</p>
        <FigureCredit figure={figure} />
      </figcaption>
    </figure>
  );
}
