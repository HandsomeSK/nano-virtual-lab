"use client";

import { useEffect, useRef, useState } from "react";
import styles from "@/app/homepage.module.css";

export function HomeMotion() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const pausedByUser = useRef(false);
  const [playback, setPlayback] = useState<
    "unavailable" | "playing" | "paused"
  >("unavailable");

  useEffect(() => {
    const root = document.documentElement;
    const page = document.querySelector<HTMLElement>(".cinematic-home");
    const video = page?.querySelector<HTMLVideoElement>("#homepage-video");
    if (!page || !video) return;
    videoRef.current = video;
    video.muted = true;
    const preference =
      typeof matchMedia === "function"
        ? matchMedia("(prefers-reduced-motion: reduce)")
        : null;
    let disposed = false;
    let started = false;
    let finished = false;
    let readinessTimer = 0;
    let safetyTimer = 0;
    let readyListener: (() => void) | undefined;
    const animations: Animation[] = [];
    const bootstrap = document.getElementById("home-intro-init");
    clearTimeout(Number(bootstrap?.dataset.guard || 0));

    function removeReadyListeners() {
      if (!readyListener) return;
      video!.removeEventListener("loadeddata", readyListener);
      video!.removeEventListener("error", readyListener);
      readyListener = undefined;
    }
    function finish(releaseLayers = false) {
      if (finished) return;
      finished = true;
      clearTimeout(readinessTimer);
      clearTimeout(safetyTimer);
      removeReadyListeners();
      root.classList.remove("intro");
      root.dataset.intro = "done";
      for (const animation of animations) animation.cancel();
      // Only release the mask layers when doing so cannot disturb keyboard focus.
      if (releaseLayers && !page!.contains(document.activeElement)) {
        const display = page!.style.display;
        page!.style.display = "none";
        void page!.offsetHeight;
        page!.style.display = display;
      }
    }
    function start() {
      if (disposed || started || finished) return;
      started = true;
      clearTimeout(readinessTimer);
      removeReadyListeners();
      root.dataset.intro = "running";
      const logo = page!.querySelector<HTMLElement>(".brand")!;
      const k = Math.min(
        1,
        Math.max(0.65, logo.getBoundingClientRect().height / 23.5),
      );
      const smooth = "cubic-bezier(0.22, 1, 0.36, 1)";
      const rise = "cubic-bezier(0.16, 1, 0.3, 1)";
      function animate(
        element: Element | null,
        frames: Keyframe[],
        duration: number,
        delay: number,
        easing: string,
      ) {
        if (element)
          animations.push(
            element.animate(frames, { duration, delay, easing, fill: "both" }),
          );
      }
      try {
        animate(
          logo,
          [
            {
              opacity: 0,
              transform:
                "translateX(calc(-0.5 * var(--u))) translateY(" +
                -6 * k +
                "px)",
            },
            { opacity: 1, transform: "translateX(calc(-0.5 * var(--u)))" },
          ],
          900,
          60,
          smooth,
        );
        animate(
          page!.querySelector('[data-home-intro="hairline"]'),
          [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }],
          1000,
          180,
          "cubic-bezier(0.7, 0, 0.2, 1)",
        );
        page!.querySelectorAll("nav a").forEach((link, index) => {
          animate(
            link,
            [
              { opacity: 0, transform: "translateY(" + -4 * k + "px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            700,
            index === 1 ? 420 : 490,
            smooth,
          );
        });
        page!.querySelectorAll(".li").forEach((line, index) => {
          animate(
            line,
            [{ transform: "translateY(104%)" }, { transform: "translateY(0)" }],
            1100,
            index === 0 ? 200 : 290,
            rise,
          );
        });
        animate(
          page!.querySelector('[data-home-intro="subheading"]'),
          [
            { opacity: 0, transform: "translateY(" + 10 * k + "px)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          850,
          700,
          smooth,
        );
        animate(
          page!.querySelector('[data-home-intro="primary"]'),
          [
            {
              opacity: 0,
              transform: "translateY(" + 12 * k + "px) scale(0.975)",
            },
            { opacity: 1, transform: "translateY(0) scale(1)" },
          ],
          900,
          860,
          rise,
        );
        animate(
          page!.querySelector('[data-home-intro="secondary"]'),
          [
            { opacity: 0, transform: "translateY(" + 6 * k + "px)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          700,
          1040,
          smooth,
        );
        animate(
          page!.querySelector('[data-home-intro="secondary"] svg'),
          [
            { transform: "translateY(" + -5 * k + "px)" },
            { transform: "translateY(0)" },
          ],
          820,
          1120,
          rise,
        );
        void Promise.allSettled(
          animations.map((animation) => animation.finished),
        ).then(() => {
          if (!disposed) finish(true);
        });
      } catch {
        finish();
      }
    }
    function syncPlayback() {
      if (!disposed)
        setPlayback(
          preference?.matches || video!.error
            ? "unavailable"
            : video!.paused
              ? "paused"
              : "playing",
        );
    }
    function playVideo() {
      if (preference?.matches || pausedByUser.current || document.hidden) {
        video!.pause();
        return;
      }
      void video!
        .play()
        .then(syncPlayback)
        .catch(() => {
          if (!disposed) setPlayback("unavailable");
        });
    }
    function motionChanged() {
      if (preference?.matches) finish();
      playVideo();
      syncPlayback();
    }
    function interrupted() {
      finish();
    }

    video.addEventListener("playing", syncPlayback);
    video.addEventListener("pause", syncPlayback);
    video.addEventListener("error", syncPlayback);
    preference?.addEventListener?.("change", motionChanged);
    document.addEventListener("visibilitychange", playVideo);
    page.addEventListener("focusin", interrupted);
    page.addEventListener("pointerdown", interrupted);
    playVideo();

    if (
      root.dataset.intro !== "waiting" ||
      preference?.matches ||
      !preference ||
      typeof Element.prototype.animate !== "function"
    ) {
      finish();
    } else {
      root.classList.add("intro");
      const mediaReady =
        video.readyState >= 2 || video.error
          ? Promise.resolve()
          : new Promise<void>((resolve) => {
              readyListener = resolve;
              video.addEventListener("loadeddata", readyListener, {
                once: true,
              });
              video.addEventListener("error", readyListener, { once: true });
            });
      readinessTimer = window.setTimeout(start, 900);
      safetyTimer = window.setTimeout(() => finish(), 3500);
      void Promise.all([document.fonts?.ready || Promise.resolve(), mediaReady])
        .then(start)
        .catch(start);
    }

    return () => {
      disposed = true;
      // StrictMode reattaches effects while the same page remains connected.
      // Let that fresh effect own an intro that has not started yet.
      if (
        !started &&
        !finished &&
        page.isConnected &&
        root.dataset.intro === "waiting"
      ) {
        clearTimeout(readinessTimer);
        clearTimeout(safetyTimer);
        removeReadyListeners();
      } else {
        finish();
      }
      video.removeEventListener("playing", syncPlayback);
      video.removeEventListener("pause", syncPlayback);
      video.removeEventListener("error", syncPlayback);
      preference?.removeEventListener?.("change", motionChanged);
      document.removeEventListener("visibilitychange", playVideo);
      page.removeEventListener("focusin", interrupted);
      page.removeEventListener("pointerdown", interrupted);
      video.pause();
      videoRef.current = null;
    };
  }, []);

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;
    pausedByUser.current = !video.paused;
    if (pausedByUser.current) video.pause();
    else void video.play().catch(() => setPlayback("unavailable"));
  }
  const label =
    playback === "playing" ? "Pause background video" : "Play background video";

  return (
    <button
      type="button"
      className={styles.motionControl}
      hidden={playback === "unavailable"}
      aria-label={label}
      title={label}
      onClick={togglePlayback}
    >
      <svg
        viewBox="0 0 16 16"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        {playback === "playing" ? (
          <path d="M4 2h3v12H4zM9 2h3v12H9z" />
        ) : (
          <path d="m4 2 10 6-10 6z" />
        )}
      </svg>
    </button>
  );
}
