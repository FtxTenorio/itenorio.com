import { useEffect, useState } from "react";
import { GlowBubbles, SectionWave } from "../../components/ui/SectionDecor";
import { HOME_BG } from "../../config/theme";
import { useSectionPaging } from "../../hooks/useSectionPaging";

const API = "https://link.itenorio.com";
const CHART_DAYS = 14;

const getDomain = (urlToParse) => {
  try {
    return new URL(urlToParse).hostname;
  } catch {
    return "example.com";
  }
};

const formatDay = (date) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric" });

const Skeleton = ({ className }) => (
  <span className={`inline-block animate-pulse rounded bg-white/10 ${className}`} />
);

/** Screen 1: the shortener form, alone and centered on the first screen. */
function CreateLink({ stats, loadingStats }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    setCopied(false);

    try {
      const response = await fetch(`${API}/links`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalUrl: url }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to shorten URL");
      setResult(data.shortUrl);
      setUrl("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const summary = [
    ["Public links", stats?.summary?.totalLinks],
    ["Total clicks", stats?.summary?.totalClicks],
    ["Avg clicks / link", stats?.summary?.averageClicksPerLink],
  ];

  return (
    <section
      className="snap-section relative isolate flex min-h-[calc(100svh-4rem)] flex-col justify-center pb-24 pt-10 sm:pb-32 md:min-h-[calc(100svh-5rem)]"
      style={{ backgroundColor: HOME_BG.base }}
      aria-labelledby="shortener-title"
    >
      <GlowBubbles
        bubbles={[
          { color: "#ff6b00", className: "-top-24 left-1/4 w-[32rem] h-[22rem]" },
          { color: "#0078d7", className: "bottom-[10%] -right-32 w-[26rem] h-[26rem]" },
        ]}
      />
      <SectionWave fill={HOME_BG.alt} />

      <div className="relative z-10 mx-auto w-full max-w-2xl px-4 sm:px-6 text-center">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-brand-soft">
          Free tool
        </p>
        <h1 id="shortener-title" className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Shorten a link
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-gray-400">
          Paste a long URL and get a clean <span className="font-mono text-gray-300">link.itenorio.com</span>{" "}
          link to share. No account needed.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col gap-3 rounded-2xl border border-white/10 bg-surface/80 p-3 shadow-2xl backdrop-blur sm:flex-row"
        >
          <label htmlFor="shortener-url" className="sr-only">
            URL to shorten
          </label>
          <input
            id="shortener-url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/very/long/path"
            required
            className="min-w-0 flex-1 rounded-xl border border-white/10 bg-ink px-4 py-4 text-sm text-white placeholder-gray-600 transition-colors focus:border-crunchy/60 focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading || !url}
            className="flex items-center justify-center gap-2 rounded-xl bg-crunchy px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#ff7d1f] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <i className="fas fa-spinner fa-spin" aria-hidden="true" />
            ) : (
              <i className="fas fa-link" aria-hidden="true" />
            )}
            Shorten URL
          </button>
        </form>

        <div aria-live="polite">
          {error && (
            <p className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
              <i className="fa-solid fa-circle-exclamation" aria-hidden="true" />
              {error}
            </p>
          )}

          {result && (
            <div className="mt-4 flex animate-fade-in items-center justify-between gap-4 rounded-xl border border-crunchy/30 bg-ink p-4 text-left">
              <a
                href={result}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate font-mono text-sm text-crunchy hover:underline"
              >
                {result}
              </a>
              <button
                type="button"
                onClick={handleCopy}
                className="flex shrink-0 items-center gap-2 rounded-md bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/20"
              >
                <i
                  className={`fa-solid ${copied ? "fa-check text-green-400" : "fa-copy"}`}
                  aria-hidden="true"
                />
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          )}
        </div>

        <dl className="mx-auto mt-10 grid max-w-xl grid-cols-3 gap-px overflow-hidden rounded-xl border border-line bg-line">
          {summary.map(([label, value]) => (
            <div key={label} className="bg-ink px-3 py-3 sm:px-5">
              <dt className="text-[11px] text-gray-500 sm:text-xs">{label}</dt>
              <dd className="text-lg font-semibold text-white">
                {loadingStats ? <Skeleton className="h-6 w-10 align-middle" /> : (value ?? 0)}
              </dd>
            </div>
          ))}
        </dl>

        <a
          href="#statistics"
          className="mt-6 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
        >
          See statistics
          <i className="fas fa-arrow-down text-xs" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

function TopLinks({ stats, loadingStats }) {
  return (
    <div className="flex flex-col rounded-2xl border border-white/10 bg-surface/80 p-6 backdrop-blur">
      <h3 className="mb-6 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-gray-500">
        Top links
        <i className="fas fa-arrow-trend-up" aria-hidden="true" />
      </h3>

      <ol className="flex flex-1 flex-col gap-4">
        {loadingStats ? (
          Array.from({ length: 5 }).map((_, i) => (
            <li key={i} className="flex h-8 items-center justify-between">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-8" />
            </li>
          ))
        ) : stats?.topLinks?.length > 0 ? (
          stats.topLinks.map((link) => (
            <li key={link.shortCode} className="group flex items-center justify-between">
              <div className="flex items-center gap-3 overflow-hidden pr-2">
                <img
                  src={`https://www.google.com/s2/favicons?domain=${getDomain(link.originalUrl)}&sz=32`}
                  alt=""
                  className="h-4 w-4 rounded-sm opacity-80 transition-opacity group-hover:opacity-100"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                <a
                  href={`${API}/${link.shortCode}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 truncate text-sm font-medium text-gray-300 transition-colors hover:text-white"
                  title={link.originalUrl}
                >
                  {link.shortCode}
                  <i
                    className="fas fa-external-link-alt text-[10px] text-gray-600 transition-colors group-hover:text-gray-300"
                    aria-hidden="true"
                  />
                </a>
              </div>
              <span className="shrink-0 rounded bg-white/5 px-2 py-1 font-mono text-xs text-gray-400">
                {link.clicks}
              </span>
            </li>
          ))
        ) : (
          <li className="my-auto text-center text-sm text-gray-600">No data available.</li>
        )}
      </ol>
    </div>
  );
}

function TrafficChart({ stats, loadingStats }) {
  const days = stats?.charts?.clicksByDay?.slice(-CHART_DAYS) || [];
  const max = days.reduce((m, day) => Math.max(m, day.clicks), 1);
  const total = days.reduce((sum, day) => sum + day.clicks, 0);

  return (
    <div className="flex flex-col rounded-2xl border border-white/10 bg-surface/80 p-6 backdrop-blur">
      <h3 className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-gray-500">
        Clicks per day
        <i className="fas fa-chart-column" aria-hidden="true" />
      </h3>
      <p className="mb-8 text-sm text-gray-400">
        {loadingStats
          ? "Loading…"
          : days.length > 0
            ? `${total} clicks in the last ${days.length} days`
            : "No traffic yet."}
      </p>

      <div className="relative mb-8 flex h-56 w-full items-end justify-around gap-2 border-b border-white/5 pb-2">
        {loadingStats ? (
          <div className="flex h-full w-full items-center justify-center">
            <i className="fas fa-spinner fa-spin text-gray-600" aria-hidden="true" />
          </div>
        ) : (
          days.map((day) => (
            <div
              key={day.date}
              className="group relative flex h-full min-w-[12px] max-w-[48px] flex-1 flex-col items-center justify-end"
            >
              <div className="pointer-events-none absolute -top-8 z-10 whitespace-nowrap rounded border border-white/10 bg-ink px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                {day.clicks} · {formatDay(day.date)}
              </div>
              <div
                className="w-full rounded-t-sm bg-crunchy/30 transition-all duration-300 group-hover:bg-crunchy"
                style={{ height: `${Math.max((day.clicks / max) * 100, 4)}%` }}
                aria-label={`${formatDay(day.date)}: ${day.clicks} clicks`}
              />
              <span className="absolute -bottom-6 text-[10px] text-gray-600">
                {day.date.split("-")[2]}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/** Screen 2: public statistics of every link. */
function Statistics({ stats, loadingStats }) {
  return (
    <section
      id="statistics"
      className="snap-section relative isolate scroll-mt-16 py-16 pb-24 sm:py-24 sm:pb-32 md:scroll-mt-20 lg:py-4"
      style={{ backgroundColor: HOME_BG.alt }}
      aria-labelledby="statistics-title"
    >
      <GlowBubbles
        bubbles={[
          { color: "#0078d7", className: "top-[10%] -left-32 w-[28rem] h-[28rem]" },
          { color: "#ff6b00", className: "-bottom-20 right-[10%] w-[22rem] h-[22rem]" },
        ]}
      />
      <SectionWave fill={HOME_BG.footer} flip />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8 max-w-2xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-brand-soft">
            Statistics
          </p>
          <h2 id="statistics-title" className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            How the links are doing
          </h2>
          <p className="mt-4 text-gray-400">
            Public numbers for the links created here: the most clicked ones and
            the traffic of the last days.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.6fr]">
          <TopLinks stats={stats} loadingStats={loadingStats} />
          <TrafficChart stats={stats} loadingStats={loadingStats} />
        </div>
      </div>
    </section>
  );
}

// /shortener: the form fills the first screen; the statistics are one
// screen below (one scroll gesture on desktop, see useSectionPaging).
export default function ShortenerPage() {
  useSectionPaging();
  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch(`${API}/statistics-url`)
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (!cancelled && data) setStats(data);
      })
      .catch((err) => console.error("Failed to load statistics:", err))
      .finally(() => {
        if (!cancelled) setLoadingStats(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="text-gray-200 animate-fade-in">
      <CreateLink stats={stats} loadingStats={loadingStats} />
      <Statistics stats={stats} loadingStats={loadingStats} />
    </div>
  );
}
