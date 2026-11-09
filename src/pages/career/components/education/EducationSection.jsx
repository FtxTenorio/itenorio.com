import { educationList } from "../../../../data/educationList";
import { SectionHeader } from "../ui/SectionHeader";
import { EducationCard } from "./EducationCard";

// Education as a path, oldest first: a horizontal track of years on top
// (vertical on phones) with one credential card per degree.
const ordered = [...educationList].reverse();

export const EducationSection = () => (
  <section id="education" className="w-full max-w-4xl mb-24" aria-labelledby="education-title">
    <SectionHeader
      id="education-title"
      eyebrow="Education"
      title="Learning path"
      subtitle="An Information Systems foundation, followed by a specialization in cybersecurity."
    />

    <ol className="relative grid gap-6 md:grid-cols-2 md:gap-8">
      {/* the track that links the degrees */}
      <span
        className="absolute left-[11px] top-3 bottom-3 w-px bg-gradient-to-b from-violet-500/60 via-violet-500/30 to-transparent md:left-3 md:right-3 md:top-[11px] md:bottom-auto md:h-px md:w-auto md:bg-gradient-to-r"
        aria-hidden="true"
      />
      {ordered.map((edu, index) => (
        <EducationCard key={edu.id} edu={edu} step={index + 1} />
      ))}
    </ol>
  </section>
);
