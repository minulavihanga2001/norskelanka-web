"use client";

import { useRef, useState, useEffect } from "react";

export interface DropdownOption {
  value: string;
  label: string;
  icon?: string;
}

export function CustomDropdown({
  name,
  currentValue,
  options,
  scrolled,
  fullWidth = false,
}: {
  name: string;
  currentValue: string;
  options: DropdownOption[];
  scrolled?: boolean;
  fullWidth?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hiddenRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentOption = options.find((opt) => opt.value === currentValue) || options[0];

  function selectOption(value: string) {
    if (value === currentValue) {
      setOpen(false);
      return;
    }

    const form = dropdownRef.current?.closest("form");
    if (!form || !hiddenRef.current) {
      setOpen(false);
      return;
    }

    // Set value on a stable hidden input before closing the menu.
    // Closing first used to unmount type="submit" buttons and drop the FormData value.
    hiddenRef.current.value = value;
    form.requestSubmit();
    setOpen(false);
  }

  return (
    <div
      className={`relative text-left ${fullWidth ? "block w-full" : "inline-block"}`}
      ref={dropdownRef}
    >
      <input
        key={currentValue}
        ref={hiddenRef}
        type="hidden"
        name={name}
        defaultValue={currentValue}
      />

      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium backdrop-blur-md transition focus:outline-none focus:ring-1 focus:ring-primary/40 cursor-pointer shadow-sm ${
          scrolled
            ? "border-black/10 bg-white/50 text-ink hover:bg-white/70"
            : "border-white/25 bg-white/15 text-foam hover:bg-white/25"
        } ${fullWidth ? "w-full justify-between" : ""}`}
      >
        <div className="flex items-center gap-1.5">
          {currentOption.icon && (
            <span className="text-sm leading-none">{currentOption.icon}</span>
          )}
          <span>{currentOption.label}</span>
        </div>
        <svg
          className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          className={`absolute top-full z-[80] mt-2 origin-top overflow-hidden rounded-2xl shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200 ${
            fullWidth ? "left-0 w-full" : "right-0 w-32"
          } ${
            scrolled
              ? "border border-black/10 bg-white/95 text-ink"
              : "border border-white/20 bg-[#142A1D]/90 text-foam"
          }`}
        >
          <div className="py-1">
            {options.map((opt) => {
              const isSelected = opt.value === currentValue;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => selectOption(opt.value)}
                  className={`flex w-full items-center gap-2 px-3.5 py-2 text-left text-xs transition-colors ${
                    isSelected
                      ? scrolled
                        ? "bg-black/8 font-semibold text-ink"
                        : "bg-white/15 font-semibold text-white"
                      : scrolled
                        ? "text-ink/80 hover:bg-black/5 hover:text-ink"
                        : "text-foam/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className="w-3.5 flex-shrink-0 font-bold text-primary">
                    {isSelected ? "✓" : ""}
                  </span>
                  {opt.icon && (
                    <span className="text-sm leading-none drop-shadow-sm">{opt.icon}</span>
                  )}
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
