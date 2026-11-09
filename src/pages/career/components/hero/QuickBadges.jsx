import { yearsOfExperience } from "../../../../data/careerTrajectory";

export const QuickBadges = () => (
  <div className="flex flex-wrap justify-center gap-3 mb-8">
    <div className="bg-surface border border-white/10 px-4 py-2 rounded-full text-xs font-medium text-blue-400 flex items-center gap-2 shadow-lg">
      <i className="fas fa-laptop-code" aria-hidden="true" />
      {yearsOfExperience()}+ years of experience
    </div>

    <div className="bg-surface border border-white/10 px-4 py-2 rounded-full text-xs font-medium text-yellow-500 flex items-center gap-2 shadow-lg">
      <i className="fas fa-user-shield" aria-hidden="true" />
      BSc Information Systems &amp; MBA Cybersecurity
    </div>
  </div>
);
