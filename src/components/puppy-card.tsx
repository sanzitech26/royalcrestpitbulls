import Image from "next/image";
import Link from "next/link";
import { PawPrint } from "lucide-react";
import { SavePuppyButton } from "@/components/save-puppy-button";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Puppy } from "@/data/puppies";

export function PuppyCard({ puppy }: { puppy: Puppy }) {
  const details = `/available-puppies/${puppy.id}`;
  const facts: [string, string][] = [
    ["Condition", puppy.status],
    ["Sex", puppy.gender],
    ["Age", `${puppy.ageWeeks} weeks old`],
    ["Breed", puppy.breed],
  ];

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-md">
      {/* the heart sits beside the photo link, not inside it: a button can't be nested in a link */}
      <div className="relative">
        <Link href={details} className="relative block aspect-[3/4]">
          <Image
            src={puppy.image}
            alt={puppy.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </Link>
        <SavePuppyButton id={puppy.id} name={puppy.name} className="absolute top-3 right-3" />
      </div>

      <div className="p-5">
        <h3 className="font-display text-2xl font-bold text-ink">
          <Link href={details} className="hover:text-gold">
            Name: {puppy.name}
          </Link>
          <span className="mx-2 text-ink/30">|</span>
          <span className="text-gold">${puppy.price}</span>
        </h3>

        <dl className="mt-4 space-y-2.5">
          {facts.map(([label, value]) => (
            <div key={label} className="flex items-center gap-3 text-ink/80">
              <PawPrint className="size-4 shrink-0 text-gold" fill="currentColor" aria-hidden />
              <dt className="sr-only">{label}</dt>
              <dd>
                {label}: {value}
              </dd>
            </div>
          ))}
        </dl>

        <Link
          href={`/contact/${puppy.id}`}
          className={cn(buttonVariants({ size: "lg" }), "mt-5 h-12 w-full rounded-full text-base font-bold shadow-lg shadow-gold/25")}
        >
          Contact Us Now!
        </Link>
      </div>
    </div>
  );
}
