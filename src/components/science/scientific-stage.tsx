"use client";
import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { SceneFallback } from "./scene-fallback";
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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNearby(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(host.current);
    return () => observer.disconnect();
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
            message="Structure preview. The interactive view is preparing."
          />
        )}
      </SceneBoundary>
    </div>
  );
}
