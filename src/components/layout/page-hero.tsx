import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { Crown } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

type Crumb = { label: string; href?: string };

// Home is implicit; the last crumb is the current page.
export function PageHero({
  title,
  description,
  crumbs,
  image,
  imageAlt = "",
  imagePosition = "object-[50%_40%]",
}: {
  title: string;
  description: string;
  crumbs: Crumb[];
  image?: string;
  imageAlt?: string;
  imagePosition?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-charcoal">
      {image && (
        <div className="absolute inset-y-0 right-0 hidden w-3/5 lg:block">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="60vw"
            className={cn("object-cover", imagePosition)}
          />
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-charcoal to-transparent" />
        </div>
      )}

      {!image && (
        <Crown className="pointer-events-none absolute top-1/2 right-10 hidden size-48 -translate-y-1/2 text-white/5 lg:block" />
      )}

      <div className={cn("relative mx-auto max-w-7xl px-6", image ? "py-12 lg:py-24" : "py-10 lg:py-14")}>
        <div className="max-w-xl">
          {image && (
            <div className="relative mb-8 aspect-[4/3] w-full overflow-hidden rounded-2xl lg:hidden">
              <Image
                src={image}
                alt={imageAlt}
                fill
                sizes="100vw"
                className={cn("object-cover", imagePosition)}
              />
            </div>
          )}

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
              {crumbs.map(({ label, href }) => (
                <Fragment key={label}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {href ? (
                      <BreadcrumbLink
                        render={<Link href={href} />}
                        className="text-gold-light hover:text-white"
                      >
                        {label}
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage className="text-white">{label}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                </Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="mt-6 font-display text-4xl leading-[1.1] font-bold text-balance text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-md text-white/70">{description}</p>
          <span className="mt-8 block h-0.5 w-20 rounded-full bg-gold-light" />
        </div>
      </div>
    </section>
  );
}
