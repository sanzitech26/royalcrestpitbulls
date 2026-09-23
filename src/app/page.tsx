import { TopBar } from "@/components/layout/top-bar";
import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { StatsBar } from "@/components/sections/stats-bar";
import { AvailablePuppies } from "@/components/sections/available-puppies";
import { RoyalCrestStandard } from "@/components/sections/royalcrest-standard";
import { BreedingPhilosophy } from "@/components/sections/breeding-philosophy";
import { ContactShipping } from "@/components/sections/contact-shipping";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <TopBar />
      <Navbar />
      <Hero />
      <StatsBar />
      <AvailablePuppies />
      <RoyalCrestStandard />
      <BreedingPhilosophy />
      <ContactShipping />
    </div>
  );
}
