export function Field({
  label,
  name,
  defaultValue = "",
  type = "text",
  required,
  textarea,
  rows = 3,
}: {
  label: string;
  name: string;
  defaultValue?: string | number;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  rows?: number;
}) {
  const cls =
    "w-full rounded-xl border border-black/10 bg-white/80 px-3 py-2 text-sm outline-none ring-leaf/30 focus:ring-2";
  return (
    <label className="block space-y-1">
      <span className="text-sm text-ink-muted">{label}</span>
      {textarea ? (
        <textarea
          name={name}
          defaultValue={defaultValue}
          required={required}
          rows={rows}
          className={cls}
        />
      ) : (
        <input
          type={type}
          name={name}
          defaultValue={defaultValue}
          required={required}
          className={cls}
        />
      )}
    </label>
  );
}
