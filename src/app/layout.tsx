import type { Metadata } from "next";
import { Inter, Playfair_Display, Dancing_Script } from "next/font/google";
import { TopBar } from "@/components/layout/top-bar";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SiteShell } from "@/components/layout/site-shell";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  variable: "--font-script",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RoyalCrest Pitbulls",
  description:
    "Exceptional bloodlines, family raised, healthy puppies, a lifetime of loyalty.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${dancingScript.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <SiteShell topBar={<TopBar />} navbar={<Navbar />} footer={<Footer />}>
          {children}
        </SiteShell>
      </body>
    </html>
  );
}
