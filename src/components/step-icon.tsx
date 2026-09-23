import { type LucideIcon } from "lucide-react";
import { IconCircle } from "@/components/ui/icon-circle";
import { cn } from "@/lib/utils";

export function StepIcon({
  icon,
  index,
  onDark,
}: {
  icon: LucideIcon;
  index: number;
  onDark?: boolean;
}) {
  return (
    <span className="relative z-10 shrink-0">
      <IconCircle
        icon={icon}
        className={cn(onDark ? "border-gold-light/40 bg-charcoal text-gold-light" : "bg-cream")}
      />
      <span className="absolute -top-1.5 -left-1.5 flex size-5 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-charcoal">
        {index}
      </span>
    </span>
  );
}
