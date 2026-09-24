import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { NoPuppies } from "@/components/no-puppies";
import { PuppyCard } from "@/components/puppy-card";
import { CtaBand } from "@/components/sections/cta-band";
import { trustBadges } from "@/components/sections/available-puppies";
import { IconCircle } from "@/components/ui/icon-circle";
import { getPuppies } from "@/lib/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Available Puppies | RoyalCrest Pitbulls",
  description: "Healthy, socialized RoyalCrest Pitbull puppies ready for their forever homes.",
};

const filters = [
  { label: "All Puppies", value: undefined },
  { label: "Males", value: "male" },
  { label: "Females", value: "female" },
];

export default async function AvailablePuppiesPage(props: PageProps<"/available-puppies">) {
  const [{ gender }, puppies] = await Promise.all([props.searchParams, getPuppies()]);
  const selected = gender === "male" || gender === "female" ? gender : undefined;
  const visible = selected ? puppies.filter((p) => p.gender.toLowerCase() === selected) : puppies;

  return (
    <>
      <PageHero
        title="Available Puppies"
        description="Healthy. Socialized. Ready for their forever homes. Meet the puppies currently looking for a family."
        crumbs={[{ label: "Available Puppies" }]}
        image="/images/puppies/titan.jpg"
        imageAlt="A RoyalCrest Pitbulls puppy running through the grass"
        imagePosition="object-[50%_60%]"
      />

      <section className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter puppies by gender">
            {filters.map(({ label, value }) => {
              const active = value === selected;
              return (
                <Link
                  key={label}
                  href={value ? `/available-puppies?gender=${value}` : "/available-puppies"}
                  scroll={false}
                  aria-current={active ? "true" : undefined}
                  className={cn(
                    "rounded-full border px-5 py-2 text-sm font-medium transition-colors",
                    active
                      ? "border-gold bg-gold text-white"
                      : "border-ink/20 text-ink/70 hover:border-gold hover:text-gold"
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-5">
            {trustBadges.map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <IconCircle icon={icon} size="sm" />
                <span className="text-sm text-ink/70">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {puppies.length ? (
          <>
            <p className="mt-8 text-sm text-ink/60">
              Showing {visible.length} of {puppies.length} puppies
            </p>
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {visible.map((puppy) => (
                <PuppyCard key={puppy.id} puppy={puppy} />
              ))}
            </div>
          </>
        ) : (
          <div className="mt-8">
            <NoPuppies />
          </div>
        )}
      </section>

      <CtaBand
        eyebrow="Waitlist"
        title="Don't See the Right"
        highlight="Puppy?"
        description="New litters arrive regularly. Tell us what you're looking for and we'll reach out when the perfect match is ready."
        primary={{ label: "Contact Us", href: "/contact" }}
        secondary={{ label: "Read the FAQ", href: "/faq" }}
      />
    </>
  );
}
