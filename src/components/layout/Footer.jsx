import { Link } from "react-router-dom";
import { SOCIAL_LINKS } from "../../data/config";
import { NAV_LINKS } from "../../data/navigation";
import { Logo } from "./Logo";

const FOOTER_LINKS = [{ to: "/", label: "Home" }, ...NAV_LINKS];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ink-deep border-t border-line pt-16 pb-8 relative z-30 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div>
            <Logo className="mb-4" />
            <p className="text-gray-400 text-sm leading-relaxed">
              Software Engineer & Backend Developer. Building scalable
              architectures and exploring the digital world.
            </p>
          </div>

          <div>
            <h2 className="text-white font-bold mb-5 uppercase tracking-wider text-sm">
              Quick Links
            </h2>
            <ul className="space-y-3 text-sm text-gray-400">
              {FOOTER_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-white font-bold mb-5 uppercase tracking-wider text-sm">
              Contact
            </h2>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <i className="fas fa-envelope text-brand mt-1" aria-hidden="true" />
                <a
                  href="mailto:paulo@itenorio.com"
                  className="hover:text-white transition-colors break-all"
                >
                  paulo@itenorio.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <i className="fas fa-map-marker-alt text-brand mt-1 px-[2px]" aria-hidden="true" />
                <span>
                  Remote, Global <br />
                  <span className="text-xs text-gray-500">
                    (Open to Remote / USA / Europe / UK)
                  </span>
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-white font-bold mb-5 uppercase tracking-wider text-sm">
              Socials
            </h2>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <i className={`${link.icon} text-lg`} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div className="text-sm text-gray-500">
            <p>© {currentYear} iTenorio Tech. All rights reserved.</p>
            <p className="text-xs text-gray-600 mt-1">
              Registered as iTenorio Tech Desenvolvimento de Software LTDA in
              Brazil.
            </p>
          </div>
          <p className="text-xs text-gray-600">itenorio.com</p>
        </div>
      </div>
    </footer>
  );
};
