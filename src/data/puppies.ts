// Puppies live in the Supabase `puppies` table and are managed from /admin (see src/lib/content.ts).

export const puppyStatuses = ["available", "reserved", "sold"] as const;
export type PuppyStatus = (typeof puppyStatuses)[number];

// A row of the `puppies` table
export type PuppyRow = {
  id: string;
  name: string;
  price: number;
  gender: "Male" | "Female";
  date_of_birth: string;
  breed: string;
  color: string;
  status: PuppyStatus;
  image: string;
};

// What the public pages show. Sold puppies never reach them.
export type Puppy = {
  id: string;
  name: string;
  price: number;
  gender: "Male" | "Female";
  ageWeeks: number;
  breed: string;
  color: string;
  status: "Available" | "Reserved";
  image: string;
};

export const weeksOld = (dateOfBirth: string) =>
  Math.max(0, Math.floor((Date.now() - new Date(dateOfBirth).getTime()) / (7 * 24 * 60 * 60 * 1000)));
