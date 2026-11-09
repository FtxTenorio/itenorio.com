import { useEffect, useState } from "react";
import { HeroSection } from "./components/hero/HeroSection";
import { CareerSection } from "./components/career/CareerSection";
import { EducationSection } from "./components/education/EducationSection";
import { SummarySection } from "./components/summary/SummarySection";
import { TechModal } from "./components/modals/TechModal";
import { CertModal } from "./components/modals/CertModal";

// Paulo's résumé: intro, experience (stacked cards), education and skills.
const CareerPage = () => {
  const [activeStack, setActiveStack] = useState(null);
  const [activeCert, setActiveCert] = useState(null);

  // Close the open modal with Esc
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveStack(null);
        setActiveCert(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="px-4 pt-10 pb-24 flex flex-col items-center">
      <HeroSection />
      <CareerSection onSelectTech={setActiveStack} onSelectCert={setActiveCert} />
      <EducationSection />
      <SummarySection onSelectTech={setActiveStack} onSelectCert={setActiveCert} />

      <TechModal stack={activeStack} onClose={() => setActiveStack(null)} />
      <CertModal cert={activeCert} onClose={() => setActiveCert(null)} />
    </div>
  );
};

export default CareerPage;
