import {
  normalizeParameters,
  parameterControls,
  type Parameters,
} from "./model.ts";
export type SavedConfiguration = {
  id: string;
  name: string;
  parameters: Parameters;
};
export const storageKey = "nanolab.simulations.v1";
export const emptySnapshot = '{"version":1,"configurations":[]}';
export function parseConfigurations(raw: string) {
  try {
    const parsed = JSON.parse(raw);
    if (parsed.version !== 1 || !Array.isArray(parsed.configurations))
      return {
        configurations: [] as SavedConfiguration[],
        issue: "Saved data has an unsupported format.",
      };
    const configurations: SavedConfiguration[] = parsed.configurations
      .filter((entry: unknown) => {
        if (!entry || typeof entry !== "object") return false;
        const c = entry as Record<string, unknown>;
        if (
          typeof c.id !== "string" ||
          !/^[a-z0-9-]{1,80}$/i.test(c.id) ||
          typeof c.name !== "string" ||
          c.name.length < 1 ||
          c.name.length > 80 ||
          !c.parameters ||
          typeof c.parameters !== "object"
        )
          return false;
        const p = c.parameters as Record<string, unknown>;
        return parameterControls.every(
          (control) =>
            typeof p[control.key] === "number" &&
            Number.isFinite(p[control.key]) &&
            Number(p[control.key]) >= control.min &&
            Number(p[control.key]) <= control.max,
        );
      })
      .slice(0, 20)
      .map((c: SavedConfiguration) => ({
        id: c.id,
        name: c.name,
        parameters: normalizeParameters(c.parameters),
      }));
    return {
      configurations,
      issue:
        configurations.length < parsed.configurations.length
          ? "Some invalid saved configurations were ignored."
          : "",
    };
  } catch {
    return {
      configurations: [] as SavedConfiguration[],
      issue:
        "Saved data could not be read. You can create a new configuration in the simulator.",
    };
  }
}
