import Link from "next/link";
import { ChevronDown, Mail } from "lucide-react";
import { AdminForm } from "@/components/admin/admin-form";
import { ConfirmDelete } from "@/components/admin/confirm-delete";
import { cardClasses, Pill } from "@/components/admin/fields";
import { PageHeader } from "@/components/admin/page-header";
import { buttonVariants } from "@/components/ui/button";
import { inquirySubjects, type InquiryRow } from "@/data/inquiries";
import { requireAdmin } from "@/lib/admin/auth";
import { formatDate } from "@/lib/admin/format";
import { cn } from "@/lib/utils";
import { deleteInquiry, setInquiryStatus } from "./actions";

const filters = [
  { label: "All", value: undefined },
  { label: "New", value: "new" },
  { label: "Handled", value: "handled" },
] as const;

export default async function InquiriesPage(props: PageProps<"/admin/inquiries">) {
  const { status } = await props.searchParams;
  const selected = status === "new" || status === "handled" ? status : undefined;
  const { supabase } = await requireAdmin();

  let query = supabase.from("inquiries").select("*").order("created_at", { ascending: false });
  if (selected) query = query.eq("status", selected);
  const { data, error } = await query;
  const inquiries = (data ?? []) as InquiryRow[];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Inquiries"
        description="Messages sent through the contact form on the website. Reply by email, then mark them handled."
      />

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter inquiries by status">
        {filters.map(({ label, value }) => {
          const active = value === selected;
          return (
            <Link
              key={label}
              href={value ? `/admin/inquiries?status=${value}` : "/admin/inquiries"}
              aria-current={active ? "true" : undefined}
              className={cn(
                "rounded-full border px-5 py-2 text-sm font-medium transition-colors",
                active
                  ? "border-gold bg-gold text-white"
                  : "border-ink/20 text-ink/70 hover:border-gold hover:text-gold"
              )}
            >
              {label}
            </Link>
          );
        })}
      </div>

      {error && (
        <p role="alert" className="rounded-lg bg-red-50 p-4 text-sm font-medium text-red-700">
          Couldn&rsquo;t load inquiries: {error.message}
        </p>
      )}

      <div className="space-y-3">
        {inquiries.map((inquiry) => {
          const subject = inquirySubjects.find((s) => s.value === inquiry.subject)?.label ?? inquiry.subject;
          const isNew = inquiry.status === "new";
          return (
            <details key={inquiry.id} className={`${cardClasses} group p-0 sm:p-0`}>
              <summary className="flex cursor-pointer list-none flex-wrap items-center gap-x-4 gap-y-1 px-5 py-4 marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="min-w-0 flex-1">
                  <span className={cn("block truncate text-ink", isNew ? "font-bold" : "font-medium")}>
                    {inquiry.name}
                  </span>
                  <span className="block truncate text-xs text-ink/60">
                    {subject}
                    {inquiry.puppy && <> &middot; {inquiry.puppy}</>} &middot; {formatDate(inquiry.created_at)}
                  </span>
                </span>
                <Pill tone={isNew ? "gold" : "gray"}>{isNew ? "New" : "Handled"}</Pill>
                <ChevronDown className="size-4 shrink-0 text-ink/40 transition-transform group-open:rotate-180" />
              </summary>

              <div className="space-y-4 border-t border-ink/10 px-5 py-4">
                <p className="text-sm text-ink/70">
                  <a href={`mailto:${inquiry.email}`} className="font-medium text-gold hover:text-gold-light">
                    {inquiry.email}
                  </a>
                </p>
                {(inquiry.puppy || inquiry.phone || inquiry.address) && (
                  <dl className="space-y-1 text-sm">
                    {(
                      [
                        ["Puppy", inquiry.puppy],
                        ["Phone", inquiry.phone],
                        ["Address", inquiry.address],
                      ] as const
                    ).map(
                      ([label, value]) =>
                        value && (
                          <div key={label} className="flex gap-3">
                            <dt className="w-16 shrink-0 text-ink/50">{label}</dt>
                            <dd className="min-w-0 break-words text-ink">{value}</dd>
                          </div>
                        )
                    )}
                  </dl>
                )}
                <p className="text-sm break-words whitespace-pre-wrap text-ink">{inquiry.message}</p>

                <div className="flex flex-wrap items-start gap-2 pt-2">
                  <a
                    href={`mailto:${inquiry.email}?subject=${encodeURIComponent("Re: your message to RoyalCrest Pitbulls")}`}
                    className={cn(buttonVariants({ size: "sm" }), "rounded-full px-3")}
                  >
                    <Mail className="size-3.5" />
                    Reply by email
                  </a>
                  <AdminForm action={setInquiryStatus} submitLabel={isNew ? "Mark handled" : "Reopen"} tone="quiet">
                    <input type="hidden" name="id" value={inquiry.id} />
                    <input type="hidden" name="status" value={isNew ? "handled" : "new"} />
                  </AdminForm>
                  <ConfirmDelete action={deleteInquiry} id={inquiry.id} what="this message" />
                </div>
              </div>
            </details>
          );
        })}
        {!inquiries.length && !error && (
          <p className="rounded-2xl bg-white p-8 text-center text-ink/60 shadow-sm">
            {selected ? `No ${selected} messages.` : "No messages yet. They'll appear here when someone uses the contact form."}
          </p>
        )}
      </div>
    </div>
  );
}
