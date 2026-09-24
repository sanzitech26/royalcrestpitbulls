// Testimonials live in the Supabase `testimonials` table and are managed from /admin (see src/lib/content.ts).

export type Testimonial = {
  id: string;
  name: string;
  location: string;
  puppy: string;
  rating: number;
  quote: string;
};
