import { Link } from "react-router-dom";
import { Section } from "../../../components/ui/Section";

const SERVICES = [
  {
    icon: "fas fa-puzzle-piece",
    title: "Browser extensions",
    text: "Lightweight Chrome extensions that run locally, respect privacy and stay out of the way.",
    link: { to: "/extensions", label: "Our extensions" },
  },
  {
    icon: "fas fa-globe",
    title: "Websites & web apps",
    text: "Fast, mobile-first websites for small businesses, from landing pages to booking flows.",
    link: { to: "/websites", label: "Websites we built" },
  },
  {
    icon: "fas fa-server",
    title: "Backend & cloud",
    text: "APIs, payment integrations and AWS infrastructure with Node.js, TypeScript and Terraform.",
    link: { to: "/career", label: "Experience" },
  },
];

export const ServicesSection = () => (
  <Section
    id="services"
    eyebrow="What we do"
    title="Small team, end-to-end software."
    intro="From the first idea to the store listing and the server behind it, every project is designed, built and maintained in-house."
    className="bg-ink-deep/60 border-y border-line"
  >
    <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
      {SERVICES.map((service) => (
        <article
          key={service.title}
          className="flex flex-col rounded-xl border border-line bg-surface/60 p-6 hover:border-white/15 transition-colors"
        >
          <span className="w-10 h-10 rounded-lg bg-brand/10 border border-brand/25 text-brand-soft flex items-center justify-center mb-5">
            <i className={service.icon} aria-hidden="true" />
          </span>
          <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
          <p className="text-sm text-gray-400 leading-relaxed mb-6">{service.text}</p>
          <Link
            to={service.link.to}
            className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-brand-soft hover:text-white transition-colors"
          >
            {service.link.label}
            <i className="fas fa-arrow-right text-xs" aria-hidden="true" />
          </Link>
        </article>
      ))}
    </div>
  </Section>
);
