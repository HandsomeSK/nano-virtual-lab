import Link from "next/link";
import { DeviceSchematic } from "@/components/device-schematic";
import { Icon } from "@/components/icon";
import { SectionHeading, RelatedTopics } from "@/components/page-shell";
import { journey } from "@/lib/site";
import { references, referenceHref } from "@/data/references";
export default function Home() {
  return (
    <div className="container pb-16">
      <section className="hero">
        <div>
          <h1>
            Beyond silicon.
            <br />
            <span>Into the nanoscale.</span>
          </h1>
          <p>
            Explore how atomically thin MoS₂ channels could shape the next
            generation of transistors.
          </p>
          <div className="actions">
            <Link href="/foundations" className="button-primary">
              Start Learning <Icon name="arrow" className="size-4" />
            </Link>
            <Link href="/device" className="button-secondary">
              Explore Device
            </Link>
          </div>
          <Link href="/simulator" className="text-link mt-3">
            Launch Simulator <Icon name="arrow" className="size-4" />
          </Link>
        </div>
        <figure>
          <DeviceSchematic />
          <figcaption>Schematic · not to scale · top-gated FET</figcaption>
        </figure>
      </section>
      <section className="research-question">
        <h2>What changes when a channel is only a layer thick?</h2>
        <p>
          Explore how electrostatics, energy bands and interfaces combine to
          enable — and challenge — next-generation electronics.
        </p>
        <Link href="/why-mos2" className="text-link">
          Explore the research question →
        </Link>
      </section>
      <section className="section">
        <SectionHeading
          title="Explore the platform"
          description="Interactive resources to learn, experiment and compare."
        />
        <div className="feature-grid">
          {[
            {
              href: "/device",
              title: "Device Explorer",
              description: "Examine a MoS₂ transistor, layer by layer.",
              icon: "explore" as const,
            },
            {
              href: "/simulator",
              title: "Transistor Simulator",
              description:
                "Change the parameters. Observe the model’s response.",
              icon: "simulator" as const,
            },
            {
              href: "/comparison",
              title: "Material Comparison",
              description:
                "Contrast material properties and your saved scenarios.",
              icon: "research" as const,
            },
          ].map((item) => (
            <Link href={item.href} key={item.href} className="feature-link">
              <Icon name={item.icon} />
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className="text-link">Explore →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="section">
        <SectionHeading
          title="Your learning journey"
          description="From fundamentals to research questions, at your own pace."
        />
        <div className="journey">
          {journey.map((item, i) => (
            <Link key={item.href} href={item.href}>
              <span className="step">{i + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="section">
        <SectionHeading
          title="Featured research"
          description="Selected milestones. Follow the original papers and their context."
        />
        {[references[1], references[4]].map((ref) => (
          <Link
            key={ref.id}
            href={referenceHref(ref.id, "/")}
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
          Explore the Research Frontier →
        </Link>
      </section>
      <RelatedTopics
        links={[
          {
            href: "/challenges",
            title: "Engineering Challenges",
            description:
              "What stands between an interesting material and a useful technology?",
          },
          {
            href: "/about",
            title: "About & References",
            description: "Find the evidence, assumptions and project scope.",
          },
        ]}
      />
    </div>
  );
}
