import { ProfileAvatar } from "./ProfileAvatar";
import { QuickBadges } from "./QuickBadges";
import { SocialLinks } from "./SocialLinks";

export const HeroSection = () => (
  <div className="text-center mb-12 flex flex-col items-center max-w-3xl">
    <ProfileAvatar />
    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 glowing-text tracking-tight">
      Paulo Tenório
    </h1>
    <h2 className="text-lg md:text-xl text-gray-400 font-semibold mb-6">
      Senior Backend Engineer & Cloud Architect
    </h2>
    <p className="text-gray-300 text-base md:text-lg mx-auto leading-relaxed mb-8">
      I'm building a space to share my journey, my projects, and the things that
      make me, me. Delivering scalable software solutions and robust backend
      ecosystems for modern businesses.
    </p>
    <QuickBadges />
    <SocialLinks />
  </div>
);
