"use client";

import { startTransition, useActionState } from "react";
import { ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";
import { sendPuppyInquiry, type PuppyInquiryState } from "@/app/contact/[id]/actions";
import { inputClasses } from "@/components/contact-form";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const fieldClasses = cn(inputClasses, "rounded-xl py-3.5");

function Field({
  label,
  required,
  optional,
  children,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-ink">
        {label} {required && <span className="text-gold">*</span>}
      </span>
      {children}
      {optional && <span className="mt-1.5 block text-xs text-ink/60">Optional</span>}
    </label>
  );
}

// `selected` is the puppy whose card was clicked ("" when there is none); it only sets the select's starting value
export function PuppyInquiryForm({ puppies, selected }: { puppies: string[]; selected: string }) {
  const [state, action, pending] = useActionState<PuppyInquiryState, FormData>(sendPuppyInquiry, { ok: false });

  if (state.ok) {
    return (
      <div className="py-6 text-center">
        <CheckCircle2 className="mx-auto size-12 text-gold" />
        <h2 className="mt-4 font-display text-3xl font-bold text-ink">
          Thank you{state.name ? `, ${state.name.split(" ")[0]}` : ""}.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-ink/70">
          We&rsquo;ve received your message{state.puppy ? ` about ${state.puppy}` : ""} and will get back to you as soon
          as possible.
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
      className="space-y-5"
    >
      {/* honeypot: hidden from people, bots fill it */}
      <div aria-hidden className="absolute -left-[9999px]">
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" required>
          <input name="name" type="text" required minLength={2} maxLength={100} autoComplete="name" className={fieldClasses} />
        </Field>
        <Field label="Email" required>
          <input name="email" type="email" required maxLength={200} autoComplete="email" className={fieldClasses} />
        </Field>
      </div>

      <Field label="Your Phone" optional>
        <input name="phone" type="tel" minLength={7} maxLength={30} autoComplete="tel" className={fieldClasses} />
      </Field>

      <Field label="Puppy of Interest">
        <div className="relative">
          <select name="puppy" defaultValue={selected} className={cn(fieldClasses, "appearance-none pr-11")}>
            <option value="">Not sure yet</option>
            {puppies.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-gold" />
        </div>
      </Field>

      <Field label="Address" optional>
        <input name="address" type="text" maxLength={300} autoComplete="street-address" className={fieldClasses} />
      </Field>

      <Field label="Message" required>
        <textarea
          name="message"
          required
          minLength={5}
          maxLength={2000}
          rows={5}
          placeholder="How can we help?"
          className={cn(fieldClasses, "resize-y")}
        />
      </Field>

      {state.error && (
        <p role="alert" className="text-sm font-medium text-red-700">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className={cn(buttonVariants({ size: "lg" }), "h-12 w-full rounded-full text-base font-bold shadow-lg shadow-gold/25")}
      >
        {pending ? "Sending…" : "Send Message"}
        {!pending && <ArrowRight className="size-4" />}
      </button>
    </form>
  );
}
