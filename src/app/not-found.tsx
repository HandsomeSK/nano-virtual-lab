import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container py-24">
      <p className="eyebrow mb-6">404 / Page not found</p>
      <h1 className="page-title">A little off course.</h1>
      <p className="mt-6 text-muted">
        This page could not be found. Head back to the lab to continue
        exploring.
      </p>
      <Link href="/" className="button-primary mt-8">
        Return to the lab
      </Link>
    </div>
  );
}
