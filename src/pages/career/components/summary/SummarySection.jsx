import { SectionHeader } from "../ui/SectionHeader";
import { TechSummaryCard } from "./TechSummaryCard";
import { CertSummaryCard } from "./CertSummaryCard";

export const SummarySection = ({ onSelectTech, onSelectCert }) => (
  <section id="skills" className="w-full max-w-4xl mx-auto" aria-labelledby="skills-title">
    <SectionHeader
      id="skills-title"
      eyebrow="Skills"
      title="Stack & certifications"
      subtitle="Every technology and certification from the roles above, in one place."
    />

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
      <TechSummaryCard onSelectTech={onSelectTech} />
      <CertSummaryCard onSelectCert={onSelectCert} />
    </div>
  </section>
);
