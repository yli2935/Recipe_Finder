/*
 * @Author: Adam Li adam@bizzone.com
 * @Date: 2024-12-19 15:59:00
 * @LastEditors: Adam Li
 * @LastEditTime: 2024-12-20 12:14:52
 * @FilePath: /Recipe_Finder/src/components/HeartButton.tsx
 */
import useFavorite from "../hooks/useFavorite";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Recipe } from "../types/SafeRecipe";
interface HeartButtonProps {
  meal: Recipe;
}

const HeartButton: React.FC<HeartButtonProps> = ({ meal }) => {
  const { isFavorite, toggleFavorite } = useFavorite({ meal });

  return (
    <div
      onClick={toggleFavorite}
      className="
        relative
        hover:opacity-80
        transition
        cursor-pointer
    "
    >
      <AiOutlineHeart
        size={28}
        className="
					fill-white
					absolute
					-top-[2px]
					-right-[2px]
				"
      />
      <AiFillHeart
        size={24}
        className={isFavorite ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  );
};
export default HeartButton;
