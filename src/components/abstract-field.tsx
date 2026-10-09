// An abstract point field for visual identity; it does not represent a scientific model.
export function AbstractField() {
  const points = Array.from({ length: 650 }, (_, index) => {
    const y = 1 - (index / 649) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = index * Math.PI * (3 - Math.sqrt(5));
    const x = Math.cos(theta) * radius;
    const z = Math.sin(theta) * radius;
    return {
      x: 260 + x * 174 + y * 36,
      y: 255 + y * 174 - x * 25,
      size: 1.3 + (z + 1) * 1.1,
      opacity: 0.16 + (z + 1) * 0.36,
    };
  });

  return (
    <div className="field-panel relative flex aspect-square items-center justify-center overflow-hidden rounded-[2rem] border border-line bg-sage/40">
      <div className="absolute inset-0 field-grid" />
      <div className="absolute left-6 top-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-teal">
        <span className="size-1.5 rounded-full bg-teal" /> A different
        perspective
      </div>
      <svg
        className="field-art relative w-full"
        viewBox="0 0 520 520"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="260"
          cy="255"
          r="211"
          stroke="#b5ccc1"
          strokeDasharray="2 8"
        />
        <ellipse
          cx="260"
          cy="255"
          rx="225"
          ry="85"
          stroke="#8daf9e"
          strokeOpacity=".5"
          transform="rotate(-28 260 255)"
        />
        <ellipse
          cx="260"
          cy="255"
          rx="206"
          ry="72"
          stroke="#8daf9e"
          strokeOpacity=".35"
          transform="rotate(48 260 255)"
        />
        {points.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r={point.size}
            fill="#256753"
            opacity={point.opacity}
          />
        ))}
        <path d="M260 24v12M260 474v12M29 255h12M479 255h12" stroke="#729887" />
        <circle cx="70" cy="339" r="5" fill="#256753" />
        <circle cx="414" cy="131" r="4" fill="#256753" />
      </svg>
      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between border-t border-teal/15 pt-3 font-mono text-[9px] uppercase tracking-[0.12em] text-teal">
        <span>Abstract visual study</span>
        <span>Scale / Curiosity / Discovery</span>
      </div>
    </div>
  );
}
