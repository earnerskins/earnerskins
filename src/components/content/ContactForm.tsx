"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="rounded-xl border border-primary/30 bg-primary-tint p-6 text-center">
        <p className="font-medium text-ink">Thanks for reaching out.</p>
        <p className="mt-1 text-sm text-muted">
          We&apos;ve received your message and will reply to your email shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="space-y-4 rounded-xl border border-hairline bg-card p-6"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="name" label="Your name" />
        <Field id="email" label="Email" type="email" />
      </div>
      <Field id="subject" label="Subject" />
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm text-ink">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          className="focus-ring w-full resize-y rounded-lg border border-hairline bg-panel px-3 py-2.5 text-ink placeholder:text-muted"
          placeholder="How can we help?"
        />
      </div>
      <Button type="submit" className="w-full sm:w-auto">
        Send message
      </Button>
    </form>
  );
}

function Field({ id, label, type = "text" }: { id: string; label: string; type?: string }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm text-ink">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required
        className="focus-ring w-full rounded-lg border border-hairline bg-panel px-3 py-2.5 text-ink placeholder:text-muted"
      />
    </div>
  );
}
