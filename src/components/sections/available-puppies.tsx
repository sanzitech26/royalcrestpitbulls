import Link from "next/link";
import { ArrowRight, PawPrint, ShieldCheck, Heart } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { IconCircle } from "@/components/ui/icon-circle";
import { NoPuppies } from "@/components/no-puppies";
import { PuppyCard } from "@/components/puppy-card";
import { getPuppies } from "@/lib/content";
import { cn } from "@/lib/utils";

export const trustBadges = [
  { icon: PawPrint, label: "Health Checked" },
  { icon: ShieldCheck, label: "Up to Date on Vaccines" },
  { icon: Heart, label: "Family Raised" },
];

export async function AvailablePuppies() {
  const puppies = (await getPuppies()).slice(0, 8);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <p className="text-sm font-semibold tracking-[0.25em] text-gold uppercase">
              Available Puppies
            </p>
            <span className="h-px w-10 bg-gold/40" />
          </div>
          <h2 className="mt-3 font-display text-4xl font-bold text-ink sm:text-5xl">
            Our Current Puppies
          </h2>
          <p className="mt-3 text-ink/70">
            Healthy. Socialized. Ready for Their Forever Homes.
          </p>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-5">
            {trustBadges.map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <IconCircle icon={icon} size="sm" />
                <span className="text-sm text-ink/70">{label}</span>
              </div>
            ))}
          </div>
          <Link
            href="/available-puppies"
            className={cn(buttonVariants(), "rounded-full px-6")}
          >
            View all puppies
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>

      {puppies.length ? (
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {puppies.map((puppy) => (
            <PuppyCard key={puppy.id} puppy={puppy} />
          ))}
        </div>
      ) : (
        <div className="mt-12">
          <NoPuppies />
        </div>
      )}

      <div className="mt-14 flex items-center justify-center gap-4">
        <span className="h-px w-12 bg-gold/40" />
        <p className="text-xs font-semibold tracking-[0.25em] text-gold uppercase">
          Find Your Perfect Companion
        </p>
        <span className="h-px w-12 bg-gold/40" />
      </div>
    </section>
  );
}
