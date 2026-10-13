import Link from "next/link";
export function NanoMark() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path
        d="m12 2 7.8 4.5v9L12 20l-7.8-4.5v-9L12 2Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="m4.2 6.5 7.8 4.6 7.8-4.6M12 11v9"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      {[
        [12, 2],
        [4.2, 6.5],
        [19.8, 6.5],
        [4.2, 15.5],
        [19.8, 15.5],
        [12, 20],
        [12, 11],
      ].map(([cx, cy]) => (
        <circle
          key={cx + "," + cy}
          cx={cx}
          cy={cy}
          r="1.7"
          fill="currentColor"
        />
      ))}
    </svg>
  );
}

export function Brand({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`brand ${className}`.trim()}
      aria-label="NanoLab home"
    >
      <NanoMark />
      <span>NanoLab</span>
    </Link>
  );
}
