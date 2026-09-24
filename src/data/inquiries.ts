// Subjects of the contact form. `value` is what the `inquiries` table stores; the CHECK in the migration matches these.
export const inquirySubjects = [
  { value: "puppies", label: "Available Puppies" },
  { value: "breeding", label: "Breeding Program" },
  { value: "shipping", label: "Shipping & Delivery" },
  { value: "other", label: "Other" },
] as const;

export const inquiryStatuses = ["new", "handled"] as const;
export type InquiryStatus = (typeof inquiryStatuses)[number];

// A row of the `inquiries` table
export type InquiryRow = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  subject: (typeof inquirySubjects)[number]["value"];
  message: string;
  status: InquiryStatus;
  // only the /contact/<puppy> form fills these in
  phone: string | null;
  address: string | null;
  puppy: string | null;
};
