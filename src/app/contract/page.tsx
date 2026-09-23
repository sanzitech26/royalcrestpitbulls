import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Eyebrow } from "@/components/ui/eyebrow";

export const metadata: Metadata = {
  title: "Puppy Purchase Contract | RoyalCrest Pitbulls",
  description: "The terms that come with every RoyalCrest Pitbulls puppy.",
};

// PLACEHOLDER — the owner will supply the real contract; replace the card below with it.
export default function ContractPage() {
  return (
    <>
      <PageHero
        title="Puppy Purchase Contract"
        description="Clear, written terms for every RoyalCrest puppy, so you know exactly what to expect."
        crumbs={[{ label: "Contract" }]}
        image="/images/puppies/mia.jpg"
        imageAlt="A RoyalCrest Pitbulls puppy"
        imagePosition="object-[50%_45%]"
      />

      <section className="bg-cream">
        <div className="mx-auto max-w-3xl px-6 py-16 lg:py-20">
          <Eyebrow>Our Agreement</Eyebrow>
          <div className="mt-6 rounded-2xl bg-white p-8 shadow-sm sm:p-10">
            <p className="text-ink/70">
              The full contract will be published here soon. If you&rsquo;d like to see the terms
              before then, contact us and we&rsquo;ll send them over.
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Questions About the Contract?"
        title="Ask Us"
        highlight="Anything."
        description="We'll happily walk you through every term before you reserve a puppy."
        primary={{ label: "Contact Us", href: "/contact" }}
        secondary={{ label: "Read the FAQ", href: "/faq" }}
      />
    </>
  );
}
