import { useState, useEffect, useRef } from 'react';

// ==========================================
// SHARED COMPONENT: NAVBAR
// ==========================================
export const Navbar = ({ setCurrentPage }) => {
  // Estado para controlar se o menu mobile está aberto
  const [isOpen, setIsOpen] = useState(false);

  // Função auxiliar para mudar a página e fechar o menu no celular automaticamente
  const handleNavClick = (page) => {
    setCurrentPage(page);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[rgba(11,15,25,0.6)] backdrop-blur-sm border-b border-[rgba(255,255,255,0.1)] transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo / Home Link */}
        <div className="flex-shrink-0">
          <button 
            onClick={() => handleNavClick('home')}
            className="text-white font-extrabold text-xl tracking-wider hover:text-gray-300 transition-colors cursor-pointer bg-transparent border-none p-0"
          >
            <span className="text-blue-500">I</span>Tenorio
          </button>
        </div>

        {/* Navigation Buttons (Desktop) */}
        <div className="hidden md:block">
          <div className="ml-10 flex items-baseline space-x-6">
            <button 
              onClick={() => setCurrentPage('stacks')} 
              className="text-gray-300 hover:text-white hover:bg-white/10 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer bg-transparent border-none"
            >
              Stacks
            </button>
            <button 
              onClick={() => setCurrentPage('games')} 
              className="text-gray-300 hover:text-white hover:bg-white/10 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer bg-transparent border-none"
            >
              Games
            </button>
            <button 
              onClick={() => setCurrentPage('music')} 
              className="text-gray-300 hover:text-white hover:bg-white/10 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer bg-transparent border-none"
            >
              Music
            </button>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-300 hover:text-white focus:outline-none bg-transparent border-none"
          >
            {/* Muda o ícone de hambúrguer para 'X' quando aberto (se estiver usando FontAwesome) */}
            <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
          </button>
        </div>
      </div>

      {/* Menu Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[rgba(11,15,25,0.95)] backdrop-blur-md border-b border-[rgba(255,255,255,0.1)]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
            <button 
              onClick={() => handleNavClick('stacks')} 
              className="text-gray-300 hover:text-white hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium text-left bg-transparent border-none"
            >
              Stacks
            </button>
            <button 
              onClick={() => handleNavClick('games')} 
              className="text-gray-300 hover:text-white hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium text-left bg-transparent border-none"
            >
              Games
            </button>
            <button 
              onClick={() => handleNavClick('music')} 
              className="text-gray-300 hover:text-white hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium text-left bg-transparent border-none"
            >
              Music
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};