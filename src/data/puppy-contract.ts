// Puppy Contract copy, supplied by the owner (from their sister site). The form, its server action and the page all read
// the option values from here, so what the form posts is exactly what the action accepts.

export type ContractSection = { title: string; body: string[] };
export type TermsGroup = { title: string; items: { label: string; text: string }[] };

// Saved with every signature so we know which text was agreed to. Bump both when the wording changes.
// (Short on purpose: the column allows 20 characters. Rows signed before the Puppy Contract carry the refund-policy version.)
export const termsVersion = "pc-2026-09b"; // b: 30-day money-back guarantee removed from the terms box
export const lastUpdated = "September 2026";

// "Puppy of interest" choice for someone who hasn't picked one (shared by the form and its server action)
export const undecidedPuppy = "Not sure yet";

export const shippingOptions = [
  { value: "door_step", label: "Ship to door step – $180" },
  { value: "airport", label: "Ship to Airport – $150" },
] as const;

export const paymentMethods = [
  { value: "zelle", label: "Zelle" },
  { value: "cash_app", label: "Cash App" },
  { value: "chime", label: "Chime" },
  { value: "apple_pay", label: "Apple Pay" },
] as const;

// shows the label for a saved option value (the raw value if it's ever one we no longer offer)
export const optionLabel = (options: readonly { value: string; label: string }[], value: string) =>
  options.find((o) => o.value === value)?.label ?? value;

export const terms: TermsGroup[] = [
  {
    title: "Responsibilities of the Buyer",
    items: [
      { label: "Payment", text: "The buyer is responsible for paying for the puppy and shipping fees." },
      {
        label: "Supervision",
        text: "The buyer agrees to provide proper supervision and not allow the puppy outdoors without supervision.",
      },
      {
        label: "Humane Care",
        text: "The buyer commits to caring for the puppy in a humane manner, including providing adequate food, water, shelter, attention, and medical care.",
      },
      {
        label: "Guarantee and Liability",
        text: "The buyer understands that the breeder provides guarantees about the puppy's temperament but is not responsible for future damages or injuries caused by the puppy.",
      },
      {
        label: "Monitoring",
        text: "The breeder has permission to contact the buyer to ensure the puppy is being properly treated and cared for.",
      },
    ],
  },
  {
    title: "Seller's Guarantees",
    items: [
      {
        label: "Health and Registration",
        // the owner's source text says "AKC registration application paperwork for local Kennel Club registration"; the AKC
        // doesn't register American Pit Bull Terriers, so it's kept generic here (owner's choice)
        text: "The seller guarantees the puppy's sound health and provides registration paperwork for the applicable kennel club registry.",
      },
      { label: "Temperament", text: "The seller ensures that the puppy has a great temperament at the time of sale." },
      { label: "Health Records", text: "The seller provides a health record of all shots and worming." },
    ],
  },
  {
    title: "Physical Examination and Refund",
    items: [
      {
        label: "Veterinary Examination",
        text: "The buyer agrees to take the puppy to a licensed veterinarian within 72 hours of delivery for a physical examination.",
      },
      {
        label: "Refund Policy",
        text: "If the licensed vet determines that the puppy has health issues caused by the seller, the buyer can return the puppy for a full refund, with the seller covering the return expenses.",
      },
    ],
  },
  {
    title: "Buyer's Options and Responsibilities",
    items: [
      {
        label: "Rehoming Option",
        text: "If the buyer needs to give up the dog, the seller should be notified first, giving them the first option to resume full ownership and find a new home for the dog.",
      },
      {
        label: "Transfer Approval",
        text: "The breeder/seller reserves the right to approve or prohibit any transfer of the animal to a third party.",
      },
      {
        label: "Prohibited Facilities",
        text: "The dog should not be sold, leased, traded, or given to any pet shop, research laboratory, animal shelter, or similar facility.",
      },
    ],
  },
];

// The plain-language summary shown under the form. "Return & Refund Policy" in this text becomes a link to that page.
export const refundPolicyName = "Return & Refund Policy";

export const sections: ContractSection[] = [
  {
    title: "Reserving a puppy",
    body: [
      "A puppy is reserved once we have confirmed availability and received your deposit. Until we confirm in writing, a puppy remains available to other buyers.",
      "We hold a puppy for 48 hours pending payment. If payment is not received in that window the puppy may be released to the next enquiry.",
      "We reserve the right to decline a sale where we do not believe the placement is right for the puppy.",
    ],
  },
  {
    title: "Prices, deposits and payment",
    body: [
      "Prices are shown in US dollars on each puppy's page. Deposits are deducted from the final balance.",
      `Deposits secure a specific puppy and are non-refundable if you change your mind, except as set out in our ${refundPolicyName}.`,
      "The balance is due before the puppy travels. We will confirm accepted payment methods when you reserve.",
    ],
  },
  {
    title: "Health guarantee",
    body: [
      "Every puppy leaves us vet-checked, vaccinated appropriately for its age, dewormed and microchipped, with its records supplied.",
      "We provide a written health guarantee against congenital defects with each puppy. The guarantee document issued with your puppy sets out its exact scope and duration and takes precedence over this summary.",
      "We ask that you have your puppy examined by your own vet within 72 hours of arrival so that any concern is identified straight away.",
    ],
  },
  {
    title: "Your responsibilities as an owner",
    body: [
      "By buying from us you agree to provide appropriate food, shelter, training and veterinary care for the life of the dog, and to supervise your puppy rather than leaving them outside unattended.",
      "If you are ever unable to keep your dog, we ask that you contact us first — we would rather take a dog back than see it rehomed through a shelter, pet shop or research facility.",
      "We reserve the right to approve or decline any transfer of the dog to a third party.",
      "We may check in with you from time to time after the sale to confirm your puppy is being properly cared for.",
    ],
  },
  {
    title: "Liability",
    body: [
      "We share known health, lineage and temperament information in good faith. Dogs are living animals and no breeder can guarantee future health or personality beyond the written guarantee provided.",
      "Once your puppy goes home with you, you are responsible for their care and behavior — we are not liable for any damage or injury your dog causes after the sale.",
    ],
  },
];
