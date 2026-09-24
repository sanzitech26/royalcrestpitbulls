// Puppies live in the Supabase `puppies` table and are managed from /admin (see src/lib/content.ts).

export const puppyStatuses = ["available", "reserved", "sold"] as const;
export type PuppyStatus = (typeof puppyStatuses)[number];

// A row of the `puppies` table
export type PuppyRow = {
  id: string;
  name: string;
  price: number;
  gender: "Male" | "Female";
  breed: string;
  status: PuppyStatus;
  image: string;
};

// What the public pages show. Sold puppies never reach them.
export type Puppy = {
  id: string;
  name: string;
  price: number;
  gender: "Male" | "Female";
  breed: string;
  status: "Available" | "Reserved";
  image: string;
};
