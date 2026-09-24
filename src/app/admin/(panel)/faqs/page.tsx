import { ChevronDown, Plus } from "lucide-react";
import { ConfirmDelete } from "@/components/admin/confirm-delete";
import { cardClasses } from "@/components/admin/fields";
import { FaqForm, type FaqRow } from "@/components/admin/faq-form";
import { PageHeader } from "@/components/admin/page-header";
import { faqCategories } from "@/data/faqs";
import { requireAdmin } from "@/lib/admin/auth";
import { deleteFaq } from "./actions";

export default async function FaqsAdminPage() {
  const { supabase } = await requireAdmin();

  const { data, error } = await supabase
    .from("faq_items")
    .select("id, category, question, answer, sort_order")
    .order("sort_order")
    .order("created_at");
  const faqs = (data ?? []) as FaqRow[];

  return (
    <div className="max-w-3xl space-y-8">
      <PageHeader
        title="FAQs"
        description="Questions and answers shown on the FAQ page, grouped by category. Within a category, lower Order numbers come first."
      />

      {error && (
        <p role="alert" className="rounded-lg bg-red-50 p-4 text-sm font-medium text-red-700">
          Couldn&rsquo;t load FAQs: {error.message}
        </p>
      )}

      <details className={`${cardClasses} group p-0 sm:p-0`}>
        <summary className="flex cursor-pointer list-none items-center gap-2 px-5 py-4 font-semibold text-gold marker:content-none [&::-webkit-details-marker]:hidden">
          <Plus className="size-4" />
          Add a question
        </summary>
        <div className="border-t border-ink/10 px-5 py-5">
          <FaqForm />
        </div>
      </details>

      {faqCategories.map(({ title, icon: Icon }) => {
        const items = faqs.filter((faq) => faq.category === title);
        return (
          <section key={title} aria-label={title}>
            <h2 className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-gold uppercase">
              <Icon className="size-4" />
              {title}
            </h2>
            <div className="mt-3 space-y-2.5">
              {items.map((faq) => (
                <details key={faq.id} className={`${cardClasses} group p-0 sm:p-0`}>
                  <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-4 text-sm font-medium text-ink marker:content-none [&::-webkit-details-marker]:hidden">
                    <span className="min-w-0 flex-1">{faq.question}</span>
                    <ChevronDown className="size-4 shrink-0 text-ink/40 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="space-y-5 border-t border-ink/10 px-5 py-5">
                    <FaqForm faq={faq} />
                    <ConfirmDelete action={deleteFaq} id={faq.id} what="this question" />
                  </div>
                </details>
              ))}
              {!items.length && <p className="text-sm text-ink/60">No questions in this category.</p>}
            </div>
          </section>
        );
      })}
    </div>
  );
}
