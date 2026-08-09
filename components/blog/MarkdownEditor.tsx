"use client";

import { useRef, useState } from "react";
import { MarkdownView } from "@/components/blog/MarkdownView";

export function MarkdownEditor({
  name,
  label,
  defaultValue = "",
  writeLabel = "Write",
  previewLabel = "Preview",
}: {
  name: string;
  label: string;
  defaultValue?: string;
  writeLabel?: string;
  previewLabel?: string;
}) {
  const [value, setValue] = useState(defaultValue);
  const [mode, setMode] = useState<"write" | "preview">("write");
  const ref = useRef<HTMLTextAreaElement>(null);

  function wrap(before: string, after = before) {
    const el = ref.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = value.slice(start, end) || "text";
    const next =
      value.slice(0, start) + before + selected + after + value.slice(end);
    setValue(next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + before.length, start + before.length + selected.length);
    });
  }

  function linePrefix(prefix: string) {
    const el = ref.current;
    if (!el) return;
    const start = el.selectionStart;
    const lineStart = value.lastIndexOf("\n", start - 1) + 1;
    const next = value.slice(0, lineStart) + prefix + value.slice(lineStart);
    setValue(next);
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <label className="text-sm font-medium text-ink">{label}</label>
        <div className="flex rounded-full border border-black/10 bg-white/50 p-0.5 text-xs">
          <button
            type="button"
            className={`rounded-full px-3 py-1 ${mode === "write" ? "bg-leaf text-white" : ""}`}
            onClick={() => setMode("write")}
          >
            {writeLabel}
          </button>
          <button
            type="button"
            className={`rounded-full px-3 py-1 ${mode === "preview" ? "bg-leaf text-white" : ""}`}
            onClick={() => setMode("preview")}
          >
            {previewLabel}
          </button>
        </div>
      </div>

      {mode === "write" ? (
        <>
          <div className="flex flex-wrap gap-1">
            {[
              { label: "H2", onClick: () => linePrefix("## ") },
              { label: "H3", onClick: () => linePrefix("### ") },
              { label: "Bold", onClick: () => wrap("**") },
              { label: "Italic", onClick: () => wrap("_") },
              { label: "List", onClick: () => linePrefix("- ") },
              { label: "Link", onClick: () => wrap("[", "](https://)") },
              { label: "Quote", onClick: () => linePrefix("> ") },
            ].map((btn) => (
              <button
                key={btn.label}
                type="button"
                onClick={btn.onClick}
                className="rounded-lg border border-black/10 bg-white/70 px-2 py-1 text-xs text-ink-muted hover:bg-white"
              >
                {btn.label}
              </button>
            ))}
          </div>
          <textarea
            ref={ref}
            name={name}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={14}
            className="w-full rounded-2xl border border-black/10 bg-white/70 px-4 py-3 font-mono text-sm outline-none ring-leaf/30 focus:ring-2"
          />
        </>
      ) : (
        <div className="min-h-[280px] rounded-2xl border border-black/10 bg-white/70 px-4 py-3">
          <input type="hidden" name={name} value={value} />
          <MarkdownView content={value || "_Nothing to preview yet_"} />
        </div>
      )}
    </div>
  );
}
