import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Eyebrow } from "@/components/ui/eyebrow";
import { lastUpdated, sections } from "@/data/refund-policy";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Return & Refund Policy | RoyalCrest Pitbulls",
  description:
    "Our policies on puppy reservations, deposits, payments, cancellations, transportation and refunds.",
};

const number = (i: number) => String(i + 1).padStart(2, "0");

// one list, rendered twice: an always-open card beside the policy on desktop, a collapsed "Jump to a section" below that
const contents = (
  <ol className="grid gap-x-4">
    {sections.map(({ title }, i) => (
      <li key={title}>
        <a
          href={`#section-${i + 1}`}
          className="flex items-baseline gap-3 rounded-lg px-3 py-2 text-sm text-ink/70 transition-colors hover:bg-cream hover:text-gold"
        >
          <span className="font-semibold text-gold tabular-nums">{number(i)}</span>
          {title}
        </a>
      </li>
    ))}
  </ol>
);

export default function RefundPolicyPage() {
  return (
    <>
      <PageHero
        title="Return & Refund Policy"
        description="Please review our policies regarding puppy reservations, deposits, payments, cancellations, transportation, and refunds before completing a purchase."
        crumbs={[{ label: "Return & Refund Policy" }]}
        image="/images/puppies/mia.jpg"
        imageAlt="A RoyalCrest Pitbulls puppy"
        imagePosition="object-[50%_45%]"
      />

      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-14">
            <div className="min-w-0">
              <Eyebrow>Return &amp; Refund Policy</Eyebrow>
              <h2 className="mt-3 font-display text-4xl font-bold text-ink sm:text-5xl">
                Clear Policies.{" "}
                <span className="block text-gold">Responsible Transactions.</span>
              </h2>
              <p className="mt-3 text-sm text-ink/60">Last updated: {lastUpdated}</p>

              <details className="mt-8 rounded-2xl bg-white p-4 shadow-sm lg:hidden">
                <summary className="cursor-pointer font-semibold text-ink">Jump to a section</summary>
                <nav aria-label="Policy sections" className="mt-3">
                  {contents}
                </nav>
              </details>

              <div className="mt-10 divide-y divide-ink/10">
                {sections.map(({ title, body }, i) => (
                  <section
                    key={title}
                    id={`section-${i + 1}`}
                    className="scroll-mt-28 py-8 first:pt-0 lg:py-10 lg:first:pt-0"
                  >
                    <div className="flex items-center gap-4">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gold text-sm font-bold text-white">
                        {number(i)}
                      </span>
                      <h3 className="font-display text-2xl font-bold text-ink sm:text-3xl">{title}</h3>
                    </div>
                    <div className="mt-4 max-w-2xl space-y-4 sm:pl-[3.25rem]">
                      {body.map((block, j) =>
                        typeof block === "string" ? (
                          <p key={j} className="text-ink/70">
                            {block}
                          </p>
                        ) : (
                          <ul key={j} className={cn("grid gap-x-8 gap-y-2.5", block.length > 5 && "sm:grid-cols-2")}>
                            {block.map((item) => (
                              <li key={item} className="flex items-start gap-3 text-ink/80">
                                <Check className="mt-1 size-4 shrink-0 text-gold" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        )
                      )}
                    </div>
                  </section>
                ))}
              </div>
            </div>

            {/* desktop: the contents stay in view beside the long policy, scrolling inside themselves if the screen is short */}
            <nav
              aria-label="Policy sections"
              className="hidden lg:sticky lg:top-24 lg:block lg:max-h-[calc(100vh-7rem)] lg:self-start lg:overflow-y-auto"
            >
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <p className="mb-2 px-3 text-xs font-bold tracking-[0.2em] text-gold uppercase">In this policy</p>
                {contents}
              </div>
            </nav>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Ready to Reserve?"
        title="Sign the"
        highlight="Puppy Contract."
        description="Read the terms, choose your puppy and sign online. Questions first? We'll happily walk you through every term."
        primary={{ label: "Sign the Puppy Contract", href: "/puppy-contract" }}
        secondary={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
