"use client";
import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { deviceParts } from "@/data/device";
import { ScientificStage } from "./science/scientific-stage";
import { CameraControls } from "./science/camera-controls";
import {
  defaultCamera,
  type DeviceStructure,
  type SceneOptions,
} from "./science/types";
import { ReferenceLink } from "./reference-link";
import { ModelExplanation } from "./model-explanation";
import {
  changeDeviceStructure,
  deviceStructureFromHash,
  deviceStructures,
} from "@/lib/science/device-state";

// Architecture is display state: this spec stays fixed so one canvas owns the device.
const deviceSpec = { kind: "device", interface: false } as const;
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
  deviceStructure: "standard",
};
const interfacePart = {
  id: "interface",
  name: "Carbon-dot interface",
  color: "#80dedc",
  material: "Insulating carbon-dot assembly",
  role: "An insulating carbon-dot assembly sits between MoS₂ and HfO₂. Edge functional groups assist oxide nucleation. The reported interfacial layer is about 0.4–0.6 nm physically; this schematic exaggerates thickness and uses illustrative dot placement.",
  concept: "/discoveries/mos2-interface-breakthrough#breakthrough",
};
const structureNotes: Record<DeviceStructure, string> = {
  standard:
    "Standard: an ideal continuous gate dielectric, with no carbon-dot interlayer.",
  "without-carbon":
    "Research control: discontinuous oxide islands illustrate nucleation without the carbon-dot treatment in this study.",
  "with-carbon":
    "Research treatment: carbon dots assist a continuous oxide film above the MoS₂ channel.",
};

