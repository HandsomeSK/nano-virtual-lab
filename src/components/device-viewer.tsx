"use client";
import { useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { deviceParts, type DevicePartId } from "@/data/device";
export function DeviceViewer() {
  const [selected, setSelected] = useState<DevicePartId>("channel");
  const [hidden, setHidden] = useState<DevicePartId[]>([]);
  const [exploded, setExploded] = useState(false);
  const [on, setOn] = useState(false);
  const [camera, setCamera] = useState({ pitch: 58, yaw: -28, zoom: 1 });
  const drag = useRef<{ x: number; y: number; moved: boolean } | null>(null);
  const part = deviceParts.find((item) => item.id === selected)!;
  function reset() {
    setCamera({ pitch: 58, yaw: -28, zoom: 1 });
    setHidden([]);
    setExploded(false);
    setOn(false);
    setSelected("channel");
  }
  function select(id: DevicePartId) {
    setSelected(id);
    setHidden((items) => items.filter((item) => item !== id));
  }
  function zoom(delta: number) {
    setCamera((value) => ({
      ...value,
      zoom: Math.max(0.5, Math.min(1.8, value.zoom + delta)),
    }));
  }
  return (
    <div className="viewer-layout">
      <section className="panel viewer-panel">
        <div className="chart-heading">
          <h2>Interactive 3D Viewer</h2>
          <div className="tabs">
            <button aria-pressed={!on} onClick={() => setOn(false)}>
              OFF
            </button>
            <button aria-pressed={on} onClick={() => setOn(true)}>
              ON
            </button>
          </div>
        </div>
        <div
          className="device-viewport"
          tabIndex={0}
          role="group"
          aria-label="3D device model: drag to rotate; arrow keys rotate; plus and minus zoom"
          onPointerDown={(event) => {
            if (event.button !== 0) return;
            drag.current = { x: event.clientX, y: event.clientY, moved: false };
          }}
          onPointerMove={(event) => {
            if (!drag.current) return;
            const dx = event.clientX - drag.current.x,
              dy = event.clientY - drag.current.y;
            if (!drag.current.moved) {
              if (Math.abs(dx) + Math.abs(dy) <= 2) return;
              drag.current.moved = true;
              event.currentTarget.setPointerCapture(event.pointerId);
            }
            drag.current.x = event.clientX;
            drag.current.y = event.clientY;
            setCamera((value) => ({
              ...value,
              yaw: value.yaw + dx * 0.4,
              pitch: Math.max(15, Math.min(80, value.pitch - dy * 0.3)),
            }));
          }}
          onPointerUp={() => {
            if (drag.current?.moved) {
              setTimeout(() => {
                drag.current = null;
              }, 0);
            } else drag.current = null;
          }}
          onPointerCancel={() => {
            drag.current = null;
          }}
          onKeyDown={(event) => {
            if (event.target !== event.currentTarget) return;
            if (
              [
                "ArrowLeft",
                "ArrowRight",
                "ArrowUp",
                "ArrowDown",
                "+",
                "=",
                "-",
              ].includes(event.key)
            )
              event.preventDefault();
            if (event.key === "+" || event.key === "=") zoom(0.1);
            else if (event.key === "-") zoom(-0.1);
            else if (event.key.startsWith("Arrow"))
              setCamera((value) => ({
                ...value,
                yaw:
                  value.yaw +
                  (event.key === "ArrowLeft"
                    ? -8
                    : event.key === "ArrowRight"
                      ? 8
                      : 0),
                pitch: Math.max(
                  15,
                  Math.min(
                    80,
                    value.pitch +
                      (event.key === "ArrowUp"
                        ? 8
                        : event.key === "ArrowDown"
                          ? -8
                          : 0),
                  ),
                ),
              }));
          }}
        >
          <div
            className="device-world"
            style={{
              transform:
                "rotateX(" +
                camera.pitch +
                "deg) rotateZ(" +
                camera.yaw +
                "deg) scale(calc(" +
                camera.zoom +
                " * var(--scene-scale)))",
            }}
          >
            {deviceParts
              .filter((item) => !hidden.includes(item.id))
              .map((item) => {
                const z =
                  item.z +
                  (exploded
                    ? deviceParts.findIndex((entry) => entry.id === item.id) *
                      18
                    : 0);
                const style = {
                  left: item.x,
                  top: item.y,
                  width: item.w,
                  height: item.d,
                  transform: "translateZ(" + z + "px)",
                  "--slab-width": item.w + "px",
                  "--slab-depth": item.d + "px",
                  "--slab-height": item.h + "px",
                  "--slab-color":
                    item.id === "channel" && !on ? "#33515a" : item.color,
                } as CSSProperties;
                return (
                  <div
                    key={item.id}
                    className={
                      "slab " + (selected === item.id ? "selected" : "")
                    }
                    style={style}
                    data-part={item.id}
                  >
                    <button
                      className="slab-face slab-top"
                      aria-label={"Select " + item.name}
                      aria-pressed={selected === item.id}
                      onClick={() => {
                        if (!drag.current?.moved) select(item.id);
                      }}
                    >
                      {item.name}
                    </button>
                    {["bottom", "front", "back", "left", "right"].map(
                      (face) => (
                        <div
                          key={face}
                          aria-hidden="true"
                          className={"slab-face slab-" + face}
                        />
                      ),
                    )}
                  </div>
                );
              })}
          </div>
        </div>
        <p className="muted text-xs">
          Drag to orbit · keyboard arrows rotate · +/− zoom. Simplified top-gate
          stack, not to scale.
        </p>
        <div className="actions">
          <button
            aria-label="Zoom out"
            className="button-secondary"
            onClick={() => zoom(-0.1)}
          >
            −
          </button>
          <button
            aria-label="Zoom in"
            className="button-secondary"
            onClick={() => zoom(0.1)}
          >
            +
          </button>
          <button className="button-secondary" onClick={reset}>
            Reset Model
          </button>
          <label className="inline-flex gap-2 items-center text-sm">
            <input
              type="checkbox"
              checked={exploded}
              onChange={(event) => setExploded(event.target.checked)}
            />
            Exploded view
          </label>
        </div>
        <p className="text-sm mt-4" aria-live="polite">
          {on
            ? "ON illustration: gate-induced charge enables a channel."
            : "OFF illustration: channel charge is reduced."}{" "}
          This state toggle is conceptual; bias-dependent current is calculated
          in the simulator.
        </p>
      </section>
      <aside className="panel">
        <h2>Device Components</h2>
        <div className="component-list">
          {deviceParts.map((item) => (
            <div key={item.id}>
              <button
                aria-pressed={selected === item.id}
                onClick={() => select(item.id)}
              >
                <i style={{ background: item.color }} />
                {item.name}
              </button>
              <label>
                <input
                  aria-label={"Show " + item.name}
                  type="checkbox"
                  checked={!hidden.includes(item.id)}
                  onChange={(event) =>
                    setHidden((items) =>
                      event.target.checked
                        ? items.filter((id) => id !== item.id)
                        : [...items, item.id],
                    )
                  }
                />
                <span className="sr-only">Show {item.name}</span>
              </label>
            </div>
          ))}
        </div>
        <section className="component-info" aria-live="polite">
          <h3>Component Information</h3>
          <h4 className="text-cyan mt-4">{part.name}</h4>
          <p className="text-sm mt-2">{part.role}</p>
          <Link className="text-link" href={part.concept}>
            Review the foundation →
          </Link>
        </section>
      </aside>
    </div>
  );
}
