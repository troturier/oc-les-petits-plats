import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Banner from "@/components/Banner";
import { formatQuantity } from "@/lib/format";
import { getAllRecipes, getRecipeBySlug } from "@/lib/recipes";

export function generateStaticParams() {
  return getAllRecipes().map((recipe) => ({ slug: recipe.slug }));
}

export async function generateMetadata(
  props: PageProps<"/recette/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const recipe = getRecipeBySlug(slug);

  return {
    title: recipe ? `${recipe.name} - Les Petits Plats` : "Les Petits Plats",
  };
}

function SectionTitle({ children }: { children: string }) {
  return (
    <h2 className="text-brand-grey mb-4 text-sm font-medium tracking-[0.09em] uppercase">
      {children}
    </h2>
  );
}

export default async function RecipePage(props: PageProps<"/recette/[slug]">) {
  const { slug } = await props.params;
  const recipe = getRecipeBySlug(slug);

  if (!recipe) {
    notFound();
  }

  return (
    <>
      <Banner className="h-[120px]" />

      <div className="mx-auto grid w-full max-w-[1260px] gap-12 px-6 py-[60px] lg:grid-cols-2 lg:gap-20">
        <div className="relative aspect-square overflow-hidden rounded-[10px]">
          <Image
            src={`/images/recipes/${recipe.image}`}
            alt={recipe.name}
            fill
            priority
            sizes="(min-width: 1024px) 590px, 100vw"
            className="object-cover"
          />
        </div>

        <div>
          <h1 className="font-display text-2xl">{recipe.name}</h1>

          <section className="mt-10">
            <SectionTitle>Temps de préparation</SectionTitle>
            <p className="bg-brand-yellow inline-block rounded-[14px] px-[15px] py-[5px] text-sm">
              {recipe.time}min
            </p>
          </section>

          <section className="mt-10">
            <SectionTitle>Ingrédients</SectionTitle>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3">
              {recipe.ingredients.map((ingredient) => (
                <li key={ingredient.ingredient} className="text-sm">
                  <span className="block font-medium">
                    {ingredient.ingredient}
                  </span>
                  <span className="text-brand-grey block">
                    {formatQuantity(ingredient)}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-10">
            <SectionTitle>Ustensiles nécessaires</SectionTitle>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-6 text-sm sm:grid-cols-3">
              {recipe.ustensils.map((ustensil) => (
                <li key={ustensil} className="font-medium">
                  {ustensil}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-10">
            <SectionTitle>Appareils nécessaires</SectionTitle>
            <p className="text-sm font-medium">{recipe.appliance}</p>
          </section>

          <section className="mt-10">
            <SectionTitle>Recette</SectionTitle>
            <p className="text-sm">{recipe.description}</p>
            <p className="text-brand-grey mt-4 text-sm">
              Pour {recipe.servings}{" "}
              {recipe.servings > 1 ? "personnes" : "personne"}
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
