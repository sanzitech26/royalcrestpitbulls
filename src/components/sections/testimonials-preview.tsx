import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { TestimonialCard } from "@/components/testimonial-card";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";

export function TestimonialsPreview() {
  return (
    <section className="bg-charcoal">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center">
          <Eyebrow className="justify-center text-gold-light">Happy Families</Eyebrow>
          <h2 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">
            Loved by <span className="text-gold-light">Families Everywhere</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            Hear from the people who brought a RoyalCrest Pitbull home.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.slice(0, 3).map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} onDark />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/testimonials"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "rounded-full border-transparent bg-white px-6 text-ink hover:bg-white/90"
            )}
          >
            Read All Testimonials
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
