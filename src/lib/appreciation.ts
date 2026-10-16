export const appreciationStorageKey = "nanolab-like:v1";

export function createAppreciationPreference(
  storage: () => Pick<Storage, "getItem" | "setItem">,
) {
  let ephemeral: boolean | undefined;
  function snapshot() {
    if (ephemeral !== undefined) return ephemeral;
    try {
      return storage().getItem(appreciationStorageKey) === "1";
    } catch {
      return false;
    }
  }
  return {
    snapshot,
    toggle() {
      const next = !snapshot();
      ephemeral = next;
      try {
        storage().setItem(appreciationStorageKey, next ? "1" : "0");
        ephemeral = undefined;
      } catch {
        // Keep the preference for this visit when browser storage is blocked.
      }
      return next;
    },
    sync() {
      ephemeral = undefined;
    },
  };
}
