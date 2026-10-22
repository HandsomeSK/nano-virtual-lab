"use client";
import { useId, useState } from "react";
import {
  atomicColors,
  type AtomicMaterial,
  type AtomKind,
} from "@/lib/science/atomic-structure";
import { ScientificStage } from "./scientific-stage";
import { CameraControls } from "./camera-controls";
import { atomNames, defaultCamera, type SceneOptions } from "./types";
import { ReferenceLink } from "@/components/reference-link";
import { ModelExplanation } from "@/components/model-explanation";
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
    "Each interior carbon bonds to three nearest neighbours in the flat honeycomb sheet.",
  molybdenum:
    "Each interior molybdenum sits between six sulfur neighbours in a trigonal prism.",
  "sulfur-top":
    "Each interior sulfur has three nearest molybdenum neighbours. The upper sulfur plane forms the top face of the same S–Mo–S sheet.",
  "sulfur-bottom":
    "Each interior sulfur has three nearest molybdenum neighbours. The lower sulfur plane completes the same monolayer beneath the molybdenum plane.",
};
export function AtomicWorkbench({
  initialMaterial = "graphene",
  fixedMaterial = false,
  syncUrl = false,
  heading,
  description,
}: {
  initialMaterial?: AtomicMaterial;
  fixedMaterial?: boolean;
  syncUrl?: boolean;
  heading?: string;
  description?: string;
}) {
  const instanceId = useId();
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
  const title =
    heading ??
    (material === "graphene"
      ? "A single carbon sheet"
      : "One sheet. Three atomic planes");
  const from = `/lab#${material}`;
  const select = (id: string) =>
    setOptions((p) => ({
      ...p,
      selected: id,
      hidden: p.hidden.filter((k) => k !== id),
    }));
  function reset() {
    setDetail("lattice");
    setLayers(1);
    setStacking("2H");
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
      history.replaceState(history.state, "", url);
    }
  }
  return (
    <section
      className="atomic-workbench"
      aria-labelledby={`${instanceId}-heading`}
    >
      <div className="workbench-heading">
        <div>
          <h2 id={`${instanceId}-heading`}>{title}</h2>
          {description ? <p>{description}</p> : null}
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
            label={`${title} camera`}
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
          <div
            className="science-options"
            role="group"
            aria-label={`${title} options`}
          >
            {material === "graphene" ? (
              <div className="tabs" role="group" aria-label={`${title} detail`}>
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
            <label htmlFor={`${instanceId}-unit-cell`}>
              <input
                id={`${instanceId}-unit-cell`}
                type="checkbox"
                name={`${instanceId}-unit-cell`}
                checked={options.unitCell}
                disabled={material === "graphene" && detail !== "lattice"}
                onChange={(e) =>
                  setOptions({ ...options, unitCell: e.target.checked })
                }
              />
              Primitive cell
            </label>
            <label htmlFor={`${instanceId}-atom-labels`}>
              <input
                id={`${instanceId}-atom-labels`}
                type="checkbox"
                name={`${instanceId}-atom-labels`}
                checked={options.labels}
                onChange={(e) =>
                  setOptions({ ...options, labels: e.target.checked })
                }
              />
              Selection label
            </label>
            <label className="touch-orbit" htmlFor={`${instanceId}-touch-orbit`}>
              <input
                id={`${instanceId}-touch-orbit`}
                type="checkbox"
                name={`${instanceId}-touch-orbit`}
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
            Ideal geometry in Å; sphere sizes and expanded spacing are
            illustrative, not an atomic dynamics or electronic band calculation.
          </p>
        </div>
        <aside
          className="science-inspector"
          aria-labelledby={`${instanceId}-heading ${instanceId}-inspector`}
        >
          <h3 id={`${instanceId}-inspector`}>Inspect the structure</h3>
          {material === "mos2" ? (
            <div className="structure-controls">
              <div className="tabs" role="group" aria-label={`${title} layer number`}>
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
                  <label htmlFor={`${instanceId}-stacking-registry`}>
                    Stacking registry
                    <select
                      id={`${instanceId}-stacking-registry`}
                      name={`${instanceId}-stacking-registry`}
                      value={stacking}
                      onChange={(e) =>
                        setStacking(e.target.value as "2H" | "3R")
                      }
                    >
                      <option value="2H">2H · alternating orientation</option>
                      <option value="3R">3R · same orientation</option>
                    </select>
                  </label>
                  <label htmlFor={`${instanceId}-inspection-spacing`}>
                    Expand sheet spacing
                    <input
                      id={`${instanceId}-inspection-spacing`}
                      type="range"
                      name={`${instanceId}-inspection-spacing`}
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
              <label htmlFor={`${instanceId}-split-atomic-planes`}>
                <input
                  id={`${instanceId}-split-atomic-planes`}
                  type="checkbox"
                  name={`${instanceId}-split-atomic-planes`}
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
                <label htmlFor={`${instanceId}-show-${kind}`}>
                  <input
                    id={`${instanceId}-show-${kind}`}
                    type="checkbox"
                    name={`${instanceId}-show-${kind}`}
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
            <p className="text-xs">
              {material === "graphene"
                ? "Carbon · graphene sheet"
                : options.selected === "molybdenum"
                  ? "Molybdenum · MoS₂ sheet"
                  : "Sulfur · MoS₂ sheet"}
            </p>
            <p>
              {material === "graphene" && detail === "bond"
                ? "Two neighbouring carbon sites share a C–C bond of approximately 1.42 Å."
                : material === "graphene" && detail === "coordination"
                  ? "Three nearest carbon neighbours lie in one plane, with 120° bond angles."
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
                {material === "graphene" ? "C–C bond" : "Nearest Mo–S bond"}
              </dt>
              <dd>{material === "graphene" ? "≈ 1.42" : "≈ 2.40"} Å</dd>
            </div>
            {material === "mos2" ? (
              <>
                <div>
                  <dt>Unexpanded S-plane span</dt>
                  <dd>3.12 Å</dd>
                </div>
                {layers === 2 ? (
                  <div>
                    <dt>Adjacent Mo-plane spacing</dt>
                    <dd>
                      {options.separation === 0
                        ? "6.15 Å"
                        : "Expanded for inspection"}
                    </dd>
                  </div>
                ) : null}
              </>
            ) : null}
            <div>
              <dt>Primitive cell</dt>
              <dd>
                {material === "graphene" ? "2 C atoms" : "1 Mo + 2 S atoms"}
              </dd>
            </div>
          </dl>
          <ModelExplanation
            title="Structure, scale & model limits"
            label={`${material === "graphene" ? "Graphene" : "MoS₂"} scientific explanation`}
          >
            {material === "graphene" ? (
              <>
                <h4>Honeycomb lattice & carbon bonds</h4>
                <p>
                  Graphene is a single planar carbon sheet. Each interior carbon
                  has three nearest neighbours, with approximately 120° between
                  bonds. The C–C bond is about 1.42 Å; the in-plane lattice
                  constant is 2.46 Å. The two distances describe different parts
                  of the same lattice.
                  <ReferenceLink id="neto2009" from={from} />
                </p>
                <h4>Primitive cell & local views</h4>
                <p>
                  Two carbon sites form a primitive cell; the honeycomb is a
                  triangular Bravais lattice with this two-atom basis. Enable
                  Primitive cell to inspect it. C–C bond and Three neighbours
                  isolate local geometry from the sheet, rather than an isolated
                  C₂ molecule or a separate material.
                </p>
                <h4>What the model represents</h4>
                <p>
                  Sticks show connectivity, not electron density or orbitals.
                  This finite, ideal fragment leaves edge atoms unrelaxed and
                  omits dangling-bond chemistry. Sphere radii and assembly motion
                  aid inspection; no atomic dynamics, scattering, band structure
                  or transport is calculated.
                </p>
              </>
            ) : (
              <>
                <h4>One S–Mo–S sheet</h4>
                <p>
                  A 1H monolayer has one molybdenum plane between two sulfur
                  planes, not three monolayers. Upper and lower sulfur sites
                  share an in-plane registry. Each interior Mo has six nearest S
                  neighbours in trigonal-prismatic coordination, rather than an
                  octahedron; each interior S has three nearest Mo neighbours.
                  <ReferenceLink id="ridolfi2015" from={from} />
                </p>
                <h4>Bilayers, stacking & interlayer interactions</h4>
                <p>
                  Bilayer adds a second S–Mo–S sheet. The 2H registry alternates
                  sheet orientation; 3R preserves orientation with an in-plane
                  shift. The bulk polytypes repeat after two and three sheets,
                  respectively; this two-sheet view shows local registry, not a
                  complete bulk 3R repeat. Both retain trigonal-prismatic Mo
                  coordination. An ideal 1T sheet instead has octahedral
                  coordination and is not represented by these controls.
                  These controls show ideal registry, not a relaxed
                  reconstruction. Separate S–Mo–S planes and Expand sheet spacing
                  exaggerate distances for inspection. Between sheets, van der
                  Waals interactions matter; no interlayer covalent bonds are
                  drawn.
                  <ReferenceLink id="polytypes2020" from={from} />
                </p>
                <h4>Dimensions & model limits</h4>
                <p>
                  The in-plane lattice constant is 3.16 Å. Each S plane is
                  1.56 Å from Mo, giving an S-to-S vertical separation of 3.12 Å
                  and a nearest Mo–S distance of about 2.40 Å. A primitive
                  monolayer cell contains one Mo and two S atoms.
                  <ReferenceLink id="ridolfi2015" from={from} />
                </p>
                <p>
                  Adjacent Mo planes are 6.15 Å apart in the representative
                  unexpanded bilayer. This repeat distance includes one sheet
                  and the intersheet gap; it is not the empty van der Waals gap.
                  The approximately 0.65 nm (6.5 Å) nominal layer thickness
                  quoted for transistor channels is not the 3.12 Å outer S-plane
                  separation or an exact bulk repeat. An AFM apparent step height
                  also depends on the sample and
                  measurement conditions.
                  <ReferenceLink id="radis2011" from={from} />
                </p>
                <p>
                  The 3R illustration holds spacing fixed to isolate registry and does
                  not reconstruct the engineered 2026 bilayer. Sphere radii,
                  expanded distances and assembly motion are illustrative; the
                  finite edges are unrelaxed. Electronic bands, excitons and
                  transport are not calculated.
                  <ReferenceLink id="polytypes2020" from={from} />
                </p>
              </>
            )}
          </ModelExplanation>
        </aside>
      </div>
    </section>
  );
}
