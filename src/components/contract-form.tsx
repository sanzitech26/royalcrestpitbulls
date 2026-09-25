"use client";

import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { signContract, type SignState } from "@/app/puppy-contract/actions";
import { inputClasses } from "@/components/contact-form";
import { buttonVariants } from "@/components/ui/button";
import { paymentMethods, shippingOptions, terms, undecidedPuppy } from "@/data/puppy-contract";
import { cn } from "@/lib/utils";

const labelClasses = "mb-1.5 block text-sm font-semibold text-ink";
const star = <span className="text-gold">*</span>;

function Field({ label, optional, children }: { label: string; optional?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className={labelClasses}>
        {label} {optional ? <span className="font-normal text-ink/50">(optional)</span> : star}
      </span>
      {children}
    </label>
  );
}

function Radios({
  legend,
  name,
  options,
}: {
  legend: string;
  name: string;
  options: readonly { value: string; label: string }[];
}) {
  return (
    <fieldset className="min-w-0">
      <legend className={labelClasses}>
        {legend} {star}
      </legend>
      <div className="space-y-2.5">
        {options.map(({ value, label }) => (
          <label key={value} className="flex items-center gap-2.5 text-sm text-ink/80">
            <input type="radio" name={name} value={value} required className="size-4 shrink-0 accent-gold" />
            {label}
          </label>
        ))}
      </div>
    </fieldset>
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
}: {
  signed: boolean;
  onChange: (png: string) => void;
  invalid: boolean;
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
          Your signature {star}
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
      <canvas
        ref={canvas}
        aria-labelledby="signature-label"
        onPointerDown={start}
        onPointerMove={move}
        onPointerUp={end}
        onPointerCancel={end}
        className={cn(
          "h-32 w-full touch-none rounded-lg border border-dashed bg-white",
          invalid ? "border-red-600" : "border-ink/25"
        )}
      />
      <p className="mt-1 text-xs text-ink/60">Sign above with your mouse, stylus or finger.</p>
    </div>
  );
}

export function ContractForm({ puppies }: { puppies: { id: string; name: string }[] }) {
  const [state, action, pending] = useActionState<SignState, FormData>(signContract, { ok: false });
  const [signature, setSignature] = useState("");
  const [problem, setProblem] = useState<"" | "terms" | "signature">("");
  const formError =
    problem === "terms"
      ? "Please choose Yes to accept the terms and conditions."
      : problem === "signature" && !signature
        ? "Please sign in the box."
        : state.error;

  if (state.ok) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm sm:p-10">
        <CheckCircle2 className="mx-auto size-12 text-gold" />
        <h2 className="mt-4 font-display text-3xl font-bold text-ink">
          Thank you{state.name ? `, ${state.name.split(" ")[0]}` : ""}.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-ink/70">
          Your signed contract has been sent to our team and we&rsquo;ll be in touch about your puppy. If you have any
          questions, please contact us.
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
        const data = new FormData(e.currentTarget);
        if (data.get("accepted") !== "yes") return setProblem("terms");
        if (!signature) return setProblem("signature");
        startTransition(() => action(data));
      }}
      className="space-y-5 rounded-2xl bg-white p-6 shadow-sm sm:p-8"
    >
      {/* honeypot: hidden from people, bots fill it */}
      <div aria-hidden className="absolute -left-[9999px]">
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Field label="Puppy of interest">
        <select name="puppy" required defaultValue="" className={cn(inputClasses, "text-ink/80")}>
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

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name">
          <input
            name="full_name"
            type="text"
            required
            minLength={2}
            maxLength={100}
            autoComplete="name"
            className={inputClasses}
          />
        </Field>
        <Field label="Email">
          <input name="email" type="email" required maxLength={200} autoComplete="email" className={inputClasses} />
        </Field>
        <Field label="Phone">
          <input
            name="phone"
            type="tel"
            required
            minLength={7}
            maxLength={30}
            autoComplete="tel"
            className={inputClasses}
          />
        </Field>
        <Field label="Agreed price ($)" optional>
          <input
            name="agreed_price"
            type="text"
            inputMode="numeric"
            maxLength={12}
            placeholder="e.g. 2500"
            className={inputClasses}
          />
        </Field>
      </div>

      <Field label="Delivery address">
        <input
          name="delivery_address"
          type="text"
          required
          maxLength={300}
          autoComplete="street-address"
          placeholder="Street, city, state, ZIP"
          className={inputClasses}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Radios legend="Shipping option" name="shipping_option" options={shippingOptions} />
        <Radios legend="Payment method" name="payment_method" options={paymentMethods} />
      </div>

      <div className="rounded-xl bg-cream p-5">
        <h3 className="font-display text-xl font-bold text-ink">Terms &amp; Conditions</h3>
        <div className="mt-3 space-y-4">
          {terms.map(({ title, items }) => (
            <div key={title}>
              <h4 className="text-sm font-bold text-ink">{title}</h4>
              <ul className="mt-1.5 space-y-1.5 text-sm text-ink/75">
                {items.map(({ label, text }) => (
                  <li key={label}>
                    <span className="font-semibold text-ink">{label}:</span> {text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <fieldset className="min-w-0">
        <legend className={labelClasses}>
          Accept Terms &amp; Conditions? {star}
        </legend>
        <div className="flex gap-6">
          {[
            ["yes", "Yes"],
            ["no", "No"],
          ].map(([value, label]) => (
            <label key={value} className="flex items-center gap-2.5 text-sm text-ink/80">
              <input
                type="radio"
                name="accepted"
                value={value}
                required
                onChange={() => setProblem("")}
                className="size-4 shrink-0 accent-gold"
              />
              {label}
            </label>
          ))}
        </div>
        <p className="mt-2 text-xs text-ink/60">Signing below confirms your agreement to these terms.</p>
      </fieldset>

      <SignaturePad
        signed={!!signature}
        invalid={problem === "signature" && !signature}
        onChange={(png) => {
          setSignature(png);
          setProblem("");
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
        className={cn(buttonVariants({ size: "lg" }), "h-12 w-full rounded-full text-base")}
      >
        {pending ? "Submitting…" : "Sign & Submit Contract"}
        {!pending && <ArrowRight className="size-4" />}
      </button>
    </form>
  );
}
