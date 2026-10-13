export function ScienceIcon({
  name,
}: {
  name: "lattice" | "layers" | "discovery";
}) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {name === "lattice" ? (
        <>
          <path d="m12 3 7.8 4.5v9L12 21l-7.8-4.5v-9L12 3Z" />
          {[
            [12, 3],
            [19.8, 7.5],
            [19.8, 16.5],
            [12, 21],
            [4.2, 16.5],
            [4.2, 7.5],
          ].map(([cx, cy]) => (
            <circle
              key={cx + "," + cy}
              cx={cx}
              cy={cy}
              r="1.9"
              fill="currentColor"
              stroke="none"
            />
          ))}
        </>
      ) : name === "layers" ? (
        <>
          <path d="m3 7 9-4 9 4-9 4-9-4Z M3 12l9 4 9-4 M3 17l9 4 9-4" />
        </>
      ) : (
        <>
          <path d="M7 21h12M13 17a6 6 0 0 0 6-6 M6 15h8M9 3l4 2-4 8-4-2 4-8Z M13 5l1-2 M10 18v3" />
          <circle cx="18" cy="8" r="2" />
        </>
      )}
    </svg>
  );
}
