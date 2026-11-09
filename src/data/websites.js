export const websites = [
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
