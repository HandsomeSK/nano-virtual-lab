import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/icon";
import { SectionHeading, RelatedTopics } from "@/components/page-shell";
import { ReferenceLink } from "@/components/reference-link";
import { journey } from "@/lib/site";
import { references } from "@/data/references";

export default function Home() {
  const featured = ["desai2016", "guo2026"].map(
    (id) => references.find((ref) => ref.id === id)!,
  );
  return (
    <div className="container home-page pb-16">
      <section className="hero">
        <div>
          <h1>From Graphene to the Future of Electronics</h1>
          <p>
            Explore the extraordinary electronic properties of graphene and
            discover how next-generation 2D semiconductors could transform
            transistor technology.
          </p>
          <div className="actions">
            <Link href="/foundations" className="button-primary">
              Start Learning <Icon name="arrow" className="size-4" />
            </Link>
            <Link href="/why-mos2" className="button-secondary">
              Explore Materials
            </Link>
            <Link href="/simulator" className="button-secondary">
              Launch Simulator
            </Link>
          </div>
        </div>
        <figure className="hero-materials">
          <Image
            src="/images/material-journey.webp"
            width={1200}
            height={800}
            alt="Conceptual illustration of a graphene honeycomb sheet, a violet and yellow MoS₂ layer, and a layered top-gate transistor"
            priority
            sizes="(max-width: 800px) 100vw, 55vw"
            className="hero-material-image"
          />
          <div className="material-journey-labels">
            <Link href="/foundations#graphene-structure">
              <strong>Graphene</strong>
              <span>transport</span>
            </Link>
            <Link href="/why-mos2#meet-mos2">
              <strong>MoS₂</strong>
              <span>semiconductor</span>
            </Link>
            <Link href="/device">
              <strong>Transistor</strong>
              <span>control</span>
            </Link>
          </div>
          <figcaption>Conceptual illustration · not to scale</figcaption>
        </figure>
      </section>
      <section className="topic-introduction">
        <h2>Great transport is only the beginning</h2>
        <p>
          Graphene shows how remarkable a single atomic layer can be. But moving
          charge efficiently and switching it off are different challenges.
          Follow the role of energy bands into MoS₂, then explore how a material
          becomes a transistor. <ReferenceLink id="schwierz2010" from="/" />
        </p>
        <Link href="/why-mos2#zero-gap" className="text-link">
          Why does a band gap help a digital switch?{" "}
          <Icon name="arrow" className="size-4" />
        </Link>
      </section>
      <section className="section">
        <SectionHeading
          title="Interactive Learning Journey"
          description="Choose your starting point. Follow a connection, or jump straight into an experiment."
        />
        <div className="journey">
          {journey.map((item, i) => (
            <Link key={item.href} href={item.href} data-tone={item.tone}>
              <span className="step">{i + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="section">
        <SectionHeading
          title="Explore the Platform"
          description="Hands-on tools to connect structures, material properties and device behaviour."
        />
        <div className="feature-grid">
          {[
            {
              href: "/device",
              title: "Device Explorer",
              description:
                "Rotate a MoS₂ transistor and reveal the role of every layer.",
              icon: "explore" as const,
            },
            {
              href: "/simulator",
              title: "Transistor Simulator",
              description:
                "Adjust a parameter, read the curve and understand the change.",
              icon: "simulator" as const,
            },
            {
              href: "/comparison",
              title: "Material Comparison",
              description:
                "Compare material concepts and your saved model scenarios.",
              icon: "research" as const,
            },
          ].map((item) => (
            <Link href={item.href} key={item.href} className="feature-link">
              <Icon name={item.icon} />
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className="text-link">
                  Explore <Icon name="arrow" className="size-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="section">
        <SectionHeading
          title="Featured Research"
          description="From an ultra-short gate to interconnected circuits: see why each study matters."
        />
        {featured.map((ref) => (
          <Link
            key={ref.id}
            href={"/research?study=" + ref.id + "#study-" + ref.id}
            className="research-row"
          >
            <span>{ref.year}</span>
            <div>
              <h3>{ref.title}</h3>
              <p>
                {ref.authors} · {ref.venue}
              </p>
            </div>
            <Icon name="arrow" />
          </Link>
        ))}
        <Link href="/research" className="text-link mt-4">
          Explore the Research Frontier <Icon name="arrow" className="size-4" />
        </Link>
      </section>
      <RelatedTopics
        links={[
          {
            href: "/foundations#graphene-electronics",
            title: "Explore Graphene Electronics",
            description: "Move the Fermi level and investigate the Dirac cone.",
          },
          {
            href: "/challenges",
            title: "Engineering Challenges",
            description:
              "What stands between a promising material and useful electronics?",
          },
        ]}
      />
    </div>
  );
}
