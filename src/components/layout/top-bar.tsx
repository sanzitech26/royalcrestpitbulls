import { Mail } from "lucide-react";

// lucide-react dropped brand/logo glyphs, so the four socials are small inline SVGs.
function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.25-1.5 1.53-1.5H16.7V3.7C16.4 3.66 15.44 3.58 14.32 3.58c-2.34 0-3.94 1.43-3.94 4.04V9.9H7.66V13h2.72v8h3.12Z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 8.2s-.2-1.55-.83-2.23c-.8-.87-1.7-.87-2.1-.92C16.2 4.8 12 4.8 12 4.8h-.02s-4.2 0-7.07.25c-.4.05-1.3.05-2.1.92C2.2 6.65 2 8.2 2 8.2S1.8 10 1.8 11.8v1.4c0 1.8.2 3.6.2 3.6s.2 1.55.83 2.23c.8.87 1.85.84 2.3.93 1.67.16 7.07.25 7.07.25s4.2-.01 7.07-.26c.4-.05 1.3-.05 2.1-.92.63-.68.83-2.23.83-2.23s.2-1.8.2-3.6v-1.4c0-1.8-.2-3.6-.2-3.6ZM9.98 15.02V8.98L15.5 12l-5.52 3.02Z" />
    </svg>
  );
}

function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16.6 5.82c-.9-.98-1.4-2.26-1.4-3.57h-3.15v13.4a3.03 3.03 0 1 1-2.13-2.9V9.5a6.18 6.18 0 1 0 5.28 6.11V9.28a8.16 8.16 0 0 0 4.75 1.52V7.67c-1.24 0-2.4-.4-3.35-1.18v-.67Z" />
    </svg>
  );
}

const socials = [
  { icon: FacebookIcon, label: "Facebook" },
  { icon: InstagramIcon, label: "Instagram" },
  { icon: TikTokIcon, label: "TikTok" },
  { icon: YoutubeIcon, label: "YouTube" },
];

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
          href="mailto:support@royalcrestpitbulls.com"
          className="flex items-center gap-1.5 text-white/90 transition-colors hover:text-gold-light"
        >
          <Mail className="size-3.5" />
          <span className="hidden sm:inline">support@royalcrestpitbulls.com</span>
        </a>
      </div>
    </div>
  );
}
