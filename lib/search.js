/** @typedef {import("./recipes").Recipe} Recipe */

/** @typedef {"ingredients" | "appliances" | "ustensils"} FilterCategory */

/** @type {FilterCategory[]} */
export const FILTER_CATEGORIES = ["ingredients", "appliances", "ustensils"];

/**
 * Selected tags per category, stored as normalized values.
 *
 * @typedef {Record<FilterCategory, string[]>} SelectedTags
 */

/** @type {SelectedTags} */
export const NO_TAGS = {
  ingredients: [],
  appliances: [],
  ustensils: [],
};

/** The main search bar only starts filtering from this many characters. */
export const MIN_QUERY_LENGTH = 3;

/** @type {Record<FilterCategory, string>} */
export const CATEGORY_LABELS = {
  ingredients: "Ingrédients",
  appliances: "Appareils",
  ustensils: "Ustensiles",
};

/**
 * Lowercases and strips accents so that "Crème de Coco" and "creme de coco"
 * compare equal. `[̀-ͯ]` is the combining diacritics block.
 *
 * @param {string} value
 * @returns {string}
 */
export function normalize(value) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

/**
 * The dataset mixes casings ("couteau", "Couteau"); display one single form.
 *
 * @param {string} value
 * @returns {string}
 */
function toLabel(value) {
  const trimmed = value.trim().toLowerCase();
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

/**
 * @typedef {object} FilterOption
 * @property {string} value Normalized value, used for comparisons and as a React key.
 * @property {string} label
 */

/**
 * @param {string} value
 * @returns {FilterOption}
 */
function toOption(value) {
  return { value: normalize(value), label: toLabel(value) };
}

/**
 * A recipe with its searchable fields normalized once, so that filtering never
 * has to redo the work on every keystroke.
 *
 * @typedef {object} IndexedRecipe
 * @property {Recipe} recipe
 * @property {string} haystack Name, ingredients and description, normalized and
 *   joined together: the three fields the main search bar looks into. The
 *   separator prevents a match from spanning two fields.
 * @property {Record<FilterCategory, FilterOption[]>} tags
 */

/**
 * @param {Recipe[]} recipes
 * @returns {IndexedRecipe[]}
 */
export function indexRecipes(recipes) {
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
 *
 * @param {IndexedRecipe[]} entries
 * @param {SelectedTags} tags
 * @param {string} [query]
 * @returns {IndexedRecipe[]}
 */
export function filterRecipes(entries, tags, query = "") {
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
 *
 * @param {IndexedRecipe[]} entries
 * @param {FilterCategory} category
 * @param {string[]} selected
 * @returns {FilterOption[]}
 */
export function collectOptions(entries, category, selected) {
  const options = new Map();

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
