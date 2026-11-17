import { useEffect, useRef, useState } from "react";
import { GlowBubbles, SectionWave } from "../../components/ui/SectionDecor";
import { ChartBackdrop, LinkBackdrop } from "../../components/ui/ThemedBackdrops";
import { SwipeRow } from "../../components/ui/SwipeRow";
import { useReveal } from "../../hooks/useReveal";
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
      {/* long URLs going in on the left, short links coming out on the right */}
      <div className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden md:block" aria-hidden="true">
        <LinkBackdrop />
      </div>
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

/**
 * The most clicked links, as a row of cards under the chart (a swipe row on
 * phones): rank, favicon, code, destination, clicks and a bar with each
 * link's share of the most clicked one (it fills in with the chart).
 */
function TopLinks({ stats, loadingStats }) {
  const links = stats?.topLinks ?? [];
  const top = links.reduce((m, link) => Math.max(m, link.clicks), 1);

  return (
    <div className="mt-5">
      <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
        <i className="fas fa-arrow-trend-up text-crunchy" aria-hidden="true" />
        Most clicked
      </h3>

      {loadingStats ? (
        <SwipeRow label="Most clicked links" gridClassName="md:grid-cols-5">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="h-32 rounded-xl border border-white/10 bg-surface/80 p-4">
              <Skeleton className="mb-3 h-8 w-8" />
              <Skeleton className="mb-2 h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </SwipeRow>
      ) : links.length > 0 ? (
        <SwipeRow label="Most clicked links" gridClassName="md:grid-cols-5">
          {links.map((link, index) => (
            <a
              key={link.shortCode}
              href={`${API}/${link.shortCode}`}
              target="_blank"
              rel="noopener noreferrer"
              className="reveal-item group relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-surface/80 p-4 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-crunchy/50"
              style={{ "--reveal-delay": `${0.5 + index * 0.08}s` }}
            >
              <span className="mb-3 flex items-center gap-2">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-ink">
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${getDomain(link.originalUrl)}&sz=32`}
                    alt=""
                    className="h-4 w-4 rounded-sm"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </span>
                <span className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-bold ${index === 0 ? "bg-crunchy/20 text-crunchy" : "bg-white/5 text-gray-400"}`}>
                  #{index + 1}
                </span>
              </span>
              <span className="truncate font-mono text-sm font-semibold text-white" title={link.shortCode}>
                /{link.shortCode}
              </span>
              <span className="mb-3 truncate text-xs text-gray-500">{getDomain(link.originalUrl)}</span>
              <span className="mt-auto flex items-baseline justify-between gap-2">
                <span className="text-2xl font-bold text-white">{link.clicks}</span>
                <span className="text-[11px] text-gray-500">clicks</span>
              </span>
              <span className="mt-2 block h-1 overflow-hidden rounded-full bg-white/5" aria-hidden="true">
                <span
                  className="share-bar block h-full rounded-full bg-gradient-to-r from-crunchy/60 to-crunchy"
                  style={{ width: `${(link.clicks / top) * 100}%`, animationDelay: `${0.6 + index * 0.08}s` }}
                />
              </span>
            </a>
          ))}
        </SwipeRow>
      ) : (
        <p className="rounded-xl border border-white/10 bg-surface/80 p-6 text-center text-sm text-gray-500">No data available.</p>
      )}
    </div>
  );
}

