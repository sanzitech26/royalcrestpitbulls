import { Trash } from "lucide-react";
import { AdminForm } from "@/components/admin/admin-form";
import type { FormState } from "@/lib/admin/form";

// Two-step delete with no JavaScript: a native <details> that reveals the real (danger) button.
export function ConfirmDelete({
  action,
  id,
  what,
}: {
  action: (previous: FormState, data: FormData) => Promise<FormState>;
  id: string;
  what: string;
}) {
  return (
    <details className="group">
      <summary className="inline-flex h-8 cursor-pointer list-none items-center gap-1.5 rounded-full border border-red-200 px-3 text-xs font-medium text-red-700 transition-colors marker:content-none hover:bg-red-50 group-open:hidden [&::-webkit-details-marker]:hidden">
        <Trash className="size-3.5" />
        Delete
      </summary>
      <div className="rounded-lg border border-red-200 bg-red-50 p-3">
        <p className="mb-2 text-sm text-red-800">Delete {what}? This can&rsquo;t be undone.</p>
        <AdminForm action={action} submitLabel="Yes, delete" tone="danger">
          <input type="hidden" name="id" value={id} />
        </AdminForm>
      </div>
    </details>
  );
}
