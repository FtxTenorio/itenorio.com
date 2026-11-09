import { Link } from "react-router-dom";
import { Section } from "../../../components/ui/Section";
import { PROFILE_IMAGE_URL, SOCIAL_LINKS } from "../../../data/config";

const BACKGROUND = [
  "Senior Backend Engineer & Cloud Architect",
  "Previously at iFood, Anota AI and Compass.uol",
  "BSc Information Systems · MBA Cybersecurity",
];

export const FounderSection = () => (
  <Section id="about" eyebrow="Who is behind it">
    <div className="grid md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-start">
      <img
        src={PROFILE_IMAGE_URL}
        alt="Portrait of Paulo Tenório"
        className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover border border-white/10 bg-white/5"
        loading="lazy"
      />

      <div className="max-w-2xl">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
          Hi, I&apos;m Paulo Tenório.
        </h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          I founded iTenorio Tech and I&apos;m its managing partner. I&apos;m a
          backend engineer with 5+ years building scalable APIs, payment
          integrations and cloud infrastructure for companies in Brazil and
          abroad. Crunchyroll Navigator started as a tool I wanted for myself —
          now it is the studio&apos;s first product.
        </p>

        <ul className="space-y-2 mb-8 text-sm text-gray-400">
          {BACKGROUND.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <i className="fas fa-check text-brand-soft text-xs mt-1.5" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/career"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white text-ink font-semibold hover:bg-gray-200 transition-colors"
          >
            View my career
            <i className="fas fa-arrow-right text-sm" aria-hidden="true" />
          </Link>
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="w-11 h-11 inline-flex items-center justify-center rounded-lg border border-white/15 text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              <i className={`${link.icon} text-lg`} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </div>
  </Section>
);
