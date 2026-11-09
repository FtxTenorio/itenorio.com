import { Link } from "react-router-dom";
import { Section } from "../../../components/ui/Section";
import { extensions } from "../../../data/extensions";
import { ExtensionLogo } from "../../extensions/components/ExtensionLogo";
import { SupportNote } from "../../extensions/components/SupportNote";

const product = extensions.find((ext) => ext.id === "crunchy");

const HIGHLIGHTS = [
  {
    icon: "fas fa-filter",
    title: "Audio & dub filters",
    text: "Filter the season by audio language and dub availability.",
  },
  {
    icon: "fas fa-list-ol",
    title: "Episode list",
    text: "Browse a show's episodes without leaving the Simulcasts page.",
  },
  {
    icon: "fas fa-closed-captioning",
    title: "Dub badges",
    text: "See which dubs exist right on each title card.",
  },
];

/** Stylised illustration of the extension UI (not a real screenshot). */
const ProductIllustration = () => (
  <div
    className="rounded-xl border border-white/10 bg-ink shadow-2xl overflow-hidden"
    role="img"
    aria-label="Illustration of the Crunchyroll Navigator filter bar and dub badges on a list of shows"
  >
    <div className="flex items-center gap-1.5 px-4 py-2.5 bg-surface-raised border-b border-white/10">
      <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
      <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
      <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
      <span className="ml-3 text-[11px] font-mono text-gray-500 truncate">
        Simulcasts · Crunchyroll Navigator
      </span>
    </div>
    <div className="p-4 sm:p-5 space-y-4">
      <div className="flex flex-wrap gap-2">
        {["Japanese", "English dub", "Español", "Português"].map((chip, i) => (
          <span
            key={chip}
            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
              i === 1
                ? "bg-crunchy/15 border-crunchy/40 text-orange-200"
                : "bg-white/5 border-white/10 text-gray-400"
            }`}
          >
            {chip}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[
          ["EN", "PT"],
          ["EN"],
          ["EN", "ES", "PT"],
        ].map((badges, i) => (
          <div key={i} className="space-y-2">
            <div className="aspect-[3/4] rounded-md bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/5 relative">
              <div className="absolute top-1.5 left-1.5 flex flex-wrap gap-1">
                {badges.map((b) => (
                  <span
                    key={b}
                    className="px-1.5 py-0.5 rounded bg-crunchy text-[9px] font-bold text-white"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
            <div className="h-2 rounded bg-white/10 w-4/5" />
            <div className="h-2 rounded bg-white/5 w-3/5" />
          </div>
        ))}
      </div>
      <div className="rounded-md border border-white/10 bg-white/[0.03] divide-y divide-white/5">
        {["Episode 1", "Episode 2", "Episode 3"].map((ep, i) => (
          <div key={ep} className="flex items-center justify-between px-3 py-2 text-[11px]">
            <span className="text-gray-300">{ep}</span>
            <span className="text-gray-500">{i === 2 ? "New" : "Dub · Sub"}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const FeaturedProductSection = () => {
  if (!product) return null;

  return (
    <Section id="product" eyebrow="Featured product">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div>
          <div className="flex items-center gap-4 mb-5">
            <ExtensionLogo ext={product} className="w-14 h-14 sm:w-16 sm:h-16" />
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                {product.name}
              </h2>
              <p className="text-gray-400 text-sm">
                Free {product.platform} extension for Crunchyroll
              </p>
            </div>
          </div>

          <p className="text-gray-300 leading-relaxed mb-8">{product.description}</p>

          <ul className="space-y-4 mb-8">
            {HIGHLIGHTS.map((item) => (
              <li key={item.title} className="flex gap-4">
                <span className="w-9 h-9 shrink-0 rounded-lg bg-crunchy/10 border border-crunchy/20 text-crunchy flex items-center justify-center">
                  <i className={item.icon} aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-semibold text-white">{item.title}</span>
                  <span className="block text-sm text-gray-400">{item.text}</span>
                </span>
              </li>
            ))}
          </ul>

          <ul className="flex flex-wrap gap-2 mb-6 text-xs">
            {[
              ["fas fa-tag", product.price],
              ["fab fa-chrome", product.platform],
              ["fas fa-code-branch", `v${product.version}`],
              ["fas fa-users", `${product.users} users`],
              ["fas fa-star", `${product.rating.toFixed(1)} rating`],
              ["fas fa-user-shield", "No personal data collected"],
            ].map(([icon, label]) => (
              <li
                key={label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300"
              >
                <i className={`${icon} text-gray-500`} aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>

          <SupportNote ext={product} className="mb-8" />

          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <a
              href={product.storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-crunchy hover:bg-[#ff7d1f] font-semibold transition-colors"
            >
              <i className="fab fa-chrome" aria-hidden="true" />
              Add to Chrome — Free
            </a>
            <Link
              to={`/extensions/${product.slug}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-white/15 hover:bg-white/5 font-semibold text-gray-200 transition-colors"
            >
              Product details
              <i className="fas fa-arrow-right text-sm" aria-hidden="true" />
            </Link>
            <Link
              to={product.privacyUrl}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-gray-400 hover:text-white font-medium transition-colors"
            >
              Privacy policy
            </Link>
          </div>
        </div>

        <ProductIllustration />
      </div>
    </Section>
  );
};
