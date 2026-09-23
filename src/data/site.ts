import { Clock, Mail, Phone } from "lucide-react";

// PLACEHOLDER contact details — replace with the real ones before launch. Every page reads them from here.
export const site = {
  phone: "+1 (555) 123-4567",
  email: "info@royalcrestpitbulls.com",
  supportEmail: "support@royalcrestpitbulls.com",
  hours: "Mon - Sat: 9AM - 7PM",
  sundayNote: "Sunday: By Appointment",
};

export const contactInfo = [
  { icon: Phone, label: "Call Us", value: site.phone },
  { icon: Mail, label: "Email Us", value: site.email },
  { icon: Clock, label: "Our Hours", value: site.hours, extra: site.sundayNote },
];

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Available Puppies", href: "/available-puppies" },
  { label: "About Us", href: "/about" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Health Guarantee", href: "/health-guarantee" },
  { label: "Contract", href: "/contract" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];
