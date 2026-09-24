"use client";

import { startTransition, useActionState } from "react";
import { ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";
import { sendInquiry, type InquiryState } from "@/app/contact/actions";
import { buttonVariants } from "@/components/ui/button";
import { inquirySubjects } from "@/data/inquiries";
import { cn } from "@/lib/utils";

// Imported as a string by contract-form.tsx (another client component); don't import it from a server component.
export const inputClasses =
  "w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-gold focus:outline-none";

// tinted fields with no visible border until focused (the /contact panel look)
const filledClasses =
  "w-full rounded-lg border border-transparent bg-ink/[0.06] px-4 py-3 text-sm text-ink placeholder:text-ink/50 focus:border-gold focus:bg-white focus:outline-none";

export function ContactForm({ className, filled }: { className?: string; filled?: boolean }) {
  const [state, action, pending] = useActionState<InquiryState, FormData>(sendInquiry, { ok: false });
  const field = filled ? filledClasses : inputClasses;

  if (state.ok) {
    return (
      <div className={cn("rounded-2xl border border-gold/30 p-8 text-center", className)}>
        <CheckCircle2 className="mx-auto size-12 text-gold" />
        <h3 className="mt-4 font-display text-2xl font-bold text-ink">
          Thank you{state.name ? `, ${state.name.split(" ")[0]}` : ""}.
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-ink/70">
          We&rsquo;ve received your message and will get back to you as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <form
      // submitted from onSubmit, not the `action` prop: React resets the form after an action runs, which would wipe
      // what the visitor typed whenever the server says no (browser validation has already passed by the time this runs)
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        startTransition(() => action(data));
      }}
      className={cn("space-y-4", className)}
    >
      {/* honeypot: hidden from people, bots fill it */}
      <div aria-hidden className="absolute -left-[9999px]">
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          name="name"
          type="text"
          required
          minLength={2}
          maxLength={100}
          autoComplete="name"
          placeholder="Full Name *"
          aria-label="Full name"
          className={field}
        />
        <input
          name="email"
          type="email"
          required
          maxLength={200}
          autoComplete="email"
          placeholder="Email Address *"
          aria-label="Email address"
          className={field}
        />
      </div>
      <div className="relative">
        <select
          name="subject"
          required
          defaultValue=""
          aria-label="Subject"
          className={cn(field, "appearance-none text-ink/70")}
        >
          <option value="" disabled>
            Subject *
          </option>
          {inquirySubjects.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <ChevronDown
          className={cn(
            "pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2",
            filled ? "text-gold" : "text-ink/40"
          )}
        />
      </div>
      <textarea
        name="message"
        required
        minLength={5}
        maxLength={2000}
        placeholder="Your Message *"
        aria-label="Your message"
        rows={4}
        className={cn(field, "resize-none")}
      />

      {state.error && (
        <p role="alert" className="text-sm font-medium text-red-700">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className={cn(buttonVariants({ size: "lg" }), "w-full rounded-full", filled && "h-11")}
      >
        {pending ? "Sending…" : "Send Message"}
        {!pending && <ArrowRight className="size-4" />}
      </button>
    </form>
  );
}
