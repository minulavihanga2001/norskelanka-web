"use client";

import { useState, useRef, useEffect } from "react";

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

  return (
    <div className={`relative text-left ${fullWidth ? "block w-full" : "inline-block"}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium backdrop-blur-md transition focus:outline-none focus:ring-1 focus:ring-primary/40 cursor-pointer shadow-sm ${
          scrolled
            ? "border-black/10 bg-white/50 text-ink hover:bg-white/70"
            : "border-white/25 bg-white/15 text-foam hover:bg-white/25"
        } ${fullWidth ? "w-full justify-between" : ""}`}
      >
        <div className="flex items-center gap-1.5">
          {currentOption.icon && <span className="text-sm leading-none">{currentOption.icon}</span>}
          <span>{currentOption.label}</span>
        </div>
        <svg
          className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          className={`absolute top-full ${
            fullWidth ? "left-0 w-full" : "right-0 w-32"
          } mt-2 origin-top rounded-2xl backdrop-blur-xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 ${
            scrolled
              ? "border border-black/10 bg-white/90 text-ink"
              : "border border-white/20 bg-[#142A1D]/80 text-foam"
          }`}
        >
          <div className="py-1">
            {options.map((opt) => {
              const isSelected = opt.value === currentValue;
              return (
                <button
                  key={opt.value}
                  type="submit"
                  name={name}
                  value={opt.value}
                  onClick={() => setOpen(false)}
                  className={`flex w-full items-center gap-2 px-3.5 py-2 text-xs text-left transition-colors ${
                    isSelected
                      ? scrolled
                        ? "bg-black/8 text-ink font-semibold"
                        : "bg-white/15 text-white font-semibold"
                      : scrolled
                      ? "text-ink/80 hover:bg-black/5 hover:text-ink"
                      : "text-foam/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {/* Checkmark space */}
                  <span className="w-3.5 flex-shrink-0 text-primary font-bold">
                    {isSelected ? "✓" : ""}
                  </span>

                  {opt.icon && <span className="text-sm leading-none drop-shadow-sm">{opt.icon}</span>}
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
