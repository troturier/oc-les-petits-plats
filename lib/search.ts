import type { Recipe } from "@/lib/types";

export const FILTER_CATEGORIES = [
  "ingredients",
  "appliances",
  "ustensils",
] as const;

export type FilterCategory = (typeof FILTER_CATEGORIES)[number];

/** Selected tags per category, stored as normalized values. */
export type SelectedTags = Record<FilterCategory, string[]>;

export const NO_TAGS: SelectedTags = {
  ingredients: [],
  appliances: [],
  ustensils: [],
};

/** The main search bar only starts filtering from this many characters. */
export const MIN_QUERY_LENGTH = 3;

export const CATEGORY_LABELS: Record<FilterCategory, string> = {
  ingredients: "Ingrédients",
  appliances: "Appareils",
  ustensils: "Ustensiles",
};

/**
 * Lowercases and strips accents so that "Crème de Coco" and "creme de coco"
 * compare equal. `[̀-ͯ]` is the combining diacritics block.
 */
export function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

/** The dataset mixes casings ("couteau", "Couteau"); display one single form. */
function toLabel(value: string): string {
  const trimmed = value.trim().toLowerCase();
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

export type FilterOption = {
  /** Normalized value, used for comparisons and as a React key. */
  value: string;
  label: string;
};

function toOption(value: string): FilterOption {
  return { value: normalize(value), label: toLabel(value) };
}

/**
 * A recipe with its searchable fields normalized once, so that filtering never
 * has to redo the work on every keystroke.
 */
export type IndexedRecipe = {
  recipe: Recipe;
  /**
   * Name, ingredients and description of the recipe, normalized and joined
   * together: the three fields the main search bar looks into. The separator
   * prevents a match from spanning two fields.
   */
  haystack: string;
  tags: Record<FilterCategory, FilterOption[]>;
};

export function indexRecipes(recipes: Recipe[]): IndexedRecipe[] {
  return recipes.map((recipe) => ({
    recipe,
    haystack: [
      recipe.name,
      ...recipe.ingredients.map((item) => item.ingredient),
      recipe.description,
    ]
      .map(normalize)
      .join(" | "),
    tags: {
      ingredients: recipe.ingredients.map((item) => toOption(item.ingredient)),
      appliances: [toOption(recipe.appliance)],
      ustensils: recipe.ustensils.map(toOption),
    },
  }));
}

/**
 * Keeps the recipes matching the main search *and* carrying **every** selected
 * tag (intersection). A query shorter than `MIN_QUERY_LENGTH` is ignored.
 */
export function filterRecipes(
  entries: IndexedRecipe[],
  tags: SelectedTags,
  query = "",
): IndexedRecipe[] {
  const search = normalize(query);
  const searchesText = search.length >= MIN_QUERY_LENGTH;

  return entries.filter(
    (entry) =>
      (!searchesText || entry.haystack.includes(search)) &&
      FILTER_CATEGORIES.every((category) =>
        tags[category].every((tag) =>
          entry.tags[category].some((option) => option.value === tag),
        ),
      ),
  );
}

/**
 * Options still offered by a selector: those present in the recipes currently
 * displayed, minus the ones already selected.
 */
export function collectOptions(
  entries: IndexedRecipe[],
  category: FilterCategory,
  selected: string[],
): FilterOption[] {
  const options = new Map<string, string>();

  for (const entry of entries) {
    for (const option of entry.tags[category]) {
      if (!options.has(option.value)) {
        options.set(option.value, option.label);
      }
    }
  }

  for (const value of selected) {
    options.delete(value);
  }

  return [...options]
    .map(([value, label]) => ({ value, label }))
    .sort((a, b) => a.label.localeCompare(b.label, "fr"));
}
