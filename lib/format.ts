import type { RecipeIngredient } from "@/lib/types";

/** Units written right after the number in the mockups, e.g. "400ml", "25cl", "5kg". */
const GLUED_UNITS = new Set(["ml", "cl", "l", "g", "kg"]);

/**
 * Builds the quantity line of an ingredient ("400ml", "1 cuillère à soupe", "2").
 * Returns a dash when the recipe gives no quantity at all.
 */
export function formatQuantity({ quantity, unit }: RecipeIngredient): string {
  if (quantity === undefined) {
    return unit ?? "-";
  }

  if (!unit) {
    return String(quantity);
  }

  return GLUED_UNITS.has(unit.toLowerCase())
    ? `${quantity}${unit}`
    : `${quantity} ${unit}`;
}
