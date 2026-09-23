import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Crown, Dna, Users, Heart, Handshake, type LucideIcon } from "lucide-react";
import { IconCircle } from "@/components/ui/icon-circle";

const pillars: {
  icon: LucideIcon;
  title: string;
  description: string;
  linkLabel?: string;
  href?: string;
}[] = [
  {
    icon: Dna,
    title: "Bloodlines",
    description:
      "Thoughtfully selected pedigrees and breeding programs to maintain exceptional structure, health, and genetic quality.",
  },
  {
    icon: Users,
    title: "Temperament",
    description:
      "We value confident, stable and family-friendly temperaments, raising puppies that integrate well into loving homes.",
  },
  {
    icon: Heart,
    title: "Care",
    description:
      "From proper nutrition to early socialization, our puppies receive attentive care throughout their development.",
    linkLabel: "How We Care",
    href: "/health-guarantee",
  },
  {
    icon: Handshake,
    title: "Commitment",
    description:
      "Our relationship doesn't end when your puppy goes home. We're here for guidance, support, and a lifetime of shared success.",
    linkLabel: "Lifetime Support",
    href: "/contact",
  },
];

export function RoyalCrestStandard() {
  return (
    <section className="bg-cream">
      <div className="grid lg:grid-cols-[minmax(0,28%)_1fr]">
        <div className="relative hidden min-h-[520px] lg:block">
          <Image
            src="/images/standard-dog.jpg"
            alt="RoyalCrest Pitbulls standard"
            fill
            className="object-cover"
          />
          <p className="absolute top-8 left-6 text-xs font-semibold tracking-[0.2em] text-white uppercase drop-shadow-sm">
            Discipline
            <br />
            Breeds
            <br />
            Exceptional
            <br />
            Companions
          </p>
        </div>

        <div className="relative overflow-hidden px-6 py-16 sm:px-10 lg:py-20">
          <Crown className="pointer-events-none absolute top-6 right-6 size-32 text-ink/5 sm:size-40" />
          <div className="absolute top-10 right-8 hidden text-right text-xs font-semibold tracking-[0.2em] text-ink/40 uppercase sm:block">
            <span className="mb-2 block h-px w-8 bg-ink/20" />
            Our Standard
            <br />
            Your Confidence
          </div>

          <div className="relative mb-8 aspect-[4/3] w-full overflow-hidden rounded-2xl lg:hidden">
            <Image
              src="/images/standard-dog.jpg"
              alt="RoyalCrest Pitbulls standard"
              fill
              className="object-cover"
            />
            <p className="absolute top-4 left-4 text-xs font-semibold tracking-[0.2em] text-white uppercase drop-shadow-sm">
              Discipline · Breeds · Exceptional · Companions
            </p>
          </div>

          <p className="text-sm font-semibold tracking-[0.25em] text-gold uppercase">
            The RoyalCrest Standard
          </p>
          <h2 className="mt-3 max-w-xl font-display text-4xl font-bold text-ink sm:text-5xl">
            Built Different.
            <br />
            <span className="text-gold">For a Better Tomorrow.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-ink/70">
            At RoyalCrest Pitbulls, we hold ourselves to a higher standard.
            Every decision we make is centered around producing healthy,
            well-tempered, and structurally sound dogs that bring value to
            families for a lifetime.
          </p>

          {/* ponytail: cards show icon + copy only, no photos — per explicit request to drop the per-card images from the reference */}
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map(({ icon, title, description, linkLabel, href }) => (
              <div key={title} className="rounded-2xl bg-white p-6 shadow-sm">
                <IconCircle icon={icon} />
                <h3 className="mt-4 text-sm font-bold tracking-wide text-ink uppercase">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-ink/70">{description}</p>
                {href && (
                  <Link
                    href={href}
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-gold uppercase hover:text-gold-light"
                  >
                    {linkLabel}
                    <ArrowRight className="size-3.5" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ponytail: reference shows a collar product photo here too — skipped, no asset provided for it */}
      <div className="bg-charcoal px-6 py-10 sm:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          <div>
            <p className="font-display text-xl text-white italic">
              &ldquo;Quality isn&rsquo;t an accident. It&rsquo;s a standard.&rdquo;
            </p>
            <p className="mt-2 text-xs tracking-[0.2em] text-white/60 uppercase">
              RoyalCrest Pitbulls
            </p>
          </div>
          <div className="text-center sm:text-right">
            <p className="font-display text-xl text-white">
              Stronger Dogs. Happier Families.
            </p>
            <p className="mt-2 text-xs tracking-[0.2em] text-gold-light uppercase">
              The RoyalCrest Standard
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
