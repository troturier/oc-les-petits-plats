import FilterDropdown from "@/components/FilterDropdown";
import Hero from "@/components/Hero";
import MainSearchBar from "@/components/MainSearchBar";
import RecipeCard from "@/components/RecipeCard";
import type { Recipe } from "@/lib/types";

// Static placeholder, replaced by the real dataset in step 3.
const sampleRecipe: Recipe = {
  id: 1,
  image: "Recette01.jpg",
  name: "Limonade de Coco",
  slug: "limonade-de-coco",
  servings: 1,
  ingredients: [
    { ingredient: "Lait de coco", quantity: 400, unit: "ml" },
    { ingredient: "Jus de citron", quantity: 2 },
    { ingredient: "Crème de coco", quantity: 2, unit: "cuillères à soupe" },
    { ingredient: "Sucre", quantity: 30, unit: "grammes" },
    { ingredient: "Glaçons" },
  ],
  time: 10,
  description:
    "Mettre les glaçons à votre goût dans le blender, ajouter le lait, la crème de coco, le jus de 2 citrons et le sucre. Mixer jusqu'à avoir la consistence désirée",
  appliance: "Blender",
  ustensils: ["cuillère à Soupe", "verres", "presse citron"],
};

export default function Home() {
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
          <p className="font-display text-[21px]">1 recette</p>
        </div>

        <div className="mt-[60px] grid gap-x-12 gap-y-[66px] md:grid-cols-2 xl:grid-cols-3">
          <RecipeCard recipe={sampleRecipe} />
        </div>
      </div>
    </>
  );
}
