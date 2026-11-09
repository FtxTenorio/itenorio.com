import { Link } from "react-router-dom";
import { ProfileAvatar } from "./ProfileAvatar";
import { QuickBadges } from "./QuickBadges";
import { SocialLinks } from "./SocialLinks";

export const HeroSection = () => (
  <header className="w-full max-w-4xl mx-auto pb-4 flex flex-col items-center text-center">
    <ProfileAvatar />

    <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-soft mb-3">Career</p>
    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
      Paulo Tenório
    </h1>
    <p className="mt-3 text-lg sm:text-xl font-semibold text-gray-200">
      Senior Backend Engineer &amp; Cloud Architect
    </p>
    <p className="mt-5 max-w-2xl text-gray-400 leading-relaxed">
      I build scalable APIs, payment integrations and cloud infrastructure on
      AWS for companies in Brazil and abroad, and I run{" "}
      <Link to="/" className="text-white underline decoration-brand-soft/60 underline-offset-4 hover:decoration-brand-soft">
        iTenorio Tech
      </Link>
      , my software studio.
    </p>

    <div className="mt-8 w-full flex flex-col items-center">
      <QuickBadges />
      <SocialLinks />
    </div>
  </header>
);
