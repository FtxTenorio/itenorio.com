import { useState } from "react";

/**
 * Real store screenshots of an extension, with tabs to switch between them.
 * `screenshots`: [{ src, label, alt }] from src/data/extensions.js.
 */
export function ScreenshotGallery({ screenshots, accent = "#ff6b00", eager = false }) {
  const [active, setActive] = useState(0);
  if (!screenshots?.length) return null;
  const current = screenshots[active];

  return (
    <figure className="w-full">
      <div
        className="relative overflow-hidden rounded-xl border border-white/10 bg-ink shadow-2xl aspect-[16/10]"
        style={{ boxShadow: `0 25px 60px -20px ${accent}40` }}
      >
        {screenshots.map((shot, index) => (
          <img
            key={shot.src}
            src={shot.src}
            alt={shot.alt}
            width="1280"
            height="800"
            loading={eager && index === 0 ? "eager" : "lazy"}
            decoding="async"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              index === active ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={index !== active}
          />
        ))}
      </div>

      {screenshots.length > 1 && (
        <div
          className="mt-4 flex flex-wrap justify-center gap-2"
          role="tablist"
          aria-label="Screenshots"
        >
          {screenshots.map((shot, index) => (
            <button
              key={shot.src}
              type="button"
              role="tab"
              aria-selected={index === active}
              onClick={() => setActive(index)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                index === active
                  ? "text-white border-transparent"
                  : "text-gray-400 border-white/10 bg-white/5 hover:text-white"
              }`}
              style={index === active ? { backgroundColor: accent } : undefined}
            >
              {shot.label}
            </button>
          ))}
        </div>
      )}
      <figcaption className="sr-only">{current.alt}</figcaption>
    </figure>
  );
}
