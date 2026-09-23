import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";

type Action = { label: string; href: string };

export function CtaBand({
  eyebrow,
  title,
  highlight,
  description,
  primary,
  secondary,
}: {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  primary: Action;
  secondary?: Action;
}) {
  return (
    <section className="bg-charcoal">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 py-16 text-center lg:flex-row lg:justify-between lg:py-20 lg:text-left">
        <div>
          <Eyebrow className="justify-center text-gold-light lg:justify-start">{eyebrow}</Eyebrow>
          <h2 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">
            {title} <span className="text-gold-light">{highlight}</span>
          </h2>
          <p className="mt-4 max-w-xl text-white/70">{description}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <Link
            href={primary.href}
            className={cn(buttonVariants({ size: "lg" }), "rounded-full px-6")}
          >
            {primary.label}
            <ArrowRight className="size-4" />
          </Link>
          {secondary && (
            <Link
              href={secondary.href}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-full border-transparent bg-white px-6 text-ink hover:bg-white/90"
              )}
            >
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
