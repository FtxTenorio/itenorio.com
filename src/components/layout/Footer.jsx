import { Link } from "react-router-dom";
import { COMPANY, CONTACT_EMAILS } from "../../data/company";
import { SOCIAL_LINKS } from "../../data/config";
import { NAV_LINKS } from "../../data/navigation";
import { Logo } from "./Logo";

const FOOTER_LINKS = [{ to: "/", label: "Home" }, ...NAV_LINKS];

const ColumnTitle = ({ children }) => (
  <h2 className="text-white font-semibold mb-4 uppercase tracking-wider text-xs">
    {children}
  </h2>
);

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { address } = COMPANY;

  return (
    <footer className="bg-ink-deep border-t border-line pt-14 pb-8 relative z-30 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1.2fr_1.3fr] gap-10 mb-12">
          <div>
            <Logo className="mb-4" />
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              A small software studio from São Paulo, Brazil. We build browser
              extensions, websites and backend systems — remote-first, working
              with people worldwide.
            </p>
            <div className="flex gap-2">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="w-9 h-9 inline-flex items-center justify-center rounded-md border border-line text-gray-400 hover:text-white hover:border-white/20 transition-colors"
                >
                  <i className={link.icon} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <ColumnTitle>Site</ColumnTitle>
            <ul className="space-y-2.5 text-sm text-gray-400">
              {FOOTER_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/extensions/crunchy-navigator/privacy-policy/"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <ColumnTitle>Contact</ColumnTitle>
            <ul className="space-y-3 text-sm">
              {CONTACT_EMAILS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`mailto:${item.email}`}
                    className="text-gray-300 hover:text-white transition-colors break-all"
                  >
                    {item.email}
                  </a>
                  <p className="text-xs text-gray-500">{item.label}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ColumnTitle>Company</ColumnTitle>
            <address className="not-italic text-sm text-gray-400 leading-relaxed space-y-3">
              <p className="text-gray-300">{COMPANY.legalName}</p>
              <p>
                <span className="text-gray-500">CNPJ</span> {COMPANY.cnpj}
              </p>
              <p>
                {address.street}
                <br />
                {address.district}, {address.city}
                <br />
                {address.postalCode}, {address.country}
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-gray-500">
          <p>© {currentYear} iTenorio Tech. All rights reserved.</p>
          <p>
            Registered as iTenorio Tech Desenvolvimento de Software LTDA in
            Brazil · CNPJ {COMPANY.cnpj}
          </p>
        </div>
      </div>
    </footer>
  );
};
