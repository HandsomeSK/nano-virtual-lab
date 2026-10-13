import type { AtomicMaterial, AtomKind } from "@/lib/science/atomic-structure";
export type CameraView = {
  yaw: number;
  pitch: number;
  zoom: number;
  revision: number;
  focus?: string;
};
export const defaultCamera: CameraView = {
  yaw: -28,
  pitch: 52,
  zoom: 1,
  revision: 0,
};
export type AtomicSpec = {
  kind: "atomic";
  material: AtomicMaterial;
  layers: 1 | 2;
  stacking: "2H" | "3R";
  detail?: "lattice" | "bond" | "coordination";
};
export type DeviceSpec = {
  kind: "device";
  interface: boolean;
  roughOxide?: boolean;
};
export type SceneSpec = AtomicSpec | DeviceSpec;
export type SceneOptions = {
  selected: string;
  hidden: string[];
  exploded: boolean;
  separation: number;
  unitCell: boolean;
  labels: boolean;
  on: boolean;
  assembly: number;
  touchOrbit: boolean;
};
export type SceneProps = {
  spec: SceneSpec;
  options: SceneOptions;
  camera: CameraView;
  onSelect: (id: string) => void;
  onCameraChange: (view: CameraView) => void;
};
export const atomNames: Record<AtomKind, string> = {
  carbon: "Carbon",
  molybdenum: "Molybdenum",
  "sulfur-top": "Upper sulfur",
  "sulfur-bottom": "Lower sulfur",
};
