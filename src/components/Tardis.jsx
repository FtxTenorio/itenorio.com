import { useState, useEffect, useRef } from "react";

// ==========================================
// SHARED COMPONENT: TARDIS (Interactive Motion)
// ==========================================

const DOCTOR_QUOTES = [
  "Allons-y!",
  "Geronimo!",
  "Fantastic!",
  "Bow ties are cool!",
  "Wibbly-wobbly, timey-wimey!",
  "Run!",
];

export const Tardis = () => {
  const [isZapped, setIsZapped] = useState(false);
  const [catchphrase, setCatchphrase] = useState("");
  const timeoutRef = useRef(null);

  // Clean up timer if the component unmounts mid-animation
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleTardisClick = () => {
    // Ignore new clicks if the animation is already running
    if (isZapped) return;

    // Pick a random catchphrase
    const randomQuote =
      DOCTOR_QUOTES[Math.floor(Math.random() * DOCTOR_QUOTES.length)];

    setCatchphrase(randomQuote);
    setIsZapped(true);

    // Reset the effect after 3.5 seconds and return to normal state
    timeoutRef.current = setTimeout(() => {
      setIsZapped(false);
      setCatchphrase("");
    }, 3500);
  };

  return (
    <>
      {/* 1. VISUAL LAYER: Stays behind site text and elements (z-index: 1) */}
      <div className="tardis-drifter tardis-visual-layer" aria-hidden="true">
        <div
          className={`tardis-wrapper ${
            isZapped ? "vortex-zap" : "normal-spin"
          }`}
        >
          {/* Speech bubble (only visible when isZapped is true) */}
          {isZapped && <div className="speech-bubble">{catchphrase}</div>}

          <svg
            width="120"
            height="160"
            viewBox="0 0 120 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="15" y="150" width="90" height="10" fill="#001d40" />
            <rect x="20" y="20" width="80" height="130" fill="#003b6f" />

            <rect x="25" y="15" width="70" height="5" fill="#002b5e" />
            <rect x="30" y="10" width="60" height="5" fill="#002b5e" />
            <rect x="40" y="5" width="40" height="5" fill="#002b5e" />

            <rect x="56" y="0" width="8" height="6" fill="#cccccc" />
            <rect x="54" y="6" width="12" height="2" fill="#001d40" />

            <circle
              cx="60"
              cy="3"
              r="4"
              fill="#ffffff"
              className="tardis-light"
            />

            <rect x="20" y="20" width="6" height="130" fill="#002b5e" />
            <rect x="94" y="20" width="6" height="130" fill="#002b5e" />
            <rect x="58" y="30" width="4" height="120" fill="#001d40" />

            <rect x="22" y="18" width="76" height="10" fill="#000000" />

            <text
              x="60"
              y="26"
              fontSize="6"
              fill="white"
              textAnchor="middle"
              fontFamily="sans-serif"
              fontWeight="bold"
            >
              POLICE BOX
            </text>

            <rect
              x="32"
              y="32"
              width="22"
              height="24"
              fill="#ffffff"
              opacity="0.9"
            />

            <line
              x1="32"
              y1="40"
              x2="54"
              y2="40"
              stroke="#002b5e"
              strokeWidth="1.5"
            />

            <line
              x1="32"
              y1="48"
              x2="54"
              y2="48"
              stroke="#002b5e"
              strokeWidth="1.5"
            />

            <line
              x1="43"
              y1="32"
              x2="43"
              y2="56"
              stroke="#002b5e"
              strokeWidth="1.5"
            />

            <rect
              x="66"
              y="32"
              width="22"
              height="24"
              fill="#e6f2ff"
              opacity="0.9"
            />

            <line
              x1="66"
              y1="40"
              x2="88"
              y2="40"
              stroke="#002b5e"
              strokeWidth="1.5"
            />

            <line
              x1="66"
              y1="48"
              x2="88"
              y2="48"
              stroke="#002b5e"
              strokeWidth="1.5"
            />

            <line
              x1="77"
              y1="32"
              x2="77"
              y2="56"
              stroke="#002b5e"
              strokeWidth="1.5"
            />

            <rect
              x="32"
              y="62"
              width="22"
              height="26"
              fill="#ffffff"
              opacity="0.9"
            />

            <line
              x1="34"
              y1="66"
              x2="52"
              y2="66"
              stroke="#000000"
              strokeWidth="1"
              opacity="0.5"
            />

            <line
              x1="34"
              y1="70"
              x2="52"
              y2="70"
              stroke="#000000"
              strokeWidth="1"
              opacity="0.5"
            />

            <line
              x1="34"
              y1="74"
              x2="52"
              y2="74"
              stroke="#000000"
              strokeWidth="1"
              opacity="0.5"
            />

            <line
              x1="34"
              y1="78"
              x2="52"
              y2="78"
              stroke="#000000"
              strokeWidth="1"
              opacity="0.5"
            />

            <rect x="66" y="62" width="22" height="26" fill="#002b5e" />
            <rect x="68" y="64" width="18" height="22" fill="#004680" />

            <rect x="32" y="92" width="22" height="26" fill="#002b5e" />
            <rect x="34" y="94" width="18" height="22" fill="#004680" />

            <rect x="66" y="92" width="22" height="26" fill="#002b5e" />
            <rect x="68" y="94" width="18" height="22" fill="#004680" />

            <rect x="32" y="122" width="22" height="26" fill="#002b5e" />
            <rect x="34" y="124" width="18" height="22" fill="#004680" />

            <rect x="66" y="122" width="22" height="26" fill="#002b5e" />
            <rect x="68" y="124" width="18" height="22" fill="#004680" />

            <circle cx="64" cy="75" r="1.5" fill="#cccccc" />
            <circle cx="56" cy="75" r="1" fill="#cccccc" />
          </svg>
        </div>
      </div>

      {/* 2. INVISIBLE HITBOX LAYER: Floats above all site elements (z-index: 9999) */}
      <div className="tardis-drifter tardis-hitbox-layer">
        <div
          className={`tardis-hitbox ${
            isZapped ? "vortex-zap-hitbox" : "normal-spin"
          }`}
          onClick={handleTardisClick}
          role="button"
          tabIndex={0}
          aria-label="Trigger TARDIS Easter Egg"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleTardisClick();
            }
          }}
        />
      </div>

      <style>{`
        /* 1. SHARED HORIZONTAL DRIFT */

        @keyframes drift {
          from {
            left: -150px;
          }

          to {
            left: 110vw;
          }
        }

        .tardis-drifter {
          position: fixed;
          top: 25%;
          animation: drift 45s linear infinite;
        }

        /* Visual layer stays in the background behind text */
        .tardis-visual-layer {
          z-index: 1;
          pointer-events: none;
        }

        /* Hitbox layer stays on top of everything to capture clicks */
        .tardis-hitbox-layer {
          z-index: 9999;
          pointer-events: none;
        }

        /* 2. VISUAL WRAPPER & INVISIBLE HITBOX */

        .tardis-wrapper {
          position: relative;
          width: 120px;
          height: 160px;
          user-select: none;
        }

        .tardis-hitbox {
          width: 120px;
          height: 160px;
          background: transparent;
          cursor: pointer;
          pointer-events: auto;
          outline: none;
        }

        /* Disable clicks while already zapped */
        .vortex-zap-hitbox {
          pointer-events: none;
          cursor: default;
        }

        /* Slow floating rotation when in normal state (shared by both layers) */

        @keyframes subtle-float {
          0%,
          100% {
            transform: translateY(0) rotate(-5deg);
          }

          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        .normal-spin {
          animation: subtle-float 6s ease-in-out infinite;
        }

        /* 3. CHAOTIC VORTEX ANIMATION ON CLICK */

        @keyframes vortex-chaos {
          0% {
            transform: rotate(0deg) scale(1) translate(0, 0);
            filter: hue-rotate(0deg);
          }

          25% {
            transform: rotate(45deg) scale(0.8) translate(-30px, -50px);
            filter: hue-rotate(90deg) brightness(1.5);
          }

          50% {
            transform: rotate(360deg) scale(1.2) translate(50px, 20px);
            filter: hue-rotate(180deg) blur(2px);
          }

          75% {
            transform: rotate(720deg) scale(0.5) translate(-40px, 60px);
            filter: hue-rotate(270deg) brightness(2);
          }

          100% {
            transform: rotate(1080deg) scale(1) translate(0, 0);
            filter: hue-rotate(360deg);
          }
        }

        .vortex-zap {
          animation: vortex-chaos
            1.5s
            cubic-bezier(0.68, -0.55, 0.27, 1.55)
            forwards;
        }

        /* Blinking top lamp */

        @keyframes tardis-blink {
          0%,
          100% {
            opacity: 0.3;
            filter: drop-shadow(0 0 2px #ffffff);
            transform: scale(1);
          }

          50% {
            opacity: 1;
            filter:
              drop-shadow(0 0 25px #ffffff)
              drop-shadow(0 0 50px #00ffff)
              drop-shadow(0 0 80px #0088ff);
            transform: scale(1.6);
          }
        }

        .tardis-light {
          animation: tardis-blink 1.5s ease-in-out infinite;
          transform-origin: center;
          transform-box: fill-box;
        }

        /* 4. SPEECH BUBBLE */

        @keyframes pop-in {
          0% {
            opacity: 0;
            transform: scale(0.5) translateY(20px);
          }

          70% {
            transform: scale(1.1) translateY(-5px);
          }

          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .speech-bubble {
          position: absolute;
          top: -60px;
          right: -80px;
          background: #ffffff;
          color: #002b5e;
          padding: 10px 16px;
          border-radius: 20px;
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: 14px;
          white-space: nowrap;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
          animation: pop-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)
            forwards;
          z-index: 30;
        }

        /* Speech bubble pointer triangle */

        .speech-bubble::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 20px;
          width: 0;
          height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-top: 10px solid #ffffff;
        }

        /* ==========================================
           MOBILE BEHAVIOR (Screens up to 768px)
           ========================================== */

        @media (max-width: 768px) {
          .tardis-drifter {
            transform: scale(0.5);
            transform-origin: center left;
          }

          .tardis-hitbox {
            pointer-events: none;
          }
        }
      `}</style>
    </>
  );
};
