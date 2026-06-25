import { useEffect, useRef } from 'react';
// ==========================================
// SHARED COMPONENT: TARDIS (Pure CSS Motion)
// ==========================================
export const Tardis = () => {
  return (
    <>
      <svg className="tardis absolute" viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="150" width="90" height="10" fill="#001d40"/>
        <rect x="20" y="20" width="80" height="130" fill="#003b6f"/>
        <rect x="25" y="15" width="70" height="5" fill="#002b5e"/>
        <rect x="30" y="10" width="60" height="5" fill="#002b5e"/>
        <rect x="40" y="5" width="40" height="5" fill="#002b5e"/>
        <rect x="56" y="0" width="8" height="6" fill="#cccccc"/>
        <rect x="54" y="6" width="12" height="2" fill="#001d40"/>
        <circle cx="60" cy="3" r="4" fill="#ffffff" className="tardis-light"/>
        <rect x="20" y="20" width="6" height="130" fill="#002b5e"/>
        <rect x="94" y="20" width="6" height="130" fill="#002b5e"/>
        <rect x="58" y="30" width="4" height="120" fill="#001d40"/>
        <rect x="22" y="18" width="76" height="10" fill="#000000"/>
        <text x="60" y="26" fontSize="6" fill="white" textAnchor="middle" fontFamily="sans-serif" fontWeight="bold">POLICE BOX</text>
        <rect x="32" y="32" width="22" height="24" fill="#ffffff" opacity="0.9"/>
        <line x1="32" y1="40" x2="54" y2="40" stroke="#002b5e" strokeWidth="1.5"/>
        <line x1="32" y1="48" x2="54" y2="48" stroke="#002b5e" strokeWidth="1.5"/>
        <line x1="43" y1="32" x2="43" y2="56" stroke="#002b5e" strokeWidth="1.5"/>
        <rect x="66" y="32" width="22" height="24" fill="#e6f2ff" opacity="0.9"/>
        <line x1="66" y1="40" x2="88" y2="40" stroke="#002b5e" strokeWidth="1.5"/>
        <line x1="66" y1="48" x2="88" y2="48" stroke="#002b5e" strokeWidth="1.5"/>
        <line x1="77" y1="32" x2="77" y2="56" stroke="#002b5e" strokeWidth="1.5"/>
        <rect x="32" y="62" width="22" height="26" fill="#ffffff" opacity="0.9"/>
        <line x1="34" y1="66" x2="52" y2="66" stroke="#000000" strokeWidth="1" opacity="0.5"/>
        <line x1="34" y1="70" x2="52" y2="70" stroke="#000000" strokeWidth="1" opacity="0.5"/>
        <line x1="34" y1="74" x2="52" y2="74" stroke="#000000" strokeWidth="1" opacity="0.5"/>
        <line x1="34" y1="78" x2="52" y2="78" stroke="#000000" strokeWidth="1" opacity="0.5"/>
        <rect x="66" y="62" width="22" height="26" fill="#002b5e"/>
        <rect x="68" y="64" width="18" height="22" fill="#004680"/>
        <rect x="32" y="92" width="22" height="26" fill="#002b5e"/>
        <rect x="34" y="94" width="18" height="22" fill="#004680"/>
        <rect x="66" y="92" width="22" height="26" fill="#002b5e"/>
        <rect x="68" y="94" width="18" height="22" fill="#004680"/>
        <rect x="32" y="122" width="22" height="26" fill="#002b5e"/>
        <rect x="34" y="124" width="18" height="22" fill="#004680"/>
        <rect x="66" y="122" width="22" height="26" fill="#002b5e"/>
        <rect x="68" y="124" width="18" height="22" fill="#004680"/>
        <circle cx="64" cy="75" r="1.5" fill="#cccccc"/>
        <circle cx="56" cy="75" r="1" fill="#cccccc"/>
      </svg>
      <style jsx>{`
        @keyframes drift {
          from { left: -10vw; transform: translateY(0) rotate(-10deg); }
          to { left: 110vw; transform: translateY(-50px) rotate(10deg); }
        }

        .tardis {
          position: absolute;
          width: 120px;
          height: auto;
          opacity: 0.95;
          animation: drift 45s linear infinite;
          z-index: 5;
          top: 20%;
          transform-style: preserve-3d;
        }

        @keyframes tardis-blink {
          0%, 100% { opacity: 0.3; filter: drop-shadow(0 0 2px #ffffff); transform: scale(1); }
          50% { opacity: 1; filter: drop-shadow(0 0 25px #ffffff) drop-shadow(0 0 50px #00ffff) drop-shadow(0 0 80px #0088ff); transform: scale(1.6); }
        }

        .tardis-light {
          animation: tardis-blink 1.5s ease-in-out infinite;
          transform-origin: center;
          transform-box: fill-box;
        }

        @keyframes rotateTardis {
          from { transform: rotateY(0deg) rotateX(0deg); }
          to { transform: rotateY(360deg) rotateX(0deg); }
        }

        .tardis-3d {
          animation: rotateTardis 20s linear infinite;
        }
      `}</style>
    </>
  );
};

