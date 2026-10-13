import Link from "next/link";
import { discoveryThemes } from "@/data/discoveries";
import { ReferenceLink } from "@/components/reference-link";
export function DiscoverySynthesis({ compact = false }: { compact?: boolean }) {
  return (
    <div className="discovery-synthesis">
      {discoveryThemes.map((story) => (
        <article
          key={story.id}
          id={"discovery-" + story.id}
          className="discovery-story"
        >
          <div className="discovery-index">
            <span>{story.number}</span>
            <p>{story.label}</p>
            <small>{story.date}</small>
          </div>
          <div>
            <h3>{story.title}</h3>
            <p className="discovery-question">{story.question}</p>
            <p>
              {story.finding}
              <ReferenceLink
                id={story.reference}
                from={"/research#discovery-" + story.id}
              />
              {"secondaryReference" in story ? (
                <ReferenceLink
                  id={story.secondaryReference}
                  from={"/research#discovery-" + story.id}
                />
              ) : null}
            </p>
            {!compact ? <p className="mt-4">{story.meaning}</p> : null}
            <p className="discovery-limit">
              <strong>Interpret with care.</strong> {story.limit}
            </p>
            <Link href={story.href} className="text-link">
              {story.action}
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
