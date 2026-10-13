"use client";
import { useEffect, useState } from "react";
// Resting CSS is visible. Scientific motion lives in the lab.
export function HomeMotion() {
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(false);
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
    const video = document.getElementById(
      "homepage-video",
    ) as HTMLVideoElement | null;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    function policy() {
      if (reduced.matches || document.hidden) video?.pause();
    }
    function update() {
      setAvailable(Boolean(video && video.readyState >= 2));
      setPlaying(Boolean(video && !video.paused));
      policy();
    }
    policy();
    video?.addEventListener("playing", update);
    video?.addEventListener("pause", update);
    reduced.addEventListener("change", policy);
    document.addEventListener("visibilitychange", policy);
    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
      elements.forEach((el) => el.removeEventListener("animationend", finish));
      video?.removeEventListener("playing", update);
      video?.removeEventListener("pause", update);
      reduced.removeEventListener("change", policy);
      document.removeEventListener("visibilitychange", policy);
    };
  }, []);
  return available ? (
    <button
      type="button"
      className="video-control"
      aria-label={
        playing ? "Pause background motion" : "Play background motion"
      }
      onClick={() => {
        const video = document.getElementById(
          "homepage-video",
        ) as HTMLVideoElement;
        if (video.paused) void video.play().catch(() => setPlaying(false));
        else video.pause();
      }}
    >
      {playing ? "Pause motion" : "Play motion"}
    </button>
  ) : null;
}
