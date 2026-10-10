export type Parameters = {
  gateVoltage: number;
  drainVoltage: number;
  channelLength: number;
  mobility: number;
  contactResistance: number;
};
export const parameterControls = [
  {
    key: "gateVoltage",
    label: "Gate Voltage",
    unit: "V",
    min: 0,
    max: 3,
    step: 0.01,
    description:
      "Gate bias relative to the external source; threshold is fixed at 0.7 V.",
  },
  {
    key: "drainVoltage",
    label: "Drain Voltage",
    unit: "V",
    min: 0,
    max: 2,
    step: 0.01,
    description: "Drain bias relative to the external source.",
  },
  {
    key: "channelLength",
    label: "Channel Length",
    unit: "nm",
    min: 100,
    max: 2000,
    step: 10,
    description:
      "A geometry parameter in the long-channel teaching model; not a short-channel prediction.",
  },
  {
    key: "mobility",
    label: "Mobility",
    unit: "cm²/Vs",
    min: 1,
    max: 200,
    step: 1,
    description:
      "An assumed constant field-effect mobility, not a universal material value.",
  },
  {
    key: "contactResistance",
    label: "Contact Resistance",
    unit: "kΩ",
    min: 0,
    max: 100,
    step: 1,
    description:
      "Total lumped source + drain resistance, split equally. Not width-normalized Ω·µm.",
  },
] as const;
export const defaultParameters: Parameters = {
  gateVoltage: 1.5,
  drainVoltage: 1,
  channelLength: 500,
  mobility: 50,
  contactResistance: 10,
};
export const modelConstants = {
  thresholdV: 0.7,
  widthM: 1e-6,
  capacitanceFm2: 0.01,
};
export type CurveMode = "transfer" | "output";
export function normalizeParameters(value: unknown): Parameters {
  const input =
    value && typeof value === "object" && !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : {};
  const result = { ...defaultParameters };
  for (const control of parameterControls) {
    const raw = input[control.key];
    const parsed =
      typeof raw === "number"
        ? raw
        : typeof raw === "string" && raw.trim() !== ""
          ? Number(raw)
          : NaN;
    result[control.key] = Number.isFinite(parsed)
      ? Math.min(control.max, Math.max(control.min, parsed))
      : defaultParameters[control.key];
  }
  return result;
}
export function parametersQuery(parameters: Parameters) {
  return new URLSearchParams(
    Object.entries(parameters).map(([key, value]) => [key, String(value)]),
  ).toString();
}
function idealCurrent(beta: number, overdrive: number, drain: number) {
  if (overdrive <= 0 || drain <= 0) return 0;
  return drain < overdrive
    ? beta * (overdrive * drain - (drain * drain) / 2)
    : (beta * overdrive * overdrive) / 2;
}
export function currentA(input: Parameters) {
  const p = normalizeParameters(input);
  const beta =
    (p.mobility *
      1e-4 *
      modelConstants.capacitanceFm2 *
      modelConstants.widthM) /
    (p.channelLength * 1e-9);
  const ideal = idealCurrent(
    beta,
    p.gateVoltage - modelConstants.thresholdV,
    p.drainVoltage,
  );
  const resistance = p.contactResistance * 1000;
  if (resistance === 0 || ideal === 0) return ideal;
  let low = 0,
    high = Math.min(ideal, p.drainVoltage / resistance);
  // The ohmic contacts lower both internal Vgs and Vds; solve their current self-consistently.
  for (let i = 0; i < 60; i++) {
    const mid = (low + high) / 2;
    const channel = idealCurrent(
      beta,
      p.gateVoltage - (mid * resistance) / 2 - modelConstants.thresholdV,
      p.drainVoltage - mid * resistance,
    );
    if (channel > mid) low = mid;
    else high = mid;
  }
  return (low + high) / 2;
}
export function metrics(input: Parameters) {
  const p = normalizeParameters(input),
    current = currentA(p),
    r = p.contactResistance * 1000;
  const low = Math.max(0, p.gateVoltage - 0.001),
    high = Math.min(3, p.gateVoltage + 0.001);
  const gm =
    (currentA({ ...p, gateVoltage: high }) -
      currentA({ ...p, gateVoltage: low })) /
    (high - low);
  const vov = p.gateVoltage - (current * r) / 2 - modelConstants.thresholdV;
  const vds = p.drainVoltage - current * r;
  return {
    currentUa: current * 1e6,
    gmUs: gm * 1e6,
    powerUw: current * p.drainVoltage * 1e6,
    region: current === 0 ? "OFF" : vds >= vov ? "Saturation" : "Linear",
    internalVgs: p.gateVoltage - (current * r) / 2,
    internalVds: vds,
  };
}
export function curve(parameters: Parameters, mode: CurveMode) {
  const max = mode === "transfer" ? 3 : 2;
  return Array.from({ length: 101 }, (_, i) => {
    const x = (i * max) / 100;
    return {
      x,
      y:
        currentA({
          ...parameters,
          [mode === "transfer" ? "gateVoltage" : "drainVoltage"]: x,
        }) * 1e6,
    };
  });
}
