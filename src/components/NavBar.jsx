import { useState } from 'react';

// ==========================================
// SHARED COMPONENT: NAVBAR
// ==========================================
export const Navbar = ({ currentPage, setCurrentPage }) => {
  // Estado para controlar se o menu mobile está aberto
  const [isOpen, setIsOpen] = useState(false);

  // Função auxiliar para mudar a página e fechar o menu no celular automaticamente
  const handleNavClick = (page) => {
    setCurrentPage(page);
    setIsOpen(false);
  };

  // Define as classes dinâmicas para os botões do Desktop
  const getLinkClass = (pageName) => {
    const isActive = currentPage === pageName;
    return `px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer bg-transparent border-none ${isActive
      ? 'text-white bg-white/20 shadow-[0_0_10px_rgba(255,255,255,0.1)]' // Destaque para o ativo
      : 'text-gray-300 hover:text-white hover:bg-white/10'               // Estado normal
      }`;
  };

  // Define as classes dinâmicas para os botões Mobile
  const getMobileLinkClass = (pageName) => {
    const isActive = currentPage === pageName;
    return `block px-3 py-2 rounded-md text-base font-medium text-left bg-transparent border-none w-full transition-all duration-300 ${isActive
      ? 'text-white bg-white/20'
      : 'text-gray-300 hover:text-white hover:bg-white/10'
      }`;
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[rgba(11,15,25,0.6)] backdrop-blur-sm border-b border-[rgba(255,255,255,0.1)] transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

        {/* Logo / Home Link */}
        <div className="flex-shrink-0">
          <button
            onClick={() => handleNavClick('home')}
            className={`font-extrabold text-xl tracking-wider hover:text-gray-300 transition-colors cursor-pointer bg-transparent border-none p-0 ${currentPage === 'home' ? 'text-white' : 'text-gray-400'}`}
          >
            <span className="text-blue-500">I</span>Tenorio
          </button>
        </div>

        {/* Navigation Buttons (Desktop) */}
        <div className="hidden md:block">
          <div className="ml-10 flex items-baseline space-x-6">
            <button
              onClick={() => handleNavClick('home')}
              className={getLinkClass('home')}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('stacks')}
              className={getLinkClass('stacks')}
            >
              Stacks
            </button>
            <button
              onClick={() => handleNavClick('games')}
              className={getLinkClass('games')}
            >
              Games
            </button>
            <button
              onClick={() => handleNavClick('music')}
              className={getLinkClass('music')}
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
            <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
          </button>
        </div>
      </div>

      {/* Menu Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[rgba(11,15,25,0.95)] backdrop-blur-md border-b border-[rgba(255,255,255,0.1)]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
            <button
              onClick={() => handleNavClick('home')}
              className={getMobileLinkClass('home')}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('stacks')}
              className={getMobileLinkClass('stacks')}
            >
              Stacks
            </button>
            <button
              onClick={() => handleNavClick('games')}
              className={getMobileLinkClass('games')}
            >
              Games
            </button>
            <button
              onClick={() => handleNavClick('music')}
              className={getMobileLinkClass('music')}
            >
              Music
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};