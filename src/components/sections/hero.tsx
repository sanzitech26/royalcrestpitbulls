import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PawPrint, ShieldCheck, Heart, Play } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: PawPrint,
    title: "Health Focused",
    subtitle: "Vet checked & up to date",
  },
  {
    icon: ShieldCheck,
    title: "Responsible Breeding",
    subtitle: "Quality over quantity",
  },
  {
    icon: Heart,
    title: "Family Raised",
    subtitle: "Socialized with love",
  },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      {/* TODO: swap in the real hero photo at public/images/hero-puppy.jpg */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-puppy.jpg"
          alt="RoyalCrest Pitbulls puppy"
          fill
          priority
          className="object-cover object-[75%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/85 to-transparent" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-2 lg:py-28">
        <div className="max-w-xl">
          <p className="text-sm font-semibold tracking-[0.25em] text-gold uppercase">
            More Than A Dog. A Family.
          </p>
          <h1 className="mt-4 font-display text-5xl leading-[1.1] font-bold text-ink sm:text-6xl">
            Bred With Purpose. Raised <span className="text-gold">With Love.</span>
          </h1>
          <p className="mt-6 max-w-md text-ink/70">
            At RoyalCrest Pitbulls, we raise exceptional puppies with strong
            bloodlines, excellent temperaments, and a commitment to lifelong
            companionship.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/available-puppies"
              className={cn(buttonVariants({ size: "lg" }), "rounded-full px-6")}
            >
              View Available Puppies
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/our-dogs"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-full border-ink/25 bg-cream px-6"
              )}
            >
              Meet Our Dogs
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap gap-8">
            {features.map(({ icon: Icon, title, subtitle }) => (
              <div key={title} className="flex items-center gap-3">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                  <Icon className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">{title}</p>
                  <p className="text-xs text-ink/60">{subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* spacer column: keeps the grid two-up on desktop so overlay text/play button below sit over the photo on the right */}
        <div className="hidden lg:block" />
      </div>

      <p className="font-script absolute top-16 right-10 hidden text-right text-3xl leading-8 text-white drop-shadow-sm lg:block">
        Loyal
        <br />
        Strong
        <br />
        Family
      </p>

      <div className="absolute right-10 bottom-14 hidden flex-col items-center gap-2 lg:flex">
        <button
          type="button"
          aria-label="Watch our story"
          className="flex size-16 items-center justify-center rounded-full bg-white shadow-lg transition-transform hover:scale-105"
        >
          <Play className="size-6 fill-ink text-ink" />
        </button>
        <span className="text-xs font-semibold tracking-widest text-white uppercase drop-shadow-sm">
          Watch Our Story
        </span>
      </div>
    </section>
  );
}
