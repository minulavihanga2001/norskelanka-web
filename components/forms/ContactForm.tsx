"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "@/app/actions/contact";
import type { Dictionary } from "@/lib/i18n/dictionaries";

const initial: ContactState = { ok: false };

export function ContactForm({
  dict,
  packageSlug,
}: {
  dict: Dictionary;
  packageSlug?: string;
}) {
  const [state, action, pending] = useActionState(submitContact, initial);

  if (state.ok) {
    return (
      <div className="glass-strong rounded-[var(--radius-lg)] p-6 text-ink md:p-8">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-lg text-primary">✓</span>
          <p className="font-display text-2xl text-primary">{dict.sections.success}</p>
        </div>
      </div>
    );
  }

  return (
    <form action={action} className="glass-strong space-y-5 rounded-[var(--radius-lg)] p-6 md:p-8">
      {packageSlug && <input type="hidden" name="packageSlug" value={packageSlug} />}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink-muted">{dict.sections.name}</label>
        <input
          name="name"
          required
          className="input-glass"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink-muted">{dict.sections.email}</label>
        <input
          type="email"
          name="email"
          required
          className="input-glass"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink-muted">{dict.sections.phone}</label>
        <input
          name="phone"
          className="input-glass"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink-muted">{dict.sections.message}</label>
        <textarea
          name="message"
          required
          rows={5}
          className="input-glass resize-none"
        />
      </div>
      {state.error && (
        <div className="rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-700 border border-red-100">
          {state.error}
        </div>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-gradient-to-b from-primary-glow to-primary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-all duration-300 hover:from-primary hover:to-primary-dark hover:shadow-xl hover:shadow-primary/40 disabled:opacity-50 disabled:hover:from-primary-glow disabled:hover:to-primary"
      >
        {pending ? (
          <span className="inline-flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Sending…
          </span>
        ) : (
          dict.sections.send
        )}
      </button>
    </form>
  );
}
