import Link from "next/link";
export function Brand({ showSubtitle = true }: { showSubtitle?: boolean }) {
  return (
    <Link
      href="/"
      className="brand"
      aria-label={showSubtitle ? "NanoLab: Beyond Silicon home" : "NanoLab home"}
    >
      <strong>
        NanoLab<span className="text-cyan">.</span>
      </strong>
      {showSubtitle ? <span>Beyond Silicon</span> : null}
    </Link>
  );
}
