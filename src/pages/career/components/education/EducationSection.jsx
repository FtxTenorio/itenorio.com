import { useRef } from "react";
import { educationList } from "../../../../data/educationList";
import { useReveal } from "../../../../hooks/useReveal";
import { SectionHeader } from "../ui/SectionHeader";
import { EducationCard } from "./EducationCard";

// Education as a path, oldest first: a track (vertical on phones and tablets,
// horizontal from lg) with one credential card per degree. When it scrolls
// into view the track draws itself and the cards rise in one after the other
// (useReveal).
const ordered = [...educationList].reverse();

export const EducationSection = () => {
  const listRef = useRef(null);
  useReveal(listRef);

  return (
    <section id="education" className="w-full max-w-5xl mx-auto" aria-labelledby="education-title">
      <SectionHeader
        id="education-title"
        eyebrow="Education"
        title="Learning path"
        subtitle="An Information Systems foundation, a specialization in cybersecurity and, now, one in cloud computing projects."
      />

      <ol ref={listRef} className="relative grid gap-6 lg:grid-cols-3 lg:gap-6">
        {/* the track that links the degrees */}
        <span
          className="reveal-track absolute left-[11px] top-3 bottom-3 w-px bg-gradient-to-b from-violet-500/60 via-violet-500/40 to-sky-400/50 lg:left-3 lg:right-3 lg:top-[11px] lg:bottom-auto lg:h-px lg:w-auto lg:bg-gradient-to-r"
          aria-hidden="true"
        />
        {ordered.map((edu, index) => (
          <EducationCard key={edu.id} edu={edu} step={index + 1} delay={0.25 + index * 0.22} />
        ))}
      </ol>
    </section>
  );
};
