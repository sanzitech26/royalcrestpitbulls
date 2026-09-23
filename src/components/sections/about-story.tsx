import Image from "next/image";
import { Heart, PawPrint, ShieldCheck, Star, Users } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { IconCircle } from "@/components/ui/icon-circle";

const values = [
  { icon: Heart, title: "Integrity", description: "We do what's right, always." },
  { icon: PawPrint, title: "Quality", description: "Health, structure, and temperament first." },
  { icon: Users, title: "Family", description: "Our puppies are raised as part of our family." },
  { icon: ShieldCheck, title: "Responsibility", description: "We place our dogs in loving, qualified homes." },
  { icon: Star, title: "Excellence", description: "We continually strive to be the best." },
];

export function AboutStory() {
  return (
    <section className="bg-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.1fr_0.85fr_1fr] lg:items-center lg:gap-12 lg:py-20">
        <div>
          <Eyebrow>Our Story</Eyebrow>
          <h2 className="mt-3 font-display text-4xl font-bold text-ink sm:text-5xl">
            A Passion That Became a <span className="text-gold">Purpose.</span>
          </h2>
          <div className="mt-5 space-y-4 text-ink/70">
            <p>
              RoyalCrest Pitbulls was founded out of a deep love and respect
              for the American Pitbull. What started as a passion quickly
              became a lifelong commitment to producing healthy,
              well-structured, and temperamentally sound dogs.
            </p>
            <p>
              We believe that every dog deserves the best start in life
              &mdash; proper care, socialization, and a loving environment.
              Our goal is to preserve the integrity of the breed while
              placing our puppies in responsible, loving homes.
            </p>
          </div>
          <p className="mt-6 font-script text-3xl text-gold">The RoyalCrest Family</p>
        </div>

        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl sm:mx-auto sm:max-w-sm lg:max-w-none">
          <Image
            src="/images/about/story.jpg"
            alt="RoyalCrest Pitbulls puppy sitting upright"
            fill
            sizes="(min-width: 1024px) 30vw, 90vw"
            className="object-cover object-[15%_50%]"
          />
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <Eyebrow>Our Values</Eyebrow>
          <ul className="mt-4 divide-y divide-ink/10">
            {values.map(({ icon, title, description }) => (
              <li key={title} className="flex items-center gap-4 py-4">
                <IconCircle icon={icon} size="sm" />
                <div>
                  <h3 className="text-sm font-bold text-ink">{title}</h3>
                  <p className="text-xs text-ink/60">{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
