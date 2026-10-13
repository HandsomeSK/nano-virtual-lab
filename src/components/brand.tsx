import Link from "next/link";
import { NanoLabWordmark } from "./nanolab-wordmark";

export function Brand({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`brand ${className}`.trim()}
      aria-label="NanoLab home"
    >
      <NanoLabWordmark />
    </Link>
  );
}
