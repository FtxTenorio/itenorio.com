import { Section } from "../../../components/ui/Section";
import { COMPANY, CONTACT_EMAILS } from "../../../data/company";

export const ContactSection = () => {
  const { address } = COMPANY;

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's talk."
      intro="Questions about our products, a project in mind or support with an extension — email us and a real person will reply."
      className="border-t border-line"
    >
      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-6">
        <ul className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
          {CONTACT_EMAILS.map((item) => (
            <li key={item.id}>
              <a
                href={`mailto:${item.email}`}
                className="group flex items-center gap-4 rounded-xl border border-line bg-surface/60 p-5 hover:border-brand/50 transition-colors"
              >
                <span className="w-10 h-10 shrink-0 rounded-lg bg-white/5 text-gray-300 group-hover:text-brand-soft flex items-center justify-center">
                  <i className={item.icon} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-gray-500">{item.label}</span>
                  <span className="block font-semibold text-white break-all">
                    {item.email}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="rounded-xl border border-line bg-surface/60 p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-5">
            Company details
          </h3>
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="text-gray-500">Legal name</dt>
              <dd className="text-white font-medium">{COMPANY.legalName}</dd>
            </div>
            <div>
              <dt className="text-gray-500">CNPJ (Brazilian company registry)</dt>
              <dd className="text-white font-medium">{COMPANY.cnpj}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Registered address</dt>
              <dd className="text-gray-200">
                <address className="not-italic">
                  {address.street}
                  <br />
                  {address.district}, {address.city}, {address.postalCode}
                  <br />
                  {address.country}
                </address>
              </dd>
            </div>
            <div>
              <dt className="text-gray-500">Managing partner</dt>
              <dd className="text-gray-200">{COMPANY.founder.name}</dd>
            </div>
          </dl>
        </div>
      </div>
    </Section>
  );
};
