import { useId } from "react";
export function DeviceSchematic({ on = true }: { on?: boolean }) {
  const id = useId().replaceAll(":", "");
  return (
    <svg
      viewBox="0 0 520 390"
      role="img"
      aria-label="Exploded top-gated MoS₂ transistor schematic with source, drain, channel, dielectric, gate and substrate"
      className="device-schematic"
    >
      <defs>
        <linearGradient id={id + "slab"} x2="1" y2="1">
          <stop stopColor="#364963" />
          <stop offset="1" stopColor="#1b293e" />
        </linearGradient>
        <linearGradient id={id + "gold"} x2="1" y2="1">
          <stop stopColor="#eed99c" />
          <stop offset="1" stopColor="#a98942" />
        </linearGradient>
      </defs>
      <g stroke="#617791" strokeWidth="1">
        <path
          d="M60 272 297 217 452 276 215 340Z"
          fill={"url(#" + id + "slab)"}
        />
        <path
          d="M60 272v38l155 61v-31ZM215 340l237-64v38l-237 57Z"
          fill="#263952"
        />
        <path
          d="M90 244 301 196 421 241 210 294Z"
          fill={on ? "#39b4c4" : "#35485c"}
          stroke="#67e8f9"
        />
        <path
          d="M87 215 164 195 209 213 131 235Z"
          fill={"url(#" + id + "gold)"}
        />
        <path d="M87 215v21l44 18v-19l78-22v20l-78 21" fill="#ad8e4a" />
        <path
          d="M318 229 395 209 440 227 362 249Z"
          fill={"url(#" + id + "gold)"}
        />
        <path d="M318 229v21l44 18v-19l78-22v20l-78 21" fill="#ad8e4a" />
        <path
          d="M135 153 292 115 398 155 241 196Z"
          fill="#7390b3"
          fillOpacity=".48"
        />
        <path
          d="M135 153v16l106 42v-15l157-41v16l-157 40"
          fill="#425777"
          fillOpacity=".7"
        />
        <path
          d="M157 82 288 50 375 82 244 118Z"
          fill={"url(#" + id + "gold)"}
        />
        <path d="M157 82v17l87 34v-15l131-36v17l-131 34" fill="#b2934c" />
      </g>
      <g
        fill="#cad7e9"
        fontFamily="monospace"
        fontSize="12"
        strokeWidth="1"
        stroke="#899db7"
      >
        <path d="M347 70h55" />
        <text x="410" y="74" stroke="none">
          Gate
        </text>
        <path d="M380 142h24" />
        <text x="410" y="146" stroke="none">
          Dielectric
        </text>
        <path d="M127 205 75 187" />
        <text x="15" y="185" stroke="none">
          Source
        </text>
        <path d="M421 220 452 201" />
        <text x="450" y="194" stroke="none">
          Drain
        </text>
        <path d="M308 271h53" />
        <text x="363" y="274" stroke="none">
          MoS₂
        </text>
        <path d="M326 339h58" />
        <text x="390" y="343" stroke="none">
          Substrate
        </text>
      </g>
      {on ? (
        <g className="carrier-flow" fill="#e6feff">
          {[0, 1, 2, 3, 4].map((i) => (
            <circle key={i} cx={213 + i * 19} cy={245 - i * 4} r="3" />
          ))}
        </g>
      ) : null}
    </svg>
  );
}
