import Link from "next/link";
import { Crown } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ onDark, className }: { onDark?: boolean; className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <Crown className={cn("size-7", onDark ? "text-gold-light" : "text-gold")} />
      <span className="flex flex-col leading-tight">
        <span
          className={cn(
            "font-display text-lg font-bold tracking-wide",
            onDark ? "text-white" : "text-ink"
          )}
        >
          ROYALCREST
        </span>
        <span
          className={cn(
            "text-[11px] font-semibold tracking-[0.2em]",
            onDark ? "text-gold-light" : "text-gold"
          )}
        >
          PITBULLS
        </span>
      </span>
    </Link>
  );
}
