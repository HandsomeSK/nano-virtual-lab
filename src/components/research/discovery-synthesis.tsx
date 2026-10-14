import Link from "next/link";
import { discoveryThemes } from "@/data/discoveries";
import { researchDirections } from "@/data/research-knowledge";
import { ReferenceLink } from "@/components/reference-link";
export function DiscoverySynthesis({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "discovery-synthesis" : "research-directions"}>
      {discoveryThemes.map((story) => {
        const direction = researchDirections.find(
          (item) => item.id === story.id,
        )!;
        return (
          <article
            key={story.id}
            id={"discovery-" + story.id}
            className={compact ? "discovery-story" : "research-direction"}
          >
            <div
              className={compact ? "discovery-index" : "research-direction-context"}
            >
              {compact ? <span>{story.number}</span> : null}
              <p>{compact ? story.label : "Selected evidence"}</p>
              <small>{story.date}</small>
            </div>
            <div>
              <h3>{compact ? story.title : direction.label}</h3>
              <p
                className={compact ? "discovery-question" : "research-direction-question"}
              >
                {story.question}
              </p>
              {!compact ? (
                <>
                  <p>{direction.mechanism}</p>
                  <p>{direction.challenge}</p>
                </>
              ) : null}
              <p className={compact ? undefined : "research-direction-evidence"}>
                {!compact ? <strong>Research evidence. </strong> : null}
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
              <p className={compact ? "discovery-limit" : "research-direction-limit"}>
                <strong>
                  {compact ? "Interpret with care. " : "What remains open. "}
                </strong>
                {story.limit}
              </p>
              {!compact ? (
                <>
                  <p>{direction.next}</p>
                  <p className="research-direction-connection">
                    Connect this question to{" "}
                    <a
                      className="text-link"
                      href={"#discovery-" + direction.connectedId}
                    >
                      {direction.connectedLabel}
                    </a>.
                  </p>
                </>
              ) : null}
              <Link
                href={compact ? story.href : direction.relatedHref}
                className="text-link"
              >
                {compact ? story.action : direction.relatedLabel}
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
