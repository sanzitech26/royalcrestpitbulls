"use client";

import { usePathname } from "next/navigation";

// The public header, footer and top bar are rendered by the root layout; admin routes bring their own chrome.
export function SiteShell({
  topBar,
  navbar,
  footer,
  children,
}: {
  topBar: React.ReactNode;
  navbar: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}) {
  if (usePathname().startsWith("/admin")) return children;

  return (
    <>
      {topBar}
      {navbar}
      <main className="flex-1">{children}</main>
      {footer}
    </>
  );
}
