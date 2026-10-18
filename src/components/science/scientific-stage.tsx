"use client";
import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { SceneFallback } from "./scene-fallback";
import { observeSceneResidency } from "./scene-residency";
import type { SceneProps } from "./types";
const Canvas = dynamic(() => import("./scientific-canvas"), {
  ssr: false,
  loading: () => (
    <div className="scene-loading" role="status">
      Preparing the interactive model…
    </div>
  ),
});
class SceneBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
export function ScientificStage(props: SceneProps) {
  const host = useRef<HTMLDivElement>(null);
  const [nearby, setNearby] = useState(false);
  useEffect(() => {
    if (!host.current) return;
    return observeSceneResidency(host.current, setNearby);
  }, []);
  return (
    <div ref={host}>
      <SceneBoundary
        key={JSON.stringify(props.spec)}
        fallback={
          <SceneFallback
            spec={props.spec}
            hidden={props.options.hidden}
            message="The 3D model could not load. Reload the page to retry, or use the descriptions below."
          />
        }
      >
        {nearby ? (
          <Canvas {...props} />
        ) : (
          <SceneFallback
            spec={props.spec}
            hidden={props.options.hidden}
            message="Structure preview. Scroll closer to interact with the model."
          />
        )}
      </SceneBoundary>
    </div>
  );
}
