export const currentUnitScales = { nA: 1e-9, "µA": 1e-6, mA: 1e-3 } as const;
export const opticalPowerUnitScales = { nW: 1e-9, "µW": 1e-6, mW: 1e-3 } as const;
export type CurrentUnit = keyof typeof currentUnitScales;
export type OpticalPowerUnit = keyof typeof opticalPowerUnitScales;

export type PhotodetectorInputs = {
  illuminatedCurrent: string;
  illuminatedUnit: CurrentUnit;
  darkCurrent: string;
  darkUnit: CurrentUnit;
  incidentPower: string;
  powerUnit: OpticalPowerUnit;
};

type InputField = "illuminatedCurrent" | "darkCurrent" | "incidentPower";
type AnalysisErrors = Partial<Record<InputField | "calculation", string>>;

export type PhotodetectorResult =
  | {
      ok: true;
      illuminatedCurrentA: number;
      darkCurrentA: number;
      incidentPowerW: number;
      photocurrentA: number;
      responsivityAw: number;
    }
  | { ok: false; errors: AnalysisErrors };

export function analyzePhotodetector(input: PhotodetectorInputs): PhotodetectorResult {
  const errors: AnalysisErrors = {};
  function convert(field: InputField, scale: number) {
    const raw = input[field].trim();
    const value = raw === "" ? NaN : Number(raw);
    const converted = value * scale;
    if (!Number.isFinite(value)) errors[field] = "Enter a finite number.";
    else if (!Number.isFinite(converted) || (value !== 0 && converted === 0))
      errors[field] = "This value is outside the supported numerical range.";
    return converted;
  }
  const illuminatedCurrentA = convert("illuminatedCurrent", currentUnitScales[input.illuminatedUnit]);
  const darkCurrentA = convert("darkCurrent", currentUnitScales[input.darkUnit]);
  const incidentPowerW = convert("incidentPower", opticalPowerUnitScales[input.powerUnit]);
  if (!errors.incidentPower && incidentPowerW <= 0)
    errors.incidentPower = "Incident optical power must be greater than zero.";
  if (Object.keys(errors).length) return { ok: false, errors };

  const photocurrentA = illuminatedCurrentA - darkCurrentA;
  const responsivityAw = photocurrentA / incidentPowerW;
  if (
    !Number.isFinite(photocurrentA) ||
    !Number.isFinite(responsivityAw) ||
    (photocurrentA !== 0 && responsivityAw === 0)
  )
    return {
      ok: false,
      errors: { calculation: "These values exceed the supported numerical range. Use less extreme currents or power." },
    };
  return {
    ok: true,
    illuminatedCurrentA,
    darkCurrentA,
    incidentPowerW,
    photocurrentA,
    responsivityAw,
  };
}
