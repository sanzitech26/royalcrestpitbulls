import { Clock, Mail } from "lucide-react";

// PLACEHOLDER contact details — replace with the real ones before launch. Every page reads them from here.
// (No phone number on the site by request; visitors reach the breeder by email and the contact forms.)
export const site = {
  email: "info@royalcrestpitbulls.com",
  supportEmail: "support@royalcrestpitbulls.com",
  hours: "Mon - Sat: 9AM - 7PM",
  sundayNote: "Sunday: By Appointment",
};

export const contactInfo = [
  { icon: Mail, label: "Email Us", value: site.email },
  { icon: Clock, label: "Our Hours", value: site.hours, extra: site.sundayNote },
];

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Available Puppies", href: "/available-puppies" },
  { label: "About Us", href: "/about" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Health Guarantee", href: "/health-guarantee" },
  { label: "Puppy Contract", href: "/puppy-contract" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];
