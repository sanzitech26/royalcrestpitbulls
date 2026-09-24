import { saveTestimonial } from "@/app/admin/(panel)/testimonials/actions";
import { AdminForm } from "@/components/admin/admin-form";
import { Field, fieldClasses } from "@/components/admin/fields";
import type { Testimonial } from "@/data/testimonials";

export function TestimonialForm({ testimonial }: { testimonial?: Testimonial & { published: boolean } }) {
  return (
    <AdminForm
      action={saveTestimonial}
      submitLabel={testimonial ? "Save changes" : "Add testimonial"}
      resetOnSuccess={!testimonial}
    >
      {testimonial && <input type="hidden" name="id" value={testimonial.id} />}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Customer name" hint="e.g. Marcus T. or Jennifer & Dave R.">
          <input name="name" required maxLength={100} defaultValue={testimonial?.name} className={fieldClasses} />
        </Field>
        <Field label="City and state">
          <input
            name="location"
            required
            maxLength={100}
            defaultValue={testimonial?.location}
            placeholder="e.g. Atlanta, GA"
            className={fieldClasses}
          />
        </Field>
        <Field label="Puppy they adopted">
          <input name="puppy" required maxLength={60} defaultValue={testimonial?.puppy} className={fieldClasses} />
        </Field>
        <Field label="Rating">
          <select name="rating" required defaultValue={testimonial?.rating ?? 5} className={fieldClasses}>
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "star" : "stars"}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Review" hint="Use the customer's own words, and only with their permission.">
        <textarea
          name="quote"
          required
          minLength={10}
          maxLength={1000}
          rows={4}
          defaultValue={testimonial?.quote}
          className={fieldClasses}
        />
      </Field>

      <label className="flex items-center gap-2 text-sm text-ink">
        <input
          type="checkbox"
          name="published"
          defaultChecked={testimonial?.published ?? true}
          className="size-4 accent-gold"
        />
        Show on the website
      </label>
    </AdminForm>
  );
}