export function DeviceViewer({
  from = "/lab#transistor",
  heading = "MoS₂ transistor & interface engineering",
  description,
}: {
  from?: string;
  heading?: string;
  description?: string;
}) {
  const instanceId = useId();
  const headingId = instanceId + "-heading";
  const inspectorId = instanceId + "-inspector";
  const [options, setOptions] = useState(initialOptions);
  const [camera, setCamera] = useState({ ...defaultCamera, pitch: 30 });
  const structure = options.deviceStructure ?? "standard";
  const withInterface = structure === "with-carbon";
  const parts = [...deviceParts, ...(withInterface ? [interfacePart] : [])];
  const part =
    parts.find((p) => p.id === options.selected) ??
    deviceParts.find((p) => p.id === "channel")!;

  useEffect(() => {
    let lastUrl = "";
    function enter(hash: string) {
      const next = deviceStructureFromHash(hash);
      if (next) setOptions((current) => changeDeviceStructure(current, next));
    }
    function locationChanged() {
      if (window.location.href === lastUrl) return;
      lastUrl = window.location.href;
      enter(window.location.hash);
    }
    function linkedEntry(event: MouseEvent) {
      if (
        event.button !== 0 || event.ctrlKey || event.metaKey ||
        event.shiftKey || event.altKey
      ) return;
      const link =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>("a[href]")
          : null;
      if (
        !link || link.hasAttribute("download") ||
        (link.target && link.target !== "_self")
      ) return;
      const destination = new URL(link.href);
      // The fragment manager owns URL/history/scroll, including links that also change a query.
      if (
        destination.origin === window.location.origin &&
        destination.pathname === window.location.pathname
      )
        enter(destination.hash);
    }
    const frame = requestAnimationFrame(locationChanged);
    window.addEventListener("hashchange", locationChanged);
    window.addEventListener("popstate", locationChanged);
    document.addEventListener("click", linkedEntry, true);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", locationChanged);
      window.removeEventListener("popstate", locationChanged);
      document.removeEventListener("click", linkedEntry, true);
    };
  }, []);

  function select(id: string) {
    setOptions((current) => ({
      ...current,
      selected: id,
      hidden: current.hidden.filter((key) => key !== id),
    }));
  }
  function reset() {
    setCamera((current) => ({
      ...defaultCamera,
      pitch: 30,
      revision: current.revision + 1,
    }));
    setOptions(initialOptions);
  }
  return (
    <div
      className="science-workbench device-instrument"
      data-device-structure={structure}
    >
      <section className="science-stage" aria-labelledby={headingId}>
        <div className="workbench-heading">
          <div>
            <h2 id={headingId}>{heading}</h2>
            {description ? <p className="text-sm">{description}</p> : null}
          </div>
        </div>
        <div className="device-state-controls">
          <fieldset>
            <legend>Channel state</legend>
            <div
              className="tabs"
              role="group"
              aria-label="Conceptual channel state"
            >
              {([false, true] as const).map((on) => (
                <button
                  key={String(on)}
                  type="button"
                  aria-pressed={options.on === on}
                  onClick={() => setOptions((current) => ({ ...current, on }))}
                >
                  {on ? "ON" : "OFF"}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>Structure</legend>
            <div className="tabs" role="group" aria-label="Transistor structure">
              {deviceStructures.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={structure === value}
                  onClick={() =>
                    setOptions((current) => changeDeviceStructure(current, value))
                  }
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>
        </div>
        <div className="stage-meta">
          <span>
            {withInterface
              ? "MoS₂ / carbon dots / HfO₂"
              : "MoS₂ / HfO₂ gate stack"}
          </span>
          <span>Conceptual · not to scale</span>
        </div>
        <ScientificStage
          spec={deviceSpec}
          options={options}
          camera={camera}
          onSelect={select}
          onCameraChange={setCamera}
        />
        <div className="stage-caption">
          <span>360° orbit · drag / pinch to inspect every side</span>
          <span>Arrows and +/− work on the focused model.</span>
        </div>
        <CameraControls
          camera={camera}
          label={heading}
          update={setCamera}
          reset={reset}
          focus={() =>
            setCamera((current) => ({
              ...current,
              revision: current.revision + 1,
              focus: options.selected,
            }))
          }
        />
        <div className="science-options">
          <label>
            <input
              type="checkbox"
              name={instanceId + "-exploded-view"}
              checked={options.exploded}
              onChange={(event) =>
                setOptions({ ...options, exploded: event.target.checked })
              }
            />
            Exploded view
          </label>
          <label>
            <input
              type="checkbox"
              name={instanceId + "-layer-labels"}
              checked={options.labels}
              onChange={(event) =>
                setOptions({ ...options, labels: event.target.checked })
              }
            />
            Selection label
          </label>
          <label className="touch-orbit">
            <input
              type="checkbox"
              name={instanceId + "-device-touch-orbit"}
              checked={options.touchOrbit}
              onChange={(event) =>
                setOptions({ ...options, touchOrbit: event.target.checked })
              }
            />
            One-finger orbit
          </label>
        </div>
        <p
          className="science-boundary"
          aria-live="polite"
          data-device-state={options.on ? "on" : "off"}
        >
          <strong>
            {options.on
              ? "ON: gate-induced channel charge is illustrated."
              : "OFF: reduced channel charge is illustrated."}
          </strong>{" "}
          No current is calculated. {structureNotes[structure]}
          {structure !== "standard" ? <ReferenceLink id="wong2026" from={from} /> : null}
        </p>
        <p className="text-xs">
          Reset restores Standard, OFF, all layers and the initial camera.
        </p>
        {parts.every((item) => options.hidden.includes(item.id)) ? (
          <p role="status" className="notice">
            All layers are hidden. Select a component or reset the model to restore it.
          </p>
        ) : null}
      </section>
      <aside className="science-inspector" aria-labelledby={inspectorId}>
        <h3 id={inspectorId}>Device components</h3>
        <p className="text-xs">
          Select a component to inspect it. Checkboxes control visibility.
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
                  name={instanceId + "-show-" + item.id}
                  type="checkbox"
                  aria-label={"Show " + item.name}
                  checked={!options.hidden.includes(item.id)}
                  onChange={(event) =>
                    setOptions({
                      ...options,
                      hidden: event.target.checked
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
          <p className="device-material">
            <span>{part.id === "interface" ? "Interface material" : "Material example"}</span>
            <strong>{part.material}</strong>
            <ReferenceLink
              id={part.id === "interface" ? "wong2026" : "radis2011"}
              from={from}
            />
          </p>
          <p>{part.role.split(". ")[0]}.</p>
          <Link className="text-link" href={part.concept}>
            Understand{" "}
            {part.id === "interface"
              ? "carbon-dot interface engineering"
              : part.id === "channel"
                ? "MoS₂ channel properties"
                : "this component’s role"}
          </Link>
        </section>
        <ModelExplanation
          title="Materials, scale & model limits"
          label="Transistor and interface scientific explanation"
        >
          <h4>{part.name}: role in the device</h4>
          <p>{part.role}</p>
          <h4>Gate control and ON/OFF</h4>
          <p>
            The source supplies carriers and the drain collects them. A gate field
            couples through insulating HfO₂ to change charge in the MoS₂ channel;
            the SiO₂/Si stack supports it. ON/OFF changes only an illustrative
            channel glow, without solving fields or calculating current. The
            simulator treats numerical I–V response separately.
            <ReferenceLink id="radis2011" from={from} />
          </p>
          <h4>Three structural states</h4>
          <p>
            Standard shows an ideal continuous dielectric without a carbon-dot
            interlayer. Without carbon dots shows discontinuous oxide islands as
            a conceptual control for the selected 2026 interface study; it does
            not describe every untreated transistor. With carbon dots inserts an
            insulating assembly that assists oxide nucleation, illustrating a
            continuous HfO₂ film. The dots are not a conductive graphene channel.
            <ReferenceLink id="wong2026" from={from} />
          </p>
          <h4>Scale and assumptions</h4>
          <p>
            Support and metal examples follow the 2011 MoS₂ device. The optional
            interface illustrates a separate study, not a reconstruction of the
            same measured device. Colours, transparency, lead shapes, enlarged
            S–Mo–S atoms and exaggerated thicknesses aid inspection. Dot positions
            and oxide islands are illustrative, not microscopy, measured
            roughness or a fitted distribution. This model predicts neither
            current nor performance improvement.
            <ReferenceLink id="ridolfi2015" from={from} />
          </p>
          <p>
            <Link className="text-link" href="/device#working-principle">
              Understand transistor operation
            </Link>{" · "}
            <Link className="text-link" href="/discoveries/mos2-interface-breakthrough#breakthrough">
              Read the interface study
            </Link>
          </p>
        </ModelExplanation>
      </aside>
    </div>
  );
}
