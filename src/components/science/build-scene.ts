import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import {
  createAtomicStructure,
  atomicColors,
  type Atom,
} from "@/lib/science/atomic-structure";
import { deviceParts } from "@/data/device";
import type { SceneSpec, SceneOptions } from "./types";
export type DisplayState = {
  explosion: number;
  separation: number;
  assembly: number;
};
type Unit = {
  id: string;
  group: THREE.Group;
  baseY: number;
  rank: number;
  material: THREE.MeshPhysicalMaterial;
  atoms?: Atom[];
};
export function buildScientificModel(spec: SceneSpec) {
  const root = new THREE.Group();
  const units: Unit[] = [];
  const pickables: THREE.Object3D[] = [];
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const sphere = new THREE.SphereGeometry(1, 32, 24);
  const cylinder = new THREE.CylinderGeometry(1, 1, 1, 14, 1);
  const slab = new RoundedBoxGeometry(1, 1, 1, 2, 0.035);
  [sphere, cylinder, slab].forEach((g) => geometries.add(g));
  function physical(color: string, metalness = 0.25, roughness = 0.32) {
    const m = new THREE.MeshPhysicalMaterial({
      color,
      metalness,
      roughness,
      clearcoat: 0.45,
      clearcoatRoughness: 0.23,
    });
    materials.add(m);
    return m;
  }
  const matrix = new THREE.Matrix4(),
    quaternion = new THREE.Quaternion(),
    position = new THREE.Vector3(),
    scale = new THREE.Vector3();
  let cell: THREE.Line | undefined;
  let atomicBonds: THREE.InstancedMesh | undefined;
  let structure: ReturnType<typeof createAtomicStructure> | undefined;
  if (spec.kind === "atomic") {
    structure = createAtomicStructure(
      spec.material,
      spec.layers,
      spec.stacking,
    );
    const sets = new Map<string, Atom[]>();
    structure.atoms.forEach((atom) => {
      const key = atom.kind + ":" + atom.layer;
      const list = sets.get(key) ?? [];
      list.push(atom);
      sets.set(key, list);
    });
    for (const atoms of sets.values()) {
      const atom = atoms[0],
        group = new THREE.Group();
      const mat = physical(
        atomicColors[atom.kind],
        atom.element === "Mo" ? 0.48 : 0.24,
      );
      const mesh = new THREE.InstancedMesh(sphere, mat, atoms.length);
      mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      mesh.userData.part = atom.kind;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      group.add(mesh);
      root.add(group);
      pickables.push(mesh);
      units.push({
        id: atom.kind,
        group,
        baseY: 0,
        rank: atom.layer,
        material: mat,
        atoms,
      });
    }
    atomicBonds = new THREE.InstancedMesh(
      cylinder,
      physical("#657381", 0.3, 0.45),
      structure.bonds.length,
    );
    atomicBonds.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    root.add(atomicBonds);
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(
      structure.unitCell.map((p) => new THREE.Vector3(...p)),
    );
    const lineMaterial = new THREE.LineBasicMaterial({
      color: "#ffffff",
      depthTest: false,
      transparent: true,
      opacity: 0.8,
    });
    geometries.add(lineGeometry);
    materials.add(lineMaterial);
    cell = new THREE.Line(lineGeometry, lineMaterial);
    cell.renderOrder = 5;
    root.add(cell);
  } else {
    const parts = [
      ...deviceParts,
      ...(spec.interface
        ? [
            {
              id: "interface",
              name: "Carbon-dot interface",
              color: "#80dedc",
              x: 110,
              y: 50,
              z: 31,
              w: 180,
              d: 140,
              h: 4,
            },
          ]
        : []),
    ];
    for (const part of parts) {
      const group = new THREE.Group();
      const mat = physical(
        part.id === "substrate" ? "#373f4a" : part.color,
        ["gate", "source", "drain"].includes(part.id) ? 0.8 : 0.2,
        part.id === "gate" ? 0.23 : 0.38,
      );
      if (part.id === "dielectric") {
        mat.transparent = true;
        mat.opacity = 0.73;
        mat.depthWrite = false;
      }
      const mesh = new THREE.Mesh(slab, mat);
      mesh.scale.set(part.w / 50, part.h / 50, part.d / 50);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData.part = part.id;
      if (part.id === "dielectric" && spec.roughOxide) {
        mesh.visible = false;
        const islands = new THREE.InstancedMesh(slab, mat, 9);
        for (let i = 0; i < 9; i++) {
          matrix.compose(
            new THREE.Vector3(
              ((i % 3) - 1) * 1.1,
              0,
              (Math.floor(i / 3) - 1) * 0.87,
            ),
            new THREE.Quaternion(),
            new THREE.Vector3(
              i % 2 ? 0.76 : 0.9,
              0.2 + (i % 3) * 0.025,
              i % 2 ? 0.58 : 0.72,
            ),
          );
          islands.setMatrixAt(i, matrix);
        }
        islands.userData.part = part.id;
        islands.castShadow = true;
        group.add(islands);
        pickables.push(islands);
      }
      const offset =
        spec.interface && (part.id === "dielectric" || part.id === "gate")
          ? 4
          : 0;
      group.position.set(
        (part.x + part.w / 2 - 200) / 50,
        (part.z + part.h / 2 + offset) / 50 - 1,
        (part.y + part.d / 2 - 120) / 50,
      );
      group.add(mesh);
      root.add(group);
      if (mesh.visible) pickables.push(mesh);
      const rank = (
        {
          substrate: 0,
          channel: 1,
          source: 2,
          drain: 2,
          interface: 3,
          dielectric: 4,
          gate: 5,
        } as Record<string, number>
      )[part.id];
      units.push({
        id: part.id,
        group,
        baseY: group.position.y,
        rank,
        material: mat,
      });
      if (part.id === "interface") {
        // Original qualitative dots: illustrative placement, not microscopy or
        // a fitted distribution. The assembly is insulating, not a graphene channel.
        const dots = new THREE.InstancedMesh(sphere, mat, 60);
        for (let i = 0; i < 60; i++) {
          matrix.compose(
            new THREE.Vector3(
              ((i % 10) - 4.5) * 0.34,
              0.05,
              (Math.floor(i / 10) - 2.5) * 0.42,
            ),
            new THREE.Quaternion(),
            new THREE.Vector3(0.14, 0.035, 0.14),
          );
          dots.setMatrixAt(i, matrix);
        }
        dots.userData.part = part.id;
        group.add(dots);
        pickables.push(dots);
      }
    }
  }
  let previousUpdate = "";
  function update(options: SceneOptions, state: DisplayState) {
    const signature = [
      options.selected,
      options.hidden.join(","),
      options.on,
      options.unitCell,
      state.explosion,
      state.separation,
      state.assembly,
    ].join("|");
    if (signature === previousUpdate) return;
    previousUpdate = signature;
    for (const unit of units) {
      unit.group.visible = !options.hidden.includes(unit.id);
      unit.material.emissive.set(
        unit.id === options.selected ? "#5a7b85" : "#000000",
      );
      unit.material.emissiveIntensity = unit.id === options.selected ? 0.18 : 0;
      if (spec.kind === "device") {
        unit.group.position.y = unit.baseY + state.explosion * unit.rank * 0.75;
        if (unit.id === "channel")
          unit.material.color.set(options.on ? "#80dedc" : "#8b5cf6");
      } else {
        const sheetOffset =
          spec.layers === 2
            ? ((unit.rank === 0 ? -1 : 1) * state.separation) / 2
            : 0;
        const planeOffset =
          unit.id === "sulfur-top"
            ? 1.7
            : unit.id === "sulfur-bottom"
              ? -1.7
              : 0;
        unit.group.position.y = sheetOffset + planeOffset * state.explosion;
        const mesh = unit.group.children[0] as THREE.InstancedMesh;
        unit.atoms!.forEach((atom, i) => {
          const reveal = Math.max(
            0.001,
            Math.min(1, state.assembly * 1.4 - (i / unit.atoms!.length) * 0.4),
          );
          const radius =
            (atom.element === "C"
              ? 0.42
              : atom.element === "Mo"
                ? 0.61
                : 0.53) * reveal;
          position.set(...atom.position);
          quaternion.identity();
          scale.set(radius, radius, radius);
          matrix.compose(position, quaternion, scale);
          mesh.setMatrixAt(i, matrix);
        });
        mesh.instanceMatrix.needsUpdate = true;
        if (!mesh.boundingSphere) mesh.computeBoundingSphere();
      }
    }
    if (atomicBonds && structure && spec.kind === "atomic") {
      atomicBonds.visible = state.explosion < 0.03;
      structure.bonds.forEach((bond, i) => {
        const a = structure!.atoms[bond.a],
          b = structure!.atoms[bond.b];
        const visible =
          !options.hidden.includes(a.kind) && !options.hidden.includes(b.kind);
        const first = new THREE.Vector3(...a.position),
          second = new THREE.Vector3(...b.position);
        const offset =
          spec.layers === 2
            ? ((a.layer === 0 ? -1 : 1) * state.separation) / 2
            : 0;
        position.copy(first).add(second).multiplyScalar(0.5);
        position.y += offset;
        quaternion.setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          second.clone().sub(first).normalize(),
        );
        const reveal = Math.max(
          0.001,
          Math.min(
            1,
            state.assembly * 1.4 - (i / structure!.bonds.length) * 0.4,
          ),
        );
        scale.set(
          visible ? 0.065 * reveal : 0,
          first.distanceTo(second) * reveal,
          visible ? 0.065 * reveal : 0,
        );
        matrix.compose(position, quaternion, scale);
        atomicBonds!.setMatrixAt(i, matrix);
      });
      atomicBonds.instanceMatrix.needsUpdate = true;
      if (!atomicBonds.boundingSphere) atomicBonds.computeBoundingSphere();
    }
    if (cell) cell.visible = options.unitCell && spec.kind === "atomic";
  }
  function center(id: string) {
    const matches = units.filter(
      (unit) => unit.id === id && unit.group.visible,
    );
    if (!matches.length) return new THREE.Vector3();
    const point = new THREE.Vector3();
    matches.forEach((unit) => {
      if (unit.atoms) {
        const average = unit.atoms
          .reduce(
            (p, a) => p.add(new THREE.Vector3(...a.position)),
            new THREE.Vector3(),
          )
          .divideScalar(unit.atoms.length);
        point.add(unit.group.localToWorld(average));
      } else point.add(unit.group.getWorldPosition(new THREE.Vector3()));
    });
    return point.divideScalar(matches.length);
  }
  return {
    root,
    pickables,
    update,
    center,
    atomCount: structure?.atoms.length ?? 0,
    bondCount: structure?.bonds.length ?? 0,
    dispose() {
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      root.clear();
    },
  };
}
