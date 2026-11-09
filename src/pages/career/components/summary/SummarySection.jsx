import { SectionHeader } from "../ui/SectionHeader";
import { TechSummaryCard } from "./TechSummaryCard";
import { CertSummaryCard } from "./CertSummaryCard";

export const SummarySection = ({ onSelectTech, onSelectCert }) => (
  <div className="w-full max-w-4xl flex flex-col items-center mb-12">
    <SectionHeader
      title="Consolidated Arsenal & Credentials"
      subtitle="Quick overview of all technologies and official certifications accumulated along the journey"
      leftAccentColor="#0078d7"
      rightAccentColor="#ffc000"
    />

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
      <TechSummaryCard onSelectTech={onSelectTech} />
      <CertSummaryCard onSelectCert={onSelectCert} />
    </div>
  </div>
);
