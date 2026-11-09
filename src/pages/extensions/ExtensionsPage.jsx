import { useState } from "react";
import { extensions } from "../../data/extensions";
import { ExtensionPreview } from "./components/ExtensionPreview";

// /extensions — catalogue of browser extensions.
// Details of each published extension live at /extensions/:slug.
export default function ExtensionsPage() {
  const [previewId, setPreviewId] = useState(extensions[0].id);
  const activePreview =
    extensions.find((ext) => ext.id === previewId) ?? extensions[0];

  return (
    <div className="text-white pt-10 pb-24 w-full">
      <div className="px-4 md:px-6 max-w-6xl mx-auto w-full animate-fade-in">
        <header className="mb-10">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-soft mb-3">
            Products
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
            Browser Extensions
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl">
            Small, focused tools that make the sites you already use better.
            Free to use, private by design and maintained by iTenorio Tech.
          </p>
        </header>

        {/* Mobile / tablet: stacked cards */}
        <div className="flex lg:hidden flex-col gap-8 w-full">
          {extensions.map((ext) => (
            <ExtensionPreview key={ext.id} ext={ext} />
          ))}
        </div>

        {/* Desktop: list + preview */}
        <div className="hidden lg:flex flex-row gap-10 w-full items-start">
          <div className="w-1/3 flex flex-col gap-3">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 px-1">
              Available Tools
            </h2>
            {extensions.map((ext) => (
              <button
                type="button"
                key={ext.id}
                onClick={() => setPreviewId(ext.id)}
                aria-pressed={previewId === ext.id}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 text-left w-full ${
                  previewId === ext.id
                    ? "bg-white/10 border-white/20 shadow-lg"
                    : "bg-surface border-white/5 hover:border-white/10 hover:bg-white/5"
                }`}
              >
                <div className="w-12 h-12 rounded-lg bg-ink border border-white/5 flex items-center justify-center shrink-0 overflow-hidden">
                  {ext.isImage ? (
                    <img
                      src={ext.logo}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <i
                      className={`${ext.logo} text-xl`}
                      style={{ color: ext.color }}
                      aria-hidden="true"
                    />
                  )}
                </div>
                <div className="flex-grow overflow-hidden">
                  <h3 className="font-bold text-white text-sm truncate">
                    {ext.name}
                  </h3>
                  <p className="text-xs text-gray-400 truncate">
                    {ext.shortDesc}
                  </p>
                </div>
                <i
                  className={`fas fa-chevron-right text-xs transition-colors ${
                    previewId === ext.id ? "text-blue-400" : "text-transparent"
                  }`}
                  aria-hidden="true"
                />
              </button>
            ))}
          </div>

          <div className="w-2/3">
            <ExtensionPreview ext={activePreview} />
          </div>
        </div>
      </div>
    </div>
  );
}
