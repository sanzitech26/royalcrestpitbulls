"use client";

import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { signContract, type SignState } from "@/app/contract/actions";
import { inputClasses } from "@/components/contact-form";
import { buttonVariants } from "@/components/ui/button";
import { undecidedPuppy } from "@/data/refund-policy";
import { cn } from "@/lib/utils";

// tighter than the /contact fields: this form sits in a sticky column and has to fit a laptop screen
const fieldClasses = cn(inputClasses, "py-2.5");

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-semibold text-ink">
        {label} <span className="text-gold">*</span>
      </span>
      {children}
    </label>
  );
}

// white, not transparent, so the saved PNG reads on any dashboard theme
function whiteout(c: HTMLCanvasElement) {
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, c.width, c.height);
}

// ponytail: a drawn signature can't be reached by keyboard; name + consent are captured too. Add a typed-signature option if that's ever needed.
function SignaturePad({
  signed,
  onChange,
  invalid,
  disabled,
}: {
  signed: boolean;
  onChange: (png: string) => void;
  invalid: boolean;
  disabled: boolean;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const inked = useRef(false);

  useEffect(() => {
    const c = canvas.current!;
    const dpr = window.devicePixelRatio || 1;
    c.width = c.clientWidth * dpr;
    c.height = c.clientHeight * dpr;
    whiteout(c);
  }, []);

  // pointer position in canvas pixels (the buffer is dpr-scaled, so this stays correct if the box resizes)
  const point = (e: React.PointerEvent<HTMLCanvasElement>): [number, number] => {
    const c = canvas.current!;
    const r = c.getBoundingClientRect();
    return [((e.clientX - r.left) * c.width) / r.width, ((e.clientY - r.top) * c.height) / r.height];
  };

  const start = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const ctx = canvas.current!.getContext("2d")!;
    e.currentTarget.setPointerCapture(e.pointerId);
    drawing.current = true;
    ctx.lineWidth = 2.5 * (window.devicePixelRatio || 1);
    ctx.lineCap = ctx.lineJoin = "round";
    ctx.strokeStyle = "#1A1611";
    ctx.beginPath();
    ctx.moveTo(...point(e));
  };

  const move = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    const ctx = canvas.current!.getContext("2d")!;
    ctx.lineTo(...point(e));
    ctx.stroke();
    inked.current = true;
  };

  const end = () => {
    if (!drawing.current) return;
    drawing.current = false;
    if (inked.current) onChange(canvas.current!.toDataURL("image/png"));
  };

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span id="signature-label" className="text-sm font-semibold text-ink">
          Your signature <span className="text-gold">*</span>
        </span>
        {signed && (
          <button
            type="button"
            onClick={() => {
              whiteout(canvas.current!);
              inked.current = false;
              onChange("");
            }}
            className="text-xs font-semibold text-gold hover:text-gold-light"
          >
            Clear
          </button>
        )}
      </div>
      {/* a canvas isn't a form control, so the parent <fieldset disabled> can't lock it: it gets the flag explicitly */}
      <canvas
        ref={canvas}
        aria-labelledby="signature-label"
        aria-disabled={disabled}
        onPointerDown={disabled ? undefined : start}
        onPointerMove={move}
        onPointerUp={end}
        onPointerCancel={end}
        className={cn(
          "h-28 w-full touch-none rounded-lg border border-dashed bg-white",
          invalid ? "border-red-600" : "border-ink/25"
        )}
      />
      <p className="mt-1 text-xs text-ink/60">Sign above with your mouse, stylus or finger.</p>
    </div>
  );
}

