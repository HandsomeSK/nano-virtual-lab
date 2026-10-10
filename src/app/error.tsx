"use client";
import Link from "next/link";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="container page-shell">
      <h1>This page could not load.</h1>
      <p className="mt-5">Try again, or return to the learning journey.</p>
      <div className="actions">
        <button className="button-primary" onClick={reset}>
          Try again
        </button>
        <Link className="button-secondary" href="/">
          Home
        </Link>
      </div>
    </div>
  );
}
