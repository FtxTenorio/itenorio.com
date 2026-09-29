import React, { useState } from "react";

// Helper function to generate real-time website screenshots for free via Microlink API
const getLiveScreenshot = (url) =>
  `https://api.microlink.io/?url=${encodeURIComponent(
    url,
  )}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1280&viewport.height=800`;

// Internal component to render the Website Preview Card (reused on Mobile and Desktop)
const WebsitePreview = ({ site, onOpen }) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="w-full bg-[#121826] border border-white/10 rounded-2xl p-6 md:p-10 flex flex-col items-center text-center relative overflow-hidden shadow-2xl">
      {/* Glow Background */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 blur-[110px] rounded-full pointer-events-none opacity-20"
        style={{ backgroundColor: site.color }}
      ></div>

      {/* Top Repo Badge & Visibility */}
      <div className="flex items-center gap-2 mb-5 relative z-10 bg-black/40 border border-white/10 px-3.5 py-1.5 rounded-full text-xs text-gray-300">
        <i className="fab fa-github text-sm text-white"></i>
        <span className="font-mono">{site.repoName}</span>
        <span
          className={`ml-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
            site.isPrivate
              ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
              : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
          }`}
        >
          {site.isPrivate ? "Private" : "Public"}
        </span>
      </div>

      {/* Live Browser Frame Preview */}
      <div
        onClick={() => onOpen(site.id)}
        className="w-full max-w-lg rounded-xl overflow-hidden border border-white/15 bg-[#0b0f19] shadow-2xl mb-6 relative z-10 group cursor-pointer"
      >
        {/* Browser Top Bar */}
        <div className="bg-[#1a2234] px-4 py-2.5 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
          </div>
          <div className="bg-[#0b0f19] border border-white/5 rounded-md px-3 py-1 text-[11px] font-mono text-gray-400 flex items-center gap-2 max-w-[220px] sm:max-w-xs truncate">
            <i className="fas fa-lock text-[9px] text-emerald-400"></i>
            <span className="truncate">{site.liveUrl}</span>
          </div>
          <div className="text-gray-500 text-xs">
            <i className="fas fa-expand-alt group-hover:text-white transition-colors"></i>
          </div>
        </div>

        {/* Live Screenshot Area */}
        <div className="relative aspect-video w-full bg-[#0b0f19] overflow-hidden flex items-center justify-center">
          {!imgLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-gray-500 text-xs animate-pulse">
              <i className="fas fa-circle-notch fa-spin text-xl text-blue-400"></i>
              <span>Capturing live preview...</span>
            </div>
          )}
          <img
            src={getLiveScreenshot(site.liveUrl)}
            alt={`${site.name} live preview`}
            onLoad={() => setImgLoaded(true)}
            className={`w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-105 ${
              imgLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-transparent to-transparent opacity-60"></div>
          <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded text-[10px] font-mono text-emerald-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            Live Capture
          </div>
        </div>
      </div>

      {/* Title & Description */}
      <div className="flex items-center gap-2.5 mb-2 relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
          {site.name}
        </h2>
        <i
          className="fas fa-check-circle text-blue-500 text-sm"
          title="Production Ready"
        ></i>
      </div>

      <p className="text-gray-400 text-sm md:text-base mb-6 max-w-lg relative z-10 leading-relaxed">
        {site.description}
      </p>

      {/* Tech Pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-8 relative z-10 max-w-lg">
        {site.stack.slice(0, 5).map((tech) => (
          <span
            key={tech}
            className="bg-black/30 border border-white/10 px-3 py-1 rounded-full text-xs font-medium text-gray-300"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
        <button
          onClick={() => onOpen(site.id)}
          style={{
            backgroundImage: `linear-gradient(to right, ${site.color}, ${site.secondaryColor})`,
          }}
          className="group relative inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-xl font-bold text-white shadow-lg hover:brightness-110 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 overflow-hidden w-full sm:w-auto"
        >
          <i className="fas fa-book-open text-sm"></i>
          <span>Interactive README</span>
          <i className="fas fa-arrow-right text-xs opacity-90 group-hover:translate-x-1 transition-transform duration-200"></i>
        </button>

        <a
          href={site.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-gray-200 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 w-full sm:w-auto"
        >
          <i className="fas fa-globe text-blue-400"></i>
          <span>Visit Website</span>
          <i className="fas fa-external-link-alt text-xs text-gray-400 group-hover:text-white transition-colors"></i>
        </a>

        {site.githubUrl && (
          <a
            href={site.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-gray-300 bg-[#0b0f19] hover:bg-white/5 border border-white/10 transition-all duration-300 w-full sm:w-auto"
            title="View Source on GitHub"
          >
            <i className="fab fa-github text-lg"></i>
            <span className="sm:hidden">GitHub Repository</span>
          </a>
        )}
      </div>
    </div>
  );
};

export default function Websites() {
  const [activeSiteId, setActiveSiteId] = useState(null);
  const [previewId, setPreviewId] = useState("itenorio");
  const [selectedRoute, setSelectedRoute] = useState("https://itenorio.com");
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [loreOpen, setLoreOpen] = useState(false);

  const websites = [
    {
      id: "itenorio",
      name: "itenorio.com",
      repoName: "FtxTenorio/itenorio.com",
      shortDesc: "Multi-entry React + Vite engineering hub & serverless suite.",
      description:
        "Engineered as a multi-entry React + Vite application serving as my personal software consultancy hub (iTenorio Tech), a live showcase for browser extensions, and a web client for AWS serverless utilities.",
      liveUrl: "https://itenorio.com",
      githubUrl: "https://github.com/FtxTenorio/itenorio.com",
      isPrivate: false,
      color: "#3b82f6",
      secondaryColor: "#6366f1",
      icon: "fa-solid fa-terminal",
      updatedAt: "September 2026",
      architectureType: "Multi-Page Vite + AWS Serverless",
      stack: [
        "React 18",
        "Vite (Multi-Page Rollup)",
        "Tailwind CSS",
        "AWS Lambda",
        "API Gateway",
        "DynamoDB",
        "CloudFront CDN",
        "GitHub Actions CI/CD",
      ],
      languages: [
        { name: "JavaScript", percent: 96.9, color: "#f1e05a" },
        { name: "HTML", percent: 2.8, color: "#e34c26" },
        { name: "CSS", percent: 0.3, color: "#563d7c" },
      ],
      routes: [
        {
          title: "Main Engineering Hub",
          path: "/",
          url: "https://itenorio.com",
          icon: "fa-solid fa-house-laptop",
          desc: "Interactive portfolio, consultancy overview, AWS certifications, career timeline, and the integrated <TheOneRing /> 3D visual component.",
        },
        {
          title: "Extensions Hub",
          path: "/extensions",
          url: "https://itenorio.com/extensions",
          icon: "fa-solid fa-puzzle-piece",
          desc: "Dedicated showcase featuring dynamic extension preview cards, privacy policies, and direct Chrome Web Store integrations.",
        },
        {
          title: "URL Shortener Client",
          path: "/shortener",
          url: "https://itenorio.com/shortener",
          icon: "fa-solid fa-link",
          desc: "Sleek frontend interface for minting instant, low-latency short links under link.itenorio.com powered by AWS Lambda & DynamoDB.",
        },
      ],
      highlights: [
        {
          title: "Multi-Page Vite Architecture",
          desc: "Custom vite.config.js splitting independent entry points (/, /extensions, and /shortener) while sharing core UI state and navigation.",
          icon: "fa-solid fa-bolt",
        },
        {
          title: "Serverless Link Shortener Client",
          desc: "Dedicated route integrated with an AWS Serverless backend (Lambda + API Gateway + DynamoDB) to generate short links.",
          icon: "fa-brands fa-aws",
        },
        {
          title: "CloudFront Asset Delivery",
          desc: "Static artifacts, high-res assets, and custom 3D visual elements served globally with low latency via Amazon CloudFront.",
          icon: "fa-solid fa-cloud-bolt",
        },
        {
          title: "Interactive UI & Easter Eggs",
          desc: "Custom animations, responsive raw/split Navbar layouts, and the <TheOneRing /> component integrated right into the core app.",
          icon: "fa-solid fa-wand-magic-sparkles",
        },
      ],
      fileTree: [
        {
          name: ".github/workflows/",
          comment: "🚀 Automated CI/CD pipelines & build output workflows",
          isFolder: true,
        },
        {
          name: "extensions/",
          comment: "🧩 Entry point & routing setup for itenorio.com/extensions",
          isFolder: true,
        },
        {
          name: "public/",
          comment: "🎨 Static assets, icons & 3D/visual artifacts (TheOneRing)",
          isFolder: true,
        },
        {
          name: "shortener/",
          comment: "🔗 Entry point & logic for itenorio.com/shortener",
          isFolder: true,
        },
        {
          name: "src/",
          comment:
            "⚛️ Core React components, Navbar, TheOneRing & Preview Cards",
          isFolder: true,
        },
        {
          name: "index.html",
          comment: "🏠 Main portfolio entry point",
          isFolder: false,
        },
        {
          name: "vite.config.js",
          comment: "⚡ Multi-page Vite bundler & route configuration",
          isFolder: false,
        },
        {
          name: "package.json",
          comment: "📦 Dependencies & build scripts",
          isFolder: false,
        },
      ],
      lore: {
        question:
          "💍 What is TheOneRing doing in a software engineer's portfolio?",
        quote:
          '"One Ring to rule them all, One Ring to find them, One Ring to bring them all and in the darkness bind them."',
        answer:
          "Because a personal website shouldn't look like a boring corporate spreadsheet. I built and integrated the TheOneRing component inside src/ & public/ to give the main landing page a unique interactive centerpiece.",
      },
    },
    {
      id: "chaledacris",
      name: "Chalé da Cris",
      repoName: "FtxTenorio/src-frontend-chale-da-cris-website",
      shortDesc:
        "Next.js 14 coastal pousada platform & Hospedin booking engine.",
      description:
        "Institutional website and reservation showcase for Chalé da Cris, a coastal pousada located in Fortim, Ceará, Brazil. Engineered with Next.js 14 (App Router & SSG), TypeScript, and automated WebP image pipelines, integrated with the Hospedin booking engine.",
      liveUrl: "https://chaledacris.com",
      githubUrl: null, // Private repository
      isPrivate: true,
      color: "#10b981",
      secondaryColor: "#059669",
      icon: "fa-solid fa-umbrella-beach",
      updatedAt: "June 2026",
      architectureType: "Next.js 14 (App Router / SSG) + AWS S3",
      stack: [
        "Next.js 14 (App Router)",
        "TypeScript (Strict Mode)",
        "Tailwind CSS",
        "Styled Components (SSR)",
        "Swiper.js",
        "Hospedin Booking Engine",
        "AWS S3 (Cache-Control CI/CD)",
        "WebP Processing Scripts",
      ],
      languages: [
        { name: "TypeScript", percent: 95.0, color: "#3178c6" },
        { name: "JavaScript", percent: 4.4, color: "#f1e05a" },
        { name: "CSS", percent: 0.6, color: "#563d7c" },
      ],
      routes: [
        {
          title: "Home & Pousada Overview",
          path: "/",
          url: "https://chaledacris.com",
          icon: "fa-solid fa-house-chimney-window",
          desc: "Automated hero carousel, highlighted chalets, amenities overview, restaurant preview, and direct Hospedin reservation triggers.",
        },
        {
          title: "Chalets Catalog",
          path: "/chales",
          url: "https://chaledacris.com/chales",
          icon: "fa-solid fa-bed",
          desc: "Complete chalet listings and dedicated pages featuring fullscreen Swiper.js galleries, capacity details, pricing, and amenities.",
        },
        {
          title: "Restaurant & Menu",
          path: "/restaurante",
          url: "https://chaledacris.com/restaurante",
          icon: "fa-solid fa-utensils",
          desc: "Full digital menu, operating hours, and details for breakfast, lunch, dinner, and coastal snacks.",
        },
        {
          title: "About Fortim & History",
          path: "/sobre",
          url: "https://chaledacris.com/sobre",
          icon: "fa-solid fa-compass",
          desc: "The story behind Chalé da Cris, tourism highlights in Córrego de Maceió (Fortim - CE), and regional photo galleries.",
        },
        {
          title: "Contact & Location",
          path: "/contato",
          url: "https://chaledacris.com/contato",
          icon: "fa-solid fa-map-location-dot",
          desc: "Interactive Google Maps embed, direct WhatsApp booking channels, contact form, and social links.",
        },
      ],
      highlights: [
        {
          title: "Next.js 14 SSG & Styled SSR",
          desc: "Built on Next.js 14 App Router with Static Site Generation (SSG) and a custom StyledComponentsRegistry for zero-flash server-side style rendering.",
          icon: "fa-solid fa-bolt",
        },
        {
          title: "Custom WebP Image Pipeline",
          desc: "Automated Node.js scripts (resize.js & refactor.js) paired with a custom <OptimizedImage /> component for progressive lazy-loading of high-res chalet photos.",
          icon: "fa-solid fa-images",
        },
        {
          title: "Hospedin PMS Integration",
          desc: "Seamless reservation flow connecting the static showcase with the Hospedin partner booking engine for real-time availability and checkout.",
          icon: "fa-solid fa-calendar-check",
        },
        {
          title: "AWS S3 Cache-Optimized CI/CD",
          desc: "GitHub Actions workflow deploying static production builds directly to AWS S3 with fine-tuned Cache-Control headers and automated SEO/OpenGraph metadata.",
          icon: "fa-brands fa-aws",
        },
      ],
      fileTree: [
        {
          name: ".github/workflows/",
          comment:
            "🚀 AWS S3 deployment pipeline with custom Cache-Control headers",
          isFolder: true,
        },
        {
          name: "public/",
          comment: "🤖 Static assets, optimized WebP media & robots.txt",
          isFolder: true,
        },
        {
          name: "src/app/(main)/",
          comment:
            "🧭 App Router pages: /chales, /restaurante, /sobre & /contato",
          isFolder: true,
        },
        {
          name: "src/components/",
          comment: "⚛️ Reusable UI, Header, OptimizedImage & Swiper carousels",
          isFolder: true,
        },
        {
          name: "src/data/chales.ts",
          comment:
            "📋 Strongly-typed chalet catalog, pricing, capacity & amenities",
          isFolder: false,
        },
        {
          name: "next.config.ts",
          comment:
            "⚡ Next.js 14 configuration & StyledComponentsRegistry SSR setup",
          isFolder: false,
        },
        {
          name: "refactor.js & resize.js",
          comment:
            "🖼️ Custom Node.js scripts for batch WebP conversion & resizing",
          isFolder: false,
        },
        {
          name: "tsconfig.json",
          comment: "🛡️ Strict TypeScript configuration (95% TS codebase)",
          isFolder: false,
        },
      ],
      lore: {
        question:
          "🏖️ How were image performance and bookings engineered for Fortim, CE?",
        quote:
          '"Delivering rich fullscreen photography on coastal mobile networks without sacrificing page speed."',
        answer:
          "Hospitality websites rely heavily on high-resolution photography, which often hurts mobile performance for travelers on 4G. By writing custom Node.js batch scripts (resize.js and refactor.js) to convert and compress assets into WebP before bundling, combined with Next.js 14 Static Site Generation (SSG), AWS S3 cache-control headers, and the Hospedin booking engine, guests can browse fullscreen Swiper.js chalet galleries and book their stay in Fortim with instant load times.",
      },
    },
  ];

  const activePreview = websites.find((s) => s.id === previewId);
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
    <div className="min-h-screen bg-[#0b0f19] text-white pt-20 pb-24 w-full">
      <main className="px-4 md:px-6 max-w-6xl mx-auto flex flex-col items-center w-full">
        {/* === VIEW 1: LIST AND PREVIEW === */}
        {!activeSite && (
          <div className="w-full animate-fade-in">
            <div className="mb-10 text-left w-full">
              <h1 className="text-3xl md:text-4xl font-bold mb-3 text-white tracking-tight">
                Websites & Platforms
              </h1>
              <p className="text-gray-400 text-sm md:text-base max-w-2xl">
                Production web applications engineered with React, Vite, and AWS
                cloud infrastructure. Select a project to inspect its live
                capture and interactive architecture README.
              </p>
            </div>

            {/* Mobile Layout: Stacked cards directly */}
            <div className="flex lg:hidden flex-col gap-8 w-full">
              {websites.map((site) => (
                <WebsitePreview
                  key={site.id}
                  site={site}
                  onOpen={handleOpenSite}
                />
              ))}
            </div>

            {/* Desktop Layout: Side menu + Central preview */}
            <div className="hidden lg:flex flex-row gap-10 w-full items-start">
              {/* Side Selection Menu */}
              <div className="w-1/3 flex flex-col gap-3">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 px-1">
                  Deployed Projects
                </h3>
                {websites.map((site) => (
                  <button
                    key={site.id}
                    onClick={() => setPreviewId(site.id)}
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 text-left w-full ${
                      previewId === site.id
                        ? "bg-white/10 border-white/20 shadow-lg"
                        : "bg-[#121826] border-white/5 hover:border-white/10 hover:bg-white/5"
                    }`}
                  >
                    <div className="w-12 h-12 rounded-lg bg-[#0b0f19] border border-white/10 flex items-center justify-center shrink-0">
                      <i
                        className={`${site.icon} text-xl`}
                        style={{ color: site.color }}
                      ></i>
                    </div>
                    <div className="flex-grow overflow-hidden">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-white text-sm truncate">
                          {site.name}
                        </h4>
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded font-mono uppercase ${
                            site.isPrivate
                              ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                              : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          }`}
                        >
                          {site.isPrivate ? "Private" : "Public"}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 truncate">
                        {site.shortDesc}
                      </p>
                    </div>
                    <div className="shrink-0">
                      <i
                        className={`fas fa-chevron-right text-xs transition-colors ${
                          previewId === site.id
                            ? "text-blue-400"
                            : "text-transparent"
                        }`}
                      ></i>
                    </div>
                  </button>
                ))}
              </div>

              {/* Central Preview */}
              <div className="w-2/3">
                <WebsitePreview site={activePreview} onOpen={handleOpenSite} />
              </div>
            </div>
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
      </main>

      <style>{`
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
