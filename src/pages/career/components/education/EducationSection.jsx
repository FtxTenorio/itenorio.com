import { educationList } from "../../../../data/educationList";
import { SectionHeader } from "../ui/SectionHeader";
import { EducationCard } from "./EducationCard";

export const EducationSection = () => (
  <div className="w-full max-w-4xl flex flex-col items-center mb-20">
    <SectionHeader
      title="Academic Background"
      subtitle="Formal education combining Information Systems foundation with Cybersecurity specialization"
      leftAccentColor="#a855f7"
    />

    <div className="relative w-full pl-6 md:pl-8 border-l-2 border-white/10 space-y-8">
      {educationList.map((edu) => (
        <EducationCard key={edu.id} edu={edu} />
      ))}
    </div>
  </div>
);
