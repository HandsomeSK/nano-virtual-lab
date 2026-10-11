export type DispersionKind = "graphene" | "gapped";

// Normalized teaching shapes, not fitted material band structures.
export function normalizedBandEnergy(k: number, kind: DispersionKind) {
  return kind === "graphene" ? Math.abs(k) : 0.4 + 0.8 * k * k;
}

export function fermiCharacter(energy: number, kind: DispersionKind) {
  if (kind === "gapped" && Math.abs(energy) < 0.4)
    return "Fermi level in the gap";
  if (Math.abs(energy) < 0.001) return "Charge-neutral Dirac point";
  return energy > 0 ? "Electron-like carriers" : "Hole-like carriers";
}

export function transportDescription(lengthRatio: number) {
  if (lengthRatio <= 0.25)
    return "L ≪ ℓ: few scattering events are expected over this channel. This illustrates the near-ballistic limit.";
  if (lengthRatio >= 2)
    return "L > ℓ: several scattering events become likely. Transport increasingly depends on scattering within the channel.";
  return "L is comparable to ℓ: scattering becomes important. This is a crossover, not a sharp boundary between transport regimes.";
}
