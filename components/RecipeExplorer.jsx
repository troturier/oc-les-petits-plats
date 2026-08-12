"use client";

import { useMemo, useState } from "react";
import FilterDropdown from "@/components/FilterDropdown";
import Hero from "@/components/Hero";
import MainSearchBar from "@/components/MainSearchBar";
import RecipeCard from "@/components/RecipeCard";
import SelectedTag from "@/components/SelectedTag";
import {
  CATEGORY_LABELS,
  FILTER_CATEGORIES,
  MIN_QUERY_LENGTH,
  NO_TAGS,
  collectOptions,
  filterRecipes,
  indexRecipes,
} from "@/lib/search";
import { useDebouncedValue } from "@/lib/useDebouncedValue";

/** Long enough to skip intermediate keystrokes, short enough to feel instant. */
const SEARCH_DEBOUNCE_MS = 200;

/**
 * Owns the whole search state: the main search input and the advanced tags.
 *
 * @param {{ recipes: import("@/lib/recipes").Recipe[] }} props
 */
export default function RecipeExplorer({ recipes }) {
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState(NO_TAGS);

  const debouncedQuery = useDebouncedValue(query, SEARCH_DEBOUNCE_MS);

  // Normalizing the dataset once keeps every later keystroke cheap.
  const entries = useMemo(() => indexRecipes(recipes), [recipes]);

  const labels = useMemo(() => {
    const map = new Map();

    for (const entry of entries) {
      for (const category of FILTER_CATEGORIES) {
        for (const option of entry.tags[category]) {
          map.set(option.value, option.label);
        }
      }
    }

    return map;
  }, [entries]);

  const results = useMemo(
    () => filterRecipes(entries, selectedTags, debouncedQuery),
    [entries, selectedTags, debouncedQuery],
  );

  function toggleTag(category, value) {
    setSelectedTags((current) => {
      const values = current[category];

      return {
        ...current,
        [category]: values.includes(value)
          ? values.filter((selected) => selected !== value)
          : [...values, value],
      };
    });
  }

  const hasSelectedTags = FILTER_CATEGORIES.some(
    (category) => selectedTags[category].length > 0,
  );

  return (
    <>
      <Hero>
        <MainSearchBar value={query} onChange={setQuery} />
      </Hero>

      <div className="mx-auto w-full max-w-[1236px] px-6 py-[60px]">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap gap-4 lg:gap-[65px]">
              {FILTER_CATEGORIES.map((category) => (
                <FilterDropdown
                  key={category}
                  label={CATEGORY_LABELS[category]}
                  options={collectOptions(
                    results,
                    category,
                    selectedTags[category],
                  )}
                  selectedOptions={selectedTags[category].map((value) => ({
                    value,
                    label: labels.get(value) ?? value,
                  }))}
                  onToggle={(value) => toggleTag(category, value)}
                />
              ))}
            </div>

            {hasSelectedTags && (
              <ul className="flex flex-wrap gap-4 lg:gap-[65px]">
                {FILTER_CATEGORIES.flatMap((category) =>
                  selectedTags[category].map((value) => (
                    <li key={`${category}-${value}`}>
                      <SelectedTag
                        label={labels.get(value) ?? value}
                        onRemove={() => toggleTag(category, value)}
                      />
                    </li>
                  )),
                )}
              </ul>
            )}
          </div>

          <p className="font-display text-[21px]">
            {results.length} {results.length > 1 ? "recettes" : "recette"}
          </p>
        </div>

        {results.length === 0 ? (
          <p className="mt-[60px] max-w-[720px] text-lg">
            {debouncedQuery.trim().length >= MIN_QUERY_LENGTH
              ? `Aucune recette ne contient « ${debouncedQuery.trim()} » vous pouvez chercher « tarte aux pommes », « poisson », etc.`
              : "Aucune recette ne correspond aux filtres sélectionnés."}
          </p>
        ) : (
          <div className="mt-[60px] grid gap-x-12 gap-y-[66px] md:grid-cols-2 xl:grid-cols-3">
            {results.map(({ recipe }) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
