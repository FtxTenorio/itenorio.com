export default function NavBarRaw({
  navbarThemeClass,
  currentPage,
  navButtons,
  setCurrentPage,
  children,
}) {
  const handleLogoClick = () => {
    localStorage.setItem("currentPage", "home");
    if (window.location.pathname !== "/" && window.location.pathname !== "") {
      window.location.href = "/";
    } else if (setCurrentPage) {
      setCurrentPage("home");
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 backdrop-blur-sm border-b transition-all duration-500 ${navbarThemeClass || "bg-[rgba(11,15,25,0.6)] border-[rgba(255,255,255,0.1)]"}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex-shrink-0">
          <button
            onClick={handleLogoClick}
            className={`font-extrabold text-xl tracking-wider hover:scale-105 transition-transform cursor-pointer bg-transparent border-none p-0 ${
              currentPage === "home" &&
              (window.location.pathname === "/" ||
                window.location.pathname === "")
                ? "text-white"
                : "text-gray-400"
            }`}
          >
            <span className="text-[#0078d7] transition-colors">i</span>Tenorio
          </button>
        </div>
        {navButtons}
      </div>
      {children}
    </nav>
  );
}
