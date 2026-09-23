import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";

const alt = "RoyalCrest Pitbulls puppy resting on gravel at sunset";

export function AboutCommitment() {
  return (
    <section className="relative overflow-hidden bg-charcoal">
      {/* mirrored so the puppy's face lands on the clear right side of the fade; mobile uses the inline copy below */}
      <div className="absolute inset-y-0 right-0 hidden w-3/5 lg:block">
        <Image
          src="/images/about/commitment.jpg"
          alt={alt}
          fill
          sizes="60vw"
          className="-scale-x-100 object-cover object-[50%_40%]"
        />
        <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-charcoal to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="max-w-xl">
          <div className="relative mb-8 aspect-[4/3] w-full overflow-hidden rounded-2xl lg:hidden">
            <Image src="/images/about/commitment.jpg" alt={alt} fill sizes="100vw" className="object-cover" />
          </div>

          <Eyebrow className="text-gold-light">Our Commitment</Eyebrow>
          <h2 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">
            Lifelong Support
            <br />
            for Every Family.
          </h2>
          <p className="mt-4 max-w-md text-white/70">
            Our relationship doesn&rsquo;t end when your puppy goes home. We
            offer ongoing support, advice, and guidance to ensure you and your
            RoyalCrest companion have a happy, healthy life together.
          </p>
          <Link
            href="/contact"
            className={cn(buttonVariants({ size: "lg" }), "mt-8 rounded-full px-6")}
          >
            Get in Touch
            <ArrowRight className="size-4" />
          </Link>

          {/* ponytail: reference overlays this on the photo; here it sits over the puppy's face and is unreadable, so it lives in the text column */}
          <p className="mt-10 max-w-xs font-script text-3xl leading-9 text-gold-light">
            &ldquo;Once a RoyalCrest puppy, always part of our family.&rdquo;
            <Heart className="ml-1.5 inline size-5" />
          </p>
          <span className="mt-3 block h-px w-24 bg-gold-light/50" />
        </div>
      </div>
    </section>
  );
}
