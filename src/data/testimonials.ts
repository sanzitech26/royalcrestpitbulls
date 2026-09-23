// PLACEHOLDER testimonials — the reviewers and quotes below are INVENTED to lay out the design.
// Replace them with real customer reviews (with permission) before launch; do not publish fabricated reviews as real.

export type Testimonial = {
  id: string;
  name: string;
  location: string;
  puppy: string;
  rating: number;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "marcus",
    name: "Marcus T.",
    location: "Atlanta, GA",
    puppy: "Kobe",
    rating: 5,
    quote:
      "From the first message to the day Kobe came home, everything was honest and easy. He was healthy, confident and already used to people. Best decision we've made as a family.",
  },
  {
    id: "jennifer",
    name: "Jennifer & Dave R.",
    location: "Austin, TX",
    puppy: "Luna",
    rating: 5,
    quote:
      "Luna arrived with her vet records, a feeding guide and a blanket that smelled like her littermates. You can tell these puppies are raised with real love.",
  },
  {
    id: "aaliyah",
    name: "Aaliyah M.",
    location: "Houston, TX",
    puppy: "Zeus",
    rating: 5,
    quote:
      "Zeus is gentle with my kids and full of personality. RoyalCrest still checks in months later. That kind of support is rare.",
  },
  {
    id: "chris",
    name: "Chris L.",
    location: "Denver, CO",
    puppy: "Titan",
    rating: 5,
    quote:
      "I researched breeders for a long time. Seeing the pedigree and meeting the parents sold me, and Titan has been everything they promised.",
  },
  {
    id: "priya",
    name: "Priya S.",
    location: "Toronto, ON",
    puppy: "Bella",
    rating: 5,
    quote:
      "Shipping to Canada sounded scary, but we got updates the whole way and Bella stepped off the plane wagging her tail.",
  },
  {
    id: "tom",
    name: "Tom & Beth W.",
    location: "Phoenix, AZ",
    puppy: "Duke",
    rating: 5,
    quote:
      "Duke has the calm, steady temperament we were hoping for. Every question we had before and after pickup was answered quickly and kindly.",
  },
  {
    id: "danielle",
    name: "Danielle K.",
    location: "Tampa, FL",
    puppy: "Rosie",
    rating: 5,
    quote:
      "Rosie is the sweetest dog I've ever owned. Thank you for trusting us with her.",
  },
  {
    id: "omar",
    name: "Omar H.",
    location: "Chicago, IL",
    puppy: "Mia",
    rating: 5,
    quote:
      "Clear communication, clear paperwork, and a healthy puppy. Mia settled in within a day and sleeps through the night already.",
  },
  {
    id: "rachel",
    name: "Rachel P.",
    location: "Portland, OR",
    puppy: "Nova",
    rating: 5,
    quote:
      "We drove up to meet the litter and it felt like visiting family. Nova is well socialized, healthy and adored by everyone she meets.",
  },
];
