import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Plane } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/layout/page-hero";
import { Eyebrow } from "@/components/ui/eyebrow";
import { IconCircle } from "@/components/ui/icon-circle";
import { contactInfo, site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact Us | RoyalCrest Pitbulls",
  description:
    "Questions about our puppies, breeding program or shipping? Send us a message and we'll get back to you.",
};

const hrefs: Record<string, string> = {
  "Call Us": `tel:${site.phone.replace(/[^\d+]/g, "")}`,
  "Email Us": `mailto:${site.email}`,
};

const quickLinks = [
  { label: "Frequently Asked Questions", href: "/faq" },
  { label: "Health Guarantee", href: "/health-guarantee" },
  { label: "Available Puppies", href: "/available-puppies" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        description="Have a question about our puppies, breeding program or shipping? We'd love to hear from you."
        crumbs={[{ label: "Contact" }]}
        image="/images/contact-hero.jpg"
        imageAlt="A RoyalCrest Pitbull resting its head on the floor"
        imagePosition="object-[50%_60%]"
      />

      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
            <div className="grid lg:grid-cols-[1.15fr_1fr]">
              <div className="p-6 sm:p-10 lg:p-12">
                <Eyebrow>Get In Touch</Eyebrow>
                <h2 className="mt-3 font-display text-4xl font-bold text-ink sm:text-5xl">
                  We&rsquo;re Here to <span className="text-gold">Help.</span>
                </h2>
                <p className="mt-4 max-w-md text-ink/70">
                  Have questions about our puppies, breeding program, or
                  shipping? Send us a message and we&rsquo;ll get back to you as
                  soon as possible.
                </p>
                <ContactForm filled className="mt-8" />
              </div>

              {/* ponytail: reference has a cut-out puppy; we have no cut-out, so a photo on a near-white backdrop is multiplied into the panel and faded in from the form side */}
              <div className="relative min-h-80 lg:min-h-0">
                <Image
                  src="/images/puppies/luna.jpg"
                  alt="RoyalCrest Pitbulls puppy sitting on a woven bed"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover object-[50%_35%] mix-blend-multiply [mask-image:linear-gradient(to_bottom,transparent,black_30%)] lg:[mask-image:linear-gradient(to_right,transparent,black_35%)]"
                />
                {/* desktop only: on mobile the photo is a short crop and the script would sit on the puppy's face */}
                <div className="absolute hidden lg:top-10 lg:-left-6 lg:block">
                  <p className="font-script -rotate-6 text-3xl leading-8 text-ink">
                    Questions?
                    <br />
                    We&rsquo;re Here.
                  </p>
                  <span className="mt-3 block h-0.5 w-16 rounded-full bg-gold" />
                </div>
              </div>
            </div>

            <div className="grid divide-y divide-ink/10 border-t border-ink/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {contactInfo.map(({ icon, label, value, extra }) => {
                const href = hrefs[label];
                return (
                  <div key={label} className="flex items-center gap-3 px-6 py-5 sm:px-8">
                    <IconCircle icon={icon} size="sm" className="border-transparent bg-gold text-white" />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-ink">{label}</p>
                      {href ? (
                        <a href={href} className="text-xs break-words text-ink/60 hover:text-gold">
                          {value}
                        </a>
                      ) : (
                        <p className="text-xs text-ink/60">{value}</p>
                      )}
                      {extra && <p className="text-xs text-ink/60">{extra}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-sm font-bold tracking-wide text-ink uppercase">Quick Answers</h3>
              <ul className="mt-2">
                {quickLinks.map(({ label, href }) => (
                  <li key={href} className="border-b border-ink/10 last:border-0">
                    <Link
                      href={href}
                      className="flex items-center justify-between py-3 text-sm font-medium text-ink/80 transition-colors hover:text-gold"
                    >
                      {label}
                      <ArrowRight className="size-4 text-gold" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-charcoal p-6">
              <div className="flex items-center gap-3">
                <IconCircle icon={Plane} size="sm" className="border-gold-light/40 text-gold-light" />
                <p className="font-semibold text-white">Worldwide Shipping</p>
              </div>
              <p className="mt-3 text-sm text-white/60">
                Can&rsquo;t visit in person? We deliver our puppies safely to
                families across the U.S. and international locations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
