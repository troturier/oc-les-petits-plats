import RecipeExplorer from "@/components/RecipeExplorer";
import { getAllRecipes } from "@/lib/recipes";
import { QUERY_PARAM, readTagsFromParams } from "@/lib/search";

/**
 * Reading `searchParams` on the server makes the page dynamic, but it lets a
 * shared or reloaded URL come back already filtered in the very first HTML.
 */
export default async function Home(props) {
  const params = await props.searchParams;
  const recipes = getAllRecipes();
  const query = params[QUERY_PARAM];

  return (
    <RecipeExplorer
      recipes={recipes}
      initialQuery={typeof query === "string" ? query : ""}
      initialTags={readTagsFromParams(params, recipes)}
    />
  );
}
