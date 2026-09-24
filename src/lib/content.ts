import { cache } from "react";
import { faqCategories, type FaqCategory } from "@/data/faqs";
import type { Puppy, PuppyRow } from "@/data/puppies";
import type { Testimonial } from "@/data/testimonials";
import { createAnonClient } from "@/lib/supabase/anon";

// Public content, read with the anon key. Row Level Security hides sold puppies and unpublished testimonials.
// A failed read logs and returns an empty list so a database hiccup shows the pages' empty states instead of a crash.
async function load<T>(
  label: string,
  run: (db: NonNullable<ReturnType<typeof createAnonClient>>) => PromiseLike<{ data: T[] | null; error: { message: string } | null }>
): Promise<T[]> {
  const db = createAnonClient();
  if (!db) return [];
  const { data, error } = await run(db);
  if (error) {
    console.error(`${label}: load failed:`, error.message);
    return [];
  }
  return data ?? [];
}

export const getPuppies = cache(async (): Promise<Puppy[]> => {
  const rows = await load<PuppyRow>("puppies", (db) =>
    db
      .from("puppies")
      .select("id, name, price, gender, breed, status, image")
      .order("created_at", { ascending: false })
  );
  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    price: row.price,
    gender: row.gender,
    breed: row.breed,
    status: row.status === "reserved" ? "Reserved" : "Available",
    image: row.image,
  }));
});

export async function getPuppy(id: string) {
  return (await getPuppies()).find((puppy) => puppy.id === id);
}

// Newest first: the newest published review is the featured quote on /testimonials.
export const getTestimonials = cache(async (): Promise<Testimonial[]> =>
  load<Testimonial>("testimonials", (db) =>
    db
      .from("testimonials")
      .select("id, name, location, puppy, rating, quote")
      .order("created_at", { ascending: false })
  )
);

export async function getFaqs(): Promise<FaqCategory[]> {
  const rows = await load<{ category: string; question: string; answer: string }>("faq", (db) =>
    db
      .from("faq_items")
      .select("category, question, answer")
      .order("sort_order")
      .order("created_at")
  );

  return faqCategories
    .map(({ title, icon }) => ({
      title,
      icon,
      items: rows.filter((row) => row.category === title).map((row) => ({ q: row.question, a: row.answer })),
    }))
    .filter((category) => category.items.length > 0);
}
