import recipesData from "@/data/recipes.json";
import type { Recipe } from "@/lib/types";

const recipes = recipesData as Recipe[];

export function getAllRecipes(): Recipe[] {
  return recipes;
}

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return recipes.find((recipe) => recipe.slug === slug);
}
