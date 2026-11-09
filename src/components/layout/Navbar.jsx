import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { NAV_LINKS } from "../../data/navigation";
import { Logo } from "./Logo";

const desktopLinkClass = ({ isActive }) =>
  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
    isActive ? "text-white bg-white/10" : "text-gray-300 hover:text-white hover:bg-white/5"
  }`;

const mobileLinkClass = ({ isActive }) =>
  `flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium transition-colors ${
    isActive ? "text-white bg-white/10" : "text-gray-300 hover:text-white hover:bg-white/5"
  }`;

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname, hash } = useLocation();

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setIsOpen(false);
  }, [pathname, hash]);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-ink/80 backdrop-blur-md border-b border-line">
      <nav
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between gap-4"
        aria-label="Main"
      >
        <Logo />

        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={desktopLinkClass}>
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/#contact"
            className="ml-3 px-4 py-2 rounded-md text-sm font-semibold bg-brand hover:bg-[#0a86ee] text-white transition-colors"
          >
            Contact
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="md:hidden -mr-2 p-2 text-gray-300 hover:text-white"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <i className={`fas ${isOpen ? "fa-xmark" : "fa-bars"} text-xl w-6`} aria-hidden="true" />
        </button>
      </nav>

      {isOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-line bg-ink/95 backdrop-blur-md animate-fade-in"
        >
          <div className="px-4 py-3 space-y-1">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} className={mobileLinkClass}>
                <i className={`${link.icon} w-5 text-center text-gray-500`} aria-hidden="true" />
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/#contact"
              className="mt-2 flex items-center justify-center gap-2 px-3 py-3 rounded-md font-semibold bg-brand text-white"
            >
              <i className="fas fa-envelope" aria-hidden="true" />
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
