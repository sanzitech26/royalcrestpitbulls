import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";

// ponytail: only the first photo is one of the About-page assets; the other three reuse photos already on the site
const steps = [
  {
    title: "Selective Breeding",
    description: "We breed for health, structure, and stable temperament.",
    image: "/images/about/program-selective.jpg",
    alt: "Adult white and grey RoyalCrest Pitbull",
  },
  {
    title: "Puppy Development",
    description: "Our puppies receive early training and socialization.",
    image: "/images/puppies/kobe.jpg",
    alt: "Fawn RoyalCrest puppy sitting on a front step",
  },
  {
    title: "Ongoing Care",
    description: "Proper nutrition, vet care, and a nurturing environment.",
    image: "/images/puppies/luna.jpg",
    alt: "Fawn RoyalCrest puppy resting on a cushioned bed",
  },
  {
    title: "Stronger Generations",
    description: "Committed to a healthier, brighter future.",
    image: "/images/standard-dog.jpg",
    alt: "Grey RoyalCrest Pitbull leaning out of a truck bed",
  },
];

export function AboutProgram() {
  return (
    <section className="bg-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[minmax(0,34%)_1fr] lg:items-center lg:gap-12 lg:py-20">
        <div>
          <Eyebrow>Our Breeding Program</Eyebrow>
          <h2 className="mt-3 font-display text-4xl font-bold text-ink">
            Built on Quality.
            <br />
            Focused on the Future.
          </h2>
          <p className="mt-4 text-ink/70">
            We carefully plan each breeding to maintain the best qualities of
            the American Pitbull, including health, structure, intelligence,
            and temperament. Our dogs are raised in a clean, safe, and loving
            home environment, receiving the care and attention they deserve
            from day one.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {steps.map(({ title, description, image, alt }) => (
            <div key={title} className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <div className="relative aspect-[4/3]">
                <Image
                  src={image}
                  alt={alt}
                  fill
                  sizes="(min-width: 1280px) 20vw, (min-width: 640px) 45vw, 100vw"
                  className="object-cover object-[50%_15%]"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xs font-bold tracking-wide text-ink uppercase">{title}</h3>
                <p className="mt-1.5 text-xs text-ink/70">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
