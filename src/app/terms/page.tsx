import type { Metadata } from "next";
import { LegalLink, LegalPage, type LegalSection } from "@/components/legal-page";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms of Service | RoyalCrest Pitbulls",
  description: "The ground rules for using the RoyalCrest Pitbulls website.",
};

// DRAFT, written for how this website works (listings, inquiry and contract forms). It is not legal advice: have a lawyer
// look it over before launch. Puppy sales are covered by the Puppy Contract and the Return & Refund Policy, which these
// terms point to and deliberately don't repeat. The REVIEW comments mark what the owner must confirm.

const email = <LegalLink href={`mailto:${site.email}`}>{site.email}</LegalLink>;

const sections: LegalSection[] = [
  {
    title: "Agreeing to these terms",
    body: [
      <>
        By using the RoyalCrest Pitbulls website you agree to these terms and to our{" "}
        <LegalLink href="/privacy">Privacy Policy</LegalLink>. If you don&rsquo;t agree, please don&rsquo;t use the
        website.
      </>,
    ],
  },
  {
    title: "Information on this website",
    body: [
      "Our puppy listings, photos, prices and availability are shared in good faith and can change without notice. A puppy shown may already be reserved or sold, and puppies change quickly as they grow, so a photo may not match how a puppy looks today.",
      "Nothing on this website is a binding offer to sell.",
    ],
  },
  {
    title: "Reservations, purchases and refunds",
    body: [
      <>
        Sending a message or submitting a form doesn&rsquo;t reserve a puppy or create a sale. Sales are covered by the{" "}
        <LegalLink href="/puppy-contract">Puppy Contract</LegalLink> you sign, our{" "}
        <LegalLink href="/return-refund-policy">Return &amp; Refund Policy</LegalLink>, and any written health guarantee
        that comes with your puppy. Please read them before you commit.
      </>,
    ],
  },
  {
    title: "Using the website",
    body: [
      "Please use the website lawfully and considerately. You agree not to:",
      [
        "Give false or misleading information, or use someone else's details",
        "Send spam, malicious code, or automated requests that could disrupt the website",
        "Try to reach areas, accounts or data that aren't yours",
        "Copy or scrape the website's content in bulk",
      ],
    ],
  },
  {
    title: "Our content",
    body: [
      "The text, photos, logos and design on this website belong to RoyalCrest Pitbulls or are used with permission. You're welcome to view the pages and share links to them. Please don't copy, republish or use our content commercially without our written permission.",
    ],
  },
  {
    title: "Other websites",
    body: [
      "We may link to other websites, such as our social media pages. We don't control them and aren't responsible for their content or for how they handle your information.",
    ],
  },
  {
    title: "No guarantees about the website",
    body: [
      "The website is provided “as is” and “as available”. We work to keep it accurate and running, but we can't promise it will always be uninterrupted or free of errors. This doesn't change any written guarantee we give you for a puppy, or any legal rights that can't be excluded.",
    ],
  },
  {
    title: "Limits on our liability",
    body: [
      // REVIEW: limits like this are only partly enforceable and vary by state; have a lawyer check the wording.
      "To the fullest extent the law allows, RoyalCrest Pitbulls isn't liable for indirect or consequential losses that come from using, or being unable to use, this website. Nothing in these terms limits liability that the law doesn't allow us to limit, or your rights under your Puppy Contract or health guarantee.",
    ],
  },
  {
    title: "Changes to these terms",
    body: [
      "We may update these terms from time to time. The date at the top shows the latest version, and by continuing to use the website after a change you accept the updated terms.",
    ],
  },
  {
    title: "Governing law",
    body: [
      // REVIEW: name the state (and any dispute process) once the owner has decided; this is deliberately generic.
      "These terms are governed by the laws of the U.S. state in which RoyalCrest Pitbulls operates, without regard to its conflict-of-law rules.",
    ],
  },
  {
    title: "Contact us",
    body: [<>Questions about these terms? Email us at {email}.</>],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      description="The ground rules for using the RoyalCrest Pitbulls website."
      lastUpdated="September 2026"
      sections={sections}
    />
  );
}
