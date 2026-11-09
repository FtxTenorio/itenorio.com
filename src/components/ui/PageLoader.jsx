export const PageLoader = () => (
  <div
    className="min-h-[60vh] flex items-center justify-center"
    role="status"
    aria-live="polite"
  >
    <span className="h-8 w-8 rounded-full border-2 border-white/15 border-t-brand animate-spin" />
    <span className="sr-only">Loading…</span>
  </div>
);
