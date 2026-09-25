import type { Metadata } from "next";
import { LegalLink, LegalPage, type LegalSection } from "@/components/legal-page";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy | RoyalCrest Pitbulls",
  description: "What information RoyalCrest Pitbulls collects through this website, how we use it and how we protect it.",
};

// DRAFT, written from what this website actually does (contact forms, contract signing, a database, email to the team,
// no analytics, no payments). It is not legal advice: have a lawyer look it over before launch. The REVIEW comments mark
// the statements the owner must confirm.

const email = <LegalLink href={`mailto:${site.email}`}>{site.email}</LegalLink>;

const sections: LegalSection[] = [
  {
    title: "The short version",
    body: [
      "We only collect the information you choose to send us through this website's forms. We use it to answer you and to arrange your puppy, and for nothing else.",
      // REVIEW: true only while the site has no analytics or ad trackers. Update this if that ever changes.
      "We don't sell your information, and this website doesn't run advertising or analytics trackers.",
    ],
  },
  {
    title: "What we collect",
    body: [
      "When you send us a message, we receive your name, your email address and your message. If you choose to give them, we also receive your phone number, your address and the puppy you're asking about.",
      "When you sign a Puppy Contract, we receive your name, email address, phone number and delivery address, the puppy you chose, the agreed price, your shipping option and payment method, the version of the terms you agreed to, the date, and your drawn signature.",
      "We don't take payments on this website. The payment method you pick on the contract is only your choice; we never ask for card or bank details here.",
      "Like any website, our hosting provider automatically records technical details such as IP address, browser type and the pages requested. This is used to keep the website secure and running.",
    ],
  },
  {
    title: "What stays on your device",
    body: [
      "If you tap the heart on a puppy, that choice is saved in your own browser so it's still there next time. It is never sent to us, and you can remove it by tapping the heart again or clearing your browser's site data.",
      "Visitors don't receive tracking or advertising cookies from us. The only cookies this website sets are for our team's sign-in to the admin area.",
    ],
  },
  {
    title: "How we use it",
    body: [
      "We use what you send us to:",
      [
        "Reply to your questions",
        "Arrange your puppy's reservation, payment, paperwork and delivery",
        "Keep a record of the contracts you sign",
        "Keep the website secure and free of spam",
        "Meet our legal obligations",
      ],
    ],
  },
  {
    title: "Who can see it",
    body: [
      "Only our team can read the messages and contracts you send. Nobody else can look them up through the website.",
      "To run the website we use service providers for hosting, for storing our database and files, and for delivering email notifications to our team. They handle your information only to provide those services to us.",
      // REVIEW: confirm this matches how deliveries are really arranged (who handles transport, what they are given).
      "When we arrange delivery, we share the details needed, such as your name, address and phone number, with the people handling your puppy's transport. We may also share information if the law requires it, or to protect our rights or the safety of animals or people.",
    ],
  },
  {
    title: "How long we keep it",
    body: [
      // REVIEW: no retention period has been decided; add one (for example "two years") if the owner wants a fixed limit.
      "We keep messages for as long as we need them to answer you and for our business records. Signed contracts are kept as a record of the agreement you made.",
    ],
  },
  {
    title: "Keeping it safe",
    body: [
      "Anyone can send us a form, but only signed-in members of our team can read what has been sent. We limit who has access and use reputable service providers. No system is perfectly secure, so we can't promise absolute security, but we take care to protect what you share.",
    ],
  },
  {
    title: "Your choices",
    body: [
      // REVIEW: if the owner sells to buyers in places with specific privacy laws (for example California or the EU),
      // add the rights and request process those laws require.
      <>
        You can ask us what information we hold about you, ask us to correct it, or ask us to delete it by emailing{" "}
        {email}. Depending on where you live, you may have further rights over your personal information, and we&rsquo;ll
        respond as the law requires. We may need to keep certain records, such as a signed contract, where we have a
        good reason or a legal duty to do so.
      </>,
    ],
  },
  {
    title: "Children",
    body: [
      <>
        This website is meant for adults. We don&rsquo;t knowingly collect information from children under 13, and puppy
        purchases are made by adults. If you think a child has sent us their details, email {email} and we&rsquo;ll delete
        them.
      </>,
    ],
  },
  {
    title: "Changes to this policy",
    body: [
      "We may update this policy from time to time. The date at the top shows when it last changed, and the latest version is always on this page.",
    ],
  },
  {
    title: "Contact us",
    body: [<>Questions about this policy or your information? Email us at {email}.</>],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="What information we collect through this website, how we use it and how we protect it."
      lastUpdated="September 2026"
      sections={sections}
    />
  );
}
