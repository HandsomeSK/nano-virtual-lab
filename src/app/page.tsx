import type { Metadata, Viewport } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { NanoNavigation } from "@/components/site-header";
import { HomeMotion } from "@/components/home-motion";
import { HomeMaterialMotifs } from "@/components/home-material-motifs";
import styles from "./homepage.module.css";
export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: { absolute: "NanoLab — Explore Nanomaterials" },
  description:
    "Learn nanomaterial principles, inspect atomic structures and devices in the 3D Lab, and test transistor parameters with numerical simulations.",
};
export const viewport: Viewport = { themeColor: "#0c1524" };
const delay = (seconds: number) => ({ "--d": seconds + "s" }) as CSSProperties;
export default function Home() {
  return (
    <section
      className={styles.home + " nano-home"}
      aria-labelledby="home-headline"
    >
      <div className={styles.techBackdrop} aria-hidden="true" />
      <HomeMotion className={styles.media + " hero-photo"} />
      <div className={styles.page}>
        <NanoNavigation entrance />
        <div className={styles.hero} data-menu-background>
          <HomeMaterialMotifs />
          <div className={styles.copy}>
            <h1 id="home-headline" className={styles.headline}>
              <span className={styles.line}>
                <span className="appear appear--mask" style={delay(0.22)}>
                  <span className={styles.metalText}>Explore Nanomaterials</span>
                </span>
              </span>
            </h1>
            <p
              className={styles.lede + " appear appear--soft"}
              style={{ ...delay(0.46), animationDuration: "1.25s" }}
            >
              Learn the materials, inspect atomic structures and devices in the
              3D Lab, and test transistor parameters with numerical simulations.
            </p>
            <div className={styles.actions}>
              <Link
                href="/foundations"
                className="metal-button metal-solid appear appear--btn"
                style={delay(0.64)}
              >
                Let’s start
              </Link>
              <Link
                href="/lab"
                className="metal-button metal-ghost appear appear--side"
                style={delay(0.78)}
              >
                Enter the 3D Lab
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
