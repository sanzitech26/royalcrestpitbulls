import Link from "next/link";
import { Crown, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/", active: true },
  { label: "Available Puppies", href: "/available-puppies" },
  { label: "Our Dogs", href: "/our-dogs" },
  { label: "Bloodlines", href: "/bloodlines" },
  { label: "About Us", href: "/about" },
  { label: "Health Guarantee", href: "/health-guarantee" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-cream">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Crown className="size-7 text-gold" />
          <span className="flex flex-col leading-tight">
            <span className="font-display text-lg font-bold tracking-wide text-ink">
              ROYALCREST
            </span>
            <span className="text-[11px] font-semibold tracking-[0.2em] text-gold">
              PITBULLS
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-gold ${
                link.active
                  ? "border-b-2 border-gold text-ink"
                  : "text-ink/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/available-puppies"
          className={cn(buttonVariants(), "hidden rounded-full sm:inline-flex")}
        >
          View Available Puppies
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </header>
  );
}
