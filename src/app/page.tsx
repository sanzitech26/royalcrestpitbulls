import { TopBar } from "@/components/layout/top-bar";
import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { StatsBar } from "@/components/sections/stats-bar";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <TopBar />
      <Navbar />
      <Hero />
      <StatsBar />
    </div>
  );
}
