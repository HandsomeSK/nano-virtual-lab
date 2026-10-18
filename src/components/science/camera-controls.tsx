"use client";
import type { Dispatch, SetStateAction } from "react";
import type { CameraView } from "./types";
function ControlIcon({
  kind,
}: {
  kind: "left" | "right" | "up" | "down" | "plus" | "minus";
}) {
  const paths = {
    left: "M15 5l-7 7 7 7",
    right: "M9 5l7 7-7 7",
    up: "M5 15l7-7 7 7",
    down: "M5 9l7 7 7-7",
    plus: "M5 12h14M12 5v14",
    minus: "M5 12h14",
  };
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[kind]} />
    </svg>
  );
}
export function CameraControls({
  camera,
  update,
  reset,
  focus,
  label = "Model",
}: {
  camera: CameraView;
  update: Dispatch<SetStateAction<CameraView>>;
  reset: () => void;
  focus?: () => void;
  label?: string;
}) {
  const rotate = (yaw: number, pitch: number) =>
    update((current) => ({
      ...current,
      focus: undefined,
      yaw: current.yaw + yaw,
      pitch: Math.max(-89, Math.min(89, current.pitch + pitch)),
    }));
  return (
    <div
      className="science-camera-controls"
      role="group"
      aria-label={label + " camera controls"}
    >
      <div role="group" aria-label="Rotate model">
        {(["left", "right", "up", "down"] as const).map((kind) => (
          <button
            key={kind}
            type="button"
            className="button-secondary"
            aria-label={"Rotate " + kind}
            title={"Rotate " + kind}
            onClick={() =>
              rotate(
                kind === "left" ? -12 : kind === "right" ? 12 : 0,
                kind === "up" ? 10 : kind === "down" ? -10 : 0,
              )
            }
          >
            <ControlIcon kind={kind} />
          </button>
        ))}
      </div>
      <div role="group" aria-label="Model zoom">
        <button
          type="button"
          className="button-secondary"
          aria-label="Zoom out"
          onClick={() =>
            update((current) => ({
              ...current,
              zoom: Math.max(0.5, current.zoom - 0.1),
            }))
          }
        >
          <ControlIcon kind="minus" />
        </button>
        <output aria-label="Zoom level">
          {Math.round(camera.zoom * 100)}%
        </output>
        <button
          type="button"
          className="button-secondary"
          aria-label="Zoom in"
          onClick={() =>
            update((current) => ({
              ...current,
              zoom: Math.min(1.8, current.zoom + 0.1),
            }))
          }
        >
          <ControlIcon kind="plus" />
        </button>
      </div>
      {focus ? (
        <button type="button" className="button-secondary" onClick={focus}>
          Focus selection
        </button>
      ) : null}
      <button type="button" className="button-secondary" onClick={reset}>
        Reset model
      </button>
    </div>
  );
}
