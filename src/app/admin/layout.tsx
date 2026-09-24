import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | RoyalCrest Pitbulls",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return children;
}
