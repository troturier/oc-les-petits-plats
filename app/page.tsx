import FilterDropdown from "@/components/FilterDropdown";
import Hero from "@/components/Hero";
import MainSearchBar from "@/components/MainSearchBar";
import RecipeCard from "@/components/RecipeCard";
import { getAllRecipes } from "@/lib/recipes";

export default function Home() {
  const recipes = getAllRecipes();

  return (
    <>
      <Hero>
        <MainSearchBar />
      </Hero>

      <div className="mx-auto w-full max-w-[1236px] px-6 py-[60px]">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap gap-4 lg:gap-[65px]">
            <FilterDropdown label="Ingrédients" />
            <FilterDropdown label="Appareils" />
            <FilterDropdown label="Ustensiles" />
          </div>
          <p className="font-display text-[21px]">
            {recipes.length} {recipes.length > 1 ? "recettes" : "recette"}
          </p>
        </div>

        <div className="mt-[60px] grid gap-x-12 gap-y-[66px] md:grid-cols-2 xl:grid-cols-3">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </>
  );
}
