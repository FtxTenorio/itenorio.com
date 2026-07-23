import { useState, useEffect, useRef } from 'react';

// Fun loading messages in English
const loadingMessages = [
  "Mining diamonds...",
  "Running from Creepers...",
  "Punching wood...",
  "Generating world...",
  "Cooking porkchops...",
  "Taming wolves..."
];

// Modern icons for copy buttons
const CopyIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-5 h-5 text-[#3C8527]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
  </svg>
);

// Ping signal bars
const SignalBars = ({ online }) => {
  if (!online) {
    return <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>;
  }
  return (
    <div className="flex items-end gap-[2px] h-4">
      <div className="w-1.5 h-1.5 bg-[#3C8527] rounded-sm"></div>
      <div className="w-1.5 h-2.5 bg-[#3C8527] rounded-sm"></div>
      <div className="w-1.5 h-3.5 bg-[#3C8527] rounded-sm"></div>
      <div className="w-1.5 h-4 bg-[#3C8527] rounded-sm animate-pulse"></div>
    </div>
  );
};

// Copy button with fun icons
const ModernCopyButton = ({ label, copyText, emoji }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(copyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-1 mb-4 group">
      <span className="text-sm text-gray-400 font-medium flex items-center gap-2">
        {emoji} {label}
      </span>
      <button 
        onClick={handleCopy}
        className="flex items-center justify-between w-full bg-[#2A2B2E] hover:bg-[#343538] hover:scale-[1.02] border border-[#3E3F42] hover:border-[#3C8527] text-white rounded-md py-3 px-4 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#3C8527]"
      >
        <span className="font-mono text-base tracking-wide text-gray-200 group-hover:text-white transition-colors">{copyText}</span>
        <div className="transform transition-transform group-hover:scale-110">
          {copied ? <CheckIcon /> : <CopyIcon />}
        </div>
      </button>
    </div>
  );
};

