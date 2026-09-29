import { useState, useEffect } from "react";
import { ProfileAvatar } from "./ProfileAvatar";
import { QuickBadges } from "./QuickBadges";
import { SocialLinks } from "./SocialLinks";

const TYPING_LINES = [
  "Not just a static portfolio — it is a live web ecosystem ⚡",
  "Multi-Page React + Vite Architecture 🚀",
  "Home of /extensions and /shortener 🔗",
  "Warning: Contains TheOneRing component hidden in the code 💍",
];

export const HeroSection = () => {
  const [lineIndex, setLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentLine = TYPING_LINES[lineIndex];
    const typingSpeed = isDeleting ? 30 : 55;

    const timeout = setTimeout(() => {
      if (!isDeleting && displayedText === currentLine) {
        // Pause at the end of the line before deleting
        setTimeout(() => setIsDeleting(true), 1600);
      } else if (isDeleting && displayedText === "") {
        // Move to the next line
        setIsDeleting(false);
        setLineIndex((prev) => (prev + 1) % TYPING_LINES.length);
      } else {
        setDisplayedText(
          currentLine.substring(
            0,
            displayedText.length + (isDeleting ? -1 : 1),
          ),
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, lineIndex]);

  return (
    <div className="relative text-center mb-12 flex flex-col items-center max-w-3xl px-4">
      {/* Ambient Venom Neon Background Aura */}
      <div
        className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-80 h-40 bg-sky-500/15 blur-[90px] rounded-full -z-10"
        aria-hidden="true"
      />

      <ProfileAvatar />

      {/* Live Status Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-[11px] font-mono uppercase tracking-widest mb-4 shadow-lg">
        <span className="text-slate-400">itenorio.com</span>
        <span className="text-slate-700">|</span>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-emerald-400 font-bold">AVAILABLE ⚡</span>
      </div>

      {/* Venom Neon Glowing Name */}
      <h1 className="text-4xl md:text-6xl font-extrabold mb-3 tracking-tight bg-gradient-to-r from-white via-sky-300 to-sky-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(56,189,248,0.45)] glowing-text">
        Paulo Tenório
      </h1>

      {/* Role Sub-header */}
      <h2 className="text-lg md:text-xl text-slate-200 font-semibold mb-3">
        Senior Backend Engineer & Cloud Architect
      </h2>

      {/* Dynamic Typing Text (Replacing the static subtitle) */}
      <div className="min-h-[2rem] flex items-center justify-center mb-6 px-3 py-1 rounded-md bg-slate-950/60 border border-sky-500/20 shadow-[0_0_15px_rgba(2,132,199,0.15)]">
        <p className="font-mono text-xs sm:text-sm md:text-base font-bold text-sky-400 tracking-tight">
          {displayedText}
          <span className="inline-block w-2 h-4 ml-1 align-middle bg-sky-400 animate-pulse" />
        </p>
      </div>

      {/* Bio Description */}
      <p className="text-gray-300 text-base md:text-lg mx-auto leading-relaxed mb-8 max-w-2xl">
        I&apos;m building a space to share my journey, my projects, and the
        things that make me, me. Delivering{" "}
        <span className="text-sky-300 font-medium">
          scalable software solutions
        </span>{" "}
        and{" "}
        <span className="text-indigo-300 font-medium">
          robust backend ecosystems
        </span>{" "}
        for modern businesses.
      </p>

      <QuickBadges />
      <SocialLinks />
    </div>
  );
};
