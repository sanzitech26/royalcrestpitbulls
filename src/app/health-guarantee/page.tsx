import type { Metadata } from "next";
import { Check, ClipboardCheck, FileText, Heart, Phone, ShieldCheck, Stethoscope, Syringe } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { StepIcon } from "@/components/step-icon";
import { Eyebrow } from "@/components/ui/eyebrow";
import { IconCircle } from "@/components/ui/icon-circle";

export const metadata: Metadata = {
  title: "Health Guarantee | RoyalCrest Pitbulls",
  description:
    "Every RoyalCrest puppy is backed by a written health guarantee and lifetime breeder support.",
};

// PLACEHOLDER terms — the owner must replace this copy with the real guarantee (coverage, time limits, remedies).

const covered = [
  {
    icon: Stethoscope,
    title: "Vet Checked",
    description: "Every puppy is examined by our veterinarian before going home.",
  },
  {
    icon: Syringe,
    title: "Vaccinated & Dewormed",
    description: "Age-appropriate vaccinations and regular deworming, fully documented.",
  },
  {
    icon: FileText,
    title: "Written Guarantee",
    description: "A clear, written health guarantee comes with every puppy.",
  },
  {
    icon: Heart,
    title: "Lifetime Support",
    description: "Advice and guidance from your breeder for as long as you need it.",
  },
];

const steps = [
  {
    icon: Phone,
    title: "Let Us Know",
    description: "If your veterinarian finds a health concern, contact us promptly.",
  },
  {
    icon: Stethoscope,
    title: "See Your Vet",
    description: "Have your veterinarian examine your puppy and document their findings.",
  },
  {
    icon: ClipboardCheck,
    title: "We Review Together",
    description: "We go over the records with you and your veterinarian.",
  },
  {
    icon: ShieldCheck,
    title: "We Make It Right",
    description: "Under the terms of your purchase agreement, we work with you on a fair solution.",
  },
];

const highlights = [
  "A written guarantee is provided with every puppy",
  "Covers serious genetic and congenital conditions",
  "Requires a veterinary exam soon after your puppy comes home",
  "Depends on proper care, nutrition and regular vet visits",
  "Full terms are set out in your purchase agreement",
];

export default function HealthGuaranteePage() {
  return (
    <>
      <PageHero
        title="Health Guarantee"
        description="Every RoyalCrest puppy is backed by our commitment to their health and to your peace of mind."
        crumbs={[{ label: "Health Guarantee" }]}
        image="/images/puppies/duke.jpg"
        imageAlt="A healthy RoyalCrest Pitbulls puppy"
        imagePosition="object-[50%_35%]"
      />

      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <Eyebrow>What&rsquo;s Included</Eyebrow>
          <h2 className="mt-3 font-display text-4xl font-bold text-ink sm:text-5xl">
            Peace of Mind, Every Puppy
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {covered.map(({ icon, title, description }) => (
              <div key={title} className="rounded-2xl bg-white p-6 shadow-sm">
                <IconCircle icon={icon} />
                <h3 className="mt-4 text-sm font-bold tracking-wide text-ink uppercase">{title}</h3>
                <p className="mt-2 text-sm text-ink/70">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-cream">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <div>
            <Eyebrow>How It Works</Eyebrow>
            <h2 className="mt-3 font-display text-4xl font-bold text-ink sm:text-5xl">
              If Something Isn&rsquo;t Right
            </h2>
            <div className="relative mt-10 space-y-8">
              <div className="absolute top-6 bottom-6 left-6 w-px bg-ink/10" />
              {steps.map(({ icon, title, description }, i) => (
                <div key={title} className="relative flex items-start gap-4">
                  <StepIcon icon={icon} index={i + 1} />
                  <div className="pt-2.5">
                    <h3 className="font-semibold text-ink">{title}</h3>
                    <p className="mt-1 max-w-sm text-sm text-ink/70">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="self-start rounded-2xl bg-charcoal p-8 sm:p-10">
            <Eyebrow className="text-gold-light">The Fine Print</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-bold text-white">
              Guarantee <span className="text-gold-light">Highlights</span>
            </h2>
            <ul className="mt-8 space-y-4">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-white/80">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-gold text-white">
                    <Check className="size-3.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Questions About the Guarantee?"
        title="We're Happy to"
        highlight="Explain."
        description="Ask us anything about coverage, timelines or what happens after your puppy comes home."
        primary={{ label: "Contact Us", href: "/contact" }}
        secondary={{ label: "Read the FAQ", href: "/faq" }}
      />
    </>
  );
}
