export default function NavBarRaw({ navbarThemeClass, currentPage , navButtons, isMinecraft, setCurrentPage, children}) {
  return <nav className={`fixed top-0 w-full z-50 backdrop-blur-sm border-b transition-all duration-500 ${navbarThemeClass}`}>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

      {/* Logo / Home Link */}
      <div className="flex-shrink-0">
        <button
          onClick={() => setCurrentPage('home')}
          className={`font-extrabold text-xl tracking-wider hover:scale-105 transition-transform cursor-pointer bg-transparent border-none p-0 ${currentPage === 'home' ? 'text-white' : 'text-gray-400'
            }`}
        >
          <span className={isMinecraft ? "text-[#3C8527] transition-colors" : "text-[#0078d7] transition-colors"}>i</span>Tenorio
        </button>
      </div>
      {navButtons}
    </div>
    {children}
  </nav>
}