// Placeholder inventory — names, prices, and photos are invented.
// Swap for real puppies (and a Supabase query, once that table exists) before launch.

export type Puppy = {
  id: string;
  name: string;
  price: number;
  gender: "Male" | "Female";
  ageWeeks: number;
  breed: string;
  color: string;
  status: "Available";
  image: string;
};

export const puppies: Puppy[] = [
  { id: "kobe", name: "Kobe", price: 900, gender: "Male", ageWeeks: 12, breed: "Pitbull", color: "Fawn", status: "Available", image: "/images/puppies/kobe.jpg" },
  { id: "luna", name: "Luna", price: 850, gender: "Female", ageWeeks: 10, breed: "Pitbull", color: "Fawn", status: "Available", image: "/images/puppies/luna.jpg" },
  { id: "zeus", name: "Zeus", price: 950, gender: "Male", ageWeeks: 14, breed: "Pitbull", color: "Chocolate", status: "Available", image: "/images/puppies/zeus.jpg" },
  { id: "bella", name: "Bella", price: 875, gender: "Female", ageWeeks: 11, breed: "Pitbull", color: "Black", status: "Available", image: "/images/puppies/bella.jpg" },
  { id: "titan", name: "Titan", price: 900, gender: "Male", ageWeeks: 13, breed: "Pitbull", color: "Blue & White", status: "Available", image: "/images/puppies/titan.jpg" },
  { id: "rosie", name: "Rosie", price: 825, gender: "Female", ageWeeks: 9, breed: "Pitbull", color: "Cream", status: "Available", image: "/images/puppies/rosie.jpg" },
  { id: "duke", name: "Duke", price: 925, gender: "Male", ageWeeks: 12, breed: "Pitbull", color: "Chocolate", status: "Available", image: "/images/puppies/duke.jpg" },
  { id: "mia", name: "Mia", price: 800, gender: "Female", ageWeeks: 10, breed: "Pitbull", color: "Blue & White", status: "Available", image: "/images/puppies/mia.jpg" },
];
