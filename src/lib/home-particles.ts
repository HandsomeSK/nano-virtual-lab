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
    spread: 0.7 + random() * 0.3,
    phase: random() * Math.PI * 2,
    depth: random(),
    ribbon: i % 12 !== 0,
  }));
}

// Decorative, continuous motion; this is not a scientific particle simulation.
export function homeParticlePosition(particle: HomeParticle, seconds: number) {
  const x = particle.x * 1.12 - 0.06;
  const travel = seconds * 0.24;
  const angle = particle.phase + travel + x * 5.5;
  const swell = 0.65 + 0.35 * Math.sin(x * 9 - travel * 0.7);
  const radius = particle.spread * swell;
  const depth = Math.cos(angle) * radius;
  const perspective = 1 + depth * 0.09;
  const center = 0.28 + 0.065 * Math.sin(x * 8 + travel * 0.65);
  // Project a twisting, breathing volume. Surface normals give the silver
  // highlights; the accumulated clock has no cut, rewind or reset point.
  const light = Math.max(0, Math.sin(angle - 0.6));
  return {
    x: particle.ribbon
      ? 0.5 + (x - 0.5) * perspective + 0.01 * Math.sin(angle * 2 + travel)
      : particle.x + 0.012 * Math.sin(travel * 0.2 + particle.phase),
    y: particle.ribbon
      ? center + Math.sin(angle) * radius * 0.16 * perspective
      : particle.y + 0.012 * Math.cos(travel * 0.3 + particle.phase),
    opacity: particle.ribbon
      ? (0.18 + light ** 1.4 * 0.7) * (0.6 + particle.depth * 0.4)
      : 0.04 + particle.depth * 0.09,
    size: particle.ribbon
      ? (0.6 + particle.depth * 0.95) * perspective
      : 0.5 + particle.depth,
  };
}

export function rasterizeHomeParticles(
  particles: HomeParticle[],
  seconds: number,
  pixels: { width: number; height: number; data: Uint8ClampedArray },
  dpr: number,
) {
  const { width, height, data } = pixels;
  data.fill(0);
  for (const particle of particles) {
    const point = homeParticlePosition(particle, seconds);
    const y = point.y - (particle.ribbon && width / dpr < 600 ? 0.095 : 0);
    const px = point.x * width,
      py = y * height;
    const x0 = Math.floor(px),
      y0 = Math.floor(py);
    const energy = point.opacity * (point.size * dpr) ** 2;
    // Bilinear splats retain fine grains with a single Canvas upload per frame.
    for (let dy = 0; dy < 2; dy++)
      for (let dx = 0; dx < 2; dx++) {
        const x = x0 + dx,
          yy = y0 + dy;
        if (x < 0 || x >= width || yy < 0 || yy >= height) continue;
        const weight =
          (dx ? px - x0 : 1 - (px - x0)) * (dy ? py - y0 : 1 - (py - y0));
        const alpha = Math.min(0.92, energy * weight);
        const i = (yy * width + x) * 4;
        data[i] = 237;
        data[i + 1] = 240;
        data[i + 2] = 244;
        data[i + 3] += (255 - data[i + 3]) * alpha;
      }
  }
}
