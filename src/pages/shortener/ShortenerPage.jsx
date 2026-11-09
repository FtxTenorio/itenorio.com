import { useState, useEffect } from "react";

export default function Shortener() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          "https://link.itenorio.com/statistics-url",
        );
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (err) {
        console.error("Failed to load statistics:", err);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    setCopied(false);

    try {
      const response = await fetch("https://link.itenorio.com/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalUrl: url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to shorten URL");
      }

      setResult(data.shortUrl);
      setUrl("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getDomain = (urlToParse) => {
    try {
      return new URL(urlToParse).hostname;
    } catch {
      return "example.com";
    }
  };

  const recentChartData = stats?.charts?.clicksByDay?.slice(-7) || [];
  const maxChartClicks = recentChartData.reduce(
    (max, day) => Math.max(max, day.clicks),
    1,
  );

  return (
    <div className="pt-10 pb-24 text-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8 animate-fade-in flex flex-col gap-6">
        {/* TOP: STATS SUMMARY */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#121826] border border-white/5 rounded-lg p-5 flex flex-col justify-center">
            <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">
              Public Links
            </span>
            <div className="text-2xl font-bold text-white flex items-baseline gap-2">
              {loadingStats ? (
                <span className="animate-pulse bg-white/10 h-8 w-16 rounded"></span>
              ) : (
                stats?.summary?.totalLinks || 0
              )}
            </div>
          </div>

          <div className="bg-[#121826] border border-white/5 rounded-lg p-5 flex flex-col justify-center">
            <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">
              Total Clicks
            </span>
            <div className="text-2xl font-bold text-white flex items-baseline gap-2">
              {loadingStats ? (
                <span className="animate-pulse bg-white/10 h-8 w-24 rounded"></span>
              ) : (
                stats?.summary?.totalClicks || 0
              )}
            </div>
          </div>

          <div className="bg-[#121826] border border-white/5 rounded-lg p-5 flex flex-col justify-center">
            <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">
              Avg Clicks / Link
            </span>
            <div className="text-2xl font-bold text-white flex items-baseline gap-2">
              {loadingStats ? (
                <span className="animate-pulse bg-white/10 h-8 w-16 rounded"></span>
              ) : (
                stats?.summary?.averageClicksPerLink || 0
              )}
            </div>
          </div>
        </div>

        {/* MIDDLE: 3 COLUMNS DESKTOP LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT: TOP LINKS */}
          <div className="lg:col-span-3 bg-[#121826] border border-white/5 rounded-lg p-5 flex flex-col min-h-[260px]">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-6 flex items-center justify-between">
              Top Links
              <i className="fas fa-arrow-trend-up"></i>
            </h3>

            <div className="flex-1 flex flex-col gap-4">
              {loadingStats ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse flex justify-between items-center h-8"
                  >
                    <div className="bg-white/5 h-4 w-1/2 rounded"></div>
                    <div className="bg-white/5 h-4 w-8 rounded"></div>
                  </div>
                ))
              ) : stats?.topLinks?.length > 0 ? (
                stats.topLinks.map((link) => (
                  <div
                    key={link.shortCode}
                    className="flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3 overflow-hidden pr-2">
                      <img
                        src={`https://www.google.com/s2/favicons?domain=${getDomain(link.originalUrl)}&sz=32`}
                        alt={link.shortCode}
                        className="w-4 h-4 rounded-sm opacity-80 group-hover:opacity-100 transition-opacity"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />

                      <a
                        href={`https://link.itenorio.com/${link.shortCode}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-gray-300 hover:text-white transition-colors truncate flex items-center gap-2"
                        title={link.originalUrl}
                      >
                        {link.shortCode}
                        <i className="fas fa-external-link-alt text-[10px] text-gray-600 group-hover:text-gray-300 transition-colors"></i>
                      </a>
                    </div>

                    <span className="text-xs font-mono bg-white/5 px-2 py-1 rounded text-gray-400 shrink-0">
                      {link.clicks}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-600 my-auto text-center">
                  No data available.
                </div>
              )}
            </div>
          </div>

          {/* CENTER: MAIN SHORTENER */}
          <div className="lg:col-span-6 bg-[#121826] border border-white/10 rounded-lg p-8 shadow-2xl flex flex-col justify-center relative">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Create Short Link
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                Generate a clean, reliable URL.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="relative">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com/very/long/path"
                  required
                  className="w-full bg-[#0b0f19] border border-white/10 rounded-md px-4 py-4 text-white focus:outline-none focus:border-[#ff6b00]/50 transition-colors placeholder-gray-600 text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !url}
                className="w-full bg-white text-black hover:bg-gray-200 font-medium py-3.5 px-6 rounded-md transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
              >
                {loading ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  "Shorten URL"
                )}
              </button>
            </form>

            {error && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded text-red-400 text-xs flex items-center gap-2">
                <i className="fa-solid fa-circle-exclamation"></i>
                {error}
              </div>
            )}

            {result && (
              <div className="mt-6 p-4 bg-[#0b0f19] border border-[#ff6b00]/30 rounded-md animate-fade-in flex items-center justify-between gap-4">
                <a
                  href={result}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ff6b00] font-mono truncate hover:underline text-sm"
                >
                  {result}
                </a>
                <button
                  onClick={handleCopy}
                  className="shrink-0 bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded transition-colors flex items-center gap-2 text-xs font-medium"
                >
                  <i
                    className={`fa-solid ${copied ? "fa-check text-green-400" : "fa-copy"}`}
                  ></i>
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            )}
          </div>

          {/* RIGHT: CHART */}
          {/* Adicionado min-h-[260px] para forçar o card a ter altura no mobile */}
          <div className="lg:col-span-3 bg-[#121826] border border-white/5 rounded-lg p-5 flex flex-col min-h-[260px]">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-8 flex items-center justify-between">
              Traffic (7 Days)
              <i className="fas fa-chart-column"></i>
            </h3>

            {/* Trocado o flex-1 (que colapsava no mobile) por w-full, h-40 e min-h-[160px] garantindo a renderização do gráfico */}
            <div className="w-full h-40 min-h-[160px] flex items-end justify-around gap-2 mt-auto border-b border-white/5 pb-2 mb-4 relative">
              {loadingStats ? (
                <div className="w-full h-full flex items-center justify-center">
                  <i className="fas fa-spinner fa-spin text-gray-600"></i>
                </div>
              ) : recentChartData.length > 0 ? (
                recentChartData.map((day) => (
                  // flex-1 distribui o espaço certinho, min-w-[12px] impede que as barras desapareçam em celulares finos
                  <div
                    key={day.date}
                    className="flex-1 min-w-[12px] max-w-[40px] flex flex-col items-center gap-2 group relative h-full justify-end"
                  >
                    {/* Tooltip com pointer-events-none para não travar o mouse */}
                    <div className="absolute -top-8 bg-[#0b0f19] border border-white/10 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                      {day.clicks}
                    </div>

                    {/* Bar */}
                    <div
                      className="w-full bg-[#ff6b00]/30 rounded-t-sm group-hover:bg-[#ff6b00] transition-all duration-300"
                      style={{
                        height: `${Math.max((day.clicks / maxChartClicks) * 100, 4)}%`,
                      }}
                    ></div>

                    {/* Label (Day) */}
                    <span className="text-[10px] text-gray-600 absolute -bottom-6">
                      {day.date.split("-")[2]}
                    </span>
                  </div>
                ))
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-600">
                  No traffic yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
