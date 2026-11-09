import { Link } from "react-router-dom";
import { CompanyIdentification, LegalPage, LegalSection } from "./LegalPage";

const linkClass = "text-white underline hover:text-brand-soft";

// /legal/terms — terms for the website, the free extensions and voluntary
// support payments. Linked from the footer and the product pages.
export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="November 2026"
      summary={
        <p>
          Our website and extensions are free to use, provided as they are.
          Support payments are optional and refundable within 30 days. Each
          extension is an independent project and is not affiliated with the
          services it works with. Questions:{" "}
          <a href="mailto:contact@itenorio.com" className={linkClass}>
            contact@itenorio.com
          </a>
          .
        </p>
      }
    >
      <LegalSection title="1. Who we are">
        <p>These terms are offered by</p>
        <CompanyIdentification />
        <p>
          They apply to the website itenorio.com, to the browser extensions we
          publish (such as Crunchyroll Navigator) and to voluntary support
          payments made to us. By using any of them you agree to these terms.
        </p>
      </LegalSection>

      <LegalSection title="2. Free software">
        <p>
          Our browser extensions are free. You may install, use and uninstall
          them at any time. We may update, change or discontinue an extension or
          any of its features, for example when the website it works with
          changes.
        </p>
        <p>
          The extensions run in your browser and work on top of third-party
          websites. You remain bound by the terms of those websites and are
          responsible for having any account or subscription they require.
        </p>
      </LegalSection>

      <LegalSection title="3. Independence from third parties">
        <p>
          Crunchyroll Navigator is an independent project of iTenorio Tech. It
          is not affiliated with, endorsed or sponsored by Crunchyroll.
          Crunchyroll and other names, logos and artwork shown by the
          extensions or in their screenshots belong to their respective owners
          and are used only to describe what the extensions do.
        </p>
      </LegalSection>

      <LegalSection title="4. Voluntary support payments">
        <p>
          You may choose to support our work with a payment of an amount you
          pick, one-time or recurring. Support payments are voluntary: they do
          not buy a product, license, priority support or access to any feature.
          Card payments are processed by Stripe and Pix payments by the Brazilian
          instant payment system; we never see or store your full card details.
        </p>
        <p>
          Refunds are described in our{" "}
          <Link to="/legal/refund-policy" className={linkClass}>
            Refund Policy
          </Link>
          . Payments are issued an invoice (nota fiscal) by iTenorio Tech as
          required by Brazilian law.
        </p>
      </LegalSection>

      <LegalSection title="5. Privacy">
        <p>
          Our extensions do not collect or sell personal data. Details for each
          extension are in its privacy policy, for example the{" "}
          <Link to="/extensions/crunchy-navigator/privacy-policy/" className={linkClass}>
            Crunchyroll Navigator Privacy Policy
          </Link>
          . When you pay or email us, we use your name, email and payment
          details only to process the payment, issue the invoice and answer you.
        </p>
      </LegalSection>

      <LegalSection title="6. Acceptable use">
        <p>
          Do not use our website, link shortener or extensions to break the law,
          to send spam or malicious links, or to disrupt the services they work
          with. We may remove short links or block abusive use.
        </p>
      </LegalSection>

      <LegalSection title="7. No warranty and limitation of liability">
        <p>
          The website and the free extensions are provided &quot;as is&quot;,
          without warranties of any kind. To the extent permitted by law, we are
          not liable for indirect damages, lost profits or data loss arising
          from their use. Nothing in these terms limits rights that cannot be
          limited under the consumer protection law that applies to you.
        </p>
      </LegalSection>

      <LegalSection title="8. Changes">
        <p>
          We may update these terms. The date at the top shows the latest
          version; material changes will be announced on this page.
        </p>
      </LegalSection>

      <LegalSection title="9. Governing law and contact">
        <p>
          These terms are governed by the laws of Brazil. Consumers may bring
          claims in the courts of their own domicile; otherwise the courts of
          São Paulo – SP, Brazil, have jurisdiction.
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
