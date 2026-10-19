import Link from "next/link";
import { discoveryThemes } from "@/data/discoveries";
import { researchDirections } from "@/data/research-knowledge";
import { ReferenceLink } from "@/components/reference-link";
import { studies } from "@/data/research";
import styles from "@/components/reading-paths.module.css";
import contextStyles from "./research-context.module.css";
export function DiscoverySynthesis() {
  return (
    <div className="research-directions">
      {discoveryThemes.map((story) => {
        const direction = researchDirections.find(
          (item) => item.id === story.id,
        )!;
        const study = studies.find((item) => item.reference === story.reference);
        return (
          <article
            key={story.id}
            id={"discovery-" + story.id}
            className="research-direction"
          >
            <div className="research-direction-context">
              <p>Selected evidence</p>
              <small>{story.date}</small>
            </div>
            <div>
              <h3>{direction.label}</h3>
              <p className="research-direction-question">{story.question}</p>
              <p className="research-direction-evidence">
                <strong className={contextStyles.evidenceHeading}>
                  {story.title}
                </strong>
                <strong>Research evidence. </strong>
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
              <p className="research-direction-limit">
                <strong>What remains open. </strong>
                {story.limit}
              </p>
              <details className={styles.details}>
                <summary>Mechanism & engineering context</summary>
                <p>{story.meaning}</p>
                <p>{direction.mechanism}</p>
                <p>{direction.challenge}</p>
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
                <Link href={direction.relatedHref} className="text-link">
                  {direction.relatedLabel}
                </Link>
              </details>
              {study ? (
                <div className={styles.actions}>
                  <Link
                    href={`/research?study=${story.reference}#study-${story.reference}`}
                    className="text-link"
                  >
                    Read the study analysis
                  </Link>
                  <Link
                    href={"/challenges#" + study.challenge}
                    className="text-link"
                  >
                    Explore the engineering challenge
                  </Link>
                  <Link href={story.href} className="text-link">
                    {story.action}
                  </Link>
                </div>
              ) : null}
            </div>
          </article>
        );
      })}
    </div>
  );
}
