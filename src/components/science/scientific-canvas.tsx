"use client";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { animate, type JSAnimation } from "animejs";
import { useEffect, useId, useRef, useState } from "react";
import { buildScientificModel, type DisplayState } from "./build-scene";
import { SceneFallback } from "./scene-fallback";
import { atomNames, type SceneProps, type CameraView } from "./types";
import { deviceParts } from "@/data/device";
type Runtime = {
  options: (p: SceneProps) => void;
  camera: (v: CameraView) => void;
};
export default function ScientificCanvas(props: SceneProps) {
  const instructionsId = useId();
  const host = useRef<HTMLDivElement>(null),
    annotation = useRef<HTMLSpanElement>(null);
  const latest = useRef(props),
    runtime = useRef<Runtime | null>(null);
  const [fault, setFault] = useState<string | null>(null);
  useEffect(() => {
    latest.current = props;
    runtime.current?.options(props);
  }, [props]);
  const specKey = JSON.stringify(props.spec);
  useEffect(() => {
    if (fault || !host.current) return;
    const container = host.current,
      spec = JSON.parse(specKey) as SceneProps["spec"];
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: "low-power",
      });
    } catch {
      const errorFrame = requestAnimationFrame(() =>
        setFault(
          "WebGL is unavailable. Enable hardware acceleration and reload, or explore the static structure and descriptions.",
        ),
      );
      return () => cancelAnimationFrame(errorFrame);
    }
    const pixelRatio = () =>
      Math.min(
        window.devicePixelRatio || 1,
        matchMedia("(max-width:600px)").matches ? 1.5 : 2,
      );
    renderer.setPixelRatio(pixelRatio());
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#1b2b40");
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 500);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = false;
    controls.enablePan = false;
    controls.minPolarAngle = 0.01;
    controls.maxPolarAngle = Math.PI - 0.01;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const model = buildScientificModel(spec);
    const state: DisplayState = {
      explosion: latest.current.options.exploded ? 1 : 0,
      separation: latest.current.options.separation,
      assembly: 1,
    };
    model.update(latest.current.options, state);
    scene.add(model.root);
    const bounds = new THREE.Box3()
      .setFromObject(model.root)
      .getBoundingSphere(new THREE.Sphere());
    let explodedBounds = bounds;
    if (spec.kind === "device") {
      model.update(
        { ...latest.current.options, hidden: [] },
        { ...state, explosion: 1 },
      );
      explodedBounds = new THREE.Box3()
        .setFromObject(model.root)
        .getBoundingSphere(new THREE.Sphere());
      model.update(latest.current.options, state);
    }
    const activeBounds = () =>
      latest.current.options.exploded ? explodedBounds : bounds;
    const fitDistance = () =>
      Math.max(
        spec.kind === "atomic" && (!spec.detail || spec.detail === "lattice")
          ? 20
          : 3,
        (activeBounds().radius *
          (spec.kind === "device" && latest.current.options.exploded
            ? 3.25
            : 2.3)) /
          Math.min(1, container.clientWidth / container.clientHeight / 1.5),
      );
    let distance = fitDistance();
    controls.minDistance = distance / 1.8;
    controls.maxDistance = distance / 0.5;
    const ambient = new THREE.AmbientLight("#d6e3f2", 0.65);
    scene.add(ambient);
    const key = new THREE.DirectionalLight("#ffffff", 2.8);
    key.position.set(-9, 20, 13);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.left = -20;
    key.shadow.camera.right = 20;
    key.shadow.camera.top = 20;
    key.shadow.camera.bottom = -20;
    key.shadow.normalBias = 0.025;
    scene.add(key);
    const rim = new THREE.DirectionalLight("#82dce6", 2);
    rim.position.set(15, 8, -12);
    scene.add(rim);
    const fill = new THREE.DirectionalLight("#b6a7e8", 1.2);
    fill.position.set(-12, 3, -15);
    scene.add(fill);
    const pmrem = new THREE.PMREMGenerator(renderer),
      room = new RoomEnvironment();
    const environment = pmrem.fromScene(room, 0.04);
    scene.environment = environment.texture;
    scene.environmentIntensity = 0.45;
    room.dispose();
    pmrem.dispose();
    const floorGeometry = new THREE.PlaneGeometry(100, 100),
      floorMaterial = new THREE.ShadowMaterial({
        color: "#000000",
        opacity: 0.3,
      });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = bounds.center.y - bounds.radius * 0.45 - 2;
    floor.receiveShadow = true;
    scene.add(floor);
    const canvas = renderer.domElement;
    canvas.setAttribute(
      "aria-label",
      "Interactive " +
        (spec.kind === "atomic"
          ? spec.material + " atomic structure"
          : spec.interface || spec.roughOxide
            ? "interface engineering comparison"
            : "MoS₂ transistor"),
    );
    canvas.setAttribute("aria-describedby", instructionsId);
    canvas.setAttribute("role", "img");
    canvas.tabIndex = 0;
    container.prepend(canvas);
    container.dataset.webgl = "ready";
    container.dataset.dpr = String(pixelRatio());
    container.dataset.atoms = String(model.atomCount);
    container.dataset.bonds = String(model.bondCount);
    let frame = 0,
      disposed = false,
      visible = typeof IntersectionObserver === "undefined",
      frames = 0;
    const animations = new Map<string, JSAnimation>();
    function invalidate() {
      if (disposed || frame || !visible || document.hidden) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (disposed || !visible || document.hidden) return;
        try {
          model.update(latest.current.options, state);
          floor.visible =
            spec.kind === "device" && camera.position.y > floor.position.y;
          renderer.render(scene, camera);
          container.dataset.pitch = String(
            THREE.MathUtils.radToDeg(
              Math.asin(
                camera.position.clone().sub(controls.target).normalize().y,
              ),
            ),
          );
          container.dataset.yaw = String(
            THREE.MathUtils.radToDeg(
              Math.atan2(
                camera.position.x - controls.target.x,
                camera.position.z - controls.target.z,
              ),
            ),
          );
          container.dataset.frames = String(++frames);
          if (annotation.current) {
            const point = model
              .center(latest.current.options.selected)
              .project(camera);
            annotation.current.style.left =
              ((point.x + 1) * container.clientWidth) / 2 + "px";
            annotation.current.style.top =
              ((1 - point.y) * container.clientHeight) / 2 + "px";
            annotation.current.style.visibility =
              point.z < 1 &&
              latest.current.options.labels &&
              !latest.current.options.hidden.includes(
                latest.current.options.selected,
              )
                ? "visible"
                : "hidden";
          }
        } catch {
          setFault(
            "The 3D renderer stopped. Reload to retry, or use the static structure and layer descriptions.",
          );
        }
      });
    }
    function transition(
      name: string,
      target: object,
      values: Record<string, number>,
      duration = 700,
    ) {
      animations.get(name)?.cancel();
      animations.delete(name);
      if (reduced.matches) {
        Object.assign(target, values);
        invalidate();
        return;
      }
      const animation = animate(target, {
        ...values,
        duration,
        ease: "outCubic",
        onUpdate: invalidate,
        onComplete: () => {
          animations.delete(name);
          invalidate();
        },
      });
      animations.set(name, animation);
      if (!visible || document.hidden) animation.pause();
    }
    function move(view: CameraView, instant = false) {
      distance = fitDistance();
      controls.minDistance = distance / 1.8;
      controls.maxDistance = distance / 0.5;
      const target = view.focus
        ? model.center(view.focus)
        : spec.kind === "device" && latest.current.options.exploded
          ? activeBounds().center.clone()
          : new THREE.Vector3();
      const yaw = THREE.MathUtils.degToRad(view.yaw),
        pitch = THREE.MathUtils.degToRad(view.pitch);
      const r = distance / view.zoom;
      const next = {
        x: target.x + r * Math.cos(pitch) * Math.sin(yaw),
        y: target.y + r * Math.sin(pitch),
        z: target.z + r * Math.cos(pitch) * Math.cos(yaw),
      };
      if (instant || reduced.matches) {
        camera.position.set(next.x, next.y, next.z);
        controls.target.copy(target);
        controls.update();
        invalidate();
      } else {
        const current = {
          x: camera.position.x,
          y: camera.position.y,
          z: camera.position.z,
          tx: controls.target.x,
          ty: controls.target.y,
          tz: controls.target.z,
        };
        animations.get("camera")?.cancel();
        animations.set(
          "camera",
          animate(current, {
            ...next,
            tx: target.x,
            ty: target.y,
            tz: target.z,
            duration: 650,
            ease: "outCubic",
            onUpdate: () => {
              camera.position.set(current.x, current.y, current.z);
              controls.target.set(current.tx, current.ty, current.tz);
              controls.update();
              invalidate();
            },
            onComplete: () => {
              animations.delete("camera");
            },
          }),
        );
        if (!visible || document.hidden) animations.get("camera")?.pause();
      }
    }
    let previousOptions = latest.current.options,
      previousCamera = latest.current.camera;
    runtime.current = {
      camera: move,
      options(p) {
        const options = p.options;
        canvas.style.touchAction = options.touchOrbit ? "none" : "pan-y";
        controls.touches.ONE = options.touchOrbit
          ? THREE.TOUCH.ROTATE
          : THREE.TOUCH.PAN;
        controls.touches.TWO = THREE.TOUCH.DOLLY_ROTATE;
        if (
          options.exploded !== previousOptions.exploded ||
          options.separation !== previousOptions.separation
        )
          transition("structure", state, {
            explosion: options.exploded ? 1 : 0,
            separation: options.separation,
          });
        if (options.assembly !== previousOptions.assembly) {
          state.assembly = 0;
          transition("assembly", state, { assembly: 1 }, 1200);
        }
        if (
          p.camera !== previousCamera ||
          options.exploded !== previousOptions.exploded
        )
          move(p.camera);
        previousOptions = options;
        previousCamera = p.camera;
        invalidate();
      },
    };
    runtime.current.options(latest.current);
    move(latest.current.camera, true);
    function resizeScene() {
      const w = container.clientWidth,
        h = container.clientHeight;
      if (!w || !h) return;
      renderer.setPixelRatio(pixelRatio());
      container.dataset.dpr = String(pixelRatio());
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      const fitted = fitDistance();
      if (Math.abs(fitted - distance) > 0.01) {
        animations.get("camera")?.cancel();
        animations.delete("camera");
        distance = fitted;
        controls.minDistance = distance / 1.8;
        controls.maxDistance = distance / 0.5;
        move(latest.current.camera, true);
      }
      invalidate();
    }
    const resize = new ResizeObserver(resizeScene);
    resize.observe(container);
    window.addEventListener("resize", resizeScene);
    const intersection =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            pausePolicy();
          });
    intersection?.observe(container);
    function pausePolicy() {
      controls.enabled = visible && !document.hidden;
      animations.forEach((animation) => {
        if (document.hidden || !visible) animation.pause();
        else animation.resume();
      });
      if (visible && !document.hidden) invalidate();
      else {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    }
    function reducePolicy() {
      if (reduced.matches) {
        animations.forEach((animation) => animation.complete());
        animations.clear();
        state.explosion = latest.current.options.exploded ? 1 : 0;
        state.separation = latest.current.options.separation;
        state.assembly = 1;
        invalidate();
      }
    }
    document.addEventListener("visibilitychange", pausePolicy);
    reduced.addEventListener("change", reducePolicy);
    function lost(event: Event) {
      event.preventDefault();
      setFault(
        "The graphics context was lost. Reload to restore 3D; the layer descriptions remain available.",
      );
    }
    canvas.addEventListener("webglcontextlost", lost);
    function start() {
      animations.get("camera")?.cancel();
      animations.delete("camera");
    }
    controls.addEventListener("start", start);
    controls.addEventListener("change", invalidate);
    function end() {
      const offset = camera.position.clone().sub(controls.target),
        r = offset.length();
      latest.current.onCameraChange({
        ...latest.current.camera,
        yaw: THREE.MathUtils.radToDeg(Math.atan2(offset.x, offset.z)),
        pitch: THREE.MathUtils.radToDeg(Math.asin(offset.y / r)),
        zoom: Math.max(0.5, Math.min(1.8, distance / r)),
      });
    }
    controls.addEventListener("end", end);
    let pointerStart: { x: number; y: number } | null = null;
    const down = (e: PointerEvent) => {
      pointerStart = { x: e.clientX, y: e.clientY };
    };
    const cancelPointer = () => {
      pointerStart = null;
    };
    const up = (e: PointerEvent) => {
      const start = pointerStart;
      pointerStart = null;
      if (
        !start ||
        Math.hypot(e.clientX - start.x, e.clientY - start.y) > 5
      )
        return;
      const rect = canvas.getBoundingClientRect(),
        ray = new THREE.Raycaster();
      ray.setFromCamera(
        new THREE.Vector2(
          ((e.clientX - rect.left) / rect.width) * 2 - 1,
          (-(e.clientY - rect.top) / rect.height) * 2 + 1,
        ),
        camera,
      );
      const hit = ray.intersectObjects(
        model.pickables.filter((object) => object.parent?.visible),
      )[0];
      if (hit?.object.userData.part)
        latest.current.onSelect(hit.object.userData.part as string);
    };
    function keyboard(e: KeyboardEvent) {
      const v = latest.current.camera;
      if (
        ![
          "ArrowLeft",
          "ArrowRight",
          "ArrowUp",
          "ArrowDown",
          "+",
          "=",
          "-",
        ].includes(e.key)
      )
        return;
      e.preventDefault();
      latest.current.onCameraChange({
        ...v,
        focus: undefined,
        yaw:
          v.yaw +
          (e.key === "ArrowLeft" ? -12 : e.key === "ArrowRight" ? 12 : 0),
        pitch: Math.max(
          -89,
          Math.min(
            89,
            v.pitch +
              (e.key === "ArrowUp" ? 10 : e.key === "ArrowDown" ? -10 : 0),
          ),
        ),
        zoom: Math.max(
          0.5,
          Math.min(
            1.8,
            v.zoom +
              (e.key === "+" || e.key === "=" ? 0.1 : e.key === "-" ? -0.1 : 0),
          ),
        ),
      });
    }
    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointerup", up);
    canvas.addEventListener("pointercancel", cancelPointer);
    canvas.addEventListener("keydown", keyboard);
    return () => {
      disposed = true;
      runtime.current = null;
      cancelAnimationFrame(frame);
      animations.forEach((animation) => animation.cancel());
      animations.clear();
      resize.disconnect();
      window.removeEventListener("resize", resizeScene);
      intersection?.disconnect();
      document.removeEventListener("visibilitychange", pausePolicy);
      reduced.removeEventListener("change", reducePolicy);
      canvas.removeEventListener("webglcontextlost", lost);
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("pointercancel", cancelPointer);
      canvas.removeEventListener("keydown", keyboard);
      controls.removeEventListener("start", start);
      controls.removeEventListener("change", invalidate);
      controls.removeEventListener("end", end);
      controls.dispose();
      model.dispose();
      floorGeometry.dispose();
      floorMaterial.dispose();
      key.shadow.dispose();
      scene.environment = null;
      environment.dispose();
      scene.clear();
      renderer.renderLists.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
    };
  }, [specKey, fault, instructionsId]);
  const name =
    props.spec.kind === "atomic"
      ? atomNames[props.options.selected as keyof typeof atomNames]
      : props.options.selected === "interface"
        ? "Carbon-dot interface"
        : deviceParts.find((p) => p.id === props.options.selected)?.name;
  if (fault)
    return (
      <SceneFallback
        spec={props.spec}
        hidden={props.options.hidden}
        message={fault}
      />
    );
  return (
    <div
      ref={host}
      className="scientific-canvas"
      data-renderer="three"
      data-webgl="loading"
    >
      <p id={instructionsId} className="sr-only">
        Drag to orbit. Use the arrow keys to rotate and plus or minus to zoom.
        Use the model controls to focus a selection or reset the view. On a
        touchscreen, drag with two fingers, or enable one-finger orbit.
      </p>
      <span
        ref={annotation}
        className="scene-annotation"
        aria-hidden="true"
        hidden={
          !props.options.labels ||
          props.options.hidden.includes(props.options.selected)
        }
      >
        {name}
      </span>
    </div>
  );
}
