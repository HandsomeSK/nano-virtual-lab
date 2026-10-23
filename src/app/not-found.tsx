import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container py-24">
      <p className="kicker mb-6">404 / Page not found</p>
      <h1>Page not found</h1>
      <p className="mt-6 text-muted">
        This page could not be found. Return home to choose another learning
        topic.
      </p>
      <Link href="/" className="button-primary mt-8">
        Return home
      </Link>
    </div>
  );
}
