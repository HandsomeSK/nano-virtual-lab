import test from "node:test";
import assert from "node:assert/strict";
import {
  createHomeParticles,
  homeParticlePosition,
  rasterizeHomeParticles,
} from "../src/lib/home-particles.ts";

test("ambient dots keep a deterministic field with bounded, finite appearance", () => {
  const particles = createHomeParticles(100);
  assert.deepEqual(particles, createHomeParticles(100));
  for (const time of [0, 60, 3600, 1000000]) {
    for (const p of particles) {
      const state = homeParticlePosition(p, time);
      assert(Object.values(state).every(Number.isFinite));
      assert(state.opacity > 0 && state.opacity <= 1);
      assert(state.size > 0 && state.size < 2);
    }
  }
});

test("particle rasterization clips edges and refreshes a finite silver frame", () => {
  const image = {
    width: 80,
    height: 100,
    data: new Uint8ClampedArray(80 * 100 * 4),
  };
  const field = createHomeParticles(2000);
  rasterizeHomeParticles(field, 0, image, 1);
  const first = image.data.slice();
  assert(first.some((v, i) => i % 4 === 3 && v > 0));
  rasterizeHomeParticles(field, 12, image, 1);
  assert.notDeepEqual(image.data, first);
  rasterizeHomeParticles([], 12, image, 1);
  assert(image.data.every((v) => v === 0));
});

test("continuous drift does not jump or restart at elapsed-time boundaries", () => {
  for (const p of createHomeParticles(100)) {
    for (const boundary of [10, 60, 120, 3600]) {
      const before = homeParticlePosition(p, boundary - 0.001);
      const after = homeParticlePosition(p, boundary + 0.001);
      assert(Math.hypot(after.x - before.x, after.y - before.y) < 0.0001);
    }
    const initial = homeParticlePosition(p, 0);
    const later = homeParticlePosition(p, 60);
    assert(Math.hypot(later.x - initial.x, later.y - initial.y) > 0.00001);
  }
});
