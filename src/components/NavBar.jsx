import { useState } from 'react';

// ==========================================
// SHARED COMPONENT: NAVBAR
// ==========================================
export const Navbar = ({ currentPage, setCurrentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileServersOpen, setIsMobileServersOpen] = useState(false);
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);

  const handleNavClick = (page) => {
    setCurrentPage(page);
    setIsOpen(false);
    setIsMobileServersOpen(false);
    setIsMobileAboutOpen(false); // Reseta o dropdown mobile do About
  };

  // Classes for Desktop buttons
  const getLinkClass = (pageName) => {
    // Para o botão About Me ficar ativo se Games ou Music estiverem ativos
    const isAboutActive = ['games', 'music'].includes(currentPage) && pageName === 'about';
    const isActive = currentPage === pageName || isAboutActive;
    
    return `px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer bg-transparent border-none flex items-center gap-1 ${
      isActive
        ? 'text-white bg-white/20 shadow-[0_0_10px_rgba(255,255,255,0.1)]'
        : 'text-gray-300 hover:text-white hover:bg-white/10 hover:-translate-y-0.5'
    }`;
  };

  // Classes for Mobile buttons
  const getMobileLinkClass = (pageName) => {
    const isActive = currentPage === pageName;
    return `block px-3 py-2 rounded-md text-base font-medium text-left bg-transparent border-none w-full transition-all duration-300 ${
      isActive
        ? 'text-white bg-white/20'
        : 'text-gray-300 hover:text-white hover:bg-white/10'
    }`;
  };

  const isMinecraft = currentPage === 'minecraft';
  
  // Dynamic theme for the entire Navbar when on Minecraft page
  const navbarThemeClass = isMinecraft
    ? 'bg-[rgba(20,35,20,0.85)] border-[#3C8527]/50 shadow-[0_4px_20px_rgba(60,133,39,0.2)]'
    : 'bg-[rgba(11,15,25,0.6)] border-[rgba(255,255,255,0.1)]';

  return (
    <nav className={`fixed top-0 w-full z-50 backdrop-blur-sm border-b transition-all duration-500 ${navbarThemeClass}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

        {/* Logo / Home Link */}
        <div className="flex-shrink-0">
          <button
            onClick={() => handleNavClick('home')}
            className={`font-extrabold text-xl tracking-wider hover:scale-105 transition-transform cursor-pointer bg-transparent border-none p-0 ${
              currentPage === 'home' ? 'text-white' : 'text-gray-400'
            }`}
          >
            <span className={isMinecraft ? "text-[#3C8527] transition-colors" : "text-[#0078d7] transition-colors"}>i</span>Tenorio
          </button>
        </div>

        {/* Navigation Buttons (Desktop) */}
        <div className="hidden md:flex items-center space-x-4 ml-10">
          <button onClick={() => handleNavClick('home')} className={getLinkClass('home')}>Home</button>
          
          {/* About Me Dropdown (Desktop) */}
          <div className="relative group">
            <button className={getLinkClass('about')}>
              <span className="flex items-center gap-1">
                About Me
              </span>
              <svg className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Dropdown Menu About */}
            <div className="absolute left-0 mt-2 w-48 bg-[#1A1F2B] border border-gray-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left group-hover:translate-y-0 -translate-y-2 overflow-hidden">
              <div className="py-2">
                <button
                  onClick={() => handleNavClick('games')}
                  className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 transition-colors ${
                    currentPage === 'games'
                      ? 'text-white bg-white/10 font-bold border-l-4 border-[#0078d7]' 
                      : 'text-gray-300 hover:text-white hover:bg-white/5 border-l-4 border-transparent'
                  }`}
                >
                  <span>🎮</span> Games
                </button>
                <button
                  onClick={() => handleNavClick('music')}
                  className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 transition-colors ${
                    currentPage === 'music'
                      ? 'text-white bg-white/10 font-bold border-l-4 border-[#0078d7]' 
                      : 'text-gray-300 hover:text-white hover:bg-white/5 border-l-4 border-transparent'
                  }`}
                >
                  <span>🎵</span> Music
                </button>
              </div>
            </div>
          </div>
          
          {/* Servers Dropdown (Desktop) */}
          <div className="relative group">
            <button className={getLinkClass(isMinecraft ? 'minecraft' : 'servers')}>
              {isMinecraft ? (
                <span className="flex items-center gap-1">
                  Servers <span className="text-xs text-[#6AE24B] font-bold ml-1">• Minecraft</span>
                </span>
              ) : (
                'Servers'
              )}
              <svg className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <div className="absolute right-0 mt-2 w-48 bg-[#1A1F2B] border border-gray-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right group-hover:translate-y-0 -translate-y-2 overflow-hidden">
              <div className="py-2">
                <button
                  onClick={() => handleNavClick('minecraft')}
                  className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between transition-colors ${
                    isMinecraft 
                      ? 'text-white bg-[#3C8527]/90 font-bold border-l-4 border-[#6AE24B]' 
                      : 'text-gray-300 hover:text-white hover:bg-[#3C8527]/50 border-l-4 border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>⛏️</span> Minecraft
                  </div>
                  {isMinecraft && (
                     <svg className="w-4 h-4 text-[#6AE24B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                     </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-300 hover:text-white focus:outline-none bg-transparent border-none transition-transform active:scale-95"
          >
            {isOpen ? (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[rgba(11,15,25,0.95)] backdrop-blur-md border-b border-[rgba(255,255,255,0.1)] animate-fade-in">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 flex flex-col">
            <button onClick={() => handleNavClick('home')} className={getMobileLinkClass('home')}>Home</button>
            
            {/* About Me Dropdown (Mobile) */}
            <div className="w-full pt-1">
              <button 
                onClick={() => setIsMobileAboutOpen(!isMobileAboutOpen)}
                className={`flex justify-between items-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all ${['games', 'music'].includes(currentPage) ? 'text-white bg-white/10' : ''}`}
              >
                <div className="flex items-center gap-2">
                  About Me 
                </div>
                <svg className={`w-5 h-5 transition-transform duration-300 ${isMobileAboutOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isMobileAboutOpen && (
                <div className="pl-6 pr-3 py-2 space-y-1 border-l-2 border-white/20 ml-3 mt-1 animate-fade-in">
                  <button
                    onClick={() => handleNavClick('games')}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                      currentPage === 'games'
                        ? 'text-white bg-white/10 border-l-4 border-[#0078d7]'
                        : 'text-gray-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent'
                    }`}
                  >
                    <span>🎮</span> Games
                  </button>
                  <button
                    onClick={() => handleNavClick('music')}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                      currentPage === 'music'
                        ? 'text-white bg-white/10 border-l-4 border-[#0078d7]'
                        : 'text-gray-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent'
                    }`}
                  >
                    <span>🎵</span> Music
                  </button>
                </div>
              )}
            </div>
            
            {/* Servers Dropdown (Mobile) */}
            <div className="w-full pt-1 border-t border-[rgba(255,255,255,0.05)] mt-1">
              <button 
                onClick={() => setIsMobileServersOpen(!isMobileServersOpen)}
                className={`flex justify-between items-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all ${isMinecraft ? 'text-white bg-white/10' : ''}`}
              >
                <div className="flex items-center gap-2">
                  Servers 
                  {isMinecraft && <span className="text-xs text-[#6AE24B] mt-1 font-bold">• Minecraft</span>}
                </div>
                <svg className={`w-5 h-5 transition-transform duration-300 ${isMobileServersOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isMobileServersOpen && (
                <div className="pl-6 pr-3 py-2 space-y-1 border-l-2 border-[#3C8527]/50 ml-3 mt-1 animate-fade-in">
                  <button
                    onClick={() => handleNavClick('minecraft')}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all flex items-center justify-between ${
                      isMinecraft
                        ? 'text-white bg-[#3C8527] border-l-4 border-[#6AE24B]'
                        : 'text-gray-400 hover:text-white hover:bg-white/10 border-l-4 border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>⛏️</span> Minecraft
                    </div>
                    {isMinecraft && (
                      <svg className="w-4 h-4 text-[#6AE24B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}