import { SOCIAL_LINKS } from "../../../../data/config";

export const SocialLinks = () => (
  <div className="flex flex-wrap justify-center gap-4 mb-8">
    {SOCIAL_LINKS.map((social) => (
      <a
        key={social.id}
        href={social.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`w-10 h-10 flex items-center justify-center rounded-full bg-[#121826] border border-white/10 ${social.hoverClass} hover:scale-110 transition-all duration-300 shadow-lg`}
      >
        <i
          className={`${social.icon} text-lg text-gray-300 hover:text-white`}
        />
      </a>
    ))}
  </div>
);
