import type { Metadata } from "next";
import { PageShell, RelatedTopics } from "@/components/page-shell";
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
      intro="Turn a material idea into a device experiment. Adjust bias, channel geometry and contacts, then follow the calculated response and its explanation."
    >
      <p className="model-note text-sm mb-6">
        <strong>Simplified Educational Model.</strong> A MoS₂-context,
        long-channel teaching calculation with assumed parameters, rather than a
        calibrated device prediction.
      </p>
      <Simulator
        key={JSON.stringify(query)}
        initial={normalizeParameters(query)}
      />
      <RelatedTopics
        links={[
          {
            href: "/comparison",
            title: "Material Comparison",
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
