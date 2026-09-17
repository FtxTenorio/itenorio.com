import React, { useState } from "react";

// Componente interno para renderizar o Card de Preview dinamicamente (reutilizado no Mobile e Desktop)
const ExtensionPreview = ({ ext, onOpen }) => (
  <div className="w-full bg-[#121826] border border-white/10 rounded-2xl p-8 md:p-12 flex flex-col items-center text-center relative overflow-hidden shadow-2xl">
    {/* Glow Background */}
    <div
      className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 blur-[100px] rounded-full pointer-events-none opacity-20"
      style={{ backgroundColor: ext.color }}
    ></div>

    <div className="w-24 h-24 rounded-2xl shadow-xl border border-white/10 overflow-hidden mb-6 bg-[#0b0f19] flex items-center justify-center relative z-10">
      {ext.isImage ? (
        <img
          src={ext.logo}
          alt={ext.name}
          className="w-full h-full object-cover"
        />
      ) : (
        <i className={`${ext.logo} text-4xl`} style={{ color: ext.color }}></i>
      )}
    </div>

    <div className="flex items-center gap-2 mb-3 relative z-10">
      <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
        {ext.name}
      </h2>
      {ext.status === "Published" && (
        <i
          className="fas fa-check-circle text-blue-500 text-sm"
          title="Published"
        ></i>
      )}
    </div>

    <p className="text-gray-400 text-sm md:text-base mb-8 max-w-md relative z-10 leading-relaxed">
      {ext.description}
    </p>

    {ext.status === "Published" ? (
      <>
        <div className="flex flex-wrap justify-center gap-4 mb-10 relative z-10">
          <div className="bg-black/30 border border-white/5 px-4 py-2 rounded-full text-xs font-semibold text-gray-300 flex items-center gap-2">
            <i className="fas fa-star text-yellow-500"></i>{" "}
            {ext.rating > 0 ? ext.rating.toFixed(1) : "N/A"}
          </div>
          <div className="bg-black/30 border border-white/5 px-4 py-2 rounded-full text-xs font-semibold text-gray-300 flex items-center gap-2">
            <i className="fas fa-users text-blue-400"></i> {ext.users} Users
          </div>
        </div>

        {/* Botão Azul Redondo de Ação */}
        <div className="relative z-10 flex flex-col items-center group">
          <button
            onClick={() => onOpen(ext.id)}
            className="w-16 h-16 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_rgba(37,99,235,0.6)] transition-all duration-300 transform group-hover:scale-105 group-active:scale-95"
          >
            <i className="fas fa-arrow-right text-white text-xl transform group-hover:translate-x-1 transition-transform duration-300"></i>
          </button>
          <span className="mt-4 text-xs font-bold text-gray-500 uppercase tracking-widest group-hover:text-blue-400 transition-colors">
            View Full Details
          </span>
        </div>
      </>
    ) : (
      <div className="relative z-10 mt-2 px-6 py-2.5 bg-white/5 border border-white/10 rounded-full text-sm font-semibold text-gray-400 tracking-wide uppercase">
        Coming Soon
      </div>
    )}
  </div>
);

