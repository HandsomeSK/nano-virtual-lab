"use client";
import { useState } from "react";
import Link from "next/link";
import { deviceParts } from "@/data/device";
import { ScientificStage } from "./science/scientific-stage";
import { CameraControls } from "./science/camera-controls";
import { defaultCamera, type SceneOptions } from "./science/types";
import { ReferenceLink } from "./reference-link";
const initialOptions: SceneOptions = {
  selected: "channel",
  hidden: [],
  exploded: false,
  separation: 0,
  unitCell: false,
  labels: true,
  on: false,
  assembly: 0,
  touchOrbit: false,
};
const interfacePart = {
  id: "interface",
  name: "Carbon-dot interface",
  color: "#80dedc",
  role: "An insulating carbon-dot assembly sits between MoS₂ and HfO₂. Edge functional groups assist oxide nucleation. In the paper, the interfacial layer is about 0.4–0.6 nm physically; this schematic exaggerates thickness and uses illustrative dot placement.",
  concept: "/discoveries/mos2-interface-breakthrough#breakthrough",
};
export function DeviceViewer({
  interfaceResearch = false,
}: {
  interfaceResearch?: boolean;
}) {
  const [withInterface, setWithInterface] = useState(interfaceResearch);
  const [options, setOptions] = useState({
    ...initialOptions,
    selected: interfaceResearch ? "interface" : "channel",
  });
  const [camera, setCamera] = useState(defaultCamera);
  const parts = [...deviceParts, ...(withInterface ? [interfacePart] : [])];
  const part = parts.find((p) => p.id === options.selected) ?? deviceParts[1];
  function select(id: string) {
    setOptions((p) => ({
      ...p,
      selected: id,
      hidden: p.hidden.filter((k) => k !== id),
    }));
  }
  function reset() {
    setCamera({ ...defaultCamera, revision: camera.revision + 1 });
    setOptions({
      ...initialOptions,
      selected: withInterface ? "interface" : "channel",
    });
  }
  function compare(value: boolean) {
    setWithInterface(value);
    setOptions({
      ...options,
      selected: value ? "interface" : "dielectric",
      hidden: [],
    });
  }
  return (
    <div className="science-workbench device-instrument">
      <section className="science-stage">
        <div className="workbench-heading">
          <h2>
            {interfaceResearch
              ? "Engineer the interface"
              : "Interactive 3D viewer"}
          </h2>
          {interfaceResearch ? (
            <div
              className="tabs"
              role="group"
              aria-label="Compare interface architectures"
            >
              <button
                type="button"
                aria-pressed={!withInterface}
                onClick={() => compare(false)}
              >
                Without carbon dots
              </button>
              <button
                type="button"
                aria-pressed={withInterface}
                onClick={() => compare(true)}
              >
                With carbon dots
              </button>
            </div>
          ) : (
            <div
              className="tabs"
              role="group"
              aria-label="Conceptual channel state"
            >
              <button
                type="button"
                aria-pressed={!options.on}
                onClick={() => setOptions({ ...options, on: false })}
              >
                OFF
              </button>
              <button
                type="button"
                aria-pressed={options.on}
                onClick={() => setOptions({ ...options, on: true })}
              >
                ON
              </button>
            </div>
          )}
        </div>
        <div className="stage-meta">
          <span>
            {withInterface
              ? "MoS₂ / carbon dots / HfO₂"
              : "Conceptual top-gate MoS₂ transistor"}
          </span>
          <span>Thicknesses exaggerated</span>
        </div>
        <ScientificStage
          spec={{
            kind: "device",
            interface: withInterface,
            roughOxide: interfaceResearch && !withInterface,
          }}
          options={options}
          camera={camera}
          onSelect={select}
          onCameraChange={setCamera}
        />
        <div className="stage-caption">
          <span>Drag to orbit · scroll / pinch to zoom</span>
          <span>Arrows and +/− work on the focused model.</span>
        </div>
        <CameraControls
          camera={camera}
          update={setCamera}
          reset={reset}
          focus={() =>
            setCamera({
              ...camera,
              revision: camera.revision + 1,
              focus: options.selected,
            })
          }
        />
        <div className="science-options">
          <label>
            <input
              type="checkbox"
              name="exploded-view"
              checked={options.exploded}
              onChange={(e) =>
                setOptions({ ...options, exploded: e.target.checked })
              }
            />
            Exploded view
          </label>
          <label>
            <input
              type="checkbox"
              name="layer-labels"
              checked={options.labels}
              onChange={(e) =>
                setOptions({ ...options, labels: e.target.checked })
              }
            />
            Selection label
          </label>
          <label className="touch-orbit">
            <input
              type="checkbox"
              name="device-touch-orbit"
              checked={options.touchOrbit}
              onChange={(e) =>
                setOptions({ ...options, touchOrbit: e.target.checked })
              }
            />
            One-finger orbit
          </label>
        </div>
        {interfaceResearch ? (
          <p className="science-boundary">
            Original structural comparison, not a measured before/after
            performance plot. Bare-surface nucleation can leave discontinuous
            oxide islands; the carbon-dot assembly helps form a continuous film.
            <ReferenceLink
              id="wong2026"
              from="/discoveries/mos2-interface-breakthrough#interactive-stack"
            />
          </p>
        ) : (
          <p
            className="science-boundary"
            aria-live="polite"
            data-device-state={options.on ? "on" : "off"}
          >
            <strong>
              {options.on
                ? "ON illustration: gate-induced charge enables a channel."
                : "OFF illustration: channel charge is reduced."}
            </strong>{" "}
            This state toggle is conceptual; bias-dependent current is
            calculated in the simulator.
          </p>
        )}
        {parts.every((p) => options.hidden.includes(p.id)) ? (
          <p role="status" className="notice">
            All layers are hidden. Select a component or reset the model to
            restore it.
          </p>
        ) : null}
      </section>
      <aside className="science-inspector">
        <h3>Device components</h3>
        <p className="text-sm">
          Select a layer to inspect its role. Checkboxes control visibility.
        </p>
        <div className="science-parts">
          {parts.map((item) => (
            <div key={item.id}>
              <button
                type="button"
                aria-pressed={options.selected === item.id}
                onClick={() => select(item.id)}
              >
                <i style={{ background: item.color }} />
                {item.name}
              </button>
              <label>
                <input
                  name={"show-" + item.id}
                  type="checkbox"
                  aria-label={"Show " + item.name}
                  checked={!options.hidden.includes(item.id)}
                  onChange={(e) =>
                    setOptions({
                      ...options,
                      hidden: e.target.checked
                        ? options.hidden.filter((id) => id !== item.id)
                        : [...options.hidden, item.id],
                    })
                  }
                />
              </label>
            </div>
          ))}
        </div>
        <section className="science-selection" aria-live="polite">
          <h4>{part.name}</h4>
          <p>
            {part.role}
            {withInterface &&
            (part.id === "dielectric" || part.id === "interface") ? (
              <ReferenceLink
                id="wong2026"
                from="/discoveries/mos2-interface-breakthrough#interactive-stack"
              />
            ) : null}
          </p>
          <Link className="text-link" href={part.concept}>
            Explore the related concept
          </Link>
        </section>
        <p className="text-xs">
          Conceptual layer geometry; not an exact experimental device. Carrier
          injection, spatial fields and trapped charge are not computed.
        </p>
      </aside>
    </div>
  );
}
