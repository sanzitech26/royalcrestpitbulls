import Link from "next/link";
import { ArrowRight, ArrowUp, Clock, Mail } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { socials } from "@/components/layout/social-icons";
import { Button } from "@/components/ui/button";
import { IconCircle } from "@/components/ui/icon-circle";
import { navLinks, site } from "@/data/site";

const pick = (...hrefs: string[]) => navLinks.filter((l) => hrefs.includes(l.href));

const columns = [
  {
    title: "Explore",
    links: pick("/", "/available-puppies", "/about"),
  },
  {
    title: "Support",
    links: pick("/testimonials", "/health-guarantee", "/contract", "/faq", "/contact"),
  },
];

const contact = [
  { icon: Mail, text: site.email, href: `mailto:${site.email}` },
  { icon: Clock, text: site.hours, extra: site.sundayNote },
];

const headingClasses = "text-xs font-bold tracking-[0.2em] text-gold-light uppercase";
const linkClasses = "transition-colors hover:text-gold-light";

// ponytail: /privacy and /terms don't exist yet, so those two links 404 until the pages are written
export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-charcoal text-white">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:py-16">
        {/* ponytail: markup only, no subscribers table yet (same as the contact form). A <div>, not a <form>, so Enter can't submit and reload the page. Swap for a <form action> once there's a backend. */}
        <div className="flex flex-col gap-6 rounded-2xl border border-gold-light/30 bg-white/5 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div className="max-w-md">
            <h2 className="font-display text-2xl font-bold">
              Be the first to meet our <span className="text-gold-light">next litter.</span>
            </h2>
            <p className="mt-2 text-sm text-white/60">
              Litter announcements and available puppies, straight to your inbox.
            </p>
          </div>
          <div role="group" aria-label="Newsletter signup" className="flex w-full flex-col gap-3 sm:flex-row lg:max-w-md">
            <label htmlFor="footer-email" className="sr-only">
              Email address
            </label>
            <input
              id="footer-email"
              type="email"
              autoComplete="email"
              placeholder="Your email address"
              className="h-10 min-w-0 rounded-full sm:flex-1 border border-white/15 bg-white/5 px-5 text-sm text-white placeholder:text-white/40 focus:border-gold-light focus:outline-none"
            />
            <Button type="button" size="lg" className="h-10 rounded-full px-6">
              Subscribe
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.9fr_0.9fr_1.5fr]">
          <div>
            <Logo onDark />
            <p className="mt-5 max-w-xs text-sm text-white/60">
              Raising healthy, well-tempered American Pitbulls with exceptional
              bloodlines for loving families, and standing behind every puppy
              for life.
            </p>
            {/* ponytail: socials point at # until real profile URLs exist (same as the top bar) */}
            <div className="mt-6 flex items-center gap-3">
              {socials.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-gold-light hover:text-gold-light"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map(({ title, links }) => (
            <nav key={title} aria-label={title}>
              <h3 className={headingClasses}>{title}</h3>
              <ul className="mt-5 space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={`text-sm text-white/70 ${linkClasses}`}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h3 className={headingClasses}>Get In Touch</h3>
            <ul className="mt-5 space-y-4">
              {contact.map(({ icon, text, href, extra }) => (
                <li key={text} className="flex items-center gap-3">
                  <IconCircle icon={icon} size="sm" className="border-gold-light/40 text-gold-light" />
                  <div className="min-w-0 text-sm">
                    {href ? (
                      <a href={href} className={`break-words text-white ${linkClasses}`}>
                        {text}
                      </a>
                    ) : (
                      <p className="text-white">{text}</p>
                    )}
                    {extra && <p className="text-xs text-white/50">{extra}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-5 text-xs text-white/50 md:flex-row md:justify-between">
          <p>&copy; {new Date().getFullYear()} RoyalCrest Pitbulls. All rights reserved.</p>
          <nav aria-label="Legal" className="flex items-center gap-6">
            <Link href="/privacy" className={linkClasses}>
              Privacy Policy
            </Link>
            <Link href="/terms" className={linkClasses}>
              Terms of Service
            </Link>
          </nav>
          {/* href="#" is the native jump-to-top: no JS, and no smooth-scroll so reduced-motion users aren't animated */}
          <a href="#" className={`inline-flex items-center gap-2 tracking-widest uppercase ${linkClasses}`}>
            Back to top
            <span className="flex size-8 items-center justify-center rounded-full border border-white/15">
              <ArrowUp className="size-4" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
