import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function IconCircle({
  icon: Icon,
  size = "md",
  className,
}: {
  icon: LucideIcon;
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold",
        size === "md" ? "size-12" : "size-9",
        className
      )}
    >
      <Icon className={size === "md" ? "size-5" : "size-4"} />
    </span>
  );
}
