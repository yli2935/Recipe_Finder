/*
 * @Author: Adam Li adam@bizzone.com
 * @Date: 2024-12-18 22:27:43
 * @LastEditors: Adam Li
 * @LastEditTime: 2024-12-18 22:27:59
 * @FilePath: /Recipe_Finder/src/components/listings/ListingCard.tsx
 */
import { Recipe } from "../../types/SafeRecipe";
interface ListingCardProps {
    data: Recipe;
}
const ListingCard : React.FC<ListingCardProps> = () => {
  return <div className="col-span-1 cursor-pointer group focus:outline-none">ListingCard</div>;
};
export default ListingCard;
