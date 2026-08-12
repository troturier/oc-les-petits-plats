import RecipeExplorer from "@/components/RecipeExplorer";
import { getAllRecipes } from "@/lib/recipes";

export default function Home() {
  return <RecipeExplorer recipes={getAllRecipes()} />;
}
