/*
 * @Author: Adam Li adam@bizzone.com
 * @Date: 2024-12-21 14:53:08
 * @LastEditors: Adam Li
 * @LastEditTime: 2024-12-21 14:53:22
 * @FilePath: /Recipe_Finder/src/utils/combineMeals.ts
 */
import { Recipe, Meals } from "../types/SafeRecipe";

export const combineMeals = (
  nameData: Meals | null,
  ingredientData: Meals | null,
  cachedData: Recipe[]
): Recipe[] => {
  if (!nameData?.meals && !ingredientData?.meals) return cachedData;

  const mealsByName = nameData?.meals || [];
  const mealsByIngredient = ingredientData?.meals || [];

  const mealMap = new Map<string, Recipe>();

  // Add meals by name
  mealsByName.forEach((meal) => mealMap.set(meal.idMeal, meal));

  // Add meals by ingredient (skip duplicates and fill missing fields with null)
  mealsByIngredient.forEach((meal) => {
    if (!mealMap.has(meal.idMeal)) {
      mealMap.set(meal.idMeal, {
        idMeal: meal.idMeal,
        strMeal: meal.strMeal,
        strMealThumb: meal.strMealThumb,
        strDrinkAlternate: null,
        strCategory: null,
        strArea: null,
        strInstructions: null,
        strTags: null,
        strYoutube: null,
        strIngredient1: null,
        strIngredient2: null,
        strIngredient3: null,
        strIngredient4: null,
        strIngredient5: null,
        strIngredient6: null,
        strIngredient7: null,
        strIngredient8: null,
        strIngredient9: null,
        strIngredient10: null,
        strIngredient11: null,
        strIngredient12: null,
        strIngredient13: null,
        strIngredient14: null,
        strIngredient15: null,
        strIngredient16: null,
        strIngredient17: null,
        strIngredient18: null,
        strIngredient19: null,
        strIngredient20: null,
        strMeasure1: null,
        strMeasure2: null,
        strMeasure3: null,
        strMeasure4: null,
        strMeasure5: null,
        strMeasure6: null,
        strMeasure7: null,
        strMeasure8: null,
        strMeasure9: null,
        strMeasure10: null,
        strMeasure11: null,
        strMeasure12: null,
        strMeasure13: null,
        strMeasure14: null,
        strMeasure15: null,
        strMeasure16: null,
        strMeasure17: null,
        strMeasure18: null,
        strMeasure19: null,
        strMeasure20: null,
        strSource: null,
        strImageSource: null,
        strCreativeCommonsConfirmed: null,
        dateModified: null,
      });
    }
  });

  const combined = Array.from(mealMap.values());
  sessionStorage.setItem("searchResults", JSON.stringify({ meals: combined }));
  return combined;
};
