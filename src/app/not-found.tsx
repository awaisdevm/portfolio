import "@/styles/globals.css";

import Link from "next/link";

export default function GlobalNotFound() {
  return (
    <section className="container-page flex min-h-[70vh] flex-col items-center justify-center text-center px-4 py-20">
      <p className="eyebrow">
        404 Error
      </p>

      <h1 className="mt-4 font-display text-3xl font-semibold sm:text-4xl text-heading">
        Page not found
      </h1>

      <p className="mt-3 max-w-sm text-muted">
        The page you are looking for doesn't exist or has been moved.
      </p>

      <Link href="/en" className="btn-primary mt-8 min-h-[44px]">
        Back to Home
      </Link>
    </section>
  );
}