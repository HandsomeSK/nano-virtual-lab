import Link from "next/link";
import type { LabSection } from "@/lib/site";
import { Icon } from "./icon";

export function SectionCard({
  section,
  index,
}: {
  section: LabSection;
  index: number;
}) {
  return (
    <Link
      href={section.href}
      className="group flex h-full flex-col rounded-2xl border border-line bg-white/50 p-7 transition duration-200 hover:-translate-y-1 hover:border-teal/40 hover:bg-white"
    >
      <div className="mb-9 flex items-center justify-between">
        <span className="grid size-12 place-items-center rounded-xl bg-sage text-teal">
          <Icon name={section.icon} />
        </span>
        <span className="font-mono text-[11px] text-muted">0{index + 1}</span>
      </div>
      <p className="mb-2 text-xs text-muted">{section.label}</p>
      <h3 className="mb-3 text-2xl font-medium tracking-tight">
        {section.title}
      </h3>
      <p className="mb-9 text-sm leading-7 text-muted">{section.description}</p>
      <div className="mt-auto flex items-center justify-between border-t border-line pt-5">
        <span className="text-xs text-muted">Coming soon</span>
        <Icon
          name="arrow"
          className="size-5 text-teal transition-transform group-hover:translate-x-1"
        />
      </div>
    </Link>
  );
}
