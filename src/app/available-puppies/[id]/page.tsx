import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  FileText,
  Heart,
  Mars,
  PawPrint,
  ShieldCheck,
  Venus,
} from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { PuppyCard } from "@/components/puppy-card";
import { buttonVariants } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { IconCircle } from "@/components/ui/icon-circle";
import { getPuppies, getPuppy } from "@/lib/content";
import { cn } from "@/lib/utils";

const included = [
  { icon: ShieldCheck, text: "Vet exam, first vaccinations and deworming" },
  { icon: FileText, text: "Written health guarantee and health records" },
  { icon: Heart, text: "Starter food supply and a feeding guide" },
  { icon: PawPrint, text: "Lifetime support from your breeder" },
];

// Puppies come from Supabase; admin edits also revalidate this page immediately. Puppies added later render on demand.
export const revalidate = 60;

export async function generateStaticParams() {
  return (await getPuppies()).map((p) => ({ id: p.id }));
}

export async function generateMetadata(props: PageProps<"/available-puppies/[id]">): Promise<Metadata> {
  const { id } = await props.params;
  const puppy = await getPuppy(id);
  if (!puppy) return {};
  return {
    title: `${puppy.name} | RoyalCrest Pitbulls`,
    description: `${puppy.name}, a ${puppy.color.toLowerCase()} ${puppy.gender.toLowerCase()} ${puppy.breed} puppy, ${puppy.ageWeeks} weeks old.`,
  };
}

export default async function PuppyPage(props: PageProps<"/available-puppies/[id]">) {
  const { id } = await props.params;
  const puppy = await getPuppy(id);
  if (!puppy) notFound();

  const GenderIcon = puppy.gender === "Male" ? Mars : Venus;
  const specs = [
    { icon: <GenderIcon className="size-4 text-ink/40" />, label: "Gender", value: puppy.gender },
    { icon: <Calendar className="size-4 text-ink/40" />, label: "Age", value: `${puppy.ageWeeks} weeks old` },
    { icon: <PawPrint className="size-4 text-ink/40" />, label: "Breed", value: puppy.breed },
    {
      icon: <span className="size-2.5 rounded-full border border-ink/20 bg-gold/60" />,
      label: "Color",
      value: puppy.color,
    },
  ];
  const more = (await getPuppies()).filter((p) => p.id !== puppy.id).slice(0, 4);

  return (
    <>
      <PageHero
        title={puppy.name}
        description={`${puppy.color} ${puppy.gender.toLowerCase()} ${puppy.breed} puppy, ${puppy.ageWeeks} weeks old.`}
        crumbs={[{ label: "Available Puppies", href: "/available-puppies" }, { label: puppy.name }]}
      />

      <section className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-sm">
            <Image
              src={puppy.image}
              alt={puppy.name}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <span className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-ink shadow-sm">
              <span
                className={cn("size-1.5 rounded-full", puppy.status === "Reserved" ? "bg-amber-500" : "bg-green-600")}
              />
              {puppy.status.toUpperCase()}
            </span>
          </div>

          <div>
            <Eyebrow>Meet {puppy.name}</Eyebrow>
            <p className="mt-3 font-display text-5xl font-bold text-gold">${puppy.price}</p>
            <p className="mt-4 text-ink/70">
              {puppy.name} is a healthy, family-raised puppy from our RoyalCrest
              program, socialized from day one and ready to join a loving home.
              Contact us to reserve {puppy.name}, arrange a visit or video call,
              or talk through shipping.
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-4 rounded-2xl bg-white p-6 shadow-sm">
              {specs.map(({ icon, label, value }) => (
                <div key={label} className="flex items-center gap-3">
                  {icon}
                  <div>
                    <dt className="text-xs tracking-wide text-ink/50 uppercase">{label}</dt>
                    <dd className="text-sm font-semibold text-ink">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>

            <h2 className="mt-10 text-sm font-bold tracking-wide text-ink uppercase">
              Included With Every Puppy
            </h2>
            <ul className="mt-4 space-y-3">
              {included.map(({ icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-sm text-ink/80">
                  <IconCircle icon={icon} size="sm" />
                  {text}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href={`/contact/${puppy.id}`} className={cn(buttonVariants({ size: "lg" }), "rounded-full px-6")}>
                Contact Us About {puppy.name}
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/available-puppies"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full border-ink/25 bg-cream px-6")}
              >
                <ArrowLeft className="size-4" />
                All Puppies
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <Eyebrow>More Puppies</Eyebrow>
        <h2 className="mt-3 font-display text-4xl font-bold text-ink sm:text-5xl">
          You May Also Love
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {more.map((p) => (
            <PuppyCard key={p.id} puppy={p} />
          ))}
        </div>
      </section>
    </>
  );
}
