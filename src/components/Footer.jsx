// ==========================================
// SHARED COMPONENT: FOOTER
// ==========================================
export const Footer = ({ setCurrentPage }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#080b14] border-t border-[rgba(255,255,255,0.05)] pt-16 pb-8 z-30 relative mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Grid de Conteúdo do Rodapé */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Coluna 1: Marca e Bio */}
          <div className="col-span-1 md:col-span-1">
            <button 
              onClick={() => setCurrentPage && setCurrentPage('home')}
              className="text-white font-extrabold text-xl tracking-wider hover:text-gray-300 transition-colors cursor-pointer bg-transparent border-none p-0 mb-4 block"
            >
              <span className="text-[#0078d7]">I</span>Tenorio
            </button>
            <p className="text-gray-400 text-sm leading-relaxed">
              Software Engineer & Backend Developer. Building scalable architectures and exploring the digital world.
            </p>
          </div>

          {/* Coluna 2: Links Rápidos */}
          <div>
            <h3 className="text-white font-bold mb-5 uppercase tracking-wider text-sm">Quick Links</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <button onClick={() => setCurrentPage && setCurrentPage('home')} className="hover:text-[#0078d7] transition-colors bg-transparent border-none p-0 cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage && setCurrentPage('stacks')} className="hover:text-[#0078d7] transition-colors bg-transparent border-none p-0 cursor-pointer">
                  Stacks & Arsenal
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage && setCurrentPage('games')} className="hover:text-[#0078d7] transition-colors bg-transparent border-none p-0 cursor-pointer">
                  Games
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage && setCurrentPage('music')} className="hover:text-[#0078d7] transition-colors bg-transparent border-none p-0 cursor-pointer">
                  Music
                </button>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Contato */}
          <div>
            <h3 className="text-white font-bold mb-5 uppercase tracking-wider text-sm">Contact</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <i className="fas fa-envelope text-[#0078d7] mt-1"></i>
                <a href="mailto:tenorio.development@gmail.com" className="hover:text-white transition-colors break-all">
                  tenorio.development@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <i className="fas fa-map-marker-alt text-[#0078d7] mt-1 px-[2px]"></i>
                <span>Granada, Spain <br/><span className="text-xs text-gray-500">(Open to Remote / Europe / UK)</span></span>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Redes Sociais */}
          <div>
            <h3 className="text-white font-bold mb-5 uppercase tracking-wider text-sm">Socials</h3>
            <div className="flex gap-4">
              <a href="https://github.com/FtxTenorio" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all duration-300 group">
                <i className="fab fa-github text-lg text-gray-400 group-hover:text-white"></i>
              </a>
              <a href="https://www.linkedin.com/in/ftxtenorio/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-[#0077b5]/20 hover:border-[#0077b5] transition-all duration-300 group">
                <i className="fab fa-linkedin text-lg text-gray-400 group-hover:text-[#0077b5]"></i>
              </a>
              <a href="https://www.instagram.com/ftxtenorio/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-[#e1306c]/20 hover:border-[#e1306c] transition-all duration-300 group">
                <i className="fab fa-instagram text-lg text-gray-400 group-hover:text-[#e1306c]"></i>
              </a>
              <a href="https://www.twitch.tv/ftxtenorio" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-[#9146FF]/20 hover:border-[#9146FF] transition-all duration-300 group">
                <i className="fab fa-twitch text-lg text-gray-400 group-hover:text-[#9146FF]"></i>
              </a>
            </div>
          </div>

        </div>

        {/* Linha de Direitos Autorais */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-sm text-gray-500">
            © {currentYear} Paulo Sérgio Rodrigues de Faria Tenório. All rights reserved.
          </p>
          <p className="text-xs text-gray-600 flex items-center gap-1">
            Built with React & Tailwind
          </p>
        </div>

      </div>
    </footer>
  );
};