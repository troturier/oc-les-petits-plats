/** Shape of the recipes stored in `data/recipes.json`. */

export type RecipeIngredient = {
  ingredient: string;
  /** Missing for ingredients used "to taste"; a string when the dataset spells it out. */
  quantity?: number | string;
  unit?: string;
};

export type Recipe = {
  id: number;
  /** File name inside `public/images/recipes/`. */
  image: string;
  name: string;
  slug: string;
  servings: number;
  ingredients: RecipeIngredient[];
  /** Preparation time in minutes. */
  time: number;
  description: string;
  appliance: string;
  ustensils: string[];
};
