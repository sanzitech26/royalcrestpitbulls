import Image from "next/image";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const alt = "RoyalCrest Pitbulls puppy tilting its head";

// ponytail: reference shows a ROYALCREST stone sign in the photo — skipped, no matching asset
export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-charcoal">
      {/* desktop: photo fills the right 60% and fades into the charcoal; mobile uses the inline copy below (same split as the home Hero) */}
      <div className="absolute inset-y-0 right-0 hidden w-3/5 lg:block">
        <Image
          src="/images/about/hero.jpg"
          alt={alt}
          fill
          sizes="60vw"
          className="object-cover object-[50%_40%]"
        />
        <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-charcoal to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-12 lg:py-28">
        <div className="max-w-xl">
          <div className="relative mb-8 aspect-[4/3] w-full overflow-hidden rounded-2xl lg:hidden">
            <Image src="/images/about/hero.jpg" alt={alt} fill sizes="100vw" className="object-cover" />
          </div>

          <Breadcrumb>
            <BreadcrumbList className="text-white/60">
              <BreadcrumbItem>
                <BreadcrumbLink
                  render={<Link href="/" />}
                  className="text-gold-light hover:text-white"
                >
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white">About Us</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="mt-6 font-display text-4xl leading-[1.1] font-bold text-white sm:text-5xl lg:text-6xl">
            About RoyalCrest Pitbulls
          </h1>
          <p className="mt-5 max-w-md text-white/70">
            A small, passionate breeder raising healthy, well-socialized
            American Pitbulls for families across the world.
          </p>
          <span className="mt-8 block h-0.5 w-20 rounded-full bg-gold-light" />
        </div>
      </div>
    </section>
  );
}
