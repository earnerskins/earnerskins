"use client";

import { useActionState } from "react";
import { loginAction, type ActionState } from "@/actions/auth";
import { Field, inputClass } from "./AuthShell";
import { Button } from "@/components/ui/Button";

export function LoginForm() {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(loginAction, {});
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
      <Field label="Password" name="password">
        <input id="password" name="password" type="password" autoComplete="current-password" className={inputClass} placeholder="••••••••" />
      </Field>
      <div className="flex justify-end">
        <a href="/forgot-password" className="text-xs text-primary hover:underline">
          Forgot password?
        </a>
      </div>
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
