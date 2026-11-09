<div align="center">
 
  <!-- ================= HERO BANNER (VENOM NEON) ================= -->
  <img src="https://capsule-render.vercel.app/api?type=venom&color=0:090d16,50:1e1b4b,100:0284c7&height=230&section=header&text=itenorio.com&fontSize=56&fontColor=38bdf8&stroke=ffffff&strokeWidth=1&animation=twinkling&fontAlignY=38&desc=Digital%20HQ%20%E2%80%A2%20Extensions%20Hub%20%E2%80%A2%20Serverless%20URL%20Shortener&descAlignY=62&descSize=18" width="100%" alt="itenorio.com Banner" /> 

  <!-- ================= TYPING SVG ================= -->
  <a href="https://itenorio.com">
    <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=700&size=20&duration=2600&pause=800&color=38BDF8&center=true&vCenter=true&multiline=false&repeat=true&width=850&height=50&lines=Not+just+a+static+portfolio+%E2%80%94+it+is+a+live+web+ecosystem+%E2%9A%A1;React+Router+%2B+Vite+Architecture+%F0%9F%9A%80;Home+of+itenorio.com%2Fextensions+and+itenorio.com%2Fshortener+%F0%9F%94%97" alt="Typing SVG" />
  </a>

  <br/>

  <!-- ================= STATUS & TECH BADGES ================= -->
  <p align="center">
    <a href="https://itenorio.com" target="_blank">
      <img src="https://img.shields.io/website?url=https%3A%2F%2Fitenorio.com&up_message=ONLINE%20%E2%9A%A1&down_message=OFFLINE&label=itenorio.com&style=for-the-badge&color=10b981&labelColor=0f172a" alt="Website Status" />
    </a>
    <img src="https://img.shields.io/github/last-commit/FtxTenorio/itenorio.com?style=for-the-badge&color=6366f1&labelColor=0f172a&logo=git&logoColor=white" alt="Last Commit" />
  </p>

  <!-- ================= QUICK NAVIGATION PILLS ================= -->
  <p align="center">
    <a href="https://itenorio.com" target="_blank">
      <img src="https://img.shields.io/badge/%F0%9F%8F%A0_Main_Hub-itenorio.com-0284c7?style=for-the-badge&labelColor=090d16" alt="Main Hub" />
    </a>
    <a href="https://itenorio.com/extensions" target="_blank">
      <img src="https://img.shields.io/badge/%F0%9F%A7%A9_Extensions_Showcase-%2Fextensions-8b5cf6?style=for-the-badge&labelColor=090d16" alt="Extensions" />
    </a>
    <a href="https://itenorio.com/shortener" target="_blank">
      <img src="https://img.shields.io/badge/%F0%9F%94%97_URL_Shortener-%2Fshortener-ec4899?style=for-the-badge&labelColor=090d16" alt="Shortener" />
    </a>
  </p>

</div>

---

### ⚡ What is `itenorio.com`?

**`itenorio.com`** is the website of **iTenorio Tech** (ITENORIO TECH DESENVOLVIMENTO DE SOFTWARE LTDA, CNPJ 68.333.521/0001-02) — a React + Vite single-page app that serves as the company home with **Crunchyroll Navigator** as the featured product, my career page (`/career`), a showcase for browser extensions, and a web client for my serverless utilities.

<table align="center" width="100%">
  <tr>
    <td width="55%" valign="top">
      <h4>🔥 Core Highlights</h4>
      <ul>
        <li><b>One SPA, static-host friendly:</b> <code>react-router</code> routes in <code>src/App.jsx</code>; a tiny Vite plugin emits one <code>index.html</code> per route (listed in <code>src/config/routes.js</code>) so S3 + CloudFront serve every URL directly.</li>
        <li><b>Dynamic Extension Preview Cards:</b> Interactive showcase rendering live metadata, previews, and store links for my browser tools (such as <i>Crunchyroll Navigator</i>).</li>
        <li><b>Serverless Link Shortener Client:</b> Dedicated <code>/shortener</code> route integrated with my AWS Serverless backend (Lambda + API Gateway + DynamoDB) to mint short links under <code>link.itenorio.com</code>.</li>
        <li><b>SEO-ready static output:</b> every route is pre-rendered to real HTML at build time, with per-page metadata, Open Graph images and schema.org JSON-LD.</li>
      </ul>
    </td>
    <td width="45%" valign="top">
      <h4 align="center">🛠️ Built With</h4>
      <div align="center">
        <br/>
        <img src="https://skillicons.dev/icons?i=react,vite,js,html,css,aws,githubactions,git&perline=4&theme=dark" alt="Tech Stack" />
        <br/><br/>
      </div>
      <pre lang="diff">
