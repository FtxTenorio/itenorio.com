import { useEffect, useState } from "react";
import { HeroSection } from "./components/hero/HeroSection";
import { CareerSection } from "./components/career/CareerSection";
import { EducationSection } from "./components/education/EducationSection";
import { SummarySection } from "./components/summary/SummarySection";
import { TechModal } from "./components/modals/TechModal";
import { CertModal } from "./components/modals/CertModal";
import { Section } from "../../components/ui/Section";
import { HOME_BG } from "../../config/theme";

// Paulo's résumé: intro, experience (stacked cards), education and skills.
// Each part is a band in the home page's style: alternating background,
// bubbles of light and a wave flowing into the next band.
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
    <>
      <Section
        className="pt-10 sm:pt-14"
        background={HOME_BG.base}
        wave={HOME_BG.alt}
        bubbles={[
          { color: "#0078d7", className: "-top-32 left-1/3 w-[36rem] h-[24rem]" },
          { color: "#8b5cf6", className: "bottom-[5%] -right-32 w-[24rem] h-[24rem]" },
        ]}
      >
        <HeroSection />
      </Section>
      <Section
        background={HOME_BG.alt}
        wave={HOME_BG.base}
        waveFlip
        bubbles={[
          { color: "#38bdf8", className: "top-[10%] -left-40 w-[28rem] h-[28rem]" },
          { color: "#0078d7", className: "bottom-[15%] -right-40 w-[30rem] h-[30rem]" },
        ]}
      >
        <CareerSection onSelectTech={setActiveStack} onSelectCert={setActiveCert} />
      </Section>
      <Section
        background={HOME_BG.base}
        wave={HOME_BG.alt}
        bubbles={[{ color: "#8b5cf6", className: "top-[20%] right-[10%] w-[24rem] h-[24rem]" }]}
      >
        <EducationSection />
      </Section>
      <Section
        background={HOME_BG.alt}
        wave={HOME_BG.footer}
        waveFlip
        bubbles={[
          { color: "#10b981", className: "-bottom-20 left-[10%] w-[22rem] h-[22rem]" },
          { color: "#0078d7", className: "top-[10%] right-[5%] w-[24rem] h-[24rem]" },
        ]}
      >
        <SummarySection onSelectTech={setActiveStack} onSelectCert={setActiveCert} />
      </Section>

      <TechModal stack={activeStack} onClose={() => setActiveStack(null)} />
      <CertModal cert={activeCert} onClose={() => setActiveCert(null)} />
    </>
  );
};

export default CareerPage;
