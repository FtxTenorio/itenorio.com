import { useEffect, useRef } from 'react';

// ==========================================
// SHARED COMPONENT: NAVBAR
// ==========================================
export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[rgba(11,15,25,0.6)] backdrop-blur-sm border-b border-[rgba(255,255,255,0.1)] transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo / Home Link */}
        <div className="flex-shrink-0">
          <a href="/" className="text-white font-extrabold text-xl tracking-wider hover:text-gray-300 transition-colors">
            <span className="text-blue-500">I</span>Tenorio
          </a>
        </div>

        {/* Navigation Buttons */}
        <div className="hidden md:block">
          <div className="ml-10 flex items-baseline space-x-6">
            <a href="/stacks" className="text-gray-300 hover:text-white hover:bg-white/10 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300">Stacks</a>
            <a href="/games" className="text-gray-300 hover:text-white hover:bg-white/10 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300">Games</a>
            <a href="/music" className="text-gray-300 hover:text-white hover:bg-white/10 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300">Music</a>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button className="text-gray-300 hover:text-white focus:outline-none">
            <i className="fas fa-bars text-2xl"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};
