import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cardClasses } from "@/components/admin/fields";
import { PageHeader } from "@/components/admin/page-header";
import { PuppyForm } from "@/components/admin/puppy-form";
import { requireAdmin } from "@/lib/admin/auth";

export default async function NewPuppyPage() {
  await requireAdmin();

  return (
    <div className="space-y-8">
      <Link href="/admin/puppies" className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-light">
        <ArrowLeft className="size-4" />
        All puppies
      </Link>
      <PageHeader title="Add a puppy" description="It appears on the website as soon as you save." />
      <div className={`${cardClasses} max-w-3xl`}>
        <PuppyForm />
      </div>
    </div>
  );
}
