import { SOCIAL_LINKS } from "../data/config";

// Option 1: Static / Config-driven list (can be moved to ../data/config.js)
const DEFAULT_LINKS = [
  { id: "home", label: "Home", path: "/" },
  { id: "extensions", label: "Extensions", path: "/extensions" },
  { id: "shortener", label: "URL Shortener", path: "/shortener" },
];

export const Footer = ({ setCurrentPage, customLinks = DEFAULT_LINKS }) => {
  const currentYear = new Date().getFullYear();

  const handleNavigation = (link) => {
    // If the app uses state-based switching on the root path
    if (
      setCurrentPage &&
      window.location.pathname === "/" &&
      link.id === "home"
    ) {
      setCurrentPage("home");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Navigate to the target route if not already there
    if (window.location.pathname !== link.path) {
      window.location.href = link.path;
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#080b14] border-t border-[rgba(255,255,255,0.05)] pt-16 pb-8 z-30 relative mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Brand & Bio */}
          <div className="col-span-1 md:col-span-1">
            <button
              onClick={() => handleNavigation({ id: "home", path: "/" })}
              className="text-white font-extrabold text-xl tracking-wider hover:text-gray-300 transition-colors cursor-pointer bg-transparent border-none p-0 mb-4 block"
            >
              <span className="text-[#0078d7]">i</span>Tenorio
            </button>
            <p className="text-gray-400 text-sm leading-relaxed">
              Software Engineer & Backend Developer. Building scalable
              architectures and exploring the digital world.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-5 uppercase tracking-wider text-sm">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              {customLinks.map((link) => {
                const isActive =
                  typeof window !== "undefined" &&
                  window.location.pathname === link.path;

                return (
                  <li key={link.id}>
                    <button
                      onClick={() => handleNavigation(link)}
                      className={`transition-colors bg-transparent border-none p-0 cursor-pointer flex items-center gap-2 ${
                        isActive
                          ? "text-[#0078d7] font-medium"
                          : "hover:text-[#0078d7]"
                      }`}
                    >
                      {link.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-white font-bold mb-5 uppercase tracking-wider text-sm">
              Contact
            </h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <i className="fas fa-envelope text-[#0078d7] mt-1"></i>
                <a
                  href="mailto:paulo@itenorio.com"
                  className="hover:text-white transition-colors break-all"
                >
                  paulo@itenorio.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <i className="fas fa-map-marker-alt text-[#0078d7] mt-1 px-[2px]"></i>
                <span>
                  Remote, Global <br />
                  <span className="text-xs text-gray-500">
                    (Open to Remote / USA / Europe / UK)
                  </span>
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Networks */}
          <div>
            <h3 className="text-white font-bold mb-5 uppercase tracking-wider text-sm">
              Socials
            </h3>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 hover:text-white transition-colors ${link.hoverClass}`}
                >
                  <i className={`${link.icon} text-lg`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright and Legal Information */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div className="text-sm text-gray-500">
            <p>© {currentYear} iTenorio Tech. All rights reserved.</p>
            <p className="text-xs text-gray-600 mt-1">
              Registered as iTenorio Tech Desenvolvimento de Software LTDA in
              Brazil.
            </p>
          </div>
          <p className="text-xs text-gray-600 flex items-center gap-1">
            itenorio.com
          </p>
        </div>
      </div>
    </footer>
  );
};
