export type HomeParticle = {
  x: number;
  y: number;
  spread: number;
  phase: number;
  depth: number;
  ribbon: boolean;
};

export function createHomeParticles(count: number): HomeParticle[] {
  let seed = 6045;
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  return Array.from({ length: count }, (_, i) => ({
    x: random(),
    y: random(),
    spread: (random() + random() + random() + random() - 2) * 0.6,
    phase: random() * Math.PI * 2,
    depth: random(),
    ribbon: i % 5 !== 0,
  }));
}

// Decorative, continuous motion; this is not a scientific particle simulation.
export function homeParticlePosition(particle: HomeParticle, seconds: number) {
  const x = particle.x + 0.025 * Math.sin(seconds * 0.037 + particle.phase);
  const drift = 0.009 * Math.sin(seconds * 0.061 + particle.phase);
  const center =
    0.32 +
    0.065 * Math.sin(x * 7.4 + seconds * 0.021) +
    0.025 * Math.cos(x * 14.2 - seconds * 0.029);
  const thickness = 0.09 + 0.035 * Math.cos(x * 6.1 + seconds * 0.017);
  return {
    x,
    y: particle.ribbon
      ? center + particle.spread * thickness + drift
      : particle.y + drift,
    opacity: particle.ribbon
      ? (0.22 + 0.57 * Math.exp(-(particle.spread ** 2) * 3)) *
        (0.55 + particle.depth * 0.45)
      : 0.045 + particle.depth * 0.085,
    size: 0.7 + particle.depth * 0.9,
  };
}