export function ContractForm({ puppies }: { puppies: { id: string; name: string }[] }) {
  const [state, action, pending] = useActionState<SignState, FormData>(signContract, { ok: false });
  const [accepted, setAccepted] = useState(false);
  const [signature, setSignature] = useState("");
  const [missingSignature, setMissingSignature] = useState(false);
  const formError = missingSignature && !signature ? "Please sign in the box." : state.error;

  if (state.ok) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm sm:p-10">
        <CheckCircle2 className="mx-auto size-12 text-gold" />
        <h2 className="mt-4 font-display text-3xl font-bold text-ink">
          Thank you{state.name ? `, ${state.name.split(" ")[0]}` : ""}.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-ink/70">
          Your signature has been recorded and we&rsquo;ll be in touch about your puppy. If you have any questions,
          please contact us.
        </p>
      </div>
    );
  }

  return (
    <form
      // submitted from onSubmit, not the `action` prop: React resets the form after an action runs, which would wipe
      // what the visitor typed whenever the server says no (browser validation has already passed by the time this runs)
      onSubmit={(e) => {
        e.preventDefault();
        if (!accepted) return; // the fieldset and button are locked until accepted; this covers anything that slips past
        if (!signature) return setMissingSignature(true);
        const data = new FormData(e.currentTarget);
        startTransition(() => action(data));
      }}
      className="space-y-3 rounded-2xl bg-white p-5 shadow-sm sm:p-6"
    >
      <h2 className="font-display text-3xl font-bold text-ink">Sign this contract</h2>

      {/* step 1: nothing else on the form works until this is ticked */}
      <div className="rounded-lg bg-cream p-3">
        <label className="flex items-start gap-3 text-sm text-ink/80">
          <input
            name="accepted"
            type="checkbox"
            required
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="mt-0.5 size-4 shrink-0 accent-gold"
          />
          <span>
            I have read and agree to the{" "}
            <a href="#policy" className="font-semibold text-gold underline underline-offset-2">
              Return &amp; Refund Policy
            </a>
            .
          </span>
        </label>
        {!accepted && (
          <p id="gate-hint" className="mt-1.5 pl-7 text-xs font-medium text-ink/60">
            Read the full policy, then tick this box to unlock the form.
          </p>
        )}
      </div>

      {/* honeypot: hidden from people, bots fill it. Outside the fieldset so it is always submitted */}
      <div aria-hidden className="absolute -left-[9999px]">
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* step 2: every field below is natively disabled (not focusable, not submitted, not validated) until accepted */}
      <fieldset
        disabled={!accepted}
        aria-describedby={accepted ? undefined : "gate-hint"}
        className={cn("min-w-0 space-y-3 transition-opacity", !accepted && "opacity-50")}
      >
        <Field label="Puppy of interest">
          <select name="puppy" required defaultValue="" className={cn(fieldClasses, "text-ink/80")}>
            <option value="" disabled>
              Select a puppy&hellip;
            </option>
            {puppies.map(({ id, name }) => (
              <option key={id} value={name}>
                {name}
              </option>
            ))}
            <option value={undecidedPuppy}>{undecidedPuppy}</option>
          </select>
        </Field>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <Field label="Full name">
            <input
              name="full_name"
              type="text"
              required
              minLength={2}
              maxLength={100}
              autoComplete="name"
              className={fieldClasses}
            />
          </Field>
          <Field label="Email">
            <input
              name="email"
              type="email"
              required
              maxLength={200}
              autoComplete="email"
              className={fieldClasses}
            />
          </Field>
        </div>

        <Field label="Phone">
          <input
            name="phone"
            type="tel"
            required
            minLength={7}
            maxLength={30}
            autoComplete="tel"
            className={fieldClasses}
          />
        </Field>

        <Field label="Delivery address">
          <input
            name="delivery_address"
            type="text"
            required
            maxLength={300}
            autoComplete="street-address"
            placeholder="Street, city, state, ZIP, or “Pickup”"
            className={fieldClasses}
          />
        </Field>

        <SignaturePad
          signed={!!signature}
          invalid={missingSignature && !signature}
          disabled={!accepted}
          onChange={(png) => {
            setSignature(png);
            setMissingSignature(false);
          }}
        />
        <input type="hidden" name="signature" value={signature} />

        {formError && (
          <p role="alert" className="text-sm font-medium text-red-700">
            {formError}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className={cn(buttonVariants({ size: "lg" }), "h-12 w-full text-base")}
        >
          {pending ? "Submitting…" : "Sign & Submit Contract"}
          {!pending && <ArrowRight className="size-4" />}
        </button>
      </fieldset>
    </form>
  );
}
