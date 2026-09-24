"use client";

import { startTransition, useActionState, useEffect, useRef } from "react";
import { buttonVariants } from "@/components/ui/button";
import type { FormState } from "@/lib/admin/form";
import { cn } from "@/lib/utils";

type Action = (previous: FormState, data: FormData) => Promise<FormState>;

const buttons = {
  primary: cn(buttonVariants({ size: "lg" }), "h-10 rounded-full px-6"),
  quiet: cn(
    buttonVariants({ variant: "outline", size: "sm" }),
    "rounded-full border-ink/25 bg-white px-3 text-ink hover:border-gold hover:bg-white hover:text-gold"
  ),
  danger: cn(buttonVariants({ size: "sm" }), "rounded-full bg-red-700 px-3 text-white hover:bg-red-800"),
};

// One form wrapper for every admin mutation: runs the server action, shows its error inline and keeps what was typed
// when the server says no.
export function AdminForm({
  action,
  submitLabel,
  tone = "primary",
  resetOnSuccess,
  className,
  children,
}: {
  action: Action;
  submitLabel: string;
  tone?: keyof typeof buttons;
  resetOnSuccess?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  const [state, run, pending] = useActionState<FormState, FormData>(action, {});
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok && resetOnSuccess) form.current?.reset();
  }, [state, resetOnSuccess]);

  return (
    <form
      ref={form}
      // submitted from onSubmit, not the `action` prop: React resets the form after an action runs, which would throw
      // away the admin's edits whenever validation fails
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        startTransition(() => run(data));
      }}
      className={cn(tone === "primary" ? "space-y-4" : "flex flex-wrap items-center gap-2", className)}
    >
      {children}
      <button type="submit" disabled={pending} className={buttons[tone]}>
        {pending ? "Working…" : submitLabel}
      </button>
      {state.error && (
        <p role="alert" className="w-full text-sm font-medium text-red-700">
          {state.error}
        </p>
      )}
      {state.ok && tone === "primary" && !pending && (
        <p role="status" className="w-full text-sm font-medium text-green-700">
          Saved.
        </p>
      )}
    </form>
  );
}
