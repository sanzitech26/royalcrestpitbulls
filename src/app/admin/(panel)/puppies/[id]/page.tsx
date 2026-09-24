import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { ConfirmDelete } from "@/components/admin/confirm-delete";
import { cardClasses } from "@/components/admin/fields";
import { PageHeader } from "@/components/admin/page-header";
import { PuppyForm } from "@/components/admin/puppy-form";
import type { PuppyRow } from "@/data/puppies";
import { requireAdmin } from "@/lib/admin/auth";
import { deletePuppy } from "../actions";

export default async function EditPuppyPage(props: PageProps<"/admin/puppies/[id]">) {
  const { id } = await props.params;
  const { supabase } = await requireAdmin();

  const { data } = await supabase.from("puppies").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  const puppy = data as PuppyRow;

  return (
    <div className="space-y-8">
      <Link href="/admin/puppies" className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-light">
        <ArrowLeft className="size-4" />
        All puppies
      </Link>
      <PageHeader
        title={puppy.name}
        description="Changes appear on the website as soon as you save."
        action={
          puppy.status !== "sold" && (
            <Link
              href={`/available-puppies/${puppy.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-light"
            >
              View on website
              <ExternalLink className="size-4" />
            </Link>
          )
        }
      />

      <div className={`${cardClasses} max-w-3xl`}>
        <PuppyForm puppy={puppy} />
      </div>

      <div className="max-w-3xl">
        <ConfirmDelete action={deletePuppy} id={puppy.id} what={puppy.name} />
      </div>
    </div>
  );
}
