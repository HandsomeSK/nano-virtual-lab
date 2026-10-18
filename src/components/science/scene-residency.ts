export function observeSceneResidency(
  element: Element,
  onChange: (resident: boolean) => void,
  Observer: typeof IntersectionObserver | undefined = globalThis.IntersectionObserver,
) {
  if (!Observer) {
    onChange(true);
    return () => {};
  }
  let resident = false;
  let disposed = false;
  function update(next: boolean) {
    if (disposed || resident === next) return;
    resident = next;
    onChange(next);
  }
  const enter = new Observer(
    ([entry]) => {
      if (entry.isIntersecting) update(true);
    },
    { rootMargin: "200px 0px" },
  );
  // Keep a wider exit boundary so small scrolls do not recreate the renderer.
  const retain = new Observer(
    ([entry]) => {
      if (!entry.isIntersecting) update(false);
    },
    { rootMargin: "900px 0px" },
  );
  enter.observe(element);
  retain.observe(element);
  return () => {
    disposed = true;
    enter.disconnect();
    retain.disconnect();
  };
}
