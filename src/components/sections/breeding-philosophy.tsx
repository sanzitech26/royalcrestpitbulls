import { Heart, PawPrint, ShieldCheck, Trophy } from "lucide-react";
import { IconCircle } from "@/components/ui/icon-circle";
import { PedigreeTree } from "@/components/pedigree-tree";
import { titanLine, zoeLine } from "@/data/bloodlines";

const philosophyFeatures = [
  {
    icon: Trophy,
    title: "Proven Bloodlines",
    description: "We work with established, well-documented pedigrees.",
  },
  {
    icon: Heart,
    title: "Health Focused",
    description: "Health testing and responsible breeding practices.",
  },
  {
    icon: PawPrint,
    title: "Temperament First",
    description: "Stable, confident, family-friendly dogs.",
  },
  {
    icon: ShieldCheck,
    title: "Generational Improvement",
    description: "Continuously improving with every generation.",
  },
];

export function BreedingPhilosophy() {
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-[28%_20%_1fr] lg:gap-8">
          <div>
            <div className="flex items-center gap-3">
              <p className="text-sm font-semibold tracking-[0.25em] text-gold uppercase">
                Our Breeding Philosophy
              </p>
              <span className="h-px w-10 bg-gold/40" />
            </div>
            <h2 className="mt-3 font-display text-4xl font-bold text-ink sm:text-5xl">
              Quality Over Quantity
            </h2>
            <p className="mt-4 text-ink/70">
              At RoyalCrest Pitbulls, our breeding program is built on careful
              selection, proven bloodlines, and a deep commitment to
              producing healthy, well-structured, and stable dogs. We focus
              on preserving the best qualities of the breed while enhancing
              temperament, health, and structure with every generation.
            </p>
          </div>

          {/* ponytail: reference shows a sire photo card here — swapped for a text-only stat card per explicit "leave out the images" instruction */}
          <div className="flex aspect-[3/4] flex-col items-center justify-center gap-3 self-start rounded-2xl bg-charcoal px-6 py-10 text-center">
            <IconCircle icon={PawPrint} className="border-gold-light/50 text-gold-light" />
            <p className="font-display text-lg font-bold tracking-wide text-white uppercase">
              RoyalCrest Titan
            </p>
            <p className="text-xs tracking-[0.15em] text-white/60 uppercase">
              Sire &middot; Blue Tri &middot; 125 lbs
            </p>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <p className="text-sm font-semibold tracking-[0.25em] text-gold uppercase">
                Pedigree Example
              </p>
              <span className="h-px w-10 bg-gold/40" />
            </div>
            <p className="mt-3 text-sm text-ink/60">
              A look into the lineage behind our exceptional puppies.
            </p>

            <div className="mt-8 overflow-x-auto">
              <div className="flex min-w-[640px] flex-col gap-10 py-2">
                <PedigreeTree node={titanLine} sub="Sire" />
                <PedigreeTree node={zoeLine} sub="Dam" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 border-t border-ink/10 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          {philosophyFeatures.map(({ icon, title, description }) => (
            <div key={title} className="flex items-start gap-4">
              <IconCircle icon={icon} />
              <div>
                <h3 className="text-sm font-bold tracking-wide text-ink uppercase">
                  {title}
                </h3>
                <p className="mt-1 text-sm text-ink/70">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
