import { getTechById } from "../../../../data/techStack";
import { getCertById } from "../../../../data/certifications";

export const MilestoneItem = ({ milestone, onSelectTech, onSelectCert }) => (
  <div className="bg-black/25 border border-white/5 rounded-xl p-4">
    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
      <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
        {milestone.year}
      </span>
      <h4 className="text-xs md:text-sm font-bold text-white flex-1">
        {milestone.title}
      </h4>
    </div>
    <p className="text-xs text-gray-400 leading-relaxed mb-3">
      {milestone.details}
    </p>

    <div className="flex flex-wrap items-center gap-2">
      {milestone.unlocked.map((techId) => {
        const tech = getTechById(techId);
        if (!tech) return null;
        return (
          <button
            key={tech.id}
            onClick={() => onSelectTech(tech)}
            className="flex items-center gap-1.5 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 px-2.5 py-1 rounded-md text-[11px] text-blue-300 transition-colors"
            title="Unlocked in this year — click for details"
          >
            <img src={tech.icon} alt={tech.name} className="w-3.5 h-3.5" />
            <span>+ {tech.name}</span>
          </button>
        );
      })}

      {milestone.certs.map((certId) => {
        const cert = getCertById(certId);
        if (!cert) return null;
        return (
          <button
            key={cert.id}
            onClick={() => onSelectCert(cert)}
            className="flex items-center gap-1.5 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 px-2.5 py-1 rounded-md text-[11px] text-yellow-300 transition-colors"
            title="Certification earned in this year — click for details"
          >
            <img
              src={cert.img}
              alt={cert.name}
              className="w-4 h-4 object-contain"
            />
            <span>Earned: {cert.name}</span>
          </button>
        );
      })}
    </div>
  </div>
);
