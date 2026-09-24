import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function NoPuppies() {
  return (
    <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
      <p className="font-display text-2xl font-bold text-ink">New puppies are on the way</p>
      <p className="mx-auto mt-2 max-w-md text-ink/70">
        All of our puppies have found homes for now. Get in touch and we&rsquo;ll let you know as soon as the next
        litter is ready.
      </p>
      <Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "mt-6 rounded-full px-6")}>
        Join the Waitlist
        <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}
