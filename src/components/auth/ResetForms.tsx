"use client";

import { useActionState } from "react";
import Link from "next/link";
import { requestResetAction, resetPasswordAction, type ActionState } from "@/actions/auth";
import { Field, inputClass } from "./AuthShell";
import { Button } from "@/components/ui/Button";

export function ForgotForm() {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(requestResetAction, {});
  if (state.ok) {
    return (
      <div className="rounded-lg border border-success/30 bg-success/10 px-4 py-3 text-sm text-success" role="status">
        {state.message}
      </div>
    );
  }
  return (
    <form action={formAction} className="space-y-4" noValidate>
      {state.error && (
        <p className="rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-sm text-danger" role="alert">
          {state.error}
        </p>
      )}
      <Field label="Email" name="email">
        <input id="email" name="email" type="email" autoComplete="email" className={inputClass} placeholder="you@example.com" />
      </Field>
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Sending…" : "Send reset link"}
      </Button>
    </form>
  );
}

export function ResetForm({ token }: { token: string }) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(resetPasswordAction, {});
  if (state.ok) {
    return (
      <div className="space-y-4">
        <div className="rounded-lg border border-success/30 bg-success/10 px-4 py-3 text-sm text-success" role="status">
          {state.message}
        </div>
        <Link href="/login" className="block text-center text-sm text-primary hover:underline">
          Go to sign in →
        </Link>
      </div>
    );
  }
  return (
    <form action={formAction} className="space-y-4" noValidate>
      <input type="hidden" name="token" value={token} />
      {state.error && (
        <p className="rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-sm text-danger" role="alert">
          {state.error}
        </p>
      )}
      <Field label="New password" name="password" hint="At least 8 characters.">
        <input id="password" name="password" type="password" autoComplete="new-password" className={inputClass} placeholder="••••••••" />
      </Field>
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Updating…" : "Update password"}
      </Button>
    </form>
  );
}
