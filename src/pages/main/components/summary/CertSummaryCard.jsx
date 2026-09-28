import { certifications } from "../../../../data/certifications";

export const CertSummaryCard = ({ onSelectCert }) => (
  <div className="bg-[#121826] border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
    <div>
      <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4">
        <div>
          <h3 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ffc000]" />
            Certifications
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Click any credential to inspect validation details
          </p>
        </div>
        <span className="bg-[#ffc000]/15 border border-[#ffc000]/40 text-yellow-300 text-[11px] font-bold px-2.5 py-1 rounded-full">
          {certifications.length} Verified
        </span>
      </div>

      <div className="space-y-2.5">
        {certifications.map((cert) => (
          <button
            key={cert.id}
            onClick={() => onSelectCert(cert)}
            className="w-full bg-black/30 hover:bg-[#1a2235] border border-white/10 hover:border-[#ffc000]/50 rounded-xl p-2.5 px-3 flex items-center justify-between transition-all duration-200 group text-left"
          >
            <div className="flex items-center gap-3">
              <img
                src={cert.img}
                alt={cert.name}
                className="w-9 h-9 object-contain shrink-0 group-hover:scale-110 transition-transform"
              />
              <div>
                <div className="text-xs font-bold text-gray-200 group-hover:text-white leading-tight">
                  {cert.name}
                </div>
                <div className="text-[10px] text-gray-400 mt-0.5">
                  {cert.issuer}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] font-mono text-yellow-400/90 bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded">
                {cert.yearEarned}
              </span>
              <i className="fas fa-chevron-right text-[10px] text-gray-500 group-hover:text-[#ffc000] transition-colors" />
            </div>
          </button>
        ))}
      </div>
    </div>

    <div className="mt-5 pt-3 border-t border-white/5 flex justify-end">
      <a
        href="https://link.itenorio.com/CREDLY"
        target="_blank"
        rel="noreferrer noopener"
        className="w-full flex items-center justify-center gap-2 bg-white/5 border border-white/15 hover:bg-white/10 hover:border-[#ffc000] text-white py-2 px-4 rounded-xl font-semibold transition-all duration-300 text-xs group"
      >
        <span>Verify All Badges on Credly</span>
        <i className="fas fa-external-link-alt text-[#ffc000] group-hover:translate-x-1 transition-transform" />
      </a>
    </div>
  </div>
);
