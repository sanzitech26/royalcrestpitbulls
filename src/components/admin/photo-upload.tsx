"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ImagePlus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const bucket = "puppy-photos";
const maxSide = 1600;

// Phone photos are 3-8 MB; shrink in the browser (also keeps the site fast) and upload straight to Supabase Storage,
// which only accepts writes from a logged-in admin. A server action couldn't take the raw photo: hosting caps request bodies at ~4.5 MB.
async function shrink(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return new Promise((resolve, reject) =>
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("Couldn't read that image."))), "image/jpeg", 0.85)
  );
}

export function PhotoUpload({ name, defaultValue }: { name: string; defaultValue?: string }) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const input = useRef<HTMLInputElement>(null);

  async function upload(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const supabase = createClient();
      const path = `${crypto.randomUUID()}.jpg`;
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(path, await shrink(file), { contentType: "image/jpeg" });
      if (uploadError) throw uploadError;
      setUrl(supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl);
    } catch (e) {
      setError(e instanceof Error ? e.message : "The upload failed. Please try again.");
    } finally {
      setBusy(false);
      if (input.current) input.current.value = "";
    }
  }

  return (
    <div>
      <span className="mb-1 block text-sm font-semibold text-ink">Photo</span>
      <div className="flex items-center gap-4">
        <div className="relative aspect-[4/5] w-28 shrink-0 overflow-hidden rounded-lg border border-ink/15 bg-white">
          {url ? (
            <Image src={url} alt="Puppy photo preview" fill unoptimized className="object-cover" />
          ) : (
            <ImagePlus className="absolute inset-0 m-auto size-6 text-ink/30" />
          )}
        </div>
        <div>
          <input
            ref={input}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => upload(e.target.files?.[0])}
            className="sr-only"
            id={`${name}-file`}
          />
          <label
            htmlFor={`${name}-file`}
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "cursor-pointer rounded-full border-ink/25 bg-white px-4 text-ink hover:border-gold hover:text-gold",
              busy && "pointer-events-none opacity-50"
            )}
          >
            {busy ? "Uploading…" : url ? "Replace photo" : "Choose photo"}
          </label>
          <p className="mt-2 text-xs text-ink/60">JPG, PNG or WebP. Large photos are shrunk automatically.</p>
        </div>
      </div>
      <input type="hidden" name={name} value={url} />
      {error && (
        <p role="alert" className="mt-2 text-sm font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
