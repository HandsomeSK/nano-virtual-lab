import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/icon";
import { RelatedTopics } from "@/components/page-shell";
import { ReferenceLink } from "@/components/reference-link";
import { DeviceSchematic } from "@/components/device-schematic";
import { journey, site } from "@/lib/site";
import { references } from "@/data/references";

export default function Home() {
  const featured = ["kwon2024", "zhang2025", "guo2026"].map((id) =>
    references.find((ref) => ref.id === id)!,
  );
  return (
    <div className="container home-page">
      <section className="home-opening">
        <div className="home-title">
          <h1>{site.topic}</h1>
          <p className="hero-subtitle">{site.subtitle}</p>
        </div>
        <div className="home-context">
          <p>{site.description}</p>
          <Link href="/foundations" className="button-primary">
            Start Learning <Icon name="arrow" className="size-4" />
          </Link>
        </div>
        <figure className="home-material">
          <Image
            src="/images/material-journey.webp"
            width={1200}
            height={800}
            alt="Conceptual illustration of a graphene honeycomb sheet, a violet and yellow MoS₂ layer, and a layered top-gate transistor"
            preload
            sizes="(max-width: 800px) 100vw, 65vw"
            className="hero-material-image"
          />
          <figcaption>Conceptual illustration · not to scale</figcaption>
        </figure>
        <nav
          className="home-material-index"
          aria-label="Explore material structures"
        >
          <Link href="/foundations#graphene-structure">
            <strong>Graphene</strong>
            <span>A carbon lattice. A distinctive transport platform.</span>
          </Link>
          <Link href="/why-mos2#meet-mos2">
            <strong>MoS₂</strong>
            <span>An atomically thin semiconductor.</span>
          </Link>
          <Link href="/device">
            <strong>Transistor</strong>
            <span>Material properties under electrical control.</span>
          </Link>
          <Link href="/why-mos2" className="text-link">
            Explore Materials
          </Link>
        </nav>
      </section>

      <section className="home-introduction">
        <h2>From Nanomaterials to Two-Dimensional Electronics</h2>
        <div>
          <p>
            Nanomaterials have dimensions at the nanoscale. Surface-to-volume
            ratio, quantum confinement and electronic structure can give them
            physical, chemical and electronic properties that differ from bulk
            materials. Surface atoms experience different bonding and
            environments; confined electronic states depend on geometry and
            boundary conditions. These are mechanisms to investigate, rather
            than a promise that every smaller material has better performance.
          </p>
          <p>
            Our focus is two-dimensional nanomaterials. Graphene combines an
            atomically thin carbon structure with remarkable transport, but its
            zero band gap challenges conventional digital switching.{" "}
            <ReferenceLink id="schwierz2010" from="/" /> Semiconducting MoS₂
            provides a finite-gap example for studying field-effect transistors,
            scaling and device engineering.{" "}
            <ReferenceLink id="radis2011" from="/" />
          </p>
          <p>
            An atomically thin semiconductor is a starting point. Researchers
            must also inject charge through reliable contacts, integrate a
            low-defect gate dielectric and reproduce devices across large-area
            films.
            <ReferenceLink id="engineering2024" from="/" />
          </p>
          <Link href="/why-mos2#zero-gap" className="text-link">
            Why does a band gap help a digital switch?
          </Link>
        </div>
      </section>

      <section className="home-topic-stream">
        <div className="home-section-intro">
          <h2>Interactive Learning Journey</h2>
          <p>
            Follow a material from its atomic structure to a working device, or
            choose a starting point of your own.
          </p>
        </div>
        <ol className="journey">
          {journey.map((item, i) => (
            <li key={item.href}>
              <Link href={item.href}>
                <span className="step" aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <Icon name="arrow" className="size-4" />
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="home-workbench">
        <div className="workbench-visual">
          <h2>Explore the Platform</h2>
          <p>
            Hands-on tools to connect structures, material properties and device
            behaviour.
          </p>
          <figure>
            <DeviceSchematic on />
            <figcaption>
              Conceptual top-gate device · select and inspect its layers in the
              explorer.
            </figcaption>
          </figure>
        </div>
        <div className="workbench-links">
          {[
            {
              href: "/device",
              title: "Device Explorer",
              description:
                "Rotate a MoS₂ transistor and reveal the role of every layer.",
              action: "Explore Device",
            },
            {
              href: "/simulator",
              title: "Transistor Simulator",
              description:
                "Adjust a parameter, read the curve and understand the change.",
              action: "Launch Simulator",
            },
            {
              href: "/comparison",
              title: "Material Comparison",
              description:
                "Compare material concepts and your saved model scenarios.",
              action: "Compare Materials",
            },
          ].map((item) => (
            <Link href={item.href} key={item.href}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span className="text-link">
                {item.action}
                <Icon name="arrow" className="size-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-research">
        <div className="home-section-intro">
          <h2>Latest Research Developments (2024–2026)</h2>
          <p>
            Wafer-scale fabrication, transfer and interconnected circuits.
            Follow the evidence behind the next generation of devices.
          </p>
          <Link href="/research" className="text-link">
            Explore the Research Frontier
          </Link>
        </div>
        <div>
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
              <Icon name="arrow" className="size-4" />
            </Link>
          ))}
        </div>
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
