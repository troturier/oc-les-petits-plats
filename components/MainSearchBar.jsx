"use client";

import SearchIcon from "@/components/SearchIcon";

export default function MainSearchBar({ value, onChange }) {
  return (
    <search className="block w-full">
      <div className="relative">
        <label htmlFor="main-search" className="sr-only">
          Rechercher une recette, un ingrédient
        </label>
        <input
          id="main-search"
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Rechercher une recette, un ingrédient, ..."
          className="text-brand-black placeholder:text-brand-grey h-[72px] w-full rounded-[11px] bg-white pr-[120px] pl-[35px] text-base outline-none"
        />

        {value && (
          <button
            type="button"
            aria-label="Effacer la recherche"
            onClick={() => onChange("")}
            className="text-brand-black absolute top-1/2 right-[76px] -translate-y-1/2 text-xl"
          >
            ✕
          </button>
        )}

        <span className="bg-brand-black pointer-events-none absolute top-[10px] right-[10px] flex size-[52px] items-center justify-center rounded-[10px] text-white">
          <SearchIcon className="size-6" />
        </span>
      </div>
    </search>
  );
}
