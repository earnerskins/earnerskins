"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { registerAction, type ActionState } from "@/actions/auth";
import { COUNTRIES } from "@/lib/countries";
import { REGION } from "@/lib/config";
import { Field, inputClass } from "./AuthShell";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const STEPS = ["Account", "Personal", "Address", "Confirm"];

const emptyValues = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  phone: "",
  dateOfBirth: "",
  street: "",
  city: "",
  country: "",
  postalCode: "",
};

export function RegisterForm() {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(registerAction, {});
  const [step, setStep] = useState(0);
  const [v, setV] = useState(emptyValues);
  const [agreed, setAgreed] = useState(false);
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});

  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setV((prev) => ({ ...prev, [k]: e.target.value }));

  const err = (k: string) => localErrors[k] ?? state.fieldErrors?.[k];

  const validateStep = (): boolean => {
    const e: Record<string, string> = {};
    if (step === 0) {
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.email)) e.email = "Enter a valid email address";
      if (v.password.length < 8) e.password = "At least 8 characters";
      else if (!/[A-Z]/.test(v.password)) e.password = "Include an uppercase letter";
      else if (!/[0-9]/.test(v.password)) e.password = "Include a number";
    } else if (step === 1) {
      if (!v.firstName) e.firstName = "First name is required";
      if (!v.lastName) e.lastName = "Last name is required";
      if (v.phone.length < 6) e.phone = "Enter a valid phone number";
      if (!v.dateOfBirth) e.dateOfBirth = "Enter your date of birth";
      else {
        const age = (Date.now() - new Date(v.dateOfBirth).getTime()) / (365.25 * 864e5);
        if (age < 18) e.dateOfBirth = "You must be at least 18";
      }
    } else if (step === 2) {
      if (!v.street) e.street = "Street is required";
      if (!v.city) e.city = "City is required";
      if (!v.country) e.country = "Choose your country";
      if (!v.postalCode) e.postalCode = "Postal code is required";
    }
    setLocalErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validateStep()) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <form action={formAction} noValidate>
      {/* Progress */}
      <ol className="mb-6 flex items-center gap-2" aria-label="Registration progress">
        {STEPS.map((label, i) => (
          <li key={label} className="flex flex-1 items-center gap-2">
            <span
              className={cn(
                "flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[11px]",
                i < step && "bg-primary text-primary-ink",
                i === step && "bg-primary-tint text-primary ring-1 ring-primary",
                i > step && "bg-panel text-muted",
              )}
              aria-current={i === step ? "step" : undefined}
            >
              {i < step ? "✓" : i + 1}
            </span>
            {i < STEPS.length - 1 && (
              <span className={cn("h-px flex-1", i < step ? "bg-primary" : "bg-hairline")} />
            )}
          </li>
        ))}
      </ol>
      <p className="eyebrow mb-4">
        Step {step + 1} of {STEPS.length} · {STEPS[step]}
      </p>

      {state.error && !state.fieldErrors && (
        <p className="mb-4 rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-sm text-danger" role="alert">
          {state.error}
        </p>
      )}

      {/* Step 0 — Account */}
      <div className={cn("space-y-4", step !== 0 && "hidden")}>
        <Field label="Email" name="email" error={err("email")}>
          <input id="email" name="email" type="email" autoComplete="email" className={inputClass}
            value={v.email} onChange={set("email")} placeholder="you@example.com" />
        </Field>
        <Field label="Password" name="password" error={err("password")} hint="At least 8 characters, with an uppercase letter and a number.">
          <input id="password" name="password" type="password" autoComplete="new-password" className={inputClass}
            value={v.password} onChange={set("password")} placeholder="••••••••" />
        </Field>
      </div>

      {/* Step 1 — Personal */}
      <div className={cn("space-y-4", step !== 1 && "hidden")}>
        <div className="grid grid-cols-2 gap-3">
          <Field label="First name" name="firstName" error={err("firstName")}>
            <input id="firstName" name="firstName" autoComplete="given-name" className={inputClass}
              value={v.firstName} onChange={set("firstName")} />
          </Field>
          <Field label="Last name" name="lastName" error={err("lastName")}>
            <input id="lastName" name="lastName" autoComplete="family-name" className={inputClass}
              value={v.lastName} onChange={set("lastName")} />
          </Field>
        </div>
        <Field label="Phone number" name="phone" error={err("phone")} hint={`Include your country code, e.g. ${REGION.phoneCode}`}>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={inputClass}
            value={v.phone} onChange={set("phone")} placeholder={REGION.phonePlaceholder} />
        </Field>
        <Field label="Date of birth" name="dateOfBirth" error={err("dateOfBirth")}>
          <input id="dateOfBirth" name="dateOfBirth" type="date" className={inputClass}
            value={v.dateOfBirth} onChange={set("dateOfBirth")} />
        </Field>
      </div>

      {/* Step 2 — Address */}
      <div className={cn("space-y-4", step !== 2 && "hidden")}>
        <Field label="Street" name="street" error={err("street")}>
          <input id="street" name="street" autoComplete="address-line1" className={inputClass}
            value={v.street} onChange={set("street")} placeholder="1 Vault Lane" />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="City" name="city" error={err("city")}>
            <input id="city" name="city" autoComplete="address-level2" className={inputClass}
              value={v.city} onChange={set("city")} />
          </Field>
          <Field label="Postal code" name="postalCode" error={err("postalCode")}>
            <input id="postalCode" name="postalCode" autoComplete="postal-code" className={inputClass}
              value={v.postalCode} onChange={set("postalCode")} />
          </Field>
        </div>
        <Field label="Country" name="country" error={err("country")}>
          <select id="country" name="country" autoComplete="country-name" className={inputClass}
            value={v.country} onChange={set("country")}>
            <option value="">Select your country…</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Field>
      </div>

      {/* Step 3 — Confirm */}
      <div className={cn("space-y-4", step !== 3 && "hidden")}>
        <dl className="divide-y divide-hairline overflow-hidden rounded-xl border border-hairline">
          {[
            ["Email", v.email],
            ["Name", `${v.firstName} ${v.lastName}`.trim()],
            ["Phone", v.phone],
            ["Date of birth", v.dateOfBirth],
            ["Address", [v.street, v.city, v.postalCode, v.country].filter(Boolean).join(", ")],
          ].map(([k, val]) => (
            <div key={k} className="flex justify-between gap-4 bg-panel px-4 py-2.5 text-sm">
              <dt className="text-muted">{k}</dt>
              <dd className="max-w-[60%] truncate text-right text-ink">{val || "—"}</dd>
            </div>
          ))}
        </dl>

        <label className="flex items-start gap-3 text-sm text-muted">
          <input
            type="checkbox"
            name="agreedToTerms"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-hairline accent-[#B8F04A]"
          />
          <span>
            I read and agree to the{" "}
            <Link href="/legal/terms" className="text-primary hover:underline" target="_blank">
              terms and conditions
            </Link>{" "}
            and{" "}
            <Link href="/legal/privacy" className="text-primary hover:underline" target="_blank">
              privacy policy
            </Link>
            .
          </span>
        </label>
      </div>

      {/* Nav buttons */}
      <div className="mt-6 flex items-center justify-between gap-3">
        {step > 0 ? (
          <Button type="button" variant="secondary" onClick={back}>
            Back
          </Button>
        ) : (
          <span />
        )}
        {step < STEPS.length - 1 ? (
          <Button type="button" onClick={next}>
            Continue
          </Button>
        ) : (
          <Button type="submit" disabled={!agreed || pending}>
            {pending ? "Creating account…" : "Create account"}
          </Button>
        )}
      </div>
    </form>
  );
}
