import { Link } from "react-router-dom";
import { CompanyIdentification, LegalPage, LegalSection } from "./LegalPage";

const linkClass = "text-white underline hover:text-brand-soft";

const mail = (address) => (
  <a href={`mailto:${address}`} className={linkClass}>
    {address}
  </a>
);

// /legal/refund-policy: refunds for every product of iTenorio Tech: voluntary
// support, future paid products and subscriptions, and client services.
export default function RefundPolicyPage() {
  return (
    <LegalPage
      title="Refund Policy"
      updated="November 2026"
      summary={
        <p>
          Changed your mind? Ask within 7 days of a payment for a full refund.
          Charged twice or by mistake? Tell us and we fix it. Recurring payments
          can be cancelled at any time. Write to {mail("contact@itenorio.com")}.
        </p>
      }
    >
      <LegalSection title="Who we are">
        <p>This policy applies to payments made to</p>
        <CompanyIdentification />
        <p>
          It covers all our products and services, now and in the future. A
          product page or a contract may grant more favourable conditions; in
          that case, those apply.
        </p>
      </LegalSection>

      <LegalSection title="Voluntary support payments">
        <p>
          Support payments are voluntary and do not unlock any feature.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong className="text-white">7 days to change your mind.</strong>{" "}
            Ask within 7 days of a payment and we refund it in full.
          </li>
          <li>
            <strong className="text-white">Mistakes.</strong> Duplicate charges
            and wrong amounts are refunded once we confirm them.
          </li>
          <li>
            <strong className="text-white">After 7 days,</strong> refunds are at
            our discretion.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Paid products and subscriptions">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong className="text-white">Right of withdrawal.</strong> You can
            cancel a purchase made online within 7 days and receive a full
            refund, as provided by Article 49 of the Brazilian Consumer Defense
            Code.
          </li>
          <li>
            <strong className="text-white">Subscriptions and recurring
            payments</strong> can be cancelled at any time, from the link in your
            receipt or by writing to us. No further charges are made after
            cancellation, and access continues until the end of the period
            already paid. Except for the first 7 days and the cases below,
            periods already paid are not refunded.
          </li>
          <li>
            <strong className="text-white">If it doesn&apos;t work.</strong> If a
            paid product doesn&apos;t work as described and we can&apos;t fix it
            within a reasonable time, we refund the amount paid for the period
            it didn&apos;t work.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Software development services">
        <p>
          Custom development work follows the payment and refund terms of its
          proposal or contract. Where nothing is agreed, amounts paid for work
          not yet delivered are refunded if the project is cancelled.
        </p>
      </LegalSection>

      <LegalSection title="How to ask for a refund">
        <p>
          Email {mail("contact@itenorio.com")} with the email address used for
          the payment, the date and the amount, or forward the receipt. We
          answer within 5 business days.
        </p>
        <p>
          Refunds go back to the original payment method. Card refunds usually
          appear within 5 to 10 business days, depending on your bank; Pix
          payments are returned by Pix to the paying account. We refund the
          amount we received in the currency charged; exchange-rate differences
          and fees charged by your bank or payment provider are outside our
          control.
        </p>
        <p>
          Please contact us before opening a dispute or chargeback with your
          bank: it is usually faster. We may refuse future payments from
          accounts with chargebacks we consider fraudulent.
        </p>
      </LegalSection>

      <LegalSection title="Your rights">
        <p>
          Nothing in this policy limits the rights you have under the consumer
          protection law that applies to you. See also our{" "}
          <Link to="/legal/terms" className={linkClass}>
            Terms of Service
          </Link>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
