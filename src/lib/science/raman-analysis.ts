export const ramanExamples = [
  { label: "Monolayer", symmetry: "1H monolayer · D₃h", inMode: "E′", outMode: "A₁′", inPlane: 385, outOfPlane: 403 },
  { label: "Bilayer", symmetry: "2H bilayer · D₃d", inMode: "Eg", outMode: "A₁g", inPlane: 384, outOfPlane: 406 },
  { label: "Bulk", symmetry: "2H bulk · D₆h", inMode: "E₂g¹", outMode: "A₁g", inPlane: 383, outOfPlane: 409 },
] as const;

export const ramanPeakBounds = { min: 370, max: 420 } as const;
export const ramanPlotBounds = { min: 360, max: 430 } as const;

export function analyzeRamanPeaks(inPlane: number, outOfPlane: number) {
  if (!Number.isFinite(inPlane) || !Number.isFinite(outOfPlane))
    return { valid: false as const, error: "Enter a finite number for both peak positions." };
  if ([inPlane, outOfPlane].some(value => value < ramanPeakBounds.min || value > ramanPeakBounds.max))
    return { valid: false as const, error: "Use peak positions from 370 to 420 cm⁻¹ for this demonstration." };
  if (outOfPlane <= inPlane)
    return { valid: false as const, error: "Place the out-of-plane peak above the in-plane peak for this selected mode pair." };
  return { valid: true as const, separation: outOfPlane - inPlane };
}

export function conceptualRamanSpectrum(inPlane: number, outOfPlane: number) {
  if (!analyzeRamanPeaks(inPlane, outOfPlane).valid) return [];
  // Fixed 4 cm⁻¹ FWHM and relative amplitudes are teaching choices, not a fit.
  const lorentzian = (shift: number, centre: number) => 4 / ((shift - centre) ** 2 + 4);
  const points = Array.from({ length: 281 }, (_, index) => {
    const shift = ramanPlotBounds.min + index * 0.25;
    return { shift, intensity: lorentzian(shift, inPlane) + 0.85 * lorentzian(shift, outOfPlane) };
  });
  const maximum = Math.max(...points.map(point => point.intensity));
  return points.map(point => ({ ...point, intensity: point.intensity / maximum }));
}
