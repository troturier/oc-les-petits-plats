import Image from "next/image";
import Link from "next/link";
import { formatQuantity } from "@/lib/format";
import type { Recipe } from "@/lib/types";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link
      href={`/recette/${recipe.slug}`}
      className="focus-visible:outline-brand-black block rounded-[21px] focus-visible:outline-2 focus-visible:outline-offset-4"
    >
      <article className="shadow-card overflow-hidden rounded-[21px] bg-white">
        <div className="relative h-[253px]">
          <Image
            src={`/images/recipes/${recipe.image}`}
            alt={recipe.name}
            fill
            sizes="(min-width: 1280px) 380px, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
          <span className="bg-brand-yellow absolute top-[21px] right-[22px] rounded-[14px] px-[15px] py-[5px] text-xs">
            {recipe.time}min
          </span>
        </div>

        <div className="flex flex-col gap-8 px-[25px] pt-8 pb-[30px]">
          <h2 className="font-display text-lg">{recipe.name}</h2>

          <section>
            <h3 className="text-brand-grey text-xs font-bold tracking-[0.09em] uppercase">
              Recette
            </h3>
            <p className="mt-2.5 line-clamp-4 text-sm">{recipe.description}</p>
          </section>

          <section>
            <h3 className="text-brand-grey text-xs font-bold tracking-[0.09em] uppercase">
              Ingrédients
            </h3>
            <ul className="mt-2.5 grid grid-cols-2 gap-x-6 gap-y-5">
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
        </div>
      </article>
    </Link>
  );
}
