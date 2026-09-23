import Image from "next/image";
import { Dna, Heart, PawPrint, Users } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { IconCircle } from "@/components/ui/icon-circle";

const differences = [
  {
    icon: Dna,
    title: "Proven Bloodlines",
    description: "Carefully selected for strength, health and temperament.",
  },
  {
    icon: Heart,
    title: "Health Focused",
    description: "Regular vet checks, vaccinations, and deworming.",
  },
  {
    icon: PawPrint,
    title: "Early Socialization",
    description: "Raised in a loving, hands-on environment with people and other dogs.",
  },
  {
    icon: Users,
    title: "Lifetime Support",
    description: "We're always here for guidance, even after your puppy comes home.",
  },
];

const alt = "Two RoyalCrest Pitbulls looking up at the camera";

export function AboutDifference() {
  return (
    <section className="bg-charcoal">
      {/* side photo only from xl: below that the cards stack 2x2, the section gets tall, and a narrow full-height crop of this photo turns to mush */}
      <div className="grid xl:grid-cols-[36%_1fr]">
        {/* ponytail: reference uses a cut-out dog blended into the dark band; a photo can't be, so it bleeds in via a right-edge fade instead */}
        <div className="relative hidden min-h-[480px] xl:block">
          <Image
            src="/images/about/difference.jpg"
            alt={alt}
            fill
            sizes="36vw"
            className="object-cover object-[30%_40%]"
          />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-r from-transparent to-charcoal" />
        </div>

        <div className="px-6 py-16 sm:px-10 lg:py-20">
          <div className="relative mb-8 aspect-[4/3] w-full overflow-hidden rounded-2xl xl:hidden">
            <Image src="/images/about/difference.jpg" alt={alt} fill sizes="100vw" className="object-cover" />
          </div>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <Eyebrow className="text-gold-light">Why Choose RoyalCrest?</Eyebrow>
              <h2 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">
                The RoyalCrest Difference.
              </h2>
            </div>
            <div className="lg:shrink-0 lg:text-right">
              <p className="font-script text-3xl leading-9 text-gold-light lg:max-w-[9rem] lg:-rotate-3">
                Well-bred dogs make better lives.
              </p>
              <span className="mt-3 block h-px w-24 bg-gold-light/50 lg:ml-auto" />
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {differences.map(({ icon, title, description }) => (
              <div
                key={title}
                className="rounded-xl border border-white/10 bg-white/5 p-5 text-center"
              >
                <IconCircle icon={icon} className="mx-auto border-transparent bg-gold text-white" />
                <h3 className="mt-4 text-xs font-bold tracking-wide text-white uppercase">
                  {title}
                </h3>
                <p className="mt-2 text-xs text-white/60">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
