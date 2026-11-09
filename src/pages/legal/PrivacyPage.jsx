import { Link } from "react-router-dom";
import { CompanyIdentification, LegalPage, LegalSection } from "./LegalPage";

const linkClass = "text-white underline hover:text-brand-soft";

const mail = (address) => (
  <a href={`mailto:${address}`} className={linkClass}>
    {address}
  </a>
);

// /legal/privacy — company-wide privacy policy (Brazilian LGPD), covering the
// website, contact, payments and the link shortener. Products with their own
// policy (e.g. Crunchyroll Navigator, whose policy URL is used by the Chrome
// Web Store) keep it on their page.
export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="November 2026"
      summary={
        <p>
          We collect as little as we can: no advertising or analytics cookies,
          and our browser extensions don&apos;t collect personal data. We only
          handle data when you email us, pay us or use the link shortener, and
          we never sell it. Questions or requests: {mail("contact@itenorio.com")}.
        </p>
      }
    >
      <LegalSection title="1. Who is responsible">
        <p>The controller of your personal data is</p>
        <CompanyIdentification />
        <p>
          This policy covers itenorio.com and our Products in general. A Product
          with its own privacy policy, such as the{" "}
          <Link to="/extensions/crunchy-navigator/privacy-policy/" className={linkClass}>
            Crunchyroll Navigator Privacy Policy
          </Link>
          , is also governed by it; where they differ, the Product&apos;s
          policy prevails for that Product.
        </p>
      </LegalSection>

      <LegalSection title="2. What we collect and why">
        <ul className="list-disc pl-6 space-y-3">
          <li>
            <strong className="text-white">Visiting the website.</strong> We
            don&apos;t use advertising or analytics cookies. Our hosting provider
            (Amazon Web Services) processes technical data such as your IP
            address and browser to deliver the pages and protect them against
            abuse.
          </li>
          <li>
            <strong className="text-white">Contacting us.</strong> When you
            email us we receive your name, email address and message, and use
            them to answer you.
          </li>
          <li>
            <strong className="text-white">Payments.</strong> When you support us
            or buy something, the payment provider (Stripe, or your bank for Pix)
            shares with us your name, email, country, the amount and the date.
            We use them to process the payment, issue the invoice (nota fiscal),
            handle refunds and keep the accounting records the law requires. We
            never receive your full card number.
          </li>
          <li>
            <strong className="text-white">Link shortener.</strong> We store the
            destination of each short link and when it was created. Each time a
            short link is opened we record the time, IP address, browser (user
            agent) and referring page, to count clicks, show statistics and
            prevent abuse.
          </li>
          <li>
            <strong className="text-white">Browser extensions and apps.</strong>{" "}
            Our extensions run on your device and do not collect personal data,
            unless their own privacy policy says otherwise.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Legal bases">
        <p>
          Under the Brazilian General Data Protection Law (LGPD, Law
          13.709/2018), we process data to perform a contract or take steps you
          ask for (answering you, processing payments), to comply with legal and
          tax obligations (invoices and accounting records), and for our
          legitimate interests (security, preventing abuse and improving the
          Products), always respecting your rights.
        </p>
      </LegalSection>

      <LegalSection title="4. Who we share it with">
        <p>
          We don&apos;t sell or rent personal data. We share it only with
          providers that process it on our behalf, such as Amazon Web Services
          (hosting and the link shortener), Google Workspace (email), Stripe and
          banks (payments), and our accounting and invoicing providers; and with
          authorities when required by law. Some of these providers may store
          data outside Brazil, under safeguards required by the LGPD.
        </p>
      </LegalSection>

      <LegalSection title="5. How long we keep it">
        <p>
          Emails are kept while needed to answer you and follow up. Payment and
          invoice records are kept for the period required by tax law
          (currently at least 5 years). Short-link data is kept while the link
          exists and deleted when it expires or is removed. Data may be kept
          longer when needed to exercise rights in legal proceedings.
        </p>
      </LegalSection>

      <LegalSection title="6. Security">
        <p>
          We use encrypted connections (HTTPS), access controls and reputable
          providers to protect your data. No system is completely secure; if an
          incident creates a relevant risk to you, we will notify you and the
          authorities as the LGPD requires.
        </p>
      </LegalSection>

      <LegalSection title="7. Your rights">
        <p>
          You can ask us to confirm whether we process your data, access,
          correct, anonymize or delete it, receive a copy, learn who we share it
          with, and withdraw consent where processing is based on it (LGPD,
          Article 18). Some data, such as invoices, must be kept by law even if
          you ask for deletion. Send requests to {mail("contact@itenorio.com")};
          we may ask you to confirm your identity. You can also contact the
          Brazilian data protection authority (ANPD).
        </p>
      </LegalSection>

      <LegalSection title="8. Children">
        <p>
          The Products are not directed to children, and we don&apos;t knowingly
          collect children&apos;s personal data.
        </p>
      </LegalSection>

      <LegalSection title="9. Changes and contact">
        <p>
          We may update this policy, for example when we launch a new Product.
          The date at the top shows the current version. For any privacy
          question or request, including as our data protection contact
          (encarregado), write to {mail("contact@itenorio.com")}.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
