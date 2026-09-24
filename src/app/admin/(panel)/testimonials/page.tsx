import { ChevronDown, Plus } from "lucide-react";
import { ConfirmDelete } from "@/components/admin/confirm-delete";
import { cardClasses, Pill } from "@/components/admin/fields";
import { PageHeader } from "@/components/admin/page-header";
import { TestimonialForm } from "@/components/admin/testimonial-form";
import { Stars } from "@/components/testimonial-card";
import type { Testimonial } from "@/data/testimonials";
import { requireAdmin } from "@/lib/admin/auth";
import { deleteTestimonial } from "./actions";

export default async function TestimonialsAdminPage() {
  const { supabase } = await requireAdmin();

  const { data, error } = await supabase
    .from("testimonials")
    .select("id, name, location, puppy, rating, quote, published")
    .order("created_at", { ascending: false });
  const testimonials = (data ?? []) as (Testimonial & { published: boolean })[];

  return (
    <div className="max-w-3xl space-y-8">
      <PageHeader
        title="Testimonials"
        description="Reviews from your puppy families. The newest published review is the featured quote at the top of the Testimonials page."
      />

      {error && (
        <p role="alert" className="rounded-lg bg-red-50 p-4 text-sm font-medium text-red-700">
          Couldn&rsquo;t load testimonials: {error.message}
        </p>
      )}

      <details className={`${cardClasses} group p-0 sm:p-0`}>
        <summary className="flex cursor-pointer list-none items-center gap-2 px-5 py-4 font-semibold text-gold marker:content-none [&::-webkit-details-marker]:hidden">
          <Plus className="size-4" />
          Add a testimonial
        </summary>
        <div className="border-t border-ink/10 px-5 py-5">
          <TestimonialForm />
        </div>
      </details>

      <div className="space-y-3">
        {testimonials.map((testimonial) => (
          <details key={testimonial.id} className={`${cardClasses} group p-0 sm:p-0`}>
            <summary className="flex cursor-pointer list-none flex-wrap items-center gap-x-4 gap-y-2 px-5 py-4 marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="min-w-0 flex-1">
                <span className="block truncate font-semibold text-ink">{testimonial.name}</span>
                <span className="block truncate text-xs text-ink/60">
                  {testimonial.location} &middot; Adopted {testimonial.puppy}
                </span>
              </span>
              <Stars rating={testimonial.rating} />
              <Pill tone={testimonial.published ? "green" : "gray"}>
                {testimonial.published ? "Published" : "Hidden"}
              </Pill>
              <ChevronDown className="size-4 shrink-0 text-ink/40 transition-transform group-open:rotate-180" />
            </summary>
            <div className="space-y-5 border-t border-ink/10 px-5 py-5">
              <TestimonialForm testimonial={testimonial} />
              <ConfirmDelete action={deleteTestimonial} id={testimonial.id} what={`${testimonial.name}'s review`} />
            </div>
          </details>
        ))}
        {!testimonials.length && !error && (
          <p className="rounded-2xl bg-white p-8 text-center text-ink/60 shadow-sm">
            No testimonials yet. Add one above; the Testimonials page stays empty until you do.
          </p>
        )}
      </div>
    </div>
  );
}
