import { Dna, Heart, Home, CreditCard, PawPrint, Plane, type LucideIcon } from "lucide-react";

export type FaqCategory = {
  title: string;
  icon: LucideIcon;
  items: { q: string; a: string }[];
};

export const faqs: FaqCategory[] = [
  {
    title: "About Our Puppies",
    icon: PawPrint,
    items: [
      {
        q: "Are your Pitbull puppies purebred?",
        a: "Our puppies are bred from carefully selected American Pitbull lines. Individual puppy pedigree and lineage information can be provided where applicable.",
      },
      {
        q: "What is the temperament of your Pitbulls?",
        a: "We focus on producing dogs with stable, confident, affectionate temperaments. Early handling and socialization are an important part of our puppy-raising process.",
      },
      {
        q: "Are your puppies raised around people?",
        a: "Yes. Puppies are handled regularly and introduced to normal household experiences, people, sounds, and age-appropriate environments to help encourage confident development.",
      },
      {
        q: "Are your Pitbulls good with children and other pets?",
        a: "Individual temperament varies from dog to dog. We can discuss each puppy's observed personality and help prospective families choose a puppy that fits their household.",
      },
    ],
  },
  {
    title: "Health & Care",
    icon: Heart,
    items: [
      {
        q: "Do you offer a health guarantee?",
        a: "Yes. Each puppy is provided with our applicable health guarantee and health documentation. We recommend that every new puppy receive an examination by a licensed veterinarian after arriving home.",
      },
      {
        q: "What vaccinations and deworming does my puppy receive?",
        a: "Puppies receive age-appropriate veterinary care, vaccinations and deworming before going to their new homes. The specific records provided with each puppy will depend on its age and veterinary schedule.",
      },
      {
        q: "At what age can I take my puppy home?",
        a: "Puppies should remain with their mother and littermates until they are appropriately ready to transition to a new home. The exact pickup date depends on the puppy's age, development and veterinary requirements.",
      },
      {
        q: "What should I feed my Pitbull puppy?",
        a: "We can provide guidance on the food your puppy has been eating and recommend maintaining a consistent diet initially before making gradual changes.",
      },
    ],
  },
  {
    title: "Breeding & Bloodlines",
    icon: Dna,
    items: [
      {
        q: "Can I see the puppy's parents?",
        a: "Yes, where available, we can provide information and photographs of the puppy's parents and relevant bloodline information.",
      },
      {
        q: "Can I see pedigree or bloodline information?",
        a: "Pedigree information is available for puppies where applicable. Contact us for the specific lineage documentation associated with the puppy you're interested in.",
      },
      {
        q: "Do you breed different colors and sizes?",
        a: "Our dogs may vary in color, structure and size depending on the individual bloodline and breeding. Contact us about currently available puppies and upcoming litters.",
      },
    ],
  },
  {
    title: "Reservations & Purchase",
    icon: CreditCard,
    items: [
      {
        q: "How do I reserve a puppy?",
        a: "Start by contacting us about the puppy you're interested in. We'll discuss availability, answer your questions and explain the current reservation process.",
      },
      {
        q: "What is included with my puppy purchase?",
        a: "The exact package can vary by puppy, but typically includes applicable health/veterinary records, care information and documentation provided with the puppy. We'll explain everything included before you complete your purchase.",
      },
      {
        q: "What payment methods do you accept?",
        a: "Available payment methods and payment instructions are provided during the reservation process. Please contact us for the current options.",
      },
    ],
  },
  {
    title: "Shipping & Delivery",
    icon: Plane,
    items: [
      {
        q: "Do you offer puppy shipping?",
        a: "Yes, shipping options can be discussed for families who cannot personally collect their puppy. Available transportation options depend on the destination and applicable requirements.",
      },
      {
        q: "How does puppy shipping work?",
        a: "We first prepare the puppy for travel, confirm the required health and travel documentation, arrange transportation, and provide the buyer with the relevant delivery information.",
      },
      {
        q: "Will I receive updates during transportation?",
        a: "Yes. We provide available transportation and delivery updates throughout the journey so you know the status of your puppy's trip.",
      },
      {
        q: "Can you ship internationally?",
        a: "International transportation may be possible depending on the destination and current animal-import requirements. We'll discuss the requirements and available options for your location before making arrangements.",
      },
    ],
  },
  {
    title: "After You Bring Your Puppy Home",
    icon: Home,
    items: [
      {
        q: "Do you provide support after purchase?",
        a: "Yes. We want families to feel supported beyond the initial purchase and are available to answer reasonable questions about your puppy's transition and care.",
      },
      {
        q: "Can I contact you if I have additional questions?",
        a: "Absolutely. If your question isn't answered on this page, use the contact form or contact information provided on the website.",
      },
    ],
  },
];
