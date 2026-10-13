import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { NanoNavigation } from "@/components/site-header";
import { HomeMotion } from "@/components/home-motion";
import { ScienceIcon } from "@/components/science-icon";
import styles from "./homepage.module.css";
export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: { absolute: "NanoLab — Explore Nanomaterials" },
  description:
    "Discover the structures, properties, and possibilities of matter at the nanoscale through immersive 3D exploration and interactive science.",
};
const delay = (seconds: number) => ({ "--d": seconds + "s" }) as CSSProperties;
export default function Home() {
  return (
    <section
      className={styles.home + " nano-home"}
      aria-labelledby="home-headline"
    >
      <HomeMotion className={styles.media + " hero-photo"} />
      <div className={styles.page}>
        <NanoNavigation entrance />
        <div className={styles.hero} data-menu-background>
          <div className={styles.copy}>
            <span
              className={styles.badge + " appear appear--pop"}
              style={delay(0.22)}
            >
              <svg
                className="badge-star"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2.6C12.55 2.6 12.88 3.15 13.08 4.7c.62 4.7 1.52 5.6 6.22 6.22 1.55.2 2.1.53 2.1 1.08s-.55.88-2.1 1.08c-4.7.62-5.6 1.52-6.22 6.22-.2 1.55-.53 2.1-1.08 2.1s-.88-.55-1.08-2.1c-.62-4.7-1.52-5.6-6.22-6.22C3.15 12.88 2.6 12.55 2.6 12s.55-.88 2.1-1.08c4.7-.62 5.6-1.52 6.22-6.22C11.12 3.15 11.45 2.6 12 2.6Z" />
              </svg>
              THE NANOSCALE, REIMAGINED
            </span>
            <h1 id="home-headline" className={styles.headline}>
              <span className={styles.line}>
                <span className="appear appear--mask" style={delay(0.42)}>
                  Explore nanomaterials.
                </span>
              </span>
            </h1>
            <p
              className={styles.lede + " appear appear--soft"}
              style={{ ...delay(0.82), animationDuration: "1.25s" }}
            >
              Discover the structures, properties, and possibilities of matter
              at the nanoscale through immersive 3D exploration and interactive
              science.
            </p>
            <div className={styles.actions}>
              <Link
                href="/foundations"
                className="metal-button metal-solid appear appear--btn"
                style={delay(0.96)}
              >
                Explore Nanomaterials
              </Link>
              <Link
                href="/lab"
                className="metal-button metal-ghost appear appear--side"
                style={delay(1.1)}
              >
                Enter the 3D Lab
              </Link>
            </div>
          </div>
        </div>
        <footer
          className={styles.stats}
          data-menu-background
          aria-label="Explore NanoLab capabilities"
        >
          {[
            {
              icon: "lattice" as const,
              label: "Explore Atomic Structures",
              href: "/lab?material=graphene",
            },
            {
              icon: "layers" as const,
              label: "Inspect a Transistor",
              href: "/device",
            },
            {
              icon: "discovery" as const,
              label: "Discover Research Breakthroughs",
              href: "/research",
            },
          ].map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.stat + " appear appear--stat"}
              style={delay(1.12 + i * 0.16)}
            >
              <ScienceIcon name={item.icon} />
              <span>{item.label}</span>
            </Link>
          ))}
        </footer>
      </div>
    </section>
  );
}
