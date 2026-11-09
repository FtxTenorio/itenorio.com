import { useEffect, useState } from "react";
import { HeroSection } from "./components/hero/HeroSection";
import { CareerSection } from "./components/career/CareerSection";
import { EducationSection } from "./components/education/EducationSection";
import { SummarySection } from "./components/summary/SummarySection";
import { TechModal } from "./components/modals/TechModal";
import { CertModal } from "./components/modals/CertModal";
import { Tardis } from "../../components/easter-eggs/Tardis";
import { TheOneRing } from "../../components/easter-eggs/TheOneRing";

// Paulo's résumé: hero, career timeline, education and skills summary.
// (Until Nov 2026 this was the home page of itenorio.com.)
const CareerPage = () => {
  const [activeStack, setActiveStack] = useState(null);
  const [activeCert, setActiveCert] = useState(null);

  // Close active modals when pressing ESC
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
    <div className="relative">
      {/* Fan easter eggs — fixed-position, behind the content */}
      <Tardis />
      <TheOneRing />

      <div className="px-4 pt-12 pb-24 relative z-20 flex flex-col items-center">
        <HeroSection />
        <CareerSection
          onSelectTech={setActiveStack}
          onSelectCert={setActiveCert}
        />
        <EducationSection />
        <SummarySection
          onSelectTech={setActiveStack}
          onSelectCert={setActiveCert}
        />
      </div>

      <TechModal stack={activeStack} onClose={() => setActiveStack(null)} />
      <CertModal cert={activeCert} onClose={() => setActiveCert(null)} />

      <style>{`
        .glowing-text {
          text-shadow:
            0 0 15px rgba(255, 255, 255, 0.3),
            0 0 30px rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
};

export default CareerPage;
