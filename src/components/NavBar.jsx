import { useState } from "react";
import NavBarRaw from "./NavBarRaw";

export const Navbar = ({ currentPage, setCurrentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobilePortfolioOpen, setIsMobilePortfolioOpen] = useState(false);

  const currentPath = window.location.pathname.replace(/\/$/, "");
  const isPortfolioActive =
    currentPath === "/extensions" || currentPath === "/shortener";
  const isRoot = currentPath === "";

  const handleNavClick = (page) => {
    localStorage.setItem("currentPage", page);
    if (!isRoot) {
      window.location.href = "/";
      return;
    }
    if (setCurrentPage) setCurrentPage(page);
    setIsOpen(false);
    setIsMobilePortfolioOpen(false);
  };

  const handlePortfolioClick = (path) => {
    window.location.href = path + "/";
  };

  const getLinkClass = (pageName) => {
    const isActive = isRoot && currentPage === pageName;
    return `px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer bg-transparent border-none flex items-center gap-1 ${
      isActive
        ? "text-white bg-white/20 shadow-[0_0_10px_rgba(255,255,255,0.1)]"
        : "text-gray-300 hover:text-white hover:bg-white/10 hover:-translate-y-0.5"
    }`;
  };

  const getMobileLinkClass = (pageName) => {
    const isActive = isRoot && currentPage === pageName;
    return `block px-3 py-2 rounded-md text-base font-medium text-left bg-transparent border-none w-full transition-all duration-300 ${
      isActive
        ? "text-white bg-white/20"
        : "text-gray-300 hover:text-white hover:bg-white/10"
    }`;
  };

  const NavButtons = (
    <>
      <div className="hidden md:flex items-center space-x-4 ml-10">
        <button
          onClick={() => handleNavClick("home")}
          className={getLinkClass("home")}
        >
          Home
        </button>

        <div className="relative group">
          <button
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer bg-transparent border-none flex items-center gap-1 ${isPortfolioActive ? "text-white bg-white/20 shadow-[0_0_10px_rgba(255,255,255,0.1)]" : "text-gray-300 hover:text-white hover:bg-white/10 hover:-translate-y-0.5"}`}
          >
            <span className="flex items-center gap-1">Portfolio</span>
            <svg
              className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div className="absolute left-0 mt-2 w-48 bg-[#1A1F2B] border border-gray-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left group-hover:translate-y-0 -translate-y-2 overflow-hidden">
            <div className="py-2">
              <button
                onClick={() => handlePortfolioClick("/extensions")}
                className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 transition-colors ${currentPath === "/extensions" ? "text-white bg-white/10 font-bold border-l-4 border-[#0078d7]" : "text-gray-300 hover:text-white hover:bg-white/5 border-l-4 border-transparent"}`}
              >
                <span>🧩</span> Extensions
              </button>
              <button
                onClick={() => handlePortfolioClick("/shortener")}
                className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 transition-colors ${currentPath === "/shortener" ? "text-white bg-white/10 font-bold border-l-4 border-[#0078d7]" : "text-gray-300 hover:text-white hover:bg-white/5 border-l-4 border-transparent"}`}
              >
                <span>🔗</span> Shortener
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-300 hover:text-white focus:outline-none bg-transparent border-none transition-transform active:scale-95"
        >
          {isOpen ? (
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>
    </>
  );

  return (
    <NavBarRaw
      navButtons={NavButtons}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    >
      {isOpen && (
        <div className="md:hidden bg-[rgba(11,15,25,0.95)] backdrop-blur-md border-b border-[rgba(255,255,255,0.1)] animate-fade-in max-h-screen overflow-y-auto">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 flex flex-col">
            <button
              onClick={() => handleNavClick("home")}
              className={getMobileLinkClass("home")}
            >
              Home
            </button>

            <div className="w-full pt-1 border-t border-[rgba(255,255,255,0.05)] mt-1">
              <button
                onClick={() => setIsMobilePortfolioOpen(!isMobilePortfolioOpen)}
                className={`flex justify-between items-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all ${isPortfolioActive ? "text-white bg-white/10" : ""}`}
              >
                <div className="flex items-center gap-2">Portfolio</div>
                <svg
                  className={`w-5 h-5 transition-transform duration-300 ${isMobilePortfolioOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isMobilePortfolioOpen && (
                <div className="pl-6 pr-3 py-2 space-y-1 border-l-2 border-white/20 ml-3 mt-1 animate-fade-in">
                  <button
                    onClick={() => handlePortfolioClick("/extensions")}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${currentPath === "/extensions" ? "text-white bg-white/10 border-l-4 border-[#0078d7]" : "text-gray-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent"}`}
                  >
                    <span>🧩</span> Extensions
                  </button>
                  <button
                    onClick={() => handlePortfolioClick("/shortener")}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${currentPath === "/shortener" ? "text-white bg-white/10 border-l-4 border-[#0078d7]" : "text-gray-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent"}`}
                  >
                    <span>🔗</span> Shortener
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </NavBarRaw>
  );
};
