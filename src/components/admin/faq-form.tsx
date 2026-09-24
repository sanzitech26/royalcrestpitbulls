import { saveFaq } from "@/app/admin/(panel)/faqs/actions";
import { AdminForm } from "@/components/admin/admin-form";
import { Field, fieldClasses } from "@/components/admin/fields";
import { faqCategories } from "@/data/faqs";

export type FaqRow = { id: string; category: string; question: string; answer: string; sort_order: number };

export function FaqForm({ faq }: { faq?: FaqRow }) {
  return (
    <AdminForm action={saveFaq} submitLabel={faq ? "Save changes" : "Add question"} resetOnSuccess={!faq}>
      {faq && <input type="hidden" name="id" value={faq.id} />}

      <div className="grid gap-4 sm:grid-cols-[1fr_9rem]">
        <Field label="Category">
          <select name="category" required defaultValue={faq?.category ?? faqCategories[0].title} className={fieldClasses}>
            {faqCategories.map(({ title }) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Order" hint="Low numbers first. Blank = last.">
          <input name="sort_order" type="number" min={0} step={1} defaultValue={faq?.sort_order} className={fieldClasses} />
        </Field>
      </div>

      <Field label="Question">
        <input name="question" required minLength={5} maxLength={300} defaultValue={faq?.question} className={fieldClasses} />
      </Field>
      <Field label="Answer">
        <textarea
          name="answer"
          required
          minLength={5}
          maxLength={2000}
          rows={4}
          defaultValue={faq?.answer}
          className={fieldClasses}
        />
      </Field>
    </AdminForm>
  );
}
