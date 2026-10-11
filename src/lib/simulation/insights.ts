import { metrics, parameterControls, type Parameters } from "./model.ts";

const explanations: Record<keyof Parameters, string> = {
  gateVoltage:
    "Gate bias changes channel overdrive relative to the fixed 0.7 V threshold.",
  drainVoltage:
    "Drain bias drives current; in model saturation, increasing it can leave the current unchanged.",
  channelLength:
    "Here, channel length changes the W/L factor. Short-channel effects are outside this model.",
  mobility:
    "Mobility describes carrier response to an electric field. It does not create a band gap or guarantee a low OFF current.",
  contactResistance:
    "Ohmic contacts can lower the internal gate and drain biases through their voltage drops.",
};

export function parameterInsight(
  before: Parameters,
  after: Parameters,
  key: keyof Parameters,
) {
  const control = parameterControls.find((item) => item.key === key)!;
  const previous = metrics(before).currentUa;
  const current = metrics(after).currentUa;
  const difference = current - previous;
  const adjustment =
    before[key] === after[key]
      ? `${control.label} returned to ${after[key]} ${control.unit}.`
      : `${control.label} ${after[key] > before[key] ? "increased" : "decreased"} from ${before[key]} to ${after[key]} ${control.unit}.`;
  const response =
    difference === 0
      ? `Calculated drain current remained ${current.toFixed(3)} µA at this bias point.`
      : Math.abs(difference) < 0.0005
        ? "Calculated drain current changed by less than 0.001 µA at this bias point."
        : `Calculated drain current ${difference > 0 ? "increased" : "decreased"} from ${previous.toFixed(3)} to ${current.toFixed(3)} µA at this bias point.`;
  return `${adjustment} ${response} ${explanations[key]}`;
}
