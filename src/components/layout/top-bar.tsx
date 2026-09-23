import { Mail } from "lucide-react";
import { socials } from "@/components/layout/social-icons";
import { site } from "@/data/site";

export function TopBar() {
  return (
    <div className="bg-charcoal text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-2 text-xs">
        <div className="flex items-center gap-3">
          {socials.map(({ icon: Icon, label }) => (
            <a
              key={label}
              href="#"
              aria-label={label}
              className="text-white/90 transition-colors hover:text-gold-light"
            >
              <Icon className="size-3.5" />
            </a>
          ))}
        </div>

        <p className="hidden text-center tracking-widest text-gold-light uppercase md:block">
          Exceptional Bloodlines &bull; Family Raised &bull; Healthy Puppies
          &bull; A Lifetime Of Loyalty
        </p>

        <a
          href={`mailto:${site.supportEmail}`}
          className="flex items-center gap-1.5 text-white/90 transition-colors hover:text-gold-light"
        >
          <Mail className="size-3.5" />
          <span className="hidden sm:inline">{site.supportEmail}</span>
        </a>
      </div>
    </div>
  );
}
