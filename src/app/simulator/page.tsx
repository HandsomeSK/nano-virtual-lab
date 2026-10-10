import type { Metadata } from "next";
import { PageShell, Notice, RelatedTopics } from "@/components/page-shell";
import { Simulator } from "@/components/simulation/simulator";
import { normalizeParameters } from "@/lib/simulation/model";
import type { Query } from "@/lib/site";
export const metadata: Metadata = { title: "Transistor Simulator" };
export default async function SimulatorPage({
  searchParams,
}: {
  searchParams: Promise<Query>;
}) {
  const query = await searchParams;
  return (
    <PageShell
      title="Transistor Simulator"
      intro="Explore how bias, geometry and interfaces influence a MoS₂-context transistor model. Change one assumption and follow the response."
    >
      <Notice>
        <strong>Educational / Simplified Model.</strong> This is a long-channel
        teaching calculation, not a calibrated prediction of a particular MoS₂
        device. Parameter defaults are assumed, not measured.
      </Notice>
      <Simulator
        key={JSON.stringify(query)}
        initial={normalizeParameters(query)}
      />
      <RelatedTopics
        links={[
          {
            href: "/comparison",
            title: "Comparison",
            description: "Compare the same model under different assumptions.",
          },
          {
            href: "/challenges",
            title: "Engineering Challenges",
            description: "See the effects this teaching model leaves out.",
          },
        ]}
      />
    </PageShell>
  );
}
