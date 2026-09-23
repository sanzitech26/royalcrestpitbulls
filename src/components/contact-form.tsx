import { ArrowRight, ChevronDown } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const inputClasses =
  "w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-gold focus:outline-none";

// tinted fields with no visible border until focused (the /contact panel look)
const filledClasses =
  "w-full rounded-lg border border-transparent bg-ink/[0.06] px-4 py-3 text-sm text-ink placeholder:text-ink/50 focus:border-gold focus:bg-white focus:outline-none";

// ponytail: no backend wired yet (Supabase unused so far) — static form, submit button is inert until that lands
export function ContactForm({ className, filled }: { className?: string; filled?: boolean }) {
  const field = filled ? filledClasses : inputClasses;

  return (
    <form className={cn("space-y-4", className)}>
      <div className="grid gap-4 sm:grid-cols-2">
        <input type="text" placeholder="Full Name *" aria-label="Full name" className={field} />
        <input type="email" placeholder="Email Address *" aria-label="Email address" className={field} />
      </div>
      <div className="relative">
        <select
          defaultValue=""
          aria-label="Subject"
          className={cn(field, "appearance-none text-ink/70")}
        >
          <option value="" disabled>
            Subject *
          </option>
          <option value="puppies">Available Puppies</option>
          <option value="breeding">Breeding Program</option>
          <option value="shipping">Shipping &amp; Delivery</option>
          <option value="other">Other</option>
        </select>
        <ChevronDown
          className={cn(
            "pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2",
            filled ? "text-gold" : "text-ink/40"
          )}
        />
      </div>
      <textarea
        placeholder="Your Message *"
        aria-label="Your message"
        rows={4}
        className={cn(field, "resize-none")}
      />
      <button
        type="button"
        className={cn(buttonVariants({ size: "lg" }), "w-full rounded-full", filled && "h-11")}
      >
        Send Message
        <ArrowRight className="size-4" />
      </button>
    </form>
  );
}
