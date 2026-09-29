// FILE: src/pages/PortfolioPage.jsx
import { useEffect, useState } from "react";
import { HeroSection } from "./components/hero/HeroSection";
import { CareerSection } from "./components/career/CareerSection";
import { EducationSection } from "./components/education/EducationSection";
import { SummarySection } from "./components/summary/SummarySection";
import { TechModal } from "./components/modals/TechModal";
import { CertModal } from "./components/modals/CertModal";

const PortfolioPage = () => {
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
    <div className="bg-[#0b0f19] text-white overflow-x-hidden min-h-screen font-sans mt-20">
      <main className="px-4 pt-12 pb-24 relative z-20 flex flex-col items-center">
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
      </main>

      <TechModal stack={activeStack} onClose={() => setActiveStack(null)} />
      <CertModal cert={activeCert} onClose={() => setActiveCert(null)} />

      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap");

        .glowing-text {
          text-shadow:
            0 0 15px rgba(255, 255, 255, 0.3),
            0 0 30px rgba(255, 255, 255, 0.1);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.98);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        :global(.animate-fade-in) {
          animation: fadeIn 0.15s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default PortfolioPage;
