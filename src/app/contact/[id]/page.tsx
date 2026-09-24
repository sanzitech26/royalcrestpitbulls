import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { PuppyInquiryForm } from "@/components/puppy-inquiry-form";
import { site } from "@/data/site";
import { getPuppies, getPuppy } from "@/lib/content";

// Puppies come from Supabase; admin edits also revalidate the public pages. New puppies render on demand.
export const revalidate = 60;

export async function generateMetadata(props: PageProps<"/contact/[id]">): Promise<Metadata> {
  const { id } = await props.params;
  const puppy = await getPuppy(id);
  return {
    title: `${puppy ? `Ask About ${puppy.name}` : "Contact Us"} | RoyalCrest Pitbulls`,
    description: "Send us a message about a puppy, reservations, pricing or delivery and we'll get back to you.",
  };
}

// The page a puppy card's "Contact Us Now!" opens. An unknown or sold id is not an error: the form simply opens with
// no puppy chosen, so an old link still works.
export default async function PuppyContactPage(props: PageProps<"/contact/[id]">) {
  const { id } = await props.params;
  const puppies = await getPuppies();
  const selected = puppies.find((p) => p.id === id)?.name ?? "";

  return (
    <>
      <PageHero
        title="Contact Us"
        description="Questions about reservations, pricing or delivery? We'd love to hear from you."
        crumbs={[{ label: "Contact Us" }]}
        image="/images/contact-hero.jpg"
        imageAlt="A RoyalCrest Pitbull resting its head on the floor"
        imagePosition="object-[50%_60%]"
      />

      <section className="bg-cream">
        <div className="mx-auto max-w-4xl px-6 py-16 lg:py-20">
          <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-10">
            {/* keyed so moving between two puppies' pages starts the select on the new puppy */}
            <PuppyInquiryForm key={selected} puppies={puppies.map((p) => p.name)} selected={selected} />
          </div>

          <a
            href={`mailto:${site.email}`}
            className="mt-6 flex items-center justify-center gap-2.5 rounded-2xl bg-white px-6 py-5 text-sm font-semibold text-ink shadow-sm transition-colors hover:text-gold"
          >
            <Mail className="size-4" />
            {site.email}
          </a>
        </div>
      </section>
    </>
  );
}
