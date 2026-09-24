import { cn } from "@/lib/utils";

// Not imported from contact-form.tsx: that file is a client module, and these are used from server components.
export const fieldClasses =
  "w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm text-ink placeholder:text-ink/40 focus:border-gold focus:outline-none";

export function Field({
  label,
  hint,
  className,
  children,
}: {
  label: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1 block text-sm font-semibold text-ink">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-ink/60">{hint}</span>}
    </label>
  );
}

const tones = {
  green: "bg-green-100 text-green-800",
  amber: "bg-amber-100 text-amber-800",
  gold: "bg-gold/15 text-gold",
  gray: "bg-ink/10 text-ink/70",
};

export function Pill({ tone, children }: { tone: keyof typeof tones; children: React.ReactNode }) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", tones[tone])}>
      {children}
    </span>
  );
}

export const cardClasses = "rounded-2xl bg-white p-5 shadow-sm sm:p-6";
