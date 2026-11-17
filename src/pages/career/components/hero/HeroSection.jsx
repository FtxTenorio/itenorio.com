import { Link } from "react-router-dom";
import { careerTrajectory, yearsOfExperience } from "../../../../data/careerTrajectory";
import { certifications } from "../../../../data/certifications";
import { PROFILE_IMAGE_URL, SOCIAL_LINKS } from "../../../../data/config";

/** Short, stable fake commit hash for a role (same on server and browser). */
const shortHash = (text) => {
  let hash = 2166136261;
  for (const char of text) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
  return (hash >>> 0).toString(16).padStart(8, "0").slice(0, 7);
};

const companies = new Set(careerTrajectory.map((job) => job.company)).size;

/**
 * Career intro, focused on the career rather than on the person: a headline
 * about the work, the numbers, and the roles printed as a `git log` in a
 * terminal. The person (photo, name, title) is a small byline on the left.
 * The terminal's last line (`cd ./experience`) is where the trace drawn by
 * CareerTrace starts and leads down into the experience list.
 */
export const HeroSection = () => {
  const stats = [
    { value: `${yearsOfExperience()}+`, label: "years building backend & cloud" },
    { value: companies, label: "companies" },
    { value: certifications.length, label: "certifications" },
  ];

  return (
    <header className="grid w-full items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
      <div className="career-hero text-left will-change-transform">
        <div className="mb-6 flex items-center gap-3">
          <img
            src={PROFILE_IMAGE_URL}
            alt=""
            width="48"
            height="48"
            className="h-12 w-12 rounded-xl border border-white/10 bg-white/5 object-cover"
          />
          <div className="leading-tight">
            <p className="text-sm font-semibold text-white">Paulo Tenório</p>
            <p className="text-xs text-gray-400">Senior Backend Engineer &amp; Cloud Architect</p>
          </div>
        </div>

        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-brand-soft">Career</p>
        <h1 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl">
          Backend &amp; cloud systems that{" "}
          <span className="bg-gradient-to-r from-brand-soft to-brand bg-clip-text text-transparent">
            hold up in production.
          </span>
        </h1>
        <p className="mt-5 max-w-xl leading-relaxed text-gray-400">
          Scalable APIs, payment integrations and AWS infrastructure for companies in
          Brazil and abroad. Today I run{" "}
          <Link
            to="/"
            className="text-white underline decoration-brand-soft/60 underline-offset-4 hover:decoration-brand-soft"
          >
            iTenorio Tech
          </Link>
          , my software studio.
        </p>

        <dl className="mt-8 grid max-w-xl grid-cols-3 gap-px overflow-hidden rounded-xl border border-line bg-line">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse justify-end bg-ink/90 px-3 py-3 sm:px-4">
              <dt className="text-[11px] leading-snug text-gray-500 sm:text-xs">{stat.label}</dt>
              <dd className="font-mono text-xl font-bold text-white sm:text-2xl">{stat.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex items-center gap-2 sm:gap-3">
          <a
            href="#experience"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-brand px-4 py-3 font-semibold sm:px-5 text-white transition-colors hover:bg-[#0a86ee]"
          >
            See my experience
            <i className="fas fa-arrow-down text-sm" aria-hidden="true" />
          </a>
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/15 text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              <i className={`${social.icon} text-lg`} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>

      {/* git log of the career */}
      <div className="overflow-hidden rounded-xl border border-white/10 bg-ink/85 font-mono text-[12px] shadow-2xl backdrop-blur sm:text-[13px]">
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="ml-2 text-[11px] text-gray-500">~/career</span>
        </div>
        <ol className="space-y-2 p-4 sm:p-5" aria-label="Roles, newest first">
          <li className="terminal-line text-gray-400" style={{ animationDelay: "0.1s" }}>
            <span className="text-brand-soft">$</span> git log --oneline
          </li>
          {careerTrajectory.map((job, index) => (
            <li
              key={job.id}
              className="terminal-line flex gap-2"
              style={{ animationDelay: `${0.35 + index * 0.25}s` }}
            >
              <span className="shrink-0 text-amber-300/80">{shortHash(job.id)}</span>
              <span className="min-w-0">
                {index === 0 && <span className="text-emerald-300">(HEAD) </span>}
                <span className="text-gray-200">{job.role}</span>
                <span className="text-gray-500"> @ </span>
                <span className="text-white">{job.company}</span>
                <span className="block text-[11px] text-gray-500">{job.period}</span>
              </span>
            </li>
          ))}
          <li
            className="terminal-line text-gray-400"
            style={{ animationDelay: `${0.4 + careerTrajectory.length * 0.25}s` }}
          >
            <span className="text-brand-soft">$</span> cd ./experience
            <span data-trace-start className="logo-caret ml-1 inline-block h-[1em] w-[7px] translate-y-[2px] bg-brand-soft" />
          </li>
        </ol>
      </div>
    </header>
  );
};
