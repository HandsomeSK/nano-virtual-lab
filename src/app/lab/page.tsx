import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, RelatedTopics } from "@/components/page-shell";
import { AtomicWorkbench } from "@/components/science/atomic-workbench";
import { DeviceViewer } from "@/components/device-viewer";
import { queryValue, type Query } from "@/lib/site";
export const metadata: Metadata = {
  title: "3D Lab",
  description:
    "Orbit graphene and MoS₂ atomic structures. Reveal primitive cells, compare stacking and inspect a transistor in NanoLab.",
};
export default async function Lab({
  searchParams,
}: {
  searchParams: Promise<Query>;
}) {
  const query = await searchParams;
  const material =
    queryValue(query, "material") === "mos2" ? "mos2" : "graphene";
  return (
    <PageShell
      title="Meet matter. Atom by atom"
      intro="Turn an abstract structure into something you can inspect. Orbit the lattice, reveal its primitive cell and connect atomic arrangement with material properties."
      contentsLayout="inline"
      contents={[
        {
          title: "3D models",
          items: [
            { id: "atomic-structure", label: "Atomic structure" },
            { id: "transistor", label: "From a sheet to a switch" },
          ],
        },
      ]}
    >
      <div id="atomic-structure">
        <AtomicWorkbench key={material} initialMaterial={material} syncUrl />
      </div>
      <section className="section" id="transistor">
        <div className="lab-next">
          <div>
            <span className="eyebrow">The next scale</span>
            <h2>From a sheet to a switch</h2>
            <p>
              Contacts, a dielectric and a gate give the semiconductor a device
              architecture. Rotate the device below, expose its atomic channel
              and inspect the material and role of each layer.
            </p>
          </div>
          <div className="actions">
            <Link
              href="/discoveries/mos2-interface-breakthrough#interactive-stack"
              className="metal-button metal-ghost"
            >
              Explore the 2026 interface study
            </Link>
          </div>
        </div>
        <DeviceViewer from="/lab#transistor" />
      </section>
      <RelatedTopics
        links={[
          {
            href: "/foundations#graphene-structure",
            title: "Read the geometry",
            description:
              "Keep exploring with the original 2D lattice and unit-cell activity.",
          },
          {
            href: "/why-mos2",
            title: "Explore MoS₂",
            description:
              "Connect the three-plane structure with electronic possibilities.",
          },
        ]}
      />
    </PageShell>
  );
}
