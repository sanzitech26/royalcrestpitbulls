import type { Metadata } from "next";
import { Quote } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Stars, TestimonialCard } from "@/components/testimonial-card";
import { testimonials } from "@/data/testimonials";

export const metadata: Metadata = {
  title: "Testimonials | RoyalCrest Pitbulls",
  description: "Stories from the families who welcomed a RoyalCrest Pitbull into their homes.",
};

const [featured, ...rest] = testimonials;
const average = testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        title="What Our Families Say"
        description="Stories from the families who welcomed a RoyalCrest Pitbull into their homes."
        crumbs={[{ label: "Testimonials" }]}
        image="/images/contact-puppy.jpg"
        imageAlt="RoyalCrest Pitbulls puppy"
        imagePosition="object-[50%_35%]"
      />

      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6">
            <p className="font-display text-6xl font-bold text-ink">{average.toFixed(1)}</p>
            <div className="text-center sm:text-left">
              <Stars rating={Math.round(average)} className="justify-center sm:justify-start [&_svg]:size-5" />
              <p className="mt-1 text-sm text-ink/60">
                Average rating from {testimonials.length} family reviews
              </p>
            </div>
          </div>

          <figure className="relative mt-12 overflow-hidden rounded-2xl bg-charcoal px-6 py-10 text-center sm:px-12 sm:py-14">
            <Quote className="pointer-events-none absolute top-6 left-6 size-24 text-white/5" />
            <Stars rating={featured.rating} className="relative justify-center text-gold-light" />
            <blockquote className="relative mx-auto mt-6 max-w-3xl font-display text-2xl text-white italic sm:text-3xl">
              &ldquo;{featured.quote}&rdquo;
            </blockquote>
            <figcaption className="relative mt-6 text-xs tracking-[0.2em] text-gold-light uppercase">
              {featured.name} &middot; {featured.location} &middot; Adopted {featured.puppy}
            </figcaption>
          </figure>

          <div className="mt-10 columns-1 gap-6 md:columns-2 lg:columns-3">
            {rest.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                className="mb-6 break-inside-avoid"
              />
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Join Our Family"
        title="Ready to Meet Your"
        highlight="New Best Friend?"
        description="See the puppies looking for their forever homes, or reach out and tell us what you're looking for."
        primary={{ label: "View Available Puppies", href: "/available-puppies" }}
        secondary={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