+ React Router SPA + per-route static HTML (Vite)
+ Automated CI/CD via GitHub Actions
+ Zero-bloat Fast Refresh & ESLint
+ Interactive 3D/Visual Easter Eggs</pre>
    </td>
  </tr>
</table>

---

### 🖥️ Live Ecosystem & Route Previews

> 💡 *Click any card below to jump straight into the live route in production:*

<table align="center" width="100%">
  <tr>
    <td width="33%" align="center" valign="top">
      <h4>🏠 1. Company Home</h4>
      <a href="https://itenorio.com" target="_blank">
        <!-- DICA: Se quiser usar um print local da pasta public, troque o src abaixo por "./public/nome-da-imagem.png" -->
        <img src="https://image.thum.io/get/width/600/crop/400/noanimate/https://itenorio.com" width="100%" alt="itenorio.com preview" />
      </a>
      <p align="left">
        <b>Route:</b> <code><a href="https://itenorio.com">itenorio.com/</a></code><br/>
        iTenorio Tech company page: featured product (Crunchyroll Navigator), services, founder and contact/legal details. My résumé lives at <code><a href="https://itenorio.com/career">/career</a></code>.
      </p>
    </td>
    <td width="33%" align="center" valign="top">
      <h4>🧩 2. Extensions Hub</h4>
      <a href="https://itenorio.com/extensions" target="_blank">
        <!-- DICA: Você pode trocar o src abaixo pela imagem da extensão na sua pasta public/ ou src/ -->
        <img src="https://image.thum.io/get/width/600/crop/400/noanimate/https://itenorio.com/extensions" width="100%" alt="itenorio.com/extensions preview" />
      </a>
      <p align="left">
        <b>Route:</b> <code><a href="https://itenorio.com/extensions">/extensions</a></code><br/>
        Dedicated showcase featuring dynamic extension preview cards, enhanced layouts, and direct Chrome Web Store integrations.
      </p>
    </td>
    <td width="33%" align="center" valign="top">
      <h4>🔗 3. URL Shortener App</h4>
      <a href="https://itenorio.com/shortener" target="_blank">
        <!-- DICA: Você pode trocar o src abaixo por um print do shortener da sua pasta public/ -->
        <img src="https://image.thum.io/get/width/600/crop/400/noanimate/https://itenorio.com/shortener" width="100%" alt="itenorio.com/shortener preview" />
      </a>
      <p align="left">
        <b>Route:</b> <code><a href="https://itenorio.com/shortener">/shortener</a></code><br/>
        Sleek frontend interface for creating instant, low-latency short URLs powered by AWS Lambda & DynamoDB.
      </p>
    </td>
  </tr>
</table>

---

### 🧠 System Architecture & Routing Flow

> *How a single repository powers the portfolio, the extensions catalog, and the serverless shortener interface:*

