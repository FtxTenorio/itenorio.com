import { useEffect, useRef } from 'react';

// ==========================================
// SHARED COMPONENT: NAVBAR
// ==========================================
export const Navbar = ({ setCurrentPage }) => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[rgba(11,15,25,0.6)] backdrop-blur-sm border-b border-[rgba(255,255,255,0.1)] transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo / Home Link */}
        <div className="flex-shrink-0">
          <button 
            onClick={() => setCurrentPage('home')}
            className="text-white font-extrabold text-xl tracking-wider hover:text-gray-300 transition-colors cursor-pointer bg-transparent border-none p-0"
          >
            <span className="text-blue-500">I</span>Tenorio
          </button>
        </div>

        {/* Navigation Buttons */}
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
          <button className="text-gray-300 hover:text-white focus:outline-none bg-transparent border-none">
            <i className="fas fa-bars text-2xl"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};