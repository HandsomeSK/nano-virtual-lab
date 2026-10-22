import { metrics, parameterControls, type Parameters } from "./model.ts";

const explanations: Record<keyof Parameters, string> = {
  gateVoltage:
    "Gate bias changes channel overdrive and induced channel charge relative to the fixed 0.7 V threshold. A real device's threshold also depends on its gate stack, charge environment and measurement history.",
  drainVoltage:
    "Drain bias drives current; in model saturation, increasing it can leave the current unchanged.",
  channelLength:
    "At fixed width, gate charge and other assumptions, a shorter channel raises β through W/L. This classical trend cannot be extrapolated to atomic channels: ballistic or quantum transport and short-channel leakage are outside this model.",
  mobility:
    "At fixed gate charge and internal bias, larger assumed mobility raises β and the calculated current. Contact voltage drops can limit that gain. Mobility does not create a band gap or guarantee a low OFF current.",
  contactResistance:
    "The total ohmic series resistance lowers both internal gate overdrive and drain bias when current flows. At zero current there is no contact voltage drop; bias-dependent Schottky injection is not calculated.",
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
