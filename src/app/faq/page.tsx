import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Crown,
  Heart,
  Mail,
  MapPin,
  Minus,
  Plus,
  ShieldCheck,
  Users,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { IconCircle } from "@/components/ui/icon-circle";
import { site } from "@/data/site";
import { getFaqs } from "@/lib/content";
import { cn } from "@/lib/utils";

// The questions come from Supabase; admin edits also revalidate this page immediately.
export const revalidate = 60;

export const metadata: Metadata = {
  title: "FAQ | RoyalCrest Pitbulls",
  description:
    "Answers about our puppies, health guarantee, bloodlines, reservations, shipping and life with a RoyalCrest Pitbull.",
};

const contact = [
  {
    icon: Mail,
    label: "Email Us",
    value: site.email,
    href: `mailto:${site.email}`,
    note: "We reply within 24 hours",
  },
  {
    icon: MapPin,
    label: "Our Location",
    value: "United States",
    note: "Nationwide & Worldwide Shipping",
  },
];

const promises = [
  { icon: Users, title: "Friendly Support", note: "Real People, Real Answers" },
  { icon: Clock, title: "Quick Response", note: "Usually within 24 hours" },
  { icon: Heart, title: "Lifetime Guidance", note: "We're with you always" },
];

// ponytail: the reference shows the owner's own photos (forest puppy portrait, mother + litter) — stock stand-ins until those exist
export default async function FaqPage() {
  const faqs = await getFaqs();
  let n = 0;

  return (
    <>
      <section className="bg-cream">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[300px_1fr] lg:gap-12 lg:py-16">
          <aside className="order-last rounded-2xl bg-white/50 p-3 shadow-sm ring-1 ring-ink/5 lg:order-none lg:self-start">
            <div className="relative aspect-[9/10] overflow-hidden rounded-xl">
              <Image
                src="/images/about/story.jpg"
                alt="RoyalCrest Pitbulls puppy"
                fill
                sizes="(min-width: 1024px) 300px, 100vw"
                className="object-cover object-[0%_50%]"
              />
              <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-charcoal/60 to-transparent" />
              <div className="absolute top-6 left-5 -rotate-12">
                <p className="font-script text-3xl leading-8 text-white drop-shadow">
                  Still Have
                  <br />
                  Questions?
                </p>
                <span className="mt-2 block h-0.5 w-16 rounded-full bg-gold-light" />
              </div>
            </div>

            <div className="px-2 pt-5 pb-3">
              <p className="text-sm text-ink/70">
                We&rsquo;re here to help! If you can&rsquo;t find the answer you&rsquo;re looking
                for, feel free to reach out to us directly.
              </p>
              <Link
                href="/contact"
                className={cn(buttonVariants({ size: "lg" }), "mt-5 h-12 w-full text-base")}
              >
                <Mail className="size-4" />
                Contact Us
                <ArrowRight className="size-4" />
              </Link>

              <ul className="mt-6 space-y-5 border-t border-ink/10 pt-6">
                {contact.map(({ icon, label, value, href, note }) => (
                  <li key={label} className="flex items-start gap-3">
                    <IconCircle icon={icon} size="sm" className="border-gold bg-gold text-white" />
                    <div className="min-w-0 text-sm">
                      <p className="font-semibold text-ink">{label}</p>
                      {href ? (
                        <a href={href} className="break-words text-ink/70 hover:text-gold">
                          {value}
                        </a>
                      ) : (
                        <p className="text-ink/70">{value}</p>
                      )}
                      <p className="text-xs text-ink/60">{note}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center gap-3 border-t border-ink/10 pt-6">
                <ShieldCheck className="size-10 shrink-0 text-gold" />
                <div>
                  <p className="font-semibold text-ink">Your Peace of Mind Matters</p>
                  <p className="mt-1 text-xs text-ink/60">
                    We&rsquo;re committed to transparent communication and honest answers.
                  </p>
                </div>
              </div>
            </div>
          </aside>

          <div>
            <div className="relative">
              <div
                aria-hidden
                className="pointer-events-none absolute top-0 right-0 hidden w-56 text-right lg:block"
              >
                <Crown className="ml-auto inline size-8 text-ink/5" />
                <Crown className="inline size-14 text-ink/5" />
                <p className="mt-2 -rotate-6 font-script text-xl leading-6 text-ink/60">
                  Knowledge
                  <br />
                  Builds Stronger
                  <br />
                  Families.
                </p>
                <span className="mt-2 ml-auto block h-0.5 w-16 rounded-full bg-gold-light" />
              </div>

              <Eyebrow>FAQ&rsquo;s</Eyebrow>
              <h1 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
                Common Questions, <span className="text-gold">Honest Answers.</span>
              </h1>
              <p className="mt-4 max-w-xl text-ink/70">
                We&rsquo;ve answered the most common questions from our puppy families. If you need
                more information, we&rsquo;re always happy to help.
              </p>
            </div>

            <div className="mt-8 space-y-8">
              {faqs.map(({ title, icon: Icon, items }) => (
                <section key={title} aria-label={title}>
                  <h2 className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-gold uppercase">
                    <Icon className="size-4" />
                    {title}
                  </h2>
                  <div className="mt-3 space-y-2.5">
                    {items.map(({ q, a }) => (
                      <details
                        key={q}
                        className="group rounded-lg bg-white/70 shadow-sm ring-1 ring-ink/5 open:bg-white"
                      >
                        <summary className="flex cursor-pointer list-none items-center gap-4 rounded-lg p-2.5 pr-5 outline-none focus-visible:ring-2 focus-visible:ring-gold [&::-webkit-details-marker]:hidden">
                          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gold text-xs font-bold text-white">
                            {String(++n).padStart(2, "0")}
                          </span>
                          <span className="flex-1 border-l border-ink/10 pl-4 text-sm font-medium text-ink sm:text-base">
                            {q}
                          </span>
                          <Plus className="size-5 shrink-0 text-ink/70 group-open:hidden" />
                          <Minus className="hidden size-5 shrink-0 text-gold group-open:block" />
                        </summary>
                        <p className="border-t border-ink/10 py-4 pr-5 pl-[4.5rem] text-sm text-ink/70 sm:text-base">
                          {a}
                        </p>
                      </details>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-charcoal">
        <div className="absolute inset-0 opacity-25 lg:inset-y-0 lg:right-0 lg:left-auto lg:w-1/2 lg:opacity-100">
          <Image
            src="/images/about/hero.jpg"
            alt=""
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-[50%_40%]"
          />
          <div className="absolute inset-y-0 left-0 hidden w-2/3 bg-gradient-to-r from-charcoal to-transparent lg:block" />
          <p className="absolute top-10 left-[12%] hidden -rotate-6 font-script text-2xl leading-7 text-white/80 lg:block">
            More Than
            <br />
            Breeders,
            <br />
            We&rsquo;re a Family. <Heart className="inline size-4 text-gold-light" />
          </p>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-14 lg:py-16">
          <div className="max-w-2xl">
            <Eyebrow className="text-gold-light">Still Have a Question?</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
              We&rsquo;re Always Here for You.
            </h2>
            <p className="mt-4 max-w-xl text-white/70">
              Our team is happy to help with anything you need. Reach out anytime &mdash;
              we&rsquo;ll get back to you as soon as possible.
            </p>
            <Link
              href="/contact"
              className={cn(buttonVariants({ size: "lg" }), "mt-7 h-11 px-6 text-base")}
            >
              <Mail className="size-4" />
              Contact Us Now
              <ArrowRight className="size-4" />
            </Link>

            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-5">
              {promises.map(({ icon, title, note }) => (
                <li key={title} className="flex items-center gap-3">
                  <IconCircle icon={icon} size="sm" className="border-gold-light/40 text-gold-light" />
                  <div>
                    <p className="text-sm font-semibold text-white">{title}</p>
                    <p className="text-xs text-white/60">{note}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
