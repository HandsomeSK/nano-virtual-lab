import Link from "next/link";

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 ${inverse ? "text-white" : "text-ink"}`}
      aria-label="Nano Virtual Lab home"
    >
      <span
        className={`grid size-10 grid-cols-3 gap-1 rounded-xl p-2.5 ${inverse ? "bg-white/10" : "bg-ink"}`}
        aria-hidden="true"
      >
        {Array.from({ length: 9 }, (_, i) => (
          <span
            key={i}
            className={`rounded-full ${i === 4 ? "bg-mint" : "bg-white/85"}`}
          />
        ))}
      </span>
      <span className="text-[17px] font-semibold tracking-tight">
        nano<span className="font-normal opacity-65"> / virtual lab</span>
      </span>
    </Link>
  );
}
