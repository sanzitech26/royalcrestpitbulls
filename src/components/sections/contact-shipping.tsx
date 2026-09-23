import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Home, MapPin, Plane, Truck } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { StepIcon } from "@/components/step-icon";
import { buttonVariants } from "@/components/ui/button";
import { IconCircle } from "@/components/ui/icon-circle";
import { contactInfo } from "@/data/site";
import { cn } from "@/lib/utils";

const shippingSteps = [
  {
    icon: Calendar,
    title: "Preparation",
    description: "Health checks, vaccinations, and travel documents are completed before departure.",
  },
  {
    icon: Truck,
    title: "Safe Transport",
    description: "Your puppy travels in a comfortable, climate-controlled environment with experienced handlers.",
  },
  {
    icon: MapPin,
    title: "Real-Time Updates",
    description: "We keep you informed throughout the journey with tracking details and updates.",
  },
  {
    icon: Home,
    title: "Home Delivery",
    description: "Your puppy arrives safely at your doorstep, ready to become part of your family.",
  },
];

export function ContactShipping() {
  return (
    <section className="grid lg:grid-cols-2">
      <div className="flex flex-col gap-10 bg-cream px-6 py-16 sm:px-10 lg:py-20">
        <div className="grid gap-10 sm:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <p className="text-sm font-semibold tracking-[0.25em] text-gold uppercase">
                Get In Touch
              </p>
              <span className="h-px w-10 bg-gold/40" />
            </div>
            <h2 className="mt-3 font-display text-4xl font-bold text-ink sm:text-5xl">
              We&rsquo;re Here to <span className="text-gold">Help.</span>
            </h2>
            <p className="mt-4 text-ink/70">
              Have questions about our puppies, breeding program, or
              shipping? Send us a message and we&rsquo;ll get back to you as
              soon as possible.
            </p>

            <ContactForm className="mt-8" />
          </div>

          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
            <Image
              src="/images/contact-puppy.jpg"
              alt="RoyalCrest Pitbulls puppy"
              fill
              className="object-cover"
            />
            <p className="font-script absolute top-5 right-5 -rotate-3 text-right text-2xl leading-7 text-white drop-shadow-sm">
              Questions?
              <br />
              We&rsquo;re Here.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6 border-t border-ink/10 pt-8 sm:flex-row sm:flex-wrap sm:gap-6">
          {contactInfo.map(({ icon, label, value, extra }) => (
            <div key={label} className="flex items-center gap-3">
              <IconCircle icon={icon} size="sm" />
              <div>
                <p className="text-sm font-semibold text-ink">{label}</p>
                <p className="text-xs text-ink/60">{value}</p>
                {extra && <p className="text-xs text-ink/60">{extra}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden bg-charcoal px-6 py-16 sm:px-10 lg:py-20">
        <Image
          src="/images/shipping-cargo.jpg"
          alt="Cargo plane being loaded for pet transport"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/85 lg:bg-transparent lg:bg-gradient-to-r lg:from-charcoal lg:via-charcoal/90 lg:to-charcoal/20" />

        <p className="font-script absolute top-8 right-6 hidden text-right text-2xl leading-7 text-white/80 sm:block">
          From
          <br />
          Our Home
          <br />
          To Yours
        </p>

        <div className="relative">
          <div className="flex items-center gap-3">
            <p className="text-sm font-semibold tracking-[0.25em] text-gold uppercase">
              Shipping &amp; Delivery
            </p>
            <span className="h-px w-10 bg-gold-light/40" />
          </div>
          <h2 className="mt-3 max-w-md font-display text-4xl font-bold text-white sm:text-5xl">
            A Safe Journey to <span className="text-gold-light">Their New Home.</span>
          </h2>
          <p className="mt-4 max-w-md text-white/70">
            We work with trusted, pet-friendly transport partners to ensure
            your puppy arrives safely, comfortably, and on time &mdash; no
            matter where you are.
          </p>

          <div className="relative mt-10 space-y-8">
            <div className="absolute top-6 bottom-6 left-6 w-px bg-white/15" />
            {shippingSteps.map(({ icon, title, description }, i) => (
              <div key={title} className="relative flex items-start gap-4">
                <StepIcon icon={icon} index={i + 1} onDark />
                <div className="pt-2.5">
                  <h3 className="font-semibold text-white">{title}</h3>
                  <p className="mt-1 max-w-sm text-sm text-white/60">{description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 max-w-xs rounded-2xl border border-gold-light/30 bg-white/5 p-6">
            <div className="flex items-center gap-3">
              <IconCircle icon={Plane} size="sm" className="border-gold-light/40 text-gold-light" />
              <p className="font-semibold text-white">Worldwide Shipping</p>
            </div>
            <p className="mt-2 text-sm text-white/60">
              We deliver our puppies safely to families across the U.S. and
              international locations.
            </p>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "mt-4 w-full rounded-full border-transparent bg-white px-6 text-ink hover:bg-white/90"
              )}
            >
              Learn More About Shipping
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
