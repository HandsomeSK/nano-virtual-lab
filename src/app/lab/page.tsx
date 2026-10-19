import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { AtomicWorkbench } from "@/components/science/atomic-workbench";
import { DeviceViewer } from "@/components/device-viewer";
import styles from "./lab.module.css";

export const metadata: Metadata = {
  title: "3D Lab",
  description:
    "Explore graphene, MoS₂ layers and a unified transistor/interface model in one continuous, interactive 3D laboratory.",
};

export default function Lab() {
  return (
    <PageShell
      title="3D Lab"
      intro="Explore three models as you scroll. Inspect atomic geometry, then operate one transistor and compare its interface structures. Each model has its own controls and scientific explanation."
      contents={[
        {
          items: [
            { id: "graphene", label: "Graphene atomic structure" },
            { id: "mos2", label: "MoS₂ atomic structure" },
            { id: "transistor", label: "Transistor & interface engineering" },
          ],
        },
      ]}
    >
      <div id="atomic-structure" className={styles.models}>
        <div id="graphene" className={styles.model}>
          <AtomicWorkbench
            initialMaterial="graphene"
            fixedMaterial
            heading="Graphene atomic structure"
            description="Inspect the honeycomb sheet, a single carbon–carbon bond and three-neighbour coordination. Reveal the two-atom primitive cell or replay assembly."
          />
          <p><Link className="text-link" href="/foundations#graphene-structure">Understand graphene geometry →</Link></p>
        </div>
        <div id="mos2" className={styles.model}>
          <AtomicWorkbench
            initialMaterial="mos2"
            fixedMaterial
            heading="MoS₂ atomic structure"
            description="Inspect an S–Mo–S monolayer, then compare ideal 2H and 3R bilayers. Separate atomic planes or expand the spacing between sheets."
          />
          <p><Link className="text-link" href="/why-mos2#meet-mos2">Understand S–Mo–S structure →</Link></p>
        </div>
        <div className={styles.model}>
          <div id="transistor">
            <div id="interactive-device">
              <div id="interface-engineering">
                <div id="interactive-stack">
                  <DeviceViewer
                    heading="MoS₂ transistor & interface engineering"
                    description="Control the channel and compare three structures in the same model. Select components, inspect oxide morphology or separate the stack."
                    from="/lab#transistor"
                  />
                </div>
              </div>
            </div>
          </div>
          <p><Link className="text-link" href="/device#working-principle">Understand transistor operation →</Link></p>
        </div>
      </div>
    </PageShell>
  );
}
