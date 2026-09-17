import React, { useState } from "react";

// FontAwesome is assumed to be loaded in your index.html/layout via CDN:
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

export default function Extensions() {
  const [activeExtension, setActiveExtension] = useState(null);

  const extensions = [
    {
      id: "crunchy",
      name: "Crunchy Navigator",
      description:
        "Improve the Crunchyroll experience with advanced filters, better navigation, and faster search.",
      logo: "https://lh3.googleusercontent.com/H6Qz1U2YFHnHibDBIOcqIXNEQ7QpmDOWnRFcxF-8NqJm-o1jCEAwLc4sR44JnANlJO3qOQ7SSoCH391dMrkBMZ-7=s120",
      isImage: true,
      color: "#ff6b00",
      rating: 5.0,
      users: 6,
    },
  ];

  return (
    // Reduced top margin/padding to fit closer to the navbar
    <div className="h-[75vh] bg-[#0b0f19] text-white pt-8 pb-24 w-full">
      <main className="px-6 max-w-7xl mx-auto flex flex-col items-center w-full">
        {/* === VIEW 1: LISTA DE EXTENSÕES === */}
        {!activeExtension && (
          <div className="w-full flex flex-col items-start animate-fade-in">
            {/* Cabeçalho Alinhado à Esquerda (Mais organizado e menos centralizado) */}
            <div className="mb-10 text-left w-full">
              <h1 className="text-3xl md:text-4xl font-bold mb-3 text-white tracking-tight">
                Browser Extensions
              </h1>
              <p className="text-gray-400 text-sm md:text-base max-w-2xl">
                Discover powerful tools designed to enhance your browsing
                experience. View features, details, and privacy policies for all
                published browser extensions by Itenorio.
              </p>
            </div>

            {/* Grid mais largo com 3 colunas em telas grandes */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {}
              {extensions.map((ext) => (
                <div
                  key={ext.id}
                  className="bg-[#121826] border border-white/10 p-6 rounded-lg shadow-sm hover:border-white/30 transition-all duration-300 flex flex-col text-left h-full group"
                >
                  <div className="flex items-start mb-4">
                    {/* Logo / Ícone */}
                    <div className="flex-shrink-0 mr-4 w-12 h-12 flex items-center justify-center rounded-md bg-white/5 border border-white/10 group-hover:scale-105 transition-transform">
                      {ext.isImage ? (
                        <img
                          src={ext.logo}
                          alt={ext.name}
                          className="w-8 h-8 object-contain"
                        />
                      ) : (
                        <i
                          className={`${ext.logo} text-2xl`}
                          style={{ color: ext.color }}
                        ></i>
                      )}
                    </div>

                    {/* Título e Stats rápidos */}
                    <div className="flex flex-col flex-grow">
                      <h2 className="text-lg font-bold text-white tracking-wide leading-tight">
                        {ext.name}
                      </h2>
                      <div className="flex items-center gap-3 mt-1 text-xs text-gray-400 font-medium">
                        <span className="flex items-center gap-1">
                          <i className="fas fa-star text-yellow-500"></i>{" "}
                          {ext.rating.toFixed(1)}
                        </span>
                        <span className="flex items-center gap-1">
                          <i className="fas fa-users text-blue-400"></i>{" "}
                          {ext.users}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Descrição */}
                  <p className="text-gray-400 text-sm leading-relaxed flex-grow mb-6">
                    {ext.description}
                  </p>

                  {/* Botão de Ação */}
                  <div className="mt-auto">
                    <button
                      onClick={() => setActiveExtension(ext.id)}
                      className="w-full bg-white/5 border border-white/10 hover:bg-white/10 text-white px-4 py-2.5 rounded-md font-semibold transition-all duration-300 text-sm flex items-center justify-center gap-2"
                    >
                      View Details & Policy{" "}
                      <i className="fas fa-arrow-right text-xs opacity-70"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {}
        {/* === VIEW 2: DETALHES E POLÍTICA (CRUNCHY NAVIGATOR) === */}
        {activeExtension === "crunchy" && (
          <div className="w-full max-w-5xl flex flex-col gap-8 animate-fade-in text-left">
            <button
              onClick={() => setActiveExtension(null)}
              className="self-start flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-semibold mb-2 bg-white/5 px-4 py-2 rounded-md border border-white/10"
            >
              <i className="fas fa-arrow-left"></i>
              Back to Extensions
            </button>

            {/* Cabeçalho da Extensão - Estilo Marketing */}
            <div className="bg-[#121826] border border-white/10 rounded-xl p-8 flex flex-col md:flex-row gap-8 items-start relative overflow-hidden">
              {/* Decorative background glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff6b00]/10 blur-[80px] rounded-full pointer-events-none"></div>

              <div className="flex-shrink-0">
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
                  <span className="bg-[#ff6b00]/20 text-[#ff6b00] border border-[#ff6b00]/30 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">
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
                <div className="flex flex-wrap items-center gap-6 mt-2 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <div className="flex text-yellow-500 text-xs">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                    <span className="font-semibold text-white">5.0</span>
                    <span className="text-gray-500">(1 rating)</span>
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
                <div className="flex flex-wrap gap-4 text-xs text-gray-400 bg-black/20 p-3 rounded-lg border border-white/5 inline-flex">
                  <div className="flex flex-col">
                    <span className="uppercase text-[10px] text-gray-500 font-bold mb-0.5">
                      Version
                    </span>
                    <span className="text-gray-300">1.0.4</span>
                  </div>
                  <div className="w-px bg-white/10"></div>
                  <div className="flex flex-col">
                    <span className="uppercase text-[10px] text-gray-500 font-bold mb-0.5">
                      Updated
                    </span>
                    <span className="text-gray-300">August 26, 2026</span>
                  </div>
                  <div className="w-px bg-white/10"></div>
                  <div className="flex flex-col">
                    <span className="uppercase text-[10px] text-gray-500 font-bold mb-0.5">
                      Size
                    </span>
                    <span className="text-gray-300">311KiB</span>
                  </div>
                  <div className="w-px bg-white/10"></div>
                  <div className="flex flex-col">
                    <span className="uppercase text-[10px] text-gray-500 font-bold mb-0.5">
                      Languages
                    </span>
                    <span className="text-gray-300">English (US)</span>
                  </div>
                </div>
              </div>
            </div>

            {}
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

              {}
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

        {/* Placeholder for other active extensions if you want to expand later */}
        {activeExtension && activeExtension !== "crunchy" && (
          <div className="w-full max-w-5xl text-center animate-fade-in py-20">
            <button
              onClick={() => setActiveExtension(null)}
              className="mb-4 text-gray-400 hover:text-white"
            >
              <i className="fas fa-arrow-left"></i> Back
            </button>
            <h2 className="text-2xl font-bold text-white">
              Details for{" "}
              {extensions.find((e) => e.id === activeExtension)?.name}
            </h2>
            <p className="text-gray-400 mt-2">Marketing page coming soon.</p>
          </div>
        )}
      </main>

      {}
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
