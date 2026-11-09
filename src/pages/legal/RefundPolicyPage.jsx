import { Link } from "react-router-dom";
import { CompanyIdentification, LegalPage, LegalSection } from "./LegalPage";

const mail = (address) => (
  <a href={`mailto:${address}`} className="text-white underline hover:text-brand-soft">
    {address}
  </a>
);

// /legal/refund-policy — refunds of voluntary support payments and of paid
// services. Linked from the footer and the product pages.
export default function RefundPolicyPage() {
  return (
    <LegalPage
      title="Refund Policy"
      updated="November 2026"
      summary={
        <p>
          Our products are free. Support payments are voluntary and unlock
          nothing, so if you paid by mistake, paid twice or changed your mind,
          write to {mail("contact@itenorio.com")} within 30 days and we will
          refund you in full.
        </p>
      }
    >
      <LegalSection title="Who we are">
        <p>This policy is published by</p>
        <CompanyIdentification />
      </LegalSection>

      <LegalSection title="Voluntary support payments">
        <p>
          Crunchyroll Navigator and our other browser extensions are free.
          Anyone may choose to support their development with a one-time or
          recurring payment of an amount they pick. These payments are
          voluntary: they do not buy a product, a license or access to any
          feature, and every feature stays free for everyone.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong className="text-white">Full refund within 30 days.</strong>{" "}
            Ask within 30 days of the payment and we refund the full amount, no
            questions asked.
          </li>
          <li>
            <strong className="text-white">Mistakes are always refunded.</strong>{" "}
            Duplicate charges, wrong amounts and payments you did not authorize
            are refunded whenever they are reported.
          </li>
          <li>
            <strong className="text-white">Recurring support.</strong> You can
            cancel a recurring payment at any time from the link in your receipt
            or by writing to us; no further charges are made after cancellation.
            The 30-day refund applies to each charge.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="How to ask for a refund">
        <p>
          Email {mail("contact@itenorio.com")} with the email address used for
          the payment, the date and the amount (or forward the receipt). We
          answer within 5 business days.
        </p>
        <p>
          Refunds go back to the original payment method: cards and wallets
          processed by Stripe usually show the refund within 5–10 business days,
          depending on your bank; Pix payments are returned by Pix to the paying
          account.
        </p>
        <p>
          Card payments are processed in US dollars (or the currency shown at
          checkout). We refund the amount we charged; exchange-rate differences
          or fees charged by your bank are outside our control.
        </p>
      </LegalSection>

      <LegalSection title="Software development services">
        <p>
          Paid development work for clients is governed by the proposal or
          contract agreed for each project, which sets its own payment and
          refund terms. Where nothing is agreed, this policy applies to amounts
          paid for work not yet delivered.
        </p>
      </LegalSection>

      <LegalSection title="Your rights">
        <p>
          Nothing in this policy limits the rights you have under the consumer
          protection law that applies to you, including the Brazilian Consumer
          Defense Code (Código de Defesa do Consumidor), which grants a 7-day
          right of withdrawal for purchases made online.
        </p>
        <p>
          See also our{" "}
          <Link to="/legal/terms" className="text-white underline hover:text-brand-soft">
            Terms of Service
          </Link>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
