/*
 * @Author: Adam Li adam@bizzone.com
 * @Date: 2024-12-20 09:36:19
 * @LastEditors: Adam Li
 * @LastEditTime: 2024-12-22 14:50:17
 * @FilePath: /Recipe_Finder/src/components/listings/ListingInfo.tsx
 */
import { Recipe } from "../../types/SafeRecipe";

interface ListingInfoProps {
  recipe: Recipe;
}
const ListingInfo: React.FC<ListingInfoProps> = ({ recipe }) => {
  const ingredients = Array.from(
    { length: 20 },
    (_, i) => recipe[`strIngredient${i + 1}` as keyof Recipe]
  );
  const measures = Array.from(
    { length: 20 },
    (_, i) => recipe[`strMeasure${i + 1}` as keyof Recipe]
  );

  return (
    <div className="flex flex-col md:flex-row gap-6 shadow-lg mb-10 pb-10 rounded-md">
      <div
        className="
      w-full
      md:w-1/2
      overflow-visible
      rounded-xl
      relative
      flex
      items-start
      justify-center
      md:sticky
      md:top-4
    "
      >
        <div className="border border-black rounded-xl p-8 max-w-md w-full">
          <h2 className="text-xl font-bold mb-4">Ingredients</h2>
          <ul>
            {ingredients.map(
              (ingredient, index) =>
                ingredient && (
                  <li key={index}>
                    {measures[index]} <strong>{ingredient}</strong>
                  </li>
                )
            )}
          </ul>
        </div>
      </div>

      <div
        className="
      w-full
      md:w-1/2
      min-h-[50vh]
      overflow-y-auto
      rounded-xl
      relative
      flex
      flex-col
    "
      >
        <div className="p-8">
          <h2 className="text-xl font-bold mb-4">Instructions</h2>
          <p>{recipe.strInstructions}</p>
        </div>
      </div>
    </div>
  );
};
export default ListingInfo;