export default function Minecraft() {
  const [serverData, setServerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('java');
  const [loadingText, setLoadingText] = useState(loadingMessages[0]);

  // Função adaptada para suportar chamadas silenciosas (sem tela de carregamento)
  const fetchServer = async (isSilent = false) => {
    if (!isSilent) {
      setLoading(true);
      setLoadingText(loadingMessages[Math.floor(Math.random() * loadingMessages.length)]);
    }
    
    try {
      const res = await fetch('https://api.mcstatus.io/v2/status/java/born-although.gl.joinmc.link');
      const json = await res.json();
      setServerData(json);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      if (!isSilent) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    // Carregamento inicial (vísivel para o usuário)
    fetchServer(false);

    // Sistema de Auto-Refresh Silencioso
    let refreshes = 0;
    const interval = setInterval(() => {
      if (refreshes < 3) {
        fetchServer(true); // true = Atualiza por trás dos panos
        refreshes++;
      } else {
        clearInterval(interval); // Limpa o intervalo após 3 vezes
      }
    }, 5 * 60 * 1000); // 5 minutos (5 * 60 * 1000 ms)

    return () => clearInterval(interval);
  }, []);

  const isOnline = serverData?.online;
  const playersOnline = serverData?.players?.online || 0;
  const playersMax = serverData?.players?.max || 0;
  
  // Usa o endpoint oficial de ícone da API como fallback seguro
  const defaultIcon = "https://api.mcstatus.io/v2/icon/born-although.gl.joinmc.link";
  const icon = serverData?.icon || defaultIcon;

  return (
    <div 
      className="min-h-screen pt-28 pb-10 px-4 flex flex-col items-center font-sans relative overflow-hidden" 
      style={{ backgroundColor: '#1E1E1E' }}
    >
      {/* Importa a fonte pixelada do Google Fonts via CSS inline */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
          .minecraft-title {
            font-family: 'Press Start 2P', cursive;
            line-height: 1.5;
          }
        `}
      </style>

      {/* Subtle Background Decorations */}
      <div className="absolute top-20 left-10 text-6xl opacity-5 rotate-12 select-none pointer-events-none">⛏️</div>
      <div className="absolute bottom-20 right-10 text-6xl opacity-5 -rotate-12 select-none pointer-events-none">🧟</div>

      <div className="w-full max-w-xl z-10">
        
        {/* Page Title with Minecraft Font */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-extrabold flex items-center justify-center gap-3 minecraft-title tracking-wider">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#7BCA60] to-[#3C8527] drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
              IT SERVER
            </span>
            <span className="animate-bounce inline-block text-3xl">🧊</span>
          </h1>
          <p className="text-gray-400 mt-4 font-medium">Don't forget to bring torches!</p>
        </div>
        
        {/* --- SERVER CARD (Floating on hover) --- */}
        <div className="bg-[#313235] rounded-xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] mb-8 flex items-center border border-[#444548] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(60,133,39,0.15)] group">
          <img 
            src={icon} 
            alt="Server Icon" 
            className="w-16 h-16 md:w-20 md:h-20 rounded-lg object-cover bg-[#1E1E1E] group-hover:scale-105 transition-transform duration-300"
            style={{ imageRendering: 'pixelated' }}
            onError={(e) => { e.target.src = defaultIcon; }} // Fallback extra caso a imagem venha quebrada
          />

          <div className="ml-5 flex-1">
            <h2 className="text-white text-xl font-bold tracking-wide group-hover:text-[#7BCA60] transition-colors">Tenório's World</h2>
            
            <div className="flex items-center gap-3 mt-2">
              {loading ? (
                <span className="text-gray-400 text-sm italic animate-pulse">{loadingText}</span>
              ) : isOnline ? (
                <>
                  <div className="flex items-center gap-2 bg-[#1E1E1E] px-3 py-1 rounded-md text-sm text-gray-300 border border-[#444548]">
                    <div className="w-2 h-2 rounded-full bg-[#3C8527] animate-pulse"></div>
                    <span className="font-medium text-white">{playersOnline}</span> <span className="text-gray-500">/</span> {playersMax} Players
                  </div>
                  <SignalBars online={true} />
                </>
              ) : (
                <>
                  <span className="text-red-400 text-sm font-medium bg-red-400/10 px-3 py-1 rounded-md">Offline</span>
                  <SignalBars online={false} />
                </>
              )}
            </div>
          </div>
        </div>

        {/* --- TABS MENU --- */}
        <div className="bg-[#313235] rounded-xl shadow-lg border border-[#444548] overflow-hidden transition-all">
          <div className="flex bg-[#252628]">
            <button
              onClick={() => setActiveTab('java')}
              className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === 'java' 
                  ? 'bg-[#3C8527] text-white border-b-4 border-[#1D4A14]' 
                  : 'text-gray-400 hover:bg-[#2A2B2E] hover:text-white border-b-4 border-transparent'
              }`}
            >
              <span className={activeTab === 'java' ? 'animate-bounce' : ''}>☕</span> Java
            </button>
            <button
              onClick={() => setActiveTab('bedrock')}
              className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === 'bedrock' 
                  ? 'bg-[#3C8527] text-white border-b-4 border-[#1D4A14]' 
                  : 'text-gray-400 hover:bg-[#2A2B2E] hover:text-white border-b-4 border-transparent'
              }`}
            >
              <span className={activeTab === 'bedrock' ? 'animate-bounce' : ''}>📱</span> Bedrock
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6 bg-[#313235]">
            {activeTab === 'java' && (
              <div className="animate-fade-in">
                <ModernCopyButton emoji="🌍" label="Server IP" copyText="minecraft.itenorio.com" />
                <div className="mt-4 p-3 bg-[#252628] rounded-md border border-[#444548] text-xs text-gray-400 flex items-start gap-2">
                  <span className="text-lg leading-none">💡</span>
                  <p>PC players (Java Edition) don't need a port, the game finds it automatically!</p>
                </div>
              </div>
            )}

            {activeTab === 'bedrock' && (
              <div className="animate-fade-in">
                <ModernCopyButton emoji="🌍" label="Server Address" copyText="bedrock.itenorio.com" />
                <ModernCopyButton emoji="🚪" label="Port" copyText="40206" />
                <div className="mt-2 p-3 bg-[#252628] rounded-md border border-[#444548] text-xs text-gray-400 flex items-start gap-2">
                  <span className="text-lg leading-none">🎮</span>
                  <p>Add this under "External Servers" on your phone or console.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* --- REFRESH BUTTON (Força uma atualização visível) --- */}
        <div className="mt-8 flex justify-center">
          <button 
            onClick={() => fetchServer(false)}
            disabled={loading}
            className="group bg-[#3C8527] hover:bg-[#469B2D] active:bg-[#326F21] text-white font-bold py-3 px-8 rounded-full flex items-center justify-center gap-3 min-w-[220px] shadow-[0_4px_15px_rgba(60,133,39,0.3)] hover:shadow-[0_6px_20px_rgba(60,133,39,0.4)] transition-all duration-300 hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading blocks...
              </>
            ) : (
              <>
                <span className="group-hover:rotate-180 transition-transform duration-500">🔄</span> 
                Refresh Server
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}