import { Link } from "react-router-dom";
import { Section } from "../../../components/ui/Section";
import { extensions } from "../../../data/extensions";
import { ExtensionLogo } from "../../extensions/components/ExtensionLogo";
import { SupportNote } from "../../extensions/components/SupportNote";
import { ScreenshotGallery } from "../../extensions/components/ScreenshotGallery";

const product = extensions.find((ext) => ext.id === "crunchy");

const HIGHLIGHTS = [
  {
    icon: "fas fa-microphone",
    title: "Dub filter",
    text: "Show only the shows of the season dubbed in your language.",
  },
  {
    icon: "fas fa-list-ol",
    title: "Every episode, without leaving the page",
    text: "Open any show and see its episodes with the audio languages of each one.",
  },
  {
    icon: "fas fa-sliders",
    title: "Filters the site doesn't have",
    text: "Rating, age rating, length, genres, content warnings and instant search.",
  },
];

export const FeaturedProductSection = () => {
  if (!product) return null;

  return (
    <Section id="product" eyebrow="Featured product" fullScreen>
      <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-12 items-center">
        <div>
          <div className="flex items-center gap-4 mb-5 lg:mb-4">
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

          <p className="text-gray-300 leading-relaxed mb-8 lg:mb-5 lg:[@media(max-height:900px)]:hidden">{product.description}</p>

          <ul className="space-y-4 lg:space-y-3 mb-8 lg:mb-5">
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

          <ul className="flex flex-wrap gap-2 mb-6 lg:mb-4 text-xs">
            {[
              ["fas fa-tag", product.price],
              ["fab fa-chrome", product.platform],
              ["fas fa-code-branch", `v${product.version}`],
              ["fas fa-language", "21 languages"],
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

          <SupportNote ext={product} className="mb-8 lg:mb-5" />

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

        <ScreenshotGallery screenshots={product.screenshots} accent={product.color} />
      </div>
    </Section>
  );
};
