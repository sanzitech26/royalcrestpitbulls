"use client";

import { useSyncExternalStore } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const KEY = "saved-puppies";
const CHANGED = "saved-puppies-changed"; // the `storage` event only fires in other tabs, so same-tab updates announce themselves

// ponytail: saved per browser only (no account), and nothing lists the saved puppies yet.
function read(): string[] {
  try {
    const ids = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(ids) ? ids : [];
  } catch {
    return []; // storage blocked or corrupt: behave as "nothing saved"
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGED, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGED, onChange);
  };
}

export function SavePuppyButton({ id, name, className }: { id: string; name: string; className?: string }) {
  const saved = useSyncExternalStore(subscribe, () => read().includes(id), () => false);

  const toggle = () => {
    const ids = read();
    try {
      localStorage.setItem(KEY, JSON.stringify(saved ? ids.filter((x) => x !== id) : [...ids, id]));
    } catch {
      return;
    }
    window.dispatchEvent(new Event(CHANGED));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${name} from saved puppies` : `Save ${name}`}
      className={cn(
        "flex size-11 items-center justify-center rounded-full bg-white/95 text-gold shadow-md transition-transform hover:scale-105",
        className
      )}
    >
      <Heart className="size-5" fill={saved ? "currentColor" : "none"} />
    </button>
  );
}