// Bars are buttons: on a phone there is no hover, so a tap selects a day and
// its number stays visible (above the bar and in the line under the title).
// Tapping the selected bar again goes back to the total.
function TrafficChart({ stats, loadingStats }) {
  const days = stats?.charts?.clicksByDay?.slice(-CHART_DAYS) || [];
  const max = days.reduce((m, day) => Math.max(m, day.clicks), 1);
  const total = days.reduce((sum, day) => sum + day.clicks, 0);
  const [selected, setSelected] = useState(null);
  const selectedDay = days.find((day) => day.date === selected);

  return (
    <div className="flex flex-col rounded-2xl border border-white/10 bg-surface/80 p-5 sm:p-6 backdrop-blur">
      <h3 className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-gray-500">
        Clicks per day
        <i className="fas fa-chart-column" aria-hidden="true" />
      </h3>
      <p className="mb-6 min-h-5 text-sm text-gray-400 lg:mb-4" aria-live="polite">
        {loadingStats ? (
          "Loading…"
        ) : selectedDay ? (
          <>
            <span className="font-semibold text-white">
              {selectedDay.clicks} {selectedDay.clicks === 1 ? "click" : "clicks"}
            </span>{" "}
            on {formatDay(selectedDay.date)}
          </>
        ) : days.length > 0 ? (
          `${total} clicks in the last ${days.length} days · tap a bar for the day`
        ) : (
          "No traffic yet."
        )}
      </p>

      <div className="relative mb-7 flex h-44 w-full items-end justify-around gap-1 sm:gap-2 border-b border-white/5 pb-2 lg:h-36">
        {loadingStats ? (
          <div className="flex h-full w-full items-center justify-center">
            <i className="fas fa-spinner fa-spin text-gray-600" aria-hidden="true" />
          </div>
        ) : (
          days.map((day, index) => {
            const isSelected = day.date === selected;
            return (
              <button
                key={day.date}
                type="button"
                onClick={() => setSelected(isSelected ? null : day.date)}
                aria-pressed={isSelected}
                aria-label={`${formatDay(day.date)}: ${day.clicks} clicks`}
                className="group relative flex h-full min-w-[14px] max-w-[48px] flex-1 flex-col items-center justify-end rounded-t-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crunchy"
              >
                <span
                  className={`pointer-events-none absolute z-10 whitespace-nowrap rounded border border-white/10 bg-ink px-1.5 py-0.5 font-mono text-xs text-white transition-opacity ${
                    isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                  style={{ bottom: `calc(${Math.max((day.clicks / max) * 100, 4)}% + 0.375rem)` }}
                  aria-hidden="true"
                >
                  {day.clicks}
                </span>
                {/* grows from the floor when the chart comes into view */}
                <span
                  className={`chart-bar block w-full rounded-t-sm bg-gradient-to-t transition-colors duration-300 ${
                    isSelected ? "from-crunchy to-[#ffa25c]" : "from-crunchy/25 to-crunchy/50 group-hover:from-crunchy/60 group-hover:to-crunchy/80"
                  }`}
                  style={{ height: `${Math.max((day.clicks / max) * 100, 4)}%`, animationDelay: `${index * 45}ms` }}
                  aria-hidden="true"
                />
                <span
                  className={`absolute -bottom-6 text-[10px] ${isSelected ? "text-white" : "text-gray-600"}`}
                  aria-hidden="true"
                >
                  {day.date.split("-")[2]}
                </span>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}

/** Screen 2: public statistics: clicks per day, then the most clicked links. */
function Statistics({ stats, loadingStats }) {
  const bodyRef = useRef(null);
  useReveal(bodyRef, { threshold: 0.25 }); // the chart grows in when seen

  return (
    <section
      id="statistics"
      className="snap-section relative isolate scroll-mt-16 py-16 pb-24 sm:py-24 sm:pb-32 md:scroll-mt-20 lg:pt-6 lg:pb-20"
      style={{ backgroundColor: HOME_BG.alt }}
      aria-labelledby="statistics-title"
    >
      <GlowBubbles
        bubbles={[
          { color: "#0078d7", className: "top-[10%] -left-32 w-[28rem] h-[28rem]" },
          { color: "#ff6b00", className: "-bottom-20 right-[10%] w-[22rem] h-[22rem]" },
        ]}
      />
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <ChartBackdrop />
      </div>
      <SectionWave fill={HOME_BG.footer} flip />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="mb-6 max-w-2xl lg:mb-5">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-brand-soft">
            Statistics
          </p>
          <h2 id="statistics-title" className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            How the links are doing
          </h2>
          <p className="mt-4 text-gray-400">
            Public numbers for the links created here: the traffic of the last
            days and the most clicked links.
          </p>
        </header>

        <div ref={bodyRef}>
          <TrafficChart stats={stats} loadingStats={loadingStats} />
          <TopLinks stats={stats} loadingStats={loadingStats} />
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
