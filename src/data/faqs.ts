import { Dna, Heart, Home, CreditCard, PawPrint, Plane, type LucideIcon } from "lucide-react";

// The questions live in the Supabase `faq_items` table and are managed from /admin. The categories (order and icons)
// stay here; an item's `category` must match one of these titles. Add a category here to make it available in /admin.
export const faqCategories: { title: string; icon: LucideIcon }[] = [
  { title: "About Our Puppies", icon: PawPrint },
  { title: "Health & Care", icon: Heart },
  { title: "Breeding & Bloodlines", icon: Dna },
  { title: "Reservations & Purchase", icon: CreditCard },
  { title: "Shipping & Delivery", icon: Plane },
  { title: "After You Bring Your Puppy Home", icon: Home },
];

export type FaqCategory = {
  title: string;
  icon: LucideIcon;
  items: { q: string; a: string }[];
};
