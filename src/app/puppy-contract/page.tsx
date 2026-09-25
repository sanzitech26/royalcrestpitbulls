import type { Metadata } from "next";
import Link from "next/link";
import { ContractForm } from "@/components/contract-form";
import { PageHero } from "@/components/layout/page-hero";
import { Eyebrow } from "@/components/ui/eyebrow";
import { lastUpdated, refundPolicyName, sections } from "@/data/puppy-contract";
import { site } from "@/data/site";
import { getPuppies } from "@/lib/content";

// The puppy dropdown comes from Supabase; admin edits also revalidate this page immediately.
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Puppy Contract | RoyalCrest Pitbulls",
  description:
    "What to expect when you reserve and buy a puppy from RoyalCrest Pitbulls, and where to sign your puppy contract online.",
};

// the name of the refund page inside a paragraph becomes a link to it
function withPolicyLink(paragraph: string) {
  const [before, after] = paragraph.split(refundPolicyName);
  if (after === undefined) return paragraph;
  return (
    <>
      {before}
      <Link href="/return-refund-policy" className="font-semibold text-gold underline underline-offset-2">
        {refundPolicyName}
      </Link>
      {after}
    </>
  );
}

export default async function PuppyContractPage() {
  const puppies = (await getPuppies()).map(({ id, name }) => ({ id, name }));

  return (
    <>
      <PageHero
        title="Puppy Contract"
        description="What to expect when you reserve and buy a puppy from us."
        crumbs={[{ label: "Puppy Contract" }]}
        image="/images/puppies/mia.jpg"
        imageAlt="A RoyalCrest Pitbulls puppy"
        imagePosition="object-[50%_45%]"
      />

      <section className="bg-cream">
        <div className="mx-auto max-w-3xl px-6 py-16 lg:py-20">
          <Eyebrow>Puppy Contract</Eyebrow>
          <h2 className="mt-3 font-display text-4xl font-bold text-ink sm:text-5xl">Sign this contract</h2>
          <p className="mt-4 text-ink/70">
            Ready to move forward? Fill in your details and sign below. Your signed contract goes straight to our team,
            and the full terms are below for your reference.
          </p>

          <div className="mt-8">
            <ContractForm puppies={puppies} />
          </div>

          <p className="mt-14 text-sm text-ink/60">Last updated: {lastUpdated}</p>
          <div className="mt-4 divide-y divide-ink/10">
            {sections.map(({ title, body }) => (
              <section key={title} className="space-y-3 py-8 first:pt-0">
                <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">{title}</h2>
                {body.map((paragraph) => (
                  <p key={paragraph} className="text-ink/70">
                    {withPolicyLink(paragraph)}
                  </p>
                ))}
              </section>
            ))}
            <section className="space-y-3 pt-8">
              <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Contact</h2>
              <p className="text-ink/70">
                Questions about this contract? Email us at{" "}
                <a href={`mailto:${site.email}`} className="font-semibold text-gold underline underline-offset-2">
                  {site.email}
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
