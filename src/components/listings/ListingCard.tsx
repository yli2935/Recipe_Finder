/*
 * @Author: Adam Li adam@bizzone.com
 * @Date: 2024-12-18 22:27:43
 * @LastEditors: Adam Li
 * @LastEditTime: 2024-12-20 12:28:45
 * @FilePath: /Recipe_Finder/src/components/listings/ListingCard.tsx
 */
import { Recipe } from "../../types/SafeRecipe";
import HeartButton from "../HeartButton";

interface ListingCardProps {
  data: Recipe;
  onClickMeal?: () => void;
}
const ListingCard: React.FC<ListingCardProps> = ({ data, onClickMeal }) => {
  return (
    <div
      className="col-span-1 cursor-pointer group focus:outline-none"
      onClick={onClickMeal}
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
						aspect-square
						w-full
						relative
						overflow-hidden
						rounded-xl
					"
        >
          <img
            src={data.strMealThumb}
            alt={data.strMeal || "Listing Image"}
            className="
              object-cover          
              w-full                
              h-full    
              group-hover:scale-110      
              transition-transform  
              duration-300         
            "
          />
          <div
            className="
							absolute
							top-3
							right-3
						"
          >
            <HeartButton
              meal={data}
            />
          </div>
        </div>

        <div className="font-bold text-sm ">{data?.strMeal}</div>
        <div className="font-light text-neutral-500">
          {data.strCategory}, {data?.strArea}
        </div>
      </div>
    </div>
  );
};
export default ListingCard;
