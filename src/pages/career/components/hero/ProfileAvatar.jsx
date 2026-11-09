// FILE: src/components/hero/ProfileAvatar.jsx
import { PROFILE_IMAGE_URL } from "../../../../data/config";

export const ProfileAvatar = () => (
  <div className="relative w-36 h-36 mb-6 rounded-full overflow-hidden border-4 border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-transform duration-300 hover:scale-105 z-20 bg-white/5">
    <img
      src={PROFILE_IMAGE_URL}
      alt="Paulo Tenório"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 pointer-events-none">
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        <path
          d="M 0 50 A 50 50 0 0 0 100 50 L 86 50 A 36 36 0 0 1 14 50 Z"
          fill="#008139"
          opacity="0.95"
        />
        <path id="text-path" d="M 7 50 A 43 43 0 0 0 93 50" fill="none" />
        <text fontSize="8.5" fontWeight="bold" fill="white" letterSpacing="0.8">
          <textPath
            href="#text-path"
            startOffset="50%"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            #OPENTOWORK
          </textPath>
        </text>
      </svg>
    </div>
  </div>
);
