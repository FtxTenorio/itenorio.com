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
    <div className="max-w-2xl w-full bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.1)] rounded-2xl p-8 backdrop-blur-sm shadow-xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Shorten Your Link</h1>
        <p className="text-gray-400">
          Paste your long URL below to create a concise, easy-to-share link.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://your-very-long-url.com/..."
          required
          className="w-full bg-[#0b0f19] border border-[rgba(255,255,255,0.2)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
        />
        <button
          type="submit"
          disabled={loading || !url}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Shortening..." : "Shorten Link"}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
          <i className="fa-solid fa-circle-exclamation mr-2"></i>
          {error}
        </div>
      )}

      {result && (
        <div className="mt-6 p-6 bg-[#0b0f19] border border-[rgba(255,255,255,0.1)] rounded-xl">
          <p className="text-gray-400 text-sm mb-2">
            Your short link is ready:
          </p>
          <div className="flex items-center justify-between gap-4">
            <a
              href={result}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 font-medium truncate hover:underline"
            >
              {result}
            </a>
            <button
              onClick={handleCopy}
              className="shrink-0 bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)] text-white px-4 py-2 rounded-md transition-colors flex items-center gap-2"
            >
              <i
                className={`fa-solid ${copied ? "fa-check text-green-400" : "fa-copy"}`}
              ></i>
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
