export function SceneLoading({ overlay = false }: { overlay?: boolean }) {
  return (
    <div
      className={`scene-loading${overlay ? " scene-loading--overlay" : ""}`}
      role="status"
    >
      <span className="scene-spinner" aria-hidden="true" />
      <span>Loading 3D model…</span>
    </div>
  );
}
