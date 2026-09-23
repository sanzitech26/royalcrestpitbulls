import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/data/testimonials";

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

export function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <div role="img" aria-label={`${rating} out of 5 stars`} className={cn("flex gap-0.5 text-gold", className)}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={cn("size-4", i < rating ? "fill-current" : "opacity-25")} />
      ))}
    </div>
  );
}

export function TestimonialCard({
  testimonial: { name, location, puppy, rating, quote },
  onDark,
  className,
}: {
  testimonial: Testimonial;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "flex flex-col rounded-2xl p-6",
        onDark ? "border border-white/10 bg-white/5" : "bg-white shadow-sm",
        className
      )}
    >
      <Stars rating={rating} className={onDark ? "text-gold-light" : undefined} />

      <blockquote className={cn("mt-4 flex-1", onDark ? "text-white/80" : "text-ink/80")}>
        &ldquo;{quote}&rdquo;
      </blockquote>

      <figcaption
        className={cn(
          "mt-6 flex items-center gap-3 border-t pt-5",
          onDark ? "border-white/10" : "border-ink/10"
        )}
      >
        <span
          aria-hidden
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-full border font-display text-sm font-bold",
            onDark
              ? "border-gold-light/40 bg-charcoal text-gold-light"
              : "border-gold/40 bg-cream text-gold"
          )}
        >
          {initials(name)}
        </span>
        <div>
          <p className={cn("text-sm font-semibold", onDark ? "text-white" : "text-ink")}>{name}</p>
          <p className={cn("text-xs", onDark ? "text-white/60" : "text-ink/60")}>
            {location} &middot; Adopted {puppy}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}
