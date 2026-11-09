import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-24 sm:py-32 text-center">
      <p className="font-mono text-sm text-brand-soft mb-3">404</p>
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
        Page not found
      </h1>
      <p className="text-gray-400 mb-10">
        The page you are looking for does not exist or has moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-brand hover:bg-[#0a86ee] font-semibold transition-colors"
      >
        <i className="fas fa-arrow-left text-sm" aria-hidden="true" />
        Back to home
      </Link>
    </section>
  );
}
