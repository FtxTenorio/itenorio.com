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

const TARDIS_WIDTH = 120;
const TARDIS_HEIGHT = 160;
const EDGE_PADDING = 12; // Extra margin so the rotating corners never clip off-screen

export const Tardis = () => {
  const [isZapped, setIsZapped] = useState(false);
  const [catchphrase, setCatchphrase] = useState("");

  const visualLayerRef = useRef(null);
  const hitboxLayerRef = useRef(null);
  const timeoutRef = useRef(null);

  // Physics state stored in a ref to run at 60fps+ without triggering React re-renders
  const physicsRef = useRef({
    x: 40,
    y: typeof window !== "undefined" ? window.innerHeight * 0.25 : 150,
    vx: 1.8, // Horizontal speed
    vy: 1.1, // Vertical speed
  });

  useEffect(() => {
    let animationFrameId;

    // Helper to slightly randomize the speed/angle when bouncing off a wall
    const randomizeVelocity = (currentVelocity) => {
      const direction = currentVelocity > 0 ? -1 : 1;
      const randomSpeed = 1.2 + Math.random() * 1.3; // Speed between 1.2 and 2.5
      return direction * randomSpeed;
    };

    const updatePosition = () => {
      const state = physicsRef.current;
      const isMobile = window.innerWidth <= 768;
      const scale = isMobile ? 0.5 : 1;

      const currentWidth = TARDIS_WIDTH * scale;
      const currentHeight = TARDIS_HEIGHT * scale;

      const minX = EDGE_PADDING;
      const maxX = window.innerWidth - currentWidth - EDGE_PADDING;
      const minY = EDGE_PADDING;
      const maxY = window.innerHeight - currentHeight - EDGE_PADDING;

      state.x += state.vx;
      state.y += state.vy;

      // Horizontal wall collision (Left / Right)
      if (state.x <= minX) {
        state.x = minX;
        state.vx = randomizeVelocity(state.vx);
      } else if (state.x >= maxX) {
        state.x = maxX;
        state.vx = randomizeVelocity(state.vx);
      }

      // Vertical wall collision (Top / Bottom)
      if (state.y <= minY) {
        state.y = minY;
        state.vy = randomizeVelocity(state.vy);
      } else if (state.y >= maxY) {
        state.y = maxY;
        state.vy = randomizeVelocity(state.vy);
      }

      const transformString = `translate3d(${state.x}px, ${state.y}px, 0) scale(${scale})`;

      if (visualLayerRef.current) {
        visualLayerRef.current.style.transform = transformString;
      }
      if (hitboxLayerRef.current) {
        hitboxLayerRef.current.style.transform = transformString;
      }

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    animationFrameId = requestAnimationFrame(updatePosition);

    return () => {
      cancelAnimationFrame(animationFrameId);
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

    // Also give it a random directional kick when clicked
    physicsRef.current.vx =
      (Math.random() > 0.5 ? 1 : -1) * (1.5 + Math.random() * 1.5);
    physicsRef.current.vy =
      (Math.random() > 0.5 ? 1 : -1) * (1.2 + Math.random() * 1.5);

    // Reset the effect after 3.5 seconds and return to normal state
    timeoutRef.current = setTimeout(() => {
      setIsZapped(false);
      setCatchphrase("");
    }, 3500);
  };

  return (
    <>
      {/* 1. VISUAL LAYER: Stays behind site text and elements (z-index: 1) */}
      <div
        ref={visualLayerRef}
        className="tardis-drifter tardis-visual-layer"
        aria-hidden="true"
      >
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
      <div ref={hitboxLayerRef} className="tardis-drifter tardis-hitbox-layer">
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
        /* 1. SHARED BOUNCING CONTAINER */

        .tardis-drifter {
          position: fixed;
          top: 0;
          left: 0;
          transform-origin: top left;
          will-change: transform;
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

        /* Slow floating wobble when in normal state */

        @keyframes subtle-float {
          0%,
          100% {
            transform: translateY(0) rotate(-6deg);
          }

          50% {
            transform: translateY(-10px) rotate(6deg);
          }
        }

        .normal-spin {
          animation: subtle-float 4s ease-in-out infinite;
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
          .tardis-hitbox {
            pointer-events: none;
          }
        }
      `}</style>
    </>
  );
};