```mermaid
flowchart TB
    subgraph Repo["📦 FtxTenorio/itenorio.com (Vite + React Router)"]
        CFG["🗺️ src/config/routes.js (every public URL)"]
        V["⚙️ scripts/prerender.mjs (renders dist/&lt;route&gt;/index.html + sitemap.xml)"]
        APP["🧭 src/App.jsx (routes) → layouts/SiteLayout.jsx (navbar + footer)"]
        P["📄 src/pages/* (home, career, extensions, websites, shortener)"]
        D["🗃️ src/data/* (company, extensions, career, websites...)"]
        CFG --> V
        CFG --> APP --> P --> D
    end

    subgraph Cloud["☁️ Production & Serverless Backend"]
        GA["🚀 GitHub Actions (.github/workflows)"]
        CDN["🌐 S3 + CloudFront (itenorio.com)"]
        API["λ AWS API Gateway + Lambda (link.itenorio.com)"]
        DB[("⚡ Amazon DynamoDB")]
    end

    Repo -->|Push to master| GA
    GA -->|npm run build → s3 sync dist/| CDN
    P -->|/shortener → POST /links| API
    API --> DB

    style Repo fill:#0f172a,stroke:#38bdf8,stroke-width:2px,color:#fff
    style Cloud fill:#064e3b,stroke:#34d399,stroke-width:2px,color:#fff
```

---

### 📂 Repository Anatomy

```text
itenorio.com/
├── .github/workflows/        # 🚀 CI/CD: build + sync dist/ to S3, invalidate CloudFront
├── public/                   # 🎨 Static files copied as-is (favicons, robots.txt)
├── index.html                # The only HTML template (meta filled in per route at build)
├── vite.config.js            # Vite + React + Tailwind
├── scripts/prerender.mjs     # After the build: pre-renders dist/<route>/index.html, 404.html, sitemap.xml
└── src/
    ├── main.jsx              # Browser entry: hydrates the pre-rendered HTML
    ├── entry-server.jsx      # Build-time entry used by scripts/prerender.mjs
    ├── App.jsx               # All routes (react-router)
    ├── config/routes.js      # Every public URL + its <title>/description/share image
    ├── config/structuredData.js # schema.org JSON-LD per route
    ├── layouts/SiteLayout.jsx# Navbar + footer + page meta + scroll handling
    ├── components/
    │   ├── layout/           # Navbar, Footer, Logo
    │   └── ui/               # Section, PageLoader
    ├── pages/
    │   ├── home/             # /            company home (sections/)
    │   ├── career/           # /career      résumé (components/)
    │   ├── extensions/       # /extensions, /extensions/:slug, …/crunchy-navigator/privacy-policy
    │   ├── websites/         # /websites
    │   ├── shortener/        # /shortener   (talks to link.itenorio.com)
    │   └── NotFoundPage.jsx
    └── data/                 # Content: company, extensions, websites, career, tech stack…
```

**Adding a page:** create it under `src/pages/<name>/`, add a `<Route>` in `src/App.jsx` and an entry in `src/config/routes.js` (so the build creates `dist/<name>/index.html`).

---

### 🚀 Running Locally in 30 Seconds

<div align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=500&size=14&duration=2200&pause=800&color=10B981&background=0D1117&center=true&vCenter=true&multiline=false&width=650&height=38&lines=%24+git+clone+https%3A%2F%2Fgithub.com%2FFtxTenorio%2Fitenorio.com.git;%24+npm+install+%26%26+npm+run+dev;%E2%9E%9C+Local%3A+http%3A%2F%2Flocalhost%3A5173%2F+(Ready+in+180ms)" alt="Terminal" />
</div>

```bash
# 1. Clone the repository
git clone https://github.com/FtxTenorio/itenorio.com.git
cd itenorio.com

# 2. Install dependencies
npm install

# 3. Spin up the Vite development server with HMR
npm run dev

# 4. Build for production (outputs dist/, one pre-rendered index.html per route)
npm run build

# 5. Serve the production build locally
npm run preview
```

---


<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0284c7,50:1e1b4b,100:090d16&height=120&section=footer&text=Engineered%20by%20Paulo%20Ten%C3%B3rio%20%E2%80%A2%20itenorio.com&fontSize=19&fontColor=38bdf8&fontAlignY=65" width="100%" alt="Footer" />

  <details>
    <summary><sub>⚡</sub></summary>
    <sub>Crafted with ☕ in England 🏴󠁧󠁢󠁥󠁮󠁧󠁿 · Rooted in Brazil 🇧🇷</sub>
  </details>
</div>
