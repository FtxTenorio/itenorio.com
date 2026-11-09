import { Link } from "react-router-dom";
import { COMPANY } from "../../data/company";

/** Shared layout of the legal pages (/legal/terms, /legal/refund-policy). */
export function LegalPage({ title, updated, summary, children }) {
  return (
    <article className="px-4 md:px-6 pt-10 pb-24 max-w-3xl mx-auto animate-fade-in">
      <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-white transition-colors">
          Home
        </Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <span className="text-gray-400">{title}</span>
      </nav>

      <header className="mb-8 border-b border-white/10 pb-6">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
        <p className="mt-2 text-sm text-gray-500">
          Last updated: {updated} · {COMPANY.legalName}
        </p>
      </header>

      {summary && (
        <div className="mb-10 rounded-xl border border-brand/30 bg-brand/10 p-5 text-gray-200 leading-relaxed">
          <p className="text-xs font-bold uppercase tracking-wider text-brand-soft mb-2">
            In short
          </p>
          {summary}
        </div>
      )}

      <div className="legal-prose space-y-8 text-gray-300 leading-relaxed">{children}</div>
    </article>
  );
}

export function LegalSection({ title, children }) {
  return (
    <section>
      <h2 className="text-xl font-bold text-white mb-3">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

export const CompanyIdentification = () => (
  <p>
    {COMPANY.legalName} (&quot;{COMPANY.brand}&quot;, &quot;we&quot;), a Brazilian
    company registered under CNPJ {COMPANY.cnpj}, with its registered address at{" "}
    {COMPANY.address.street}, {COMPANY.address.district}, {COMPANY.address.city},{" "}
    {COMPANY.address.postalCode}, {COMPANY.address.country}.
  </p>
);
