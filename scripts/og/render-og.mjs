// Renders the share images (og:image, 1200×630) of the site's pages, and the
// LinkedIn profile banner (1584×396), from the site's own data, in the site's
// look: dark ink background, the terminal logo, Inter + JetBrains Mono.
//
// The images are committed (public/images/og/*.jpg), so the build doesn't need
// a browser; run this again when the content they show changes:
//
//   PLAYWRIGHT_CORE=/path/to/playwright-core CHROME=/path/to/chrome \
//     node scripts/og/render-og.mjs            # share images
//     node scripts/og/render-og.mjs --linkedin # + LinkedIn banner (in ./out)
//
// Each image is wired to its page by `image` in src/config/routes.js.

import { createRequire } from "node:module";
import { mkdirSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { careerTrajectory, yearsOfExperience } from "../../src/data/careerTrajectory.js";
import { certifications, studyingFor } from "../../src/data/certifications.js";
import { websites } from "../../src/data/websites.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_CORE || "playwright-core");

const OUT = resolve(root, "public/images/og");
const LINKEDIN_OUT = resolve(root, "scripts/og/out");
const SHORTENER_STATS = "https://link.itenorio.com/statistics-url";

/** A file of public/ as a data: URI (the pages are rendered from a string, not served). */
const asset = (path) => {
  const type = path.endsWith(".webp") ? "image/webp" : path.endsWith(".png") ? "image/png" : "image/jpeg";
  return `data:${type};base64,${readFileSync(resolve(root, `public${path}`)).toString("base64")}`;
};

const esc = (text) =>
  String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Same stable short hash as the career hero's `git log`. */
const shortHash = (text) => {
  let hash = 2166136261;
  for (const char of text) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
  return (hash >>> 0).toString(16).padStart(8, "0").slice(0, 7);
};

const css = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0b0f19; font-family: Inter, sans-serif; color: #fff; }
  .card { position: relative; overflow: hidden; background: #0b0f19; }
  .og { width: 1200px; height: 630px; padding: 64px 72px; }
  .grid-bg { position: absolute; inset: 0; background-image:
      linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
    background-size: 44px 44px; mask-image: linear-gradient(120deg, transparent 15%, #000 70%); }
  .glow { position: absolute; border-radius: 50%; filter: blur(90px); }
  .mono { font-family: "JetBrains Mono", monospace; }
  .logo { display: inline-flex; align-items: flex-start; gap: 6px; }
  .logo .box { display: inline-flex; align-items: center; border: 1.5px solid rgba(56,189,248,0.45);
    background: rgba(0,120,215,0.16); border-radius: 9px; padding: 8px 12px; font: 700 30px "JetBrains Mono", monospace;
    letter-spacing: -0.5px; box-shadow: 0 0 22px rgba(56,189,248,0.3); line-height: 1; }
  .logo .gt { color: rgba(56,189,248,0.5); font-size: 0.8em; margin-right: 6px; }
  .logo .it { color: #38bdf8; }
  .logo .caret { width: 3px; height: 1em; background: #38bdf8; margin-left: 4px; }
  .logo .tech { font: 700 12px "JetBrains Mono", monospace; letter-spacing: 3.5px; color: #d1d5db; margin-top: 2px; }
  .eyebrow { font: 600 17px "JetBrains Mono", monospace; letter-spacing: 4px; text-transform: uppercase; color: #38bdf8; }
  h1 { font-weight: 800; letter-spacing: -2px; line-height: 1.04; }
  .accent { background: linear-gradient(90deg, #38bdf8, #0078d7); -webkit-background-clip: text; color: transparent; }
  .sub { color: #9ca3af; font-size: 25px; line-height: 1.45; }
  .url { position: absolute; right: 72px; bottom: 56px; font: 600 22px "JetBrains Mono", monospace; color: #38bdf8; }
  .term { border: 1px solid rgba(255,255,255,0.1); background: rgba(11,15,25,0.9); border-radius: 14px; overflow: hidden;
    box-shadow: 0 30px 80px -20px rgba(0,0,0,0.8), 0 0 0 1px rgba(56,189,248,0.06); }
  .term .bar { display: flex; gap: 8px; align-items: center; padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.03); }
  .term .dot { width: 11px; height: 11px; border-radius: 50%; background: rgba(255,255,255,0.15); }
  .term .path { margin-left: 8px; font: 13px "JetBrains Mono", monospace; color: #6b7280; }
  .term ol { list-style: none; padding: 18px 20px; font: 15px/1.35 "JetBrains Mono", monospace; display: grid; gap: 9px; }
  .hash { color: rgba(252,211,77,0.85); margin-right: 10px; }
  .gray { color: #6b7280; } .light { color: #e5e7eb; } .green { color: #6ee7b7; } .blue { color: #38bdf8; }
  .chip { display: inline-flex; align-items: center; gap: 8px; border: 1px solid rgba(255,255,255,0.1); background: rgba(18,24,38,0.9);
    border-radius: 10px; padding: 7px 12px 7px 8px; font-size: 15px; font-weight: 600; color: #e5e7eb; }
  .chip img { width: 30px; height: 30px; object-fit: contain; }
`;

const logo = `<span class="logo"><span class="box"><span class="gt">&gt;</span><span class="it">iT</span>enorio<span class="caret"></span></span><span class="tech">TECH</span></span>`;
const backdrop = (tint = "rgba(0,120,215,0.35)") =>
  `<div class="grid-bg"></div><div class="glow" style="width:620px;height:420px;left:-180px;top:-200px;background:${tint}"></div>`;

const gitLog = (limit) => {
  const jobs = careerTrajectory.slice(0, limit);
  return `<div class="term"><div class="bar"><span class="dot"></span><span class="dot"></span><span class="dot"></span><span class="path">~/career</span></div>
  <ol><li class="gray"><span class="blue">$</span> git log --oneline</li>
  ${jobs
    .map(
      (job, i) =>
        `<li><span class="hash">${shortHash(job.id)}</span>${i === 0 ? '<span class="green">(HEAD) </span>' : ""}<span class="light">${esc(job.role)}</span><span class="gray"> @ </span>${esc(job.company)}</li>`,
    )
    .join("")}
  <li class="gray"><span class="blue">$</span> cd ./experience<span style="display:inline-block;width:8px;height:16px;background:#38bdf8;margin-left:6px;vertical-align:-2px"></span></li></ol></div>`;
};

const certChips = (size = "") =>
  certifications
    .map((cert) => `<span class="chip" ${size}><img src="${cert.img}" alt="">${esc(cert.shortName ?? cert.name)}</span>`)
    .join("");

// ---------- the share images ----------

const career = () => `<div class="card og">${backdrop()}
  <div style="position:relative;display:grid;grid-template-columns:1fr 520px;gap:48px;height:100%">
    <div style="display:flex;flex-direction:column">
      <div style="display:flex;align-items:center;gap:14px">
        <img src="${asset("/images/paulo-tenorio.webp")}" style="width:58px;height:58px;border-radius:14px;object-fit:cover;border:1px solid rgba(255,255,255,0.12)">
        <div><div style="font-weight:700;font-size:21px">Paulo Tenório</div><div style="color:#9ca3af;font-size:16px">Senior Backend Engineer · Secure APIs on AWS</div></div>
      </div>
      <p class="eyebrow" style="margin-top:44px">Career</p>
      <h1 style="font-size:58px;margin-top:14px">Backend &amp; cloud systems that <span class="accent">hold up in production.</span></h1>
      <p class="sub" style="margin-top:auto;font-size:20px"><span style="color:#fff;font-weight:700">${yearsOfExperience()}+ years</span> · ${new Set(careerTrajectory.map((j) => j.company)).size} companies · <span style="color:#fff;font-weight:700">${certifications.length} certifications</span></p>
    </div>
    <div style="display:flex;flex-direction:column;justify-content:center;gap:18px">${gitLog(6)}
      <div style="display:flex;gap:10px;justify-content:flex-end">${certifications
        .map((c) => `<img src="${c.img}" style="width:62px;height:62px;object-fit:contain">`)
        .join("")}</div>
    </div>
  </div></div>`;

const extensions = () => `<div class="card og">${backdrop("rgba(255,107,0,0.22)")}
  <div style="position:relative;display:flex;flex-direction:column;height:100%">
    ${logo}
    <p class="eyebrow" style="margin-top:58px">Browser extensions</p>
    <h1 style="font-size:76px;margin-top:16px;max-width:760px">Small tools that make the sites you use <span class="accent">better.</span></h1>
    <div style="margin-top:auto;display:flex;align-items:center;gap:16px">
      <img src="https://dy9pxtyo5i8g0.cloudfront.net/itenorio/images/assets/crunchy-navigator-ext.png" style="width:56px;height:56px">
      <div><div style="font-weight:700;font-size:22px">Crunchyroll Navigator</div><div style="color:#9ca3af;font-size:17px">Free Chrome extension · dub filter &amp; episode list</div></div>
    </div>
  </div>
  <div class="url">itenorio.com/extensions</div></div>`;

const websitesCard = () => {
  const site = websites[0];
  const shot = site.routes?.[0]?.capture ?? site.capture;
  return `<div class="card og">${backdrop()}
  <div style="position:relative;display:grid;grid-template-columns:1fr 600px;gap:44px;height:100%">
    <div style="display:flex;flex-direction:column">
      ${logo}
      <p class="eyebrow" style="margin-top:58px">Websites</p>
      <h1 style="font-size:64px;margin-top:16px">Websites &amp; <span class="accent">platforms.</span></h1>
      <p class="sub" style="margin-top:20px;font-size:22px">Production websites built with React, Next.js and AWS.</p>
    </div>
    <div style="align-self:center;transform:rotate(-2deg)" class="term">
      <div class="bar"><span class="dot"></span><span class="dot"></span><span class="dot"></span><span class="path">${esc(site.liveUrl.replace("https://", ""))}</span></div>
      <img src="${asset(shot)}" style="display:block;width:600px;height:360px;object-fit:cover;object-position:top">
    </div>
  </div>
  <div class="url">itenorio.com/websites</div></div>`;
};

const shortener = (codes) => {
  const bars = [32, 48, 40, 66, 54, 82, 70, 96, 78, 88, 62, 100];
  return `<div class="card og">${backdrop()}
  <div style="position:relative;display:grid;grid-template-columns:1fr 470px;gap:48px;height:100%">
    <div style="display:flex;flex-direction:column">
      ${logo}
      <p class="eyebrow" style="margin-top:58px">Link shortener</p>
      <h1 style="font-size:68px;margin-top:16px">Shorten a link, <span class="accent">see every click.</span></h1>
      <p class="sub" style="margin-top:20px;font-size:22px">Serverless on AWS: CloudFront, Lambda and DynamoDB.</p>
    </div>
    <div style="align-self:center;display:grid;gap:16px">
      <div class="term" style="padding:22px 22px 16px">
        <div style="display:flex;align-items:flex-end;gap:9px;height:150px">${bars
          .map((h, i) => `<span style="flex:1;height:${h}%;border-radius:5px 5px 2px 2px;background:linear-gradient(180deg,#38bdf8,rgba(0,120,215,0.55));opacity:${0.55 + i * 0.04}"></span>`)
          .join("")}</div>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:10px">${codes
        .map((code) => `<span class="chip mono" style="font-size:15px;padding:8px 13px"><span class="gray">link.itenorio.com/</span>${esc(code)}</span>`)
        .join("")}</div>
    </div>
  </div>
  <div class="url">itenorio.com/shortener</div></div>`;
};

const legal = () => `<div class="card og">${backdrop()}
  <div style="position:relative;display:flex;flex-direction:column;height:100%">
    ${logo}
    <p class="eyebrow" style="margin-top:58px">Legal</p>
    <h1 style="font-size:76px;margin-top:16px">Terms, privacy <span class="accent">&amp; refunds.</span></h1>
    <p class="sub" style="margin-top:22px;max-width:820px">How iTenorio Tech handles your data and what you can expect from its websites, extensions and services.</p>
  </div>
  <div class="url">itenorio.com</div></div>`;

// ---------- the LinkedIn banner ----------
// 1584×396. The profile photo covers the bottom left on desktop and the
// middle on phones, so the content sits on the right and the left only has
// the backdrop (the career trace with the roles as commits).
const linkedin = () => {
  const roles = [...careerTrajectory].reverse();
  const x0 = 120;
  const step = 84;
  const nodes = roles
    .map((job, i) => {
      const x = x0 + i * step;
      const y = 318 - i * 32;
      return { x, y, job, last: i === roles.length - 1 };
    });
  const path = nodes.map((n, i) => `${i ? "L" : "M"}${n.x} ${n.y}`).join(" ");
  const studying = studyingFor.certs.find((c) => /Solutions Architect/.test(c.name));
  return `<div class="card" style="width:1584px;height:396px">
  <div class="grid-bg" style="mask-image:linear-gradient(90deg,#000 0%,transparent 60%)"></div>
  <div class="glow" style="width:700px;height:420px;right:-160px;top:-240px;background:rgba(0,120,215,0.32)"></div>
  <svg width="1584" height="396" style="position:absolute;inset:0">
    <path d="${path}" stroke="rgba(56,189,248,0.55)" stroke-width="2.5" fill="none" stroke-dasharray="0"/>
    ${nodes
      .map(
        (n) => `<circle cx="${n.x}" cy="${n.y}" r="${n.last ? 9 : 6}" fill="${n.last ? "#38bdf8" : "#0b0f19"}" stroke="#38bdf8" stroke-width="2"/>
      <text x="${n.x}" y="${n.y - 18}" text-anchor="middle" font-family="JetBrains Mono" font-size="11" fill="${n.last ? "#e5e7eb" : "#6b7280"}">${esc(n.job.level ? `${n.job.company.replace(".uol", "")} · ${["", "Intern", "Junior", "Mid"][n.job.level]}` : n.job.company)}</text>`,
      )
      .join("")}
  </svg>
  <div style="position:absolute;right:72px;top:46px;width:780px;text-align:right">
    <p class="eyebrow" style="font-size:15px">Senior Backend Engineer · Secure APIs on AWS</p>
    <h1 style="font-size:46px;margin-top:12px;letter-spacing:-1.5px">Backend &amp; cloud systems that <span class="accent">hold up in production.</span></h1>
    <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:26px;flex-wrap:wrap">${certChips()}</div>
    <div style="display:flex;justify-content:flex-end;align-items:center;gap:18px;margin-top:20px;font:600 17px 'JetBrains Mono',monospace">
      <span class="gray">Next: ${esc(studying?.name ?? "")}</span><span class="blue">itenorio.com</span>
    </div>
  </div></div>`;
};

async function main() {
  let codes = ["CRUNCHY_NAVIGATOR", "LINKEDIN", "GITHUB", "CREDLY"];
  try {
    const stats = await (await fetch(SHORTENER_STATS)).json();
    codes = [...stats.links].sort((a, b) => (b.clicks ?? 0) - (a.clicks ?? 0)).slice(0, 4).map((l) => l.shortCode);
  } catch {
    console.warn("shortener stats unavailable, using the default codes");
  }

  const images = {
    career: career(),
    extensions: extensions(),
    websites: websitesCard(),
    shortener: shortener(codes),
    legal: legal(),
  };
  const withLinkedin = process.argv.includes("--linkedin");

  const browser = await chromium.launch({ executablePath: process.env.CHROME || undefined });
  const page = await browser.newPage({ viewport: { width: 1600, height: 700 } });
  mkdirSync(OUT, { recursive: true });
  const shoot = async (html, file) => {
    await page.setContent(
      `<!doctype html><html><head><meta charset="utf-8">
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet">
      <style>${css}</style></head><body>${html}</body></html>`,
      { waitUntil: "networkidle" },
    );
    await page.evaluate(() => document.fonts.ready);
    await page.locator(".card").screenshot({ path: file, type: "jpeg", quality: 90 });
    console.log("wrote", file.replace(`${root}/`, ""));
  };
  for (const [name, html] of Object.entries(images)) await shoot(html, `${OUT}/${name}.jpg`);
  if (withLinkedin) {
    mkdirSync(LINKEDIN_OUT, { recursive: true });
    await shoot(linkedin(), `${LINKEDIN_OUT}/linkedin-banner.jpg`);
  }
  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
