import type { Metadata } from "next";
import { PageShell, RelatedTopics } from "@/components/page-shell";
import { AtomicWorkbench } from "@/components/science/atomic-workbench";
import { DeviceViewer } from "@/components/device-viewer";
import styles from "./lab.module.css";

export const metadata: Metadata = {
  title: "3D Lab",
  description:
    "Explore graphene, MoS₂ layers, a transistor and carbon-dot interface engineering in one continuous, interactive 3D laboratory.",
};

export default function Lab() {
  return (
    <PageShell
      title="3D Lab"
      intro="Explore four models as you scroll. Drag to rotate, pinch to zoom, or use the camera buttons. Each model has its own selection, controls and reset."
    >
      <div id="atomic-structure" className={styles.models}>
        <div id="graphene" className={styles.model}>
          <AtomicWorkbench
            initialMaterial="graphene"
            fixedMaterial
            heading="Graphene atomic structure"
            description="Inspect the honeycomb sheet, a single carbon–carbon bond and three-neighbour coordination. Reveal the two-atom primitive cell or replay assembly."
          />
        </div>
        <div id="mos2" className={styles.model}>
          <AtomicWorkbench
            initialMaterial="mos2"
            fixedMaterial
            heading="MoS₂ atomic structure"
            description="Inspect an S–Mo–S monolayer, then compare ideal 2H and 3R bilayers. Separate atomic planes or expand the spacing between sheets."
          />
        </div>
        <div id="transistor" className={styles.model}>
          <div id="interactive-device">
            <DeviceViewer
              heading="MoS₂ transistor"
              description="Select a component to inspect its material and role. Reveal the stack with an exploded view and compare conceptual ON and OFF states."
              from="/lab#transistor"
            />
          </div>
        </div>
        <div id="interface-engineering" className={styles.model}>
          <div id="interactive-stack">
            <DeviceViewer
              interfaceResearch
              heading="Interface engineering"
              description="Compare oxide coverage with and without a carbon-dot interlayer. Select the interface or dielectric to inspect the structural explanation and its limits."
              from="/lab#interface-engineering"
            />
          </div>
        </div>
      </div>
      <RelatedTopics
        links={[
          {
            href: "/foundations#graphene-structure",
            title: "Understand the atomic geometry",
            description:
              "Connect the structures to bonding, primitive cells and material properties.",
          },
          {
            href: "/device#working-principle",
            title: "Understand transistor operation",
            description:
              "Follow how the gate, channel and contacts work together before exploring numerical curves.",
          },
        ]}
      />
    </PageShell>
  );
}
