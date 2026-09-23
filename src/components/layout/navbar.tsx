"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { navLinks } from "@/data/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-cream">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <Logo />

        <nav className="hidden items-center gap-6 xl:flex">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-gold",
                  active ? "border-b-2 border-gold text-ink" : "text-ink/80"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/available-puppies"
            className={cn(buttonVariants(), "hidden rounded-full sm:inline-flex")}
          >
            View Available Puppies
            <ArrowRight className="size-4" />
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              aria-label="Open menu"
              className="flex size-10 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-gold hover:text-gold xl:hidden"
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="bg-cream">
              <SheetTitle className="px-6 pt-6 font-display text-xl font-bold text-ink">
                Menu
              </SheetTitle>
              <nav className="flex flex-col px-6">
                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "border-b border-ink/10 py-3 text-base font-medium transition-colors hover:text-gold",
                        active ? "text-gold" : "text-ink"
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
              <div className="mt-auto p-6">
                <Link
                  href="/available-puppies"
                  onClick={() => setOpen(false)}
                  className={cn(buttonVariants({ size: "lg" }), "w-full rounded-full")}
                >
                  View Available Puppies
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
