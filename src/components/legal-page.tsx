import type { ReactElement, ReactNode } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { CtaBand } from "@/components/sections/cta-band";

// string = paragraph, string[] = check list, element = a paragraph that needs a link in it
export type LegalBlock = string | string[] | ReactElement;
export type LegalSection = { title: string; body: LegalBlock[] };

export function LegalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="font-semibold text-gold underline underline-offset-2">
      {children}
    </Link>
  );
}

// Shared by /privacy and /terms: a plain reading page, one heading per section.
export function LegalPage({
  title,
  description,
  lastUpdated,
  sections,
}: {
  title: string;
  description: string;
  lastUpdated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHero title={title} description={description} crumbs={[{ label: title }]} />

      <section className="bg-cream">
        <div className="mx-auto max-w-3xl px-6 py-16 lg:py-20">
          <p className="text-sm text-ink/60">Last updated: {lastUpdated}</p>
          <div className="mt-6 divide-y divide-ink/10">
            {sections.map(({ title, body }) => (
              <section key={title} className="space-y-3 py-8 first:pt-0">
                <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">{title}</h2>
                {body.map((block, i) =>
                  Array.isArray(block) ? (
                    <ul key={i} className="space-y-2.5">
                      {block.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-ink/80">
                          <Check className="mt-1 size-4 shrink-0 text-gold" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p key={i} className="text-ink/70">
                      {block}
                    </p>
                  )
                )}
              </section>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Questions?"
        title="We're Happy"
        highlight="to Help."
        description="If anything here is unclear, get in touch and we'll walk you through it."
        primary={{ label: "Contact Us", href: "/contact" }}
        secondary={{ label: "Read the FAQ", href: "/faq" }}
      />
    </>
  );
}
