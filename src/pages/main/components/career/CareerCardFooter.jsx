import { getTechById } from "../../../../data/techStack";
import { getCertById } from "../../../../data/certifications";

export const CareerCardFooter = ({ job, onSelectTech, onSelectCert }) => (
  <div className="mt-6 pt-4 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Company Arsenal */}
    <div>
      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
        Company Tech Arsenal
      </span>
      <div className="flex flex-wrap gap-2">
        {job.activeStack.map((techId) => {
          const tech = getTechById(techId);
          if (!tech) return null;
          const isUnlockedHere = job.unlockedStack.includes(techId);
          return (
            <button
              key={tech.id}
              onClick={() => onSelectTech(tech)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-all duration-200 hover:scale-105 ${
                isUnlockedHere
                  ? "bg-[#0078d7]/15 border-[#0078d7]/50 text-white"
                  : "bg-black/30 border-white/10 text-gray-300 hover:border-white/30"
              }`}
            >
              <img src={tech.icon} alt={tech.name} className="w-4 h-4" />
              <span>{tech.name}</span>
              {isUnlockedHere && (
                <span className="text-[9px] text-blue-400 font-mono">
                  ({tech.startedYear})
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>

    {/* Certifications Earned or Leveraged */}
    <div>
      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
        Certifications Earned & Applied
      </span>
      <div className="flex flex-wrap gap-2">
        {job.certsEarned.map((certId) => {
          const cert = getCertById(certId);
          if (!cert) return null;
          return (
            <button
              key={cert.id}
              onClick={() => onSelectCert(cert)}
              className="flex items-center gap-1.5 bg-[#ffc000]/15 border border-[#ffc000]/50 text-yellow-200 px-2.5 py-1 rounded-lg text-xs font-medium hover:scale-105 transition-transform"
            >
              <img
                src={cert.img}
                alt={cert.name}
                className="w-4 h-4 object-contain"
              />
              <span>{cert.name}</span>
              <span className="text-[9px] bg-[#ffc000]/20 text-yellow-300 px-1 rounded uppercase font-bold">
                Earned
              </span>
            </button>
          );
        })}

        {job.certsApplied.map((certId) => {
          const cert = getCertById(certId);
          if (!cert) return null;
          return (
            <button
              key={cert.id}
              onClick={() => onSelectCert(cert)}
              className="flex items-center gap-1.5 bg-black/30 border border-white/10 hover:border-[#ffc000]/40 text-gray-300 px-2.5 py-1 rounded-lg text-xs font-medium hover:scale-105 transition-all"
            >
              <img
                src={cert.img}
                alt={cert.name}
                className="w-4 h-4 object-contain"
              />
              <span>{cert.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  </div>
);
