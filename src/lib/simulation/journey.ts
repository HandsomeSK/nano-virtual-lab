import type { Query } from "../site.ts";
import {
  parseConfigurations,
  type SavedConfiguration,
} from "./configurations.ts";
import {
  normalizeParameters,
  parametersQuery,
  type CurveMode,
  type Parameters,
} from "./model.ts";

export type ComparisonPair = { a: SavedConfiguration; b: SavedConfiguration };
export type ComparisonJourney = ComparisonPair & {
  slot: "a" | "b";
  mode: CurveMode;
  layout: "overlay" | "side";
};

export function comparisonPair(query: Query): ComparisonPair | null {
  function read(key: "scenarioA" | "scenarioB") {
    const raw = query[key];
    if (typeof raw !== "string" || raw.length > 1024) return null;
    try {
      return (
        parseConfigurations(
          JSON.stringify({ version: 1, configurations: [JSON.parse(raw)] }),
        ).configurations[0] ?? null
      );
    } catch {
      return null;
    }
  }
  const a = read("scenarioA"),
    b = read("scenarioB");
  return a && b ? { a, b } : null;
}

export function comparisonJourney(query: Query): ComparisonJourney | null {
  const pair = comparisonPair(query);
  return pair && (query.editScenario === "a" || query.editScenario === "b")
    ? {
        ...pair,
        slot: query.editScenario,
        mode: query.curve === "output" ? "output" : "transfer",
        layout: query.layout === "side" ? "side" : "overlay",
      }
    : null;
}

function pairQuery(pair: ComparisonPair, mode: CurveMode, layout: string) {
  return new URLSearchParams({
    scenarioA: JSON.stringify({ ...pair.a, id: "comparison-a" }),
    scenarioB: JSON.stringify({ ...pair.b, id: "comparison-b" }),
    a: "comparison-a",
    b: "comparison-b",
    curve: mode,
    layout,
  });
}

export function editScenarioHref(
  slot: "a" | "b",
  pair: ComparisonPair,
  mode: CurveMode,
  layout: "overlay" | "side",
) {
  const query = pairQuery(pair, mode, layout);
  query.set("editScenario", slot);
  for (const [key, value] of new URLSearchParams(
    parametersQuery(pair[slot].parameters),
  ))
    query.set(key, value);
  return "/simulator?" + query + "#simulation";
}

export function comparisonHref(
  parameters: Parameters,
  journey: ComparisonJourney | null,
  applyChanges = true,
) {
  if (!journey)
    return (
      "/comparison?" +
      parametersQuery(parameters) +
      "&source=simulator#device-comparison"
    );
  const pair = {
    a: { ...journey.a },
    b: { ...journey.b },
  };
  if (applyChanges)
    pair[journey.slot].parameters = normalizeParameters(parameters);
  return (
    "/comparison?" +
    pairQuery(pair, journey.mode, journey.layout) +
    "#device-comparison"
  );
}

export function simulatorParametersHref(
  parameters: Parameters,
  search: string,
  hash: string,
) {
  const query = new URLSearchParams(search);
  for (const [key, value] of new URLSearchParams(parametersQuery(parameters)))
    query.set(key, value);
  return "/simulator?" + query + hash;
}
