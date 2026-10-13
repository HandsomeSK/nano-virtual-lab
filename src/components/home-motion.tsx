"use client";
import { useEffect, useRef } from "react";
import {
  createHomeParticles,
  homeParticlePosition,
} from "@/lib/home-particles";

export function HomeMotion({ className }: { className: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const root = document.querySelector(".nano-home");
    const elements = [
      ...(root?.querySelectorAll<HTMLElement>(".appear, .hero-photo") ?? []),
    ];
    const finish = (event: Event) => {
      if (event.target === event.currentTarget)
        (event.currentTarget as HTMLElement).classList.add("is-in");
    };
    elements.forEach((el) => el.addEventListener("animationend", finish));
    let second = 0;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => {
        try {
          if (
            !elements.some((el) =>
              el
                .getAnimations?.()
                .some(
                  (a) =>
                    a.playState === "running" || a.playState === "finished",
                ),
            )
          )
            elements.forEach((el) => el.classList.add("is-in"));
        } catch {
          elements.forEach((el) => el.classList.add("is-in"));
        }
      });
    });
    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
      elements.forEach((el) => el.removeEventListener("animationend", finish));
    };
  }, []);

  useEffect(() => {
    const node = canvas.current;
    const host = node?.parentElement;
    const context = node?.getContext("2d");
    if (!node || !host || !context) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let width = 1,
      height = 1,
      frame = 0,
      lastPaint = 0,
      seconds = 0,
      frames = 0;
    let lastTime = 0,
      visible = true,
      failed = false;
    let particles = createHomeParticles(1);
    function draw() {
      if (!context || !node) return;
      context.clearRect(0, 0, width, height);
      context.fillStyle = "#edf0f4";
      for (const particle of particles) {
        const point = homeParticlePosition(particle, seconds);
        context.globalAlpha = point.opacity;
        const y = point.y - (particle.ribbon && width < 600 ? 0.1 : 0);
        context.fillRect(point.x * width, y * height, point.size, point.size);
      }
      node.dataset.frames = String(++frames);
      node.dataset.elapsed = seconds.toFixed(3);
    }
    function tick(now: number) {
      frame = 0;
      if (failed || !visible || document.hidden || reduced.matches) return;
      if (now - lastPaint >= 1000 / 24) {
        // Resume from the same phase after background tabs or long frames.
        seconds += lastTime ? Math.min((now - lastTime) / 1000, 0.08) : 0;
        lastTime = now;
        lastPaint = now;
        draw();
      }
      frame = requestAnimationFrame(tick);
    }
    function policy() {
      cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
      lastPaint = 0;
      if (!failed && visible && !document.hidden && !reduced.matches)
        frame = requestAnimationFrame(tick);
    }
    function resize() {
      if (!node || !host || !context) return;
      width = host.clientWidth;
      height = host.clientHeight;
      const dpr = Math.min(devicePixelRatio || 1, 1.5);
      node.width = Math.round(width * dpr);
      node.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = createHomeParticles(
        Math.min(
          width < 600 ? 2200 : 7600,
          Math.max(850, Math.round((width * height) / 180)),
        ),
      );
      draw();
      host.dataset.ready = "true";
    }
    function lost() {
      failed = true;
      host!.dataset.ready = "false";
      policy();
    }
    const resizeObserver = new ResizeObserver(resize);
    const viewport = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      policy();
    });
    resizeObserver.observe(host);
    viewport.observe(host);
    reduced.addEventListener("change", policy);
    document.addEventListener("visibilitychange", policy);
    node.addEventListener("contextlost", lost);
    resize();
    policy();
    return () => {
      failed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      viewport.disconnect();
      reduced.removeEventListener("change", policy);
      document.removeEventListener("visibilitychange", policy);
      node.removeEventListener("contextlost", lost);
      node.width = 0;
      node.height = 0;
    };
  }, []);

  return (
    <div className={className} aria-hidden="true" data-ready="false">
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern
            id="home-stipple"
            width="7"
            height="7"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="0.8" fill="#d4d8df" opacity="0.48" />
          </pattern>
        </defs>
        <path
          d="M-80 310Q180 130 400 270T820 310T1520 240L1520 360Q1100 500 820 370T400 350T-80 380Z"
          fill="url(#home-stipple)"
        />
      </svg>
      <canvas ref={canvas} />
    </div>
  );
}
