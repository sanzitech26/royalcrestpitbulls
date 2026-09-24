"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CircleQuestionMark,
  ExternalLink,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  PawPrint,
  Quote,
  Signature,
} from "lucide-react";
import { logout } from "@/app/admin/login/actions";
import { Logo } from "@/components/layout/logo";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/inquiries", label: "Inquiries", icon: Inbox },
  { href: "/admin/puppies", label: "Puppies", icon: PawPrint },
  { href: "/admin/testimonials", label: "Testimonials", icon: Quote },
  { href: "/admin/faqs", label: "FAQs", icon: CircleQuestionMark },
  { href: "/admin/signatures", label: "Contract signatures", icon: Signature },
];

function Nav({ newInquiries, onNavigate }: { newInquiries: number; onNavigate?: () => void }) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/admin" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav className="flex flex-col gap-1">
      {links.map(({ href, label, icon: Icon }) => {
        const active = isActive(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              active ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
            )}
          >
            <Icon className={cn("size-4", active && "text-gold-light")} />
            {label}
            {href === "/admin/inquiries" && newInquiries > 0 && (
              <span className="ml-auto rounded-full bg-gold px-2 py-0.5 text-xs font-semibold text-white">
                {newInquiries}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}

function Account({ email }: { email?: string }) {
  return (
    <div className="space-y-3 border-t border-white/10 pt-4">
      <Link
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
      >
        <ExternalLink className="size-4" />
        View website
      </Link>
      {email && <p className="truncate text-xs text-white/50">{email}</p>}
      <form action={logout}>
        <button
          type="submit"
          className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
        >
          <LogOut className="size-4" />
          Sign out
        </button>
      </form>
    </div>
  );
}

export function AdminShell({
  email,
  newInquiries,
  children,
}: {
  email?: string;
  newInquiries: number;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[16rem_minmax(0,1fr)] print:block">
      <aside className="sticky top-0 hidden h-screen flex-col bg-charcoal p-5 text-white lg:flex print:hidden">
        <Logo onDark href="/admin" />
        <p className="mt-1 text-[11px] font-semibold tracking-[0.2em] text-white/50 uppercase">Admin</p>
        <div className="mt-8 flex-1 overflow-y-auto">
          <Nav newInquiries={newInquiries} />
        </div>
        <Account email={email} />
      </aside>

      <div className="min-w-0">
        <header className="sticky top-0 z-40 flex items-center justify-between bg-charcoal px-4 py-3 lg:hidden print:hidden">
          <Logo onDark href="/admin" />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              aria-label="Open menu"
              className="flex size-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-gold-light hover:text-gold-light"
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="left" className="bg-charcoal p-5 text-white">
              <SheetTitle className="font-display text-xl font-bold text-white">Admin menu</SheetTitle>
              <div className="flex-1 overflow-y-auto">
                <Nav newInquiries={newInquiries} onNavigate={() => setOpen(false)} />
              </div>
              <Account email={email} />
            </SheetContent>
          </Sheet>
        </header>

        <main className="px-4 py-8 sm:px-8 lg:px-10 lg:py-10 print:p-0">{children}</main>
      </div>
    </div>
  );
}
