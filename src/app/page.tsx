import { Hero } from "@/components/sections/hero";
import { StatsBar } from "@/components/sections/stats-bar";
import { AvailablePuppies } from "@/components/sections/available-puppies";
import { RoyalCrestStandard } from "@/components/sections/royalcrest-standard";
import { BreedingPhilosophy } from "@/components/sections/breeding-philosophy";
import { TestimonialsPreview } from "@/components/sections/testimonials-preview";
import { ContactShipping } from "@/components/sections/contact-shipping";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <AvailablePuppies />
      <RoyalCrestStandard />
      <BreedingPhilosophy />
      <TestimonialsPreview />
      <ContactShipping />
    </>
  );
}
