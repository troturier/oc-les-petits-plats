"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import SearchIcon from "@/components/SearchIcon";
import { normalize, type FilterOption } from "@/lib/search";

type Props = {
  label: string;
  /** Options still available, already stripped of the selected ones. */
  options: FilterOption[];
  selectedOptions: FilterOption[];
  onToggle: (value: string) => void;
};

export default function FilterDropdown({
  label,
  options,
  selectedOptions,
  onToggle,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Close the panel on an outside click or on Escape.
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const visibleOptions = useMemo(() => {
    const search = normalize(query);
    return search
      ? options.filter((option) => option.value.includes(search))
      : options;
  }, [options, query]);

  return (
    <div ref={containerRef} className="relative w-full sm:w-[195px]">
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className={`text-brand-black flex h-[56px] w-full items-center justify-between bg-white px-4 text-base font-medium ${
          isOpen ? "rounded-t-[11px]" : "rounded-[11px]"
        }`}
      >
        {label}
        <svg
          viewBox="0 0 14 8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={`w-[13px] transition-transform ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path d="M1 1l6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute inset-x-0 top-full z-10 rounded-b-[11px] bg-white pb-3">
          <div className="relative px-4 pb-4">
            <label htmlFor={`filter-${label}`} className="sr-only">
              Rechercher dans les {label.toLowerCase()}
            </label>
            <input
              id={`filter-${label}`}
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="text-brand-black h-[36px] w-full border border-[#c6c6c6] pr-8 pl-2 text-sm outline-none"
            />
            <SearchIcon className="text-brand-grey pointer-events-none absolute top-[9px] right-6 size-4" />
          </div>

          <ul className="max-h-[280px] overflow-y-auto">
            {selectedOptions.map((option) => (
              <li key={option.value}>
                <button
                  type="button"
                  aria-label={`Retirer le filtre ${option.label}`}
                  onClick={() => onToggle(option.value)}
                  className="bg-brand-yellow flex w-full items-center justify-between px-4 py-2 text-left text-sm font-medium"
                >
                  {option.label}
                  <span
                    aria-hidden="true"
                    className="bg-brand-black flex size-4 shrink-0 items-center justify-center rounded-full text-[10px] leading-none text-white"
                  >
                    ×
                  </span>
                </button>
              </li>
            ))}

            {visibleOptions.map((option) => (
              <li key={option.value}>
                <button
                  type="button"
                  onClick={() => onToggle(option.value)}
                  className="hover:bg-brand-yellow w-full px-4 py-2 text-left text-sm"
                >
                  {option.label}
                </button>
              </li>
            ))}

            {visibleOptions.length === 0 && selectedOptions.length === 0 && (
              <li className="text-brand-grey px-4 py-2 text-sm">
                Aucun résultat
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
