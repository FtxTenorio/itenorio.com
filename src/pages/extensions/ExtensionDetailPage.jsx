import { Link, useParams } from "react-router-dom";
import { extensions } from "../../data/extensions";
import NotFoundPage from "../NotFoundPage";
import { ExtensionLogo } from "./components/ExtensionLogo";
import { SupportNote } from "./components/SupportNote";
import { ScreenshotGallery } from "./components/ScreenshotGallery";

function DetailSection({ title, icon, children }) {
  return (
    <section>
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2 border-b border-white/10 pb-2">
        {icon && <i className={`${icon} text-crunchy`} aria-hidden="true" />}
        {title}
      </h2>
      {children}
    </section>
  );
}

const SideCard = ({ children }) => (
  <div className="bg-surface border border-white/10 p-6 rounded-xl">{children}</div>
);

const secondaryButton =
  "w-full inline-flex items-center justify-center gap-2 bg-white/5 border border-white/20 hover:bg-white/10 text-white px-4 py-2.5 rounded-md transition-colors text-sm";

// /extensions/:slug — full details of one published extension.
export default function ExtensionDetailPage() {
  const { slug } = useParams();
  const ext = extensions.find((item) => item.slug === slug);
  if (!ext) return <NotFoundPage />;

  return (
    <div className="px-4 md:px-6 pt-10 pb-24 max-w-5xl mx-auto flex flex-col gap-8 animate-fade-in">
      <Link
        to="/extensions"
        className="self-start flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-semibold bg-white/5 hover:bg-white/10 px-4 py-2 rounded-md border border-white/10"
      >
        <i className="fas fa-arrow-left" aria-hidden="true" />
        All extensions
      </Link>

      <div className="bg-surface border border-white/10 rounded-xl p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-start relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-64 h-64 blur-[80px] rounded-full pointer-events-none opacity-10"
          style={{ backgroundColor: ext.color }}
        />
        <div className="relative z-10">
          <ExtensionLogo ext={ext} className="w-24 h-24 md:w-32 md:h-32" />
        </div>

        <div className="flex flex-col flex-grow z-10 w-full min-w-0">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-2">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                  {ext.name}
                </h1>
                <span
                  className="px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider border"
                  style={{
                    color: ext.color,
                    backgroundColor: `${ext.color}20`,
                    borderColor: `${ext.color}50`,
                  }}
                >
                  {ext.platform ? `${ext.platform} extension` : "Extension"}
                </span>
              </div>
              {ext.tagline && <p className="text-gray-300">{ext.tagline}</p>}
            </div>

            {ext.storeUrl && (
              <a
                href={ext.storeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-6 py-3 rounded-lg font-semibold text-white bg-crunchy hover:bg-[#ff7d1f] transition-colors self-stretch sm:self-start lg:self-center shrink-0"
              >
                <i className="fab fa-chrome text-xl" aria-hidden="true" />
                <span>Add to Chrome — Free</span>
                <i className="fas fa-external-link-alt text-xs opacity-80" aria-hidden="true" />
              </a>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 md:gap-6 mt-2 mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <i className="fas fa-star text-yellow-500" aria-hidden="true" />
              <span className="font-semibold text-white">
                {ext.rating > 0 ? ext.rating.toFixed(1) : "N/A"}
              </span>
              <span className="text-gray-500 hidden sm:inline">
                ({ext.ratingCount} {ext.ratingCount === 1 ? "rating" : "ratings"})
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <i className="fas fa-users text-gray-400" aria-hidden="true" />
              <span>
                <strong>{ext.users}</strong> {ext.users === 1 ? "user" : "users"}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <i className="fas fa-layer-group text-gray-400" aria-hidden="true" />
              <span>{ext.category}</span>
            </div>
          </div>

          <dl className="flex flex-wrap gap-x-6 gap-y-3 text-xs text-gray-400 bg-black/20 p-3 rounded-lg border border-white/5 w-full sm:w-fit">
            {[
              ["Price", ext.price],
              ["Version", ext.version],
              ["Updated", ext.updated],
              ["Size", ext.size],
              ["Language", ext.language],
            ]
              .filter(([, value]) => value)
              .map(([label, value]) => (
                <div className="flex flex-col" key={label}>
                  <dt className="uppercase text-[10px] text-gray-500 font-bold mb-0.5">
                    {label}
                  </dt>
                  <dd className="text-gray-300">{value}</dd>
                </div>
              ))}
          </dl>
        </div>
      </div>

      {ext.screenshots?.length > 0 && (
        <ScreenshotGallery screenshots={ext.screenshots} accent={ext.color} eager />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <DetailSection title="Overview">
            <p className="text-gray-300 leading-relaxed">{ext.overview}</p>
          </DetailSection>

          {ext.features.length > 0 && (
            <DetailSection title="Current Features" icon="fas fa-wand-magic-sparkles">
              <ul className="space-y-3 text-gray-300">
                {ext.features.map((feature) => (
                  <li className="flex items-start gap-3" key={feature.title}>
                    <i className="fas fa-check-circle text-green-500 mt-1" aria-hidden="true" />
                    <span>
                      <strong>{feature.title}:</strong> {feature.description}
                    </span>
                  </li>
                ))}
              </ul>
            </DetailSection>
          )}

          {ext.roadmap.length > 0 && (
            <section className="bg-gradient-to-br from-surface to-[#1a1525] p-6 rounded-xl border border-purple-500/20">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <i className="fas fa-rocket text-purple-400" aria-hidden="true" />
                Upcoming Roadmap
              </h2>
              <p className="text-gray-400 text-sm mb-4">
                We are continuously working on new updates and features:
              </p>
              <ul className="space-y-3 text-gray-300 text-sm">
                {ext.roadmap.map((item) => (
                  <li className="flex items-start gap-3" key={item.title}>
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: ext.color }}
                    />
                    <span>
                      <strong>{item.title}:</strong> {item.description}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="lg:col-span-1 space-y-6">
          <SideCard>
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <i className="fas fa-hand-holding-heart text-rose-400" aria-hidden="true" />
              Free &amp; user-supported
            </h3>
            <SupportNote ext={ext} />
            <p className="text-xs text-gray-500 mt-3 leading-relaxed">
              Support payments are optional and do not unlock any feature —
              every feature is free for everyone. Questions about a payment?
              Write to{" "}
              <a href="mailto:contact@itenorio.com" className="text-gray-300 hover:text-white underline">
                contact@itenorio.com
              </a>
              .
            </p>
          </SideCard>

          <SideCard>
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <i className="fas fa-shield-alt text-blue-400" aria-hidden="true" />
              Privacy Policy
            </h3>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              {ext.privacyDescription}
            </p>
            {ext.privacyUrl && (
              <Link to={ext.privacyUrl} className={secondaryButton}>
                <i className="fas fa-file-contract" aria-hidden="true" />
                Read Full Policy
              </Link>
            )}
          </SideCard>

          <SideCard>
            <h3 className="text-lg font-bold text-white mb-2">Developer</h3>
            <p className="text-sm text-gray-300 mb-1">iTenorio Tech</p>
            <p className="text-sm text-gray-400 mb-4">{ext.developerType}</p>
            {ext.supportEmail && (
              <a href={`mailto:${ext.supportEmail}`} className={secondaryButton}>
                <i className="fas fa-envelope" aria-hidden="true" />
                Contact Support
              </a>
            )}
          </SideCard>
        </aside>
      </div>
    </div>
  );
}
