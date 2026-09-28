import { careerTrajectory } from "../../../../data/careerTrajectory";
import { SectionHeader } from "../ui/SectionHeader";
import { CareerCard } from "./CareerCard";

export const CareerSection = ({ onSelectTech, onSelectCert }) => (
  <div className="w-full max-w-4xl flex flex-col items-center mb-20">
    <SectionHeader
      title="Career, Arsenal & Certification Trajectory"
      subtitle="How my technical stack and cloud certifications evolved across every company I worked with (click any badge for details)"
      leftAccentColor="#10b981"
    />

    <div className="relative w-full pl-6 md:pl-8 border-l-2 border-white/10 space-y-12">
      {careerTrajectory.map((job) => (
        <CareerCard
          key={job.id}
          job={job}
          onSelectTech={onSelectTech}
          onSelectCert={onSelectCert}
        />
      ))}
    </div>
  </div>
);