export default function Extensions() {
  const [activeExtension, setActiveExtension] = useState(null);
  const [previewId, setPreviewId] = useState("crunchy");

  const extensions = [
    {
      id: "crunchy",
      name: "Crunchy Navigator",
      shortDesc: "Advanced filters and better navigation.",
      description:
        "Improve the Crunchyroll experience with advanced filters, better navigation, and faster search. Take your anime browsing experience to the next level with powerful custom filters.",
      logo: "https://lh3.googleusercontent.com/H6Qz1U2YFHnHibDBIOcqIXNEQ7QpmDOWnRFcxF-8NqJm-o1jCEAwLc4sR44JnANlJO3qOQ7SSoCH391dMrkBMZ-7=s120",
      isImage: true,
      color: "#ff6b00",
      rating: 5.0,
      users: 6,
      status: "Published",
    },
    {
      id: "coming-soon",
      name: "More in the works",
      shortDesc: "New ideas coming soon.",
      description:
        "I have several ideas for new browser extensions. I will be adding them here as soon as they are ready to be published. Stay tuned!",
      logo: "fa-solid fa-lightbulb",
      isImage: false,
      color: "#8b5cf6",
      rating: 0,
      users: 0,
      status: "In Development",
    },
  ];

  const activePreview = extensions.find((ext) => ext.id === previewId);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white pt-20 pb-24 w-full">
      <main className="px-4 md:px-6 max-w-6xl mx-auto flex flex-col items-center w-full">
        {/* === VIEW 1: LISTA E PREVIEW === */}
        {!activeExtension && (
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

            {/* Layout Mobile: Cards empilhados diretamente, ignorando menu lateral */}
            <div className="flex lg:hidden flex-col gap-8 w-full">
              {extensions.map((ext) => (
                <ExtensionPreview
                  key={ext.id}
                  ext={ext}
                  onOpen={setActiveExtension}
                />
              ))}
            </div>

            {/* Layout Desktop: Menu lateral + Preview central */}
            <div className="hidden lg:flex flex-row gap-10 w-full items-start">
              {/* Menu Lateral de Seleção (Apenas Desktop) */}
              <div className="w-1/3 flex flex-col gap-3">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 px-1">
                  Available Tools
                </h3>
                {extensions.map((ext) => (
                  <button
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
                          alt={ext.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <i
                          className={`${ext.logo} text-xl`}
                          style={{ color: ext.color }}
                        ></i>
                      )}
                    </div>
                    <div className="flex-grow overflow-hidden">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-white text-sm truncate">
                          {ext.name}
                        </h4>
                      </div>
                      <p className="text-xs text-gray-400 truncate">
                        {ext.shortDesc}
                      </p>
                    </div>
                    <div className="shrink-0">
                      <i
                        className={`fas fa-chevron-right text-xs transition-colors ${previewId === ext.id ? "text-blue-400" : "text-transparent"}`}
                      ></i>
                    </div>
                  </button>
                ))}
              </div>

              {/* Preview Central (Apenas Desktop) */}
              <div className="w-2/3">
                <ExtensionPreview
                  ext={activePreview}
                  onOpen={setActiveExtension}
                />
              </div>
            </div>
          </div>
        )}

        {/* === VIEW 2: DETALHES E POLÍTICA (CRUNCHY NAVIGATOR) === */}
        {activeExtension === "crunchy" && (
          <div className="w-full max-w-5xl flex flex-col gap-8 animate-fade-in text-left">
            <button
              onClick={() => setActiveExtension(null)}
              className="self-start flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-semibold mb-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-md border border-white/10"
            >
              <i className="fas fa-arrow-left"></i>
              Back to Extensions
            </button>

            {/* Cabeçalho da Extensão - Estilo Marketing */}
            <div className="bg-[#121826] border border-white/10 rounded-xl p-8 flex flex-col md:flex-row gap-8 items-start relative overflow-hidden">
              {/* Decorative background glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff6b00]/10 blur-[80px] rounded-full pointer-events-none"></div>

              <div className="flex-shrink-0 z-10">
                <img
                  src="https://lh3.googleusercontent.com/H6Qz1U2YFHnHibDBIOcqIXNEQ7QpmDOWnRFcxF-8NqJm-o1jCEAwLc4sR44JnANlJO3qOQ7SSoCH391dMrkBMZ-7=s120"
                  alt="Crunchy Navigator Logo"
                  className="w-24 h-24 md:w-32 md:h-32 rounded-2xl shadow-lg border border-white/10"
                />
              </div>

              <div className="flex-col flex-grow z-10">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                    Crunchy Navigator
                  </h1>
                  <span className="bg-[#ff6b00]/20 text-[#ff6b00] border border-[#ff6b00]/30 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider mt-1 md:mt-0">
                    Extension
                  </span>
                </div>

                <a
                  href="https://itenorio.com"
                  className="text-blue-400 hover:underline text-sm mb-4 inline-block"
                >
                  itenorio.com
                </a>

                {/* Status Bar */}
                <div className="flex flex-wrap items-center gap-4 md:gap-6 mt-2 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <div className="flex text-yellow-500 text-xs">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                    <span className="font-semibold text-white">5.0</span>
                    <span className="text-gray-500 hidden sm:inline">
                      (1 rating)
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <i className="fas fa-users text-gray-400"></i>
                    <span>
                      <strong>6</strong> users
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <i className="fas fa-layer-group text-gray-400"></i>
                    <span>Entertainment</span>
                  </div>
                </div>

                {/* Metadata tags */}
                <div className="flex flex-wrap gap-4 text-xs text-gray-400 bg-black/20 p-3 rounded-lg border border-white/5 w-full sm:w-auto inline-flex">
                  <div className="flex flex-col">
                    <span className="uppercase text-[10px] text-gray-500 font-bold mb-0.5">
                      Version
                    </span>
                    <span className="text-gray-300">1.0.4</span>
                  </div>
                  <div className="w-px bg-white/10 hidden sm:block"></div>
                  <div className="flex flex-col">
                    <span className="uppercase text-[10px] text-gray-500 font-bold mb-0.5">
                      Updated
                    </span>
                    <span className="text-gray-300">Aug 26, 2026</span>
                  </div>
                  <div className="w-px bg-white/10 hidden sm:block"></div>
                  <div className="flex flex-col">
                    <span className="uppercase text-[10px] text-gray-500 font-bold mb-0.5">
                      Size
                    </span>
                    <span className="text-gray-300">311KiB</span>
                  </div>
                  <div className="w-px bg-white/10 hidden sm:block"></div>
                  <div className="flex flex-col">
                    <span className="uppercase text-[10px] text-gray-500 font-bold mb-0.5">
                      Language
                    </span>
                    <span className="text-gray-300">English</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
              {/* Esquerda: Marketing e Features (Ocupa 2/3) */}
              <div className="lg:col-span-2 space-y-8">
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-2">
                    Overview
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Improve the Crunchyroll experience with advanced filters,
                    better navigation, and faster search. Take your anime
                    browsing experience to the next level with powerful custom
                    filters, refined navigation, and advanced discovery tools.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <i className="fas fa-sparkles text-[#ff6b00]"></i> Current
                    Features
                  </h2>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-3">
                      <i className="fas fa-check-circle text-green-500 mt-1"></i>
                      <span>
                        <strong>Audio & Dub Filter:</strong> Quickly sort titles
                        by audio language and dub availability.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <i className="fas fa-check-circle text-green-500 mt-1"></i>
                      <span>
                        <strong>Rating Filter:</strong> Browse anime based on
                        user ratings and score tiers.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <i className="fas fa-check-circle text-green-500 mt-1"></i>
                      <span>
                        <strong>Duration Filter:</strong> Easily find short
                        episodes, standard lengths, or movies.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <i className="fas fa-check-circle text-green-500 mt-1"></i>
                      <span>
                        <strong>Age Rating Filter:</strong> Filter content
                        suitable for specific age groups.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <i className="fas fa-check-circle text-green-500 mt-1"></i>
                      <span>
                        <strong>Filter Customization:</strong> Configure,
                        toggle, and reset your filter preferences instantly.
                      </span>
                    </li>
                  </ul>
                </section>

                <section className="bg-gradient-to-br from-[#121826] to-[#1a1525] p-6 rounded-xl border border-purple-500/20">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <i className="fas fa-rocket text-purple-400"></i> Upcoming
                    Roadmap
                  </h2>
                  <p className="text-gray-400 text-sm mb-4">
                    We are continuously working on new updates and features:
                  </p>
                  <ul className="space-y-3 text-gray-300 text-sm">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                      <span>
                        <strong>External Score Integration:</strong> Overlay
                        live ratings from MyAnimeList (MAL) and AniList.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                      <span>
                        <strong>Enhanced Home Screen:</strong> Advanced filters
                        and cleaner layouts for home screen recommendations.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                      <span>
                        <strong>Smart Recommendation Engine:</strong>{" "}
                        Intelligent, personalized suggestions based on your
                        taste.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                      <span>
                        <strong>Release Schedule & Calendar:</strong> Track
                        weekly episode release days, countdowns, and key
                        metadata at a glance.
                      </span>
                    </li>
                  </ul>
                </section>
              </div>

              {/* Direita: Privacy Policy & Technical (Ocupa 1/3) */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-[#121826] border border-white/10 p-6 rounded-xl">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <i className="fas fa-shield-alt text-blue-400"></i> Privacy
                    Policy
                  </h3>

                  <div className="space-y-5">
                    <div>
                      <h4 className="text-sm font-bold text-gray-200 mb-1 flex items-center gap-2">
                        <i className="fas fa-database text-[#ff6b00]"></i> Data
                        Collection
                      </h4>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        <strong>Account Info:</strong> Optional opt-in to
                        collect username/email for syncing.
                        <br />
                        <strong>Website Content:</strong> Reads on-page texts,
                        titles, descriptions, and images strictly to power
                        filters and recommendations.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-gray-200 mb-1 flex items-center gap-2">
                        <i className="fas fa-key text-[#0078d7]"></i> Required
                        Permissions
                      </h4>
                      <ul className="text-xs text-gray-400 leading-relaxed list-disc pl-4 space-y-1">
                        <li>Host Permission (crunchyroll.com)</li>
                        <li>Scripting (for advanced logic)</li>
                        <li>Storage (for saving configs)</li>
                      </ul>
                    </div>

                    <div className="bg-black/30 p-3 rounded border border-white/5 text-xs text-gray-400">
                      <i className="fas fa-check-circle text-green-500 mr-1"></i>{" "}
                      Not sold to third parties.
                      <br />
                      <i className="fas fa-check-circle text-green-500 mr-1"></i>{" "}
                      Not used for unrelated purposes.
                    </div>
                  </div>
                </div>

                <div className="bg-[#121826] border border-white/10 p-6 rounded-xl">
                  <h3 className="text-lg font-bold text-white mb-2">
                    Developer
                  </h3>
                  <div className="text-sm text-gray-400 mb-4">
                    Non-trader. Consumer rights do not apply to contracts
                    between you and this developer in the EU.
                  </div>
                  <a
                    href="mailto:extensions@itenorio.com"
                    className="w-full inline-flex items-center justify-center gap-2 bg-white/5 border border-white/20 hover:bg-white/10 text-white px-4 py-2.5 rounded-md transition-all duration-300 text-sm tracking-wide"
                  >
                    <i className="fas fa-envelope"></i>
                    Contact Support
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
}
