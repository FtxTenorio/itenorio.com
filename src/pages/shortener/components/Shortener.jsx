import { useState } from "react";

export default function Shortener() {
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
      const response = await fetch("https://link.itenorio.com/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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

  return (
    <div className="mt-20">
      <main className="px-4 pt-10 pb-24 max-w-5xl mx-auto flex flex-col lg:flex-row gap-8 items-start w-full animate-fade-in">
        {/* Lado Esquerdo: Ferramenta */}
        <div className="w-full lg:w-3/5 bg-[#121826] border border-white/10 p-6 md:p-8 rounded-md shadow-sm">
          <div className="mb-8 border-b border-white/10 pb-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-2 text-white tracking-tight">
              Link Shortener
            </h1>
            <p className="text-gray-400 text-sm">
              Paste your long URL below to create a concise link.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://your-very-long-url.com/..."
              required
              className="w-full bg-[#0b0f19] border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-[#ff6b00]/50 transition-colors placeholder-gray-600 text-sm"
            />
            <button
              type="submit"
              disabled={loading || !url}
              className="w-full bg-white/5 border border-white/10 hover:bg-[#ff6b00] hover:border-[#ff6b00] hover:text-white text-gray-300 font-semibold py-3 px-6 rounded-sm transition-all duration-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Shortening...
                </>
              ) : (
                <>
                  <i className="fas fa-link"></i> Shorten Link
                </>
              )}
            </button>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-sm text-red-400 text-sm flex items-center gap-3 animate-fade-in">
              <i className="fa-solid fa-circle-exclamation"></i>
              {error}
            </div>
          )}

          {result && (
            <div className="mt-6 p-6 bg-[#0b0f19] border border-[#ff6b00]/30 rounded-sm animate-fade-in">
              <p className="text-gray-400 text-xs uppercase tracking-wider font-semibold mb-3">
                Ready to share
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <a
                  href={result}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ff6b00] font-medium truncate hover:underline text-lg max-w-full"
                >
                  {result}
                </a>
                <button
                  onClick={handleCopy}
                  className="shrink-0 bg-white/5 border border-white/10 hover:bg-white/10 text-white px-4 py-2 rounded-sm transition-colors flex items-center gap-2 text-sm w-full sm:w-auto justify-center"
                >
                  <i
                    className={`fa-solid ${copied ? "fa-check text-green-400" : "fa-copy"}`}
                  ></i>
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Lado Direito: Explicação Simples e Passo a Passo */}
        <div className="w-full lg:w-2/5 flex flex-col gap-6">
          {/* Explicação Honesta */}
          <div className="bg-[#121826] border border-white/10 p-6 rounded-md shadow-sm border-l-4 border-l-[#0078d7]">
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <i className="fas fa-info-circle text-[#0078d7]"></i>
              Personal Utility
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              I built this simple tool just to shorten URLs without relying on
              third-party services. It does exactly one thing: makes long links
              short and clean.
            </p>
          </div>

          {/* Passo a Passo Lateral */}
          <div className="bg-[#121826] border border-white/10 p-6 rounded-md shadow-sm">
            <h3 className="text-lg font-bold text-white mb-4">How it works</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="bg-white/5 border border-white/10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-gray-400">
                  1
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-200">
                    Paste URL
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Drop your long link into the input field.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-white/5 border border-white/10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-gray-400">
                  2
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-200">
                    Shorten
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Click the button to generate a clean link.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-white/5 border border-white/10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[#ff6b00]">
                  3
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-200">
                    Copy & Share
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Copy the new link and use it wherever you need.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
