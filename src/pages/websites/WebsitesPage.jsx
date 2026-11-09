import { useState } from "react";
import { websites } from "../../data/websites";
import { Carousel } from "../../components/ui/Carousel";

// Helper function to generate real-time website screenshots for free via Microlink API
const getLiveScreenshot = (url) =>
  `https://api.microlink.io/?url=${encodeURIComponent(
    url,
  )}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1280&viewport.height=800`;

/** One website per carousel slide: static capture on the left, details on the right. */
const WebsiteSlide = ({ site, onOpen }) => (
  <article className="grid gap-6 lg:gap-10 lg:grid-cols-[1.15fr_1fr] items-center rounded-2xl border border-white/10 bg-surface p-5 sm:p-7">
    <button
      type="button"
      onClick={() => onOpen(site.id)}
      className="group w-full rounded-xl overflow-hidden border border-white/15 bg-ink text-left"
      style={{ boxShadow: `0 25px 60px -25px ${site.color}66` }}
      aria-label={`Open the README of ${site.name}`}
    >
      <div className="bg-surface-raised px-4 py-2 flex items-center gap-3 border-b border-white/10">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </span>
        <span className="flex-1 min-w-0 truncate rounded-md bg-ink px-3 py-1 font-mono text-[11px] text-gray-400">
          <i className="fas fa-lock text-[9px] text-emerald-400 mr-2" aria-hidden="true" />
          {site.liveUrl}
        </span>
      </div>
      <img
        src={site.capture}
        alt={`Home page of ${site.name}`}
        width="1280"
        height="800"
        className="w-full aspect-[16/10] object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
      />
    </button>

    <div className="min-w-0">
      <p className="inline-flex items-center gap-2 mb-3 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-gray-300">
        <i className="fab fa-github" aria-hidden="true" />
        <span className="font-mono truncate">{site.repoName}</span>
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
            site.isPrivate
              ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
              : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
          }`}
        >
          {site.isPrivate ? "Private" : "Public"}
        </span>
      </p>
      <h2 className="text-2xl font-bold tracking-tight mb-3">{site.name}</h2>
      <p className="text-gray-300 leading-relaxed mb-5 line-clamp-4">{site.description}</p>

      <ul className="flex flex-wrap gap-2 mb-6">
        {site.stack.slice(0, 5).map((tech) => (
          <li
            key={tech}
            className="bg-black/30 border border-white/10 px-3 py-1 rounded-full text-xs font-medium text-gray-300"
          >
            {tech}
          </li>
        ))}
      </ul>

      <div className="flex flex-col sm:flex-row flex-wrap gap-3">
        <button
          type="button"
          onClick={() => onOpen(site.id)}
          style={{ backgroundImage: `linear-gradient(to right, ${site.color}, ${site.secondaryColor})` }}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-semibold text-white hover:brightness-110 transition"
        >
          <i className="fas fa-book-open text-sm" aria-hidden="true" />
          Interactive README
        </button>
        <a
          href={site.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-white/15 hover:bg-white/5 font-semibold text-gray-200 transition-colors"
        >
          <i className="fas fa-globe text-blue-400" aria-hidden="true" />
          Visit website
        </a>
        {site.githubUrl && (
          <a
            href={site.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-white/10 text-gray-300 hover:bg-white/5 transition-colors"
            aria-label="Source code on GitHub"
          >
            <i className="fab fa-github text-lg" aria-hidden="true" />
          </a>
        )}
      </div>
    </div>
  </article>
);

export default function Websites() {
  const [activeSiteId, setActiveSiteId] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState("https://itenorio.com");
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [loreOpen, setLoreOpen] = useState(false);


  const activeSite = websites.find((s) => s.id === activeSiteId);

  const handleOpenSite = (id) => {
    const target = websites.find((s) => s.id === id);
    if (target) {
      setSelectedRoute(target.liveUrl);
      setActiveSiteId(id);
      setLoreOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleCopyCommands = () => {
    const cmd = `git clone https://github.com/FtxTenorio/itenorio.com.git\ncd itenorio.com\nnpm install\nnpm run dev`;
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2500);
  };

  return (
    <div className="text-white pt-10 pb-24 lg:pt-8 lg:pb-8 w-full">
      <div className="px-4 md:px-6 max-w-6xl mx-auto flex flex-col items-center w-full">
        {/* === VIEW 1: CAROUSEL (fits the first screen on desktop) === */}
        {!activeSite && (
          <div className="w-full animate-fade-in lg:min-h-[calc(100svh-5rem-4rem)] lg:flex lg:flex-col lg:justify-center">
            <Carousel
              label="Websites"
              items={websites}
              getLabel={(site) => site.name}
              accent={(site) => site.color}
              renderSlide={(site) => <WebsiteSlide site={site} onOpen={handleOpenSite} />}
              header={
            <header className="text-left">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-soft mb-3">Portfolio</p>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white tracking-tight">
                Websites &amp; Platforms
              </h1>
              <p className="text-gray-400 max-w-2xl">
                Production websites built with React, Next.js and AWS. Open a project for its
                interactive README.
              </p>
            </header>

              }
            />
          </div>
        )}

        {/* === VIEW 2: SUPERCHARGED GITHUB README VIEW === */}
        {activeSite && (
          <div className="w-full max-w-6xl flex flex-col gap-6 animate-fade-in text-left">
            {/* Top Navigation Back Button */}
            <button
              onClick={() => setActiveSiteId(null)}
              className="self-start flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-semibold bg-white/5 hover:bg-white/10 px-4 py-2 rounded-md border border-white/10"
            >
              <i className="fas fa-arrow-left"></i>
              Back to Websites
            </button>

            {/* GitHub-Style Repository Header */}
            <div className="bg-[#121826] border border-white/10 rounded-xl p-6 md:p-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative overflow-hidden">
              <div
                className="absolute top-0 right-0 w-72 h-72 blur-[100px] rounded-full pointer-events-none opacity-15"
                style={{ backgroundColor: activeSite.color }}
              ></div>

              <div className="flex items-start sm:items-center gap-4 z-10">
                <div className="w-14 h-14 rounded-xl bg-[#0b0f19] border border-white/10 flex items-center justify-center shrink-0 shadow-lg">
                  <i
                    className={`${activeSite.icon} text-2xl`}
                    style={{ color: activeSite.color }}
                  ></i>
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2.5 mb-1">
                    <span className="text-gray-400 font-mono text-sm md:text-base">
                      FtxTenorio /
                    </span>
                    <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                      {activeSite.name}
                    </h1>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border ${
                        activeSite.isPrivate
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                          : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                      }`}
                    >
                      <i
                        className={`fas ${
                          activeSite.isPrivate ? "fa-lock" : "fa-book-bookmark"
                        } mr-1.5 text-[10px]`}
                      ></i>
                      {activeSite.isPrivate ? "Private Repo" : "Public Repo"}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs md:text-sm">
                    {activeSite.architectureType} · Last updated{" "}
                    {activeSite.updatedAt}
                  </p>
                </div>
              </div>

              {/* Repo Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 z-10 w-full lg:w-auto">
                <a
                  href={activeSite.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${activeSite.color}, ${activeSite.secondaryColor})`,
                  }}
                  className="flex-1 lg:flex-initial inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl font-bold text-white shadow-lg hover:brightness-110 transition-all text-sm"
                >
                  <i className="fas fa-bolt"></i>
                  <span>Open Live Production</span>
                  <i className="fas fa-external-link-alt text-xs opacity-80"></i>
                </a>

                {activeSite.githubUrl ? (
                  <a
                    href={activeSite.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 lg:flex-initial inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl font-semibold text-white bg-[#0b0f19] hover:bg-white/10 border border-white/15 transition-all text-sm"
                  >
                    <i className="fab fa-github text-base"></i>
                    <span>View on GitHub</span>
                  </a>
                ) : (
                  <div
                    className="flex-1 lg:flex-initial inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-amber-300/90 bg-amber-500/5 border border-amber-500/20 text-xs cursor-not-allowed"
                    title="Source code is private to protect client business logic"
                  >
                    <i className="fas fa-shield-halved"></i>
                    <span>Client Private Repository</span>
                  </div>
                )}
              </div>
            </div>

            {/* Interactive Live Route Inspector (What GitHub READMEs wish they had) */}
            <div className="bg-[#121826] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
              <div className="bg-[#161f30] px-4 py-3 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 mr-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
                  </div>
                  <span className="text-xs font-mono text-gray-300 bg-[#0b0f19] px-3 py-1.5 rounded-md border border-white/10 flex items-center gap-2">
                    <i className="fas fa-satellite-dish text-emerald-400 animate-pulse"></i>
                    {selectedRoute}
                  </span>
                </div>

                {/* Route Switcher Pills */}
                {activeSite.routes.length > 1 && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider mr-1">
                      Switch Route:
                    </span>
                    {activeSite.routes.map((route) => (
                      <button
                        key={route.path}
                        onClick={() => setSelectedRoute(route.url)}
                        className={`px-3 py-1 rounded-md text-xs font-mono transition-all ${
                          selectedRoute === route.url
                            ? "bg-blue-500 text-white font-bold shadow"
                            : "bg-[#0b0f19] text-gray-400 hover:text-white border border-white/10"
                        }`}
                      >
                        {route.path}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3">
                {/* Live Viewport */}
                <div className="lg:col-span-2 bg-[#0b0f19] aspect-video relative overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10">
                  <img
                    key={selectedRoute}
                    src={getLiveScreenshot(selectedRoute)}
                    alt="Live Route Preview"
                    className="w-full h-full object-cover object-top"
                  />
                  <a
                    href={selectedRoute}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-4 right-4 bg-black/80 hover:bg-black text-white backdrop-blur-md border border-white/20 px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 shadow-xl transition-all"
                  >
                    <span>Jump to {selectedRoute}</span>
                    <i className="fas fa-arrow-up-right-from-square text-blue-400"></i>
                  </a>
                </div>

                {/* Route Cards List */}
                <div className="p-6 flex flex-col justify-between bg-[#121826]">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
                      <i className="fas fa-sitemap text-blue-400"></i>
                      Live Ecosystem & Route Previews
                    </h3>
                    <div className="space-y-3">
                      {activeSite.routes.map((route) => (
                        <div
                          key={route.path}
                          onClick={() => setSelectedRoute(route.url)}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                            selectedRoute === route.url
                              ? "bg-white/10 border-blue-500/40 shadow-md"
                              : "bg-[#0b0f19]/60 border-white/5 hover:border-white/15"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-sm text-white flex items-center gap-2">
                              <i
                                className={`${route.icon} text-xs`}
                                style={{ color: activeSite.color }}
                              ></i>
                              {route.title}
                            </span>
                            <code className="text-[11px] text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
                              {route.path}
                            </code>
                          </div>
                          <p className="text-xs text-gray-400 leading-relaxed">
                            {route.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 text-[11px] text-gray-500 flex items-center justify-between">
                    <span>Real-time capture via Microlink Engine</span>
                    <i className="fas fa-bolt text-yellow-500"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* Main GitHub Layout: 2/3 README.md + 1/3 Repo Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Turbinated README.md (2/3 width) */}
              <div className="lg:col-span-2 bg-[#121826] border border-white/10 rounded-xl overflow-hidden">
                {/* README.md Sticky Header Bar */}
                <div className="bg-[#161f30] px-6 py-3.5 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-sm font-mono font-bold text-white">
                    <i className="fas fa-book-open text-gray-400"></i>
                    <span>README.md</span>
                  </div>
                  <span className="text-[11px] font-mono text-gray-400 bg-[#0b0f19] px-2.5 py-1 rounded border border-white/5">
                    Enhanced Interactive View
                  </span>
                </div>

                {/* README Body */}
                <div className="p-6 md:p-8 space-y-8">
                  {/* Section 1: Overview */}
                  <section>
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-3 pb-2 border-b border-white/10 flex items-center gap-2">
                      <span>⚡ What is {activeSite.name}?</span>
                    </h2>
                    <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                      {activeSite.description}
                    </p>
                  </section>

                  {/* Section 2: Core Highlights Grid */}
                  <section>
                    <h2 className="text-xl font-bold text-white mb-4 pb-2 border-b border-white/10">
                      🔥 Core Engineering Highlights
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activeSite.highlights.map((item, idx) => (
                        <div
                          key={idx}
                          className="bg-[#0b0f19] border border-white/10 p-4 rounded-xl hover:border-white/20 transition-all"
                        >
                          <div className="flex items-center gap-2.5 mb-2">
                            <i
                              className={`${item.icon} text-base`}
                              style={{ color: activeSite.color }}
                            ></i>
                            <h3 className="font-bold text-white text-sm">
                              {item.title}
                            </h3>
                          </div>
                          <p className="text-xs text-gray-400 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Section 3: Repository Anatomy (File Tree) */}
                  <section>
                    <h2 className="text-xl font-bold text-white mb-4 pb-2 border-b border-white/10">
                      📂 Repository Anatomy
                    </h2>
                    <div className="bg-[#0b0f19] border border-white/10 rounded-xl p-4 font-mono text-xs space-y-2.5 overflow-x-auto">
                      <div className="text-blue-400 font-bold mb-2">
                        {activeSite.name}/
                      </div>
                      {activeSite.fileTree.map((item, index) => (
                        <div
                          key={index}
                          className="flex flex-col sm:flex-row sm:items-center justify-between py-1 px-2 rounded hover:bg-white/5 transition-colors gap-1"
                        >
                          <div className="flex items-center gap-2.5 text-gray-200">
                            <span className="text-gray-600">
                              {index === activeSite.fileTree.length - 1
                                ? "└──"
                                : "├──"}
                            </span>
                            <i
                              className={`${
                                item.isFolder
                                  ? "fas fa-folder text-blue-400"
                                  : "fas fa-file-code text-gray-400"
                              }`}
                            ></i>
                            <span
                              className={
                                item.isFolder ? "font-bold text-white" : ""
                              }
                            >
                              {item.name}
                            </span>
                          </div>
                          <span className="text-gray-500 text-[11px] pl-8 sm:pl-0">
                            # {item.comment}
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Section 4: Quick Start (Public Repo) OR Architecture Flow (Private Repo) */}
                  {!activeSite.isPrivate ? (
                    <section>
                      <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
                        <h2 className="text-xl font-bold text-white">
                          🚀 Running Locally in 30 Seconds
                        </h2>
                        <button
                          onClick={handleCopyCommands}
                          className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg text-gray-300 flex items-center gap-2 transition-all"
                        >
                          <i
                            className={`fas ${
                              copiedCmd
                                ? "fa-check text-emerald-400"
                                : "fa-copy"
                            }`}
                          ></i>
                          <span>{copiedCmd ? "Copied!" : "Copy Commands"}</span>
                        </button>
                      </div>
                      <pre className="bg-[#0b0f19] border border-white/10 rounded-xl p-4 font-mono text-xs text-gray-300 overflow-x-auto leading-relaxed">
                        <code>
                          <span className="text-gray-500">
                            # 1. Clone the repository
                          </span>
                          {"\n"}
                          git clone
                          https://github.com/FtxTenorio/itenorio.com.git
                          {"\n"}
                          cd itenorio.com{"\n\n"}
                          <span className="text-gray-500">
                            # 2. Install dependencies
                          </span>
                          {"\n"}
                          npm install{"\n\n"}
                          <span className="text-gray-500">
                            # 3. Spin up the Vite development server with HMR
                          </span>
                          {"\n"}
                          npm run dev{"\n\n"}
                          <span className="text-gray-500">
                            # 4. Build optimized multi-page bundle for
                            production
                          </span>
                          {"\n"}
                          npm run build
                        </code>
                      </pre>
                    </section>
                  ) : (
                    <section>
                      <h2 className="text-xl font-bold text-white mb-4 pb-2 border-b border-white/10">
                        🔄 Architecture & Booking Flow
                      </h2>
                      <div className="bg-[#0b0f19] border border-white/10 rounded-xl p-5 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                            <i className="fas fa-server"></i>
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white">
                              1. Next.js 14 SSG + S3
                            </div>
                            <div className="text-[11px] text-gray-400">
                              WebP galleries & Swiper.js UI
                            </div>
                          </div>
                        </div>

                        <i className="fas fa-arrow-right text-gray-600 hidden md:block"></i>
                        <i className="fas fa-arrow-down text-gray-600 md:hidden"></i>

                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                            <i className="fas fa-sliders"></i>
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white">
                              2. Reservation Trigger
                            </div>
                            <div className="text-[11px] text-gray-400">
                              Date & guest parameter bridge
                            </div>
                          </div>
                        </div>

                        <i className="fas fa-arrow-right text-gray-600 hidden md:block"></i>
                        <i className="fas fa-arrow-down text-gray-600 md:hidden"></i>

                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                            <i className="fas fa-hotel"></i>
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white">
                              3. Hospedin PMS
                            </div>
                            <div className="text-[11px] text-gray-400">
                              Real-time availability & checkout
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}

                  {/* Section 5: Interactive Secret Lore / Deep Dive Accordion */}
                  {activeSite.lore && (
                  <section>
                    <button
                      onClick={() => setLoreOpen(!loreOpen)}
                      className="w-full bg-gradient-to-r from-[#161f30] to-[#1a1829] hover:brightness-110 border border-purple-500/20 rounded-xl p-4 flex items-center justify-between text-left transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <i className="fas fa-user-secret text-purple-400 text-lg"></i>
                        <span className="font-bold text-sm md:text-base text-white">
                          {activeSite.lore.question}
                        </span>
                      </div>
                      <i
                        className={`fas fa-chevron-down text-gray-400 transition-transform duration-300 ${
                          loreOpen ? "rotate-180 text-purple-400" : ""
                        }`}
                      ></i>
                    </button>

                    {loreOpen && (
                      <div className="mt-2 bg-[#0b0f19] border border-white/10 rounded-xl p-5 text-sm space-y-3 animate-fade-in">
                        <blockquote className="border-l-2 border-purple-400 pl-4 italic text-gray-400 text-xs md:text-sm">
                          {activeSite.lore.quote}
                        </blockquote>
                        <p className="text-gray-300 leading-relaxed text-xs md:text-sm">
                          {activeSite.lore.answer}
                        </p>
                      </div>
                    )}
                  </section>
                  )}
                </div>
              </div>

              {/* Right Column: GitHub-Style Repo Sidebar (1/3 width) */}
              <div className="lg:col-span-1 space-y-6">
                {/* About Box */}
                <div className="bg-[#121826] border border-white/10 p-6 rounded-xl space-y-4">
                  <h3 className="text-base font-bold text-white">About</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {activeSite.description}
                  </p>

                  <div className="pt-2 space-y-2.5 text-xs">
                    <a
                      href={activeSite.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 text-blue-400 hover:underline font-medium"
                    >
                      <i className="fas fa-link text-gray-400"></i>
                      <span>{activeSite.liveUrl}</span>
                    </a>

                    <div className="flex items-center gap-2.5 text-gray-400">
                      <i className="fas fa-shield-halved"></i>
                      <span>
                        {activeSite.isPrivate
                          ? "Private Client Repository"
                          : "Public Open-Source Showcase"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5 text-gray-400">
                      <i className="fas fa-server"></i>
                      <span>AWS CloudFront + Serverless Ready</span>
                    </div>
                  </div>
                </div>

                {/* Tech Stack & Cloud Infrastructure */}
                <div className="bg-[#121826] border border-white/10 p-6 rounded-xl">
                  <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                    <i className="fas fa-microchip text-blue-400"></i>
                    <span>Tech Stack & Infra</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {activeSite.stack.map((tech) => (
                      <span
                        key={tech}
                        className="bg-[#0b0f19] border border-white/10 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* GitHub Language Breakdown Bar */}
                <div className="bg-[#121826] border border-white/10 p-6 rounded-xl">
                  <h3 className="text-base font-bold text-white mb-3">
                    Languages
                  </h3>

                  {/* Multi-color Progress Bar */}
                  <div className="w-full h-2.5 rounded-full overflow-hidden flex bg-[#0b0f19] mb-4">
                    {activeSite.languages.map((lang) => (
                      <div
                        key={lang.name}
                        style={{
                          width: `${lang.percent}%`,
                          backgroundColor: lang.color,
                        }}
                        title={`${lang.name}: ${lang.percent}%`}
                      ></div>
                    ))}
                  </div>

                  {/* Legend */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {activeSite.languages.map((lang) => (
                      <div key={lang.name} className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: lang.color }}
                        ></span>
                        <span className="text-white font-medium">
                          {lang.name}
                        </span>
                        <span className="text-gray-500">{lang.percent}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Engineering Credentials / Guarantee */}
                <div className="bg-[#121826] border border-white/10 p-6 rounded-xl">
                  <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <i className="fas fa-award text-amber-400"></i>
                    <span>Engineering Standard</span>
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4">
                    Architected by Paulo Tenório (iTenorio Tech) applying AWS
                    certified cloud patterns, strict security headers, and
                    zero-bloat Vite bundling.
                  </p>
                  <a
                    href="mailto:contact@itenorio.com"
                    className="w-full inline-flex items-center justify-center gap-2 bg-white/5 border border-white/15 hover:bg-white/10 text-white px-4 py-2.5 rounded-lg transition-all text-xs font-semibold"
                  >
                    <i className="fas fa-envelope"></i>
                    <span>Inquire About Custom Architecture</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
