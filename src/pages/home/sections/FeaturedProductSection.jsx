import { Link } from "react-router-dom";
import { Section } from "../../../components/ui/Section";
import { HOME_BG } from "../../../config/theme";
import { AuroraBackdrop } from "../../../components/ui/ThemedBackdrops";
import { extensions } from "../../../data/extensions";
import { ExtensionLogo } from "../../extensions/components/ExtensionLogo";
import { SupportNote } from "../../extensions/components/SupportNote";
import { ScreenshotGallery } from "../../extensions/components/ScreenshotGallery";

const product = extensions.find((ext) => ext.id === "crunchy");

// On phones, under the buttons: the three features at a glance.
const PHONE_HIGHLIGHTS = [
  { icon: "fas fa-microphone", label: "Dub filter" },
  { icon: "fas fa-list-ol", label: "Episode list" },
  { icon: "fas fa-sliders", label: "Smart filters" },
];

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
    <Section
      id="product"
      eyebrow="Featured product"
      fullScreen
      backdrop={<AuroraBackdrop logo={product.isImage ? product.logo : null} />}
      art={
        <ul className="grid w-full grid-cols-3 gap-2 self-start">
          {PHONE_HIGHLIGHTS.map((item) => (
            <li
              key={item.label}
              className="flex flex-col items-center gap-2 rounded-xl border border-crunchy/20 bg-crunchy/[0.06] px-2 py-3 text-center text-xs font-medium text-gray-200"
            >
              <i className={`${item.icon} text-crunchy`} aria-hidden="true" />
              {item.label}
            </li>
          ))}
        </ul>
      }
      background={HOME_BG.alt}
      wave={HOME_BG.base}
      waveFlip
      bubbles={[
        { color: "#ff6b00", className: "top-[10%] right-[5%] w-[28rem] h-[28rem]" },
        { color: "#0078d7", className: "bottom-[5%] -left-32 w-[24rem] h-[24rem]" },
      ]}
    >
      {/* Phones: name → screenshot carousel (its captions carry the features)
          → buttons, so the band fits one screen. The left column "dissolves"
          (contents) below lg and `order` arranges its parts around the
          carousel; from lg up it is a normal two-column layout. */}
      <div className="grid lg:grid-cols-[1fr_1.1fr] gap-5 sm:gap-8 lg:gap-12 items-center">
        <div className="contents lg:block">
          <div className="order-1 flex items-center gap-4 lg:mb-4">
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

          <p className="order-2 hidden sm:block text-gray-300 leading-relaxed lg:mt-0 lg:mb-5 lg:[@media(max-height:900px)]:hidden">{product.description}</p>

          <ul className="hidden lg:block space-y-3 mb-5">
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

          <ul className="order-4 hidden sm:flex flex-wrap gap-2 lg:mb-4 text-xs">
            {[
              ["fas fa-tag", product.price],
              ["fab fa-chrome", product.platform],
              ["fas fa-code-branch", `v${product.version}`],
              ["fas fa-language", product.language],
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

          <SupportNote ext={product} className="order-5 hidden sm:block lg:mb-5" />

          <div className="order-6 grid grid-cols-2 sm:flex sm:flex-wrap gap-3">
            <a
              href={product.storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 rounded-lg bg-crunchy hover:bg-[#ff7d1f] font-semibold text-sm sm:text-base transition-colors"
            >
              <i className="fab fa-chrome" aria-hidden="true" />
              <span className="sm:hidden">Add to Chrome</span>
              <span className="hidden sm:inline">Add to Chrome for free</span>
            </a>
            <Link
              to={`/extensions/${product.slug}`}
              className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 rounded-lg border border-white/15 hover:bg-white/5 font-semibold text-sm sm:text-base text-gray-200 transition-colors"
            >
              <span className="sm:hidden">Details</span>
              <span className="hidden sm:inline">Product details</span>
              <i className="fas fa-arrow-right text-sm" aria-hidden="true" />
            </Link>
            <Link
              to={product.privacyUrl}
              className="hidden sm:inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-gray-400 hover:text-white font-medium transition-colors"
            >
              Privacy policy
            </Link>
          </div>
        </div>

        {/* from lg up the screenshots float slightly turned towards the
            text, and straighten under the pointer */}
        <div className="order-3 lg:order-none min-w-0 transition-transform duration-700 ease-out lg:[transform:perspective(1800px)_rotateY(-9deg)_rotateX(3deg)] lg:hover:[transform:none]">
          <ScreenshotGallery screenshots={product.screenshots} accent={product.color} />
        </div>
      </div>
    </Section>
  );
};
