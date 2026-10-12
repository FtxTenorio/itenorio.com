import React, { useState } from "react";
import { extensions } from "../../../data/extensions";

function ExtensionLogo({ ext, className = "w-24 h-24" }) {
  return (
    <div
      className={`${className} rounded-2xl shadow-xl border border-white/10 overflow-hidden bg-[#0b0f19] flex items-center justify-center shrink-0`}
    >
      {ext.isImage ? (
        <img
          src={ext.logo}
          alt={`${ext.name} logo`}
          className="w-full h-full object-cover"
        />
      ) : (
        <i
          className={`${ext.logo} text-4xl`}
          style={{ color: ext.color }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

function ExtensionPreview({ ext, onOpen }) {
  return (
    <div className="w-full bg-[#121826] border border-white/10 rounded-2xl p-8 md:p-12 flex flex-col items-center text-center relative overflow-hidden shadow-2xl">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 blur-[100px] rounded-full pointer-events-none opacity-20"
        style={{ backgroundColor: ext.color }}
      />

      <div className="relative z-10 mb-6">
        <ExtensionLogo ext={ext} />
      </div>

      <div className="flex items-center gap-2 mb-3 relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
          {ext.name}
        </h2>
        {ext.status === "Published" && (
          <i
            className="fas fa-check-circle text-blue-500 text-sm"
            title="Published"
            aria-label="Published"
          />
        )}
      </div>

      <p className="text-gray-400 text-sm md:text-base mb-8 max-w-md relative z-10 leading-relaxed">
        {ext.description}
      </p>

      {ext.status === "Published" ? (
        <>
          <div className="flex flex-wrap justify-center gap-4 mb-10 relative z-10">
            <div className="bg-black/30 border border-white/5 px-4 py-2 rounded-full text-xs font-semibold text-gray-300 flex items-center gap-2">
              <i className="fas fa-star text-yellow-500" aria-hidden="true" />
              {ext.rating > 0 ? ext.rating.toFixed(1) : "N/A"}
            </div>
            <div className="bg-black/30 border border-white/5 px-4 py-2 rounded-full text-xs font-semibold text-gray-300 flex items-center gap-2">
              <i className="fas fa-users text-blue-400" aria-hidden="true" />
              {ext.users} users
            </div>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row flex-wrap items-center gap-4 w-full justify-center">
            {ext.storeUrl && (
              <a
                href={ext.storeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-[#ff6b00] to-[#ff8800] shadow-[0_0_25px_rgba(255,107,0,0.35)] hover:shadow-[0_0_35px_rgba(255,107,0,0.6)] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 overflow-hidden w-full sm:w-auto"
              >
                <span className="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <i className="fab fa-chrome text-lg" aria-hidden="true" />
                <span>View in Store</span>
                <i
                  className="fas fa-external-link-alt text-xs opacity-80"
                  aria-hidden="true"
                />
              </a>
            )}
            <button
              type="button"
              onClick={() => onOpen(ext.id)}
              className="group inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-xl font-semibold text-gray-200 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 w-full sm:w-auto"
            >
              <span>View Full Details</span>
              <i
                className="fas fa-arrow-right text-sm text-blue-400"
                aria-hidden="true"
              />
            </button>
            {ext.privacyUrl && (
              <a
                href={ext.privacyUrl}
                className="group inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl font-semibold text-gray-400 hover:text-gray-200 bg-transparent hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300 w-full sm:w-auto"
              >
                <i
                  className="fas fa-shield-alt text-sm text-blue-400/70"
                  aria-hidden="true"
                />
                <span>Privacy Policy</span>
              </a>
            )}
          </div>
        </>
      ) : (
        <div className="relative z-10 mt-2 px-6 py-2.5 bg-white/5 border border-white/10 rounded-full text-sm font-semibold text-gray-400 tracking-wide uppercase">
          Coming Soon
        </div>
      )}
    </div>
  );
}

function DetailSection({ title, icon, children }) {
  return (
    <section>
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2 border-b border-white/10 pb-2">
        {icon && <i className={`${icon} text-[#ff6b00]`} aria-hidden="true" />}
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function Extensions() {
  const [activeExtensionId, setActiveExtensionId] = useState(null);
  const [previewId, setPreviewId] = useState("crunchy");

  const activePreview =
    extensions.find((ext) => ext.id === previewId) ?? extensions[0];
  const activeExtension = extensions.find(
    (ext) => ext.id === activeExtensionId,
  );

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white pt-20 pb-24 w-full">
      <main className="px-4 md:px-6 max-w-6xl mx-auto flex flex-col items-center w-full">
        {!activeExtension ? (
          <div className="w-full animate-fade-in">
            <div className="mb-10 text-left w-full">
              <h1 className="text-3xl md:text-4xl font-bold mb-3 text-white tracking-tight">
                Browser Extensions
              </h1>
              <p className="text-gray-400 text-sm md:text-base max-w-2xl">
                Discover powerful tools designed to enhance your browsing
                experience. Select an extension to preview its features.
              </p>
            </div>

            <div className="flex lg:hidden flex-col gap-8 w-full">
              {extensions.map((ext) => (
                <ExtensionPreview
                  key={ext.id}
                  ext={ext}
                  onOpen={setActiveExtensionId}
                />
              ))}
            </div>

            <div className="hidden lg:flex flex-row gap-10 w-full items-start">
              <div className="w-1/3 flex flex-col gap-3">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 px-1">
                  Available Tools
                </h3>
                {extensions.map((ext) => (
                  <button
                    type="button"
                    key={ext.id}
                    onClick={() => setPreviewId(ext.id)}
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 text-left w-full ${
                      previewId === ext.id
                        ? "bg-white/10 border-white/20 shadow-lg"
                        : "bg-[#121826] border-white/5 hover:border-white/10 hover:bg-white/5"
                    }`}
                  >
                    <div className="w-12 h-12 rounded-lg bg-[#0b0f19] border border-white/5 flex items-center justify-center shrink-0 overflow-hidden">
                      {ext.isImage ? (
                        <img
                          src={ext.logo}
                          alt={`${ext.name} logo`}
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
                      <h4 className="font-bold text-white text-sm truncate">
                        {ext.name}
                      </h4>
                      <p className="text-xs text-gray-400 truncate">
                        {ext.shortDesc}
                      </p>
                    </div>
                    <i
                      className={`fas fa-chevron-right text-xs transition-colors ${
                        previewId === ext.id
                          ? "text-blue-400"
                          : "text-transparent"
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                ))}
              </div>

              <div className="w-2/3">
                <ExtensionPreview
                  ext={activePreview}
                  onOpen={setActiveExtensionId}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-5xl flex flex-col gap-8 animate-fade-in text-left">
            <button
              type="button"
              onClick={() => setActiveExtensionId(null)}
              className="self-start flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-semibold mb-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-md border border-white/10"
            >
              <i className="fas fa-arrow-left" aria-hidden="true" />
              Back to Extensions
            </button>

            <div className="bg-[#121826] border border-white/10 rounded-xl p-8 flex flex-col md:flex-row gap-8 items-start relative overflow-hidden">
              <div
                className="absolute top-0 right-0 w-64 h-64 blur-[80px] rounded-full pointer-events-none opacity-10"
                style={{ backgroundColor: activeExtension.color }}
              />
              <div className="relative z-10">
                <ExtensionLogo
                  ext={activeExtension}
                  className="w-24 h-24 md:w-32 md:h-32"
                />
              </div>

              <div className="flex flex-col flex-grow z-10 w-full">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-2">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-1">
                      <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                        {activeExtension.name}
                      </h1>
                      <span
                        className="px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider mt-1 md:mt-0 border"
                        style={{
                          color: activeExtension.color,
                          backgroundColor: `${activeExtension.color}20`,
                          borderColor: `${activeExtension.color}50`,
                        }}
                      >
                        {activeExtension.status === "Published"
                          ? "Extension"
                          : activeExtension.status}
                      </span>
                    </div>
                    {activeExtension.websiteUrl && (
                      <a
                        href={activeExtension.websiteUrl}
                        className="text-blue-400 hover:underline text-sm inline-block"
                      >
                        {activeExtension.websiteUrl.replace(/^https?:\/\//, "")}
                      </a>
                    )}
                  </div>

                  {activeExtension.storeUrl && (
                    <a
                      href={activeExtension.storeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-[#ff6b00] to-[#ff8800] shadow-[0_0_25px_rgba(255,107,0,0.35)] hover:shadow-[0_0_35px_rgba(255,107,0,0.65)] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 self-start lg:self-center shrink-0 overflow-hidden"
                    >
                      <i className="fab fa-chrome text-xl" aria-hidden="true" />
                      <span>Get Extension</span>
                      <i
                        className="fas fa-external-link-alt text-xs opacity-80"
                        aria-hidden="true"
                      />
                    </a>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 md:gap-6 mt-2 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <i
                      className="fas fa-star text-yellow-500"
                      aria-hidden="true"
                    />
                    <span className="font-semibold text-white">
                      {activeExtension.rating > 0
                        ? activeExtension.rating.toFixed(1)
                        : "N/A"}
                    </span>
                    <span className="text-gray-500 hidden sm:inline">
                      ({activeExtension.ratingCount}{" "}
                      {activeExtension.ratingCount === 1 ? "rating" : "ratings"}
                      )
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <i
                      className="fas fa-users text-gray-400"
                      aria-hidden="true"
                    />
                    <span>
                      <strong>{activeExtension.users}</strong>{" "}
                      {activeExtension.users === 1 ? "user" : "users"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <i
                      className="fas fa-layer-group text-gray-400"
                      aria-hidden="true"
                    />
                    <span>{activeExtension.category}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-xs text-gray-400 bg-black/20 p-3 rounded-lg border border-white/5 w-full sm:w-fit">
                  {[
                    ["Version", activeExtension.version],
                    ["Updated", activeExtension.updated],
                    ["Size", activeExtension.size],
                    ["Language", activeExtension.language],
                  ].map(([label, value]) => (
                    <div className="flex flex-col" key={label}>
                      <span className="uppercase text-[10px] text-gray-500 font-bold mb-0.5">
                        {label}
                      </span>
                      <span className="text-gray-300">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
              <div className="lg:col-span-2 space-y-8">
                <DetailSection title="Overview">
                  <p className="text-gray-300 leading-relaxed">
                    {activeExtension.overview}
                  </p>
                </DetailSection>

                {activeExtension.features.length > 0 && (
                  <DetailSection
                    title="Current Features"
                    icon="fas fa-sparkles"
                  >
                    <ul className="space-y-3 text-gray-300">
                      {activeExtension.features.map((feature) => (
                        <li
                          className="flex items-start gap-3"
                          key={feature.title}
                        >
                          <i
                            className="fas fa-check-circle text-green-500 mt-1"
                            aria-hidden="true"
                          />
                          <span>
                            <strong>{feature.title}:</strong>{" "}
                            {feature.description}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </DetailSection>
                )}

                {activeExtension.roadmap.length > 0 && (
                  <section className="bg-gradient-to-br from-[#121826] to-[#1a1525] p-6 rounded-xl border border-purple-500/20">
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <i
                        className="fas fa-rocket text-purple-400"
                        aria-hidden="true"
                      />
                      {activeExtension.status === "Published"
                        ? "Upcoming Roadmap"
                        : "What's Coming"}
                    </h2>
                    <p className="text-gray-400 text-sm mb-4">
                      {activeExtension.status === "Published"
                        ? "We are continuously working on new updates and features:"
                        : "More information will be added as development progresses:"}
                    </p>
                    <ul className="space-y-3 text-gray-300 text-sm">
                      {activeExtension.roadmap.map((item) => (
                        <li className="flex items-start gap-3" key={item.title}>
                          <span
                            className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                            style={{ backgroundColor: activeExtension.color }}
                          />
                          <span>
                            <strong>{item.title}:</strong> {item.description}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>

              <aside className="lg:col-span-1 space-y-6">
                <div className="bg-[#121826] border border-white/10 p-6 rounded-xl">
                  <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                    <i
                      className="fas fa-shield-alt text-blue-400"
                      aria-hidden="true"
                    />
                    Privacy Policy
                  </h3>
                  <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                    {activeExtension.privacyDescription}
                  </p>
                  {activeExtension.privacyUrl && (
                    <a
                      href={activeExtension.privacyUrl}
                      className="w-full inline-flex items-center justify-center gap-2 bg-white/5 border border-white/20 hover:bg-white/10 text-white px-4 py-2.5 rounded-md transition-all duration-300 text-sm tracking-wide"
                    >
                      <i className="fas fa-file-contract" aria-hidden="true" />
                      Read Full Policy
                    </a>
                  )}
                </div>

                <div className="bg-[#121826] border border-white/10 p-6 rounded-xl">
                  <h3 className="text-lg font-bold text-white mb-2">
                    Developer
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">
                    {activeExtension.developerType}
                  </p>
                  {activeExtension.supportEmail && (
                    <a
                      href={`mailto:${activeExtension.supportEmail}`}
                      className="w-full inline-flex items-center justify-center gap-2 bg-white/5 border border-white/20 hover:bg-white/10 text-white px-4 py-2.5 rounded-md transition-all duration-300 text-sm tracking-wide"
                    >
                      <i className="fas fa-envelope" aria-hidden="true" />
                      Contact Support
                    </a>
                  )}
                </div>
              </aside>
            </div>
          </div>
        )}
      </main>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
}
