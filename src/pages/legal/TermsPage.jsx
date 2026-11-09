import { Link } from "react-router-dom";
import { CompanyIdentification, LegalPage, LegalSection } from "./LegalPage";

const linkClass = "text-white underline hover:text-brand-soft";

// /legal/terms — general terms for every product of iTenorio Tech (websites,
// browser extensions, tools, apps, services), present and future. Products can
// add their own terms on their page; those prevail for that product.
export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="November 2026"
      summary={
        <p>
          These terms cover everything iTenorio Tech publishes. Free products
          are offered as they are and may change or stop. Products that work
          with other services are independent from them. Support payments are
          optional. Paid products and services follow the terms shown when you
          buy them. Questions:{" "}
          <a href="mailto:contact@itenorio.com" className={linkClass}>
            contact@itenorio.com
          </a>
          .
        </p>
      }
    >
      <LegalSection title="1. Who we are and what these terms cover">
        <p>These terms are offered by</p>
        <CompanyIdentification />
        <p>
          They apply to the websites, browser extensions, tools (such as the
          link shortener at link.itenorio.com), apps and other software and
          services we publish now or in the future (the &quot;Products&quot;).
          By using a Product you agree to these terms. A Product may have
          additional terms or its own privacy policy on its page; for that
          Product, those specific terms prevail where they differ from these.
        </p>
      </LegalSection>

      <LegalSection title="2. Free products">
        <p>
          Many Products are free. You may use them for personal and commercial
          purposes within these terms. We may update, change, limit or
          discontinue any Product or feature at any time, including when a
          third-party service it depends on changes, and we do not guarantee
          that a free Product will be available without interruption or errors.
        </p>
      </LegalSection>

      <LegalSection title="3. Products that work with third-party services">
        <p>
          Some Products work on top of websites or services of other companies
          (for example, Crunchyroll Navigator works on Crunchyroll). Unless a
          Product page says otherwise, our Products are independent projects and
          are not affiliated with, endorsed or sponsored by those companies.
          Their names, logos and content belong to their respective owners and
          appear only to describe what our Products do.
        </p>
        <p>
          You remain bound by the terms of those services and are responsible
          for any account or subscription they require. We have no control over
          them and are not responsible for their content, availability or
          changes, which may stop a feature of our Product from working.
        </p>
      </LegalSection>

      <LegalSection title="4. Acceptable use">
        <p>
          Do not use the Products to break the law or the rights of others, to
          send spam, phishing or malicious links, to overload or attack our
          systems or the services our Products work with, or to copy, resell or
          reverse engineer paid Products beyond what the law allows. You are
          responsible for the content you create with the Products, such as the
          destination of a short link. We may remove content, disable links and
          suspend access that breaks these rules, without notice when needed to
          prevent harm.
        </p>
      </LegalSection>

      <LegalSection title="5. Intellectual property">
        <p>
          The Products, their code, design and the iTenorio Tech name and logo
          belong to iTenorio Tech. Using a Product does not transfer any of
          these rights to you. Where a Product&apos;s source code is published
          under an open-source license, that license governs the code.
        </p>
      </LegalSection>

      <LegalSection title="6. Payments">
        <p>
          <strong className="text-white">Voluntary support.</strong> You may
          support our free Products with a one-time or recurring payment of an
          amount you choose. Support payments are voluntary: they do not buy a
          product, license, priority support or access to any feature.
        </p>
        <p>
          <strong className="text-white">Paid products and services.</strong>{" "}
          Prices, what is included and any specific conditions are shown before
          you pay, or set in the proposal or contract for custom development
          work.
        </p>
        <p>
          Payments are processed by third parties, such as Stripe for cards and
          the Brazilian Pix system; we never receive or store your full card
          details. Amounts may be charged in a foreign currency, and your bank
          may apply exchange rates and fees. We issue invoices (nota fiscal) as
          required by Brazilian law. Refunds follow our{" "}
          <Link to="/legal/refund-policy" className={linkClass}>
            Refund Policy
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="7. Privacy">
        <p>
          How we handle personal data is described in our{" "}
          <Link to="/legal/privacy" className={linkClass}>
            Privacy Policy
          </Link>{" "}
          and, for each Product that has one, in its own privacy policy (for
          example, the{" "}
          <Link to="/extensions/crunchy-navigator/privacy-policy/" className={linkClass}>
            Crunchyroll Navigator Privacy Policy
          </Link>
          ).
        </p>
      </LegalSection>

      <LegalSection title="8. Warranty and liability">
        <p>
          The Products are provided &quot;as is&quot; and &quot;as
          available&quot;. To the maximum extent permitted by applicable law, we
          make no warranties beyond those the law requires, and we are not
          liable for indirect or consequential damages, lost profits, lost data
          or business interruption, nor for damages caused by third-party
          services, your devices or internet connection, or use of the Products
          against these terms.
        </p>
        <p>
          Where liability cannot be excluded, and except where the law does not
          allow a limit, our total liability is limited to the amount you paid
          us for the Product concerned in the 12 months before the event, or
          BRL 100 if you paid nothing.
        </p>
        <p>
          Nothing in these terms limits rights that consumers cannot waive under
          the law that applies to them, including the Brazilian Consumer Defense
          Code (Código de Defesa do Consumidor).
        </p>
      </LegalSection>

      <LegalSection title="9. Your responsibility">
        <p>
          To the extent permitted by law, you agree to compensate iTenorio Tech
          for losses and claims caused by your breach of these terms or your
          unlawful use of the Products.
        </p>
      </LegalSection>

      <LegalSection title="10. Changes to these terms">
        <p>
          We may update these terms, for example when we launch a new Product.
          The date at the top shows the current version, which applies from its
          publication. Material changes affecting a paid Product will be
          communicated before they take effect. If you don&apos;t agree with a
          change, stop using the Product concerned.
        </p>
      </LegalSection>

      <LegalSection title="11. Governing law and contact">
        <p>
          These terms are governed by the laws of Brazil. Consumers may bring
          claims in the courts of their own domicile; otherwise, the courts of
          São Paulo – SP, Brazil, have exclusive jurisdiction. If a provision is
          found invalid, the others remain in force. These terms are written in
          English; translations, if any, are for convenience.
        </p>
        <p>
          Contact:{" "}
          <a href="mailto:contact@itenorio.com" className={linkClass}>
            contact@itenorio.com
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
