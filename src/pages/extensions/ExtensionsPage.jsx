import { Link } from "react-router-dom";
import { Carousel } from "../../components/ui/Carousel";
import { extensions, formatUsers } from "../../data/extensions";
import { ExtensionLogo } from "./components/ExtensionLogo";

const isPublished = (ext) => ext.status === "Published";

/** Left side of a slide: the first real screenshot, or a placeholder. */
function ExtensionMedia({ ext }) {
  const shot = ext.screenshots?.[0];
  if (shot) {
    return (
      <img
        src={shot.src}
        alt={shot.alt}
        width="1280"
        height="800"
        className="w-full aspect-[16/10] object-cover rounded-xl border border-white/10"
        style={{ boxShadow: `0 25px 60px -25px ${ext.color}66` }}
      />
    );
  }
  return (
    <div
      className="w-full aspect-[16/10] rounded-xl border border-dashed border-white/15 bg-white/[0.02] flex flex-col items-center justify-center gap-3 text-gray-500"
      aria-hidden="true"
    >
      <i className={`${ext.logo} text-5xl`} style={{ color: ext.color }} />
      <span className="font-mono text-xs uppercase tracking-[0.2em]">
        In development
      </span>
    </div>
  );
}

function ExtensionSlide({ ext }) {
  const published = isPublished(ext);
  return (
    <article className="grid gap-6 lg:gap-10 lg:grid-cols-[1.15fr_1fr] items-center rounded-2xl border border-white/10 bg-surface p-5 sm:p-7">
      <ExtensionMedia ext={ext} />

      <div className="min-w-0">
        <div className="flex items-center gap-4 mb-4">
          <ExtensionLogo ext={ext} className="w-12 h-12 sm:w-14 sm:h-14" />
          <div className="min-w-0">
            <h2 className="text-2xl font-bold tracking-tight">{ext.name}</h2>
            <p className="text-sm text-gray-400">
              {published ? `Free ${ext.platform} extension` : "Coming soon"}
            </p>
          </div>
        </div>

        <p className="text-gray-300 leading-relaxed mb-5 line-clamp-4">
          {ext.description}
        </p>

        {published && (
          <ul className="flex flex-wrap gap-2 mb-5 text-xs">
            {[
              ["fas fa-tag", ext.price],
              ["fas fa-star", `${ext.rating.toFixed(1)} rating`],
              ["fas fa-users", `${formatUsers(ext.users)} users`],
              ["fas fa-code-branch", `v${ext.version}`],
            ].map(([icon, text]) => (
              <li
                key={text}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300"
              >
                <i className={`${icon} text-gray-500`} aria-hidden="true" />
                {text}
              </li>
            ))}
          </ul>
        )}

        {ext.supportNote && (
          <p className="flex items-start gap-2 text-sm text-gray-400 mb-6">
            <i className="fas fa-heart text-rose-400 mt-1" aria-hidden="true" />
            {ext.supportNote}
          </p>
        )}

        {published ? (
          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <a
              href={ext.storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-crunchy hover:bg-[#ff7d1f] font-semibold transition-colors"
            >
              <i className="fab fa-chrome" aria-hidden="true" />
              Add to Chrome for free
            </a>
            <Link
              to={`/extensions/${ext.slug}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-white/15 hover:bg-white/5 font-semibold text-gray-200 transition-colors"
            >
              Details
              <i className="fas fa-arrow-right text-sm" aria-hidden="true" />
            </Link>
          </div>
        ) : (
          <p className="text-sm text-gray-500">{ext.overview}</p>
        )}
      </div>
    </article>
  );
}

// /extensions: catalogue of browser extensions, one per slide.
// Details of each published extension live at /extensions/:slug.
export default function ExtensionsPage() {
  return (
    <div className="px-4 md:px-6 max-w-6xl mx-auto w-full pt-10 pb-24 lg:py-6 lg:min-h-[calc(100svh-5rem)] lg:flex lg:flex-col lg:justify-center animate-fade-in">
      <Carousel
        label="Browser extensions"
        items={extensions}
        getLabel={(ext) => ext.name}
        accent={(ext) => ext.color}
        renderSlide={(ext) => <ExtensionSlide ext={ext} />}
        header={
          <header>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-soft mb-3">
              Products
            </p>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">
              Browser Extensions
            </h1>
            <p className="text-gray-400 max-w-2xl">
              Small, focused tools that make the sites you already use better.
              Free to use, private by design and maintained by iTenorio Tech.
            </p>
          </header>
        }
      />
    </div>
  );
}
