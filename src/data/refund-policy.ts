// Return & Refund Policy text, supplied by the owner. string = paragraph, string[] = bullet list.
// The owner's drafting notes ("only use this if it matches your actual practice…") are deliberately NOT shown to
// visitors. The REVIEW lines mark the three policies those notes were about — confirm before launch.

export type PolicyBlock = string | string[];
export type PolicySection = { title: string; body: PolicyBlock[] };

// Saved with every signature so we know which text was agreed to. Bump both when the wording changes.
export const policyVersion = "2026-09";
export const lastUpdated = "September 2026";

// "Puppy of interest" choice for someone who hasn't picked one (shared by the form and its server action)
export const undecidedPuppy = "Not sure yet";

export const sections: PolicySection[] = [
  {
    title: "Introduction",
    body: [
      "At RoyalCrest Pitbulls, we want every puppy placement to be carefully considered and handled responsibly.",
      "Because puppies are living animals and require preparation, veterinary care, documentation, and transportation arrangements, our return and refund procedures differ from those used for ordinary retail products.",
      "By placing a reservation or purchasing a puppy, you acknowledge and agree to the applicable policies outlined below.",
    ],
  },
  {
    title: "Puppy Purchases",
    body: [
      "All puppy purchases should be considered carefully before payment.",
      "Before completing a purchase, buyers are encouraged to ask questions about:",
      [
        "The puppy's health",
        "Age",
        "Temperament",
        "Parents and bloodline",
        "Vaccinations",
        "Feeding",
        "Transportation",
        "Expected adult size",
        "Care requirements",
        "Any applicable health guarantee",
      ],
      "Once a purchase has been confirmed, cancellation and refund eligibility will depend on the circumstances and the terms communicated to the buyer.",
    ],
  },
  {
    title: "Reservation Deposits",
    body: [
      "If RoyalCrest Pitbulls requires a reservation deposit, the specific deposit amount and conditions will be communicated before payment.",
      // REVIEW: keep only if non-refundable deposits are the real policy and legal where the sale happens.
      "Reservation deposits are generally non-refundable because they secure a specific puppy and may prevent that puppy from being offered to other prospective buyers.",
      "However, RoyalCrest Pitbulls may review individual circumstances at its discretion.",
    ],
  },
  {
    title: "Buyer Cancellation",
    body: [
      "If a buyer decides to cancel a reservation or purchase, the buyer should contact RoyalCrest Pitbulls as soon as possible.",
      "Any refund or retained deposit will be determined according to:",
      [
        "The type of payment made",
        "Whether the puppy was reserved",
        "Whether transportation arrangements were already made",
        "Veterinary or documentation expenses already incurred",
        "The terms agreed upon before payment",
        "Applicable law",
      ],
    ],
  },
  {
    title: "If RoyalCrest Pitbulls Cancels the Sale",
    body: [
      "If RoyalCrest Pitbulls is unable to complete a confirmed puppy transaction for reasons attributable to RoyalCrest, we will communicate with the buyer and determine the appropriate remedy, which may include a refund where applicable.",
      "If a suitable replacement puppy is available and the buyer agrees, the buyer may also be offered the option to transfer the reservation.",
    ],
  },
  {
    title: "Health-Related Situations Before Delivery",
    body: [
      "If a puppy develops a significant health issue before delivery, RoyalCrest Pitbulls will notify the buyer.",
      "Depending on the circumstances, available options may include:",
      [
        "Delaying transportation until the puppy is ready",
        "Transferring the reservation to another puppy",
        "Rescheduling delivery",
        "Another remedy agreed upon with the buyer",
      ],
      "Any health-related decision will be considered based on veterinary information and the specific circumstances.",
    ],
  },
  {
    title: "Returns After Delivery",
    body: [
      "Because puppies are living animals, puppies cannot be treated like ordinary products that can simply be returned for a refund.",
      "If a buyer experiences a serious problem after receiving a puppy, the buyer should contact RoyalCrest Pitbulls immediately.",
      "The situation may be handled according to the applicable Health Guarantee, purchase agreement, and applicable law.",
    ],
  },
  {
    title: "Health Guarantee",
    body: [
      "Any health guarantee provided by RoyalCrest Pitbulls is separate from this Return & Refund Policy.",
      "The health guarantee will specify:",
      [
        "The applicable coverage",
        "Required veterinary examination",
        "Notification requirements",
        "Documentation requirements",
        "Applicable time periods",
        "Available remedies",
      ],
      "Buyers should read the Health Guarantee before completing their purchase.",
    ],
  },
  {
    title: "Transportation & Shipping Fees",
    body: [
      "Transportation expenses may include veterinary documentation, travel arrangements, transportation charges, crates, permits, or other applicable expenses.",
      "Once transportation arrangements have been made or services have been purchased from third parties, those costs may not be refundable if the third-party provider does not provide a refund.",
      "Any applicable refund will depend on the actual expenses incurred and the agreed terms.",
    ],
  },
  {
    title: "International Orders",
    body: [
      "International purchases may involve additional government, veterinary, customs, transportation, or documentation requirements.",
      "If an international shipment cannot proceed because the buyer has not satisfied the requirements of the destination country, any refund will be handled according to the agreed purchase terms and applicable law.",
      "Buyers are responsible for researching applicable import requirements before completing a purchase.",
    ],
  },
  {
    title: "Payment Processing Fees",
    body: [
      // REVIEW: keep only if it matches the payment provider's terms and the real refund practice.
      "Where permitted by applicable law and clearly disclosed before payment, payment-processing or third-party transaction fees may be deducted from an otherwise eligible refund when those fees are not recoverable.",
    ],
  },
  {
    title: "Refund Processing",
    body: [
      "If a refund is approved, RoyalCrest Pitbulls will communicate the refund method and expected processing procedure to the buyer.",
      "Refunds may be returned using the original payment method where reasonably possible.",
      "The time required for funds to appear in the buyer's account may depend on the payment provider or financial institution.",
    ],
  },
  {
    title: "No Refund for Change of Mind",
    body: [
      // REVIEW: keep only if this is the real policy.
      "Once a puppy purchase has been confirmed, refunds are not automatically provided simply because a buyer changes their mind or decides that they no longer want the puppy.",
      "However, all refund decisions remain subject to the applicable purchase agreement and applicable law.",
    ],
  },
];
