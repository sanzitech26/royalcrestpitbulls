import type { Metadata } from "next";
import { AboutHero } from "@/components/sections/about-hero";
import { AboutStory } from "@/components/sections/about-story";
import { AboutDifference } from "@/components/sections/about-difference";
import { AboutProgram } from "@/components/sections/about-program";
import { AboutCommitment } from "@/components/sections/about-commitment";

export const metadata: Metadata = {
  title: "About Us | RoyalCrest Pitbulls",
  description:
    "A small, passionate breeder raising healthy, well-socialized American Pitbulls for families across the world.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <AboutDifference />
      <AboutProgram />
      <AboutCommitment />
    </>
  );
}
