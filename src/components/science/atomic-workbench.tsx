"use client";
import { useState } from "react";
import {
  atomicColors,
  type AtomicMaterial,
  type AtomKind,
} from "@/lib/science/atomic-structure";
import { ScientificStage } from "./scientific-stage";
import { CameraControls } from "./camera-controls";
import { atomNames, defaultCamera, type SceneOptions } from "./types";
import { ReferenceLink } from "@/components/reference-link";
const initialOptions: SceneOptions = {
  selected: "carbon",
  hidden: [],
  exploded: false,
  separation: 0,
  unitCell: false,
  labels: true,
  on: false,
  assembly: 0,
  touchOrbit: false,
};
const descriptions: Record<AtomKind, string> = {
  carbon:
    "Each interior carbon has three nearest carbon neighbours in a planar honeycomb network. Two carbon atoms form a primitive cell. Ball-and-stick sizes are illustrative; the model does not calculate electron density.",
  molybdenum:
    "The central molybdenum plane sits between two sulfur planes. Each interior Mo has six nearest S neighbours in trigonal-prismatic coordination. One Mo and two S atoms form a primitive cell.",
  "sulfur-top":
    "The upper sulfur plane has the same in-plane registry as the lower sulfur plane within a 1H sheet. Upper and lower sulfur triangles form a trigonal prism around Mo, rather than an octahedron.",
  "sulfur-bottom":
    "The lower sulfur plane completes a single S–Mo–S sheet. A monolayer is one three-plane sheet, not three independent monolayers. Between sheets, van der Waals interactions matter; they are not drawn as covalent bonds.",
};
export function AtomicWorkbench({
  initialMaterial = "graphene",
  fixedMaterial = false,
  syncUrl = false,
}: {
  initialMaterial?: AtomicMaterial;
  fixedMaterial?: boolean;
  syncUrl?: boolean;
}) {
  const [material, setMaterial] = useState(initialMaterial),
    [layers, setLayers] = useState<1 | 2>(1),
    [stacking, setStacking] = useState<"2H" | "3R">("2H");
  const [camera, setCamera] = useState(defaultCamera);
  const [detail, setDetail] = useState<"lattice" | "bond" | "coordination">(
    "lattice",
  );
  const [options, setOptions] = useState({
    ...initialOptions,
    selected: initialMaterial === "graphene" ? "carbon" : "molybdenum",
  });
  const kinds: AtomKind[] =
    material === "graphene"
      ? ["carbon"]
      : ["sulfur-top", "molybdenum", "sulfur-bottom"];
  const select = (id: string) =>
    setOptions((p) => ({
      ...p,
      selected: id,
      hidden: p.hidden.filter((k) => k !== id),
    }));
  function reset() {
    setCamera({ ...defaultCamera, revision: camera.revision + 1 });
    setOptions({
      ...initialOptions,
      selected: material === "graphene" ? "carbon" : "molybdenum",
      assembly: options.assembly + 1,
    });
  }
  function changeMaterial(next: AtomicMaterial) {
    setMaterial(next);
    setDetail("lattice");
    setLayers(1);
    setStacking("2H");
    setCamera({ ...defaultCamera, revision: camera.revision + 1 });
    setOptions({
      ...initialOptions,
      selected: next === "graphene" ? "carbon" : "molybdenum",
    });
    if (syncUrl) {
      const url = new URL(window.location.href);
      url.searchParams.set("material", next);
      history.replaceState(null, "", url);
    }
  }
  return (
    <section
      className="atomic-workbench"
      aria-label="Atomic structure workbench"
    >
      <div className="workbench-heading">
        <div>
          <span className="eyebrow">Atomic structure</span>
          <h2>
            {material === "graphene"
              ? "A single carbon sheet."
              : "One sheet. Three atomic planes."}
          </h2>
        </div>
        {!fixedMaterial ? (
          <div
            className="tabs"
            role="group"
            aria-label="Choose atomic material"
          >
            {(["graphene", "mos2"] as const).map((id) => (
              <button
                type="button"
                key={id}
                aria-pressed={material === id}
                onClick={() => changeMaterial(id)}
              >
                {id === "graphene" ? "Graphene" : "MoS₂"}
              </button>
            ))}
          </div>
        ) : null}
      </div>
      <div className="science-workbench">
        <div className="science-stage">
          <div className="stage-meta">
            <span>
              {material === "graphene"
                ? detail === "bond"
                  ? "One C–C bond · ≈ 1.42 Å"
                  : detail === "coordination"
                    ? "Three nearest neighbours · 120°"
                    : "Ideal honeycomb lattice"
                : layers === 1
                  ? "1H monolayer"
                  : stacking + " bilayer · ideal registry"}
            </span>
            <span>Ball-and-stick model</span>
          </div>
          <ScientificStage
            spec={{
              kind: "atomic",
              material,
              layers,
              stacking,
              detail: material === "graphene" ? detail : "lattice",
            }}
            options={options}
            camera={camera}
            onSelect={select}
            onCameraChange={setCamera}
          />
          <div className="stage-caption">
            <span>
              360° orbit · drag to see above and below · pinch to zoom
            </span>
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
            {material === "graphene" ? (
              <div className="tabs" role="group" aria-label="Graphene detail">
                {(["lattice", "bond", "coordination"] as const).map((view) => (
                  <button
                    type="button"
                    key={view}
                    aria-pressed={detail === view}
                    onClick={() => {
                      setDetail(view);
                      setCamera({
                        ...defaultCamera,
                        pitch: view === "bond" ? 22 : 52,
                        revision: camera.revision + 1,
                      });
                      setOptions({
                        ...initialOptions,
                        labels: view === "lattice",
                      });
                    }}
                  >
                    {view === "lattice"
                      ? "Carbon sheet"
                      : view === "bond"
                        ? "C–C bond"
                        : "Three neighbours"}
                  </button>
                ))}
              </div>
            ) : null}
            <label>
              <input
                type="checkbox"
                name="unit-cell"
                checked={options.unitCell}
                disabled={material === "graphene" && detail !== "lattice"}
                onChange={(e) =>
                  setOptions({ ...options, unitCell: e.target.checked })
                }
              />
              Primitive cell
            </label>
            <label>
              <input
                type="checkbox"
                name="atom-labels"
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
                name="touch-orbit"
                checked={options.touchOrbit}
                onChange={(e) =>
                  setOptions({ ...options, touchOrbit: e.target.checked })
                }
              />
              One-finger orbit
            </label>
            <button
              type="button"
              className="button-secondary"
              onClick={() =>
                setOptions({ ...options, assembly: options.assembly + 1 })
              }
            >
              Replay assembly
            </button>
          </div>
          {kinds.every((id) => options.hidden.includes(id)) ? (
            <p role="status" className="notice">
              All atoms are hidden. Select a component or reset the model to
              restore it.
            </p>
          ) : null}
          <p className="science-boundary">
            Finite, ideal lattice; edge atoms are not relaxed. Sphere sizes,
            assembly and expanded spacing aid inspection; they do not simulate
            atomic dynamics or electronic bands.
          </p>
        </div>
        <aside className="science-inspector">
          <h3>Inspect the structure</h3>
          {material === "mos2" ? (
            <div className="structure-controls">
              <div className="tabs" role="group" aria-label="Layer number">
                <button
                  type="button"
                  aria-pressed={layers === 1}
                  onClick={() => {
                    setLayers(1);
                    setOptions({ ...options, separation: 0 });
                  }}
                >
                  Monolayer
                </button>
                <button
                  type="button"
                  aria-pressed={layers === 2}
                  onClick={() => setLayers(2)}
                >
                  Bilayer
                </button>
              </div>
              {layers === 2 ? (
                <>
                  <label>
                    Stacking registry
                    <select
                      name="stacking-registry"
                      value={stacking}
                      onChange={(e) =>
                        setStacking(e.target.value as "2H" | "3R")
                      }
                    >
                      <option value="2H">2H · alternating orientation</option>
                      <option value="3R">3R · same orientation</option>
                    </select>
                  </label>
                  <label>
                    Expand sheet spacing
                    <input
                      type="range"
                      name="inspection-spacing"
                      min="0"
                      max="6"
                      step=".5"
                      value={options.separation}
                      onChange={(e) =>
                        setOptions({
                          ...options,
                          separation: Number(e.target.value),
                        })
                      }
                    />
                    <span className="text-xs">
                      {options.separation === 0
                        ? "Representative spacing"
                        : "Expanded for inspection"}
                    </span>
                  </label>
                </>
              ) : null}
              <label>
                <input
                  type="checkbox"
                  name="split-atomic-planes"
                  checked={options.exploded}
                  onChange={(e) =>
                    setOptions({ ...options, exploded: e.target.checked })
                  }
                />
                Separate S–Mo–S planes
              </label>
            </div>
          ) : null}
          <div className="science-parts">
            {kinds.map((kind) => (
              <div key={kind}>
                <button
                  type="button"
                  aria-pressed={options.selected === kind}
                  onClick={() => select(kind)}
                >
                  <i style={{ background: atomicColors[kind] }} />
                  {atomNames[kind]}
                </button>
                <label>
                  <input
                    type="checkbox"
                    name={"show-" + kind}
                    aria-label={"Show " + atomNames[kind]}
                    checked={!options.hidden.includes(kind)}
                    onChange={(e) =>
                      setOptions({
                        ...options,
                        hidden: e.target.checked
                          ? options.hidden.filter((id) => id !== kind)
                          : [...options.hidden, kind],
                      })
                    }
                  />
                </label>
              </div>
            ))}
          </div>
          <div className="science-selection" aria-live="polite">
            <h4>{atomNames[options.selected as AtomKind]}</h4>
            <p>
              {material === "graphene" && detail === "bond"
                ? "Two neighbouring carbon sites, separated by approximately 1.42 Å. This is a local bond from the graphene sheet, not an isolated C₂ molecule. The stick represents connectivity; it does not show an electron-density calculation."
                : material === "graphene" && detail === "coordination"
                  ? "An interior carbon has three nearest neighbours in one plane, with 120° bond angles. Rotate underneath to inspect the planar geometry. This is a local fragment of graphene; dangling edge bonds and electronic orbitals are not modeled."
                  : descriptions[options.selected as AtomKind]}
            </p>
          </div>
          <dl className="science-readouts">
            <div>
              <dt>In-plane lattice constant</dt>
              <dd>{material === "graphene" ? "2.46" : "3.16"} Å</dd>
            </div>
            <div>
              <dt>
                {material === "graphene" ? "C–C bond" : "Mo to S-plane height"}
              </dt>
              <dd>{material === "graphene" ? "≈ 1.42" : "1.56"} Å</dd>
            </div>
            <div>
              <dt>Primitive cell</dt>
              <dd>
                {material === "graphene" ? "2 C atoms" : "1 Mo + 2 S atoms"}
              </dd>
            </div>
          </dl>
          <p className="text-xs">
            Ideal geometry sources
            <ReferenceLink
              id={material === "graphene" ? "neto2009" : "ridolfi2015"}
              from="/lab"
            />
            {layers === 2 ? (
              <ReferenceLink id="polytypes2020" from="/lab" />
            ) : null}
            .
            {material === "mos2"
              ? " The 3R illustration holds spacing fixed to isolate registry. It is not a reconstruction of the engineered 2026 bilayer."
              : " Sphere radii are illustrative; bond lengths describe an ideal sheet."}
          </p>
        </aside>
      </div>
    </section>
  );
}
