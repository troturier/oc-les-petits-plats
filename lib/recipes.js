import recipesData from "@/data/recipes.json";

/**
 * @typedef {object} RecipeIngredient
 * @property {string} ingredient
 * @property {number | string} [quantity] Missing for ingredients used "to taste".
 * @property {string} [unit]
 */

/**
 * @typedef {object} Recipe
 * @property {number} id
 * @property {string} image File name inside `public/images/recipes/`.
 * @property {string} name
 * @property {string} slug
 * @property {number} servings
 * @property {RecipeIngredient[]} ingredients
 * @property {number} time Preparation time in minutes.
 * @property {string} description
 * @property {string} appliance
 * @property {string[]} ustensils
 */

/** @type {Recipe[]} */
const recipes = recipesData;

/** @returns {Recipe[]} */
export function getAllRecipes() {
  return recipes;
}

/**
 * @param {string} slug
 * @returns {Recipe | undefined}
 */
export function getRecipeBySlug(slug) {
  return recipes.find((recipe) => recipe.slug === slug);
}
