import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Brand } from "@/components/brand";
import { HomeMotion } from "@/components/home-motion";
import styles from "./homepage.module.css";

const homeIntroScript = `(function () {
  var root = document.documentElement;
  if (root.dataset.intro === "done") return;
  if (typeof Element.prototype.animate !== "function" || typeof matchMedia !== "function" || matchMedia("(prefers-reduced-motion: reduce)").matches) {
    root.dataset.intro = "done";
    return;
  }
  root.classList.add("intro");
  root.dataset.intro = "waiting";
  document.currentScript.dataset.guard = String(setTimeout(function () {
    root.classList.remove("intro");
    root.dataset.intro = "done";
  }, 3500));
})();`;

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: { absolute: "NanoLab — Nanomaterials. Beyond Graphene." },
  description:
    "Explore the nanoscale with NanoLab. Discover graphene, MoS₂, two-dimensional materials, and next-generation semiconductor devices through interactive simulations and scientific visualization.",
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#01061a",
  colorScheme: "dark",
};

export default function Home() {
  return (
    <>
      <link
        rel="preload"
        href="/assets/google-sans-400.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/assets/google-sans-500.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <script
        id="home-intro-init"
        // The prepaint bootstrap records its visibility-guard timer here.
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: homeIntroScript }}
      />
      <section
        className={styles.page + " cinematic-home"}
        aria-labelledby="home-headline"
      >
        <header className={styles.masthead}>
          <Brand className={styles.wordmark} />
          <div
            className={styles.hairline}
            data-home-intro="hairline"
            aria-hidden="true"
          />
          <nav className={styles.navigation} aria-label="Main navigation">
            <Link href="/foundations">Explore</Link>
            <Link href="/simulator">Simulator</Link>
            <Link href="/research">Research</Link>
          </nav>
        </header>
        <div className={styles.gap} aria-hidden="true" />
        <div className={styles.copy}>
          <h1 id="home-headline" className={styles.headline}>
            <span className="l">
              <span className="li">Nanomaterials.</span>
            </span>
            <span className="l">
              <span className="li">Beyond graphene.</span>
            </span>
          </h1>
          <p className={styles.subheading} data-home-intro="subheading">
            {
              "Explore\u00a0the\u00a0nanoscale. Discover\u00a0what\u00a0comes\u00a0next."
            }
          </p>
          <Link
            href="/foundations"
            className={styles.primary}
            data-home-intro="primary"
          >
            Explore Nanomaterials
          </Link>
          <Link
            href="/simulator"
            className={styles.secondary}
            data-home-intro="secondary"
          >
            Discover the simulator
            <svg
              viewBox="0 0 11 12.6"
              fill="none"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M5.5 .4V12 M1 7.5L5.5 12L10 7.5"
                stroke="currentColor"
                strokeWidth="1.45"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
        <div className={styles.videoField} aria-hidden="true">
          <video
            id="homepage-video"
            className={styles.video}
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261005_182549_18378239-da8f-48a7-9666-d6e0a6a88561.mp4"
            width={1619}
            height={971}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            tabIndex={-1}
          />
        </div>
        <HomeMotion />
        <noscript>
          <style>{".cinematic-home video { display: none; }"}</style>
        </noscript>
      </section>
    </>
  );
}
