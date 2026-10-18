import type {
  DeviceStructure,
  SceneOptions,
} from "../../components/science/types";

export const deviceStructures: { value: DeviceStructure; label: string }[] = [
  { value: "standard", label: "Standard" },
  { value: "without-carbon", label: "Without carbon dots" },
  { value: "with-carbon", label: "With carbon dots" },
];

export function deviceStructureFromHash(hash: string): DeviceStructure | null {
  let id: string;
  try {
    id = decodeURIComponent(hash.replace(/^#/, ""));
  } catch {
    return null;
  }
  if (id === "transistor" || id === "interactive-device") return "standard";
  if (id === "interface-engineering" || id === "interactive-stack")
    return "with-carbon";
  return null;
}

export function changeDeviceStructure(
  options: SceneOptions,
  structure: DeviceStructure,
): SceneOptions {
  if (options.deviceStructure === structure) return options;
  return {
    ...options,
    deviceStructure: structure,
    selected:
      structure !== "with-carbon" && options.selected === "interface"
        ? "dielectric"
        : options.selected,
    hidden:
      structure === "with-carbon"
        ? options.hidden
        : options.hidden.filter((id) => id !== "interface"),
  };
}

export function deviceStructureForScene(
  spec: { interface: boolean; roughOxide?: boolean },
  options?: Pick<SceneOptions, "deviceStructure">,
): DeviceStructure {
  return (
    options?.deviceStructure ??
    (spec.interface
      ? "with-carbon"
      : spec.roughOxide
        ? "without-carbon"
        : "standard")
  );
}
