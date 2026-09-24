import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { AdminForm } from "@/components/admin/admin-form";
import { cardClasses, Pill } from "@/components/admin/fields";
import { PageHeader } from "@/components/admin/page-header";
import { buttonVariants } from "@/components/ui/button";
import { weeksOld, type PuppyRow, type PuppyStatus } from "@/data/puppies";
import { requireAdmin } from "@/lib/admin/auth";
import { cn } from "@/lib/utils";
import { setPuppyStatus } from "./actions";

const statuses: Record<PuppyStatus, { label: string; tone: "green" | "amber" | "gray"; action: string }> = {
  available: { label: "Available", tone: "green", action: "Mark available" },
  reserved: { label: "Reserved", tone: "amber", action: "Mark reserved" },
  sold: { label: "Sold · hidden", tone: "gray", action: "Mark sold" },
};

export default async function PuppiesPage() {
  const { supabase } = await requireAdmin();

  const { data, error } = await supabase.from("puppies").select("*").order("created_at", { ascending: false });
  const puppies = (data ?? []) as PuppyRow[];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Puppies"
        description="The puppies shown on the website. Sold puppies are hidden from visitors but stay here."
        action={
          <Link href="/admin/puppies/new" className={cn(buttonVariants({ size: "lg" }), "h-10 rounded-full px-5")}>
            <Plus className="size-4" />
            Add a puppy
          </Link>
        }
      />

      {error && (
        <p role="alert" className="rounded-lg bg-red-50 p-4 text-sm font-medium text-red-700">
          Couldn&rsquo;t load puppies: {error.message}
        </p>
      )}

      <ul className={`${cardClasses} divide-y divide-ink/10 py-2 sm:py-2`}>
        {puppies.map((puppy) => (
          <li key={puppy.id} className="flex flex-col gap-4 py-4 lg:flex-row lg:items-center">
            <div className="flex min-w-0 flex-1 items-center gap-4">
              <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-cream">
                <Image src={puppy.image} alt="" fill unoptimized className="object-cover" />
              </div>
              <div className="min-w-0">
                <Link href={`/admin/puppies/${puppy.id}`} className="font-semibold text-ink hover:text-gold">
                  {puppy.name}
                </Link>
                <p className="truncate text-xs text-ink/60">
                  {puppy.gender} &middot; {weeksOld(puppy.date_of_birth)} weeks &middot; {puppy.color} &middot; $
                  {puppy.price}
                </p>
              </div>
              <div className="ml-auto lg:ml-4">
                <Pill tone={statuses[puppy.status].tone}>{statuses[puppy.status].label}</Pill>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {(Object.keys(statuses) as PuppyStatus[])
                .filter((status) => status !== puppy.status)
                .map((status) => (
                  <AdminForm key={status} action={setPuppyStatus} submitLabel={statuses[status].action} tone="quiet">
                    <input type="hidden" name="id" value={puppy.id} />
                    <input type="hidden" name="status" value={status} />
                  </AdminForm>
                ))}
              <Link
                href={`/admin/puppies/${puppy.id}`}
                className={cn(buttonVariants({ size: "sm" }), "rounded-full px-4")}
              >
                Edit
              </Link>
            </div>
          </li>
        ))}
        {!puppies.length && !error && (
          <li className="py-8 text-center text-ink/60">No puppies yet. Add the first one to show it on the website.</li>
        )}
      </ul>
    </div>
  );
}
