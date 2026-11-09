import { Link } from "react-router-dom";
import { ExtensionLogo } from "./ExtensionLogo";
import { SupportNote } from "./SupportNote";

const isPublished = (ext) => ext.status === "Published";

export function ExtensionPreview({ ext }) {
  return (
    <div className="w-full bg-surface border border-white/10 rounded-2xl p-6 sm:p-8 md:p-12 flex flex-col items-center text-center relative overflow-hidden shadow-2xl">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 blur-[100px] rounded-full pointer-events-none opacity-20"
        style={{ backgroundColor: ext.color }}
      />

      <div className="relative z-10 mb-6">
        <ExtensionLogo ext={ext} />
      </div>

      <div className="flex items-center gap-2 mb-3 relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
          {ext.name}
        </h2>
        {isPublished(ext) && (
          <i
            className="fas fa-check-circle text-blue-500 text-sm"
            title="Published"
            aria-label="Published"
          />
        )}
      </div>

      <p className="text-gray-400 text-sm md:text-base mb-6 max-w-md relative z-10 leading-relaxed">
        {ext.description}
      </p>

      {isPublished(ext) ? (
        <>
          <div className="flex flex-wrap justify-center gap-3 mb-6 relative z-10">
            {ext.price && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full text-xs font-semibold text-emerald-300 flex items-center gap-2">
                <i className="fas fa-tag" aria-hidden="true" />
                {ext.price}
              </div>
            )}
            <div className="bg-black/30 border border-white/5 px-4 py-2 rounded-full text-xs font-semibold text-gray-300 flex items-center gap-2">
              <i className="fas fa-star text-yellow-500" aria-hidden="true" />
              {ext.rating > 0 ? ext.rating.toFixed(1) : "N/A"}
            </div>
            <div className="bg-black/30 border border-white/5 px-4 py-2 rounded-full text-xs font-semibold text-gray-300 flex items-center gap-2">
              <i className="fas fa-users text-blue-400" aria-hidden="true" />
              {ext.users} users
            </div>
            <div className="bg-black/30 border border-white/5 px-4 py-2 rounded-full text-xs font-semibold text-gray-300 flex items-center gap-2">
              <i className="fas fa-code-branch text-gray-400" aria-hidden="true" />v{ext.version}
            </div>
          </div>

          <SupportNote ext={ext} className="relative z-10 max-w-md mb-8 text-left sm:text-center" />

          <div className="relative z-10 flex flex-col sm:flex-row flex-wrap items-center gap-3 w-full justify-center">
            {ext.storeUrl && (
              <a
                href={ext.storeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-6 py-3 rounded-lg font-semibold text-white bg-crunchy hover:bg-[#ff7d1f] transition-colors w-full sm:w-auto"
              >
                <i className="fab fa-chrome text-lg" aria-hidden="true" />
                <span>Add to Chrome — it's free</span>
              </a>
            )}
            {ext.slug && (
              <Link
                to={`/extensions/${ext.slug}`}
                className="inline-flex items-center justify-center gap-3 px-6 py-3 rounded-lg font-semibold text-gray-200 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors w-full sm:w-auto"
              >
                <span>View Full Details</span>
                <i className="fas fa-arrow-right text-sm text-blue-400" aria-hidden="true" />
              </Link>
            )}
            {ext.privacyUrl && (
              <Link
                to={ext.privacyUrl}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-semibold text-gray-400 hover:text-gray-200 hover:bg-white/5 transition-colors w-full sm:w-auto"
              >
                <i className="fas fa-shield-alt text-sm text-blue-400/70" aria-hidden="true" />
                <span>Privacy Policy</span>
              </Link>
            )}
          </div>
        </>
      ) : (
        <div className="relative z-10 mt-2 px-6 py-2.5 bg-white/5 border border-white/10 rounded-full text-sm font-semibold text-gray-400 tracking-wide uppercase">
          Coming Soon
        </div>
      )}
    </div>
  );
}
