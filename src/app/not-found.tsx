import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center bg-cream">
      <div className="mx-auto max-w-7xl px-6 py-24 text-center">
        <Eyebrow className="justify-center">Error 404</Eyebrow>
        <h1 className="mt-3 font-display text-4xl font-bold text-ink sm:text-5xl">
          This page <span className="text-gold">wandered off.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-md text-ink/70">
          We couldn&rsquo;t find what you were looking for, but our puppies are
          right where you left them.
        </p>
        <Link
          href="/available-puppies"
          className={cn(buttonVariants({ size: "lg" }), "mt-8 rounded-full px-6")}
        >
          View Available Puppies
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
