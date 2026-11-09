import { TimelineDot } from "../ui/TimelineDot";
import { CareerCardHeader } from "./CareerCardHeader";
import { CareerMilestones } from "./CareerMilestones";
import { CareerCardFooter } from "./CareerCardFooter";

export const CareerCard = ({ job, onSelectTech, onSelectCert }) => (
  <div className="relative group">
    <TimelineDot color={job.accentColor} />

    <div className="bg-[#121826] border border-white/10 rounded-2xl p-6 md:p-7 shadow-xl hover:border-white/20 transition-all duration-300">
      <CareerCardHeader job={job} />

      <p className="text-gray-300 text-xs md:text-sm mt-4 leading-relaxed">
        {job.summary}
      </p>

      {job.highlights && (
        <ul className="mt-4 space-y-2">
          {job.highlights.map((item, idx) => (
            <li
              key={idx}
              className="text-xs md:text-sm text-gray-400 flex items-start gap-2.5 leading-relaxed"
            >
              <span
                className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: job.accentColor }}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      <CareerMilestones
        milestones={job.milestones}
        onSelectTech={onSelectTech}
        onSelectCert={onSelectCert}
      />

      <CareerCardFooter
        job={job}
        onSelectTech={onSelectTech}
        onSelectCert={onSelectCert}
      />
    </div>
  </div>
);
