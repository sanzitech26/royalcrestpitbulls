import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Heart, Mars, PawPrint, Venus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Puppy } from "@/data/puppies";

export function PuppyCard({ puppy }: { puppy: Puppy }) {
  const GenderIcon = puppy.gender === "Male" ? Mars : Venus;

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
      <div className="relative aspect-[4/5]">
        <Image
          src={puppy.image}
          alt={puppy.name}
          fill
          className="object-cover"
        />
        <button
          type="button"
          aria-label="Save to favorites"
          className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-full bg-white shadow-sm transition-colors hover:text-gold"
        >
          <Heart className="size-4" />
        </button>
        <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-ink shadow-sm">
          <span className="size-1.5 rounded-full bg-green-600" />
          {puppy.status.toUpperCase()}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-display text-xl font-bold text-ink">{puppy.name}</h3>
          <span className="font-display text-xl font-bold text-gold">${puppy.price}</span>
        </div>

        <dl className="mt-3 space-y-2 text-sm text-ink/70">
          <div className="flex items-center gap-2">
            <GenderIcon className="size-4 text-ink/40" />
            <dt className="sr-only">Gender</dt>
            <dd>{puppy.gender}</dd>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="size-4 text-ink/40" />
            <dt className="sr-only">Age</dt>
            <dd>{puppy.ageWeeks} weeks old</dd>
          </div>
          <div className="flex items-center gap-2">
            <PawPrint className="size-4 text-ink/40" />
            <dt className="sr-only">Breed</dt>
            <dd>{puppy.breed}</dd>
          </div>
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full border border-ink/20 bg-gold/60" />
            <dt className="sr-only">Color</dt>
            <dd>{puppy.color}</dd>
          </div>
        </dl>

        <div className="mt-4 border-t border-ink/10 pt-4">
          <Link
            href="/contact"
            className={cn(buttonVariants(), "w-full rounded-full")}
          >
            Contact Us Now
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href={`/available-puppies/${puppy.id}`}
            className="mt-3 block text-center text-sm text-gold underline underline-offset-4 hover:text-gold-light"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
