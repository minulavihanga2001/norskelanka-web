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
      <div className="rounded-[var(--radius-lg)] border border-black/5 bg-white p-6 text-ink shadow-sm md:p-8">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-lg text-primary">
            ✓
          </span>
          <p className="font-display text-2xl text-primary">{dict.sections.success}</p>
        </div>
      </div>
    );
  }

  return (
    <form
      action={action}
      className="space-y-5 rounded-[var(--radius-lg)] border border-black/5 bg-white p-6 shadow-sm md:p-8"
    >
      {packageSlug && <input type="hidden" name="packageSlug" value={packageSlug} />}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink-muted">
            {dict.sections.name}
          </label>
          <input name="name" required className="input-glass" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink-muted">
            {dict.sections.email}
          </label>
          <input type="email" name="email" required className="input-glass" />
        </div>
        <div className="sm:col-span-2 lg:col-span-1">
          <label className="mb-1.5 block text-sm font-medium text-ink-muted">
            {dict.sections.phone}
          </label>
          <input name="phone" className="input-glass" />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink-muted">
          {dict.sections.message}
        </label>
        <textarea
          name="message"
          required
          rows={5}
          className="input-glass resize-none"
        />
      </div>
      {state.error && (
        <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-2.5 text-sm text-red-700">
          {state.error}
        </div>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-all duration-300 hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/40 disabled:opacity-50 disabled:hover:bg-primary sm:w-auto sm:min-w-[200px]"
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
