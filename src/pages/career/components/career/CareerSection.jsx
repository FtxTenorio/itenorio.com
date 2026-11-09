import { useRef } from "react";
import { careerTrajectory } from "../../../../data/careerTrajectory";
import { useStackedCards } from "../../hooks/useStackedCards";
import { SectionHeader } from "../ui/SectionHeader";
import { CareerCard } from "./CareerCard";

// Experience as a stack of sticky cards: scrolling slides each job over the
// previous one (see useStackedCards).
export const CareerSection = ({ onSelectTech, onSelectCert }) => {
  const listRef = useRef(null);
  useStackedCards(listRef);

  return (
    <section id="experience" className="w-full max-w-4xl mb-24" aria-labelledby="experience-title">
      <SectionHeader
        id="experience-title"
        eyebrow="Experience"
        title="Where I've worked"
        subtitle="Each role with the stack I used and the certifications I earned along the way. Click a technology or certification for details."
      />

      <ol ref={listRef} className="space-y-8 pb-[10vh]">
        {careerTrajectory.map((job, index) => (
          <li
            key={job.id}
            data-stack-item
            className="stack-item"
            style={{ "--stack-index": index }}
          >
            <CareerCard
              job={job}
              index={index}
              total={careerTrajectory.length}
              onSelectTech={onSelectTech}
              onSelectCert={onSelectCert}
            />
          </li>
        ))}
      </ol>
    </section>
  );
};
