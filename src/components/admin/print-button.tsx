"use client";

import { Printer } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={cn(
        buttonVariants({ variant: "outline", size: "lg" }),
        "h-10 rounded-full border-ink/25 bg-white px-5 text-ink hover:border-gold hover:bg-white hover:text-gold print:hidden"
      )}
    >
      <Printer className="size-4" />
      Print
    </button>
  );
}
