import Link from "next/link";
export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="NanoLab: Beyond Silicon home">
      <strong>
        NanoLab<span className="text-cyan">.</span>
      </strong>
      <span>Beyond Silicon</span>
    </Link>
  );
}
