import { cn } from "@/lib/utils";

// Colour comes from className (default gold; dark sections pass text-gold-light); the rule inherits it.
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3 text-gold", className)}>
      <p className="text-sm font-semibold tracking-[0.25em] uppercase">{children}</p>
      <span className="h-px w-10 bg-current opacity-40" />
    </div>
  );
}
